import { Router } from "express";
import {
  getPublicProfile,
  redirectToLink,
  getPlatformStats,
} from "../controllers/publicController";
import { trackLimiter } from "../middleware/rateLimiter";

const router = Router();

router.get("/u/:username", getPublicProfile);
router.get("/l/:linkId", trackLimiter, redirectToLink);
router.get("/stats", getPlatformStats);

export default router;
