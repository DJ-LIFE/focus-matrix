import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";

const app = express();
app.use(
 cors({
  origin: true,
  credentials: true,
 })
);
app.use(express.json());

app.use("/api", taskRoutes);

export default app;
