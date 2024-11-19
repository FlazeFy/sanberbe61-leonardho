import express from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
const router = express.Router();

// Auth
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.get("/auth/me", authMiddleware, authController.my_profile);
router.put("/auth/update-profile", authMiddleware, authController.profile);

export default router