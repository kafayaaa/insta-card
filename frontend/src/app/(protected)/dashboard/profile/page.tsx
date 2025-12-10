import ProfileEditCard from "@/components/layout/ProfileEditCard";
import Image from "next/image";
import { BiLogOutCircle } from "react-icons/bi";

export default function ProfilePage() {
  return (
    <div className="w-full h-full p-10 flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-bricolage-grotesque font-extrabold text-3xl ">
          My Profile
        </h1>
        <p className="">Edit your profile here</p>
      </div>
      <div className="relative w-full h-full max-w-2xl flex flex-col gap-15">
        <ProfileEditCard title="Photo Profile" isProfile={true}>
          <div className="size-23 mt-2 rounded-full bg-brand-light-purple/20">
            <Image src="/profile.svg" width={100} height={100} alt="profile" />
          </div>
        </ProfileEditCard>
        <ProfileEditCard title="Username">username</ProfileEditCard>
        <ProfileEditCard title="Bio">
          The bio of this current user active
        </ProfileEditCard>
        <div className="absolute bottom-0 right-0">
          <button className="px-5 py-2 flex items-center gap-3 text-brand-white text-bold rounded-full bg-rose-500/50 border border-rose-500/25 inset-shadow-xs inset-shadow-rose-200 shadow-md backdrop-blur-lg hover:scale-105 transition-all duration-200 ease-out cursor-pointer">
            <BiLogOutCircle size={25} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
