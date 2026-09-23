"use client";

import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true, autoRaf: false });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    (window as any).lenis = lenis;

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      (window as any).lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
