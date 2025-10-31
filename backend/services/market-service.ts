import Market from "../models/market.model";
import Order from "../models/order.model";
import Trade from "../models/trade.model";
import User from "../models/user.model";
import MarketRepository from "../repositories/markets-repository";
import OrderRepository from "../repositories/orders-repository";
import TradeRepository from "../repositories/trades-repository";
import UserRepository from "../repositories/users-repository";

class MarketService{
  userRepository: UserRepository;
  tradeRepository: TradeRepository;
  orderRepository: OrderRepository;
  marketRepository: MarketRepository;

  constructor() {
    this.userRepository = new UserRepository(User);
    this.tradeRepository = new TradeRepository(Trade);
    this.orderRepository = new OrderRepository(Order);
    this.marketRepository = new MarketRepository(Market);
  }

  async getMarketData(payload : {
    market_id: number,
    limit?: number
  }) {
    const {market_id, limit=15} = payload;
    const buyOrders = await this.orderRepository.find({
      where: {
        type: 'buy',
        market_id: market_id
      }, limit,
      order: [['price', 'DESC']],
      raw: true
    });
    const sellOrders = await this.orderRepository.find({
      where: {
        type: 'sell'
      }, limit,
      order: [['price', 'ASC']],
      raw: true
    });

    const market = await this.marketRepository.findOne({
        where: {id: market_id}
    });

    const trades = await this.tradeRepository.find({
        where: {
            market_id
        },
        limit
    });

    return {
      buyOrders: this.addTotal(buyOrders), sellOrders: this.addTotal(sellOrders), market, trades
    };
  }

   addTotal(orders: Order[]) {
    let total =0;
    return orders.map(order => {
      const currSum = total+ order.price;
      total = currSum;
      return {...order, total: currSum}
    })

  }

}

export const marketService = new MarketService();