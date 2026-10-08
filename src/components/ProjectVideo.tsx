import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export function ProjectVideo({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    const video = videoRef.current;
    return () => {
      video?.pause();
      dialog.close();
      document.body.style.overflow = overflow;
    };
  }, [open]);
  return (
    <dialog ref={ref} className="project-dialog video-dialog" aria-labelledby="video-title" onClose={onClose}
      onClick={event => { if (event.target === event.currentTarget) ref.current?.close(); }}>
      {open && <div className="video-dialog-content">
        <div className="video-dialog-heading">
          <h2 id="video-title">De la tomografía al resultado.</h2>
          <button className="icon-button" aria-label="Cerrar video" onClick={() => ref.current?.close()}><X size={22} aria-hidden="true" /></button>
        </div>
        <video ref={videoRef} controls playsInline preload="metadata" poster={`${import.meta.env.BASE_URL}images/segmentacion-video-poster.jpg`}
          aria-label="Video de 20 segundos de la cascada de segmentación hepática">
          <source src={`${import.meta.env.BASE_URL}videos/segmentacion-hepatica.mp4`} type="video/mp4" />
          <track kind="captions" src={`${import.meta.env.BASE_URL}videos/segmentacion-hepatica.vtt`} srcLang="es" label="Descripción en español" />
        </video>
        <p>Tomografía, primera 3D U-Net, hígado, segunda red y ocho segmentos de Couinaud. Las imágenes y predicciones pertenecen al proyecto.</p>
        <a className="text-link" href={`${import.meta.env.BASE_URL}videos/segmentacion-hepatica.mp4`} download>Descargar video</a>
      </div>}
    </dialog>
  );
}
