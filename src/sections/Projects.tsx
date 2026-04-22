"use client";
import { FC, useEffect, useRef } from "react";
import image1 from "@/src/assets/images/prakash-portfolio.png";
import image2 from "@/src/assets/images/converso-thumbnail.png";
import image3 from "@/src/assets/images/only-students.png";
import image4 from "@/src/assets/images/esperanza-thumbnail.png";
import image5 from "@/src/assets/images/skillclear-thumbnail.png";
import image6 from "@/src/assets/images/seo-speeder.png";
import Image from "next/image";
import gsap from "gsap";

const projects = [
    {
        name: "Prakash — Portfolio",
        type: "Personal Portfolio",
        year: "2024",
        description: "Designed and built a cinematic personal portfolio for a film director — scroll-driven animations, dark editorial aesthetic.",
        tech: ["Next.js", "GSAP", "Tailwind CSS"],
        image: image1,
        websiteUrl: "https://siva-prakash-portfolio.vercel.app/",
    },
    {
        name: "Converso",
        type: "EdTech Platform",
        year: "2024",
        description: "Language-learning platform with real-time conversation practice, structured lesson flows, and progress tracking.",
        tech: ["React", "TypeScript", "Node.js"],
        image: image2,
        websiteUrl: "https://converso-learn.vercel.app/",
    },
    {
        name: "Only Students",
        type: "Community Platform",
        year: "2024",
        description: "Social platform exclusively for students — resource sharing, study groups, and peer networking built in.",
        tech: ["Next.js", "TypeScript", "Tailwind CSS"],
        image: image3,
        websiteUrl: "https://only-student.vercel.app/",
    },
    {
        name: "Esperanza",
        type: "Event & Cultural Website",
        year: "2026",
        description: "Visually immersive website for a college cultural fest — animated sections, event schedules, and team reveals.",
        tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
        image: image4,
        websiteUrl: "https://esperanza2k26.vercel.app/",
    },
    {
        name: "Skill Clear",
        type: "Career Prep Platform",
        year: "2025",
        description: "Structured skill-assessment and interview-prep platform built to help students break into tech roles faster.",
        tech: ["React", "TypeScript", "Tailwind CSS"],
        image: image5,
        websiteUrl: "https://skillclear.vercel.app/",
    },
    {
        name: "SEO Speeder",
        type: "SEO Agency Website",
        year: "2024",
        description: "High-conversion agency landing page optimised for speed, accessibility, and lead capture — built for results.",
        tech: ["Next.js", "GSAP", "TypeScript"],
        image: image6,
        websiteUrl: "https://seospeeder.vercel.app/",
    },
];

