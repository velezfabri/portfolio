import { ArrowRight } from "lucide-react";

export function ProjectPipeline({ steps }: { steps: string[] }) {
  return (
    <div className="project-pipeline">
      <span className="eyebrow">DEL DATO AL RESULTADO</span>
      <ol aria-label="Etapas del proyecto">
        {steps.map((step, index) => (
          <li key={step}>
            {index > 0 && <ArrowRight size={13} aria-hidden="true" />}
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
