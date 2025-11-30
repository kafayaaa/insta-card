"use client";

import DashboardButton from "@/components/ui/DashboardButton";
import { usePathname } from "next/navigation";
import { TbBackground } from "react-icons/tb";

export default function DashboardCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isBackground = pathname === "/dashboard/card/background";
  return (
    <div className="w-full h-full grid grid-cols-12">
      <div className="col-span-3 w-full h-full p-10 flex flex-col gap-3 border-r border-zinc-200/50">
        <DashboardButton
          href="/dashboard/links"
          textColor="text-brand-dark-purple"
          isActive={isBackground}
        >
          <TbBackground size={25} />
          Background
        </DashboardButton>
      </div>
      <div className="col-span-9 w-full h-full">{children}</div>
    </div>
  );
}
