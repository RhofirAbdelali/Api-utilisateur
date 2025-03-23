import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDatabase() {
    try {
        // Delete all users
        await prisma.user.deleteMany({});
        console.log('All users have been deleted.');

        // Delete all roles
        await prisma.role.deleteMany({});
        console.log('All roles have been deleted.');
    } catch (error) {
        console.error('Error clearing the database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

clearDatabase();