import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { validationResult } from "express-validator";


export class AuthController {
    private authService: AuthService;
    constructor() {
        this.authService = new AuthService();
    }
    async register(req: Request, res: Response):Promise<void> {
        try {
            const errors = validationResult(req);
            this.authService.register(req.body);
        } catch (error:any) {
            
        }
    }
}