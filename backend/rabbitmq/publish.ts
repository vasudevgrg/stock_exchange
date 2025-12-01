import { StockEvent } from "./enums/event-enum";
import { connectRabbitMQ, getRabbitChannel, closeRabbitMQ } from "./rabbitmq";

const EXCHANGE_NAME = "stock.";

type MessageData = {
  marketSymbol: string;
  event: StockEvent;
  data: object;
};

export const publishMessage = async (messageData: MessageData): Promise<void> => {
  try {
    const { marketSymbol, data } = messageData;
    await connectRabbitMQ();
    const channel = getRabbitChannel();
    const exchange = composeExchangeName(marketSymbol);
    console.log('exchange: ', exchange);
    await channel.assertExchange(
      exchange,
      "fanout",
      { durable: true }
    );

    const message = JSON.stringify(data);
    channel.publish(exchange, "", Buffer.from(message));

    console.log(
      `[x] Sent broadcast: '${message}' to fanout exchange: ${exchange}`
    );
  } catch (error) {
    console.error("Error publishing message:", error);
    throw error;
  }
};

function composeExchangeName(symbol: string) {
  return EXCHANGE_NAME.concat(symbol);
}
