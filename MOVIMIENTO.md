# Editar movimiento y distribución

La página tiene una entrada por click y luego presentación, proyectos, experiencia y habilidades. Contacto cierra el recorrido. Los componentes de React Bits ya adaptados siguen siendo la base de las entradas y del nombre; Cult UI aporta el párrafo tipográfico integrado a la presentación. El video actual vive directamente en ProjectDialog; SegmentationStory y sus ajustes de scroll quedan como referencia sin montar.

## Valores principales

En `src/motion-settings.ts`, los tiempos de GSAP se expresan en segundos y las distancias en píxeles.

| Campo | Actual | Qué cambia |
| --- | --- | --- |
| `name.stagger` | `0.07` | Tiempo entre el inicio de una letra y la siguiente. Antes era `0.026`. |
| `name.duration` | `0.8` | Duración de la entrada de cada letra. |
| `name.distance` | `28` | Desplazamiento vertical inicial de las letras. |
| `name.surnameDelay` | `0.22` | Espera inicial del apellido. |
| `welcome.duration` | `0.34` | Salida de la pantalla inicial después del click. |
| `reveal.duration` | `0.7` | Entrada de bloques al bajar. |
| `reveal.distance` | `32` | Desplazamiento por defecto; algunos componentes pasan una distancia específica. |
| `portrait.distance` | `-18` | Movimiento total de la foto al dejar el inicio. |
| `story.scrub` | `0.25` | Suavizado del seguimiento del scroll. No es la duración total del relato. |
| `story.start`, `story.end` | `top 35%`, `bottom 65%` | Relación entre los capítulos y el viewport para empezar y terminar el video. |

`src/segmentation-chapters.ts` contiene las cinco descripciones utilizadas en el detalle. `src/components/SegmentationStory.tsx` conserva su guion histórico. Allí están nombres, textos, tiempos de comienzo y posiciones que se muestran al pulsar los botones. Las escenas del original cambian a los 3,1; 7,5; 10 y 14 segundos. Se reparte el scroll por capítulos y después se convierte a los tiempos respectivos del video.

## CSS

`src/journey.css` se importa al final. Sus reglas tienen prioridad sobre las versiones previas cuando coinciden en especificidad.

| Regla o variable | Actual | Qué cambia |
| --- | --- | --- |
| `.hero` `max-width` | `1080px` | Centrado del conjunto; el texto queda más a la derecha que con 1200 px. |
| `--hero-gap` | `48px` | Separación texto/foto en escritorio. Hay ajustes menores en tablet. |
| `.hero h1` | `clamp(78px, 8.8vw, 124px)` | Mínimo, tamaño según ancho de pantalla y máximo del nombre. |
| `--section-space` | `96px` | Espacio vertical de las secciones; 78/64 px en pantallas menores. |
| `.story-chapter` `min-height` | `54dvh` | Recorrido de scroll por capítulo en escritorio. Bajar a 42dvh lo acorta; subirlo a 65dvh lo alarga. |
| `.story-media` `top` | `110px` | Distancia al borde superior mientras permanece visible. |
| `--feedback-time` | `320ms` | Respuesta de hover de los botones nuevos. |
| `--feedback-ease` | curva Bézier | Intensidad de la sensación elástica. |
| `arrow-response` | `380ms`, desplazamiento 5/-3 px | Impulso breve de las flechas. |

El recorrido actual no controla el tiempo del video con scroll. La cuadrícula usa dos columnas y gap de 24 px; debajo de 768 px, una columna y gap de 20 px. ProjectDialog limita su altura a 92dvh (94dvh móvil), tiene cabecera sticky y un solo scroll. El video intenta play() muteado después de abrir; movimiento reducido deja el poster y controles para reproducción voluntaria. Los parámetros story de la tabla son históricos y no afectan la galería actual.

La primera entrada se recuerda por pestaña en `sessionStorage`. Para revisar nuevamente la pantalla de entrada, usar una nueva sesión o borrar la clave `fabricio-portfolio-entered` desde las herramientas del navegador.

Ejemplos de pedidos: «stagger 0,10», «gap texto/foto 32 px», «gap de tarjetas 20 px», «botones más rápidos: 220ms».
