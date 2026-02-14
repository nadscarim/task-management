import prisma from "@/config/database";
import type { Response, Request } from "express";

export const taskControllers = {
  getTasks: async (req: Request, res: Response) => {
    try {
      const userId = req.token?.id;

      const tasks = await prisma.task.findMany({
        where: {
          userId,
          deletedAt: null,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      console.log(tasks);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  },

  getTasksById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const userId = req.token?.id;

      const task = await prisma.task.findFirst({
        where: {
          id,
          userId,
          deletedAt: null,
        },
      });

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch task" });
    }
  },

  createTask: async (req: Request, res: Response) => {
    try {
      const { title, description, status, priority, dueDate } = req.body;
      const userId = req.token?.id;
      console.log("req.token", req.token);
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const task = await prisma.task.create({
        data: {
          title,
          description,
          status,
          priority,
          dueDate: dueDate ? new Date(dueDate) : null,
          userId,
        },
      });

      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: "Failed to create task" });
    }
  },

  updateTask: async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const { title, description, status, priority, dueDate } = req.body;
      const userId = req.token?.id;

      // Check if task exists and belongs to user
      const existingTask = await prisma.task.findFirst({
        where: {
          id,
          userId,
          deletedAt: null,
        },
      });

      if (!existingTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      const task = await prisma.task.update({
        where: { id },
        data: {
          title,
          description,
          status,
          priority,
          dueDate: dueDate ? new Date(dueDate) : null,
        },
      });

      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: "Failed to update task" });
    }
  },
};
