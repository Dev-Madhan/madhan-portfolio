import { FC } from "react";
import image1 from "@/src/assets/images/renzo-cruz.png";
import image2 from "@/src/assets/images/nestleap.jpg";
import image3 from "@/src/assets/images/cafe.jpg";
import image4 from "@/src/assets/images/fuseflux.jpg";
import image5 from "@/src/assets/images/pattio.jpg";
import image6 from "@/src/assets/images/vivid-lux.jpg";
import Image from "next/image";

// Updated projects array with websiteUrl property
const projects = [
  {
    name: "Renzo Cruz - Portfolio",
    image: image1,
    websiteUrl: "https://renzo-cruz.netlify.app/", // Replace with actual URL
  },
  {
    name: "Nestleap",
    image: image2,
    websiteUrl: "https://nestleap.netlify.app/", // Replace with actual URL
  },
  {
    name: "Cafe",
    image: image3,
    websiteUrl: "https://coffee-webpage-site.netlify.app/", // Replace with actual URL
  },
  {
    name: "FuseFlux",
    image: image4,
    websiteUrl: "https://fuseflux.netlify.app/", // Replace with actual URL
  },
  {
    name: "Pattio",
    image: image5,
    websiteUrl: "https://pattio.netlify.app/", // Replace with actual URL
  },
  {
    name: "VividLux",
    image: image6,
    websiteUrl: "https://vividlux.netlify.app/", // Replace with actual URL
  },
];

const Projects: FC = () => {
  return (
      <section className="section" id='projects'>
        <div className="container">
          <h2 className="text-4xl font-medium md:text-7xl lg:text-8xl">Signature Pieces</h2>
          <div className="mt-10 md:mt-16 lg:mt-20">
            {projects.map(({ name, image, websiteUrl }) => (
                <a
                    href={websiteUrl} // Use the specific website URL
                    key={name}
                    className="border-t last:border-b border-stone-400 border-dotted py-6 md:py-8 lg:py-10 flex flex-col"
                    target="_blank" // Optional: Opens link in new tab
                    rel="noopener noreferrer" // Optional: Security for external links
                >
                  <div>
                    <div className="aspect-video md:hidden">
                      <Image
                          src={image}
                          alt={`${name} image`}
                          className="size-full object-cover"
                      />
                    </div>
                    <div className="mt-8 md:mt-0 flex justify-between items-center">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl">{name}</h3>
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
                </a>
            ))}
          </div>
        </div>
      </section>
  );
};

export default Projects;