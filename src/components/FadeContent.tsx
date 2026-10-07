// Adapted from React Bits / FadeContent by David Haz.
// Original source and MIT + Commons Clause notice: THIRD_PARTY.md.
import { useEffect, useRef, type HTMLAttributes } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FadeContentProps = HTMLAttributes<HTMLDivElement> & { duration?: number };

export function FadeContent({
  children,
  duration = 0.65,
  ...props
}: FadeContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // The unenhanced markup is visible. Reduced motion also uses this final state.
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const animation = gsap.fromTo(
        element,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration,
          ease: "power2.out",
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: element, start: "top 92%", once: true },
        },
      );
      // Keyboard navigation must never land on visually hidden content.
      const revealOnFocus = () => {
        animation.progress(1);
      };
      element.addEventListener("focusin", revealOnFocus);
      return () => {
        element.removeEventListener("focusin", revealOnFocus);
      };
    });

    return () => {
      media.revert();
    };
  }, [duration]);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
