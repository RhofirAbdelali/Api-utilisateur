import { prisma } from '../prisma/prismaClient';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export async function register(req: Request, res: Response) {
    console.log("Register function called");
    console.log("Request body:", req.body);
    
    const { email, password, name, provider } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      console.log("Trying to create user in database...");
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          provider,
          role: { connect: { name: 'User' } }, // Connect to the 'User' role
        },
      });
      console.log("User created successfully:", user);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: 'Error during registration' });
    }
}

  

export async function login(req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(404).json({ message: 'User not found' });

  const isValid = await bcrypt.compare(password, user.password || '');

  if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'JWT_SECRET is not defined' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return res.status(200).json({ token });
}