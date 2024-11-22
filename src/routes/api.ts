import express from "express";
import categoryController from "../controllers/category.controller";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import productsController from "../controllers/products.controller";
import orderController from "../controllers/order.controller";
import rbacMiddleware from "../middlewares/rbac.middleware";

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

// Product
router.get("/products", productsController.findAll);
router.post("/products", productsController.create);
router.get("/products/:id", productsController.findOne);
router.put("/products/:id", productsController.update);
router.delete("/products/:id", productsController.delete);

// Order
router.post("/order", [authMiddleware, rbacMiddleware(["user"])], orderController.createOrder);
router.post("/order/:order_id", [authMiddleware, rbacMiddleware(["user"])], orderController.createOrderDetail);
router.get("/order/:order_id", [authMiddleware, rbacMiddleware(["user"])], orderController.getMyOrderHistory);
router.put("/order/status/:order_id", [authMiddleware, rbacMiddleware(["user"])], orderController.updateOrderStatus);
router.get("/order", [authMiddleware, rbacMiddleware(["user","admin"])], orderController.getAllOrderHistory);

export default router;
