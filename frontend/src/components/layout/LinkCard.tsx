import Link from "next/link";
import { BiLogoGmail } from "react-icons/bi";
import { FaTelegramPlane } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaThreads, FaTiktok, FaWhatsapp, FaXTwitter, FaYoutube } from "react-icons/fa6";

type LinkCardProps = {
  title: string;
  titleVisible?: boolean;
  url: string;
  urlVisible?: boolean;
  icon?: React.ReactNode;
  iconSize: number;
  className?: string;
};

export default function LinkCard({
  title,
  titleVisible = true,
  url,
  urlVisible,
  icon,
  iconSize,
  className,
}: LinkCardProps) {
  return (
    <Link href={url!} target="_blank"
      className={`w-full px-5 py-2 flex items-center justify-center gap-4 rounded-full bg-white/50 border border-white/50 inset-shadow-sm inset-shadow-white shadow backdrop-blur-lg hover:-translate-y-1 transition-all duration-200 ease-out cursor-pointer ${className}`}
    >
      {icon && (
        <div className="relative">
          {title.toLowerCase() === "tiktok" ? (
            <FaTiktok
            size={iconSize}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          ) : title.toLowerCase() === "instagram" ? (
            <FaInstagram
            size={iconSize}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          ) : title.toLowerCase() === "facebook" ? (
            <FaFacebook
            size={iconSize}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          ) : title.toLowerCase() === "x" ? (
            <FaXTwitter
            size={iconSize}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          ) : title.toLowerCase() === "youtube" ? (
            <FaYoutube
            size={iconSize}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          ) : title.toLowerCase() === "threads" ? (
            <FaThreads
            size={iconSize}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          ) : title.toLowerCase() === "gmail" ? (
            <BiLogoGmail
            size={iconSize}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          ) : title.toLowerCase() === "whatsapp" ? (
            <FaWhatsapp
            size={iconSize}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          ) : title.toLowerCase() === "telegram" ? (
            <FaTelegramPlane
            size={iconSize}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          ) : (
            ""
          )}
        </div>
      )}
      {titleVisible && (
        <div className="flex flex-col">
          <h2 className="text-center align-bottom font-bold">{title}</h2>
          {urlVisible && <p>{url}</p>}
        </div>
      )}
    </Link>
  );
}
