"use client";

import { motion, useAnimation } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

const navigationItems = [
  {
    name: "Home",
    href: "/",
    description: "[0]",
  },
  {
    name: "Components",
    href: "/components",
    description: "[1]",
  },
  {
    name: "Pricing",
    href: "/pricing",
    description: "[2]",
  },
  {
    name: "How to use",
    href: "/docs/quick-start",
    description: "[3]",
  },
  {
    name: "Account",
    href: "/user",
    description: "[4]",
  },
  {
    name: "Login",
    href: "/login",
    description: "[7]",
  },
];

export const Skiper58 = () => {
  return (
    <ul className="bs flex min-h-full w-full flex-1 flex-col items-center justify-center gap-1.5 rounded-2xl px-7 py-3 backdrop-blur-sm">
      {navigationItems.map((item, index) => (
        <li
          className="relative flex cursor-pointer flex-col items-center overflow-visible"
          key={index}
        >
          <div className="relative flex items-start">
            <TextRoll
              center
              className="text-4xl font-extrabold uppercase leading-[0.8] tracking-[-0.03em] transition-colors lg:text-5xl"
            >
              {item.name}
            </TextRoll>
          </div>
        </li>
      ))}
    </ul>
  );
};

const AnimatedLetterVertical: React.FC<{ l: string; autoTriggerDelays?: number[] }> = ({ l, autoTriggerDelays }) => {
  const controls = useAnimation();
  const isPlayingRef = React.useRef(false);

  const triggerAnimation = async () => {
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;
    await controls.start("hovered");
    controls.set("initial");
    isPlayingRef.current = false;
  };

  React.useEffect(() => {
    if (autoTriggerDelays && autoTriggerDelays.length > 0) {
      const timeouts = autoTriggerDelays.map(delay =>
        setTimeout(() => {
          triggerAnimation();
        }, delay * 1000)
      );
      return () => timeouts.forEach(clearTimeout);
    }
  }, [autoTriggerDelays]);

  return (
    <motion.span
      onMouseEnter={triggerAnimation}
      className="relative block overflow-hidden"
      style={{ lineHeight: 1.2 }}
    >
      <motion.span
        variants={{
          initial: { y: 0, opacity: 1 },
          hovered: { y: "-120%", opacity: 0 },
        }}
        initial="initial"
        animate={controls}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="inline-block whitespace-pre"
      >
        {l === " " ? "\u00A0" : l}
      </motion.span>
      <motion.span
        variants={{
          initial: { y: "120%", opacity: 0 },
          hovered: { y: 0, opacity: 1 },
        }}
        initial="initial"
        animate={controls}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 inline-block whitespace-pre"
      >
        {l === " " ? "\u00A0" : l}
      </motion.span>
    </motion.span>
  );
};

const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
  triggerIntro?: boolean;
  introDelay?: number;
  style?: React.CSSProperties;
}> = ({ children, className, center = false, triggerIntro = false, introDelay = 0, style }) => {
  const chars = children.split("");
  return (
    <span
      className={cn("relative flex overflow-hidden cursor-default", className)}
      style={style}
    >
      {chars.map((l, i) => {
        let delays: number[] | undefined = undefined;
        if (triggerIntro) {
          const charDelay = center
            ? introDelay + Math.abs(i - (chars.length - 1) / 2) * 0.05
            : introDelay + i * 0.05;
          delays = [charDelay];
        }
        return <AnimatedLetterVertical key={i} l={l} autoTriggerDelays={delays} />;
      })}
    </span>
  );
};

const AnimatedLetter: React.FC<{ l: string; autoTriggerDelays?: number[] }> = ({ l, autoTriggerDelays }) => {
  const controls = useAnimation();
  const isPlayingRef = React.useRef(false);

  const triggerAnimation = async () => {
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;
    await controls.start("hovered");
    controls.set("initial");
    isPlayingRef.current = false;
  };

  React.useEffect(() => {
    if (autoTriggerDelays && autoTriggerDelays.length > 0) {
      const timeouts = autoTriggerDelays.map(delay =>
        setTimeout(() => {
          triggerAnimation();
        }, delay * 1000)
      );
      return () => timeouts.forEach(clearTimeout);
    }
  }, [autoTriggerDelays]);

  return (
    <motion.span
      onMouseEnter={triggerAnimation}
      className="relative flex overflow-hidden"
    >
      <motion.span
        variants={{
          initial: { x: 0 },
          hovered: { x: "-100%" },
        }}
        initial="initial"
        animate={controls}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        className="inline-block whitespace-pre"
      >
        {l === " " ? "\u00A0" : l}
      </motion.span>
      <motion.span
        variants={{
          initial: { x: "100%" },
          hovered: { x: 0 },
        }}
        initial="initial"
        animate={controls}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 inline-block whitespace-pre"
      >
        {l === " " ? "\u00A0" : l}
      </motion.span>
    </motion.span>
  );
};

const TextRollHorizontal: React.FC<{
  children: string;
  className?: string;
  triggerIntro?: boolean;
  introDelay?: number;
  initialIndex?: number;
}> = ({ children, className, triggerIntro = false, introDelay = 1.0, initialIndex = 0 }) => {
  const chars = children.split("");
  return (
    <span
      className={cn("relative flex overflow-hidden cursor-default", className)}
    >
      {chars.map((l, i) => {
        let delays: number[] | undefined = undefined;
        if (triggerIntro) {
          // Sweep 1: Left to Right (Start to End)
          const delay1 = introDelay + (i + initialIndex) * 0.05;
          delays = [delay1];
        }
        return <AnimatedLetter key={i} l={l} autoTriggerDelays={delays} />;
      })}
    </span>
  );
};

export { TextRoll, TextRollHorizontal };
