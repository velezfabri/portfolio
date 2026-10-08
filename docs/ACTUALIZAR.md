# Actualizar el portfolio que ya publicaste

Repositorio: https://github.com/velezfabri/portfolio

Página pública: https://portfolio-six-navy-88.vercel.app/

## Desde GitHub, sin instalar programas

1. Descargar y descomprimir `portfolio-historia-y-video.zip`.
2. Abrir el repositorio y elegir **Add file → Upload files**.
3. Arrastrar el contenido descomprimido: `src`, `docs`, `public` y `THIRD_PARTY.md` deben quedar en la raíz del repositorio. Reemplazar los archivos con el mismo nombre; no crear una carpeta contenedora adicional.
4. Confirmar con **Commit changes** en la rama conectada con Vercel.
5. Esperar a que el despliegue de Vercel termine y abrir la página pública.

El ZIP incluye únicamente archivos cambiados o añadidos. No incluye `node_modules`, credenciales, dependencias nuevas, ni duplicados del CV y de las fotografías. Dentro de `public` están la fuente pixelada y las licencias nuevas, necesarias para esta actualización.

## Qué cambia

- Entrada por click y presentación unificada con biografía, formación y habilidades.
- Texto y foto más próximos; letras con mayor separación temporal.
- Segmentación con una historia de cinco capítulos y video original.
- Dashboard de reingresos, mapa ENFR e incendios de Córdoba en ese orden.
- Respuesta de movimiento en botones, experiencia profesional y contacto.
- Fuente editable del video conservada en `video-source/`.

## Comprobación después de publicar

1. Entrar desde el botón, y en otra sesión desde el menú. Verificar CV, teclado y anclas.
2. Bajar por la historia de segmentación, volver hacia arriba y elegir etapas desde los botones.
3. Abrir el video completo, activar sonido, pausar y cerrar con Escape.
4. Probar filtros, casos, comparación de segmentos y galerías de ENFR en los dos temas.
5. Revisar una pantalla móvil y activar movimiento reducido; las descripciones y acciones deben seguir disponibles.
6. Probar el enlace de incendios, correo, teléfono, copia de email y CV.

Los parámetros editables están en `docs/MOVIMIENTO.md`; la fuente y los recursos del video se describen en `docs/VIDEO.md`. La verificación realizada y sus límites figuran en `docs/analisis-frontend.md`.

Base de esta actualización: commit `dc93e26` de GitHub. Revisar diferencias si editaste los mismos archivos después. El código publicado no depende de instalar Taste Skill ni UI/UX Pro Max.
