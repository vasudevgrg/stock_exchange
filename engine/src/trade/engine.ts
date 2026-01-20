import { RedisManager } from "../redis-manager";
import { CREATE_ORDER, fromApi } from "../types/fromApi";
import { OrderBook, OrderSide } from "./orderbook";
import fs from "fs";
interface UserBalance {
  [key: string]: {
    available: number;
    locked: number;
  };
}

export class Engine {
  private OrderBooks: OrderBook[] = [];
  private balances: Map<string, UserBalance> = new Map();

  constructor() {
    let snapshot = null;
    try {
      snapshot = fs.readFileSync("./snapshot.json", "utf-8");
    } catch (err) {
      console.log("snapshot not found");
    }

    if (snapshot) {
      const data = JSON.parse(snapshot);
      this.OrderBooks = data.orderbooks.map(
        (o: any) =>
          new OrderBook(
            o.baseAsset,
            o.bids,
            o.asks,
            o.lastTradeId,
            o.currentPrice,
          ),
      );
      console.log("this.OrderBooks: ", this.OrderBooks);
      this.balances = new Map(data.balances);
      console.log("this.balances : ", this.balances);
    }

    setInterval(() => {
      this.saveSnapShot();
    }, 1000 * 3);
  }

  saveSnapShot() {
    const snapshot = {
      orderbooks: this.OrderBooks.map((o) => o.getSnapshot()),
      balances: Array.from(this.balances.entries()),
    };

    fs.writeFileSync("./snapshot.json", JSON.stringify(snapshot));
  }

  process({ message, clientId }: { message: fromApi; clientId: string }) {
    switch (message.type) {
      case CREATE_ORDER:
        try {
          const { market, price, quantity, side, userId } = message.data;

          const res = this.createOrder(market, price, quantity, side, userId);
          RedisManager.getInstance().sendToApi(clientId, res);
        } catch (error) {}
    }
  }

  createOrder(
    market: string,
    price: string,
    quantity: string,
    side: OrderSide,
    userId: string,
  ) {
    const currentOrderbook = this.OrderBooks.filter(
      (o) => o.ticker() == market,
    );
    const baseAsset = market.split("_")[0];
    const quoteAsset = market.split("_")[1];

    this.checkAndLockFunds(
      baseAsset,
      quoteAsset,
      side,
      userId,
      price,
      quantity,
    );

    return currentOrderbook[0].addOrder({
      price: Number(price),
      quantity: Number(quantity),
      side,
      userId,
      orderId:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
      filled: 0,
    });
  }

  checkAndLockFunds(
    baseAsset: string,
    quoteAsset: string,
    side: OrderSide,
    userId: string,
    price: string,
    quantity: string,
  ) {
    const updatedValues = new Map();
    if (side == OrderSide.BUY) {
      const balance = this.balances?.get(userId)?.quoteAsset?.available;
      if (!balance) throw new Error("USer balance not found");
      const expectedValue = Number(price) * Number(quantity);
      if (balance && balance < expectedValue) {
        throw new Error(" insufficient balance");
      }

      this.balances.set(userId, {
        quoteAsset: {
          available: balance - expectedValue,
          locked: expectedValue,
        },
      });
    } else {
      const balance = this.balances?.get(userId)?.baseAsset?.available;
      if (!balance) throw new Error("USer balance not found");
      const expectedValue = Number(price) * Number(quantity);
      if (balance && balance < expectedValue) {
        throw new Error(" insufficient balance");
      }

      this.balances.set(userId, {
        baseAsset: {
          available: balance - expectedValue,
          locked: expectedValue,
        },
      });
    }
  }
}
