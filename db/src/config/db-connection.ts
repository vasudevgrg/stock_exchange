import { Sequelize, SequelizeOptions } from "sequelize-typescript";

const devOptions: SequelizeOptions = {
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DEV_DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

const sequelize = new Sequelize(
  devOptions
);

//sequelize.addModels(models); 

export default sequelize;