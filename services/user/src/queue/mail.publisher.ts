import amqp from "amqplib";
import dotenv from "dotenv";
dotenv.config();
const QUEUE_NAME="mail_queue";

export const mailEvent = async (to:string, subject:string,html?:string):Promise<void> => {
    try {
        const conn = await amqp.connect(process.env.RABBITMQ_URL as string);
        const channel = await conn.createChannel();
        await channel.assertQueue(QUEUE_NAME,{durable:true});
        const message = JSON.stringify({ to, subject,html });
        channel.sendToQueue(QUEUE_NAME, Buffer.from(message), {persistent:true});
        console.log(`Email event sent to RabbitMQ: ${to}`);
        await channel.close();
        await conn.close();
    } catch (error:any) {
        console.error("Failed to publish message:", error);
    }
}