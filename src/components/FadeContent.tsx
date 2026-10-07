// Adapted from React Bits / FadeContent by David Haz.
// Original source and MIT + Commons Clause notice: THIRD_PARTY.md.
import { useEffect, useRef, type HTMLAttributes } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FadeContentProps = HTMLAttributes<HTMLDivElement> & {
  duration?: number;
  replay?: boolean;
};

export function FadeContent({
  children,
  duration = 0.7,
  replay = true,
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
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration,
          ease: "power3.out",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: element,
            start: "top 86%",
            once: !replay,
            toggleActions: "play none none reverse",
          },
        },
      );
      // Keyboard navigation must never land on visually hidden content.
      const revealOnFocus = () => {
        animation.scrollTrigger?.kill();
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
  }, [duration, replay]);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
