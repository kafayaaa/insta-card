// src/constants/templates.ts
export type TemplateId = "holy-light" | "dark-night" | "starry-night";

export const TEMPLATE_CONFIG: Record<
  TemplateId,
  {
    layout: "column" | "grid";
    background: string;
    wallpaper: string;
    fontColor: string;
  }
> = {
  "holy-light": {
    layout: "column",
    background: "bg-brand-white/50",
    wallpaper: "bg-brand-white",
    fontColor: "text-brand-black",
  },
  "dark-night": {
    layout: "column",
    background: "bg-brand-black/50",
    wallpaper: "bg-brand-black",
    fontColor: "text-brand-white",
  },
  "starry-night": {
    layout: "column",
    background: "bg-brand-white/50",
    wallpaper: "bg-brand-black",
    fontColor: "text-brand-white",
  },
};
