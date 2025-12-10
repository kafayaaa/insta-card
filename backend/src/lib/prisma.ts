// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Prisma extensions for custom methods with proper typing
export const extendedPrisma = prisma.$extends({
  model: {
    user: {
      async findByUsername(username: string) {
        return prisma.user.findUnique({
          where: { username },
          include: {
            links: {
              where: { isActive: true },
              orderBy: { order: "asc" },
            },
          },
        });
      },
    },
    link: {
      async incrementClickCount(linkId: string) {
        return prisma.link.update({
          where: { id: linkId },
          data: {
            clickCount: { increment: 1 },
          },
        });
      },
    },
    analytics: {
      async getDailyStats(userId: string, date: Date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        return prisma.analytics.findMany({
          where: {
            userId,
            date: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
          include: {
            link: {
              select: {
                title: true,
                url: true,
              },
            },
          },
        });
      },
    },
  },
});

export type ExtendedPrismaClient = typeof extendedPrisma;
