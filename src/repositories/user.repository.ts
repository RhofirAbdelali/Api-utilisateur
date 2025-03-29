import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
  static findAll() {
    return prisma.user.findMany({ include: { role: true } });
  }

  static findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });
  }

  static findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
  }

  static async create(data: {
    email: string;
    password: string;
    nom: string;
    prenom: string;
    roleName: string;
  }) {
    const role = await prisma.role.findUnique({ where: { name: data.roleName } });
    if (!role) throw new Error(`Rôle ${data.roleName} introuvable`);

    return prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        nom: data.nom,
        prenom: data.prenom,
        roleId: role.id,
      },
      include: { role: true },
    });
  }

  static updatePassword(id: string, hashedPassword: string) {
    return prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  static updateRole(id: string, roleName: string) {
    return prisma.role.findUnique({ where: { name: roleName } }).then((role: { id: string } | null) => {
      if (!role) throw new Error(`Rôle ${roleName} introuvable`);
  
      return prisma.user.update({
        where: { id },
        data: { roleId: role.id },
        include: { role: true },
      });
    });
  }
  

  static deleteById(id: string) {
    return prisma.user.delete({ where: { id } });
  }

  static async exists(userId: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });
    return !!user;
  }
  
}
