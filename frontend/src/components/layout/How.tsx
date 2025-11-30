import { RiAccountPinCircleFill } from "react-icons/ri";
import StepCard from "./StepCard";
import { IoColorPaletteSharp } from "react-icons/io5";
import { FaPaperPlane } from "react-icons/fa6";
import CTAButton from "../ui/CTAButton";
import ArrowAnimation from "../ui/ArrowAnimation";

export default function How() {
  return (
    <div
      className={`overflow-hidden relative w-full min-h-screen text-purple bg-brand-light-orange`}
    >
      <ArrowAnimation />
      <div
        className={`w-7xl h-screen mx-auto flex flex-col justify-center items-center gap-20 text-brand-dark-sky`}
      >
        <div className="flex flex-col justify-start items-center">
          <h1 className="text-6xl font-extrabold font-bricolage-grotesque">
            How it Works?
          </h1>
          <p className="text-xl text-center mt-5 max-w-2xl font-semibold ">
            You can connect your followers to whatever you do from anywhere in
            just three easy steps.
          </p>
        </div>
        <div className="w-full grid grid-cols-3 gap-10">
          <StepCard
            icon={
              <RiAccountPinCircleFill className="text-6xl text-brand-dark-sky" />
            }
            title="1. Sign Up & Create Your Card"
            description="Making and setting up your account takes less than a minute."
          />
          <StepCard
            icon={
              <IoColorPaletteSharp className="text-6xl text-brand-dark-sky" />
            }
            title="2. Make Your Card Unique"
            description="Customize your card with themes, colors, and layouts that reflect your style."
          />
          <StepCard
            icon={<FaPaperPlane className="text-6xl text-brand-dark-sky" />}
            title="3. Share Your Card"
            description="Easily share your InstaCard link on social media, email, or anywhere you connect with others."
          />
        </div>
        <CTAButton text="Get Started Now" bgColor="bg-brand-dark-sky" />
      </div>
    </div>
  );
}
