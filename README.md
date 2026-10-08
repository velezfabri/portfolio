# Fabricio Velez — Portfolio

Portfolio de un ingeniero biomédico, con experiencia en servicio técnico y calidad y proyectos de datos e IA. El CV, GitHub y contacto están disponibles desde el inicio; los casos muestran imágenes, herramientas, aportes y resultados de cada proyecto.

React + TypeScript + Vite. Sitio estático, sin servidor, base de datos ni variables de entorno. Tipografía Manrope alojada con la web, iconos Lucide y SplitText, AnimatedContent, SpotlightCard y FadeContent de React Bits, adaptados con GSAP.

## Desarrollo de la versión portable

Requisitos: Node.js 22.13 o superior y npm.

```sh
npm ci
npm run dev
```

## Verificación y compilación

```sh
npm run typecheck
npm run build
```

La salida de producción queda en `dist/`. La navegación usa anclas y los casos de proyecto se abren en un diálogo nativo. El CV abre directamente como PDF.

## Actualizar el sitio publicado

Repositorio: [velezfabri/portfolio](https://github.com/velezfabri/portfolio). Página: [portfolio-six-navy-88.vercel.app](https://portfolio-six-navy-88.vercel.app/).

Para subir esta actualización desde GitHub y mantener el proyecto de Vercel existente: [docs/ACTUALIZAR.md](docs/ACTUALIZAR.md).

## Publicar

Subir el **contenido de la carpeta**, incluido `package-lock.json`, a GitHub e importar el repositorio en Vercel. El archivo `vercel.json` configura Vite, `npm ci`, `npm run build` y `dist`.

Pasos completos para GitHub, Vercel y LinkedIn: [docs/DEPLOY.md](docs/DEPLOY.md).

## Editar

| Archivo                            | Contenido                                                  |
| ---------------------------------- | ---------------------------------------------------------- |
| `src/content.ts`                   | Contacto, proyectos, experiencia y competencias            |
| `src/components/Hero.tsx`          | Presentación, foto y accesos directos                      |
| `src/components/ProjectDialog.tsx` | Casos y galería de imágenes                                |
| `src/components/FadeContent.tsx`   | Entrada animada con movimiento reducido                    |
| `src/components/PageMotion.tsx`    | Avance por la página, parallax y separador al hacer scroll  |
| `src/motion.css`                   | Efectos de mouse, transiciones y movimiento reducido       |
| `src/styles.css`                   | Tipografía, encuadre de foto y diseño responsive           |
| `public/cv/Fabricio_Velez_CV.pdf`  | CV original elegido por el usuario                         |
| `docs/design-system.md`            | Decisiones de diseño y límites de contenido                |
| `AGENTS.md`                        | Contexto para futuras ediciones con un asistente de código |

## Recursos y referencias

La foto de graduación y el PDF se conservan sin modificar. Las imágenes de proyectos proceden de los repositorios de Fabricio:

- [Segmentación de hígado y Couinaud](https://github.com/velezfabri/PI-Velez-Final).
- [Dashboard de reingresos](https://github.com/velezfabri/Reingresos-hospitales-Dashboard/blob/main/images/dashboard.png): vista estática recreada para documentación, según el repositorio original.
- [Incendios Córdoba](https://github.com/velezfabri/Incendios-Cordoba): visualización estática creada con los polígonos y detecciones publicados en ese repositorio.
- [ENFR 2018](https://github.com/velezfabri/dashboard-enfr-2018/tree/main/docs/images): mapa, resumen y comparaciones de la aplicación.

Las métricas incluyen contexto de evaluación. Las referencias de diseño y las licencias se documentan en [THIRD_PARTY.md](THIRD_PARTY.md).

El checkout de revisión conserva la integración de Sites. `scripts/export-vercel.mjs` genera una copia independiente con las dependencias necesarias para Vercel y excluye la identidad y los archivos internos del alojamiento de revisión.

## Recorrido interactivo y video

Una entrada por click inicia la presentación: foto, biografía y formación. Después vienen segmentación, dashboard de reingresos, ENFR e incendios de Córdoba; luego la experiencia profesional, las habilidades aplicadas y el contacto.

Los cuatro proyectos comparten una cuadrícula 2×2 con filtros y una acción accesible por tarjeta. El video original de segmentación aparece directamente al abrir su caso e intenta reproducción muteada. Con movimiento reducido espera la acción del visitante. Conserva controles, VTT, descripciones y comparación; otros casos muestran sus imágenes originales. Las herramientas de habilidades enlazan a casos o experiencia, y una sola nota documenta el aprendizaje autodidacta en agentic engineering. La versión original y su ZIP editable se conservan. Ver [docs/VIDEO.md](docs/VIDEO.md) para futuras revisiones y los insumos necesarios.

Los valores de animación están centralizados en `src/motion-settings.ts`; el diseño nuevo está en `src/journey.css`. [docs/MOVIMIENTO.md](docs/MOVIMIENTO.md) explica los controles de velocidad, stagger, tamaño y espacio. [docs/ACTUALIZAR.md](docs/ACTUALIZAR.md) explica cómo actualizar GitHub/Vercel.
