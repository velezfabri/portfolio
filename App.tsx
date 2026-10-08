import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  GitFork,
  ContactRound,
  Phone,
} from "lucide-react";
import { experience, profile, projects, type Project } from "./content";
import { ProjectDialog } from "./components/ProjectDialog";
import { Tags } from "./components/Tags";
import { Hero } from "./components/Hero";
import { FadeContent } from "./components/FadeContent";
import { AnimatedContent } from "./components/AnimatedContent";
import { PageMotion } from "./components/PageMotion";
import { Header } from "./components/Header";
import { SpotlightCard } from "./components/SpotlightCard";

import { WelcomeGate } from "./components/WelcomeGate";
import { TechnicalSkills } from "./components/TechnicalSkills";

const asset = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;
export default function App() {
  const [entered, setEntered] = useState(() => {
    try { return sessionStorage.getItem("fabricio-portfolio-entered") === "yes"; }
    catch { return false; }
  });
  const pendingTarget = useRef<string | null>(typeof window === "undefined" ? null : window.location.hash.slice(1) || null);
  const navigate = (id: string) => {
    if (!entered) {
      pendingTarget.current = id;
      setEntered(true);
      try { sessionStorage.setItem("fabricio-portfolio-entered", "yes"); } catch { /* The entry also works without storage. */ }
      return;
    }
    window.history.replaceState(null, "", `#${id}`);
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    const heading = target?.querySelector<HTMLElement>("h1, h2");
    if (heading) { heading.setAttribute("tabindex", "-1"); heading.focus({ preventScroll: true }); }
  };
  useEffect(() => {
    if (!entered || !pendingTarget.current) return;
    const id = pendingTarget.current;
    const frame = requestAnimationFrame(() => {
      pendingTarget.current = null;
      const target = document.getElementById(id);
      target?.scrollIntoView({ behavior: "instant" });
      window.history.replaceState(null, "", `#${id}`);
      const heading = target?.querySelector<HTMLElement>("h1, h2");
      if (heading) { heading.setAttribute("tabindex", "-1"); heading.focus({ preventScroll: true }); }
    });
    return () => cancelAnimationFrame(frame);
  }, [entered]);
  const [filter, setFilter] = useState("Todos");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const projectOpener = useRef<HTMLElement | null>(null);
  const openProject = (project: Project, button: HTMLElement) => {
    projectOpener.current = button;
    setActiveProject(project);
  };
  const [copied, setCopied] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selected = projects.filter(
    (project) => filter === "Todos" || project.category === filter,
  );
  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyMessage("Correo copiado.");
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => {
        setCopied(false);
        setCopyMessage("");
      }, 3500);
    } catch {
      setCopyMessage(`Podés escribirme a ${profile.email}.`);
    }
  };

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header onNavigate={navigate} />
      {entered ? <>
      <PageMotion contentKey={filter} />
      <main id="contenido">
        <Hero />
        <section
          className="projects-section section"
          id="proyectos"
          aria-labelledby="projects-title"
        >
          <div className="container">
            <FadeContent>
              <div className="section-heading">
                <h2 id="projects-title">Proyectos.</h2>
                <div className="projects-intro">
                  <p>
                    Imágenes médicas, salud y territorio. Elegí un proyecto para conocer el proceso y sus resultados.
                  </p>
                  <div
                    className="project-filters"
                    role="group"
                    aria-label="Filtrar proyectos"
                  >
                    {["Todos", "IA", "Datos"].map((option) => (
                      <button
                        key={option}
                        className={filter === option ? "selected" : ""}
                        aria-pressed={filter === option}
                        aria-controls="project-results"
                        onClick={() => setFilter(option)}
                      >
                        {option === "IA" ? "Inteligencia artificial" : option}
                      </button>
                    ))}
                  </div>
                  <span className="sr-only" role="status">
                    {selected.length} proyectos
                  </span>
                </div>
              </div>
            </FadeContent>
            <div className="project-results" id="project-results" key={filter}>
              <div className="project-grid">
                {selected
                  .map((project, index) => (
                    <SpotlightCard
                      as="article"
                      className={`project-card project-${project.id}`}
                      key={project.id}
                      reveal
                      delay={index * 0.05}
                    >
                      <div className="project-thumbnail">
                          <img
                            src={asset(project.images?.[0].src ?? "segmentacion-video-poster.jpg")}
                            alt={project.images?.[0].alt ?? "Etapas de la cascada de segmentación hepática."}
                            width={project.images?.[0].width ?? 1920}
                            height={project.images?.[0].height ?? 1080}
                            loading="lazy"
                          />
                      </div>
                      <span className="project-type">{project.category === "IA" ? "Imágenes médicas · IA" : "Análisis de datos"}</span>
                      <h3>{project.title}</h3>
                      <p>{project.cardDescription}</p>
                      <button
                        className="text-link card-link"
                        onClick={event => openProject(project, event.currentTarget)}
                        aria-haspopup="dialog"
                        aria-label={`Explorar proyecto: ${project.subtitle}`}
                      >
                        Explorar proyecto
                        <ArrowRight size={17} />
                      </button>
                    </SpotlightCard>
                  ))}
              </div>
            </div>
            <a
              className="github-line"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitFork size={21} />
              <span>
                El código también cuenta la historia.
                <strong>Visitá mi GitHub.</strong>
              </span>
              <ArrowUpRight size={23} />
            </a>
          </div>
        </section>
        <section
          className="experience-section section"
          id="experiencia"
          aria-labelledby="experience-title"
        >
          <div className="container">
            <div className="experience-layout">
              <AnimatedContent className="experience-intro" distance={40}>
                <h2 id="experience-title">
                  Ingeniería en el mundo real.
                </h2>
                <p>
                  Servicio técnico e ingeniería clínica: trabajar con equipos,
                  documentar cada intervención y entender las necesidades de un entorno de salud.
                </p>
                <a
                  className="text-link"
                  href={profile.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Recorrido completo en el CV
                  <ArrowUpRight size={18} />
                </a>
              </AnimatedContent>
              <div className="timeline">
                {experience.map((item, index) => (
                  <AnimatedContent as="article" className="timeline-item" key={item.company} distance={32} delay={index * 0.045}>
                    <div>
                      <p className="eyebrow timeline-period">{item.period}</p>
                      <h3>{item.company}</h3>
                      <p className="timeline-role">{item.role}</p>
                      <details className="experience-detail">
                        <summary>Qué hice <ArrowDown size={16} aria-hidden="true" /></summary>
                        <p className="timeline-description">{item.description}</p>
                      </details>
                      <Tags tags={item.tags} />
                    </div>
                  </AnimatedContent>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="skills-section section" aria-labelledby="skills-title">
          <div className="container"><TechnicalSkills onOpenProject={openProject} onNavigate={navigate} /></div>
        </section>
        <section
          className="contact-section section"
          id="contacto"
          aria-labelledby="contact-title"
        >
          <div className="container">
            <div className="availability">
              <span aria-hidden="true" /> Disponible para oportunidades
            </div>
            <FadeContent className="contact-heading">
              <div>
                <h2 id="contact-title">Hablemos.</h2>
                <p>
                  ¿Una oportunidad, un proyecto o una buena idea?
                  Me gustaría conocerla.
                </p>
              </div>
              <a className="contact-orbit" href={`mailto:${profile.email}`}>
                <ArrowUpRight size={36} aria-hidden="true" />
                <span>Escribime</span>
              </a>
            </FadeContent>
            <div className="email-row">
              <a href={`mailto:${profile.email}`}>
                {profile.email}
                <ArrowUpRight size={28} />
              </a>
              <button
                className="icon-button copy-email"
                onClick={copyEmail}
                aria-label={
                  copied ? "Correo copiado" : "Copiar dirección de correo"
                }
              >
                {copied ? <Check size={21} /> : <Copy size={21} />}
              </button>
            </div>
            <p className="copy-status" role="status">
              {copyMessage}
            </p>
            <div className="contact-links">
              <a href={profile.phoneHref}>
                <Phone size={18} />
                {profile.phone}
                <ArrowUpRight size={16} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ContactRound size={18} />
                LinkedIn
                <ArrowUpRight size={16} />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitFork size={18} />
                GitHub
                <ArrowUpRight size={16} />
              </a>
              <a
                className="download-link"
                href={profile.cv}
                download="Fabricio_Velez_CV.pdf"
              >
                <ArrowDownToLine size={18} />
                Descargar CV
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container">
          <a className="footer-signature" href="#inicio">
            Fabricio Velez<span>.</span>
          </a>
          <span>Ingeniero Biomédico · Córdoba, Argentina</span>
          <a href="#inicio">
            Volver arriba
            <ArrowUpRight size={16} />
          </a>
        </div>
      </footer>
      </> : <WelcomeGate onEnter={() => navigate(window.location.hash.slice(1) || "inicio")} />}
      <ProjectDialog
        project={activeProject}
        openerElement={projectOpener.current}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}
