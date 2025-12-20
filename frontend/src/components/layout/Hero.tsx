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
        className={`w-11/12 md:w-7xl h-screen mx-auto ${
          reverse ? "flex-col md:flex-row-reverse" : ""
        } flex flex-col md:flex-row justify-center items-center gap-20`}
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
