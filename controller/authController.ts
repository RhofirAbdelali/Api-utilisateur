import { prisma } from '../prisma/prismaClient';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password, name, provider, role } = req.body;

        if (!email || !password || !name || !provider || !role) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if the email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(409).json({ message: `Email '${email}' is already in use` });
        }

        // Check if the role exists
        const existingRole = await prisma.role.findUnique({
            where: { name: role },
        });

        if (!existingRole) {
            return res.status(404).json({ message: `Role '${role}' not found` });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user and connect the role
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                provider,
                role: { connect: { name: role } }, // Connect the user to the role
            },
        });

        res.status(201).json(user);
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Missing email or password' });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isValid = await bcrypt.compare(password, user.password || '');

        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'JWT_SECRET is not defined' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
}

export async function profile(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as any).user?.userId;

        if (!userId) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true, role: true },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
}

export async function logout(req: Request, res: Response) {
    res.status(200).json({ message: 'Logged out successfully' });
}