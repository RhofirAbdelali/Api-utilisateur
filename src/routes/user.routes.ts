import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = Router();

// Toutes les routes nécessitent l'authentification
router.use(authMiddleware);

// Voir ses propres infos
router.get("/me", UserController.getProfile);

// Routes accessibles uniquement aux administrateurs
router.use(adminMiddleware);

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.patch("/:id/role", UserController.updateRole);
router.delete("/:id", UserController.remove);

export default router;
