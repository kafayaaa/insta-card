// src/constants/templates.ts
export type TemplateId = "template-1" | "template-2";

export const TEMPLATE_CONFIG: Record<
  TemplateId,
  {
    layout: "column" | "grid";
    background: string;
  }
> = {
  "template-1": {
    layout: "column",
    background: "bg-brand-white/50",
  },
  "template-2": {
    layout: "grid",
    background: "bg-brand-black/50",
  },
};
