"use client";

import BackgroundColorPallete from "@/components/ui/BackgroundColorPallete";
import { useCard } from "@/context/CardContext";
import {
  useAutoSaveFontColor,
  useAutoSaveFontFace,
  useAutoSaveFontWeight,
} from "@/hooks/useAutoSaveFont";

export default function DashboardFontPage() {
  const { setFontColor, setFontFace, setFontWeight } = useCard();

  useAutoSaveFontColor(); // <= aktifkan auto-save
  useAutoSaveFontFace();
  useAutoSaveFontWeight();

  const handleFontColorChange = (textColor: string) => {
    setFontColor(textColor);
  };

  const handleFontFaceChange = (textFace: string) => {
    setFontFace(textFace);
  };

  const handleFontWeightChange = (textWeight: string) => {
    setFontWeight(textWeight);
  };

  return (
    <div className="w-full h-full p-5 md:p-10 flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-1">
        <h1 className="font-bricolage-grotesque font-extrabold text-xl md:text-2xl">
          Font
        </h1>
        <p className="text-sm md:text-base">
          Choose a font style for your card from the options below.
        </p>
      </div>
      <div className="w-full max-w-xl space-y-3">
        <h2 className="text-lg md:text-2xl font-bricolage-grotesque font-semibold">
          Font Color
        </h2>
        <div className="w-full grid grid-cols-5 gap-5">
          <button onClick={() => handleFontColorChange("text-brand-white")}>
            <BackgroundColorPallete className="bg-brand-white" />
          </button>
          <button onClick={() => handleFontColorChange("text-brand-black")}>
            <BackgroundColorPallete className="bg-brand-black" />
          </button>
          <button
            onClick={() => handleFontColorChange("text-brand-light-purple")}
          >
            <BackgroundColorPallete className="bg-brand-light-purple" />
          </button>
          <button
            onClick={() => handleFontColorChange("text-brand-dark-purple")}
          >
            <BackgroundColorPallete className="bg-brand-dark-purple" />
          </button>

          <button
            onClick={() => handleFontColorChange("text-brand-light-orange")}
          >
            <BackgroundColorPallete className="bg-brand-light-orange" />
          </button>
          <button
            onClick={() => handleFontColorChange("text-brand-dark-orange")}
          >
            <BackgroundColorPallete className="bg-brand-dark-orange" />
          </button>

          <button onClick={() => handleFontColorChange("text-brand-light-sky")}>
            <BackgroundColorPallete className="bg-brand-light-sky" />
          </button>
          <button onClick={() => handleFontColorChange("text-brand-dark-sky")}>
            <BackgroundColorPallete className="bg-brand-dark-sky" />
          </button>

          <button
            onClick={() => handleFontColorChange("text-brand-light-lime")}
          >
            <BackgroundColorPallete className="bg-brand-light-lime" />
          </button>
          <button onClick={() => handleFontColorChange("text-brand-dark-lime")}>
            <BackgroundColorPallete className="bg-brand-dark-lime" />
          </button>

          <button onClick={() => handleFontColorChange("text-emerald-500")}>
            <BackgroundColorPallete className="bg-emerald-500" />
          </button>
        </div>
      </div>

      <div className="w-full max-w-xl space-y-3">
        <h2 className="text-lg md:text-2xl font-bricolage-grotesque font-semibold">
          Font Face
        </h2>
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-5">
          <button
            className="px-4 py-2 rounded-2xl text-sm md:text-base font-bold shadow"
            onClick={() => handleFontFaceChange("font-bricolage-grotesque")}
          >
            Bricolage Grotesque
          </button>

          <button
            className="px-4 py-2 rounded-2xl text-sm md:text-base font-bold shadow"
            onClick={() => handleFontFaceChange("font-comfortaa")}
          >
            Comfortaa
          </button>
        </div>
      </div>

      <div className="w-full max-w-xl space-y-3">
        <h2 className="text-lg md:text-2xl font-bricolage-grotesque font-semibold">
          Font Weight
        </h2>
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-5">
          <button
            className="px-4 py-2 rounded-2xl text-sm md:text-base font-bold shadow"
            onClick={() => handleFontWeightChange("font-light")}
          >
            Light
          </button>

          <button
            className="px-4 py-2 rounded-2xl text-sm md:text-base font-bold shadow"
            onClick={() => handleFontWeightChange("font-normal")}
          >
            Normal
          </button>

          <button
            className="px-4 py-2 rounded-2xl text-sm md:text-base font-bold shadow"
            onClick={() => handleFontWeightChange("font-medium")}
          >
            Medium
          </button>

          <button
            className="px-4 py-2 rounded-2xl text-sm md:text-base font-bold shadow"
            onClick={() => handleFontWeightChange("font-bold")}
          >
            Bold
          </button>

          <button
            className="px-4 py-2 rounded-2xl text-sm md:text-base font-bold shadow"
            onClick={() => handleFontWeightChange("font-extrabold")}
          >
            Extra Bold
          </button>
        </div>
      </div>
    </div>
  );
}
