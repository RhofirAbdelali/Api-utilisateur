import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Check if the 'User' role already exists
  const existingRole = await prisma.role.findUnique({
    where: { name: 'User' },  // Look for an existing role with the name 'User'
  });

  // If the role doesn't exist, create it
  if (!existingRole) {
    await prisma.role.create({
      data: {
        name: 'User',
      },
    });
    console.log("Role 'User' has been created.");
  } else {
    console.log("Role 'User' already exists.");
  }
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
