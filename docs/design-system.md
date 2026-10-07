# Diseño del portfolio

## Objetivo y dirección

Portfolio de ingeniería biomédica, datos e IA para personas que contratan o colaboran en proyectos. Lenguaje editorial, tipografía grande y movimiento que conecta la presentación con el trabajo. CSS nativo y GSAP; se conserva la identidad del portfolio anterior.

Lectura de Taste Skill: portfolio técnico con una presentación personal y una experiencia memorable, sin esconder la evidencia de los proyectos. `DESIGN_VARIANCE: 8`, `MOTION_INTENSITY: 8`, `VISUAL_DENSITY: 3`. La variación permite composiciones distintas; el movimiento se concentra en un capítulo de scroll y en respuestas de interacción; la densidad baja permite leer rápidamente.

## Identidad

- Modo inicial oscuro: fondo `#101714`, texto `#edf4ee`, acento verde `#9bdbac` y superficies `#152019`.
- Modo claro opcional: fondo `#f5f3ed`, tinta `#183a3d` y acento `#087665`. La elección se guarda localmente.
- Las secciones, incluido contacto, conservan el tema activo. Las capturas y fotos muestran sus colores originales.
- Manrope local para todos los títulos, subtítulos y cuerpo. Geist Pixel Square se usa exclusivamente en un párrafo de transición, adaptado del componente que pidió el usuario. Las palabras «ingeniería» y «datos» mantienen Manrope.
- Botones y filtros redondeados; imágenes y superficies con radio de 12 px. Sin sombras añadidas al hover.
- Fotos y capturas reales, con leyendas que describen su origen. No se generan capturas o proyectos ficticios.

## Recorrido

1. **Presentación:** nombre grande, título profesional y una frase de valor. CV, correo, teléfono y GitHub accesibles desde el inicio. La fotografía original acompaña la primera vista.
2. **Historia personal, en la primera sección:** 24 años, Ushuaia, mudanza a Córdoba a los 17, graduación en junio de 2026, diplomatura en curso, inglés, jiu-jitsu y gimnasio.
3. **Transición pixelada:** un breve párrafo se revela palabra por palabra con el scroll. En escritorio de al menos 1024 px y 700 px de alto, el bloque se fija durante una distancia equivalente al 65 % del viewport. Se conserva el scroll nativo. En pantallas menores, permanece en el flujo normal.
4. **Áreas:** datos e IA ocupan una superficie mayor; tecnología médica y calidad complementan el perfil. Se conservan las herramientas originales.
5. **Proyectos:** un caso destacado, dos proyectos con capturas y un proyecto educativo con cifras documentadas. Filtros y detalles siguen disponibles.
6. **Experiencia:** recorrido por instituciones con tareas en desplegables nativos. CV completo enlazado.
7. **Formación:** título y diplomatura, con su estado documentado.
8. **Contacto:** título grande, botón de correo, dirección copiable, teléfono, LinkedIn, GitHub y descarga del CV.

## Interacciones y movimiento

- `SplitText` revela el nombre al entrar; las acciones principales no esperan su finalización.
- `AnimatedContent`, `FadeContent` y `SpotlightCard` mantienen entradas suaves y revelado inmediato al recibir foco.
- `Statement` usa `gsap.matchMedia` para adaptar el capítulo de scroll y limpiar efectos en cambios de breakpoint y desmontaje.
- La comparación hepática usa un `input type="range"` nativo, operable con mouse, touch y teclado. Un cambio de variable CSS mueve la separación entre referencia y predicción; no provoca renderizados continuos de React.
- Los dos cortes se muestran mediante encuadre CSS de la misma imagen original, a la misma escala. El archivo completo, con etiquetas y leyenda de Couinaud, continúa disponible en el detalle del caso.
- Cuatro botones permiten leer las etapas de la cascada de segmentación. Son una explicación del trabajo realizado; no ejecutan inferencia sobre nuevas imágenes.
- Hover en fotos, capturas, tarjetas, flechas y CTA de contacto. Foco visible y controles de al menos 44 px.
- Cambios de filtro y de etapa tienen transiciones breves. El alto del texto de etapas reserva espacio en móvil.
- Los filtros y desplegables recalculan las posiciones de ScrollTrigger.
- Movimiento reducido: sin fijado de la transición, parallax, animación de palabras ni entradas animadas. Todo el contenido permanece visible y los controles funcionan.

## Herramientas y referencias

Se usaron `design-taste-frontend` y UI/UX Pro Max para revisar jerarquía, repetición de composiciones, accesibilidad y movimiento. La consulta UUPM `biomedical AI portfolio editorial scroll storytelling` recomendó minimalismo, CTA en inicio y cierre, foco y contraste. Se conservaron Manrope y la paleta verde en lugar de sustituirlos por las recomendaciones automáticas.

El archivo `DESIGN.md` del usuario aportó escala tipográfica, espacio y controles redondeados. Darpan Jain aportó la idea de hacer explorable el trabajo técnico; Mitchell Sparrow, la combinación de relato personal y proyectos. Cult UI aportó la mezcla de tipografía pixelada y normal. Las fuentes y licencias están en `THIRD_PARTY.md`; el análisis está en `docs/analisis-frontend.md`.

## Límites de contenido

Conservar el PDF original y el contenido documentado. No inventar trabajos, clientes, certificaciones, URLs, niveles de inglés o validación clínica. Las métricas Dice y la exactitud del clasificador conservan el contexto de evaluación. Git/GitHub y 3D Slicer pertenecen a Datos e IA; el equipamiento hospitalario pertenece a Tecnología médica.
