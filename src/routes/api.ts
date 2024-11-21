import express from "express";
import categoryController from "../controllers/category.controller";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

// Category
router.get("/categories", categoryController.findAll);
router.post("/categories", categoryController.create);
router.get("/categories/:id", categoryController.findOne);
router.put("/categories/:id", categoryController.update);
router.delete("/categories/:id", categoryController.delete);

// Auth
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.get("/auth/me", authMiddleware, authController.my_profile);
router.put("/auth/update-profile", authMiddleware, authController.profile);

export default router;
