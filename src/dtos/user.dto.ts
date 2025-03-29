import { body } from "express-validator";

export class UserDTO {
  static updateRole = [
    body("role").isString().notEmpty().withMessage("Le rôle est requis"),
  ];
}
