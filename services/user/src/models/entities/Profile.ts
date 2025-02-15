import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("profiles")
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @Column({ length:125 })
  givenName: string;

  @Column({ length:125 })
  familyName: string;

  @Column({ type: "text", nullable: true })
  bio?: string;

  @Column({ type:"text", nullable: true })
  location?: string;

  @Column({ type: "text", nullable: true })
  website?: string;

  @Column({ type:"date", nullable: true})
  birthDate?: Date;
  
  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  district?: string;
  
  @Column({ nullable: true })
  commune?: string;

  @Column({ nullable: true })
  village?: string;
}
