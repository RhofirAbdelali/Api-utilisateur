import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Define the roles you want to seed
  const roles = ['Admin', 'User', 'Anonymous'];

  for (const roleName of roles) {
    // Check if the role already exists
    const existingRole = await prisma.role.findUnique({
      where: { name: roleName },
    });

    // If the role doesn't exist, create it
    if (!existingRole) {
      await prisma.role.create({
        data: {
          name: roleName,
        },
      });
      console.log(`Role '${roleName}' has been created.`);
    } else {
      console.log(`Role '${roleName}' already exists.`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export { prisma };