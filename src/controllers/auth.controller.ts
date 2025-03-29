import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { userToResponse } from "../mappers/user.mapper";

export class AuthController {
  static signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await AuthService.signup(req.body);
      res.status(201).json(userToResponse(user));
    } catch (error) {
      next(error);
    }
  };

  static signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await AuthService.signin(email, password);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  static logout = (_req: Request, res: Response) => {
    res.status(200).json({ message: "Déconnecté avec succès." });
  };

  static profile = (req: Request, res: Response) => {
    res.status(200).json({ user: req.user });
  };

  static requestPasswordReset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      await AuthService.requestPasswordReset(email);
      res.status(200).json({ message: "Lien de réinitialisation envoyé." });
    } catch (error) {
      next(error);
    }
  };

  static resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, newPassword } = req.body;
      await AuthService.resetPassword(token, newPassword);
      res.status(200).json({ message: "Mot de passe mis à jour." });
    } catch (error) {
      next(error);
    }
  };

  static googleLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tokenId } = req.body;
      const token = await AuthService.googleLogin(tokenId);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
}
