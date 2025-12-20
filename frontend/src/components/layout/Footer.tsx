"use client";

import { useState } from "react";

const prefix = "instacard/";

export default function Footer() {
  const [value, setValue] = useState("");
  return (
    <div className="relative w-full min-h-screen bg-brand-light-sky text-brand-dark-orange">
      <div className="absolute bottom-0 inset-x-0 w-full py-2 md:py-5 text-center text-brand-dark-sky bg-brand-white/50 border-white/50 inset-shadow-xs inset-shadow-white shadow-md drop-shadow-brand-dark-sky/35 backdrop-blur-lg">
        <p>
          Copyright &copy; 2025{" "}
          <span className="font-extrabold">InstaCard</span>
        </p>
      </div>
      <div className="w-11/12 md:max-w-7xl h-screen mx-auto flex flex-col justify-center items-center gap-10">
        <h1 className="text-4xl md:text-7xl text-center font-extrabold font-bricolage-grotesque mt-20">
          Get Your InstaCard Now!
        </h1>
        <div className="max-w-6xl flex flex-col md:flex-row items-center justify-between gap-3 md:gap-5 text-lg md:text-2xl">
          <div className="relative w-full">
            <span className="absolute left-5 md:left-10 top-1/2 -translate-y-1/2 z-10 font-extrabold">
              {prefix}
            </span>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full pl-29.5 md:pl-43 pr-5 md:pr-10 py-3 md:py-5 rounded-full focus:outline-none caret-brand-dark-orange bg-brand-white/50 border border-white/50 inset-shadow-xs inset-shadow-white shadow-md drop-shadow-brand-dark-orange/35 backdrop-blur-lg"
              placeholder=" your link"
            />
          </div>
          <button className="px-10 py-3 md:py-5 font-extrabold bg-brand-dark-orange text-brand-white rounded-full hover:scale-105 transition-all duration-300 ease-out">
            Start
          </button>
        </div>
      </div>
    </div>
  );
}
