import { Router } from "express";
import {
  getAvailableThemes,
  getUserTheme,
  updateUserTheme,
} from "../controllers/themeController";
import { authenticateToken } from "../middleware/auth";
import { validateRequest, updateThemeSchema } from "../middleware/validation";

const router = Router();

router.get("/available", getAvailableThemes);
router.get("/", authenticateToken, getUserTheme);
router.put(
  "/",
  authenticateToken,
  // validateRequest(updateThemeSchema),
  updateUserTheme
);

export default router;
