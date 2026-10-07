// React Bits / AnimatedContent, adapted from David Haz's component.
// Source and license: THIRD_PARTY.md.
import { useEffect, useRef, type HTMLAttributes } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = HTMLAttributes<HTMLDivElement> & {
  distance?: number;
  delay?: number;
};

export function AnimatedContent({
  children,
  distance = 38,
  delay = 0,
  ...props
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
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
          duration: 0.9,
          delay,
          ease: "power3.out",
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: element, start: "top 94%", once: true },
        },
      );
      const reveal = () => {
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
  }, [distance, delay]);
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
