import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import 'dotenv/config';
import { config } from "./config";
import { Trade } from "../models/trade";
import { Order } from "../models/order";
import { Market } from "../models/market";


const devOptions: SequelizeOptions = config['development'];
console.log(Trade, Order, Market)
const sequelize = new Sequelize({
  ...config["development"],
  models: [Trade, Order, Market]
});


export default sequelize;