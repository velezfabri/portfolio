# Fuentes, referencias y licencias

## Código y recursos utilizados

- **React Bits — FadeContent**, David Haz. Componente adaptado en `src/components/FadeContent.tsx` a una entrada de 14 px, sin desenfoque, con soporte de movimiento reducido, limpieza de efectos y revelado al recibir foco. [Fuente original](https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Animations/FadeContent/FadeContent.tsx). Licencia MIT + Commons Clause conservada en `public/licenses/ReactBits-LICENSE.md`. Se utiliza dentro de este portfolio, no como biblioteca de componentes.
- **GSAP**, dependencia de la animación. Su licencia y avisos están incluidos en el paquete oficial instalado por npm.
- **Manrope**, fuente variable de 400 a 800, alojada con la web. [Google Fonts](https://fonts.google.com/specimen/Manrope). SIL Open Font License 1.1 conservada en `public/licenses/Manrope-OFL.txt`.
- **React**, **TypeScript**, **Vite** y su plugin de React: paquetes oficiales, con sus licencias incluidas en la instalación.
- **Lucide**, iconos. Licencia ISC del paquete oficial.

## Referencias de diseño y proceso

Estas referencias se consultaron para tomar decisiones; no se copiaron datos personales, imágenes ni proyectos de sus autores.

- [Portfolio de Juan Pablo Rojo](https://jpr-web-mu.vercel.app/es): presentación personal, fotografía y casos con evidencia del trabajo.
- [Tim Baker](https://timbaker.me/): acceso al CV y organización del portfolio.
- [Anthropic: frontend aesthetics](https://github.com/anthropics/claude-cookbooks/blob/main/coding/prompting_for_frontend_aesthetics.ipynb): decisiones explícitas de tipografía, color y movimiento.
- [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill): se ejecutó la consulta `biomedical portfolio minimal editorial` en modo design-system; se adoptaron minimalismo, jerarquía y controles accesibles, manteniendo la paleta y la tipografía única elegidas para este perfil. La consulta React `effect cleanup` se usó para la limpieza de efectos. El sistema recomendado no se copió de forma automática.
- [Superpowers](https://github.com/obra/superpowers): planificación por etapas y verificación antes de dar el trabajo por terminado. No es una dependencia de producción.
- [Strapi: building faster with v0 and Claude Code](https://strapi.io/blog/building-faster-with-v0-and-claude-code-lessons-learned-from-vibe-coding) y [Titular: website IA development](https://www.titular.com/blog/website-ia-development-guia-crear-webs-vibe-coding): contexto explícito, cambios acotados, código mantenible y comprobación de resultados.
- [ChatGPT Sites](https://help.openai.com/en/articles/20001339-creating-and-using-chatgpt-sites): publicación de la versión de revisión; el proyecto exportable se compila por separado para Vercel.

## Contenido propio

El CV y la foto de graduación fueron proporcionados por Fabricio Velez. Las imágenes de proyectos proceden de sus repositorios de GitHub. La imagen de reingresos está identificada como una vista estática recreada para la documentación. No se reutilizó la foto ni el contenido personal del portfolio de referencia.

## Componentes incorporados en la actualización

Se integró código adaptado de estos componentes oficiales de React Bits, de David Haz. Se conserva la licencia MIT + Commons Clause en `public/licenses/ReactBits-LICENSE.md`.

- [SplitText](https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/TextAnimations/SplitText/SplitText.tsx): mismo plugin GSAP SplitText; adaptado a `useEffect`, sin dependencia adicional de `@gsap/react`, y con soporte de movimiento reducido.
- [AnimatedContent](https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Animations/AnimatedContent/AnimatedContent.tsx): desplazamiento y opacidad al entrar; sin desaparición automática ni contenido oculto antes de inicializar.
- [SpotlightCard](https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Components/SpotlightCard/SpotlightCard.tsx): posición del cursor mediante variables CSS y gradiente radial; admite tarjetas semánticas `article` y desactiva el efecto con movimiento reducido.

La dirección visual se contrastó con el HTML y CSS públicos de [Juan Pablo Rojo](https://jpr-web-mu.vercel.app/es): fondo oscuro, jerarquía grande, imágenes integradas y pipelines de proyectos. La paleta, la tipografía y el contenido son propios de este portfolio.

[UUPM](https://uupm.cc/) corresponde a UI/UX Pro Max. Se ejecutó su búsqueda de sistema de diseño; no se exige instalar esa herramienta a los visitantes ni a quien publica esta actualización.

## Cult UI, Geist Pixel y revisión editorial

- **Cult UI: PixelParagraphInverse**, Copyright (c) 2023 Jordan-Gilliam. Adaptación de [pixel-paragraph-words-inverse.tsx](https://github.com/nolly-studio/cult-ui/blob/main/apps/www/registry/default/ui/pixel-paragraph-words-inverse.tsx) en `src/components/PixelParagraphInverse.tsx`. Se conserva el algoritmo de coincidencia de frases y se adapta a CSS nativo, Manrope y Geist Pixel Square, con palabras separadas para animación. Licencia MIT en `public/licenses/CultUI-LICENSE.md`. [Documentación](https://www.cult-ui.com/docs/components/pixel-paragraph-words-inverse).
- **Geist Pixel Square**, Vercel en colaboración con basement.studio. Archivo original de la distribución oficial `geist@1.7.2`, alojado con el sitio y usado únicamente en el párrafo de transición. [Fuente oficial](https://vercel.com/font). SIL Open Font License 1.1 en `public/licenses/Geist-OFL.txt`.
- **Taste Skill / design-taste-frontend**, [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill). Se utilizó para analizar el frontend y decidir jerarquía, variedad de composiciones, texto, estados de interacción y continuidad de tema. Es una herramienta de desarrollo; no una dependencia ni un recurso descargado por los visitantes.
- **Darpan Jain**, [portfolio](https://darpanjain.com/), y **Mitchell Sparrow**, [portfolio](https://www.mitchellsparrow.com/): referencias de organización de proyectos técnicos y relato personal. No se copian sus datos ni sus imágenes.
- **DESIGN.md del usuario**, referencia editorial inspirada en Dennis Snellenberg: escala, espacio y formas de controles. Se aplica conservando la identidad y los recursos originales de Fabricio.

La animación del párrafo y la comparación deslizante son implementaciones propias con GSAP y controles nativos. La comparación encuadra en CSS los dos paneles de la imagen original `resultado-test.png`; no altera ese archivo. La imagen completa y su leyenda se conservan en el detalle del proyecto.
