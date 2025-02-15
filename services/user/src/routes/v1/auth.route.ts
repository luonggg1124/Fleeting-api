import express from "express";
import AuthController from "../../http/controllers/AuthController";


const authRoutes = express.Router();

authRoutes.post("/verification-code",AuthController.sendVerificationMail);


export default authRoutes;