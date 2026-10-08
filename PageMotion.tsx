import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionSettings } from "../motion-settings";

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

    });

    media.add(
      "(min-width: 851px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.to(".hero-portrait", {
          y: motionSettings.portrait.distance,
          ease: "none",
          scrollTrigger: {
            trigger: "#inicio",
            start: "top top",
            end: "bottom top",
            scrub: motionSettings.portrait.scrub,
          },
        });
      },
    );

    return () => media.revert();
  }, []);

  useEffect(() => {
    const main = document.querySelector("main");
    let frame = 0;
    const refreshAfterDisclosure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    // Native details change the heights of the sections below the timeline.
    main?.addEventListener("toggle", refreshAfterDisclosure, true);
    return () => {
      main?.removeEventListener("toggle", refreshAfterDisclosure, true);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    // Filtering changes section heights; recalculate after React paints.
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [contentKey]);

  return <div className="reading-progress" ref={progressRef} aria-hidden="true" />;
}