const Projects: FC = () => {
    const root = useRef<HTMLElement>(null);

    useEffect(() => {
        // Only run animations on devices larger than mobile (md: 768px+)
        if (window.innerWidth < 768) return;

        const ctx = gsap.context(() => {
            const projectThumbnail = root.current?.querySelector(".project-thumbnail");
            if (!projectThumbnail) return;

            // Initial state - setting opacity 1 here as it starts at 0 via tailwind to prevent flash
            gsap.set(projectThumbnail, { opacity: 1, scale: 0, xPercent: -50, yPercent: -50 });

            // Mouse-follow setup
            const xTo = gsap.quickTo(projectThumbnail, "x", { duration: 0.4, ease: "power3.out" });
            const yTo = gsap.quickTo(projectThumbnail, "y", { duration: 0.4, ease: "power3.out" });

            const projectsContainer = root.current?.querySelector(".projects");

            const handleMouseMove = (e: MouseEvent) => {
                xTo(e.clientX);
                yTo(e.clientY);
            };

            const handleMouseLeave = () => {
                gsap.to(projectThumbnail, {
                    scale: 0,
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            };

            projectsContainer?.addEventListener("mousemove", handleMouseMove as EventListener);
            projectsContainer?.addEventListener("mouseleave", handleMouseLeave as EventListener);

            // Hide on title hover
            const title = root.current?.querySelector("h2");
            title?.addEventListener("mouseenter", () => {
                gsap.to(projectThumbnail, {
                    scale: 0,
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            });

            // Item hover behavior
            const projectElements = gsap.utils.toArray<HTMLElement>(".project");
            projectElements.forEach((project, index) => {
                project.addEventListener("mouseenter", () => {
                    gsap.to(projectThumbnail, {
                        scale: 1,
                        duration: 0.4,
                        ease: "power2.out",
                        overwrite: "auto"
                    });

                    gsap.to(".thumbnail", {
                        yPercent: -100 * index,
                        duration: 0.4,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                });
            });
        }, root);

        return () => ctx.revert(); // Cleanup on unmount
    }, []);

    return (
        <section className="section" id="projects" ref={root}>
            <div className="container projects">

                {/* ── Section header ── */}
                <div className="flex items-end justify-between border-b border-stone-200 pb-8 md:pb-10 lg:pb-12">
                    <h2 className="text-4xl font-medium md:text-7xl lg:text-8xl">
                        My Projects
                    </h2>
                    <span className="hidden md:block text-[11px] uppercase tracking-[0.25em] text-stone-400 mb-1">
                        {projects.length} Works
                    </span>
                </div>

                {/* ── Project list ── */}
                <div>
                    {projects.map(({ name, type, year, description, tech, image, websiteUrl }, index) => (
                        <a
                            href={websiteUrl}
                            key={name}
                            className="project border-b border-stone-200 py-8 md:py-10 lg:py-12 flex flex-col relative group/project overflow-hidden"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {/* Dark inversion fill — rises from bottom */}
                            <div className="absolute bottom-0 left-0 w-full h-0 group-hover/project:h-full transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] bg-stone-950" />

                            <div className="relative">

                                {/* ── Mobile layout ── */}
                                <div className="md:hidden">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-stone-400">
                                            {type}
                                        </span>
                                        <span className="text-[10px] tracking-widest font-semibold text-stone-400 tabular-nums">
                                            {year}
                                        </span>
                                    </div>
                                    <div className="aspect-video overflow-hidden mb-5">
                                        <Image
                                            src={image}
                                            alt={`${name} screenshot`}
                                            className="size-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-medium text-stone-900">{name}</h3>
                                    <p className="mt-2 text-sm text-stone-500 leading-relaxed">
                                        {description}
                                    </p>
                                    <div className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-1">
                                        {tech.map((t, i) => (
                                            <span key={t} className="flex items-center text-[10px] uppercase tracking-[0.18em] font-semibold text-stone-400">
                                                {i > 0 && <span className="mr-1 text-stone-300">·</span>}
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* ── Desktop layout ── */}
                                <div className="hidden md:grid md:[grid-template-columns:56px_1fr_300px_auto] md:gap-x-10 lg:gap-x-12 items-center md:group-hover/project:px-6 lg:group-hover/project:px-8 transition-all duration-700">

                                    {/* Index number */}
                                    <span className="text-sm font-normal text-stone-400 group-hover/project:text-stone-500 transition-colors duration-700 tabular-nums self-start pt-1">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    {/* Content column */}
                                    <div className="lg:group-hover/project:pl-6 transition-all duration-700">
                                        <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-stone-400 group-hover/project:text-stone-500 transition-colors duration-700 mb-2">
                                            {type}
                                        </p>
                                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-stone-900 group-hover/project:text-white transition-colors duration-500">
                                            {name}
                                        </h3>

                                        {/* Description — slides up on hover */}
                                        <div className="overflow-hidden">
                                            <p className="text-sm text-stone-500 group-hover/project:text-stone-400 mt-3 max-w-lg leading-relaxed translate-y-5 opacity-0 group-hover/project:translate-y-0 group-hover/project:opacity-100 transition-all duration-500">
                                                {description}
                                            </p>
                                        </div>

                                        {/* Tech stack — dot-separated, no pills */}
                                        <div className="flex items-center flex-wrap mt-2 translate-y-4 opacity-0 group-hover/project:translate-y-0 group-hover/project:opacity-100 transition-all duration-500 delay-75">
                                            {tech.map((t, i) => (
                                                <span key={t} className="flex items-center text-[10px] uppercase tracking-[0.2em] font-semibold text-stone-400 group-hover/project:text-stone-500 transition-colors duration-500">
                                                    {i > 0 && <span className="mx-2 text-stone-600">·</span>}
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* GSAP phantom column — invisible spacer for the floating thumbnail */}
                                    <div className="relative">
                                        <div className="absolute aspect-video w-full top-1/2 -translate-y-1/2 opacity-0 pointer-events-none z-10">
                                            <Image
                                                src={image}
                                                alt={`${name} screenshot`}
                                                className="size-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Year + arrow */}
                                    <div className="lg:group-hover/project:pr-6 transition-all duration-700 flex flex-col items-end gap-4 self-center text-stone-900 group-hover/project:text-white">
                                        <span className="text-[10px] tracking-[0.2em] tabular-nums font-semibold text-stone-400 group-hover/project:text-stone-500 transition-colors duration-500">
                                            {year}
                                        </span>
                                        <div className="size-6 overflow-hidden">
                                            <div className="h-6 w-12 flex group-hover/project:-translate-x-1/2 transition-transform duration-300">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                                </svg>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* ── GSAP Floating Preview Wrapper (untouched) ── */}
                <div className="project-thumbnail fixed z-50 pointer-events-none top-0 left-0 aspect-video w-[300px] overflow-hidden opacity-0 hidden md:block">
                    <div className="flex flex-col h-full">
                        {projects.map(({ name, image }) => (
                            <div className="thumbnail size-full shrink-0" key={name}>
                                <Image
                                    src={image}
                                    alt={`${name} screenshot`}
                                    className="size-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Projects;
