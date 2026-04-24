"use client";

import { FC, useEffect, useState } from "react";
import { MouseEvent } from "react";
import { TextRoll } from "../components/ui/skiper-ui/skiper58";

const navItems = [
    { label: "Home", href: "#" },
    { label: "Works", href: "#projects" },
    { label: "About", href: "#intro" },
    { label: "Contact", href: "#contact" },
];

/* ── Shared meta text style ─────────────────────────────────────────── */
const metaStyle: React.CSSProperties = {
    letterSpacing: "0.13em",
    textTransform: "uppercase" as const,
    whiteSpace: "nowrap",
};
const metaSizeClass = "font-[600] md:font-[500] text-[9px] md:text-[11px]";

/* ── NavLink: skiper58 TextRoll per-character stagger on hover ───────── */
const NavLink: FC<{
    label: string;
    href: string;
    onClick: (e: MouseEvent<HTMLAnchorElement>) => void;
}> = ({ label, href, onClick }) => {
    return (
        <a
            href={href}
            onClick={onClick}
            className={`inline-block cursor-pointer text-white ${metaSizeClass}`}
            style={{ fontFamily: "var(--font-inter), sans-serif", ...metaStyle }}
        >
            <TextRoll
                center
                className={`tracking-[0.13em] uppercase ${metaSizeClass}`}
            >
                {label}
            </TextRoll>
        </a>
    );
};

/* ── Header ─────────────────────────────────────────────────────────── */
const Header: FC = () => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const fmt = () =>
            new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            });
        setTime(fmt());
        const id = setInterval(() => setTime(fmt()), 30_000);
        return () => clearInterval(id);
    }, []);

    const handleNav = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute("href") || "#";
        if (href === "#") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        const target = document.querySelector(href);
        if (!target) return;
        target.scrollIntoView({ behavior: "smooth" });
    };

    const Dot = () => (
        <span
            aria-hidden="true"
            style={{
                display: "inline-block",
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                backgroundColor: "white",
                flexShrink: 0,
            }}
        />
    );

    return (
        <header>
            <div
                className="fixed top-0 left-0 w-full z-50"
                style={{
                    height: "44px",
                    background: "transparent",
                    mixBlendMode: "difference",
                }}
            >
                <div
                    className="flex items-center justify-between h-full w-full"
                    style={{
                        paddingLeft: "1.5rem",
                        paddingRight: "1.5rem",
                        fontFamily: "var(--font-inter), sans-serif",
                    }}
                >
                    {/* ── Left meta ──────────────────────────────── */}
                    <div className="flex items-center gap-5" style={{ flexShrink: 0 }}>
                        <div className="flex items-center gap-2">
                            <Dot />
                            <span className={`text-white ${metaSizeClass}`} style={metaStyle}>
                                Chennai, IN
                            </span>
                        </div>

                        <span className={`hidden md:inline text-white ${metaSizeClass}`} style={metaStyle}>
                            {time}&nbsp;&nbsp;IST +5:30
                        </span>

                        <span className={`hidden lg:inline text-white ${metaSizeClass}`} style={metaStyle}>
                            13.0827° N, 80.2707° E
                        </span>
                    </div>

                    {/* ── Right: nav links ───────────────────────── */}
                    <nav className="flex items-center gap-3 sm:gap-5 md:gap-7">
                        {navItems.map(({ label, href }) => (
                            <NavLink
                                key={label}
                                label={label}
                                href={href}
                                onClick={handleNav}
                            />
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;