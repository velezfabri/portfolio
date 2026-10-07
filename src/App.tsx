import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  FileText,
  GitFork,
  ContactRound,
  Mail,
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
import { Areas } from "./components/Areas";
import { SpotlightCard } from "./components/SpotlightCard";
import { ProjectPipeline } from "./components/ProjectPipeline";

const asset = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;
export default function App() {
  const [filter, setFilter] = useState("Todos");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const featured = projects[0];
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
      <Header />
      <PageMotion contentKey={filter} />
      <main id="contenido">
        <Hero />
        <Areas />
        <div className="chapter-bridge container">
          <span className="eyebrow">DE QUIÉN SOY A LO QUE HAGO</span>
          <span className="chapter-bridge-line" aria-hidden="true" />
          <a href="#proyectos">
            Ahora, los proyectos
            <ArrowDown size={18} aria-hidden="true" />
          </a>
        </div>
        <section
          className="projects-section section"
          id="proyectos"
          aria-labelledby="projects-title"
        >
          <div className="container">
            <div className="section-top">
              <span className="eyebrow">
                <span className="section-number">01</span> PROYECTOS
                SELECCIONADOS
              </span>
              <span className="section-aside">
                CÓDIGO + ANÁLISIS + APLICACIÓN
              </span>
            </div>
            <FadeContent>
              <div className="section-heading">
                <h2 id="projects-title">
                  Del problema
                  <br />
                  <em>al resultado.</em>
                </h2>
                <div className="projects-intro">
                  <p>
                    Proyectos que conectan problemas de salud con análisis,
                    modelos e interfaces para explorar los resultados.
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
            {selected.some((project) => project.id === "segmentacion") && (
              <AnimatedContent as="article" className="featured-project" distance={48}>
                <div className="featured-copy">
                  <span className="eyebrow">01 / DEEP LEARNING · 2026</span>
                  <h3>{featured.subtitle}</h3>
                  <p>{featured.description}</p>
                  <Tags tags={featured.tags} />
                  <ProjectPipeline steps={featured.pipeline} />
                  <dl className="project-metrics">
                    <div>
                      <dt>Dice · hígado</dt>
                      <dd>
                        97,63<span>%</span>
                      </dd>
                    </div>
                    <div>
                      <dt>Dice macro · segmentos</dt>
                      <dd>
                        81,56<span>%</span>
                      </dd>
                    </div>
                  </dl>
                  <p className="metric-context">
                    Resultados en el conjunto de test. Evaluación externa en
                    seis casos clínicos.
                  </p>
                  <div className="project-actions">
                    <button
                      className="text-link"
                      onClick={() => setActiveProject(featured)}
                    >
                      Ver el caso completo
                      <ArrowRight size={18} />
                    </button>
                    <a
                      className="icon-button"
                      aria-label="Abrir código de segmentación en GitHub"
                      href={featured.links![0].href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitFork size={21} />
                    </a>
                  </div>
                </div>
                <figure className="featured-figure">
                  <button
                    onClick={() => setActiveProject(featured)}
                    aria-label="Ampliar resultado y ver el proyecto de segmentación"
                  >
                    <img
                      src={asset("resultado-test.png")}
                      alt="Resultado de segmentación en una tomografía de test: la referencia manual se compara con la predicción de Couinaud."
                      width="2048"
                      height="947"
                      loading="lazy"
                    />
                    <span className="figure-expand">
                      <ExternalLink size={16} />
                      Ver detalle
                    </span>
                  </button>
                  <figcaption>
                    Tomografía del conjunto de test · referencia manual y
                    predicción de segmentos de Couinaud.
                  </figcaption>
                </figure>
              </AnimatedContent>
            )}
            <div className="project-grid">
              {selected
                .filter((project) => project.id !== "segmentacion")
                .map((project, index) => (
                  <SpotlightCard
                    as="article"
                    className={`project-card project-${project.id}`}
                    key={project.id}
                    reveal
                    delay={index * 0.045}
                  >
                    <div className="card-top">
                      <span className="eyebrow">
                        {project.number} / {project.category} · 2026
                      </span>
                      <ArrowUpRight size={21} aria-hidden="true" />
                    </div>
                    {project.images?.length ? (
                      <button
                        className="project-thumbnail"
                        onClick={() => setActiveProject(project)}
                        aria-label={`Ver imágenes de ${project.title}`}
                      >
                        <img
                          src={asset(project.images[0].src)}
                          alt={project.images[0].alt}
                          width={project.images[0].width}
                          height={project.images[0].height}
                          loading="lazy"
                        />
                        <span className="thumbnail-expand" aria-hidden="true">
                          <ExternalLink size={14} />
                        </span>
                      </button>
                    ) : (
                      <div className="project-word-art" aria-hidden="true">
                        <span>
                          ML<span className="art-dot">.</span>
                        </span>
                        <span className="art-small">41 clases</span>
                      </div>
                    )}
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <ProjectPipeline steps={project.pipeline} />
                    <Tags tags={project.tags} />
                    <button
                      className="text-link card-link"
                      onClick={() => setActiveProject(project)}
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
            <div className="section-top">
              <span className="eyebrow">
                <span className="section-number">02</span> EXPERIENCIA
              </span>
              <span className="section-aside">TECNOLOGÍA EN EL MUNDO REAL</span>
            </div>
            <div className="experience-layout">
              <AnimatedContent className="experience-intro" distance={40}>
                <h2 id="experience-title">
                  Primero,
                  <br />
                  <em>el problema real.</em>
                </h2>
                <p>
                  Mi experiencia en servicio técnico e ingeniería clínica me
                  enseñó a trabajar con equipos, procesos y documentación en
                  entornos de salud.
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
                    <div className="timeline-marker" aria-hidden="true">
                      0{index + 1}
                    </div>
                    <div>
                      <p className="eyebrow timeline-period">{item.period}</p>
                      <h3>{item.company}</h3>
                      <p className="timeline-role">{item.role}</p>
                      <p className="timeline-description">{item.description}</p>
                      <Tags tags={item.tags} />
                    </div>
                  </AnimatedContent>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          className="about-section section"
          id="sobre-mi"
          aria-labelledby="about-title"
        >
          <div className="container">
            <div className="section-top">
              <span className="eyebrow">
                <span className="section-number">03</span> SOBRE MÍ
              </span>
              <span className="section-aside">
                UNA FORMACIÓN, VARIAS FORMAS DE APORTAR
              </span>
            </div>
            <FadeContent className="about-layout">
              <h2 id="about-title">
                Ingeniería con
                <br />
                <em>mirada de datos.</em>
              </h2>
              <div className="about-copy">
                <p className="about-lead">
                  Me gusta entender un problema y llevarlo a algo que funcione.
                  En mi tesis desarrollé modelos de deep learning para segmentar
                  el hígado en tomografías; en otros proyectos trabajé con
                  datos clínicos, indicadores y visualizaciones.
                </p>
                <p>
                  Busco oportunidades en tecnología médica, servicio técnico,
                  calidad y funciones de datos e IA, tanto en salud como en
                  otros sectores. También me interesa seguir desarrollándome en
                  el área regulatoria.
                </p>
                <p>
                  Mi forma de trabajar combina criterio técnico, análisis y
                  documentación: entender el problema, desarrollar una solución
                  y explicar sus resultados.
                </p>
              </div>
            </FadeContent>
            <AnimatedContent className="education-row" distance={30}>
              <div className="education-label">
                <span className="eyebrow">FORMACIÓN</span>
                <span>Aprender y aplicar.</span>
              </div>
              <div>
                <span className="education-status">GRADUADO · 2026</span>
                <h3>Ingeniería Biomédica</h3>
                <p>Universidad Nacional de Córdoba</p>
              </div>
              <div>
                <span className="education-status">
                  EN CURSO · FIN PREVISTO NOV. 2026
                </span>
                <h3>Diplomatura en Data Science</h3>
                <p>Mundos E + Universidad Nacional de Córdoba</p>
              </div>
            </AnimatedContent>
          </div>
        </section>
        <section
          className="contact-section section"
          id="contacto"
          aria-labelledby="contact-title"
        >
          <div className="container">
            <div className="section-top">
              <span className="eyebrow">
                <span className="section-number">04</span> CONTACTO
              </span>
              <span className="availability">
                <span aria-hidden="true" />
                Disponible para oportunidades
              </span>
            </div>
            <FadeContent className="contact-heading">
              <h2 id="contact-title">
                ¿Trabajamos
                <br />
                <em>juntos?</em>
              </h2>
              <p>
                Si buscás un perfil que combine ingeniería biomédica y datos,
                conversemos. Podés escribirme o llamarme directamente.
              </p>
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
      <ProjectDialog
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}
