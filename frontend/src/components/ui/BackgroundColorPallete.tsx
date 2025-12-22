type BackgroundColorPalleteProps = {
  className: string;
  imgWallpaper?: string;
};

export default function BackgroundColorPallete({
  className,
  imgWallpaper,
}: BackgroundColorPalleteProps) {
  return (
    <div
      className={`w-full aspect-square ${className} rounded-4xl cursor-pointer hover:-translate-y-2 transition-all duration-200 ease-out bg-cover bg-center shadow`}
      style={{
        backgroundImage: `url(http://localhost:3000/wallpapers/${imgWallpaper})`,
      }}
    ></div>
  );
}
