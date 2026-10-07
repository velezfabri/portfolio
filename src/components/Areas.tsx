import { ArrowRight } from "lucide-react";
import { capabilities } from "../content";
import { AnimatedContent } from "./AnimatedContent";
import { SpotlightCard } from "./SpotlightCard";
import { Tags } from "./Tags";

export function Areas() {
  return (
    <section
      className="areas-section section"
      id="areas"
      aria-labelledby="areas-title"
    >
      <div className="container">
        <div className="areas-heading">
          <div>
            <p className="eyebrow">PERFIL TÉCNICO / TRES FORMAS DE APORTAR</p>
            <h2 id="areas-title">Salud, datos y procesos.</h2>
          </div>
          <a className="text-link" href="#experiencia">
            Ver mi experiencia
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="areas-grid">
          {capabilities.map((item, index) => (
            <AnimatedContent
              key={item.title}
              delay={index * 0.09}
              distance={30}
            >
              <SpotlightCard as="article" className="area-card">
                <span className="area-number">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Tags tags={item.tools} />
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
