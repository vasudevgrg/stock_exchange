import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import Market from "../models/market.model";
import Order from "../models/order.model";
import User from "../models/user.model";
import Trade from "../models/trade.model";
import path from "path";

const models = [Market, Order, User, Trade];

const devOptions: SequelizeOptions = {
  dialect: "postgres",
  host: process.env.DEV_DB_HOST || 'localhost',
  port: Number(process.env.DEV_DB_PORT) || 5432,
  models: models,
  username: 'postgres',
  password: 'postgres',
  database: 'stock_market'
};

const sequelize = new Sequelize(
  devOptions
);

//sequelize.addModels(models); 

export default sequelize;