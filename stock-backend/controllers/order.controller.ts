import { NextFunction, Request, Response } from "express";
import { ordersService } from "../services/orders-service";

export const sellStocksOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ordersService.sellStockService(req.body);
    res.status(201).json({ message: "orders sold successfully." });
  } catch (err) {
    next(err);
  }
};
