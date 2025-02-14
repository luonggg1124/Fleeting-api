import "reflect-metadata";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";

dotenv.config();
const PORT = process.env.PORT || 4001;
const app = express();

app.use(express.json());

app.get('/',(req: Request, res: Response) => {
    res.json({
        message: "User Service is running."
    });
    return;
});
    
AppDataSource.initialize().then(() => {
    console.log("Connected to postgres server");
    app.listen(PORT,() => {
        console.log("User service is running on port " +PORT);
    })
}).catch((error:any) => {
    console.error('Database connection error:', error);
});

