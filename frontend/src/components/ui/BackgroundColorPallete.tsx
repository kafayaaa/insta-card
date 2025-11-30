type BackgroundColorPalleteProps = {
  bgColor: string;
};

export default function BackgroundColorPallete({
  bgColor,
}: BackgroundColorPalleteProps) {
  return (
    <div
      className={`w-full aspect-square bg-${bgColor} rounded-4xl cursor-pointer hover:-translate-y-2 transition-all duration-200 ease-out`}
    ></div>
  );
}
