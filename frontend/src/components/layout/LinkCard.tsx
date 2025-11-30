import { FaInstagram, FaTiktok } from "react-icons/fa6";

type LinkCardProps = {
  title: string;
  url?: string;
  icon?: React.ReactNode;
};

export default function LinkCard({ title, url, icon }: LinkCardProps) {
  return (
    <div className="w-full px-5 py-2 flex items-center justify-center gap-4 rounded-full bg-white/50 border border-white/50 inset-shadow-sm inset-shadow-white shadow backdrop-blur-lg hover:-translate-y-1 transition-all duration-200 ease-out cursor-pointer">
      {icon && (
        <div className="relative">
          {title.toLowerCase() === "tiktok" ? (
            <FaTiktok
              size={18}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          ) : title.toLowerCase() === "instagram" ? (
            <FaInstagram
              size={18}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          ) : (
            ""
          )}
        </div>
      )}
      <div className="flex flex-col">
        <h2 className="text-center align-bottom font-bold">
          {title}
        </h2>
        {url && <p>{url}</p>}
      </div>
    </div>
  );
}
