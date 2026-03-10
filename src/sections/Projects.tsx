"use client";
import {FC, useEffect, useRef} from "react";
import image1 from "@/src/assets/images/prakash-portfolio.png";
import image2 from "@/src/assets/images/converso-thumbnail.png";
import image3 from "@/src/assets/images/only-students.png";
import image4 from "@/src/assets/images/esperanza-thumbnail.png";
import image5 from "@/src/assets/images/skillclear-thumbnail.png";
import image6 from "@/src/assets/images/seo-speeder.png";
import Image from "next/image";
import gsap from "gsap";

// Updated projects array with websiteUrl property
const projects = [
    {
        name: "Prakash - Portfolio",
        image: image1,
        websiteUrl: "https://siva-prakash-portfolio.vercel.app/", // Replace with actual URL
    },
    {
        name: "Converso",
        image: image2,
        websiteUrl: "https://converso-learn.vercel.app/", // Replace with actual URL
    },
    {
        name: "Only Students",
        image: image3,
        websiteUrl: "https://only-student.vercel.app/", // Replace with actual URL
    },
    {
        name: "Esperanza",
        image: image4,
        websiteUrl: "https://esperanza2k26.vercel.app/", // Replace with actual URL
    },
    {
        name: "Skill Clear",
        image: image5,
        websiteUrl: "https://skillclear.vercel.app/", // Replace with actual URL
    },
    {
        name: "Seo Speeder",
        image: image6,
        websiteUrl: "https://seospeeder.vercel.app/", // Replace with actual URL
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
        <section className="section" id='projects' ref={root}>
            <div className="container projects">
                <h2 className="text-4xl font-medium md:text-7xl lg:text-8xl">Signature Pieces</h2>
                <div className="mt-10 md:mt-16 lg:mt-20">
                    {projects.map(({name, image, websiteUrl}) => (
                        <a
                            href={websiteUrl}
                            key={name}
                            className="project border-t last:border-b border-stone-400 border-dotted py-6 md:py-8 lg:py-10 flex flex-col relative group/project"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div
                                className='absolute bottom-0 left-0 w-full h-0 group-hover/project:h-full transition-all duration-700 bg-stone-300'>
                            </div>
                            <div className='relative'>
                                <div className="aspect-video md:hidden">
                                    <Image
                                        src={image}
                                        alt={`${name} image`}
                                        className="size-full object-cover"
                                    />
                                </div>
                                <div
                                    className="mt-8 md:mt-0 flex justify-between items-center md:grid md:[grid-template-columns:1fr_300px_max-content] md:gap-8">
                                    <div className='lg:group-hover/project:pl-8 transition-all duration-700'>
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl">{name}</h3>
                                    </div>
                                    <div className='relative'>
                                        {/* Desktop image placeholder (animated by GSAP floating thumbnail) */}
                                        <div className='absolute aspect-video w-full top-1/2 -translate-y-1/2 opacity-0 pointer-events-none z-10'>
                                            <Image
                                                src={image}
                                                alt={`${name} image`}
                                                className="size-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className='lg:group-hover/project:pr-8 transition-all duration-700'>
                                        <div className='size-6 overflow-hidden'>
                                            <div
                                                className='h-6 w-12 flex group-hover/project:-translate-x-1/2 transition-transform duration-300'>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                                                    />
                                                </svg>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* GSAP Floating Preview Wrapper */}
                <div className="project-thumbnail fixed z-50 pointer-events-none top-0 left-0 aspect-video w-[300px] overflow-hidden opacity-0 hidden md:block">
                    <div className="flex flex-col h-full"> 
                        {projects.map(({name, image}) => (
                            <div className="thumbnail size-full shrink-0" key={name}>
                                <Image
                                    src={image}
                                    alt={`${name} image`}
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
