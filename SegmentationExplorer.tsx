import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export function SegmentationExplorer() {
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

    </div>
  );
}
