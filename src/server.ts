import app from "./app";
import { startJwtConsumer } from './events/consumers/jwtConsumer';
import { startVerifyUserConsumer } from './events/consumers/verifyUserConsumer';

import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await startJwtConsumer();
    await startVerifyUserConsumer();
    app.listen(PORT, () => {
      console.log(`API utilisateur démarrée : http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Échec au démarrage du serveur :", error);
    process.exit(1);
  }
}

startServer();
