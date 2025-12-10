type ProfileEditCardProps = {
  title: string;
  children: React.ReactNode;
};

export default function ProfileEditCard({
  title,
  children,
}: ProfileEditCardProps) {
  return (
    <div className="w-full flex flex-col pb-2 border-b border-zinc-200/50">
      <label className="block font-light text-sm">{title}</label>
      <div className="w-full flex justify-between items-center gap-5">
        {children}
      </div>
    </div>
  );
}
