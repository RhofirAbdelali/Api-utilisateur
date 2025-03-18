import bcrypt from 'bcryptjs';
import { prisma } from './prismaClient';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
  const { email, password, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'anonym', // Par défaut, rôle anonym
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error during registration' });
  }
}



export async function login(req, res) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(404).json({ message: 'User not found' });

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'JWT_SECRET is not defined' });
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ token });
}

