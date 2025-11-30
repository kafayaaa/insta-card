import LinkCard from "./LinkCard";

export default function PreviewCard() {
  return (
    <div className="w-full aspect-9/16 px-5 pt-20 pb-10 flex flex-col items-center gap-10 bg-zinc-50/50 border border-white/50 rounded-4xl inset-shadow-sm inset-shadow-white shadow backdrop-blur-lg">
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <div className="size-23 bg-brand-light-purple rounded-full"></div>
        <div className="text-center">
          <h1 className="text-xl font-medium">username</h1>
          <p>The bio of this current user active</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5">
        <LinkCard title="TikTok" icon={true} />
        <LinkCard title="Instagram" icon={true} />
      </div>
    </div>
  );
}
