import express from 'express';
import { sequelize } from './config/config.database';
import { connectRabbitMQ } from './rabbitmq/rabbitmq';

const app = express();

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        // await sequelize.sync();

        app.listen(8081, () => {
            console.log('listening to 8081');
        });
        await connectRabbitMQ()
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        process.exit(1);
    }
};

startServer();
