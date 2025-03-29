import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository";
import "express";


export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant ou invalide" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "secret") as { id: string };

    const user = await UserRepository.findById(payload.id);
    if (!user) {
      return res.status(401).json({ message: "Utilisateur introuvable" });
    }

    // Ici, `req.user` est reconnu grâce à l'extension du type dans `types/express/index.d.ts`
    req.user = {
      id: user.id,
      email: user.email,
      nom: user.nom,
      prenom: user.prenom,
      role: user.role.name,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide" });
  }
};
