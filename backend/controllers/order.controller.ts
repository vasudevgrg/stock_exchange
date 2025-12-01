import { NextFunction, Request, Response } from "express";
import { ordersService } from "../services/orders-service";
import { publishMessage } from "../rabbitmq/publish";
import { ConsumerTypes } from "../rabbitmq/consumer-types";

export const sellStocksOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ordersService.sellStockService(req.body);
    res.status(201).json({ message: "stocks sold successfully." });
  } catch (err) {
    console.log('err: ', err);
    next(err);
  }
};

export const buyStocksOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try{
    // await publishMessage({
    //     type: ConsumerTypes.BUY_STOCKS,
    //     body: req.body
    // });
    
    await ordersService.buyStockService(req.body);


    res.status(201).json({ message: "stocks bought successfully." });
  } catch (err) {
    console.log('err: ', err);
    next(err);
  }
};

