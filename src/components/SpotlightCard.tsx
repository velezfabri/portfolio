// React Bits / SpotlightCard, adapted from David Haz's component.
// Source and license: THIRD_PARTY.md. Styling is in src/styles.css.
import {
  createElement,
  useEffect,
  useRef,
  type HTMLAttributes,
  type MouseEvent,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article";
  reveal?: boolean;
  delay?: number;
};

export function SpotlightCard({
  as = "div",
  reveal = false,
  delay = 0,
  children,
  className = "",
  ...props
}: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !reveal) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const animation = gsap.fromTo(
        element,
        { opacity: 0, y: 42 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay,
          ease: "power3.out",
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: element, start: "top 90%", once: true },
        },
      );
      const showOnFocus = () => {
        animation.scrollTrigger?.kill();
        animation.progress(1);
      };
      element.addEventListener("focusin", showOnFocus);
      return () => element.removeEventListener("focusin", showOnFocus);
    });
    return () => media.revert();
  }, [reveal, delay]);
  const move = (event: MouseEvent<HTMLElement>) => {
    const element = ref.current;
    if (
      !element ||
      !window.matchMedia(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      ).matches
    )
      return;
    const bounds = element.getBoundingClientRect();
    element.style.setProperty("--mouse-x", `${event.clientX - bounds.left}px`);
    element.style.setProperty("--mouse-y", `${event.clientY - bounds.top}px`);
  };
  return createElement(
    as,
    {
      ...props,
      ref,
      onMouseMove: move,
      className: `card-spotlight ${className}`,
    },
    children,
  );
}
