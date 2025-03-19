import { DataSource } from "typeorm";
import { User } from "../models/user.model";
import { Role } from "../models/role.model";

export const AppDataSource = new DataSource({
  type: "sqlite",  // Utilisation de SQLite
  database: "./db.sqlite",  // Emplacement du fichier SQLite
  entities: [User, Role],
  synchronize: true,  // Synchroniser les entités avec la base de données
  logging: true,  // Activer les logs pour le débogage
});
