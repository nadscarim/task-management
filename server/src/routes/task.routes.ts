import { taskControllers } from "@/controller/task.controller";
import { authMiddleware } from "@/middleware/auth.middleware";
import express, { Router } from "express";

const router: Router = express.Router();

router.use(authMiddleware);

router.get("/", taskControllers.getTasks);
router.get("/:id", taskControllers.getTasksById);
router.post("/", taskControllers.createTask);
router.put("/:id", taskControllers.updateTask);

export default router;
