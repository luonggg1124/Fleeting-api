import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity("blocked_users")
export class BlockedUser {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  blocker!: User;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  blocked!: User;

  @CreateDateColumn()
  createdAt!: Date;
}
