type AuthImageProps = {
  text: string;
  textColor: string;
  bgColor: string;
};

export default function AuthImage({
  text,
  textColor,
  bgColor,
}: AuthImageProps) {
  return (
    <div
      className={`w-full h-screen ${bgColor} flex flex-col justify-center items-center gap-10`}
    >
      <h1
        className={`text-5xl font-extrabold font-bricolage-grotesque ${textColor}`}
      >
        {text}
      </h1>
    </div>
  );
}
