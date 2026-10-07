# Diseño del portfolio

## Objetivo

Quien llega desde LinkedIn debe reconocer a Fabricio como ingeniero biomédico, abrir el CV y GitHub desde el inicio, encontrar evidencia de sus habilidades y escribirle o llamarlo.

## Dirección visual

La referencia de Juan Pablo Rojo se estudió en su HTML y CSS: utiliza fondo oscuro, títulos grandes, fotografía integrada, proyectos con contexto y pipelines técnicos. Esta versión aplica esas ideas al contenido propio de Fabricio, sin reutilizar fotos, premios, agencias o trabajos del colega.

- Modo inicial oscuro: fondo `#101714`, texto `#edf4ee`, acento verde `#9bdbac` y superficies `#152019`.
- Modo claro opcional: conserva el fondo cálido `#f5f3ed`, la tinta `#183a3d` y el acento `#087665` de la primera versión. La elección se guarda localmente.
- Una sola familia, Manrope, para nombre, títulos, subtítulos y cuerpo. Fuente local.
- Presentación centrada en el título profesional; nombre visible en la cabecera y en el inicio.
- Presentación en primera persona: 24 años, origen en Ushuaia, mudanza a Córdoba a los 17, graduación en junio de 2026 y diplomatura en Ciencia de Datos en curso. Inglés, jiu-jitsu y gimnasio aparecen como detalles personales, sin atribuir niveles o certificaciones.
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

### Actualización de movimiento y presentación

Se leyeron las instrucciones instaladas de UI/UX Pro Max y se consultaron `scroll reveal stagger` (GSAP), `dark selected button contrast` (UX) y `animation effect cleanup` (React). Se contrastaron con la documentación oficial de GSAP y React. La referencia de Juan Pablo se volvió a revisar en el navegador, especialmente su presentación personal junto a la fotografía y la secuencia de secciones.

- Entradas de títulos, caso destacado, tarjetas, experiencia y formación con desplazamiento y opacidad. Los encabezados vuelven a animarse al regresar desde el inicio.
- Separador entre perfil y proyectos con línea ligada al scroll; barra superior que indica el avance por la página.
- Desplazamiento suave de la fotografía con el scroll solo en escritorio, sin bloquear ni reemplazar el desplazamiento nativo.
- Zoom en fotografías y capturas, elevación de tarjetas y respuesta de flechas y botones al mouse. Las acciones por teclado y táctiles mantienen su respuesta propia.
- Transición breve al filtrar proyectos, abrir un caso y cambiar una imagen de la galería. Las alturas se recalculan al filtrar.
- Selección de filtros con `--accent` y `--on-accent`, definidos para ambos temas. Se elimina la combinación de fondo claro y letras blancas del modo oscuro.
- El movimiento reducido omite los efectos de entrada, zoom y parallax; el contenido permanece visible. El foco por teclado finaliza la entrada del contenedor antes de interactuar.
- Los efectos se limpian al desmontar componentes, incluido el doble montaje de React StrictMode. No se añadieron dependencias.

## Límites de contenido

Conservar el PDF original. No inventar trabajos, premios, clientes, certificaciones, experiencia regulatoria o URLs. Git/GitHub y 3D Slicer pertenecen a Datos e IA. Lámparas cialíticas, monitores multiparamétricos y sillones odontológicos pertenecen a Tecnología médica.
