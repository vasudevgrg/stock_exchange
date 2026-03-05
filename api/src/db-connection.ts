import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

export const dbConnection = new Client({
  user: "neondb_owner",
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: String(process.env.DB_PASSWORD),
  ssl:true,
  port: 5432
});

dbConnection.connect();


