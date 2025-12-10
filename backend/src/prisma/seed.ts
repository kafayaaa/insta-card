// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create demo user
  const hashedPassword = await bcrypt.hash("password123", 12);

  const user = await prisma.user.upsert({
    where: { email: "demo@instacard.com" },
    update: {},
    create: {
      username: "demo",
      email: "demo@instacard.com",
      password: hashedPassword,
      bio: "Demo user for InstaCard",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
  });

  // Create demo links
  const links = await prisma.link.createMany({
    data: [
      {
        title: "Instagram",
        url: "https://instagram.com/demo",
        icon: "📷",
        order: 0,
        userId: user.id,
      },
      {
        title: "Twitter",
        url: "https://twitter.com/demo",
        icon: "🐦",
        order: 1,
        userId: user.id,
      },
      {
        title: "My Portfolio",
        url: "https://demo-portfolio.com",
        icon: "💼",
        order: 2,
        userId: user.id,
      },
      {
        title: "GitHub",
        url: "https://github.com/demo",
        icon: "💻",
        order: 3,
        userId: user.id,
      },
    ],
  });

  console.log("Seed data created successfully");
  console.log("Demo user: demo@instacard.com / password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
