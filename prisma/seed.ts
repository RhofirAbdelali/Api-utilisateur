import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const roles = ["admin", "buyer"];

  // Créer les rôles si inexistants
  const roleMap: Record<string, string> = {};
  for (const name of roles) {
    const role = await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    roleMap[name] = role.id;
  }

  // Créer un utilisateur admin
  const adminEmail = "admin2@justicket.com";
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: await bcrypt.hash("admin123", 10),
      nom: "Admin",
      prenom: "JustTicket",
      roleId: roleMap.admin,
    },
  });

  // Créer 5 utilisateurs acheteurs
  for (let i = 0; i < 5; i++) {
    const email = `buyer${i}@justicket.com`;

    const exists = await prisma.user.findUnique({ where: { email } });
    if (!exists) {
      await prisma.user.create({
        data: {
          email,
          password: await bcrypt.hash("123456", 10),
          nom: `Nom${i}`,
          prenom: `Prenom${i}`,
          roleId: roleMap.buyer,
        },
      });
    }
  }

  console.log("✅ Seed terminé avec succès");
}

main()
  .catch((e) => {
    console.error("❌ Erreur dans le seed :", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
