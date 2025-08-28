import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { createOrder, myOrders, allOrders, updateStatus } from "../controllers/order.controller.js";
const router = Router();

router.post("/", requireAuth, createOrder);
router.get("/mine", requireAuth, myOrders);

// Admin
router.get("/", requireAuth, requireAdmin, allOrders);
router.patch("/:id/status", requireAuth, requireAdmin, updateStatus);

export default router;
