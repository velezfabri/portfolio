// React Bits / SplitText, adapted from David Haz's component.
// Source and license: THIRD_PARTY.md. Uses the existing GSAP dependency.
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { motionSettings } from "../motion-settings";

gsap.registerPlugin(GSAPSplitText);

export function SplitText({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let cancelled = false;
    let media: gsap.MatchMedia | undefined;
    const prepare = async () => {
      if (document.fonts) await document.fonts.ready;
      if (cancelled || !ref.current) return;
      const element = ref.current;
      media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const split = GSAPSplitText.create(element, {
          type: "chars,words",
          charsClass: "split-char",
          wordsClass: "split-word",
        });
        gsap.fromTo(
          split.chars,
          { opacity: 0, y: motionSettings.name.distance },
          {
            opacity: 1,
            y: 0,
            duration: motionSettings.name.duration,
            delay,
            stagger: motionSettings.name.stagger,
            ease: "power3.out",
            clearProps: "opacity,transform",
          },
        );
        return () => {
          split.revert();
        };
      });
    };
    void prepare();
    return () => {
      cancelled = true;
      media?.revert();
    };
  }, [text, delay]);

  // The heading provides an equivalent text label; its decorative split spans
  // must not be read a character at a time by assistive technology.
  return (
    <span ref={ref} className={`split-text ${className}`} aria-hidden="true">
      {text}
    </span>
  );
}
