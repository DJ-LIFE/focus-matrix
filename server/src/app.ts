// src/app.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
 res.json("Hello from the server");
});

export default app;
