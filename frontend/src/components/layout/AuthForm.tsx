import Link from "next/link";

type AuthFormProps = {
  bgColor: string;
  bgButtonColor: string;
  textColor: string;
  title: string;
  redirectText: string;
  link: string;
  linkText: string;
  children?: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function AuthForm({
  bgColor,
  bgButtonColor,
  textColor,
  title,
  redirectText,
  link,
  linkText,
  children,
  onSubmit,
}: AuthFormProps) {
  return (
    <div
      className={`w-full h-screen flex flex-col justify-center items-center font-comfortaa ${bgColor}`}
    >
      <form
        onSubmit={onSubmit}
        className="w-1/2 p-5 flex flex-col items-center gap-10 rounded-4xl bg-brand-white/50 border-white/50 inset-shadow-xs inset-shadow-white shadow-md drop-shadow-brand-dark-orange/35 backdrop-blur-lg"
      >
        <h2
          className={`font-bricolage-grotesque text-4xl ${textColor} text-center font-extrabold`}
        >
          {title}
        </h2>
        <div className="w-full flex flex-col items-center gap-5">
          {children}
        </div>
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
