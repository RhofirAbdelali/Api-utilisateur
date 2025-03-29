import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { userToResponse } from "../mappers/user.mapper";
import "express";

export class UserController {
  static getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserService.getById(req.user!.id);
      if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
      return res.status(200).json(userToResponse(user));
    } catch (error) {
      next(error);
    }
  };

  static getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user?.role !== "admin") return res.status(403).json({ message: "Accès refusé" });

      const users = await UserService.getAll();
      res.status(200).json(users.map(userToResponse));
    } catch (error) {
      next(error);
    }
  };

  static getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const currentUser = req.user!;

      const isAdmin = currentUser.role === "admin";
      const isSelf = currentUser.id === id;

      if (!isAdmin && !isSelf) {
        return res.status(403).json({ message: "Accès refusé" });
      }

      const user = await UserService.getById(id);
      if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

      res.status(200).json(userToResponse(user));
    } catch (error) {
      next(error);
    }
  };

  static updateRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user?.role !== "admin") return res.status(403).json({ message: "Accès refusé" });

      const updated = await UserService.updateRole(req.params.id, req.body.role);
      if (!updated) return res.status(404).json({ message: "Utilisateur introuvable" });

      res.status(200).json(userToResponse(updated));
    } catch (error) {
      next(error);
    }
  };

  static remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user?.role !== "admin") return res.status(403).json({ message: "Accès refusé" });

      const success = await UserService.remove(req.params.id);
      if (!success) return res.status(404).json({ message: "Utilisateur introuvable" });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
