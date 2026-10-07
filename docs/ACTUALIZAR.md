# Actualizar el portfolio que ya publicaste

Repositorio: https://github.com/velezfabri/portfolio

Página pública: https://portfolio-six-navy-88.vercel.app/

## Desde GitHub, sin instalar programas

1. Descargar y descomprimir `portfolio-cult-ui-y-taste.zip`.
2. Abrir el repositorio y elegir **Add file → Upload files**.
3. Arrastrar el contenido descomprimido: `src`, `docs`, `public` y `THIRD_PARTY.md` deben quedar en la raíz del repositorio. Reemplazar los archivos con el mismo nombre; no crear una carpeta contenedora adicional.
4. Confirmar con **Commit changes** en la rama conectada con Vercel.
5. Esperar a que el despliegue de Vercel termine y abrir la página pública.

El ZIP incluye únicamente archivos cambiados o añadidos. No incluye `node_modules`, credenciales, dependencias nuevas, ni duplicados del CV y de las fotografías. Dentro de `public` están la fuente pixelada y las licencias nuevas, necesarias para esta actualización.

## Qué cambia

- Nombre en gran escala, frase breve y CV/contacto desde la primera vista.
- Historia personal conservada en la primera sección junto al recorrido de tu fotografía.
- Párrafo de Cult UI con revelación de palabras al hacer scroll y un capítulo breve fijado solo en escritorio.
- Áreas asimétricas y proyectos con más espacio y mejor jerarquía.
- Comparación deslizante entre referencia manual y predicción del proyecto hepático; etapas del proceso seleccionables.
- Experiencia con desplegables y contacto destacado, respetando el modo claro u oscuro.

## Comprobación después de publicar

1. Revisar en computadora y celular el nombre, la foto y los botones de CV/contacto.
2. Recorrer el capítulo pixelado, volver arriba y usar las anclas del menú.
3. Probar Todos, Inteligencia artificial y Datos en ambos temas.
4. Mover la comparación con mouse, touch y flechas de teclado; recorrer las cuatro etapas.
5. Abrir los casos, las imágenes de ENFR y los desplegables de experiencia; cerrar los diálogos con Escape.
6. Probar correo, teléfono, copia de email y CV.
7. Activar movimiento reducido en el dispositivo: el texto debe seguir visible y el scroll funcionar sin fijado.

La compilación, TypeScript, los recursos/anclas y el contraste numérico fueron comprobados. Queda pendiente la revisión visual en navegador y Lighthouse. Detalle en `docs/analisis-frontend.md`.

Base de esta actualización: commit `ab11b33`. Si editaste estos archivos después, revisar sus diferencias antes de reemplazarlos. El código publicado no depende de instalar Taste Skill ni UI/UX Pro Max.
