# Trabajar en este portfolio

Portfolio personal en español de Fabricio Velez, Ingeniero Biomédico. React + TypeScript + Vite, sitio estático.

## Contenido y diseño

Leer `docs/design-system.md` y `src/content.ts` antes de cambiar el diseño o los textos. Priorizar acceso inmediato al CV, GitHub, correo y teléfono. Conservar una sola familia tipográfica para todos los títulos.

El PDF es el CV original elegido por el usuario: no modificarlo al editar la web. Las cifras de IA tienen contexto de evaluación. No afirmar validación clínica, experiencia regulatoria, premios o empleadores no documentados. No inventar URLs.

Las fotos son del usuario. Los proyectos tienen imágenes procedentes de sus repositorios. Respetar sus leyendas y las licencias en `THIRD_PARTY.md`. El movimiento reducido debe conservar visible todo el contenido; las acciones principales no deben esperar a una animación.

## Verificación

Ejecutar `npm run typecheck` y `npm run build` en la exportación portable. Verificar recursos locales, anclas, enlaces de contacto y el hash del CV cuando se modifiquen estos flujos. Si hay un navegador de pruebas disponible, revisar móvil, filtros, galerías, teclado y cierre de diálogos. Explicar qué comprobaciones se hicieron y cuáles quedaron pendientes.

La navegación usa anclas, no React Router. No agregar un servidor, base de datos, CMS, credenciales o integraciones sin una necesidad concreta del usuario. La configuración portable de Vercel usa `dist`; el checkout de revisión conserva su integración de Sites.
