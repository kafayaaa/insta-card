// src/controllers/analyticsController.ts
import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";

const prisma = new PrismaClient();

export const getUserAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    // Get total stats
    const totalClicks = await prisma.link.aggregate({
      where: { userId: userId! },
      _sum: { clickCount: true },
    });

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const monthlyStats = await prisma.analytics.aggregate({
      where: {
        userId: userId!,
        date: {
          gte: startOfMonth,
        },
      },
      _sum: {
        clicks: true,
        pageViews: true,
      },
    });

    // Get top links
    const topLinks = await prisma.link.findMany({
      where: { userId: userId! },
      orderBy: { clickCount: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        url: true,
        clickCount: true,
      },
    });

    // Get daily stats for last 7 days
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const dailyStats = await prisma.analytics.groupBy({
      by: ["date"],
      where: {
        userId: userId!,
        date: {
          gte: last7Days,
        },
      },
      _sum: {
        clicks: true,
        pageViews: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    res.json({
      totalClicks: totalClicks._sum.clickCount || 0,
      monthlyClicks: monthlyStats._sum.clicks || 0,
      monthlyViews: monthlyStats._sum.pageViews || 0,
      topLinks,
      dailyStats,
    });
  } catch (error) {
    console.error("Get analytics error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
