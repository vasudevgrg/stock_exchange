import { connectRabbitMQ, getRabbitChannel, closeRabbitMQ } from "./rabbitmq";

// Use a new exchange name to distinguish it
const EXCHANGE_NAME = 'stock.';

export const publishMessage = async (messageData: object): Promise<void> => {
    try {
        await connectRabbitMQ();
        const channel = getRabbitChannel();

        await channel.assertExchange(EXCHANGE_NAME, 'fanout', { durable: true });

        const message = JSON.stringify(messageData);
        channel.publish(EXCHANGE_NAME, '', Buffer.from(message));
        
        console.log(`[x] Sent broadcast: '${message}' to fanout exchange: ${EXCHANGE_NAME}`);

    } catch (error) {
        console.error('Error publishing message:', error);
        throw error;
    }
};