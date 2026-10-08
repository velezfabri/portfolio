import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, FileText, Mail, X } from "lucide-react";
import { profile, type Project, type ProjectImage } from "../content";
import { Tags } from "./Tags";
import { ProjectPipeline } from "./ProjectPipeline";

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
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !project) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    const videos = dialog.querySelectorAll("video");
    return () => {
      videos.forEach(video => video.pause());
      dialog.close();
      document.body.style.overflow = oldOverflow;
    };
  }, [project]);
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) ref.current?.close();
      }}
    >
      {project && (
        <div className="dialog-content">
          <div className="dialog-topline">
            <span className="eyebrow">
              PROYECTO {project.number} / {project.category} / 2026
            </span>
            <button
              className="icon-button"
              aria-label="Cerrar detalle del proyecto"
              onClick={() => ref.current?.close()}
            >
              <X size={22} />
            </button>
          </div>
          <h2 id="project-dialog-title">{project.subtitle}</h2>
          <Tags tags={project.tags} />
          <ProjectPipeline steps={project.pipeline} />
          {project.id === "segmentacion" && (
            <>
            <video className="case-video" controls playsInline preload="metadata" poster={asset("segmentacion-video-poster.jpg")} aria-label="Video de la cascada de segmentación hepática">
              <source src={`${import.meta.env.BASE_URL}videos/segmentacion-hepatica.mp4`} type="video/mp4" />
              <track kind="captions" src={`${import.meta.env.BASE_URL}videos/segmentacion-hepatica.vtt`} srcLang="es" label="Descripción en español" />
            </video>
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
            </>
          )}
          {project.images?.length ? (
            <ProjectGallery key={project.id} images={project.images} />
          ) : null}
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
