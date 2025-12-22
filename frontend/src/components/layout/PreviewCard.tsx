import { useCard } from "@/context/CardContext";
import LinkCard from "./LinkCard";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function PreviewCard() {
  const { link, background, layout, fontColor, fontFace, fontWeight } =
    useCard();
  const { user } = useAuth();

  return (
    <div
      className={`w-full aspect-9/16 px-5 pt-20 pb-10 flex flex-col items-center gap-10 border border-white/50 rounded-4xl inset-shadow-sm inset-shadow-white shadow backdrop-blur-lg ${background} ${fontColor} ${fontFace} ${fontWeight}`}
    >
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <div className="size-23 bg-brand-light-purple/20 rounded-full">
          {user?.avatar ? (
            <Image
              src={`http://localhost:5000/avatars/${user.avatar}`}
              width={50}
              height={50}
              alt="profile"
              className="w-full h-full rounded-full"
            />
          ) : (
            <Image
              src="/profile.webp"
              width={50}
              height={50}
              alt="profile"
              className="w-full h-full rounded-full"
            />
          )}
        </div>
        <div className="text-center">
          <h1 className="text-xl">{user?.username}</h1>
          <p>{user?.bio}</p>
        </div>
      </div>
      {layout === "column" ? (
        <div className="w-full flex flex-col gap-5">
          {link.map((item, i) => (
            <LinkCard
              key={i}
              linkId={item.id}
              title={item.title}
              url={item.url}
              icon={true}
              iconSize={20}
            />
          ))}
        </div>
      ) : layout === "grid" ? (
        <div className="w-full px-10 grid grid-cols-3 gap-5">
          {link.map((item, i) => (
            <LinkCard
              key={i}
              linkId={item.id}
              title={item.title}
              titleVisible={false}
              url={item.url}
              icon={true}
              iconSize={25}
              className="w-full aspect-square"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
