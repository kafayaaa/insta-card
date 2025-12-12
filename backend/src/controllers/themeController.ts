import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";

const prisma = new PrismaClient();

function safeParse(json: string | null) {
  if (!json) return {};
  try {
    return JSON.parse(json);
  } catch {
    return {};
  }
}

// Predefined themes
export const THEMES = [
  {
    id: "default",
    name: "Default",
    colors: {
      primary: "#3B82F6",
      secondary: "#10B981",
      background: "#FFFFFF",
      text: "#1F2937",
      card: "#F9FAFB",
    },
  },
  {
    id: "dark",
    name: "Dark Mode",
    colors: {
      primary: "#60A5FA",
      secondary: "#34D399",
      background: "#1F2937",
      text: "#F9FAFB",
      card: "#374151",
    },
  },
  {
    id: "ocean",
    name: "Ocean Blue",
    colors: {
      primary: "#06B6D4",
      secondary: "#0EA5E9",
      background: "#F0F9FF",
      text: "#0C4A6E",
      card: "#E0F2FE",
    },
  },
  {
    id: "sunset",
    name: "Sunset Orange",
    colors: {
      primary: "#F97316",
      secondary: "#FB923C",
      background: "#FFFBEB",
      text: "#9A3412",
      card: "#FED7AA",
    },
  },
  {
    id: "forest",
    name: "Forest Green",
    colors: {
      primary: "#22C55E",
      secondary: "#4ADE80",
      background: "#F0FDF4",
      text: "#14532D",
      card: "#DCFCE7",
    },
  },
];

export const getAvailableThemes = (req: AuthRequest, res: Response) => {
  res.json(THEMES);
};

export const getUserTheme = async (req: AuthRequest, res: Response) => {
  // try {
  //   const userId = req.userId;

  //   const user = await prisma.user.findUnique({
  //     where: { id: userId },
  //     select: { theme: true },
  //   });

  //   const theme = THEMES.find((t) => t.id === (user?.theme || "default"));

  //   res.json(theme);
  // } catch (error) {
  //   console.error("Get theme error:", error);
  //   res.status(500).json({ error: "Internal server error" });
  // }
 try {
    const userId = req.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { theme: true }
    });

    const theme = safeParse(user?.theme ?? "{}");

    res.json(theme);
  } catch (err) {
    res.status(500).json({ error: "Failed to load theme" });
  }
};

export const updateUserTheme = async (req: AuthRequest, res: Response) => {
  // try {
  //   const userId = req.userId;
  //   const { themeId } = req.body;

  //   // Validate theme exists
  //   const themeExists = THEMES.some((theme) => theme.id === themeId);
  //   if (!themeExists) {
  //     return res.status(400).json({ error: "Invalid theme" });
  //   }

  //   const user = await prisma.user.update({
  //     where: { id: userId },
  //     data: { theme: themeId },
  //     select: {
  //       id: true,
  //       username: true,
  //       theme: true,
  //     },
  //   });

  //   const theme = THEMES.find((t) => t.id === user.theme);

  //   res.json({
  //     user,
  //     theme,
  //   });
  // } catch (error) {
  //   console.error("Update theme error:", error);
  //   res.status(500).json({ error: "Internal server error" });
  // }
 try {
    const userId = req.userId;

    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { theme: true }
    });

    const oldTheme = safeParse(currentUser?.theme ?? "{}");
    const newTheme = { ...oldTheme, ...req.body };

    await prisma.user.update({
      where: { id: userId },
      data: { theme: JSON.stringify(newTheme) }
    });

    res.json({ message: "Saved successfully", theme: newTheme });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save theme" });
  }
};
