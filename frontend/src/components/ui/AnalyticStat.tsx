export default function AnalyticStat({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full p-6 md:p-5 flex flex-col gap-1 border border-white/50 rounded-4xl inset-shadow-sm inset-shadow-white shadow backdrop-blur-lg">
      {children}
    </div>
  );
}
