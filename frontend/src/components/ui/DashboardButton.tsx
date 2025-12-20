import Link from "next/link";

type DashboardButtonProps = {
  href: string;
  isActive?: boolean;
  textColor: string;
  children: React.ReactNode;
};

export default function DashboardButton({
  href,
  isActive,
  textColor,
  children,
}: DashboardButtonProps) {
  return (
    <Link
      href={href}
      className={`w-full px-3 md:px-5 py-1.5 md:py-3 flex flex-col md:flex-row justify-center md:justify-start items-center gap-1.5 md:gap-3 ${
        isActive ? "bg-brand-light-purple/20" : "hover:bg-brand-light-purple/20"
      }  ${textColor} text-xs md:text-base font-extrabold rounded-lg hover:-translate-y-2 md:hover:translate-y-0 md:hover:translate-x-2 transition-all duration-300 ease-out`}
    >
      {children}
    </Link>
  );
}
