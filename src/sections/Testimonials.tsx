"use client";

import { FC, useRef, useState } from "react";
import image1 from "@/src/assets/images/sahil.jpg";
import image2 from "@/src/assets/images/chiddesh.jpg";
import image3 from "@/src/assets/images/prakash.jpg";
import image4 from "@/src/assets/images/saji.jpg";
import { AnimatePresence, motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Testimonial from "@/src/components/Testimonial";

const testimonials = [
    {
        name: "Sahil Ahamed",
        company: "SRM Institute of Technology",
        role: "Film Student ",
        quote:
            "Madhan's proficiency in technical coding and creative design crafted a stunning, efficient website.",
        image: image1,
        imagePositionY: 0.65,
    },
    {
        name: "Chiddesh Ram",
        company: "Easwari Engineering College",
        role: "Computer Science Student ",
        quote:
            "Madhan brilliantly transformed our Digital Marketing website with a design that proudly fuses stunning elegance and exceptional efficiency.",
        image: image2,
        imagePositionY: 0.75,
    },
    {
        name: "Prakash Barathan",
        company: "Genetins Creative, Cybernetron Ltd, SEO Speeder",
        role: "Director ",
        quote:
            "The collaboration was phenomenal. Madhan delivered abundant unique insights and ingenious solutions.",
        image: image3,
        imagePositionY: 0.75,
    },
    {
        name: "Sajith Ahamed",
        company: "South Indian Film Industry",
        role: "Rising Music director",
        quote:
            "Madhan's expertise in technical development and design resulted in a stunning, high-performing website.",
        image: image4,
        imagePositionY: 0.40,
    },
];

const Testimonials: FC = () => {
    const titleRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: titleRef,
        offset: ["start end", "end start"],
    });

    const transformTop: MotionValue<string> = useTransform(
        scrollYProgress,
        [0, 1],
        ["translateX(0%)", "translateX(15%)"]
    );
    const transformBottom: MotionValue<string> = useTransform(
        scrollYProgress,
        [0, 1],
        ["translateX(0%)", "translateX(-15%)"]
    );
    const [testimonialIndex, setTestimonialIndex] = useState(0);

    const handleClickPrev = () => {
        setTestimonialIndex(curr => {
            if (curr === 0) {
                return testimonials.length - 1;
            }
            return curr - 1;
        });
    };

    const handleClickNext = () => {
        setTestimonialIndex(curr => {
            if (curr === testimonials.length - 1) return 0;
            return curr + 1;
        });
    };

    return (
        <section className="section" id="testimonials">
            <h2
                className="text-4xl md:text-7xl lg:text-8xl flex flex-col overflow-hidden tracking-tighter"
                ref={titleRef}
            >
                <motion.span
                    className="whitespace-nowrap"
                    style={{
                        transform: transformTop,
                    }}
                >
                    Fresh props from my former clients
                </motion.span>
                <motion.span
                    className="whitespace-nowrap self-end text-red-orange-500 font-medium"
                    style={{
                        transform: transformBottom,
                    }}
                >
                    Fresh props from my former clients
                </motion.span>
            </h2>
            <div className="container">
                <div className="mt-20">
                    <AnimatePresence mode="wait" initial={false}>
                        {testimonials.map(
                            ({ name, company, role, quote, image, imagePositionY }, index) =>
                                index === testimonialIndex && (
                                    <Testimonial
                                        company={company}
                                        image={image}
                                        imagePositionY={imagePositionY}
                                        name={name}
                                        quote={quote}
                                        role={role}
                                        key={name}
                                    />
                                )
                        )}
                    </AnimatePresence>
                </div>
                <div className="flex gap-4 mt-6 lg:mt-10">
                    <button
                        className="border border-stone-400 size-13 inline-flex rounded-full justify-center items-center font-medium cursor-pointer hover:bg-stone-800 hover:text-white hover:border-red-orange-500 transition-all duration-300"
                        onClick={handleClickPrev}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            stroke="currentColor"
                            className="size-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                            />
                        </svg>
                    </button>
                    <button
                        className="border border-stone-400 size-13 inline-flex rounded-full justify-center items-center font-medium cursor-pointer hover:bg-stone-800 hover:text-white hover:border-red-orange-500 transition-all duration-300"
                        onClick={handleClickNext}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            stroke="currentColor"
                            className="size-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;