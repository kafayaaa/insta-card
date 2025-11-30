import Decoration from "./Decoration";
import Headline from "./Headline";

type HeroProps = {
  bgColor: string;
  reverse: boolean;
  headline: string;
  subheadline: string;
};

export default function Hero({
  bgColor,
  reverse,
  headline,
  subheadline,
}: HeroProps) {
  return (
    <div className={`w-full min-h-screen ${bgColor} text-purple`}>
      <div
        className={`w-7xl h-screen mx-auto ${
          reverse ? "flex-row-reverse" : ""
        } flex justify-center items-center`}
      >
        <Headline
          headline={headline}
          subheadline={subheadline}
          reverse={reverse}
        />
        <Decoration />
      </div>
    </div>
  );
}
