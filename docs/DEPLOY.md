# Publicar en GitHub y Vercel

El proyecto portable contiene React, TypeScript, Vite, las imágenes, las fuentes y el CV. No requiere claves ni variables de entorno.

## GitHub

1. Descomprimir `fabricio-velez-portfolio-vercel.zip`.
2. Crear un repositorio llamado `fabricio-velez-portfolio` en GitHub.
3. Subir **el contenido de la carpeta** descomprimida. `package.json`, `index.html`, `vercel.json`, `src/` y `public/` deben quedar en la raíz del repositorio. No subir el ZIP como único archivo.
4. Confirmar el commit. Se puede usar “Add file → Upload files” desde GitHub, sin instalar Git.

Si se usa Git desde una terminal, después de crear el repositorio vacío:

```sh
git init
git add .
git commit -m "Crear portfolio de Fabricio Velez"
git branch -M main
git remote add origin https://github.com/velezfabri/fabricio-velez-portfolio.git
git push -u origin main
```

Esa URL supone que se eligió el nombre de repositorio indicado y que se publica en la cuenta `velezfabri`. Ajustarla si se usa otra cuenta o nombre.

## Vercel

1. En Vercel, elegir “Add New → Project” e importar el repositorio.
2. Framework: **Vite**. Root Directory: la carpeta que contiene `package.json`, normalmente la raíz.
3. La configuración incluida usa Install Command `npm ci`, Build Command `npm run build` y Output Directory `dist`.
4. Publicar con “Deploy”. Vercel asignará la URL pública. La URL no está inventada en el código.

Vercel admite proyectos Vite y la integración con proveedores Git: [documentación oficial](https://vercel.com/docs/frameworks/frontend/vite).

## Probar antes de compartir

Abrir la URL en una ventana privada y desde un celular. Verificar el CV, GitHub, teléfono, correo, filtros, imágenes de los proyectos y cierre del detalle con Escape. Revisar también la opción de movimiento reducido del dispositivo.

Después, agregar esa URL en **Destacados** de LinkedIn con el título **“Portfolio · CV, proyectos y contacto”**. Fijar el repositorio en el perfil de GitHub y agregar la URL a su descripción. El enlace de revisión de ChatGPT conserva su acceso privado; para postulaciones usar la URL pública de Vercel.

## Editar más adelante

- Información: `src/content.ts`.
- Foto: `public/images/fabricio-velez-graduacion.jpg`; ajustar el encuadre en `.portrait-frame img` en `src/styles.css`.
- CV: `public/cv/Fabricio_Velez_CV.pdf`.
- Diseño: `src/styles.css` y `docs/design-system.md`.
- Instrucciones para continuar con un asistente de código: `AGENTS.md`.

Los futuros commits pueden desplegarse mediante la integración del repositorio con Vercel.
