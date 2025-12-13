"use client";

import DashboardButton from "@/components/ui/DashboardButton";
import { usePathname } from "next/navigation";
import { LuLayoutGrid, LuLayoutTemplate } from "react-icons/lu";
import { TbBackground, TbWallpaper } from "react-icons/tb";

export default function DashboardCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="w-full h-full grid grid-cols-12">
      <div className="col-span-3 w-full h-full p-10 flex flex-col gap-3 border-r border-zinc-200/50">
       <DashboardButton
          href="/dashboard/card/template"
          textColor="text-brand-dark-purple"
          isActive={pathname === "/dashboard/card/template"}
        >
          <LuLayoutTemplate size={25} />
          Template
        </DashboardButton>
        <DashboardButton
          href="/dashboard/card/layout"
          textColor="text-brand-dark-purple"
          isActive={pathname === "/dashboard/card/layout"}
        >
          <LuLayoutGrid size={25} />
          Layout
        </DashboardButton>
        <DashboardButton
          href="/dashboard/card/background"
          textColor="text-brand-dark-purple"
          isActive={pathname === "/dashboard/card/background"}
        >
          <TbBackground size={25} />
          Background
        </DashboardButton>
         <DashboardButton
          href="/dashboard/card/wallpaper"
          textColor="text-brand-dark-purple"
          isActive={pathname === "/dashboard/card/wallpaper"}
        >
          <TbWallpaper size={25} />
          Wallpaper
        </DashboardButton>
      </div>
      <div className="col-span-9 w-full h-full">{children}</div>
    </div>
  );
}
