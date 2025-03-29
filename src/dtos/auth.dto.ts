import { body } from "express-validator";

export class AuthDTO {
  static signup = [
    body("email").isEmail().withMessage("Email invalide"),
    body("password").isLength({ min: 6 }).withMessage("Mot de passe trop court"),
    body("nom").notEmpty().withMessage("Le nom est requis"),
    body("prenom").notEmpty().withMessage("Le prénom est requis"),
  ];

  static signin = [
    body("email").isEmail().withMessage("Email invalide"),
    body("password").notEmpty().withMessage("Mot de passe requis"),
  ];

  static resetPassword = [
    body("token").notEmpty().withMessage("Token requis"),
    body("newPassword").isLength({ min: 6 }).withMessage("Mot de passe trop court"),
  ];

  static emailOnly = [
    body("email").isEmail().withMessage("Email invalide"),
  ];
}
