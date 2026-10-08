# Trabajar en este portfolio

Portfolio personal en español de Fabricio Velez, Ingeniero Biomédico. React + TypeScript + Vite, sitio estático.

## Contenido y diseño

Leer `docs/design-system.md`, `docs/MOVIMIENTO.md` y `src/content.ts` antes de cambiar el diseño o los textos. Priorizar acceso inmediato al CV, GitHub, correo y teléfono. Conservar una sola familia tipográfica para todos los títulos.

El PDF es el CV original elegido por el usuario: no modificarlo al editar la web. Las cifras de IA tienen contexto de evaluación. No afirmar validación clínica, experiencia regulatoria, premios o empleadores no documentados. No inventar URLs.

Las fotos son del usuario. Los proyectos tienen imágenes procedentes de sus repositorios. Respetar sus leyendas y las licencias en `THIRD_PARTY.md`. El movimiento reducido debe conservar visible todo el contenido; las acciones principales no deben esperar a una animación.

La galería común contiene cuatro tarjetas: segmentación, reingresos, ENFR e incendios. Cada tarjeta tiene un único botón nativo extendido a toda la superficie. El detalle comienza con evidencia visual; segmentación muestra el MP4 original directamente, sin otro diálogo. No montar SegmentationStory ni ProjectVideo en el recorrido actual. Mantener el contexto académico de métricas y la comparación de referencia/predicción.

Una sola nota de aprendizaje al pie de habilidades: «Estoy aprendiendo agentic engineering de forma autodidacta. Este portfolio también es parte de ese proceso: lo estoy construyendo con ayuda de IA y vibe coding.» No convertirla en experiencia o credencial.

## Verificación

Ejecutar `npm run typecheck` y `npm run build` en la exportación portable. Verificar recursos locales, anclas, enlaces de contacto y el hash del CV cuando se modifiquen estos flujos. Si hay un navegador de pruebas disponible, revisar móvil, filtros, galerías, teclado y cierre de diálogos. Explicar qué comprobaciones se hicieron y cuáles quedaron pendientes.

La navegación usa anclas, no React Router. La entrada se recuerda por sesión; mantener presentación y formación juntas. Por pedido actual del usuario, habilidades va después de experiencia y antes de contacto; conservar el ID `areas` y sus vínculos aplicados. Conservar los dos MP4 y la fuente editable; leer `docs/VIDEO.md` antes de alterar el video. No agregar un servidor, base de datos, CMS, credenciales o integraciones sin una necesidad concreta del usuario. La configuración portable de Vercel usa `dist`; el checkout de revisión conserva su integración de Sites.
