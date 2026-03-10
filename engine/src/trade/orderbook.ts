export interface Order {
  price: number;
  quantity: number;
  orderId: string;
  filled: number;
  side: "buy" | "sell";
  userId: string;
}

export interface Fill {
  price: string;
  quantity: number;
  tradeId: number;
  otherUserId: string;
  marketOrderId: string;
}

export enum OrderSide {
    BUY='buy',
    SELL= 'sell'
}

export class OrderBook {
  bids: Order[];
  asks: Order[];
  baseAsset: string;
  quoteAsset: string = "INR";
  lastTradeId: number;
  currentPrice: number;

  constructor(
    bids: Order[],
    asks: Order[],
    baseAsset: string,
    lastTradeId: number,
    currentPrice: number,
  ) {
    this.bids = bids;
    this.asks = asks;
    this.baseAsset = baseAsset;
    this.lastTradeId = lastTradeId;
    this.currentPrice = currentPrice;
  }

  ticker() {
    return `${this.baseAsset}_${this.quoteAsset}`;
  }

  getSnapshot() {
    return {
      baseAsset: this.baseAsset,
      bids: this.bids,
      asks: this.asks,
      lastTradeId: this.lastTradeId,
      currentPrice: this.currentPrice,
    };
  }

  addOrder(order: Order) {
    if (order.side == "buy") {
      const { executedQuantity, fills } = this.matchBids(order);
      order.filled = executedQuantity;
      if (executedQuantity == order.quantity) {
        return { executedQuantity, fills };
      }
      this.bids.push(order);
      return {
        executedQuantity,
        fills,
      };
    } else {
      const { executedQuantity, fills } = this.matchAsks(order);
      order.filled = executedQuantity;
      if (executedQuantity == order.quantity) {
        return { executedQuantity, fills };
      }
      this.asks.push(order);
      return {
        executedQuantity,
        fills,
      };
    }
  }

  matchBids(order: Order) {
    let executedQuantity = 0;
    let fills: Fill[] = [];
    for (let i = 0; i < this.asks.length; i++) {
      if (
        this.asks[i].price <= order.price &&
        executedQuantity < order.quantity &&
        this.asks[i].userId != order.userId
      ) {
        let qty = Math.min(
          order.quantity - executedQuantity,
          this.asks[i].quantity,
        );
        executedQuantity += qty;
        this.asks[i].filled += qty;
        fills.push({
          price: this.asks[i].price.toString(),
          quantity: qty,
          tradeId: this.lastTradeId++,
          otherUserId: this.asks[i].userId,
          marketOrderId: this.asks[i].orderId,
        });
      }
    }

    for (let i = 0; i < this.asks.length; i++) {
      if (this.asks[i].filled == this.asks[i].quantity) {
        this.asks.splice(i, 1);
        i--;
      }
    }
    return { fills, executedQuantity };
  }

  matchAsks(order: Order) {
    const fills: Fill[] = [];
    let executedQuantity = 0;

    for (let i = 0; i < this.bids.length; i++) {
      if (
        this.bids[i].price >= order.price &&
        executedQuantity < order.quantity &&
        this.asks[i].userId != order.userId
      ) {
        const qty = Math.min(
          order.quantity - executedQuantity,
          this.bids[i].quantity,
        );
        executedQuantity += qty;
        this.bids[i].filled += qty;

        fills.push({
          price: this.bids[i].price.toString(),
          quantity: qty,
          tradeId: this.lastTradeId++,
          otherUserId: this.bids[i].userId,
          marketOrderId: this.bids[i].orderId,
        });
      }
    }

    for (let i = 0; i < this.bids.length; i++) {
      if (this.bids[i].filled == this.bids[i].quantity) {
        this.bids.splice(i, 1);
        i--;
      }
    }
    return { fills, executedQuantity };
  }

  getDepth() {
    
  }
}
