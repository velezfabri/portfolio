import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelParagraphInverse } from "./PixelParagraphInverse";

gsap.registerPlugin(ScrollTrigger);
const statement = "Me interesa lo que pasa cuando la ingeniería se encuentra con los datos.";
const plainWords = ["ingeniería", "datos."];

/** One bounded scroll chapter. Mobile and reduced motion use normal document flow. */
export function Statement() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    let cancelled = false;
    const media = gsap.matchMedia();
    const prepare = async () => {
      try {
        await document.fonts?.load('48px "Geist Pixel"');
      } catch {
        // A font download failure keeps the paragraph readable with its fallback.
      }
      if (cancelled || !ref.current) return;
      media.add({
        desktop: "(min-width: 1024px) and (min-height: 700px)",
        mobile: "(max-width: 1023px), (max-height: 699px)",
        reduced: "(prefers-reduced-motion: reduce)",
      }, (context) => {
        if (context.conditions?.reduced) return;
        const desktop = !!context.conditions?.desktop;
        const element = ref.current!;
        const words = element.querySelectorAll(".pixel-word");
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: desktop ? "top top" : "top 85%",
            end: desktop ? "+=65%" : "bottom 70%",
            pin: desktop,
            scrub: desktop ? 0.5 : 0.2,
            invalidateOnRefresh: true,
          },
        });
        timeline.fromTo(words, { opacity: 0.25, y: 18 }, {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.32, ease: "none",
        }).to({}, { duration: 0.25 });
      });
      ScrollTrigger.refresh();
    };
    void prepare();
    return () => { cancelled = true; media.revert(); };
  }, []);
  return (
    <section ref={ref} className="statement" aria-label="Lo que me mueve">
      <div className="container statement-inner">
        <PixelParagraphInverse text={statement} plainWords={plainWords} />
        <p className="statement-note">Esa curiosidad se convierte en proyectos.</p>
      </div>
    </section>
  );
}
