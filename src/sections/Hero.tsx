"use client";

import { FC, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Bebas_Neue } from "next/font/google";
import { TextRollHorizontal, TextRoll } from "../components/ui/skiper-ui/skiper58";
import Signature from "../components/Signature";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const inter = { className: "font-sans" }; // Using tailwind default sans or importing if needed

const Hero: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRoleRef = useRef<HTMLDivElement>(null);
  const rightRoleRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const mobileNameRef = useRef<HTMLDivElement>(null);
  const mobileRole1Ref = useRef<HTMLDivElement>(null);
  const mobileRole2Ref = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const mobileLeftMetaRef = useRef<HTMLDivElement>(null);
  const mobileRightMetaRef = useRef<HTMLDivElement>(null);
  const [titleLeft, setTitleLeft] = useState(0);
  const [titleRight, setTitleRight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const gsapCtxRef = useRef<ReturnType<typeof gsap.context> | null>(null);

  useEffect(() => {
    const initGSAP = () => {
      const section = sectionRef.current;
      const leftEl = leftRoleRef.current;
      const rightEl = rightRoleRef.current;
      if (!section || !leftEl || !rightEl) return;

      const ctx = gsap.context(() => {
        // ─── PHASE 1: Roles join + video appears (first 100vh of scroll) ───
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: isMobile ? "+=200%" : "+=300%",
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        if (isMobile) {
          // ── Mobile Intro Sequence (Non-scroll triggered for entrance) ──
          const introTl = gsap.timeline();

          // Initial states - name centered, roles off-screen
          gsap.set(mobileNameRef.current, { y: "25vh" });
          gsap.set(mobileRole1Ref.current, { x: -50, opacity: 0 });
          gsap.set(mobileRole2Ref.current, { x: 50, opacity: 0 });
          gsap.set(mobileScrollRef.current, { opacity: 0, y: 40 });
          gsap.set(mobileLeftMetaRef.current, { opacity: 0, x: -20 });
          gsap.set(mobileRightMetaRef.current, { opacity: 0, x: 20 });

          // 1. Name slide up (after internal text roll)
          introTl.to(mobileNameRef.current, {
            y: 0,
            duration: 1.2,
            delay: 1.8,
            ease: "power4.inOut"
          });

          // 2. Roles slide in horizontally (After name settles at 3.0s)
          introTl.to(mobileRole1Ref.current, {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out"
          }, 3.2);

          introTl.to(mobileRole2Ref.current, {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out"
          }, 3.4);

          // 3. Scroll Down indicator - snappier slide up
          introTl.to(mobileScrollRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power4.out"
          }, 4.0); // Starts while roles are settling

          // 4. Side Meta Text Reveal
          introTl.to([mobileLeftMetaRef.current, mobileRightMetaRef.current], {
            opacity: 1,
            x: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out"
          }, 3.8);
        }

        // ── Roles slide inward (0 → 0.4 of timeline) ──
        tl.to(
          leftEl,
          {
            x: () => {
              const sectionRect = section.getBoundingClientRect();
              const centerX = sectionRect.left + sectionRect.width / 2;
              const widthDiff = leftEl.offsetWidth - rightEl.offsetWidth;
              const meetingPoint = centerX + widthDiff / 2;
              const gap = window.innerWidth * 0.01;
              return (meetingPoint - gap) - leftEl.getBoundingClientRect().right;
            },
            ease: "none",
          },
          0
        );

        tl.to(
          rightEl,
          {
            x: () => {
              const sectionRect = section.getBoundingClientRect();
              const centerX = sectionRect.left + sectionRect.width / 2;
              const widthDiff = leftEl.offsetWidth - rightEl.offsetWidth;
              const meetingPoint = centerX + widthDiff / 2;
              const gap = window.innerWidth * 0.01;
              return (meetingPoint + gap) - rightEl.getBoundingClientRect().left;
            },
            ease: "none",
          },
          0
        );


      }, section);

      gsapCtxRef.current = ctx;
    };

    initGSAP();

    // Measure the role offsets for bottom alignment
    const updateTitleLeft = () => {
      if (leftRoleRef.current) {
        setTitleLeft(leftRoleRef.current.getBoundingClientRect().left);
      }
      if (rightRoleRef.current) {
        setTitleRight(window.innerWidth - rightRoleRef.current.getBoundingClientRect().right);
      }
    };
    updateTitleLeft();
    window.addEventListener("resize", updateTitleLeft);

    // Refresh on font load
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
        updateTitleLeft();
      });
    }

    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
      updateTitleLeft();
    }, 800);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateTitleLeft);
      gsapCtxRef.current?.revert();
      gsapCtxRef.current = null;
    };
  }, [isMobile]);

  return (
    <div className="relative w-full">
      <section
        id="hero-section"
        ref={sectionRef}
        className="relative w-full min-h-screen md:h-screen bg-[#EAE8E3] dark:bg-[#0A0A0A] text-[#111111] dark:text-[#EAE8E3] flex flex-col items-center px-6 md:px-10 pb-12 md:pb-0 overflow-hidden"
      >
        {/* ── Hero name + role block ─────────────────────────────────── */}
        <div className="w-full pt-[10vh] md:pt-[16vh] flex flex-col items-center">
          {/* Wrapper to match the width of the main title exactly */}
          <div ref={titleWrapperRef} className="relative flex flex-col w-fit">
            {/* "MADHAN KUMAR" — centered, large */}
            {/* Desktop: "MADHAN KUMAR" — single line */}
            <motion.div
              className="hidden md:block"
              initial={{ y: "20vh" }}
              animate={{ y: 0 }}
              transition={{ delay: 2.0, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="flex justify-center relative items-center">
                <TextRollHorizontal
                  triggerIntro={true}
                  introDelay={0.4}
                  className={`${bebasNeue.className} uppercase text-[17vw] leading-[0.8] tracking-normal whitespace-nowrap`}
                >
                  MADHAN KUMAR
                </TextRollHorizontal>
              </h1>
            </motion.div>

            {/* Mobile View: Hero Text -> Signature -> Role */}
            <div className="flex md:hidden flex-col items-center">
              {/* 1. Hero Text (2 lines) - Starts center, moves top */}
              <div
                ref={mobileNameRef}
                className="flex flex-col items-center"
              >
                <div>
                  <h1 className={`${bebasNeue.className} uppercase text-[25vw] leading-[0.8] tracking-normal`}>
                    <TextRollHorizontal triggerIntro={true} introDelay={0.2}>
                      MADHAN
                    </TextRollHorizontal>
                  </h1>
                </div>
                <div>
                  <h1 className={`${bebasNeue.className} uppercase text-[25vw] leading-[0.8] tracking-normal`}>
                    <TextRollHorizontal triggerIntro={true} introDelay={0.6}>
                      KUMAR
                    </TextRollHorizontal>
                  </h1>
                </div>
              </div>

              {/* 2. Signature (Scroll Reveal) */}
              <div className="mt-[-4vh] mb-[-6vh]">
                <Signature isMobile={isMobile} />
              </div>

              {/* 3. Role (2 lines) - Pops from bottom */}
              <div className="flex flex-col items-center">
                <div ref={mobileRole1Ref}>
                  <h2 className={`${bebasNeue.className} uppercase text-[20vw] leading-[0.8] tracking-normal`}>
                    <TextRollHorizontal triggerIntro={true} introDelay={3.2}>
                      FullStack
                    </TextRollHorizontal>
                  </h2>
                </div>
                <div ref={mobileRole2Ref}>
                  <h2 className={`${bebasNeue.className} uppercase text-[20vw] leading-[0.8] tracking-normal`}>
                    <TextRollHorizontal triggerIntro={true} introDelay={3.6}>
                      Engineer
                    </TextRollHorizontal>
                  </h2>
                </div>
              </div>

              {/* 4. Scroll Down Indicator (Mobile Only) */}
              <div
                ref={mobileScrollRef}
                className="mt-16 mb-8 flex flex-col items-center"
              >
                <p className="font-sans uppercase text-[3vw] tracking-[0.4em] text-black dark:text-white font-medium">
                  Scroll Down
                </p>
              </div>

            </div>

            {/*
              Role row — "FULLSTACK" far-left, "ENGINEER" far-right
              GSAP slides them inward on scroll until they meet at center.
              The video sits in the gap between them, below the title.
            */}
            {/* Desktop Role Row */}
            <div className="hidden md:flex w-full justify-between items-baseline mt-4">
              {/* "FullStack" — left-aligned */}
              <div ref={leftRoleRef}>
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2
                    className={`${bebasNeue.className} uppercase text-[5.5vw] lg:text-[5vw] leading-[0.85] tracking-normal whitespace-nowrap`}
                  >
                    FullStack
                  </h2>
                </motion.div>
              </div>

              {/* "Engineer" — right-aligned */}
              <div ref={rightRoleRef}>
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2
                    className={`${bebasNeue.className} uppercase text-[5.5vw] lg:text-[5vw] leading-[0.85] tracking-normal whitespace-nowrap`}
                  >
                    Engineer
                  </h2>
                </motion.div>
              </div>
            </div>


          </div>
        </div>

        {/* ── Center: Signature (Desktop Only) ── */}
        <div className="hidden md:flex absolute top-[72%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full justify-center z-0 pointer-events-none">
          <Signature isMobile={false} />
        </div>

        {/* ── Bottom Left: Status ── */}
        {/* Left-aligned with the left edge of "FULLSTACK" */}
        <motion.div
          initial={{ opacity: 0, x: -50, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 3.0, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex absolute bottom-12 flex-col gap-1"
          style={{ left: titleLeft }}
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#111111]/40 dark:text-[#EAE8E3]/40">
            Availability
          </span>
          <span className={`${bebasNeue.className} text-3xl leading-none tracking-wide flex`}>
            <TextRoll>Open To Work</TextRoll>
          </span>
        </motion.div>

        {/* ── Bottom Center: Socials ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-1"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#111111]/40 dark:text-[#EAE8E3]/40">
            Socials
          </span>
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-xs font-medium uppercase tracking-[0.15em] flex">
              <TextRoll>Github</TextRoll>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs font-medium uppercase tracking-[0.15em] flex">
              <TextRoll>Instagram</TextRoll>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xs font-medium uppercase tracking-[0.15em] flex">
              <TextRoll>LinkedIn</TextRoll>
            </a>
          </div>
        </motion.div>

        {/* ── Bottom Right: View Projects ── */}
        {/* Right-aligned perfectly with the right edge of "ENGINEER" */}
        <motion.div
          initial={{ opacity: 0, x: 50, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 3.4, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex absolute bottom-12 flex-col items-end gap-1"
          style={{ right: titleRight }}
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#111111]/40 dark:text-[#EAE8E3]/40">
            Selected Works
          </span>
          <a href="#works" className={`${bebasNeue.className} text-3xl leading-none tracking-wide flex`}>
            <TextRoll>View Projects</TextRoll>
          </a>
        </motion.div>

        {/* ── Mobile Side Meta Text ─────────────────────────────────── */}
        <div
          ref={mobileLeftMetaRef}
          className="md:hidden absolute left-[-3vw] top-[45%] -translate-y-1/2 flex flex-col z-20 pointer-events-none"
        >
          <div className="h-[28vw] flex items-center justify-center">
            <TextRollHorizontal triggerIntro={true} introDelay={3.8} className="font-sans font-semibold uppercase text-[12px] tracking-[0.2em] -rotate-90 origin-center whitespace-nowrap text-black dark:text-[#EAE8E3]">LINKEDIN</TextRollHorizontal>
          </div>
          <div className="h-[28vw] flex items-center justify-center">
            <TextRollHorizontal triggerIntro={true} introDelay={4.0} className="font-sans font-semibold uppercase text-[12px] tracking-[0.2em] -rotate-90 origin-center whitespace-nowrap text-black dark:text-[#EAE8E3]">INSTAGRAM</TextRollHorizontal>
          </div>
          <div className="h-[28vw] flex items-center justify-center">
            <TextRollHorizontal triggerIntro={true} introDelay={4.2} className="font-sans font-semibold uppercase text-[12px] tracking-[0.2em] -rotate-90 origin-center whitespace-nowrap text-black dark:text-[#EAE8E3]">GITHUB</TextRollHorizontal>
          </div>
        </div>

        <div
          ref={mobileRightMetaRef}
          className="md:hidden absolute right-[-3vw] top-[45%] -translate-y-1/2 flex flex-col z-20 pointer-events-none"
        >
          <div className="h-[28vw] flex items-center justify-center">
            <TextRollHorizontal triggerIntro={true} introDelay={3.8} className="font-sans font-semibold uppercase text-[12px] tracking-[0.2em] rotate-90 origin-center whitespace-nowrap text-black dark:text-[#EAE8E3]">EXPLORE</TextRollHorizontal>
          </div>
          <div className="h-[28vw] flex items-center justify-center">
            <TextRollHorizontal triggerIntro={true} introDelay={4.0} className="font-sans font-semibold uppercase text-[12px] tracking-[0.2em] rotate-90 origin-center whitespace-nowrap text-black dark:text-[#EAE8E3]">MY</TextRollHorizontal>
          </div>
          <div className="h-[28vw] flex items-center justify-center">
            <TextRollHorizontal triggerIntro={true} introDelay={4.2} className="font-sans font-semibold uppercase text-[12px] tracking-[0.2em] rotate-90 origin-center whitespace-nowrap text-black dark:text-[#EAE8E3]">WORK</TextRollHorizontal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;