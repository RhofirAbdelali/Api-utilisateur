import express from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

const router = express.Router();

// Routes d'authentification sous /api/auth
router.use("/auth", authRoutes);

// Routes utilisateur sous /api/users
router.use("/users", userRoutes);

export default router;
