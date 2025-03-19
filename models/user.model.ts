import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Role } from "./role.model";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  password?: string;

  @Column()
  provider!: "local" | "google";

  @Column({ nullable: true })
  provider_id?: string;

  @ManyToOne(() => Role, (role: Role) => role.users, { eager: true }) // Ajout de eager si nécessaire
  @JoinColumn({ name: "roleId" })
  role!: Role;

  @Column()
  roleId!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  constructor() {
    this.id = "";
    this.email = "";
    this.name = "";
    this.provider = "local";
    this.roleId = "";
    this.created_at = new Date();
  }
}
