// src/constants/templates.ts
export type TemplateId =
  | "holy-light"
  | "dark-night"
  | "starry-night"
  | "liquid-planet"
  | "beach"
  | "checkered-book";

export const TEMPLATE_CONFIG: Record<
  TemplateId,
  {
    layout: "column" | "grid";
    background: string;
    wallpaper: string;
    imgWallpaper: string;
    fontColor: string;
  }
> = {
  "holy-light": {
    layout: "column",
    background: "bg-brand-white/50",
    wallpaper: "bg-brand-white",
    imgWallpaper: "",
    fontColor: "text-brand-black",
  },
  "dark-night": {
    layout: "column",
    background: "bg-brand-black/50",
    wallpaper: "bg-brand-black",
    imgWallpaper: "",
    fontColor: "text-brand-white",
  },
  "starry-night": {
    layout: "grid",
    background: "bg-brand-white/50",
    wallpaper: "",
    imgWallpaper: "starry-night.webp",
    fontColor: "text-brand-black",
  },
  "liquid-planet": {
    layout: "column",
    background: "bg-brand-light-sky/50",
    wallpaper: "",
    imgWallpaper: "liquid-planet.webp",
    fontColor: "text-brand-dark-sky",
  },
  beach: {
    layout: "grid",
    background: "bg-brand-white/50",
    wallpaper: "",
    imgWallpaper: "beach.webp",
    fontColor: "text-brand-dark-sky",
  },
  "checkered-book": {
    layout: "column",
    background: "bg-brand-white",
    wallpaper: "",
    imgWallpaper: "checkered-book.webp",
    fontColor: "text-brand-black",
  },
};
