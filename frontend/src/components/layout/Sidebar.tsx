"use client";

import DashboardButton from "../ui/DashboardButton";
import { TbPlayCardStarFilled } from "react-icons/tb";
import { RiLinksFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();

  const isLinks = pathname === "/dashboard/links";
  const isCard = pathname.includes("/dashboard/card");

  return (
    <div className="w-60 h-screen p-10">
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div className="flex flex-col gap-10">
          <h1 className="font-bricolage-grotesque font-extrabold text-4xl text-center">
            InstaCard
          </h1>
          <div className="w-full flex flex-col gap-5">
            <DashboardButton
              href="/dashboard/links"
              textColor="text-brand-dark-purple"
              isActive={isLinks}
            >
              <RiLinksFill size={25} />
              Links
            </DashboardButton>
            <DashboardButton
              href="/dashboard/card/background"
              textColor="text-brand-dark-purple"
              isActive={isCard}
            >
              <TbPlayCardStarFilled size={25} />
              Cards
            </DashboardButton>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <Link
            href="/dashboard/profile"
            className="size-20 rounded-full bg-brand-light-purple"
          ></Link>
        </div>
      </div>
    </div>
  );
}
