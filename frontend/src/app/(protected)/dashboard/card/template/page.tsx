"use client";

import { useCard } from "@/context/CardContext";

export default function TemplatePage() {
  const { setLayout, setBackground } = useCard();

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
          onClick={() => {
            setLayout("column");
            setBackground("bg-brand-white/50");
          }}
          className="px-5 py-2 font-bold rounded-xl cursor-pointer transition-all duration-200 ease-out border"
        >
          Template 1
        </button>
        <button
          onClick={() => {
            setLayout("grid");
            setBackground("bg-brand-black/50");
          }}
          className="px-5 py-2 font-bold rounded-xl cursor-pointer transition-all duration-200 ease-out border"
        >
          Template 2
        </button>
      </div>
    </div>
  );
}
