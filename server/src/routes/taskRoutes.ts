// src/routes/taskRoutes.ts
import express from "express";
import {
 createTask,
 getTasks,
 updateTask,
 deleteTask,
} from "../controller/taskController";
import { requireAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/task", createTask); // use requireAuth to protect this route
router.get("/tasks", getTasks); // use requireAuth to protect this route
router.put("/task/:id", updateTask); //requireAuth,
router.delete("/task/:id", deleteTask); //requireAuth,

export default router;
