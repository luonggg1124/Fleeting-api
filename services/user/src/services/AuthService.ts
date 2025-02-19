import cacheClient from "../config/cache-client";
import { AppDataSource } from "../config/data-source";
import { ConflictException } from "../exceptions/ConflictException";
import { UserRepository } from "../models/repositories/UserRepository";
import jwt from "jsonwebtoken";
import { randomNumberString } from "../utils/number";
import sendVerificationCodeMail from "../mail/send-verification-code";
export class AuthService {
  private userRepository: UserRepository;

  constructor(
    userRepository: UserRepository = new UserRepository(AppDataSource.manager)
  ) {
    this.userRepository = userRepository;
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
  protected generateToken = (userId: string) => {
    const accessToken = jwt.sign(
      { userId },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = jwt.sign(
      { userId },
      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: "7d",
      }
    );
    return { accessToken, refreshToken };
  };
  async sendVerificationCode(email: string) {
    const [existingUser, existingCode] = await Promise.all([
      this.userRepository.findByEmail(email),
      cacheClient.get(`verificationCode:${email}`)
    ]);
    if (existingUser) {
      throw new ConflictException("User already exists.");
    }
    const code = randomNumberString(6);
    if (existingCode) {
      await cacheClient.del(`verificationCode:${email}`);
    }
    await cacheClient.set(`verificationCode:${email}`, code, 60 * 5);
    sendVerificationCodeMail(code, email);
  }
  async register(
      data: {
      email: string,
      password: string,
      givenName: string,
      familyName: string,
    }
  ) {
    const user = await this.userRepository.create({
      email: data.email,
      password: this.userRepository.hasPassword(data.password) as any,
      fullName: `${data.givenName} ${data.familyName}`,
      isVerified: false,
      isBanned: false
    });
    const key = await cacheClient.get(`verificationCode:${data.email}`);
    console.log(key);
    return key;
  }
}
