  import "dotenv/config";
  import type { SequelizeOptions } from "sequelize-typescript";

  type Environment = "development" | "test" | "production";

  export const config: Record<Environment, SequelizeOptions> = {
    development: {
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DEV_DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    },

    test: {
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DEV_DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },

    production: {
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DEV_DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
  };
