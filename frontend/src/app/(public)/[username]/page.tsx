import LinkCard from "@/components/layout/LinkCard";
import { User } from "@/types/instacard";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function UserPage({ params }: { params: Promise<{ username: string }> }) {
  // Unwrap params
  const { username } = await params;

  // Fetch data dari backend
  const res = await fetch(`http://localhost:5000/api/users/${username}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const profile: User = await res.json();

  const theme = JSON.parse(profile.theme);
  const layout = theme.layout;
  const background = theme.background;
  const wallpaper = theme.wallpaper;


  return (
    // <div className={`profile theme-${profile.theme} min-h-screen p-8`}>
    //   <div className="flex flex-col items-center">
    //     <Image
    //       src={profile.avatar ? `/${profile.avatar}` : "/profile.webp"}
    //       alt={`${profile.username} avatar`}
    //       width={96}
    //       height={96}
    //       className="rounded-full w-24 h-24 mb-4"
    //     />
    //     <h1 className="text-2xl font-bold">{profile.username}</h1>
    //     <p className="text-center text-gray-600 mb-6">{profile.bio}</p>

    //     <div className="flex flex-col space-y-4 w-full max-w-sm">
    //       {profile.links?.map((link) => (
    //         <a
    //           key={link.id}
    //           href={link.url}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="block px-4 py-2 rounded-lg bg-blue-500 text-white text-center hover:bg-blue-600"
    //         >
    //           {link.title}
    //         </a>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <div className={`w-full min-h-screen py-20 flex flex-col items-center ${wallpaper}`}>
        <div className="w-full max-w-xl grow flex items-center justify-center">
            <div
                  className={`w-full min-h-max px-5 pt-20 pb-10 flex flex-col items-center gap-10 border border-white/50 rounded-4xl inset-shadow-sm inset-shadow-white shadow backdrop-blur-lg ${background}`}
                >
                  <div className="w-full flex flex-col items-center justify-center gap-3">
                    <div className="size-23 bg-brand-light-purple/20 rounded-full">
                       {profile.avatar ? (
                          <Image
                            src={`/${profile.avatar}`}
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
                        ) }
                    </div>
                    <div className="text-center">
                      <h1 className="text-xl font-medium">{profile.username}</h1>
                      <p>{profile.bio}</p>
                    </div>
                  </div>
                  {layout === "column" ? (
                    <div className="w-full flex flex-col gap-5">
                      {profile.links?.map((item, i) => (
                        <LinkCard key={i} title={item.title} url={item.url} icon={true} />
                      ))}
                    </div>
                  ) : layout === "grid" ? (
                    <div className="w-full px-10 grid grid-cols-3 gap-5">
                      {profile.links?.map((item, i) => (
                        <LinkCard
                          key={i}
                          title={item.title}
                          titleVisible={false}
                          url={item.url}
                          icon={true}
                          className="w-full aspect-square"
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
        </div>
    </div>
  );
}
