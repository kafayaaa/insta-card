"use client";

import { useCard } from "@/context/CardContext";
import { useAutoSaveLayout } from "@/hooks/useAutoSaveLayout";

export default function LayoutPage() {
  const { layout, setLayout } = useCard();
  const isColumn = layout === "column";
  const isGrid = layout === "grid";

  useAutoSaveLayout();

  const handleLayoutChange = (newLayout: "column" | "grid") => {
    setLayout(newLayout);
  };

  return (
    <div className="w-full h-full p-5 md:p-10 flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-1">
        <h1 className="font-bricolage-grotesque font-extrabold text-xl md:text-2xl">
          Layout
        </h1>
        <p className="text-sm md:text-base">
          Choose a your layout card that match your style.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-sm md:text-base">Links Layout</h1>
        <div className="w-full max-w-xl grid grid-cols-3 md:grid-cols-5 gap-5">
          <button
            onClick={() => handleLayoutChange("column")}
            className={`px-5 py-2 text-sm md:text-base font-bold rounded-xl cursor-pointer transition-all duration-200 ease-out ${
              isColumn
                ? "bg-brand-light-purple text-brand-white"
                : "bg-brand-light-purple/20 hover:bg-brand-light-purple hover:text-brand-white"
            }`}
          >
            column
          </button>
          <button
            onClick={() => handleLayoutChange("grid")}
            className={`px-5 py-2 text-sm md:text-base font-bold rounded-xl cursor-pointer transition-all duration-200 ease-out ${
              isGrid
                ? "bg-brand-light-purple text-brand-white"
                : "bg-brand-light-purple/20 hover:bg-brand-light-purple hover:text-brand-white"
            }`}
          >
            grid
          </button>
        </div>
      </div>
    </div>
  );
}
