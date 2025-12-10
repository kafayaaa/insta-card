import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: error.errors,
        });
      }
      next(error);
    }
  };
};

// Validation schemas
export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers and underscores"
    ),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long"),
  bio: z.string().max(200, "Bio must be at most 200 characters").optional(),
  avatar: z.string().url("Invalid URL format").optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const updateUserSchema = z.object({
  bio: z.string().max(200, "Bio must be at most 200 characters").optional(),
  avatar: z.string().url("Invalid URL format").optional(),
  theme: z.string().optional(),
});

export const createLinkSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be at most 50 characters"),
  url: z.string().url("Invalid URL format"),
  icon: z.string().max(10, "Icon must be at most 10 characters").optional(),
  order: z.number().int().min(0).optional(),
});

export const updateLinkSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be at most 50 characters")
    .optional(),
  url: z.string().url("Invalid URL format").optional(),
  icon: z.string().max(10, "Icon must be at most 10 characters").optional(),
  order: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

export const reorderLinksSchema = z.object({
  links: z
    .array(
      z.object({
        id: z.string(),
        order: z.number().int().min(0),
      })
    )
    .min(1, "At least one link is required"),
});

export const updateThemeSchema = z.object({
  themeId: z.string().min(1, "Theme ID is required"),
});
