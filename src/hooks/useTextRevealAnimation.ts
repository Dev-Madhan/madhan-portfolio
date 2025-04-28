import { useEffect } from "react";
import SplitType from "split-type";
import { stagger, useAnimate } from "framer-motion";

const useTextRevealAnimation = () => {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        if (!scope.current) return;

        const split = new SplitType(scope.current, {
            types: "lines,words",
            tagName: "span",
        });

        // Apply initial styles to .word elements (fallback if CSS is missing)
        const words = scope.current.querySelectorAll(".word") as NodeListOf<HTMLElement>;
        words.forEach((word) => {
            word.style.transform = "translateY(100%)";
            word.style.opacity = "0";
        });

        // Cleanup: Revert SplitType changes on unmount
        return () => split.revert();
    }, [scope]);

    const entranceAnimation = () => {
        const words = scope.current?.querySelectorAll(".word") as NodeListOf<HTMLElement>;
        if (words?.length) {
            return animate(
                words,
                { y: 0, opacity: 1 },
                { duration: 0.5, delay: stagger(0.15), ease: "easeOut" }
            );
        }
    };

    const exitAnimation = () => {
        const words = scope.current?.querySelectorAll(".word") as NodeListOf<HTMLElement>;
        if (words?.length) {
            return animate(
                words,
                { y: "100%", opacity: 0 },
                { duration: 0.3, delay: stagger(0.025, { from: "last" }), ease: "easeIn" }
            );
        }
    };

    return { scope, entranceAnimation, exitAnimation };
};

export default useTextRevealAnimation;