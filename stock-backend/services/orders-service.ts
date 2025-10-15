import { Op, where } from "sequelize";
import Order from "../models/order.model";
import Trade from "../models/trade.model";
import User from "../models/user.model";
import OrderRepository from "../repositories/orders-repository";
import TradeRepository from "../repositories/trades-repository";
import UserRepository from "../repositories/users-repository";
import MarketRepository from "../repositories/markets-repository";
import Market from "../models/market.model";
import { publishMessage } from "../rabbitmq/publish";
import { StockEvent } from "../rabbitmq/enums/event-enum";

interface BuyStock {
  quantity: number;
  price: number;
  user_id: number;
  market_id: number;
}

interface SellStock {
  quantity: number;
  price: number;
  user_id: number;
  market_id: number;
}

class OrdersService {
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

  async buyStockService(payload: BuyStock) {
    const { quantity, price, user_id, market_id } = payload;
    console.log("payload: ", payload);
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    let totalPrice = quantity * price;

    try {
      if (!user?.checkBalance(totalPrice)) {
        throw new Error("user doesnt have enough balance.");
      }

      const order = await this.orderRepository.create({
        type: "buy",
        price: price,
        quantity: quantity,
        market_id,
        user_id,
      });
      const sellOrders = await this.orderRepository.find({
        where: {
          price: { [Op.lte]: price },
          type: "sell",
        },
        order: [["price", "ASC"]],
      });

      if (sellOrders.length) {
        let i = 0;
        let sellerOrderIds = [];
        let totalQuantity = 0;

        while (totalPrice != 0 && i < sellOrders.length) {
          const order = sellOrders[i];
          if (order.quantity * order.price <= totalPrice) {
            totalPrice -= order.quantity * order.price;
            totalQuantity += order.quantity;
          } else {
            totalQuantity += totalPrice / order.price;
            await this.orderRepository.update(
              { quantity: order.quantity - totalPrice / order.price },
              {
                where: { id: order.id },
                returning: true,
              }
            );
            totalPrice = 0;
          }
          sellerOrderIds.push(order.id);
          i++;
        }

        const trade = await this.tradeRepository.create({
          seller_order_ids: sellerOrderIds,
          buyer_order_ids: [order.id],
          market_id,
          price: price,
          quantity: totalQuantity,
        });

        await this.marketRepository.update(
          {
            current_price: price,
          },
          {
            where: {
              id: market_id,
            },
            returning: true,
          }
        );
      }
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }

  async sellStockService(payload: SellStock) {
    const { quantity, price, user_id, market_id } = payload;
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    const market = await this.marketRepository.findOne({where: {id: market_id}})
    let totalPrice = quantity * price;
    const order = await this.orderRepository.create({
      type: "sell",
      price: price,
      quantity: quantity,
      market_id,
      user_id,
    });
    const buyOrders = await this.orderRepository.find({
      where: {
        price: { [Op.gte]: price },
        type: "buy",
      },
      order: [["price", "DESC"]],
    });

    if (buyOrders.length) {
      let i = 0;
      let buyerOrderIds = [];
      let totalQuantity = 0;

      while (totalPrice != 0 && i < buyOrders.length) {
        const order = buyOrders[i];
        if (order.quantity * order.price <= totalPrice) {
          totalPrice -= order.quantity * order.price;
          totalQuantity += order.quantity;
        } else {
          totalQuantity += totalPrice / order.price;
          await this.orderRepository.update(
            { quantity: order.quantity - totalPrice / order.price },
            {
              where: { id: order.id },
              returning: true,
            }
          );
          totalPrice = 0;
        }
        buyerOrderIds.push(order.id);
        i++;
      }

      const trade = await this.tradeRepository.create({
        seller_order_ids: [order.id],
        buyer_order_ids: buyerOrderIds,
        market_id,
        price: price,
        quantity: totalQuantity,
      });

      await publishMessage({marketSymbol: market?.name, event: StockEvent, data: trade});

      await this.marketRepository.update(
        {
          current_price: price,
        },
        {
          where: {
            id: market_id,
          },
          returning: true,
        }
      );
    }
  }
}

export const ordersService = new OrdersService();
