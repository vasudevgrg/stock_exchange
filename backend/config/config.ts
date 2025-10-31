require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME || 'postgres',
    password: process.env.DEV_DB_PASSWORD || 'postgres',
    database: process.env.DEV_DB_NAME || 'stock_market',
    host: process.env.DEV_DB_HOST || 'localhost',
    port: Number(process.env.DEV_DB_PORT) || 5432,
    dialect: 'postgres',
  },
};
