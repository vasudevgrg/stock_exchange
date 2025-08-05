import { Connection, Channel } from 'amqplib';
import * as amqp from 'amqplib';

let connection: Connection;
let channel: Channel;

export const connectRabbitMQ = async (): Promise<void> => {
    const RABBIT_URL = 'amqp://localhost';

    try {
        connection = await amqp.connect(RABBIT_URL);
        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.error("Failed to connect to RabbitMQ", error);
        process.exit(1);
    }
};

export const getRabbitChannel = (): Channel => {
    if (!channel) {
        throw new Error("RabbitMQ channel not initialized");
    }

    return channel;
};

export const closeRabbitMQ = async (): Promise<void> => {
    try {
        if (channel) {
            await channel.close();
        }
        if (connection) {
            await connection.close();
        }
        console.log('RabbitMQ connection closed.');
    } catch (error) {
        console.error("Error closing RabbitMQ connection", error);
    }
};