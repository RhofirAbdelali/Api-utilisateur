

import { prisma } from './prismaClient';

export async function getUsers(req, res) {
    const users = await prisma.user.findMany();
    res.json(users);
  }
  
  export async function updateUserRole(req, res) {
    const { id } = req.params;
    const { role } = req.body;
  
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
    });
  
    res.json(updatedUser);
  }
  
  export async function deleteUser(req, res) {
    const { id } = req.params;
  
    await prisma.user.delete({
      where: { id },
    });
  
    res.status(204).send();
  }
  