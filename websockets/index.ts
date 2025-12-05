import express from "express";
import { WebsocketManager } from "./websocker-manager";
import cors from 'cors';
import { connectRabbitMQ } from "./rabbitmq/rabbitmq";
import configureRoutes from "./socket";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser('vasudev'))
.use(express.json())
.use(cors({
    origin: '*'
}));

const PORT = 9000;


configureRoutes( app.listen(PORT, async () => {
  await connectRabbitMQ();
  console.log(`Server listening on port ${PORT}`);
}))