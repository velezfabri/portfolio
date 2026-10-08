import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionSettings } from "../motion-settings";
import { type Project } from "../content";
import { ProjectVideo } from "./ProjectVideo";
import { SegmentationExplorer } from "./SegmentationExplorer";
import { Tags } from "./Tags";

gsap.registerPlugin(ScrollTrigger);

// Times are taken from scene() in the user's original render_video.py.
export const segmentationChapters = [
  { name: "Tomografía", time: 0.6, start: 0, title: "Todo empieza con una tomografía.", text: "Una imagen 3D formada por cortes. El objetivo: identificar el hígado y después sus segmentos anatómicos." },
  { name: "Primera red", time: 4.9, start: 3.1, title: "Una red para encontrar el hígado.", text: "La primera 3D U-Net analiza el volumen. Aprende a distinguir el órgano del resto de la imagen." },
  { name: "Hígado", time: 8.6, start: 7.5, title: "Primero, el órgano completo.", text: "La primera predicción identifica el hígado. Es el primer resultado de la cascada, antes de distinguir sus segmentos anatómicos." },
  { name: "Segunda red", time: 11.8, start: 10, title: "Después, sus ocho segmentos.", text: "La segunda 3D U-Net distingue los segmentos de Couinaud. Cada color representa una región anatómica." },
  { name: "Resultado", time: 17.6, start: 14, title: "Un resultado que puedo visualizar y evaluar.", text: "Recorrí las predicciones en 3D Slicer y evalué la segmentación con Dice. El video muestra el resultado de un caso del proyecto." },
];

