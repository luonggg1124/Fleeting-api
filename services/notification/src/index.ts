import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4002;

app.use(express.json());

app.get("/",(req:Request, res: Response) => {
    res.json({
        message: "Notification service is running"
    });
    return;
});

app.listen(PORT, () => {
    console.log(`Notification service is running on port ${PORT}`); 
});


