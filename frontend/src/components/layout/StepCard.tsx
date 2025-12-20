type StepCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function StepCard({ icon, title, description }: StepCardProps) {
  return (
    <div className="size-full p-4 md:p-8 flex flex-col items-center justify-center gap-2 md:gap-5 text-brand-black bg-brand-white/50 border border-white/50 inset-shadow-xs inset-shadow-white shadow-md drop-shadow-brand-dark-orange/35 backdrop-blur-lg rounded-4xl hover:scale-105 transition-all duration-300 ease-out">
      {icon}
      <h1 className="text-lg md:text-2xl font-extrabold">{title}</h1>
      <p>{description}</p>
    </div>
  );
}
