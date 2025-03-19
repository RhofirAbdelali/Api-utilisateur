import { prisma } from '../prisma/prismaClient';
import { Request, Response } from 'express';

export async function getUsers(req: Request, res: Response) {
    const users = await prisma.user.findMany();
    res.json(users);
}

export async function updateUserRole(req: Request, res: Response) {
    const { id } = req.params;
    const { role } = req.body;

    const updatedUser = await prisma.user.update({
        where: { id },
        data: { role },
    });

    res.json(updatedUser);
}

export async function deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    await prisma.user.delete({
        where: { id },
    });

    res.status(204).send();
}