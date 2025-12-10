import { Request } from "express";

/**
 * Get base URL from request
 */
export const getBaseUrl = (req: Request): string => {
  return `${req.protocol}://${req.get("host")}`;
};

/**
 * Generate unique username from email
 */
export const generateUsername = (email: string): string => {
  const baseUsername = email.split("@")[0].toLowerCase();
  const cleanUsername = baseUsername.replace(/[^a-z0-9]/g, "_");

  // Add timestamp to ensure uniqueness
  const timestamp = Date.now().toString().slice(-4);
  return `${cleanUsername}_${timestamp}`;
};

/**
 * Validate URL format
 */
export const isValidUrl = (urlString: string): boolean => {
  try {
    const url = new URL(urlString);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

/**
 * Format analytics data for response
 */
export const formatAnalyticsData = (analytics: any[]) => {
  return analytics.map((item) => ({
    date: item.date.toISOString().split("T")[0],
    clicks: item._sum.clicks || 0,
    pageViews: item._sum.pageViews || 0,
  }));
};

/**
 * Calculate device statistics
 */
export const calculateDeviceStats = (userAgent?: string) => {
  if (!userAgent) return { device: "unknown", isMobile: false };

  const mobileKeywords =
    /mobile|android|iphone|ipad|ipod|blackberry|windows phone/i;
  const isMobile = mobileKeywords.test(userAgent);

  return {
    device: isMobile ? "mobile" : "desktop",
    isMobile,
  };
};
