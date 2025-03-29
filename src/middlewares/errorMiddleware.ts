import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Erreur attrapée :", err);

  const status = err.statusCode || 500;
  const message = err.message || "Erreur interne du serveur";

  res.status(status).json({ message });
};
