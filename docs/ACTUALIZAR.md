# Actualizar el portfolio que ya publicaste

Repositorio actual: https://github.com/velezfabri/portfolio

Página pública actual: https://portfolio-six-navy-88.vercel.app/

## Desde el navegador, sin instalar programas

1. Descargar y descomprimir `portfolio-actualizacion-reactbits.zip`.
2. Abrir el repositorio actual en GitHub y elegir **Add file → Upload files**.
3. Arrastrar **el contenido de la carpeta descomprimida**. Las carpetas `src` y `docs` deben quedar en la raíz del repositorio, junto a `index.html` y `README.md`. Los archivos con el mismo nombre reemplazan su versión anterior.
4. Confirmar con **Commit changes** en la rama que Vercel utiliza para producción.
5. Abrir el proyecto en Vercel y esperar a que el nuevo despliegue termine. El repositorio ya está conectado; no hace falta crear otro proyecto.
6. Abrir tu página pública y probar el selector claro/oscuro, el título animado y las tarjetas de proyectos.

El ZIP incluye los archivos cambiados y los nuevos. No contiene `node_modules`, credenciales ni una copia del CV o de las fotos. Las dependencias no cambiaron: Vercel seguirá usando el `package.json` y el `package-lock.json` existentes.

El archivo `.gitignore` excluye archivos locales de desarrollo. Si tu explorador oculta los nombres que empiezan con punto, podés agregarlo con **Add file → Create new file** y copiar su contenido; no afecta al funcionamiento de la página.

## Cambios visibles

- Fondo oscuro, con selector para conservar también el modo claro.
- Título profesional con SplitText y presentación personal con fotografía.
- Entrada de fotografía y áreas con AnimatedContent.
- Tarjetas que responden al cursor con SpotlightCard.
- Áreas de trabajo antes de los proyectos y casos con etapas del proceso.
- Una sola tipografía para todos los títulos y controles accesibles.

## Continuar editando con IA

El contexto está en `AGENTS.md`, los criterios visuales en `docs/design-system.md` y las fuentes/licencias en `THIRD_PARTY.md`. El código que se publica no depende de instalar UI/UX Pro Max.

Base de esta actualización: commit `2eb77b490910d4843f03bb4de4d5a882b5ac4cd7` del repositorio del usuario. Si modificaste estos mismos archivos después, revisar sus diferencias antes de reemplazarlos.
