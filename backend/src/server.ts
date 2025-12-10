import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";
import morgan from "morgan";

import userRoutes from "./routes/users.routes";
import linkRoutes from "./routes/links.routes";
import analyticsRoutes from "./routes/analytics.routes";
import themeRoutes from "./routes/theme.routes";
import publicRoutes from "./routes/public.routes";
import { apiLimiter, authLimiter } from "./middleware/rateLimiter";
import { errorHandler } from "./middleware/errorHandler";
import trackRoutes from "./routes/track.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Request logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'"],
      },
    },
  })
);
app.use(compression());

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL?.split(",") || [
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Apply rate limiting
app.use("/api/", apiLimiter);
app.use("/api/users/login", authLimiter);
app.use("/api/users/register", authLimiter);

// Public routes (no authentication required)
app.use("/api/public", publicRoutes);

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/themes", themeRoutes);

app.use("/api/track", trackRoutes); // Public tracking
app.use("/api/links", linkRoutes); // Protected links management
app.use("/api/users", userRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0",
    service: "InstaCard API",
  });
});

// 404 handler
app.use("/api/*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

// Error handling
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 InstaCard API running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`👤 Demo user: http://localhost:${PORT}/api/public/u/demo`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});

export default app;
