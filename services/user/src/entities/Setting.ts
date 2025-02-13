import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from "typeorm";
import { User } from "./User";
import { ThemeSetting } from "../enums/ThemeSetting";

@Entity("user_settings")
export class UserSettings {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(() => User, {onDelete: "CASCADE"})
    @JoinColumn()
    user: User;

    @Column({ default: true })
    allowMessages: boolean;

    @Column({ default: true })
    showOnlineStatus: boolean;

    @Column({ type: "enum", enum: ThemeSetting, default: "light" })
    theme: string;
}