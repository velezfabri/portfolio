import { ArrowUpRight, FileText, GitFork, Mail, Phone } from "lucide-react";
import { introduction, profile } from "../content";
import { SplitText } from "./SplitText";
import { AnimatedContent } from "./AnimatedContent";

export function Hero() {
  return (
    <section className="hero container" id="inicio" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-kicker">Ingeniería biomédica + datos + IA</p>
        <h1 id="hero-title">
          <span className="sr-only">Fabricio Velez.</span>
          <SplitText text="Fabricio" />
          <br />
          <SplitText text="Velez." delay={0.12} className="hero-title-accent" />
        </h1>
        <p className="hero-intro">
          Ingeniero biomédico. Conecto salud, datos e inteligencia artificial
          para resolver problemas reales.
        </p>
        <div className="hero-actions">
          <a className="button button-dark" href={profile.cv} target="_blank" rel="noopener noreferrer">
            <FileText size={18} aria-hidden="true" />
            Ver mi CV
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <a className="button button-outline" href={`mailto:${profile.email}`}>
            <Mail size={18} aria-hidden="true" />
            Escribime
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="hero-direct-contact">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <GitFork size={16} aria-hidden="true" /> Mi GitHub
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a href={profile.phoneHref}>
            <Phone size={15} aria-hidden="true" /> {profile.phone}
          </a>
        </div>
      </div>
      <AnimatedContent className="hero-visual" distance={32}>
        <figure className="hero-portrait">
          <div className="portrait-frame">
            <img
              src={`${import.meta.env.BASE_URL}images/fabricio-velez-graduacion.jpg`}
              alt="Fabricio Velez en su graduación de Ingeniería Biomédica en la Universidad Nacional de Córdoba."
              width="960" height="1280" fetchPriority="high"
            />
          </div>
          <figcaption>
            <span>Ingeniería Biomédica · UNC</span>
            <span>Junio de 2026</span>
          </figcaption>
        </figure>
      </AnimatedContent>
      <AnimatedContent className="hero-story" distance={30}>
        <h2>De Ushuaia <br />a Córdoba.</h2>
        <div className="hero-biography">
          <p>{introduction.origin}</p>
          <p>{introduction.learning}</p>
          <p className="personal-note">
            También hablo inglés, entreno jiu-jitsu y voy al gimnasio.
          </p>
        </div>
      </AnimatedContent>
    </section>
  );
}
