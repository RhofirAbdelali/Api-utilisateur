import { prisma } from '../prisma/prismaClient';
import { Request, Response, NextFunction } from 'express';

// Get all users
export async function getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, email: true, name: true, role: { select: { name: true } } },
        });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

// Get a user by ID

export async function getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: { id },
            select: { id: true, email: true, name: true, role: { select: { name: true } } },
        });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
}

// Update a user's role
export async function updateUserRole(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { role } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { role: { connect: { name: role } } },
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

// Delete a user
export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        await prisma.user.delete({
            where: { id },
        });

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}