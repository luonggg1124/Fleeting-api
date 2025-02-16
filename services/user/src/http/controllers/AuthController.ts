import { Request, Response } from "express";

import { validationResult } from "express-validator";
import { AuthService } from "../../services/AuthService";
import { ConflictException } from "../../exceptions/ConflictException";


class AuthController {
    private authService: AuthService;
    constructor(authService: AuthService = new AuthService()) {
        this.authService = authService;
    }
    register = async (req: Request, res: Response):Promise<void> => {
        try {
            //const errors = validationResult(req);
            const result =  this.authService.register(req.body.email);
            res.json(result);
            return;
        } catch (error:any) {
            console.log(error);
            
            res.status(500).json({
                message: "Internal Server Error."
            });
            return;
        }
    }
    sendVerificationMail = async (req: Request, res: Response): Promise<void> =>  {
        try {
            const {email} = req.body;
            if(!email){
                res.status(400).json({
                    message: "Email is required"
                });
                return;
            }
            this.authService.sendVerificationCode(email);
            res.json({
                message: "Verification code already sent to your mail."
            });
            return;
        } catch (error:any) {
            if(error instanceof ConflictException){
                res.status(error.getStatus() as number).json({
                    message: error.message
                });
                return;
            }
            console.log(error);
            
            res.status(500).json({
                message: "Internal Server Error",
                error
            });
            return;
            
        }
    }
}

export default new AuthController();