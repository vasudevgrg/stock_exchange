interface RabbitMqConfigType {
  rabbitmq_dsn: string | undefined;
  rabbitmq_exchange: string | undefined;
  rabbitmq_username: string | undefined;
  rabbitmq_password: string | undefined;
  rabbitmq_queue: string | undefined;
}

const RabbitMqConfig: RabbitMqConfigType = {
  rabbitmq_dsn: process.env.RABBITMQ_DSN,
  rabbitmq_exchange: process.env.RABBITMQ_EXCHANGE,
  rabbitmq_username: process.env.RABBITMQ_USERNAME,
  rabbitmq_password: process.env.RABBITMQ_PASSWORD,
  rabbitmq_queue: process.env.RABBITMQ_QUEUE,
};

export default RabbitMqConfig;
