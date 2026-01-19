import { OrderBook } from "./orderbook";
import fs from 'fs';
interface UserBalance {
    [key: string] : {
        available: number;
        locked: number;
    }
}

export class Engine {
    private OrderBooks: OrderBook[]=[];
    private balances: Map<string, UserBalance> = new Map();

    constructor() {
        let snapshot = null;
        try{
            snapshot = fs.readFileSync('./snapshot.json','utf-8');

        }catch(err) {
            console.log('snapshot not found')
        }

        if(snapshot) {
            const data = JSON.parse(snapshot);
            this.OrderBooks = data.orderbooks.map((o: any) => new OrderBook(o.baseAsset, o.bids, o.asks, o.lastTradeId, o.currentPrice));
            this.balances = new Map(data.balances);
        }

        setInterval(() => {
            this.saveSnapShot();
        }, 1000*3);
    }

    saveSnapShot() {
        const snapshot = {
            orderbooks: this.OrderBooks.map(o=> o.getSnapshot()),
            balances: Array.from(this.balances.entries())
        }

        fs.writeFileSync('./snapshot.json',JSON.stringify(snapshot))
    }

    process({message, clientId}: {message: any, clientId: any}) {
        switch(message.type) {
            case 'create_order':
                try{
                    const res = this.
                }
        }
    }

    createOrder(market: string, price: string, quantity: string, side: 'buy'| 'sell', userId: string)  {
        const currentOrderbook = this.OrderBooks.map(o=> o.ticker() == market);
        currentOrderbook.
    }
}