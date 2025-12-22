"use client";

import AnalyticCard from "@/components/ui/AnalyticCard";
import AnalyticStat from "@/components/ui/AnalyticStat";
import DailyStat from "@/components/ui/DailyStat";
import { useCard } from "@/context/CardContext";
import { JSX } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { FaTelegramPlane } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaLink,
  FaThreads,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { PiCursorClick, PiCursorClickFill, PiEyesFill } from "react-icons/pi";

export default function AnalyticsPage() {
  const { analytics } = useCard();
  const iconMap: Record<string, JSX.Element> = {
    Instagram: <FaInstagram className="text-8xl md:text-9xl" />,
    WhatsApp: <FaWhatsapp className="text-8xl md:text-9xl" />,
    Facebook: <FaFacebook className="text-8xl md:text-9xl" />,
    Telegram: <FaTelegramPlane className="text-8xl md:text-9xl" />,
    Youtube: <FaYoutube className="text-8xl md:text-9xl" />,
    Threads: <FaThreads className="text-8xl md:text-9xl" />,
    Tiktok: <FaTiktok className="text-8xl md:text-9xl" />,
    GMail: <BiLogoGmail className="text-8xl md:text-9xl" />,
    X: <FaXTwitter className="text-8xl md:text-9xl" />,
  };
  const defaultIcon = <FaLink className="text-8xl md:text-9xl" />;
  return (
    <div className="w-full p-5 md:p-10">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-5 md:gap-10">
        <h1 className="text-2xl md:text-4xl font-bricolage-grotesque font-extrabold">
          Analytics
        </h1>
        <div className="w-full grid grid-cols-3 gap-5">
          <AnalyticCard
            icon={<PiCursorClick className="text-xl md:text-2xl" />}
            value={analytics?.totalClicks}
            title="Total Clicks"
          />
          <AnalyticCard
            icon={<PiCursorClickFill className="text-xl md:text-2xl" />}
            value={analytics?.monthlyClicks}
            title="Monthly Clicks"
          />
          <AnalyticCard
            icon={<PiEyesFill className="text-xl md:text-2xl" />}
            value={analytics?.monthlyViews}
            title="Monthly Views"
          />
        </div>
        <div className="w-full space-y-5">
          <h2 className="text-xl md:text-2xl font-bricolage-grotesque font-extrabold">
            Daily Stats
          </h2>
          <AnalyticStat>
            {Object.entries(analytics?.dailyStats || {}).length === 0 && (
              <p className="text-center">Ooops!!! There is no clicks today</p>
            )}
            {Object.entries(analytics?.dailyStats || {}).map(
              ([date, links]) => (
                <div key={date} className="w-full flex flex-col gap-3">
                  <p className="self-end font-light">{date}</p>
                  <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-5">
                    {links.map((link) => (
                      <DailyStat
                        key={link.linkId}
                        icon={iconMap[link.title] ?? defaultIcon}
                        title={link.title}
                        value={link.clicks}
                      />
                      // <div key={link.linkId} className="w-full flex gap-5">
                      //   {link.title}
                      //   <div className="flex flex-col items-center">
                      //     <PiCursorClick />
                      //     <p>{link.clicks}</p>
                      //     <p>clicks</p>
                      //   </div>
                      // </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </AnalyticStat>
        </div>
      </div>
    </div>
  );
}
