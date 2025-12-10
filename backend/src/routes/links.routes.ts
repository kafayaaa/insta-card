// src/routes/linkRoutes.ts
import { Router } from "express";
import {
  getUserLinks,
  createLink,
  updateLink,
  deleteLink,
  trackLinkClick,
  reorderLinks,
} from "../controllers/linkController";
import { authenticateToken } from "../middleware/auth";
import {
  validateRequest,
  createLinkSchema,
  updateLinkSchema,
  reorderLinksSchema,
} from "../middleware/validation";
import { trackLimiter } from "../middleware/rateLimiter"; // Tambahkan rate limiter

const router = Router();

// ========== PUBLIC ROUTES ==========
// Track link clicks (public access)
router.post("/:id/track", trackLimiter, trackLinkClick);

// ========== PROTECTED ROUTES (require authentication) ==========
router.get("/", authenticateToken, getUserLinks);
router.post(
  "/",
  authenticateToken,
  validateRequest(createLinkSchema),
  createLink
);
router.put(
  "/:id",
  authenticateToken,
  validateRequest(updateLinkSchema),
  updateLink
);
router.delete("/:id", authenticateToken, deleteLink);
router.put(
  "/reorder",
  authenticateToken,
  validateRequest(reorderLinksSchema),
  reorderLinks
);

export default router;
