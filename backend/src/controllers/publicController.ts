import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPublicProfile = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        bio: true,
        avatar: true,
        theme: true,
        links: {
          where: { isActive: true },
          orderBy: { order: "asc" },
          select: {
            id: true,
            title: true,
            url: true,
            icon: true,
            order: true,
            clickCount: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Track page view in analytics
    await prisma.analytics.create({
      data: {
        userId: user.id,
        pageViews: 1,
      },
    });

    res.json(user);
  } catch (error) {
    console.error("Get public profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const redirectToLink = async (req: Request, res: Response) => {
  try {
    const { linkId } = req.params;

    const link = await prisma.link.update({
      where: { id: linkId },
      data: {
        clickCount: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!link) {
      return res.status(404).json({ error: "Link not found" });
    }

    // Record click analytics
    await prisma.analytics.create({
      data: {
        userId: link.user.id,
        linkId: link.id,
        clicks: 1,
      },
    });

    // Redirect to the actual URL
    res.redirect(link.url);
  } catch (error) {
    console.error("Redirect error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPlatformStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalLinks = await prisma.link.count();
    const totalClicks = await prisma.link.aggregate({
      _sum: {
        clickCount: true,
      },
    });

    res.json({
      totalUsers,
      totalLinks,
      totalClicks: totalClicks._sum.clickCount || 0,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Get platform stats error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
