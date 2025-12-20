import Link from "next/link";

type CTAButtonProps = {
  text: string;
  bgColor: string;
};

export default function CTAButton({ text, bgColor }: CTAButtonProps) {
  return (
    <Link
      href="/login"
      className={`w-fit px-5 md:px-10 py-3 md:py-4 font-bricolage-grotesque text-base md:text-2xl font-extrabold align-baseline ${bgColor} text-brand-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 ease-out`}
    >
      {text}
    </Link>
  );
}
