import cacheClient from "../config/cache-client";
import { AppDataSource } from "../config/data-source";
import { ConflictException } from "../exceptions/ConflictException";
import { UserRepository } from "../repositories/UserRepository";
import jwt from "jsonwebtoken";
import { randomNumberString } from "../utils/number";
export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository(AppDataSource.manager);
  }
  protected async storeRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<void> {
    await cacheClient.set(
      `refresh_token:${userId}`,
      refreshToken,
      7 * 24 * 60 * 60
    );
  }
  protected generateToken = (userId:string) => {
    const accessToken =  jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET as string,{
      expiresIn: "15m"  
    });
    const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET as string,{
      expiresIn: "7d"
    });
    return {accessToken,refreshToken};
  }
  async sendVerificationCode(email:string){
    const existingUser = await this.userRepository.findByEmail(email);
    if(existingUser){
      throw new ConflictException("User already exists.");
    }
    const code = randomNumberString(6);
    const existingCode = await cacheClient.get(`verificationCode:${email}`);
    if(existingCode){
      await cacheClient.del(`verificationCode:${email}`);
    }
    
  }
  async register(data: {
    email: string;
    password: string;
    givenName: string;
    familyName: string;
  }) {
    
    const user = await this.userRepository.create({
      email: data.email,
      password: this.userRepository.hasPassword(data.password) as any,
      fullName: `${data.givenName} ${data.familyName}`,
      isVerified: false,
      isBanned: false
    })
  }
}
