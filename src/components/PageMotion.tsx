import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Scroll decoration stays separate from the content and native navigation. */
export function PageMotion({ contentKey }: { contentKey: string }) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.15 },
        },
      );

      document.querySelectorAll<HTMLElement>(".section-top").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: element,
              start: "top 92%",
              once: true,
            },
          },
        );
      });
      const bridgeLine = document.querySelector(".chapter-bridge-line");
      if (bridgeLine) {
        gsap.fromTo(
          bridgeLine,
          { scaleX: 0.08 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".chapter-bridge",
              start: "top 95%",
              end: "top 40%",
              scrub: 0.4,
            },
          },
        );
      }
    });

    media.add(
      "(min-width: 851px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.to(".hero-portrait", {
          y: -28,
          ease: "none",
          scrollTrigger: {
            trigger: "#inicio",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      },
    );

    return () => media.revert();
  }, []);

  useEffect(() => {
    // Filtering changes section heights; recalculate after React paints.
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [contentKey]);

  return <div className="reading-progress" ref={progressRef} aria-hidden="true" />;
}
