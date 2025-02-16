import amqp from "amqplib";
import { randomUUID } from "crypto";
import dotenv from "dotenv";
dotenv.config();
const QUEUE_NAME = "mail_queue";
const QUEUE_RESPONSE_NAME = "mail_queue_response";
export const mailEvent = async (
  to: string,
  subject: string,
  html?: string
): Promise<any> => {
  const conn = await amqp.connect(process.env.RABBITMQ_URL as string);
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });
  await channel.assertQueue(QUEUE_RESPONSE_NAME,{durable:true});
  return new Promise((resolve, reject) => {
    const correlationId = randomUUID();
    const message = JSON.stringify({ to, subject, html });
    channel.sendToQueue(QUEUE_NAME, Buffer.from(message), {
      correlationId,
      replyTo: "mail_response_queue",
    });
    
    channel.consume("mail_response_queue", (msg: any) => {
      if (msg?.properties.correlationId === correlationId) {
        const response = msg.content.toString();
        if (response === "success") {
          resolve({
            message: "Email sent successfully.",
          });
        } else {
          reject({
            message: "Failed to send email.",
          });
        }
      }
    },{noAck: true});
    console.log(`Email event sent to RabbitMQ: ${to}`);
  });
};
