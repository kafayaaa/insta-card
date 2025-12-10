// src/routes/analyticsRoutes.ts
import { Router } from "express";
import { getUserAnalytics } from "../controllers/analyticController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/", authenticateToken, getUserAnalytics);

export default router;
