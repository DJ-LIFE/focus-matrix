import { Request, Response } from "express";
import { ITask } from "../interfaces/interface";
import Task from "../../models/Task";

export const createTask = async (req: Request, res: Response) => {
 const { title, description, quadrant } = req.body;
 try {
  const task: ITask = new Task({ title, description, quadrant });
  await task.save();
  res.status(201).json(task);
 } catch (error) {
  res.status(400).json({ error: (error as Error).message });
 }
};

export const getTasks = async (req: Request, res: Response) => {
 try {
  const tasks: ITask[] = await Task.find();
  res.json(tasks);
 } catch (error) {
  res.status(400).json({ error: (error as Error).message });
 }
};

export const updateTask = async (req: Request, res: Response) => {
 const { id } = req.params;
 try {
  const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
  res.json(task);
 } catch (error) {
  res.status(400).json({ error: (error as Error).message });
 }
};

export const deleteTask = async (req: Request, res: Response) => {
 const { id } = req.params;
 try {
  await Task.findByIdAndDelete(id);
  res.json({ message: "Task deleted" });
 } catch (error) {
  res.status(400).json({ error: (error as Error).message });
 }
};
