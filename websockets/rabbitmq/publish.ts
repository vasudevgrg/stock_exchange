import { StockEvent } from "./enums/event-enum";
import { connectRabbitMQ, getRabbitChannel, closeRabbitMQ } from "./rabbitmq";

// Use a new exchange name to distinguish it
const EXCHANGE_NAME = "stock.";

type MessageData = {
  marketSymbol: string;
  event: StockEvent;
  data: object;
};

export const publishMessage = async (messageData: MessageData): Promise<void> => {
  try {
    const { marketSymbol, event, data } = messageData;
    await connectRabbitMQ();
    const channel = getRabbitChannel();

    await channel.assertExchange(
      composeExchangeName(marketSymbol, event),
      "fanout",
      { durable: true }
    );

    const message = JSON.stringify(data);
    channel.publish(EXCHANGE_NAME, "", Buffer.from(message));

    console.log(
      `[x] Sent broadcast: '${message}' to fanout exchange: ${EXCHANGE_NAME}`
    );
  } catch (error) {
    console.error("Error publishing message:", error);
    throw error;
  }
};

function composeExchangeName(symbol: string, event: StockEvent) {
  return EXCHANGE_NAME.concat(symbol, ".", event);
}
