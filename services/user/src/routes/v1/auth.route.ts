import express from "express";
import AuthController from "../../http/controllers/AuthController";


const authRoutes = express.Router();

authRoutes.post("/verification-code",AuthController.sendVerificationMail);
authRoutes.post("/register",AuthController.register);
export default authRoutes;