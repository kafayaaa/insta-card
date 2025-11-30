import Link from "next/link";

export default function Navbar() {
  return (
    <div className="max-w-7xl fixed top-10 inset-x-0 z-50 mx-auto">
      <div className="w-full px-10 py-7 flex justify-between items-center bg-brand-white inset-shadow-sm rounded-full">
        <h1 className="text-4xl font-bricolage-grotesque font-extrabold text-brand-dark-purple">
          InstaCard
        </h1>
        <div className="flex items-center justify-end gap-5">
          <Link
            href="/signin"
            className="px-5 py-3 bg-brand-light-lime font-extrabold text-brand-dark-purple rounded-full hover:scale-105 transition-all duration-300 ease-out"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-5 py-3 bg-brand-dark-purple font-extrabold text-brand-white rounded-full hover:scale-105 transition-all duration-300 ease-out"
          >
            Sign Up Free
          </Link>
        </div>
      </div>
    </div>
  );
}
