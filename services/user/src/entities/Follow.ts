import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Unique } from "typeorm";
import { User } from "./User";


@Entity("user_followers")
@Unique(["follower","following"])
export class UserFollower{
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => User,{onDelete: "CASCADE"})
    follower!: User;

    @ManyToOne(() => User, { onDelete: "CASCADE" })
    following!: User;

    @CreateDateColumn()
    createdAt!: Date;
}