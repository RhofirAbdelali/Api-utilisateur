import amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

export const createChannel = async () => {
  const connection = await amqp.connect(RABBITMQ_URL);
  return connection.createChannel();
};
