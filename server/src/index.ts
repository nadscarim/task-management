import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";

const app: Express = express();

// middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

const PORT: number = parseInt(process.env.PORT || "8080", 10);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
