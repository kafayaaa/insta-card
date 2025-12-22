"use client";

import { useCard } from "@/context/CardContext";
import { TEMPLATE_CONFIG, TemplateId } from "@/constants/templates";

export default function TemplatePage() {
  const {
    setTemplate,
    setLayout,
    setBackground,
    setWallpaper,
    setImgWallpaper,
    setFontColor,
  } = useCard();

  const applyTemplate = async (templateId: TemplateId) => {
    const config = TEMPLATE_CONFIG[templateId];

    setTemplate(templateId);
    setLayout(config.layout);
    setBackground(config.background);
    setWallpaper(config.wallpaper);
    setImgWallpaper(config.imgWallpaper);
    setFontColor(config.fontColor);
  };

  return (
    <div className="w-full h-full p-5 md:p-10 flex flex-col items-center gap-10 ">
      <div className="flex flex-col items-center gap-1">
        <h1 className="font-bricolage-grotesque font-extrabold text-xl md:text-2xl">
          Template
        </h1>
        <p className="text-sm md:text-base">
          Choose a your template card that match your style.
        </p>
      </div>

      <div className="w-full grid grid-cols-3 md:grid-cols-5 gap-2">
        <button
          onClick={() => applyTemplate("holy-light")}
          className="px-5 py-2 text-sm md:text-base font-bold rounded-xl border"
        >
          Holy Light
        </button>

        <button
          onClick={() => applyTemplate("dark-night")}
          className="px-5 py-2 text-sm md:text-base font-bold rounded-xl border"
        >
          Dark Night
        </button>

        <button
          onClick={() => applyTemplate("starry-night")}
          className="px-5 py-2 text-sm md:text-base font-bold rounded-xl border"
        >
          Starry Night
        </button>

        <button
          onClick={() => applyTemplate("liquid-planet")}
          className="px-5 py-2 text-sm md:text-base font-bold rounded-xl border"
        >
          Liquid Planet
        </button>

        <button
          onClick={() => applyTemplate("beach")}
          className="px-5 py-2 text-sm md:text-base font-bold rounded-xl border"
        >
          Beach
        </button>

        <button
          onClick={() => applyTemplate("checkered-book")}
          className="px-5 py-2 text-sm md:text-base font-bold rounded-xl border"
        >
          Checkered Book
        </button>
      </div>
    </div>
  );
}
