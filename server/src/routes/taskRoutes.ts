// src/routes/taskRoutes.ts
import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controller/taskController';
import { requireAuth } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/task', requireAuth, createTask);
router.get('/tasks', requireAuth, getTasks);
router.put('/task/:id', requireAuth, updateTask);
router.delete('/task/:id', requireAuth, deleteTask);

export default router;