import { createChannel } from '../rabbitmq';
import { QUEUES } from '../queues';
import { UserRepository } from '../../repositories/user.repository';

export const startVerifyUserConsumer = async () => {
  const channel = await createChannel();
  await channel.assertQueue(QUEUES.VERIFY_USER, { durable: true });

  console.log('[VERIFY USER] En attente de messages...');

  channel.consume(QUEUES.VERIFY_USER, async (message) => {
    if (!message) return;

    const userId = message.content.toString();
    const exists = await UserRepository.exists(userId);

    channel.sendToQueue(
      message.properties.replyTo,
      Buffer.from(exists.toString()),
      {
        correlationId: message.properties.correlationId,
      }
    );

    channel.ack(message);
  });
};
