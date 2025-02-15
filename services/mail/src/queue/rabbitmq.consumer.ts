import amqp from "amqplib";
import { sendMail } from "../config/mail";

const QUEUE_NAME = "email_queue";

export const startConsumer = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL as string);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log("📨 Waiting for email events...");

    channel.consume(QUEUE_NAME, async (msg) => {
      if (msg !== null) {
        const { to, subject, html } = JSON.parse(msg.content.toString());
        try {
          await sendMail(to,subject,html);
          channel.ack(msg); 
        } catch (error:any) {
          console.error("❌ Failed to send email:", error);
        }
      }
    });
  } catch (error:any) {
    console.error("❌ RabbitMQ Consumer Error:", error);
  }
};
