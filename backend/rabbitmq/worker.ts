import { ordersService } from "../services/orders-service";
import { ConsumerTypes } from "./consumer-types";
import { connectRabbitMQ, getRabbitChannel, closeRabbitMQ } from "./rabbitmq";

const QUEUE_NAME = 'stock.stock_backend_queue';
const EXCHANGE_NAME = 'stock.api_server_exchange';

const startWorker = async () => {
    await connectRabbitMQ()
    const channel = getRabbitChannel()

    await channel.assertExchange(EXCHANGE_NAME, 'fanout', { durable: true });

    const q = await channel.assertQueue(QUEUE_NAME, { durable: true });


    await channel.bindQueue(q.queue, EXCHANGE_NAME, '');
    console.log(`Worker bound queue '${q.queue}' to fanout exchange '${EXCHANGE_NAME}'`);
    
    console.log(`Worker start listening`);

    channel.consume(q.queue, async (msg) => {
        if (msg) {
            let data = JSON.parse(msg.content.toString());
            console.log("Proccessing fanout message:", data);

            if(data.type == ConsumerTypes.SELL_STOCKS){
                await ordersService.sellStockService(data.body);
            }else if(data.type == ConsumerTypes.BUY_STOCKS) {
                 await ordersService.buyStockService(data.body);
            }

            channel.ack(msg);
            console.log("Message Acknowledged");
        }
    }, { exclusive: false });
};

startWorker()
    .catch(error => {
        console.error('Error starting worker', error);
        process.exit(1);
    });