import { AppDataSource } from "../config/data-source";
import { UserRepository } from "../repositories/UserRepository";

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository(AppDataSource.manager);
    }
    async register(data: {
        email:string,
        password: string,
        givenName:string,
        familyName:string
    }) {
        
    }
}