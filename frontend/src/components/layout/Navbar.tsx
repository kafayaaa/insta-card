"use client";

import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiOutlineX } from "react-icons/hi";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-11/12 md:max-w-7xl fixed top-5 md:top-10 inset-x-0 z-50 mx-auto">
      <div className="w-full px-5 md:px-10 py-3 md:py-5 flex justify-between items-center bg-brand-white inset-shadow-sm rounded-full">
        <div className="flex items-center gap-3">
          <Image
            src="/instacard.webp"
            height={30}
            width={30}
            alt="instacard"
            className="w-12 h-16"
          />
          <h1 className="text-xl md:text-4xl font-bricolage-grotesque font-extrabold text-brand-dark-purple">
            InstaCard
          </h1>
        </div>
        <div className="hidden md:flex items-center justify-end gap-2 md:gap-5">
          <Link
            href="/signin"
            className="px-3 md:px-5 py-1.5 md:py-3 bg-brand-light-lime font-extrabold text-brand-dark-purple rounded-full hover:scale-105 transition-all duration-300 ease-out"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-3 md:px-5 py-1.5 md:py-3 bg-brand-dark-purple font-extrabold text-brand-white rounded-full hover:scale-105 transition-all duration-300 ease-out"
          >
            Sign Up Free
          </Link>
        </div>
        <div className="md:hidden text-2xl transition-all duration-300 ease-out">
          {isOpen ? (
            <HiOutlineX
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <RxHamburgerMenu
              className="cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-15 right-0 flex flex-col gap-3 p-4 rounded-xl bg-brand-white transition-all duration-300 ease-out">
          <Link
            href="/signin"
            className="px-3 md:px-5 py-1.5 md:py-3 text-center bg-brand-light-lime font-extrabold text-brand-dark-purple rounded-full hover:scale-105 transition-all duration-300 ease-out"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-3 md:px-5 py-1.5 md:py-3 text-center bg-brand-dark-purple font-extrabold text-brand-white rounded-full hover:scale-105 transition-all duration-300 ease-out"
          >
            Sign Up Free
          </Link>
        </div>
      )}
    </div>
  );
}
