import { RedisManager } from "../redis-manager";
import {
  CANCEL_ORDER,
  CREATE_ORDER,
  fromApi,
  GET_OPEN_ORDERS,
} from "../types/fromApi";
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
            o.bids,
            o.asks,
            o.baseAsset,
            o.lastTradeId,
            o.currentPrice,
          ),
      );
      this.balances = new Map(data.balances);
    }

    setInterval(() => {
      console.log('working 3 sec')
      this.saveSnapShot();
    }, 1000 * 3);
  }

  saveSnapShot() {
    const snapshot = {
      orderbooks: this.OrderBooks.map((o) => o.getSnapshot()),
      balances: Array.from(this.balances.entries()),
    };

    console.log('snapshot: ', snapshot.orderbooks[0].bids);
    fs.writeFileSync("./snapshot.json", JSON.stringify(snapshot));
  }

  async process({ message, clientId }: { message: fromApi; clientId: string }) {
    console.log('message: ', message);
    switch (message.type) {
      case CREATE_ORDER:
        try {
          const { market, price, quantity, side, userId } = message.data;
          console.log('market: ', market);

          const res = this.createOrder(market, price, quantity, side, userId);
          await RedisManager.getInstance().sendToApi(clientId, res);
        } catch (error) {}
        break;
      case CANCEL_ORDER:
        try {
          const { orderId, market } = message.data;
          console.log('market: ', market);

          const orderBook = this.OrderBooks.find((o) => o.ticker() == market);
          const order =
            orderBook?.bids.find((bid) => bid.orderId == orderId) ||
            orderBook?.asks.find((ask) => ask.orderId == orderId);
          const baseAsset = market.split("/")[0];
          const quoteAsset = market.split("/")[1];
          if (!order) {
            console.log("⚠️ Order already cancelled:", orderId);
            return {message:'order doesnt exist'}
            return;
          }
          console.log("order: ", order.userId);
          const userBalance = this.balances.get(order.userId);

          if (!userBalance) {
            throw new Error(`User balance not found for ${order.userId}`);
          }

          const remaining = order.quantity - order.filled;

          if (order.side === "buy") {
            // BUY → refund INR
            if (!userBalance[quoteAsset]) {
              userBalance[quoteAsset] = { available: 0, locked: 0 };
            }

            userBalance[quoteAsset].available += order.price * remaining;
            userBalance[quoteAsset].locked -= order.price * remaining;
          } else {
            // SELL → refund TATA
            if (!userBalance[baseAsset]) {
              userBalance[baseAsset] = { available: 0, locked: 0 };
            }

            userBalance[baseAsset].available += remaining;
            userBalance[baseAsset].locked -= remaining;
          }
          RedisManager.getInstance().sendToApi(clientId, {
            status: "cancelled",
            orderId,
            market,
          });
          RedisManager.getInstance().publishMessage(market, {
            type: "depth",
            data: orderBook?.getDepth(),
          });
        } catch (err) {
          console.log("cancel order error: ", err);
        }
        break;
      case GET_OPEN_ORDERS:
        try {
          const { market, userId } = message.data;
          const orderBook = this.OrderBooks.find((o) => o.ticker() == market);
          const orders = [...orderBook.bids, ...orderBook.asks].filter(
            (o) => o.userId == userId,
          );
          RedisManager.getInstance().sendToApi(clientId, {
            status: "open_orders",
            orders,
          });
        } catch (err) {
          console.log("get open orders error: ", err);
        }
        break;
    }
  }

  createOrder(
    market: string,
    price: string,
    quantity: string,
    side: OrderSide,
    userId: string,
  ) {
    const currentOrderbook = this.OrderBooks.find((o) => o.ticker() === market);

    const baseAsset = market.split("/")[0];
    const quoteAsset = market.split("/")[1];
    this.checkAndLockFunds(
      baseAsset,
      quoteAsset,
      side,
      userId,
      price,
      quantity,
    );
    return currentOrderbook.addOrder({
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
    if (side == OrderSide.BUY) {
      const balance = this.balances?.get(userId)?.[quoteAsset]?.available;

      if (!balance) throw new Error("USer balance not found");
      const expectedValue = Number(price) * Number(quantity);
      if (balance && balance < expectedValue) {
        throw new Error(" insufficient balance");
      }

      this.balances.set(userId, {
        [quoteAsset]: {
          available: balance - expectedValue,
          locked: expectedValue,
        },
      });

      console.log(this.balances.get(userId))
    } else {
      const balance = this.balances?.get(userId)?.baseAsset?.available;
      if (!balance) throw new Error("USer balance not found");
      const expectedValue = Number(quantity);
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
