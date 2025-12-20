import { TbLoader2 } from "react-icons/tb";

export default function LoadingScreen() {
  return (
    <div className="absolute inset-0 w-full h-screen bg-black/80 flex items-center justify-center z-50">
      <div className="flex items-center gap-2 text-2xl md:text-5xl text-white">
        <TbLoader2 className="animate-spin" />
        <p className="font-extrabold font-bricolage-grotesque">Loading...</p>
      </div>
    </div>
  );
}
