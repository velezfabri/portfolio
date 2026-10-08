import { ArrowUpRight, FileText, GitFork, MessageCircle, Phone } from "lucide-react";
import { introduction, profile } from "../content";
import { SplitText } from "./SplitText";
import { AnimatedContent } from "./AnimatedContent";
import { PixelParagraphInverse } from "./PixelParagraphInverse";
import { motionSettings } from "../motion-settings";

export function Hero() {
  return (
    <section className="hero container" id="inicio" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-kicker">Ingeniería biomédica + datos + IA</p>
        <h1 id="hero-title" tabIndex={-1}>
          <span className="sr-only">Fabricio Velez.</span>
          <SplitText text="Fabricio" />
          <br />
          <SplitText text="Velez." delay={motionSettings.name.surnameDelay} className="hero-title-accent" />
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
          <a className="button button-outline" href={profile.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Escribime por WhatsApp">
            <MessageCircle size={18} aria-hidden="true" />
            Escribime
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="hero-direct-contact">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <GitFork size={16} aria-hidden="true" /> Mi GitHub
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a href={profile.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label={`Escribime por WhatsApp al ${profile.phone}`}>
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
      <AnimatedContent className="hero-story" distance={24} id="sobre-mi">
        <h2>De Ushuaia <br />a Córdoba.</h2>
        <div className="hero-biography">
          <p>{introduction.origin}</p>
          <p>{introduction.learning}</p>
          <p className="personal-note">
            También hablo inglés, entreno jiu-jitsu y voy al gimnasio.
          </p>
        </div>
      </AnimatedContent>
      <div className="hero-education" aria-label="Formación académica">
        <div><span>Graduado en junio de 2026</span><h3>Ingeniería Biomédica</h3><p>Universidad Nacional de Córdoba</p></div>
        <div><span>En curso</span><h3>Diplomatura en Data Science</h3><p>Mundos E + Universidad Nacional de Córdoba</p></div>
      </div>
      <AnimatedContent className="hero-transition" distance={16}>
        <PixelParagraphInverse text="De la curiosidad a los proyectos." plainWords={["proyectos."]} />
      </AnimatedContent>
    </section>
  );
}
