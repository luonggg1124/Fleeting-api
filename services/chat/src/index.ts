import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/db";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4003;
app.use(express.json());
app.get('/',(req:Request, res: Response) => {
    res.json({
        message: "Chat server is running"
    });
});


app.listen(PORT, () => {
    //connectDB();
    console.log(`Chat service is running on port ${PORT}`);
});




