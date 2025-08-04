import express from 'express';
import { sequelize } from './config/config.database';

const app = express();

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        // This line will create or update (if needed) your tables based on your models
        // await sequelize.sync();

        app.listen(8081, () => {
            console.log('listening to 8081');
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        process.exit(1);
    }
};

startServer();
