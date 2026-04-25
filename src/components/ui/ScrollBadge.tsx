"use client";

import { FC } from "react";
import { motion } from "framer-motion";

export const ScrollBadge: FC = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-3 cursor-pointer text-[#111111] dark:text-[#EAE8E3] opacity-60 hover:opacity-100 transition-opacity"
      whileHover={{ y: 2 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        // Smooth scroll to the next section
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      }}
    >
      {/* Mouse Body Outline */}
      <div className="w-[30px] h-[48px] rounded-full border-[3px] border-current flex justify-center pt-[8px]">
        {/* Animated Circular Scroll Wheel */}
        <motion.div
          animate={{
            y: [0, 16, 0],
          }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="w-[5px] h-[5px] rounded-full bg-current"
        />
      </div>
      
    </motion.div>
  );
};
