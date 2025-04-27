import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const Button = (props: {
    variant: 'primary' | 'secondary' | 'text';
    iconAfter?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { className, children, variant, iconAfter, ...rest } = props;
    return (
        <button
            className={twMerge(
                'h-11 px-6 rounded-xl border border-red-orange-500 uppercase inline-flex items-center gap-2 font-medium relative transition duration-500 group/button',
                variant === 'primary' && 'bg-red-orange-500 text-white',
                variant === 'secondary' && 'bg-transparent hover:bg-stone-700 hover:text-white',
                variant === 'text' &&
                'h-auto px-2 !border-transparent  after:content-[""] after:h-px after:w-0 after:absolute after:left-0 after:bottom-0 after:bg-stone-700 hover:after:w-full after:transition-all after:duration-500 after:ease-in-out',
                className
            )}
            {...rest}
        >
            <span className="relative ">{children}</span>
            {iconAfter && <span className="relative ">{iconAfter}</span>}
        </button>
    );
};

export default Button;