import CTAButton from "../ui/CTAButton";

type HeadlineProps = {
  headline: string;
  subheadline: string;
  reverse?: boolean;
};

export default function Headline({
  headline,
  subheadline,
  reverse,
}: HeadlineProps) {
  return (
    <div
      className={`md:mt-0 w-full md:w-1/2 flex flex-col justify-center gap-5 text-brand-dark-purple ${
        reverse ? "items-end text-end" : "items-start text-start"
      } cursor-default`}
    >
      <h1 className="text-3xl md:text-8xl font-extrabold font-bricolage-grotesque">
        {headline}
      </h1>
      <p className="text-base md:text-2xl font-semibold ">{subheadline}</p>
      <CTAButton text="Connect Your Link" bgColor="bg-brand-dark-purple" />
    </div>
  );
}
