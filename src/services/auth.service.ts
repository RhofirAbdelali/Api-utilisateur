import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { UserRepository } from "../repositories/user.repository";
import { sendResetEmail, sendWelcomeEmail } from "../utils/mailer";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || "secret";

export class AuthService {
  static async signup(data: { email: string; password: string; nom: string; prenom: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await UserRepository.create({
      ...data,
      password: hashedPassword,
      roleName: "buyer", // Rôle par défaut
    });
    await sendWelcomeEmail(user.email, user.prenom);
    return user;
  }

  static async signin(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Identifiants invalides");
    }

    const token = jwt.sign({ id: user.id, role: user.role.name }, JWT_SECRET, { expiresIn: "7d" });

    return {
      token,
      role: user.role.name
    };
  }

  static async requestPasswordReset(email: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("Email introuvable");

    const resetToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    await sendResetEmail(email, resetToken);
    return resetToken;
  }

  static async resetPassword(token: string, newPassword: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      const hashed = await bcrypt.hash(newPassword, 10);
      await UserRepository.updatePassword(decoded.id, hashed);
    } catch {
      throw new Error("Token invalide ou expiré");
    }
  }

  static async googleLogin(tokenId: string) {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload?.email) throw new Error("Token Google invalide");

    const email = payload.email;
    const nom = payload.family_name || "Nom";
    const prenom = payload.given_name || "Prénom";

    let user = await UserRepository.findByEmail(email);

    if (!user) {
      user = await UserRepository.create({
        email,
        password: "google", // valeur symbolique
        roleName: "buyer",
        nom,
        prenom,
      });
      await sendWelcomeEmail(user.email, prenom);
    }

    return jwt.sign({ id: user.id, role: user.role.name }, JWT_SECRET, { expiresIn: "7d" });
  }
}
