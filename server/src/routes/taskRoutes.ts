import { Express } from "express";

import {
 createTask,
 getTasks,
 updateTask,
 deleteTask,
} from "../controller/taskController";

const router = express.Router();

router.post("/task", createTask);
router.get("/tasks", getTasks);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

export default router;
