import Header from "@/src/sections/Header";
import Hero from "@/src/sections/Hero";
import Intro from "@/src/sections/Intro";
import Projects from "@/src/sections/Projects";
import Testimonials from "@/src/sections/Testimonials";

export default function Home() {
    return (
        <>
            <Header/>
            <Hero/>
            <Intro/>
            <Projects/>
            <Testimonials/>
        </>
    );
}