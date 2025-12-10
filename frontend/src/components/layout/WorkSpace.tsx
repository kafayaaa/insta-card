"use client";

import { useCard } from "@/context/CardContext";
import PreviewCard from "./PreviewCard";

type WorkSpaceProps = {
  children: React.ReactNode;
};

export default function WorkSpace({ children }: WorkSpaceProps) {
  const { layout, background } = useCard();
  return (
    <div className="w-full h-screen p-5">
      <div className="w-full h-full grid grid-cols-12 bg-zinc-50/50 border border-white/50 rounded-4xl inset-shadow-sm inset-shadow-white shadow backdrop-blur-lg">
        <div className="col-span-9 border-r border-zinc-200/50">{children}</div>
        <div className="col-span-3 p-5 flex justify-center items-center">
          <PreviewCard layout={layout} background={background} />
        </div>
      </div>
    </div>
  );
}
