import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
    variant: 'primary' | 'secondary' | 'text';
    iconAfter?: ReactNode;
    href?: string;
} & (
    | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
    | (AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
    );

const Button: React.FC<ButtonProps> = ({ className, children, variant, iconAfter, href, ...rest }) => {
    const baseClasses = twMerge(
        'h-11 px-6 rounded-xl border-red-orange-500 uppercase inline-flex items-center gap-2 font-medium relative transition duration-500 group/button',
        variant === 'primary' && 'border bg-red-orange-500 text-white',
        variant === 'secondary' && 'border-2 bg-transparent hover:bg-stone-700 hover:text-white', // Changed border to border-2
        variant === 'text' &&
        'h-auto px-2 !border-transparent after:content-[""] after:h-px after:w-0 after:absolute after:left-0 after:bottom-0 after:bg-stone-700 hover:after:w-full after:transition-all after:duration-500 after:ease-in-out',
        className
    );

    if (href) {
        const { onClick, ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
        return (
            <a href={href} className={baseClasses} onClick={onClick} {...anchorProps}>
                <span className="relative">{children}</span>
                {iconAfter && <span className="relative">{iconAfter}</span>}
            </a>
        );
    }

    const { onClick, ...buttonProps } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
        <button className={baseClasses} onClick={onClick} {...buttonProps}>
            <span className="relative">{children}</span>
            {iconAfter && <span className="relative">{iconAfter}</span>}
        </button>
    );
};

export default Button;