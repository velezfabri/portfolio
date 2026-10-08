# Diseño del portfolio

## Objetivo y dirección

Portfolio de ingeniería biomédica, datos e IA para personas que contratan o colaboran en proyectos. Lenguaje editorial, tipografía grande y movimiento que conecta la presentación con el trabajo. CSS nativo y GSAP; se conserva la identidad del portfolio anterior.

Lectura de Taste Skill: portfolio técnico con una presentación personal y una experiencia memorable, sin esconder la evidencia de los proyectos. `DESIGN_VARIANCE: 7`, `MOTION_INTENSITY: 7`, `VISUAL_DENSITY: 4`. Se preserva la identidad, se agrupa el contenido personal y se concentra el movimiento en la historia del proyecto y la respuesta a las acciones.

## Identidad

- Modo inicial oscuro: fondo `#101714`, texto `#edf4ee`, acento verde `#9bdbac` y superficies `#152019`.
- Modo claro opcional: fondo `#f5f3ed`, tinta `#183a3d` y acento `#087665`. La elección se guarda localmente.
- Las secciones, incluido contacto, conservan el tema activo. Las capturas y fotos muestran sus colores originales.
- Manrope local para todos los títulos, subtítulos y cuerpo. Geist Pixel Square se usa exclusivamente en un párrafo de transición, adaptado del componente que pidió el usuario. Las palabras «ingeniería» y «datos» mantienen Manrope.
- Botones y filtros redondeados; imágenes y superficies con radio de 12 px. Sin sombras añadidas al hover.
- Fotos y capturas reales, con leyendas que describen su origen. No se generan capturas o proyectos ficticios.

## Recorrido

1. **Entrada interactiva:** botón para iniciar el recorrido. El menú permite entrar a una sección directamente; el CV funciona desde esta pantalla. La entrada se recuerda durante la sesión.
2. **Presentación, una sola sección:** nombre, foto, biografía, formación y habilidades técnicas. Contenedor de 1080 px para centrar la composición; separación texto/foto de 48 px. Las herramientas abren casos concretos o enlazan a la experiencia.
3. **Proyectos:** segmentación hepática primero; después reingresos hospitalarios, ENFR 2018 e incendios de Córdoba. Los filtros conservan los controles legibles en ambos temas.
4. **Segmentación al bajar:** cinco capítulos siguen las escenas reales del video. En escritorio amplio, la visualización permanece a un lado y el scroll controla el tiempo del video. CSS sticky y GSAP, sin bloquear el scroll. En pantallas pequeñas hay botones para elegir etapas; movimiento reducido muestra todas las descripciones.
5. **Experiencia profesional:** instituciones y tareas en desplegables, con enlace al CV.
6. **Contacto:** correo, copia de dirección, teléfono, LinkedIn, GitHub y CV.

## Movimiento

- Nombre: `stagger` de 0,07 segundos; duración de cada letra 0,8 segundos. Se controla en `src/motion-settings.ts`.
- Feedback de botones: traslación y presión breves; flechas con un pequeño impulso. CSS en `src/journey.css`.
- Video: original de 20 segundos con audio, reproducible bajo acción del usuario. Copia 720p sin audio y con fotogramas clave cada 0,5 segundos para los cambios de posición al bajar. Colores e imágenes originales conservados.
- El reproductor completo abre en un diálogo nativo y se pausa al cerrar. Tiene controles y descripciones VTT en español.
- Comparación entre referencia y predicción conservada en un desplegable. El slider es nativo y operable con mouse, touch y teclado.
- GSAP usa matchMedia y limpieza de efectos. No se registra un manejador continuo de scroll en React; el estado cambia únicamente al pasar de capítulo.
- Todo contenido y todo control permanece disponible con movimiento reducido; la historia usa un flujo estático.
- La tipografía pixelada queda integrada al final de la presentación. `Statement.tsx` y `Areas.tsx` se conservan como referencias de la versión anterior, pero no se montan como etapas separadas.

## Herramientas y referencias

Se usaron `design-taste-frontend` y UI/UX Pro Max para revisar jerarquía, repetición de composiciones, accesibilidad y movimiento. La consulta UUPM `biomedical AI portfolio editorial scroll storytelling` recomendó minimalismo, CTA en inicio y cierre, foco y contraste. Se conservaron Manrope y la paleta verde en lugar de sustituirlos por las recomendaciones automáticas.

El archivo `DESIGN.md` del usuario aportó escala tipográfica, espacio y controles redondeados. Darpan Jain aportó la idea de hacer explorable el trabajo técnico; Mitchell Sparrow, la combinación de relato personal y proyectos. Cult UI aportó la mezcla de tipografía pixelada y normal. Las fuentes y licencias están en `THIRD_PARTY.md`; el análisis está en `docs/analisis-frontend.md`.

## Límites de contenido

Conservar el PDF original y el contenido documentado. No inventar trabajos, clientes, certificaciones, URLs, niveles de inglés o validación clínica. Las métricas Dice y la exactitud del clasificador conservan el contexto de evaluación. Git/GitHub y 3D Slicer pertenecen a Datos e IA; el equipamiento hospitalario pertenece a Tecnología médica.
