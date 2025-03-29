import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        nom: string;
        prenom: string;
        role: string;
      };
    }
  }
}

export {};
