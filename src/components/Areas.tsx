import { ArrowRight, Binary, Activity, ListChecks } from "lucide-react";
import { capabilities } from "../content";
import { SpotlightCard } from "./SpotlightCard";
import { AnimatedContent } from "./AnimatedContent";
import { Tags } from "./Tags";

const areas = [
  { content: capabilities[1], icon: Binary, className: "area-data" },
  { content: capabilities[0], icon: Activity, className: "area-medical" },
  { content: capabilities[2], icon: ListChecks, className: "area-quality" },
];

export function Areas() {
  return (
    <section className="areas-section section" id="areas" aria-labelledby="areas-title">
      <div className="container">
        <AnimatedContent className="areas-heading" distance={24}>
          <h2 id="areas-title">Lo que puedo aportar.</h2>
        </AnimatedContent>
        <div className="areas-grid">
          {areas.map(({ content, icon: Icon, className }, index) => (
            <SpotlightCard as="article" className={`area-card ${className}`} key={content.title} reveal delay={index * 0.06}>
              <Icon className="area-icon" size={30} strokeWidth={1.5} aria-hidden="true" />
              <h3>{content.title}</h3>
              <p>{content.text}</p>
              <Tags tags={content.tools} />
              {index === 0 && (
                <a className="text-link" href="#proyectos">
                  Ver cómo lo aplico <ArrowRight size={18} aria-hidden="true" />
                </a>
              )}
            </SpotlightCard>
          ))}
        </div>
        <a className="text-link areas-experience" href="#experiencia">
          Ver mi experiencia <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
