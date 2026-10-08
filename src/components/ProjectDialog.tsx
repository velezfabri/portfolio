import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, FileText, Mail, X } from "lucide-react";
import { profile, type Project, type ProjectImage } from "../content";
import { Tags } from "./Tags";
import { ProjectPipeline } from "./ProjectPipeline";
import { SegmentationExplorer } from "./SegmentationExplorer";
import { segmentationChapters } from "../segmentation-chapters";

const asset = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const [selected, setSelected] = useState(0);
  const current = images[selected];
  return (
    <div className="project-gallery">
      {images.length > 1 && (
        <div
          className="gallery-controls"
          role="group"
          aria-label="Elegir imagen del proyecto"
        >
          {images.map((item, index) => (
            <button
              key={item.src}
              aria-pressed={selected === index}
              aria-controls="project-gallery-image"
              onClick={() => setSelected(index)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
      <figure className="dialog-figure" id="project-gallery-image" key={current.src}>
        <a
          href={asset(current.src)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Abrir imagen completa: ${current.label}`}
        >
          <img
            src={asset(current.src)}
            alt={current.alt}
            width={current.width}
            height={current.height}
          />
        </a>
        <figcaption aria-live="polite">{current.caption}</figcaption>
      </figure>
      <a
        className="gallery-full-image text-link"
        href={asset(current.src)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Abrir imagen completa
        <ExternalLink size={15} />
      </a>
    </div>
  );
}

export function ProjectDialog({
  project,
  openerElement,
  onClose,
}: {
  project: Project | null;
  openerElement: HTMLElement | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const generation = useRef(0);
  const backdropStart = useRef(false);
  const [videoStatus, setVideoStatus] = useState("");
  const [videoError, setVideoError] = useState(false);
  const close = () => {
    generation.current += 1;
    videoRef.current?.pause();
    ref.current?.close();
    onClose();
    opener.current?.focus({ preventScroll: true });
    opener.current = null;
  };
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !project) return;
    opener.current = openerElement;
    const token = ++generation.current;
    let alive = true;
    const current = () => alive && generation.current === token && dialog.open;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    dialog.querySelector<HTMLElement>("#project-dialog-title")?.focus({ preventScroll: true });
    const video = videoRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    setVideoError(false);
    setVideoStatus(reduced.matches ? "Movimiento reducido: iniciá el video con sus controles cuando quieras." : "Intentando reproducir el video sin sonido…");
    const playing = () => { if (current()) setVideoStatus("Video en reproducción. Podés activar el sonido desde los controles."); };
    const paused = () => { if (current()) setVideoStatus("Video pausado. Podés continuar desde los controles."); };
    const failed = () => { if (current()) { setVideoError(true); setVideoStatus("No se pudo cargar el video. Podés abrir el MP4 original y consultar la comparación estática."); } };
    const visibility = () => { if (document.hidden) video?.pause(); };
    const motionChanged = () => { if (reduced.matches) { video?.pause(); if (current()) setVideoStatus("Movimiento reducido: iniciá el video con sus controles cuando quieras."); } };
    if (video) {
      video.muted = true;
      video.currentTime = 0;
      video.addEventListener("playing", playing);
      video.addEventListener("pause", paused);
      video.addEventListener("error", failed);
      if (!reduced.matches) void video.play().catch(() => { if (current()) setVideoStatus("La reproducción automática no está disponible. Iniciá el video con sus controles."); });
    }
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", motionChanged);
    return () => {
      alive = false;
      generation.current += 1;
      video?.removeEventListener("playing", playing);
      video?.removeEventListener("pause", paused);
      video?.removeEventListener("error", failed);
      video?.pause();
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", motionChanged);
      // No onClose handler: cleanup's queued close event cannot erase a reopening.
      dialog.close();
      document.body.style.overflow = oldOverflow;
    };
  }, [project, openerElement]);
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onCancel={event => { event.preventDefault(); close(); }}
      onPointerDown={event => { backdropStart.current = event.target === event.currentTarget; }}
      onClick={(event) => {
        if (backdropStart.current && event.target === event.currentTarget) close();
        backdropStart.current = false;
      }}
    >
      {project && (
        <div className="dialog-content">
          <header className="dialog-header"><div className="dialog-topline">
            <span className="eyebrow">
              PROYECTO {project.number} / {project.category}
            </span>
            <button
              className="icon-button"
              aria-label="Cerrar detalle del proyecto"
              onClick={close}
            >
              <X size={22} />
            </button>
          </div>
          <h2 id="project-dialog-title" tabIndex={-1}>{project.subtitle}</h2></header>
          {project.id === "segmentacion" && (
            <>
            <video ref={videoRef} className="case-video" controls playsInline muted preload="metadata" poster={asset("segmentacion-video-poster.jpg")} aria-label="Video de la cascada de segmentación hepática" aria-describedby="case-video-status">
              <source src={`${import.meta.env.BASE_URL}videos/segmentacion-hepatica.mp4`} type="video/mp4" />
              <track kind="captions" src={`${import.meta.env.BASE_URL}videos/segmentacion-hepatica.vtt`} srcLang="es" label="Descripción en español" />
            </video>
            <p id="case-video-status" className="video-status" role="status">{videoStatus}</p>
            {videoError && <a className="text-link" href={`${import.meta.env.BASE_URL}videos/segmentacion-hepatica.mp4`} target="_blank" rel="noopener noreferrer">Abrir MP4 original <ExternalLink size={15} /></a>}
            <details className="case-video-chapters"><summary>Leer las etapas del video</summary>{segmentationChapters.map(chapter => <div key={chapter.name}><h3>{chapter.title}</h3><p>{chapter.text}</p></div>)}</details>
            <details className="story-comparison"><summary>Comparar referencia y predicción</summary><SegmentationExplorer />
            <figure className="dialog-figure">
              <img
                src={asset("resultado-test.png")}
                alt="Comparación de la referencia manual y la predicción de los segmentos de Couinaud en una tomografía del conjunto de test."
                width="2048"
                height="947"
              />
              <figcaption>
                Resultado del conjunto de test. Izquierda: referencia manual.
                Derecha: predicción del modelo.
              </figcaption>
            </figure>
            </details>
            </>
          )}
          {project.images?.length ? (
            <ProjectGallery key={project.id} images={project.images} />
          ) : null}
          <Tags tags={project.tags} />
          <ProjectPipeline steps={project.pipeline} />
          <div className="case-section">
            <h3>El problema</h3>
            <p>{project.question}</p>
          </div>
          <div className="case-section">
            <h3>Mi aporte</h3>
            <ul>
              {project.work.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="case-result">
            <h3>El resultado</h3>
            <p>{project.result}</p>
          </div>
          {project.note && <p className="case-note">{project.note}</p>}
          <div className="dialog-actions">
            {project.links?.map((link) => (
              <a
                className="button button-dark"
                href={link.href}
                key={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
                <ArrowUpRight size={17} />
              </a>
            ))}
            {!project.links?.length && (
              <a
                className="button button-dark"
                href={`mailto:${profile.email}?subject=${encodeURIComponent(`Consulta sobre el proyecto: ${project.subtitle}`)}`}
              >
                Consultar sobre el proyecto
                <Mail size={17} />
              </a>
            )}
            <a
              className="button button-outline"
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver CV completo
              <FileText size={17} />
            </a>
          </div>
        </div>
      )}
    </dialog>
  );
}
