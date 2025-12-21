interface Props {
  icon: React.ReactNode;
  title: string;
  value: number | undefined;
}

export default function DailyStat({ icon, title, value }: Props) {
  return (
    <div className="relative w-full p-4 md:p-5 rounded-4xl bg-white/50 border border-white/50 inset-shadow-sm inset-shadow-white shadow backdrop-blur-lg overflow-hidden hover:scale-105 transition-all duration-300 ease-out">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/6 opacity-10">
        {icon}
      </div>
      <div className="flex flex-col gap-0 md:gap-1">
        <h2 className="text-lg md:text-xl font-bricolage-grotesque font-semibold">
          {title}
        </h2>
        <h1 className="font-bricolage-grotesque font-extrabold text-3xl md:text-4xl">
          {value}
        </h1>
        <p className="text-xs md:text-base">Clicks</p>
      </div>
    </div>
  );
}
