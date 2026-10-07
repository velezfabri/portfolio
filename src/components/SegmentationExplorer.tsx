import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const stages = [
  { name: "Tomografía", title: "El punto de partida: una imagen médica.", text: "El proyecto trabaja con tomografías 3D. Cada volumen aporta la información anatómica que reciben las redes de segmentación." },
  { name: "Hígado", title: "Primero, identificar el órgano.", text: "La primera 3D U-Net segmenta el hígado. Su resultado da paso a la segunda red de la cascada." },
  { name: "Couinaud", title: "Después, distinguir sus ocho segmentos.", text: "La segunda 3D U-Net identifica los segmentos de Couinaud. Las regiones de color permiten comparar la referencia manual con la predicción." },
  { name: "Evaluación", title: "Medir, visualizar y explicar.", text: "Evalué la segmentación con Dice en el conjunto de test y en seis casos externos. Utilicé 3D Slicer para visualizar imágenes médicas." },
];

export function SegmentationExplorer() {
  const [stage, setStage] = useState(2);
  const compareRef = useRef<HTMLDivElement>(null);
  const image = `${import.meta.env.BASE_URL}images/resultado-test.png`;
  return (
    <div className="segmentation-explorer">
      <figure className="comparison-figure">
        <div className="comparison-labels" aria-hidden="true">
          <span>Referencia manual</span><span>Predicción del modelo</span>
        </div>
        <div className="comparison-view" ref={compareRef} aria-hidden="true">
          <div className="comparison-crop comparison-prediction"><img src={image} alt="" width="2048" height="947" loading="lazy" /></div>
          <div className="comparison-reference"><div className="comparison-crop"><img src={image} alt="" width="2048" height="947" loading="lazy" /></div></div>
          <span className="comparison-divider"><span><ArrowRight size={18} /></span></span>
        </div>
        <label className="comparison-control">
          <span>Deslizá para comparar</span>
          <input type="range" min="0" max="100" defaultValue="50" aria-label="Porcentaje de referencia manual visible en la comparación con la predicción"
            onInput={(event) => compareRef.current?.style.setProperty("--compare", `${event.currentTarget.value}%`)} />
        </label>
        <figcaption>
          Mismo corte del conjunto de test: referencia manual y predicción de
          segmentos de Couinaud. La imagen completa y su leyenda están en el detalle del caso.
        </figcaption>
      </figure>
      <div className="explorer-process">
        <p className="process-label">Explorá cómo lo hice</p>
        <div className="explorer-steps" role="group" aria-label="Elegir etapa del proyecto de segmentación">
          {stages.map((item, index) => (
            <button key={item.name} aria-pressed={stage === index} aria-controls="segmentation-stage" onClick={() => setStage(index)}>
              {item.name}
            </button>
          ))}
        </div>
        <div className="explorer-description" id="segmentation-stage" aria-live="polite" aria-atomic="true">
          <div key={stage} className="explorer-description-content">
            <h4>{stages[stage].title}</h4>
            <p>{stages[stage].text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
