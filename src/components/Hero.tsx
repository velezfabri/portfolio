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
import { profile } from "../content";

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
        <p className="eyebrow hero-kicker">INGENIERO BIOMÉDICO</p>
        <h1 id="hero-title">
          Fabricio
          <br />
          Velez<span className="name-period">.</span>
        </h1>
        <p className="hero-intro">
          Tecnología médica.
          <br />
          <span>Soluciones con datos.</span>
        </p>
        <p className="hero-description">
          Combino experiencia en servicio técnico y calidad con proyectos de
          ciencia de datos e inteligencia artificial aplicada a salud.
        </p>
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
        </div>
      </div>
      <figure className="hero-portrait">
        <div className="portrait-topline">
          <span className="eyebrow">
            FORMACIÓN EN SALUD. MIRADA TECNOLÓGICA.
          </span>
          <ArrowUpRight size={20} aria-hidden="true" />
        </div>
        <div className="portrait-frame">
          <img
            src={`${import.meta.env.BASE_URL}images/fabricio-velez-graduacion.jpg`}
            alt="Fabricio Velez en su graduación, frente a la facultad, con la banda de ingeniero."
            width="960"
            height="1280"
            fetchPriority="high"
          />
        </div>
        <figcaption>
          <span>
            Ingeniería Biomédica<strong>Universidad Nacional de Córdoba</strong>
          </span>
          <span className="portrait-caption-note">
            Una base técnica.
            <br />
            Muchas formas de aportar.
          </span>
        </figcaption>
      </figure>
      <div className="hero-bottom">
        <span>
          SERVICIO TÉCNICO <i>·</i> CALIDAD <i>·</i> DATOS & IA
        </span>
        <a href="#proyectos">
          Conocé mi trabajo
          <ArrowDown size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
