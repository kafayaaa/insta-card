"use client";

import DashboardButton from "../ui/DashboardButton";
import { TbPlayCardStarFilled } from "react-icons/tb";
import { RiLinksFill } from "react-icons/ri";
import { PiEyesFill } from "react-icons/pi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  const isLinks = pathname === "/dashboard/links";
  const isCard = pathname.includes("/dashboard/card");

  return (
    <div className="w-full md:w-60 md:h-screen pb-3 md:p-10">
      <div className="w-11/12 h-full mx-auto flex flex-row md:flex-col justify-between items-center">
        <div className="flex flex-row md:flex-col gap-5 md:gap-10">
          <h1 className="hidden md:block font-bricolage-grotesque font-extrabold text-4xl text-center">
            InstaCard
          </h1>
          <div className="w-full flex flex-row md:flex-col gap-2 md:gap-5">
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
            <DashboardButton
              href={`/${user?.username}`}
              textColor="text-brand-dark-purple md:hidden"
            >
              <PiEyesFill size={25} />
              Preview
            </DashboardButton>
          </div>
        </div>
        <div className="w-fit md:w-full flex items-center justify-center">
          <Link
            href="/dashboard/profile"
            className="size-10 md:size-20 bg-brand-light-purple/20 rounded-full"
          >
            {user?.avatar ? (
              <Image
                src={`/${user?.avatar}`}
                width={50}
                height={50}
                alt="profile"
                className="w-full h-full rounded-full"
              />
            ) : (
              <Image
                src="/profile.webp"
                width={50}
                height={50}
                alt="profile"
                className="w-full h-full rounded-full"
              />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
