import { Sequelize } from "sequelize-typescript";
import sequelize from "./config/db-connection";
import { Trade } from "./models/trade";
import { OrderRepository } from "./repositories/order.repository";
import { TradeRepository } from "./repositories/trade.repository";
import { Order } from "./models/order";

export class DbProcessor {
    sequelize: Sequelize;
    orderRepository: OrderRepository;
    tradeRepository: TradeRepository;

    constructor() {
        this.sequelize = sequelize;
        this.orderRepository = new OrderRepository(Order);
        this.tradeRepository = new TradeRepository(Trade);
    }

    async process(message: any) {
        const {type, data} = message; 
        switch (type){
            case 'create_trade':
                try{
                    await this.tradeRepository.create(data);
                }catch(error) {
                    throw new Error('error while trading error')
                }
        }
    }

}