import {FC} from "react";
import image1 from "@/src/assets/images/renzo-cruz.png";
import image2 from "@/src/assets/images/Converso - Thumbnail.png";
import image3 from "@/src/assets/images/nestleap.jpg";
import image4 from "@/src/assets/images/cafe.jpg";
import image5 from "@/src/assets/images/fuseflux.jpg";
import image6 from "@/src/assets/images/pattio.jpg";
import Image from "next/image";

// Updated projects array with websiteUrl property
const projects = [
    {
        name: "Renzo Cruz - Portfolio",
        image: image1,
        websiteUrl: "https://renzo-cruz.netlify.app/", // Replace with actual URL
    },
    {
        name: "Converso - SAAS Application",
        image: image2,
        websiteUrl: "https://converso-learn.vercel.app/", // Replace with actual URL
    },
    {
        name: "Nestleap",
        image: image3,
        websiteUrl: "https://nestleap.netlify.app/", // Replace with actual URL
    },
    {
        name: "Cafe",
        image: image4,
        websiteUrl: "https://coffee-webpage-site.netlify.app/", // Replace with actual URL
    },
    {
        name: "FuseFlux",
        image: image5,
        websiteUrl: "https://fuseflux.netlify.app/", // Replace with actual URL
    },
    {
        name: "Pattio",
        image: image6,
        websiteUrl: "https://pattio.netlify.app/", // Replace with actual URL
    },
];

const Projects: FC = () => {
    return (
        <section className="section" id='projects'>
            <div className="container">
                <h2 className="text-4xl font-medium md:text-7xl lg:text-8xl">Signature Pieces</h2>
                <div className="mt-10 md:mt-16 lg:mt-20">
                    {projects.map(({name, image, websiteUrl}) => (
                        <a
                            href={websiteUrl} // Use the specific website URL
                            key={name}
                            className="border-t last:border-b border-stone-400 border-dotted py-6 md:py-8 lg:py-10 flex flex-col relative group/project"
                            target="_blank" // Optional: Opens link in new tab
                            rel="noopener noreferrer" // Optional: Security for external links
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
                                        <div
                                            className='absolute aspect-video w-full top-1/2 -translate-y-1/2 opacity-0 scale-90 group-hover/project:opacity-100 group-hover/project:scale-100 lg:group-hover/project:scale-110 transition-all duration-500 z-10'>
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
            </div>
        </section>
    );
};

export default Projects;