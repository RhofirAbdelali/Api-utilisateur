import { createChannel } from '../rabbitmq';

export const publishEvent = async (queue: string, message: object) => {
  const channel = await createChannel();
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  await channel.close();
};
