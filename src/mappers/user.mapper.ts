import { User, Role } from "@prisma/client";

export function userToResponse(user: User & { role: Role }) {
  return {
    id: user.id,
    email: user.email,
    nom: user.nom,
    prenom: user.prenom,
    role: user.role.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
