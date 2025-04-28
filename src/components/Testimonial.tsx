import React, {HTMLAttributes, useEffect} from 'react';
import Image from 'next/image';
import {StaticImport} from 'next/dist/shared/lib/get-img-props';
import {twMerge} from 'tailwind-merge';
import {usePresence, AnimationPlaybackControls, motion} from 'framer-motion';

import useTextRevealAnimation from '@/src/hooks/useTextRevealAnimation';

// Define a type for AnimationPlaybackControls with a then method
interface AnimationPlaybackControlsWithThen extends AnimationPlaybackControls {
    then: (onfulfilled?: (() => void) | null, onrejected?: (() => void) | null) => Promise<void>;
}

// Define the return type for useTextRevealAnimation
interface TextRevealAnimation {
    scope: React.RefObject<HTMLDivElement>;
    entranceAnimation: () => AnimationPlaybackControlsWithThen | undefined;
    exitAnimation: () => AnimationPlaybackControlsWithThen | undefined;
}

const Testimonial = (props: {
    quote: string;
    name: string;
    role: string;
    company: string;
    imagePositionY: number;
    image: string | StaticImport;
    className?: string;
} & HTMLAttributes<HTMLDivElement>) => {
    const {quote, name, role, company, imagePositionY, image, className, ...rest} = props;

    const {scope: quoteScope, entranceAnimation: quoteEntranceAnimation, exitAnimation: quoteExitAnimation} =
        useTextRevealAnimation() as TextRevealAnimation;

    const {
        scope: citeScope,
        entranceAnimation: citeEntranceAnimation,
        exitAnimation: citeExitAnimation
    } = useTextRevealAnimation() as TextRevealAnimation;

    const [isPresent, safeToRemove] = usePresence();

    useEffect(() => {
        if (isPresent) {
            const animation = quoteEntranceAnimation();
            animation?.then(() => {
                citeEntranceAnimation();
            });
        } else {
            Promise.all([
                quoteExitAnimation(),
                citeExitAnimation(),
            ]).then(() => {
                safeToRemove?.();
            });
        }
    }, [isPresent, quoteEntranceAnimation, quoteExitAnimation, citeEntranceAnimation, citeExitAnimation, safeToRemove]);

    return (
        <div className={twMerge('grid md:grid-cols-5 md:gap-8 lg:gap-16 md:items-center', className)} {...rest}>
            <div className="aspect-square md:col-span-2 md:aspect-[9/16] relative">
                <motion.div className='absolute h-full bg-gray-green-900'
                            initial={{ width: '100%' }}
                            animate={{ width: 0 }}
                            exit={{ width: '100%' }}
                            transition={{ duration: 0.5 }}
                >

                </motion.div>
                <Image
                    src={image}
                    alt={name}
                    className="size-full object-cover"
                    style={{
                        objectPosition: `50% ${imagePositionY * 100}%`,
                    }}
                />
            </div>
            <blockquote className="md:col-span-3">
                <div className="text-3xl md:text-5xl lg:text-6xl mt-8 md:mt-0" ref={quoteScope}>
                    <span>“</span>
                    {quote}
                    <span>”</span>
                </div>
                <cite className="mt-4 md:mt-8 not-italic block md:text-lg lg:text-xl" ref={citeScope}>
                    {name}, {role} of {company}
                </cite>
            </blockquote>
        </div>
    );
};

export default Testimonial;