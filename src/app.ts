import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

// Import des routes
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

dotenv.config();

const app = express();

// Configuration CORS correcte pour le front (localhost:3001)
const allowedOrigin = process.env.FRONTEND_URL;

app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));
  

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// 👉 Charger la doc Swagger
const swaggerDocument = YAML.load("./swagger.yaml");

// 👉 Route de la doc
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 👉 Routes API
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// 👉 Gestion des erreurs
app.use(errorMiddleware);

export default app;
