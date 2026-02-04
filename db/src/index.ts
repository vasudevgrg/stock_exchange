import { createClient } from "redis";
import { Sequelize } from "sequelize";
import sequelize from "./config/db-connection";
import { DbProcessor } from "./services";

async function main() {
  try {
    const dbProcessor = new DbProcessor();
    const client = createClient();
    await client.connect();
    await sequelize.authenticate();
    const res =await client.lPop("db_processor");
    console.log("Connection has been established successfully.");

    while (true) {
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
