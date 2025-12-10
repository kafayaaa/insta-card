import { Request, Response } from "express"; // Impor Request dari express
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";

const prisma = new PrismaClient();

export const getUserLinks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    const links = await prisma.link.findMany({
      where: { userId },
      orderBy: { order: "asc" },
    });

    res.json(links);
  } catch (error) {
    console.error("Get links error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createLink = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { title, url, icon, order } = req.body;

    // Get current max order to set default
    const maxOrderLink = await prisma.link.findFirst({
      where: { userId },
      orderBy: { order: "desc" },
    });

    const newOrder =
      order !== undefined ? order : (maxOrderLink?.order || 0) + 1;

    const link = await prisma.link.create({
      data: {
        title,
        url,
        icon,
        order: newOrder,
        userId: userId!,
      },
    });

    res.status(201).json(link);
  } catch (error) {
    console.error("Create link error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateLink = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const linkId = req.params.id;
    const { title, url, icon, order, isActive } = req.body;

    const link = await prisma.link.updateMany({
      where: {
        id: linkId,
        userId: userId!,
      },
      data: {
        ...(title && { title }),
        ...(url && { url }),
        ...(icon && { icon }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    if (link.count === 0) {
      return res.status(404).json({ error: "Link not found" });
    }

    const updatedLink = await prisma.link.findUnique({
      where: { id: linkId },
    });

    res.json(updatedLink);
  } catch (error) {
    console.error("Update link error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteLink = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const linkId = req.params.id;

    const link = await prisma.link.deleteMany({
      where: {
        id: linkId,
        userId: userId!,
      },
    });

    if (link.count === 0) {
      return res.status(404).json({ error: "Link not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Delete link error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const trackLinkClick = async (req: Request, res: Response) => {
  try {
    const linkId = req.params.id;

    // Update link click count
    const updatedLink = await prisma.link.update({
      where: { id: linkId },
      data: {
        clickCount: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: { id: true },
        },
      },
    });

    // Record analytics
    await prisma.analytics.create({
      data: {
        userId: updatedLink.user.id,
        linkId,
        clicks: 1,
      },
    });

    // Return success with link data (optional)
    res.json({
      success: true,
      link: {
        id: updatedLink.id,
        title: updatedLink.title,
        url: updatedLink.url,
        clickCount: updatedLink.clickCount,
      },
    });
  } catch (error: any) {
    console.error("Track click error:", error);

    // Return 404 if link not found
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Link not found" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

export const reorderLinks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { links } = req.body; // Array of { id, order }

    const updatePromises = links.map((link: { id: string; order: number }) =>
      prisma.link.updateMany({
        where: {
          id: link.id,
          userId: userId!,
        },
        data: { order: link.order },
      })
    );

    await Promise.all(updatePromises);

    res.json({ success: true });
  } catch (error) {
    console.error("Reorder links error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
