import { createChannel } from '../rabbitmq';
import { QUEUES } from '../queues';
import jwt from 'jsonwebtoken';

export const startJwtConsumer = async () => {
  const channel = await createChannel();
  await channel.assertQueue(QUEUES.JWT_VALIDATE, { durable: false });

  console.log('🎧 [JWT] En attente de messages...');

  channel.consume(QUEUES.JWT_VALIDATE, async (msg) => {
    if (!msg) return;

    const token = msg.content.toString();
    let response = null;

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      response = { userId: decoded.id };
    } catch {}

    channel.sendToQueue(
      msg.properties.replyTo,
      Buffer.from(JSON.stringify(response)),
      {
        correlationId: msg.properties.correlationId,
      }
    );

    channel.ack(msg);
  });
};
