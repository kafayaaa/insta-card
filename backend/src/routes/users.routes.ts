// src/routes/userRoutes.ts
import { Router } from "express";
import {
  getUserProfile,
  registerUser,
  loginUser,
  updateUserProfile,
} from "../controllers/userController";
import { authenticateToken } from "../middleware/auth";
import { validateRequest, createUserSchema } from "../middleware/validation";

const router = Router();

// Public routes
router.get("/:username", getUserProfile);
router.post("/register", validateRequest(createUserSchema), registerUser);
router.post("/login", loginUser);

// Protected routes
router.put("/profile", authenticateToken, updateUserProfile);

export default router;
