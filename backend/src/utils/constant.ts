export const DEFAULT_THEME = "default";
export const MAX_LINKS_PER_USER = 20;
export const MAX_BIO_LENGTH = 200;
export const MAX_TITLE_LENGTH = 50;
export const MAX_URL_LENGTH = 2048;

// Available icons for links
export const LINK_ICONS = [
  "🔗",
  "📱",
  "💻",
  "📧",
  "📷",
  "🎥",
  "🎵",
  "🎮",
  "📚",
  "💰",
  "🛒",
  "✈️",
  "🏠",
  "👤",
  "👥",
  "🏢",
  "🎓",
  "🏥",
  "🍴",
  "☕",
  "🍻",
  "🎨",
  "⚽",
  "🎭",
  "📖",
  "✏️",
  "🎤",
  "🎬",
  "🎪",
  "🎁",
  "💼",
  "📞",
  "✉️",
  "🔔",
  "⭐",
  "❤️",
  "👍",
  "👎",
  "🔄",
  "📊",
];

// Social media platforms for auto-detection
export const SOCIAL_PLATFORMS = [
  {
    name: "Instagram",
    domains: ["instagram.com"],
    icon: "📷",
    color: "#E4405F",
  },
  {
    name: "Twitter",
    domains: ["twitter.com", "x.com"],
    icon: "🐦",
    color: "#1DA1F2",
  },
  {
    name: "Facebook",
    domains: ["facebook.com"],
    icon: "👥",
    color: "#1877F2",
  },
  {
    name: "LinkedIn",
    domains: ["linkedin.com"],
    icon: "💼",
    color: "#0A66C2",
  },
  {
    name: "YouTube",
    domains: ["youtube.com"],
    icon: "🎥",
    color: "#FF0000",
  },
  {
    name: "GitHub",
    domains: ["github.com"],
    icon: "💻",
    color: "#181717",
  },
  {
    name: "TikTok",
    domains: ["tiktok.com"],
    icon: "🎵",
    color: "#000000",
  },
  {
    name: "Discord",
    domains: ["discord.com", "discord.gg"],
    icon: "🎮",
    color: "#5865F2",
  },
  {
    name: "Telegram",
    domains: ["t.me", "telegram.org"],
    icon: "✈️",
    color: "#26A5E4",
  },
  {
    name: "WhatsApp",
    domains: ["wa.me", "whatsapp.com"],
    icon: "💬",
    color: "#25D366",
  },
];

/**
 * Get icon for URL based on domain
 */
export const getIconForUrl = (url: string): string => {
  try {
    const domain = new URL(url).hostname;
    const platform = SOCIAL_PLATFORMS.find((p) =>
      p.domains.some((d) => domain.includes(d))
    );
    return platform?.icon || "🔗";
  } catch {
    return "🔗";
  }
};
