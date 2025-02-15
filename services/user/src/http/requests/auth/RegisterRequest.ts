import { body } from "express-validator";

export const registerRequest = [
    
    body("email").isEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email."),
    body("password").isEmpty().withMessage("Password is required")
    .isLength({min:8}).withMessage("Password must be at least 8 characters long."),
    body("givenName").isEmpty().withMessage("Given name is required."),
    body("familyName").isEmpty().withMessage("Family name is required")
];