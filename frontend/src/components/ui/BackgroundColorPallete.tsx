type BackgroundColorPalleteProps = {
  className: string;
};

export default function BackgroundColorPallete({
  className,
}: BackgroundColorPalleteProps) {
  return (
    <div
      className={`w-full aspect-square ${className} rounded-4xl cursor-pointer hover:-translate-y-2 transition-all duration-200 ease-out`}
    ></div>
  );
}
