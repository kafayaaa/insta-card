import { FaPencil } from "react-icons/fa6";

type ProfileEditCardProps = {
  title: string;
  isProfile?: boolean;
  children: React.ReactNode;
};

export default function ProfileEditCard({
  title,
  isProfile = false,
  children,
}: ProfileEditCardProps) {
  return (
    <div className="w-full flex flex-col pb-2 border-b border-zinc-200/50">
      <label className="block font-light text-sm">{title}</label>
      <div className="w-full flex justify-between items-center gap-5">
        {!isProfile ? <p className="font-bold">{children}</p> : <>{children}</>}
        <button className="relative size-13 rounded-full bg-brand-light-purple/50 border border-brand-light-purple/25 inset-shadow-xs inset-shadow-brand-light-purple/50 shadow-md backdrop-blur-lg hover:scale-105 transition-all duration-200 ease-out cursor-pointer">
          <FaPencil
            size={20}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-dark-purple"
          />
        </button>
      </div>
    </div>
  );
}
