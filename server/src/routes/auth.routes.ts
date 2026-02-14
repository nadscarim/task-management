import { authController } from "@/controller/auth.controller";
import express, { Router } from "express";

const router: Router = express.Router();

router.get("/me", authController.me);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/refresh", authController.refresh);
router.post("/logout", authController.logout);

export default router;
