import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from "typeorm";
import { User } from "./User";

export type ThemeSetting = "dark" | "light";
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

    @Column({ type: "enum", enum: ["dark","light"], default: "light" })
    theme: string;
}