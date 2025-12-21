interface Props {
  icon: React.ReactNode;
  title: string;
  value: number | undefined;
}

export default function AnalyticCard({ icon, title, value }: Props) {
  return (
    <div className="w-full p-4 md:p-5 flex flex-col gap-1 border border-white/50 rounded-4xl inset-shadow-sm inset-shadow-white shadow backdrop-blur-lg hover:scale-105 transition-all duration-300 ease-out">
      {icon}
      <h1 className="font-bricolage-grotesque font-extrabold text-3xl md:text-4xl mt-1 md:mt-2">
        {value}
      </h1>
      <p className="font-light text-xs md:text-base">{title}</p>
    </div>
  );
}
