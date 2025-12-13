"use client";

import { useCard } from "@/context/CardContext";
import PreviewCard from "./PreviewCard";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

type WorkSpaceProps = {
  children: React.ReactNode;
};

export default function WorkSpace({ children }: WorkSpaceProps) {
  const {wallpaper} = useCard()
  const {user} = useAuth();
  return (
    <div className="w-full h-screen p-5">
      <div className="w-full h-full grid grid-cols-12 bg-zinc-50/50 border border-white/50 rounded-4xl inset-shadow-sm inset-shadow-white shadow backdrop-blur-lg">
        <div className="col-span-9">{children}</div>
        <div className={`relative col-span-3 p-5 flex justify-center items-center rounded-4xl border ${wallpaper}`}>
          <PreviewCard />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hover:scale-105 transition-all duration-300 ease-out">
          <Link href={`/${user?.username}`} target="blank" className="px-5 py-3 bg-zinc-50/50 border border-white/50 rounded-full inset-shadow-sm inset-shadow-white shadow backdrop-blur-lg">
            See Your Card
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
