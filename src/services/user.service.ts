import { publishEvent } from "../events/producers/publishEvent";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  // Liste tous les utilisateurs avec leurs rôles
  static async getAll() {
    return UserRepository.findAll();
  }

  // Récupère un utilisateur par ID avec son rôle (ex: pour le profil)
  static async getById(id: string) {
    const user = await UserRepository.findById(id);
    return user; // on pourrait aussi lever une erreur ici si besoin
  }

  // Met à jour le rôle (admin uniquement)
  static async updateRole(id: string, roleName: string) {
    const user = await UserRepository.findById(id);
    if (!user) return null;

    const updated = await UserRepository.updateRole(id, roleName);

    return updated;
  }

  // Supprime un utilisateur
  static async remove(id: string) {
    const user = await UserRepository.findById(id);
    if (!user) return false;

    await UserRepository.deleteById(id);
    await publishEvent("user_deleted", { id });
    return true;
  }
}
