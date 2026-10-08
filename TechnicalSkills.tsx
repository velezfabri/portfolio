import { ArrowUpRight, Binary, Activity, BarChart3, ListChecks } from "lucide-react";
import { AnimatedContent } from "./AnimatedContent";
import { projects, type Project } from "../content";

const groups = [
  { title: "Datos y visualización", icon: BarChart3, tools: [
    { name: "Python", project: "incendios" }, { name: "R / tidyverse", project: "enfr" },
    { name: "SQL básico", project: "reingresos" }, { name: "Power BI", project: "reingresos" },
    { name: "Shiny", project: "enfr" },
  ] },
  { title: "IA e imágenes médicas", icon: Binary, tools: [
    { name: "PyTorch", project: "segmentacion" }, { name: "Deep learning", project: "segmentacion" },
    { name: "3D Slicer", project: "segmentacion" }, { name: "Git / GitHub", project: "segmentacion" },
  ] },
  { title: "Tecnología médica", icon: Activity, tools: [
    { name: "Equipamiento médico" }, { name: "Mantenimiento" }, { name: "Inventario técnico" },
  ] },
  { title: "Calidad y procesos", icon: ListChecks, tools: [
    { name: "ISO 9001" }, { name: "KPI" }, { name: "Excel" }, { name: "Documentación técnica" },
  ] },
];

export function TechnicalSkills({ onOpenProject }: { onOpenProject: (project: Project) => void }) {
  return (
    <div className="technical-skills" id="areas" aria-labelledby="skills-title">
      <AnimatedContent className="skills-heading" distance={18}>
        <h2 id="skills-title">Habilidades técnicas.</h2>
        <p>Elegí una herramienta para ver dónde la apliqué.</p>
      </AnimatedContent>
      <div className="skills-grid">
        {groups.map(({ title, icon: Icon, tools }, index) => (
          <AnimatedContent as="article" className="skill-group" key={title} distance={20} delay={index * 0.05}>
            <h3><Icon size={22} strokeWidth={1.5} aria-hidden="true" />{title}</h3>
            <ul className="skill-tools">
              {tools.map((tool) => {
                const target = "project" in tool ? projects.find(p => p.id === tool.project) : undefined;
                return (
                  <li key={tool.name}>
                    {target ? (
                      <button onClick={() => onOpenProject(target)} title={`Ver ${target.subtitle}`}>
                        {tool.name}<ArrowUpRight size={14} aria-hidden="true" />
                        <span className="sr-only">: ver aplicación en {target.subtitle}</span>
                      </button>
                    ) : <a href="#experiencia">{tool.name}<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only">: ver experiencia profesional</span></a>}
                  </li>
                );
              })}
            </ul>
          </AnimatedContent>
        ))}
      </div>
    </div>
  );
}
