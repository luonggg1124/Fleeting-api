import dotenv from "dotenv";
import { startConsumer } from "./queue/rabbitmq.consumer";
dotenv.config();
const app =async ():Promise<void> => {
    try {
        console.log("Mail service is starting...");
        startConsumer();
    } catch (error:any) {
        console.log("Failed to start mail service",error);
        process.exit(1);
    }
}
app();