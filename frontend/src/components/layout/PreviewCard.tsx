import { useCard } from "@/context/CardContext";
import LinkCard from "./LinkCard";
import Image from "next/image";

interface Props {
  layout?: "column" | "grid";
  background?: string;
}

export default function PreviewCard({
  layout = "column",
  background = "bg-zinc-50/50",
}: Props) {
  const { link } = useCard();

  return (
    <div
      className={`w-full aspect-9/16 px-5 pt-20 pb-10 flex flex-col items-center gap-10 border border-white/50 rounded-4xl inset-shadow-sm inset-shadow-white shadow backdrop-blur-lg ${background}`}
    >
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <div className="size-23 bg-brand-light-purple/20 rounded-full">
          <Image src="/profile.svg" alt="profile" width={100} height={100} />
        </div>
        <div className="text-center">
          <h1 className="text-xl font-medium">username</h1>
          <p>The bio of this current user active</p>
        </div>
      </div>
      {layout === "column" ? (
        <div className="w-full flex flex-col gap-5">
          {link.map((item, i) => (
            <LinkCard key={i} title={item.title} icon={true} />
          ))}
        </div>
      ) : layout === "grid" ? (
        <div className="w-full px-10 grid grid-cols-3 gap-5">
          {link.map((item, i) => (
            <LinkCard
              key={i}
              title={item.title}
              titleVisible={false}
              icon={true}
              className="w-full aspect-square"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
