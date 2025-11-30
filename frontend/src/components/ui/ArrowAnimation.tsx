"use client";

import { motion } from "framer-motion";
import { TbArrowBadgeRightFilled } from "react-icons/tb";

const arrows = Array(10).fill(0);

export default function ArrowAnimation() {
  return (
    <div className="overflow-hidden w-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <motion.div
        className="flex"
        animate={{ x: ["-50%", "0%"] }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <div className="flex">
          {arrows.map((_, index) => (
            <TbArrowBadgeRightFilled
              key={`a-${index}`}
              className="size-80 -mx-10 opacity-50 text-brand-dark-orange"
            />
          ))}
        </div>
        <div className="flex">
          {arrows.map((_, index) => (
            <TbArrowBadgeRightFilled
              key={`b-${index}`}
              className="size-80 -mx-10 opacity-50 text-brand-dark-orange"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
