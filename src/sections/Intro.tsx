"use client";

import { FC, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const content = [
  { text: "Great digital experiences don't happen by accident. ", className: "text-[#111111] dark:text-[#EAE8E3]" },
  { text: "As a fullstack engineer, I handle both the visual design you see and the complex code you don't, bringing your ideas to life without the technical headaches. ", className: "text-[#111111]/60 dark:text-[#EAE8E3]/60" },
  { text: "I don't just build websites. I build experiences that people actually remember.", className: "text-red-orange-500" }
];

const Intro: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  
  const inView = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const validWords = wordsRef.current.filter(Boolean);
      const validChars = charsRef.current.filter(Boolean);

      // Entrance animation: Slide up words
      if (inView && validWords.length > 0) {
        gsap.to(validWords, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          ease: "power4.out",
        });
      }

      // Scrub animation: Character opacity reveal
      if (validChars.length > 0) {
        gsap.set(validChars, { opacity: 0.2 });

        gsap.to(validChars, {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [inView]);

  let charCounter = 0;
  let wordCounter = 0;
  const renderData = content.map((part) => {
    const words = part.text.split(" ");
    return {
      className: part.className,
      words: words.map((word, wordIdx) => ({
        wordIndex: wordCounter++,
        chars: word.split("").map((char) => ({
          char,
          index: charCounter++
        })),
        isLast: wordIdx === words.length - 1
      }))
    };
  });

  return (
    <section
      className="section mt-12 md:mt-16 lg:mt-20 py-24 md:py-32"
      id="intro"
      ref={sectionRef}
    >
      <div className="container">
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tighter lg:w-[90%] xl:w-[80%] font-medium text-center mx-auto leading-tight">
          {renderData.map((part, partIdx) => (
            <span key={partIdx} className={part.className}>
              {part.words.map((wordObj) => (
                <span key={wordObj.wordIndex} className="inline-block">
                  <span className="inline-flex overflow-hidden">
                    <span
                      ref={(el) => {
                        wordsRef.current[wordObj.wordIndex] = el;
                      }}
                      className="inline-block translate-y-[100%] opacity-0"
                    >
                      {wordObj.chars.map((charObj) => (
                        <span
                          key={charObj.index}
                          ref={(el) => {
                            charsRef.current[charObj.index] = el;
                          }}
                        >
                          {charObj.char}
                        </span>
                      ))}
                    </span>
                  </span>
                  {!wordObj.isLast && <span className="inline-block">&nbsp;</span>}
                </span>
              ))}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
};

export default Intro;