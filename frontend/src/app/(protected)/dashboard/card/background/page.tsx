import BackgroundColorPallete from "@/components/ui/BackgroundColorPallete";

export default function DashboardCardPage() {
  return (
    <div className="w-full h-full p-10 flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-1">
        <h1 className="font-bricolage-grotesque font-extrabold text-2xl">
          Background
        </h1>
        <p>Choose a background for your card from the options below.</p>
      </div>
      <div className="w-full max-w-xl grid grid-cols-5 gap-5">
        <BackgroundColorPallete bgColor="brand-light-purple" />
        <BackgroundColorPallete bgColor="brand-dark-purple" />
        <BackgroundColorPallete bgColor="brand-light-orange" />
        <BackgroundColorPallete bgColor="brand-dark-orange" />
        <BackgroundColorPallete bgColor="brand-light-sky" />
        <BackgroundColorPallete bgColor="brand-dark-sky" />
        <BackgroundColorPallete bgColor="brand-light-lime" />
        <BackgroundColorPallete bgColor="brand-dark-lime" />
        <BackgroundColorPallete bgColor="red-500" />
        <BackgroundColorPallete bgColor="green-500" />
        <BackgroundColorPallete bgColor="blue-500" />
        <BackgroundColorPallete bgColor="yellow-500" />
        <BackgroundColorPallete bgColor="violet-500" />
        <BackgroundColorPallete bgColor="cyan-500" />
      </div>
    </div>
  );
}
