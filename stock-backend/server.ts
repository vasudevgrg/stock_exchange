import express from 'express';
import { connectRabbitMQ } from './rabbitmq/rabbitmq';
import routes from './routes'; 
import cors from 'cors';
import sequelize from './config/config.database';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', routes); 

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        await sequelize.sync();

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
