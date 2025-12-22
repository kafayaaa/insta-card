"use client";

import BackgroundColorPallete from "@/components/ui/BackgroundColorPallete";
import { useCard } from "@/context/CardContext";

export default function DashboardWallpaperPage() {
  const { setWallpaper, setImgWallpaper } = useCard();

  //   useAutoSaveBackground(); // <= aktifkan auto-save

  const handleWallpaperChange = (wallpeperColor: string) => {
    setWallpaper(wallpeperColor);
  };

  const handleImgWallpaperChange = (imgWallpaper: string) => {
    setImgWallpaper(imgWallpaper);
  };

  return (
    <div className="w-full h-full p-5 md:p-10 flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-1">
        <h1 className="font-bricolage-grotesque font-extrabold text-xl md:text-2xl">
          Wallpaper
        </h1>
        <p className="text-sm md:text-base">
          Choose a wallpaper for your card from the options below.
        </p>
      </div>
      <div className="w-full max-w-xl mx-auto space-y-4">
        <h2 className="text-2xl font-semibold font-bricolage-grotesque">
          Colors
        </h2>
        <div className="w-full grid grid-cols-5 gap-5">
          <button onClick={() => handleWallpaperChange("bg-brand-white")}>
            <BackgroundColorPallete className="bg-brand-white" />
          </button>
          <button onClick={() => handleWallpaperChange("bg-brand-black")}>
            <BackgroundColorPallete className="bg-brand-black" />
          </button>
          <button
            onClick={() => handleWallpaperChange("bg-brand-light-purple")}
          >
            <BackgroundColorPallete className="bg-brand-light-purple" />
          </button>
          <button onClick={() => handleWallpaperChange("bg-brand-dark-purple")}>
            <BackgroundColorPallete className="bg-brand-dark-purple" />
          </button>

          <button
            onClick={() => handleWallpaperChange("bg-brand-light-orange")}
          >
            <BackgroundColorPallete className="bg-brand-light-orange" />
          </button>
          <button onClick={() => handleWallpaperChange("bg-brand-dark-orange")}>
            <BackgroundColorPallete className="bg-brand-dark-orange" />
          </button>

          <button onClick={() => handleWallpaperChange("bg-brand-light-sky")}>
            <BackgroundColorPallete className="bg-brand-light-sky" />
          </button>
          <button onClick={() => handleWallpaperChange("bg-brand-dark-sky")}>
            <BackgroundColorPallete className="bg-brand-dark-sky" />
          </button>

          <button onClick={() => handleWallpaperChange("bg-brand-light-lime")}>
            <BackgroundColorPallete className="bg-brand-light-lime" />
          </button>
          <button onClick={() => handleWallpaperChange("bg-brand-dark-lime")}>
            <BackgroundColorPallete className="bg-brand-dark-lime" />
          </button>

          <button onClick={() => handleWallpaperChange("bg-emerald-500")}>
            <BackgroundColorPallete className="bg-emerald-500" />
          </button>
        </div>
      </div>

      <div className="w-full max-w-xl mx-auto space-y-4">
        <h2 className="text-2xl font-semibold font-bricolage-grotesque">
          Image
        </h2>
        <div className="w-full grid grid-cols-5 gap-5">
          <button onClick={() => handleImgWallpaperChange("starry-night.webp")}>
            <BackgroundColorPallete
              className=""
              imgWallpaper="starry-night.webp"
            />
          </button>
          <button
            onClick={() => handleImgWallpaperChange("liquid-planet.webp")}
          >
            <BackgroundColorPallete
              className=""
              imgWallpaper="liquid-planet.webp"
            />
          </button>
          <button onClick={() => handleImgWallpaperChange("beach.webp")}>
            <BackgroundColorPallete className="" imgWallpaper="beach.webp" />
          </button>
          <button
            onClick={() => handleImgWallpaperChange("checkered-book.webp")}
          >
            <BackgroundColorPallete
              className=""
              imgWallpaper="checkered-book.webp"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
