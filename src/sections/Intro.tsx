"use client";

import { FC, useEffect } from "react";
import { stagger, useAnimate, useInView } from "framer-motion";
import SplitType from "split-type";

const Intro: FC = () => {
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, {
    once: true,
    margin: "0px 0px -50px 0px", // Trigger animation slightly before fully in view
  });

  useEffect(() => {
    // Initialize SplitType on the <h2> element
    const h2Element = scope.current.querySelector("h2");
    if (h2Element) {
      const split = new SplitType(h2Element, {
        types: "lines,words",
        tagName: "span",
      });

      // Ensure initial styles are applied (optional, if not handled in CSS)
      const words = h2Element.querySelectorAll(".word") as NodeListOf<HTMLElement>;
      words.forEach((word: HTMLElement) => {
        word.style.transform = "translateY(100%)";
        word.style.opacity = "0";
      });

      // Cleanup: Revert SplitType changes on unmount
      return () => {
        split.revert();
      };
    }
  }, [scope]);

  useEffect(() => {
    if (inView) {
      // Animate words when in view
      const words = scope.current.querySelectorAll(".word") as NodeListOf<HTMLElement>;
      if (words.length > 0) {
        animate(
            words,
            {
              y: 0, // Animate to translateY(0)
              opacity: 1, // Fade in for smoother effect
            },
            {
              duration: 0.5,
              delay: stagger(0.2), // Reduced stagger for smoother flow
              ease: "easeOut",
            }
        );
      }
    }
  }, [inView, animate, scope]);

  return (
      <section
          className="section mt-12 md:mt-16 lg:mt-20"
          id="intro"
          ref={scope}
      >
        <div className="container">
          <h2 className="text-4xl md:text-7xl lg:text-8xl lg:w-[80%] font-medium">
            Designing striking websites with pristine code and insightful aesthetics
            to boost businesses online.
          </h2>
        </div>
      </section>
  );
};

export default Intro;