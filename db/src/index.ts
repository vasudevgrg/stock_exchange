import { createClient } from "redis";
import { Sequelize } from "sequelize";
import sequelize from "./config/db-connection";
import { DbProcessor } from "./services";
import { createKlineViews } from "./views/kline-views";
import {refreshViewInterval} from './scripts/cron-job';

async function main() {
  try {
    const dbProcessor = new DbProcessor();
    const client = createClient();
    await client.connect();
    await sequelize.authenticate();
       await sequelize.query(`CREATE EXTENSION IF NOT EXISTS timescaledb;`);

    await sequelize.sync();
    await createKlineViews();
    refreshViewInterval();
    console.log("Connection has been established successfully.");
     
     while (true) {
      const res =await client.lPop("db_processor");
      if (!res) {
      } else {
        dbProcessor.process(JSON.parse(res));
      }
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
