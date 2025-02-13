import { EntityManager, Repository } from "typeorm";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";

export class UserRepository extends Repository<User> {
  constructor(manager: EntityManager) {
    super(User, manager);
  }
  async findByEmail(email:string): Promise<User | null> {
    return this.findOne({where:{email} });
  }
  async hasPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 15);
  }
  async comparePassword(password:string, hash:string): Promise<boolean>{
    return await bcrypt.compare(password, hash);
  }
}