export function SegmentationStory({ project, onOpenCase }: { project: Project; onOpenCase: () => void }) {
  const rootRef = useRef<HTMLElement>(null);
  const chaptersRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollTween = useRef<gsap.core.Tween | null>(null);
  const desiredTime = useRef(0.6);
  const stageRef = useRef(0);
  const [stage, setStage] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const root = rootRef.current;
    const chapters = chaptersRef.current;
    if (!video || !root || !chapters) return;
    let alive = true;
    const seek = () => {
      if (!alive || video.readyState < 1 || video.seeking || !Number.isFinite(video.duration)) return;
      const next = Math.min(desiredTime.current, Math.max(0, video.duration - 0.1));
      if (Math.abs(video.currentTime - next) > 0.06) video.currentTime = next;
    };
    const ready = () => { seek(); ScrollTrigger.refresh(); };
    video.addEventListener("loadedmetadata", ready);
    video.addEventListener("seeked", seek);
    seek();
    const media = gsap.matchMedia();
    media.add({ desktop: motionSettings.story.desktopQuery, reduced: "(prefers-reduced-motion: reduce)" }, context => {
      if (!context.conditions?.desktop || context.conditions?.reduced) return;
      const playhead = { progress: 0 };
      scrollTween.current = gsap.to(playhead, {
        progress: 1, ease: "none",
        onUpdate: () => {
          if (!alive) return;
          const position = playhead.progress * segmentationChapters.length;
          const next = Math.min(segmentationChapters.length - 1, Math.floor(position));
          const start = segmentationChapters[next].start;
          const end = segmentationChapters[next + 1]?.start ?? 19.7;
          desiredTime.current = Math.max(0.6, start + (end - start) * Math.min(1, position - next));
          seek();
          if (next !== stageRef.current) { stageRef.current = next; setStage(next); }
        },
        scrollTrigger: {
          trigger: chapters, start: motionSettings.story.start, end: motionSettings.story.end,
          scrub: motionSettings.story.scrub, invalidateOnRefresh: true,
        },
      });
      return () => { scrollTween.current = null; };
    });
    return () => {
      alive = false; media.revert();
      video.removeEventListener("loadedmetadata", ready);
      video.removeEventListener("seeked", seek);
    };
  }, []);

  const chooseChapter = (index: number) => {
    stageRef.current = index;
    setStage(index);
    const chapter = segmentationChapters[index];
    const desktopScroll = scrollTween.current?.scrollTrigger;
    if (desktopScroll) {
      const end = segmentationChapters[index + 1]?.start ?? 19.7;
      const sceneProgress = (chapter.time - chapter.start) / (end - chapter.start);
      const progress = (index + sceneProgress) / segmentationChapters.length;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: desktopScroll.start + (desktopScroll.end - desktopScroll.start) * progress, behavior: reduced ? "instant" : "smooth" });
    } else {
      desiredTime.current = chapter.time;
      const video = videoRef.current;
      if (video && video.readyState >= 1 && !video.seeking) video.currentTime = chapter.time;
    }
  };

  return (
    <article className="segmentation-story" ref={rootRef} aria-labelledby="segmentation-title">
      <div className="story-heading">
        <p className="project-type">Deep learning · Proyecto final UNC</p>
        <h3 id="segmentation-title">{project.title}</h3>
        <p>{project.description}</p>
        <Tags tags={project.tags} />
      </div>
      <div className="story-layout">
        <div className="story-chapters" ref={chaptersRef}>
          {segmentationChapters.map((chapter, index) => (
            <div className={`story-chapter ${stage === index ? "is-current" : ""}`} key={chapter.name}>
              <h4>{chapter.title}</h4><p>{chapter.text}</p>
            </div>
          ))}
        </div>
        <div className="story-media">
          <figure>
            <div className="story-video-frame">
              <video ref={videoRef} muted playsInline preload="metadata"
                poster={`${import.meta.env.BASE_URL}images/segmentacion-video-poster.jpg`}
                aria-label="Visualización de las etapas de segmentación hepática; las descripciones están junto al video"
                onError={() => setVideoError(true)}>
                <source src={`${import.meta.env.BASE_URL}videos/segmentacion-hepatica-scroll.mp4`} type="video/mp4" />
              </video>
            </div>
            <figcaption>{videoError ? "Podés abrir el video completo para ver el proceso." : "Imágenes, activaciones y predicciones del proyecto."}</figcaption>
          </figure>
          <div className="story-step-controls" role="group" aria-label="Explorar las etapas de la cascada">
            {segmentationChapters.map((chapter, index) => (
              <button key={chapter.name} aria-pressed={stage === index} aria-controls="story-selected-chapter" onClick={() => chooseChapter(index)}>
                {chapter.name}<span className="story-step-indicator" aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className="story-mobile-copy" id="story-selected-chapter" aria-live="polite">
            <h4>{segmentationChapters[stage].title}</h4><p>{segmentationChapters[stage].text}</p>
          </div>
          <div className="story-video-actions">
            <button className="button button-dark" onClick={() => setVideoOpen(true)}><Play size={16} aria-hidden="true" />Ver video completo</button>
            <button className="text-link" onClick={onOpenCase}>Ver el caso<ArrowRight size={17} aria-hidden="true" /></button>
          </div>
        </div>
      </div>
      <div className="story-results">
        <dl className="project-metrics">
          <div><dt>Dice · hígado</dt><dd>97,63<span>%</span></dd></div>
          <div><dt>Dice macro · segmentos</dt><dd>81,56<span>%</span></dd></div>
        </dl>
        <div><p>Resultados del conjunto de test. La evaluación externa incluyó seis casos clínicos.</p>
          <p className="metric-context">Evaluación académica; no implica validación para uso clínico autónomo.</p>
          <a className="text-link" href={project.links![0].href} target="_blank" rel="noopener noreferrer">Código en GitHub<ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
      <details className="story-comparison"><summary>Comparar referencia y predicción<ArrowRight size={18} aria-hidden="true" /></summary><SegmentationExplorer /></details>
      <ProjectVideo open={videoOpen} onClose={() => setVideoOpen(false)} />
    </article>
  );
}
