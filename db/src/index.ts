import { createClient } from "redis";
import { Sequelize } from "sequelize";
import sequelize from "./config/db-connection";

async function main() {
  try {
    const client = createClient();
    await client.connect();
    await sequelize.authenticate();
    const res = client.rPop("db_processor");

    if (!res) {
    } else {
    }

    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
