# Diseño del portfolio

## Objetivo

Quien llega desde LinkedIn debe reconocer a Fabricio como ingeniero biomédico, abrir el CV y GitHub desde el inicio, encontrar evidencia de sus habilidades y escribirle o llamarlo.

## Dirección visual

La referencia de Juan Pablo Rojo se estudió en su HTML y CSS: utiliza fondo oscuro, títulos grandes, fotografía integrada, proyectos con contexto y pipelines técnicos. Esta versión aplica esas ideas al contenido propio de Fabricio, sin reutilizar fotos, premios, agencias o trabajos del colega.

- Modo inicial oscuro: fondo `#101714`, texto `#edf4ee`, acento verde `#9bdbac` y superficies `#152019`.
- Modo claro opcional: conserva el fondo cálido `#f5f3ed`, la tinta `#183a3d` y el acento `#087665` de la primera versión. La elección se guarda localmente.
- Una sola familia, Manrope, para nombre, títulos, subtítulos y cuerpo. Fuente local.
- Presentación centrada en el título profesional; nombre visible en la cabecera y en el inicio.
- Foto de graduación original con encuadre por CSS, un degradado para la leyenda y datos de formación. No se modifica el archivo fotográfico.
- CV, GitHub, correo y teléfono disponibles desde el inicio; CV persistente en la cabecera móvil.
- Áreas de trabajo antes de los proyectos: tecnología médica, datos e IA, calidad y procesos.
- Casos con imágenes, etapas, herramientas, aportes y resultados documentados. Las métricas están completas desde el principio, sin contadores.
- Párrafos principales de 16 px, controles de al menos 44 px, foco visible, diálogos nativos y galerías con leyendas.

## React Bits utilizado

- `SplitText`: letras del título profesional al entrar, usando GSAP SplitText.
- `AnimatedContent`: entrada de la fotografía y de las tres áreas de trabajo.
- `SpotlightCard`: luz que sigue al cursor en las tarjetas; el texto permanece legible.
- `FadeContent`: entrada de los encabezados de proyectos y de la experiencia.

Son adaptaciones del código de React Bits, con sus fuentes y licencia en `THIRD_PARTY.md`. Usan GSAP, que ya estaba instalado en el proyecto; no requieren nuevas dependencias ni cuentas. Se añadió soporte de movimiento reducido y limpieza de efectos. El texto del título tiene una alternativa accesible completa. Las acciones principales no esperan a las animaciones.

## UI/UX Pro Max

Se ejecutó `biomedical portfolio editorial interaction` en modo design-system. El resultado recomendó minimalismo, jerarquía tipográfica, acciones en el inicio y al final, estados de interacción y comprobación de contraste. Se mantuvo la identidad verde y una sola familia tipográfica por las preferencias del usuario. UUPM es una herramienta de orientación para desarrollar el diseño, no una dependencia de la web publicada.

## Límites de contenido

Conservar el PDF original. No inventar trabajos, premios, clientes, certificaciones, experiencia regulatoria o URLs. Git/GitHub y 3D Slicer pertenecen a Datos e IA. Lámparas cialíticas, monitores multiparamétricos y sillones odontológicos pertenecen a Tecnología médica.
