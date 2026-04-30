"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // ── Instantiate Lenis ──────────────────────────────────────────────────
    const lenis = new Lenis({
      // A slightly higher lerp (0.08) feels more responsive while retaining the cinematic smoothness
      lerp: 0.08,

      // Wheel multiplier at 1 ensures natural scroll speed across different mice/trackpads
      wheelMultiplier: 1,

      // Higher multiplier for mobile touch to feel lighter and more native
      touchMultiplier: 2,

      // Enable smooth scrolling for mouse wheels
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // ── Sync Lenis with GSAP ticker ────────────────────────────────────────
    // This is the critical step: on every GSAP tick, we advance Lenis by the
    // same delta so ScrollTrigger reads the Lenis-smoothed position, not the
    // raw browser scroll position.
    const onTick = (time: number) => {
      lenis.raf(time * 1000); // GSAP time is in seconds, Lenis expects ms
    };

    gsap.ticker.add(onTick);

    // Disable GSAP's own lag smoothing so it doesn't fight Lenis
    gsap.ticker.lagSmoothing(0);

    // Keep ScrollTrigger refreshed after resize
    lenis.on("scroll", ScrollTrigger.update);

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      gsap.ticker.remove(onTick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
