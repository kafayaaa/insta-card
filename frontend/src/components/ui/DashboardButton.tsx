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
      className={`w-full px-5 py-3 flex items-center gap-3 ${
        isActive ? "bg-brand-light-purple/20" : "hover:bg-brand-light-purple/20"
      }  ${textColor} font-extrabold rounded-lg hover:translate-x-2 transition-all duration-300 ease-out`}
    >
      {children}
    </Link>
  );
}
