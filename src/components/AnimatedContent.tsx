// React Bits / AnimatedContent, adapted from David Haz's component.
// Source and license: THIRD_PARTY.md.
import { createElement, useEffect, useRef, type HTMLAttributes } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article";
  distance?: number;
  delay?: number;
  replay?: boolean;
};

export function AnimatedContent({
  children,
  as = "div",
  distance = 44,
  delay = 0,
  replay = false,
  ...props
}: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const animation = gsap.fromTo(
        element,
        { y: distance, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          delay,
          ease: "power3.out",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: !replay,
            toggleActions: "play none none reverse",
          },
        },
      );
      const reveal = () => {
        animation.scrollTrigger?.kill();
        animation.progress(1);
      };
      element.addEventListener("focusin", reveal);
      return () => {
        element.removeEventListener("focusin", reveal);
      };
    });
    return () => {
      media.revert();
    };
  }, [distance, delay, replay]);
  return createElement(as, { ...props, ref }, children);
}
