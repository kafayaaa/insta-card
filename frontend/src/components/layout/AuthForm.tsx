import Link from "next/link";

type AuthFormProps = {
  bgColor: string;
  bgButtonColor: string;
  textColor: string;
  title: string;
  buttonText: string;
  redirectText: string;
  link: string;
  linkText: string;
  children?: React.ReactNode;
};

export default function AuthForm({
  bgColor,
  bgButtonColor,
  textColor,
  title,
  buttonText,
  redirectText,
  link,
  linkText,
  children,
}: AuthFormProps) {
  return (
    <div
      className={`w-full h-screen flex flex-col justify-center items-center font-comfortaa ${bgColor}`}
    >
      <form className="w-1/2 p-5 flex flex-col items-center gap-10 rounded-4xl bg-brand-white/50 border-white/50 inset-shadow-xs inset-shadow-white shadow-md drop-shadow-brand-dark-orange/35 backdrop-blur-lg">
        <h2
          className={`font-bricolage-grotesque text-4xl ${textColor} text-center font-extrabold`}
        >
          {title}
        </h2>
        <div className="w-full flex flex-col gap-5">{children}</div>
        <button
          className={`w-fit px-10 py-3 ${bgButtonColor} text-brand-white font-extrabold rounded-full hover:scale-105 transition-all duration-300 ease-out`}
        >
          {buttonText}
        </button>
      </form>
      <p className={`mt-10 text-lg ${textColor}`}>
        {redirectText}{" "}
        <Link
          href={link}
          className={`font-bold px-5 py-2 ml-3 text-base text-brand-white ${bgButtonColor} rounded-full`}
        >
          {linkText}
        </Link>
      </p>
    </div>
  );
}
