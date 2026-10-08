import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { motionSettings } from "../motion-settings";

export function WelcomeGate({ onEnter }: { onEnter: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const animation = useRef<gsap.core.Tween | null>(null);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => () => { animation.current?.kill(); }, []);
  const enter = () => {
    if (leaving) return;
    setLeaving(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onEnter();
      return;
    }
    animation.current = gsap.to(ref.current, {
      opacity: 0, y: motionSettings.welcome.distance,
      duration: motionSettings.welcome.duration,
      ease: "power2.in", onComplete: onEnter,
    });
  };
  return (
    <main className="welcome container" id="contenido" ref={ref}>
      <p className="welcome-name">Fabricio Velez</p>
      <h1>Entre la ingeniería<br />y los datos.</h1>
      <p className="welcome-description">Un recorrido por lo que soy, lo que construyo y lo que sigo aprendiendo.</p>
      <button className="button button-dark welcome-enter" onClick={enter} disabled={leaving}>
        Entrar al portfolio <ArrowUpRight size={22} aria-hidden="true" />
      </button>
    </main>
  );
}
