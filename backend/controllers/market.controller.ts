import { Request, Response, NextFunction } from "express";
import { marketService } from "../services/market-service";

export const getMarketDetialsController =async (
  req: Request,
  res: Response,
  next: NextFunction
)=> {
    const response = await marketService.getMarketData({...req.body, market_id: req.params.market_id});
    return res.send(response);
}