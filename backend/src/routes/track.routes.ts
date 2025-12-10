// src/routes/trackRoutes.ts (file baru)
import { Router } from "express";
import { trackLinkClick } from "../controllers/linkController";
import { trackLimiter } from "../middleware/rateLimiter";

const router = Router();

// Track link clicks
router.post("/links/:id/track", trackLimiter, trackLinkClick);

export default router;
