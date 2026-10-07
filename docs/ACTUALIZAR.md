# Actualizar el portfolio que ya publicaste

Repositorio actual: https://github.com/velezfabri/portfolio

Página pública actual: https://portfolio-six-navy-88.vercel.app/

## Desde el navegador, sin instalar programas

1. Descargar y descomprimir `portfolio-animaciones-y-presentacion.zip`.
2. Abrir el repositorio actual en GitHub y elegir **Add file → Upload files**.
3. Arrastrar **el contenido de la carpeta descomprimida**. Las carpetas `src` y `docs` deben quedar en la raíz del repositorio, junto a `index.html` y `README.md`. Los archivos con el mismo nombre reemplazan su versión anterior. No crear una carpeta adicional dentro del repositorio.
4. Confirmar con **Commit changes** en la rama que Vercel utiliza para producción.
5. Abrir el proyecto en Vercel y esperar a que el nuevo despliegue termine. El repositorio ya está conectado; no hace falta crear otro proyecto.
6. Abrir tu página pública y probar el recorrido por las secciones, los efectos al pasar el mouse, los tres filtros en ambos temas y los detalles de los proyectos.

El ZIP incluye los archivos cambiados y los nuevos. No contiene `node_modules`, credenciales ni una copia del CV o de las fotos. Las dependencias no cambiaron: Vercel seguirá usando el `package.json` y el `package-lock.json` existentes.

## Cambios visibles

- Presentación en primera persona junto a tu foto: Ushuaia, Córdoba, tu graduación, la diplomatura, IA e intereses personales.
- Animaciones al llegar a proyectos, experiencia, formación y contacto, además de un separador animado entre perfil y proyectos.
- Fotografía con movimiento suave durante el scroll en escritorio y barra de avance superior.
- Zoom en imágenes, elevación de tarjetas y movimiento en flechas y botones.
- Animaciones breves al filtrar proyectos, abrir sus detalles y cambiar de imagen.
- Filtros legibles en modo oscuro y claro, también al seleccionar y al pasar el mouse.
- Compatibilidad con la preferencia de movimiento reducido del dispositivo.

## Verificación de esta entrega

- `npm run build` incluye `npm run typecheck` y produce la salida Vite para Vercel.
- Se comprueban el contraste numérico de los filtros, los recursos y anclas del HTML renderizado y la conservación del CV y de la foto.
- No se ejecutó una prueba visual completa en navegador de esta actualización. Después de publicar, revisar escritorio y celular y probar el movimiento reducido en el dispositivo.

## Continuar editando con IA

El contexto está en `AGENTS.md`, los criterios visuales en `docs/design-system.md` y las fuentes/licencias en `THIRD_PARTY.md`. El código que se publica no depende de instalar UI/UX Pro Max.

Base de esta actualización: commit `816a54a` del repositorio del usuario. Si modificaste estos mismos archivos después, revisar sus diferencias antes de reemplazarlos.
