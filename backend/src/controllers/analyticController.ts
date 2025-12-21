// src/controllers/analyticsController.ts
import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";
import { DailyStatsMap } from "../types";

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

    const analytics = await prisma.analytics.findMany({
      where: {
        userId: userId!,
        date: {
          gte: last7Days,
        },
      },
      select: {
        date: true,
        clicks: true,
        pageViews: true,
        link: {
          select: {
            id: true,
            title: true,
            url: true,
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    const dailyStats: DailyStatsMap = {};

    for (const item of analytics) {
      if (!item.link) continue;

      const dateKey = item.date.toISOString().split("T")[0];

      if (!dailyStats[dateKey]) {
        dailyStats[dateKey] = [];
      }

      const existing = dailyStats[dateKey].find(
        (l) => l.linkId === item.link?.id
      );

      if (existing) {
        existing.clicks += item.clicks;
        existing.views += item.pageViews;
      } else {
        dailyStats[dateKey].push({
          linkId: item.link.id,
          title: item.link.title,
          url: item.link.url,
          clicks: item.clicks,
          views: item.pageViews,
        });
      }
    }

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
