import Header from "@/src/sections/Header";
import Hero from "@/src/sections/Hero";
import Intro from "@/src/sections/Intro";
import TechStack from "@/src/sections/TechStack";
import Projects from "@/src/sections/Projects";
import Testimonials from "@/src/sections/Testimonials";
import FAQs from "@/src/sections/FAQs";
import Footer from "@/src/sections/Footer";

export default function Home() {
    return (
        <>
            <Header/>
            <Hero/>
            <Intro/>
            <TechStack/>
            <Projects/>
            <Testimonials/>
            <FAQs/>
            <Footer/>
        </>
    );
}