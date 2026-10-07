// React Bits / SpotlightCard, adapted from David Haz's component.
// Source and license: THIRD_PARTY.md. Styling is in src/styles.css.
import {
  createElement,
  useRef,
  type HTMLAttributes,
  type MouseEvent,
} from "react";

type Props = HTMLAttributes<HTMLElement> & { as?: "div" | "article" };

export function SpotlightCard({
  as = "div",
  children,
  className = "",
  ...props
}: Props) {
  const ref = useRef<HTMLElement>(null);
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
