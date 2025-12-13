"use client";

import { useCard } from "@/context/CardContext";
import PreviewCard from "./PreviewCard";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ShareQR from "../ui/QRCode";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { LuGlobe } from "react-icons/lu";
import { FaQrcode } from "react-icons/fa6";

type WorkSpaceProps = {
  children: React.ReactNode;
};

export default function WorkSpace({ children }: WorkSpaceProps) {
  const {wallpaper} = useCard()
  const {user} = useAuth();
  return (
    <div className="w-full h-screen p-5">
      <div className="w-full h-full grid grid-cols-12 bg-zinc-50/50 border border-white/50 rounded-4xl inset-shadow-sm inset-shadow-white shadow backdrop-blur-lg overflow-hidden">
        <div className="col-span-9 overflow-y-scroll hide-scrollbar">{children}</div>
        <div className={`relative col-span-3 p-5 flex justify-center items-center rounded-4xl border ${wallpaper}`}>
          <PreviewCard />
          <div className="absolute bottom-10 inset-x-0 flex items-center justify-center gap-5">
            <Link href={`/${user?.username}`} target="blank" className="p-3 bg-zinc-50/35 border border-white/50 rounded-full inset-shadow-xs inset-shadow-white shadow backdrop-blur-lg cursor-pointer hover:scale-105 transition-all duration-300 ease-out">
              <LuGlobe className="text-xl text-brand-white" />
            </Link>
            <Dialog>
              <DialogTrigger className="p-3 bg-zinc-50/35 border border-white/50 rounded-full inset-shadow-xs inset-shadow-white shadow backdrop-blur-lg cursor-pointer hover:scale-105 transition-all duration-300 ease-out">
                <FaQrcode className="text-xl text-brand-white" />
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Your Instacard QR</DialogTitle>
                <div className="w-full flex items-center justify-center">
                  <ShareQR username={user!.username} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
