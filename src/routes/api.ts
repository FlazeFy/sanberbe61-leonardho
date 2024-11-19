import express from "express";
import categoryController from "../controllers/category.controller";

const router = express.Router();

router.get("/categories", categoryController.findAll);
router.post("/categories", categoryController.create);
router.get("/categories/:id", categoryController.findOne);
router.put("/categories/:id", categoryController.update);
router.delete("/categories/:id", categoryController.delete);

export default router;
