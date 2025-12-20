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
    <div className="w-full h-full flex flex-col-reverse justify-start items-start md:flex-none md:grid md:grid-cols-12 overflow-hidden">
      <div className="md:col-span-3 w-full h-25 md:h-full p-3 md:p-10 flex flex-row md:flex-col gap-3 border-t md:border-t-0 md:border-r border-zinc-200/50 overflow-scroll md:overflow-hidden">
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
      <div className="md:col-span-9 w-full h-full">{children}</div>
    </div>
  );
}
