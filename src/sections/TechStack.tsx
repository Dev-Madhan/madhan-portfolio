"use client";

import { FC, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiGreensock,
    SiFramer,
    SiTailwindcss,
    SiNodedotjs,
    SiGithub,
} from "react-icons/si";

const tools = [
    {
        name: "React",
        category: "UI Library",
        description: "Building component-driven, reactive interfaces",
        icon: <SiReact className="size-7" />,
    },
    {
        name: "Next.js",
        category: "Framework",
        description: "Full-stack React apps with SSR & file-based routing",
        icon: <SiNextdotjs className="size-7" />,
    },
    {
        name: "TypeScript",
        category: "Language",
        description: "Type-safe JavaScript for production-grade code",
        icon: <SiTypescript className="size-7" />,
    },
    {
        name: "GSAP",
        category: "Animation",
        description: "High-performance scroll & timeline animations",
        icon: <SiGreensock className="size-7" />,
    },
    {
        name: "Framer Motion",
        category: "Animation",
        description: "Declarative animations & gesture-based interactions",
        icon: <SiFramer className="size-7" />,
    },
    {
        name: "Tailwind CSS",
        category: "Styling",
        description: "Utility-first styling for fast, consistent UI",
        icon: <SiTailwindcss className="size-7" />,
    },
    {
        name: "Node.js",
        category: "Backend",
        description: "Server-side JavaScript for APIs and tooling",
        icon: <SiNodedotjs className="size-7" />,
    },
    {
        name: "Git & GitHub",
        category: "Version Control",
        description: "Source control, CI/CD, and collaborative workflows",
        icon: <SiGithub className="size-7" />,
    },
];

const TechStack: FC = () => {
    const root        = useRef<HTMLElement>(null);
    const labelRef    = useRef<HTMLParagraphElement>(null);
    const headingRef  = useRef<HTMLHeadingElement>(null);
    const descRef     = useRef<HTMLParagraphElement>(null);
    const gridRef     = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let split: SplitType | null = null;

        const ctx = gsap.context(() => {
            // ── 1. Split heading into individual characters ──
            split = new SplitType(headingRef.current!, {
                types: "chars",
                tagName: "span",
            });

            // Set initial hidden states immediately to prevent flash on refresh
            gsap.set(labelRef.current, { y: 16, opacity: 0 });
            gsap.set(split.chars, { y: "120%", opacity: 0 });
            gsap.set(descRef.current, { y: 28, opacity: 0 });
            const cards = gsap.utils.toArray<HTMLElement>(".tech-card", gridRef.current);
            gsap.set(cards, { y: 56, opacity: 0 });

            // ── 2. Master timeline triggered by section entering viewport ──
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: root.current,
                    start: "top 78%",
                    once: true,
                },
            });

            // Step 1 — Label fades up
            tl.to(labelRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
            });

            // Step 2 — Heading chars sweep up from below (letterpress)
            tl.to(split.chars, {
                y: "0%",
                opacity: 1,
                duration: 0.75,
                stagger: 0.028,
                ease: "power4.out",
            }, "-=0.2");

            // Step 3 — Description slides up
            tl.to(descRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
            }, "-=0.45");

            // Step 4 — Cards wipe in from bottom, staggered row by row
            tl.to(cards, {
                y: 0,
                opacity: 1,
                duration: 0.65,
                stagger: { each: 0.08, from: "start" },
                ease: "power3.out",
            }, "-=0.2");
        }, root);

        return () => {
            ctx.revert();
            split?.revert();
        };
    }, []);

    return (
        <section className="section" id="tech-stack" ref={root}>
            <div className="container">

                {/* ── Header ── */}
                <div>
                    <p
                        ref={labelRef}
                        className="uppercase tracking-widest text-xs font-semibold text-stone-500 mb-3"
                    >
                        Skills &amp; Technologies
                    </p>

                    {/* overflow-hidden clips chars during y sweep */}
                    <div className="overflow-hidden">
                        <h2
                            ref={headingRef}
                            className="text-4xl md:text-7xl lg:text-8xl font-medium"
                        >
                            What I Know
                        </h2>
                    </div>

                    <p
                        ref={descRef}
                        className="mt-4 text-stone-500 text-base md:text-lg max-w-xl"
                    >
                        Technologies I&apos;ve mastered and actively use to design, build, and
                        ship production-ready products.
                    </p>
                </div>

                {/* ── Grid ── */}
                <div
                    ref={gridRef}
                    className="mt-12 md:mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-stone-200"
                >
                    {tools.map(({ name, category, description, icon }) => (
                        <div
                            key={name}
                            className="tech-card group bg-white hover:bg-stone-950 transition-colors duration-500 p-6 md:p-8 flex flex-col gap-4 cursor-default"
                        >
                            {/* Icon */}
                            <div className="text-stone-800 group-hover:text-white transition-colors duration-500">
                                {icon}
                            </div>

                            {/* Name + Category */}
                            <div>
                                <p className="text-xs uppercase tracking-widest font-semibold text-stone-400 group-hover:text-stone-500 transition-colors duration-500 mb-1">
                                    {category}
                                </p>
                                <h3 className="text-xl md:text-2xl font-semibold text-stone-900 group-hover:text-white transition-colors duration-500">
                                    {name}
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-stone-500 group-hover:text-stone-300 transition-colors duration-500 leading-relaxed mt-auto">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TechStack;
