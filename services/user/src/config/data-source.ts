import { DataSource } from "typeorm";
import dotenv from "dotenv";




dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URI,
  ssl: {
    rejectUnauthorized: false
  },  
  synchronize: true, //false in production
  logging: true,
  entities: ["./src/models/entities/**/*.ts"],
  migrations: ['./src/models/migrations/**/*.ts'],
});
