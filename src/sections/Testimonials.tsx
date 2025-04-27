import {FC} from "react";
import image1 from "@/src/assets/images/sahil.jpg";
import image2 from "@/src/assets/images/chiddesh.jpg";
import image3 from "@/src/assets/images/prakash.jpg";
import image4 from "@/src/assets/images/saji.jpg";
import Image from "next/image";

/* eslint-disable-nextLine @typescript-eslint/no-unused-vars */
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
        imagePositionY: 0.75,
    },
];

const Testimonials: FC = () => {
    const testimonialIndex = 0;
    return (
        <section className='section' id='testimonials'>
            <h2 className='text-4xl md:text-7xl lg:text-8xl flex flex-col overflow-hidden'>
                <span className='whitespace-nowrap'>Fresh props from my former clients</span>
                <span
                    className='whitespace-nowrap self-end text-red-orange-500 font-medium'>Fresh props from my former clients</span>
            </h2>
            <div className='container'>
                <div className='mt-20'>
                    {testimonials.map(({
                                           name,
                                           company,
                                           role,
                                           quote,
                                           image,
                                           imagePositionY
                                       }, index) => index === testimonialIndex && (
                        <div key={name} className='grid md:grid-cols-5 md:gap-8 lg:gap-16 md:items-center'>
                            <div className='aspect-square md:col-span-2 md:aspect-[9/16]'>
                                <Image src={image} alt={name} className='size-full object-cover' style={{
                                    objectPosition: `50% ${imagePositionY * 100}%`
                                }}
                                />
                            </div>
                            <blockquote className='md:col-span-3'>
                                <div className='text-3xl md:text-5xl lg:text-6xl mt-8 md:mt-0'>
                                    <span>&ldquo;</span>
                                    <span>{quote}</span>
                                    <span>&rdquo;</span>
                                </div>
                                <cite
                                    className='mt-4 md:mt-8 not-italic block md:text-lg lg:text-xl'>{name}, {role} of {company}</cite>
                            </blockquote>
                        </div>
                    ))}
                </div>
                <div className='flex gap-4 mt-6 lg:mt-10'>
                    <button
                        className='border border-stone-400 size-13 inline-flex rounded-full justify-center items-center font-medium'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5"
                             stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
                        </svg>
                    </button>
                    <button
                        className='border border-stone-400 size-13 inline-flex rounded-full justify-center items-center font-medium'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5"
                             stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
