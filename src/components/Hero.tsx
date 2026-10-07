import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  FileText,
  GitFork,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { introduction, profile } from "../content";
import { SplitText } from "./SplitText";
import { AnimatedContent } from "./AnimatedContent";

export function Hero() {
  return (
    <section
      className="hero container"
      id="inicio"
      aria-labelledby="hero-title"
    >
      <div className="hero-copy">
        <div className="availability">
          <span aria-hidden="true" />
          Disponible para oportunidades
        </div>
        <p className="eyebrow hero-kicker">
          FABRICIO VELEZ / CÓRDOBA, ARGENTINA
        </p>
        <h1 id="hero-title">
          <span className="sr-only">Ingeniero Biomédico.</span>
          <SplitText text="Ingeniero" />
          <br />
          <SplitText
            text="Biomédico."
            delay={0.16}
            className="hero-title-accent"
          />
        </h1>
        <p className="hero-intro">
          Soy Fabricio.
          <span className="hero-intro-note"> Salud, datos y muchas ganas de aprender.</span>
        </p>
        <div className="hero-biography">
          <p className="hero-description">{introduction.origin}</p>
          <p className="hero-description">{introduction.learning}</p>
        </div>
        <ul className="personal-details" aria-label="Un poco más sobre mí">
          {introduction.interests.map((interest) => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>
        <div className="hero-actions">
          <a
            className="button button-dark"
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText size={18} aria-hidden="true" />
            Ver mi CV
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <a
            className="button button-outline"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitFork size={18} aria-hidden="true" />
            Mi GitHub
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="hero-direct-contact">
          <a href={`mailto:${profile.email}`}>
            <Mail size={16} aria-hidden="true" />
            Escribime
            <ArrowRight size={15} aria-hidden="true" />
          </a>
          <a href={profile.phoneHref}>
            <Phone size={15} aria-hidden="true" />
            {profile.phone}
          </a>
        </div>
        <div className="hero-location">
          <MapPin size={15} aria-hidden="true" />
          <span>{profile.location}</span>
          <span className="hero-location-separator" aria-hidden="true">
            /
          </span>
          <span>De {profile.origin} a Córdoba</span>
        </div>
      </div>
      <AnimatedContent className="hero-visual" delay={0.1} distance={42}>
        <figure className="hero-portrait">
          <div className="portrait-topline">
            <span className="eyebrow">UN POCO DE QUIÉN SOY</span>
            <span className="portrait-coordinate" aria-hidden="true">
              01 / FV
            </span>
          </div>
          <div className="portrait-frame">
            <img
              src={`${import.meta.env.BASE_URL}images/fabricio-velez-graduacion.jpg`}
              alt="Fabricio Velez en su graduación, frente a la facultad, con la banda de ingeniero."
              width="960"
              height="1280"
              fetchPriority="high"
            />
            <div className="portrait-overlay" aria-hidden="true" />
            <div className="portrait-label">
              <span>FABRICIO VELEZ · {profile.age} AÑOS</span>
              <strong>De Ushuaia a Córdoba.</strong>
            </div>
          </div>
          <figcaption>
            <span>
              Universidad Nacional de Córdoba
              <strong>Ingeniería Biomédica</strong>
            </span>
            <span className="portrait-caption-note">
              GRADUADO
              <br />
              <strong>JUN. 2026</strong>
            </span>
          </figcaption>
        </figure>
      </AnimatedContent>
      <div className="hero-bottom">
        <span>
          SERVICIO TÉCNICO <i>·</i> CALIDAD <i>·</i> DATOS & IA
        </span>
        <a href="#proyectos">
          Explorá mis proyectos
          <ArrowDown size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
