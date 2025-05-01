"use client";

import { FC, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { twMerge } from "tailwind-merge";

// Preprocess the text into words
const text =
    "An aspiring Front-End Web Developer with a creative mindset and strong problem-solving skills, dedicated to building visually appealing, user-friendly websites that deliver maximum value to clients.";
const words = text.split(" ");

const Intro: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTarget = useRef<HTMLDivElement>(null);
  const [currentWord, setCurrentWord] = useState(0);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ["start end", "end end"],
  });

  // Map scroll progress to word index
  const wordIndex = useTransform(scrollYProgress, [0, 1], [0, words.length]);

  // Update currentWord based on wordIndex changes
  useMotionValueEvent(wordIndex, "change", (latest) => {
    setCurrentWord(Math.floor(latest));
  });

  // Debug scroll progress (conditionally log in development)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (process.env.NODE_ENV !== "production") {
      console.log("scrollYProgress", latest);
    }
  });

  return (
      <section
          className="section mt-12 md:mt-20 lg:mt-24"
          id="intro"
          ref={sectionRef}
      >
        <div className="container">
          <div className="sticky top-4 md:top-20">
            <h2
                className="text-4xl md:text-7xl lg:text-8xl lg:w-[80%] font-medium max-w-full"
                aria-label={text}
            >
            <span className="text-black/30" aria-live="polite">
              {words.map((word, index) => (
                  <span
                      key={index}
                      className={twMerge(
                          "transition duration-800",
                          index < currentWord && "text-black"
                      )}
                  >
                  {`${word} `}
                </span>
              ))}
            </span>
            </h2>
          </div>
          <div className="h-[60vh] md:h-[120vh]" ref={scrollTarget}></div>
        </div>
      </section>
  );
};

export default Intro;