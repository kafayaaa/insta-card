"use client";

import BackgroundColorPallete from "@/components/ui/BackgroundColorPallete";
import { useCard } from "@/context/CardContext";
import { useAutoSaveBackground } from "@/hooks/useAutoSaveBackground";

export default function DashboardCardPage() {
  const { setBackground } = useCard();

  useAutoSaveBackground(); // <= aktifkan auto-save

  const handleBackgroundChange = (bgColor: string) => {
    setBackground(bgColor);
  };

  return (
    <div className="w-full h-full p-10 flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-1">
        <h1 className="font-bricolage-grotesque font-extrabold text-2xl">
          Background
        </h1>
        <p>Choose a background for your card from the options below.</p>
      </div>

      <div className="w-full max-w-xl grid grid-cols-5 gap-5">
        <button onClick={() => handleBackgroundChange("bg-brand-white/50")}>
          <BackgroundColorPallete className="bg-brand-white" />
        </button>
        <button onClick={() => handleBackgroundChange("bg-brand-black/50")}>
          <BackgroundColorPallete className="bg-brand-black" />
        </button>
        <button onClick={() => handleBackgroundChange("bg-brand-light-purple/50")}>
          <BackgroundColorPallete className="bg-brand-light-purple" />
        </button>
        <button onClick={() => handleBackgroundChange("bg-brand-dark-purple/50")}>
          <BackgroundColorPallete className="bg-brand-dark-purple" />
        </button>

        <button onClick={() => handleBackgroundChange("bg-brand-light-orange/50")}>
          <BackgroundColorPallete className="bg-brand-light-orange" />
        </button>
        <button onClick={() => handleBackgroundChange("bg-brand-dark-orange/50")}>
          <BackgroundColorPallete className="bg-brand-dark-orange" />
        </button>

        <button onClick={() => handleBackgroundChange("bg-brand-light-sky/50")}>
          <BackgroundColorPallete className="bg-brand-light-sky" />
        </button>
        <button onClick={() => handleBackgroundChange("bg-brand-dark-sky/50")}>
          <BackgroundColorPallete className="bg-brand-dark-sky" />
        </button>

        <button onClick={() => handleBackgroundChange("bg-brand-light-lime/50")}>
          <BackgroundColorPallete className="bg-brand-light-lime" />
        </button>
        <button onClick={() => handleBackgroundChange("bg-brand-dark-lime/50")}>
          <BackgroundColorPallete className="bg-brand-dark-lime" />
        </button>

        <button onClick={() => handleBackgroundChange("bg-emerald-500/50")}>
          <BackgroundColorPallete className="bg-emerald-500" />
        </button>
      </div>
    </div>
  );
}
