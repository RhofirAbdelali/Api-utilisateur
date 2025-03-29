import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthDTO } from "../dtos/auth.dto";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// 🔐 Authentification
router.post("/signup", AuthDTO.signup, validationMiddleware, AuthController.signup);
router.post("/signin", AuthDTO.signin, validationMiddleware, AuthController.signin);
router.post("/google", AuthController.googleLogin);
router.post("/logout", authMiddleware, AuthController.logout);

// 🔁 Réinitialisation mot de passe
router.post("/request-password-reset", AuthDTO.emailOnly, validationMiddleware, AuthController.requestPasswordReset);
router.post("/reset-password", AuthDTO.resetPassword, validationMiddleware, AuthController.resetPassword);

// 👤 Profil connecté
router.get("/profile", authMiddleware, AuthController.profile);

export default router;
