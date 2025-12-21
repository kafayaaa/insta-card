// app/[username]/UserPageClient.tsx
"use client";

import LinkCard from "@/components/layout/LinkCard";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ShareQR from "@/components/ui/QRCode";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/instacard";
import Image from "next/image";
import Link from "next/link";
import { FaQrcode } from "react-icons/fa6";
import { LuGlobe } from "react-icons/lu";

export default function UserPageClient({ profile }: { profile: User }) {
  const { user } = useAuth();

  const isOwner = user?.username === profile.username;
  if (!isOwner) return <LoadingScreen />;

  const theme = JSON.parse(profile.theme);
  const layout = theme.layout;
  const background = theme.background;
  const wallpaper = theme.wallpaper;
  const fontColor = theme.fontColor;

  return (
    <div
      className={`w-full min-h-screen py-20 flex flex-col items-center ${wallpaper} ${fontColor}`}
    >
      <div className="w-full max-w-9/12 md:max-w-xl grow flex items-center justify-center">
        <div
          className={`w-full min-h-max px-5 md:px-10 pt-10 md:pt-20 pb-10 flex flex-col items-center gap-10 border border-white/50 rounded-4xl inset-shadow-sm inset-shadow-white shadow backdrop-blur-lg ${background}`}
        >
          <div className="w-full flex flex-col items-center justify-center gap-3">
            <div className="size-18 md:size-23 bg-brand-light-purple/20 rounded-full">
              {profile.avatar ? (
                <Image
                  src={`http://localhost:5000/avatars/${profile.avatar}`}
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
              <h1 className="text-lg md:text-xl font-medium">
                {profile.username}
              </h1>
              <p>{profile.bio}</p>
            </div>
          </div>
          {layout === "column" ? (
            <div className="w-full flex flex-col gap-5">
              {profile.links?.map((item, i) => (
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
            <div className="w-full px-5 md:px-10 grid grid-cols-3 gap-5">
              {profile.links?.map((item, i) => (
                <LinkCard
                  key={i}
                  linkId={item.id}
                  title={item.title}
                  titleVisible={false}
                  url={item.url}
                  icon={true}
                  iconSize={30}
                  className="w-full max-w-20 mx-auto aspect-square"
                />
              ))}
            </div>
          ) : null}
        </div>
        <div className="fixed top-5 md:top-auto md:bottom-10 right-5 md:right-1/2 md:translate-x-1/2 flex items-center justify-center gap-5">
          <Dialog>
            <DialogTrigger className="p-3 bg-zinc-50/35 border border-white/50 rounded-full inset-shadow-xs inset-shadow-white shadow backdrop-blur-lg cursor-pointer hover:scale-105 transition-all duration-300 ease-out">
              <FaQrcode className="text-xl text-brand-white" />
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Your Instacard QR</DialogTitle>
              <div className="md:w-full flex items-center justify-center">
                <ShareQR username={user!.username} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
