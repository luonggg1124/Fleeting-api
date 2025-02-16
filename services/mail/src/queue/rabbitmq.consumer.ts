import amqp from "amqplib";
import { sendMail } from "../config/mail";
import { EmailLogService } from "../services/EmailLogService";

const QUEUE_NAME = "mail_queue";
const QUEUE_RESPONSE_NAME = "mail_queue_response";
const emailLogService = new EmailLogService();
export const startConsumer = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL as string);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);
    await channel.assertQueue(QUEUE_RESPONSE_NAME);
    console.log("📨 Waiting for email events...");
    channel.consume(QUEUE_NAME, async (msg) => {
      if (msg !== null) {
        const { to, subject, html } = JSON.parse(msg.content.toString());
        try {
          await sendMail(to, subject, html);
          channel.sendToQueue(msg.properties.replyTo, Buffer.from("success"), {
            correlationId: msg.properties.correlationId,
          });
          try {
            emailLogService.logMail({
              email: to,
              subject: subject,
              content: html,
              status: "success",
              provider: process.env.MAIL_MAILER as string,
            });
          } catch (error: any) {
            console.log(`Failed to log mail. Error: ${error}`);
          }
        } catch (error: any) {
          console.error("❌ Failed to send email:", error);
          channel.sendToQueue(msg.properties.replyTo, Buffer.from("failed"), {
            correlationId: msg.properties.correlationId,
          });
          try {
            emailLogService.logMail({
              email: to,
              subject: subject,
              content: html,
              status: "failed",
              provider: process.env.MAIL_MAILER as string,
            });
          } catch (error: any) {
            console.log(`Failed to log mail. Error: ${error}`);
          }
        }
        channel.ack(msg);
      }
    });
  } catch (error: any) {
    console.error("❌ RabbitMQ Consumer Error:", error);
    throw new Error(`❌ RabbitMQ Consumer Error:${JSON.stringify(error)}`);
  }
};
