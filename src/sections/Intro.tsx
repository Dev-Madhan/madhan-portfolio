"use client";

import {FC, useEffect, useRef} from "react";
import { useInView } from "framer-motion";
import useTextRevealAnimation from "@/src/hooks/useTextRevealAnimation";

const Intro: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const {scope, entranceAnimation} = useTextRevealAnimation();

  const inView = useInView(scope, {
    once: true,
    margin: "0px 0px -50px 0px", // Trigger animation slightly before fully in view
  });

  useEffect(() => {
    if (inView){
      entranceAnimation();
    }
  }, [inView, entranceAnimation]);

  return (
      <section
          className="section mt-12 md:mt-16 lg:mt-20"
          id="intro"
          ref={sectionRef}
      >
        <div className="container">
          <h2 className="text-4xl md:text-7xl lg:text-8xl lg:w-[80%] font-medium" ref={scope}>
            Designing striking websites with pristine code and insightful aesthetics
            to boost businesses online.
          </h2>
        </div>
      </section>
  );
};

export default Intro;