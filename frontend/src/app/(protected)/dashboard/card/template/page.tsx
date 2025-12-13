"use client";

import { useCard } from "@/context/CardContext";
import { TEMPLATE_CONFIG, TemplateId } from "@/constants/templates";

export default function TemplatePage() {
  const { setTemplate, setLayout, setBackground } = useCard();

  const applyTemplate = async (templateId: TemplateId) => {
    const config = TEMPLATE_CONFIG[templateId];

    setTemplate(templateId);
    setLayout(config.layout);
    setBackground(config.background);
  };

  return (
    <div className="w-full h-full p-10 flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-1">
        <h1 className="font-bricolage-grotesque font-extrabold text-2xl">
          Template
        </h1>
        <p>Choose a your template card that match your style.</p>
      </div>

      <div className="w-full flex gap-2">
        <button
          onClick={() => applyTemplate("template-1")}
          className="px-5 py-2 font-bold rounded-xl border"
        >
          Template 1
        </button>

        <button
          onClick={() => applyTemplate("template-2")}
          className="px-5 py-2 font-bold rounded-xl border"
        >
          Template 2
        </button>
      </div>
    </div>
  );
}
