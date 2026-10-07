# Análisis y decisiones de frontend

Revisión del portfolio publicado en el repositorio, tomando como base el commit `ab11b33`.

## Hallazgos y cambios

| Hallazgo | Cambio | Propósito |
| --- | --- | --- |
| La biografía extensa desplazaba las acciones principales. | Primera vista con nombre, profesión, una frase y botones; historia personal dentro de esa misma primera sección. | Reconocer el perfil y acceder al CV o al contacto rápidamente. |
| Varias secciones repetían título a la izquierda y explicación a la derecha. | Encabezado de proyectos apilado, áreas asimétricas, experiencia horizontal y contacto con tipografía grande. | Dar ritmo al recorrido y diferenciar su función. |
| Las entradas de scroll compartían un mismo efecto. | Un capítulo breve con palabras pixeladas que se revelan al avanzar. | Conectar curiosidad y proyectos con un gesto visual propio. |
| El resultado de segmentación era una imagen que había que mirar completa. | Comparación nativa deslizante y etapas seleccionables. | Permitir explorar la evidencia y entender la cascada de redes. |
| Numeraciones, etiquetas y franjas competían con el contenido. | Menos microtexto decorativo; títulos y leyendas funcionales. | Concentrar la atención en personas, proyectos y acciones. |
| Contacto conservaba una inversión de tema. | Contacto sigue el tema elegido, con un CTA de correo destacado. | Mantener continuidad visual y facilitar el siguiente paso. |

## Referencias consultadas

- [Darpan Jain](https://darpanjain.com/): organiza proyectos, investigación y experimentos interactivos, con acceso al CV y contacto. Se tomó la idea de explorar un resultado técnico propio.
- [Mitchell Sparrow](https://www.mitchellsparrow.com/): combina su formación en IA con origen, trayectoria e intereses personales. Se tomó la estructura humana del relato, sin copiar sus logros, fotografías ni proyectos.
- [Cult UI: Pixel Paragraph Words Inverse](https://www.cult-ui.com/docs/components/pixel-paragraph-words-inverse): el componente original asigna tipografía pixelada y normal a distintas palabras. La animación de scroll es una extensión propia usando GSAP.
- `DESIGN.md`, proporcionado por el usuario: jerarquía editorial, espacio y controles redondeados. Se conservaron las fuentes, el color y el contenido de Fabricio.
- [Portfolio de Juan Pablo Rojo](https://jpr-web-mu.vercel.app/es): referencia de la presentación y del contexto de proyectos en las revisiones anteriores.

Los portfolios de Darpan y Mitchell se consultaron por su contenido público; no se verificó su implementación de animaciones en un navegador. No se reutilizaron imágenes, CV, código privado ni información personal ajena.

## Aplicación contextual de Taste Skill

Se conservan decisiones explícitas del usuario y del proyecto: CV y contacto repetidos en puntos útiles, una sola familia para títulos, ambas opciones de tema y la foto original. El párrafo pixelado es una excepción localizada solicitada por el usuario. Se mantiene Lucide, ya instalado, como única familia de iconos. React + Vite no requiere directivas de Next.js ni instalar otro sistema de componentes.

La comparación permite revisar las predicciones de un caso de test ya calculado. La información de etapas es explicativa. Se conserva la declaración de evaluación académica y el contexto de las cifras.

## Verificación

- TypeScript y compilación Vite de producción correctos.
- Renderizado del árbol React sin navegador: IDs únicos, anclas y destinos de controles existentes, imágenes locales, contacto y CV accesibles.
- Componente de palabras mixtas: frases largas con prioridad y caracteres especiales literales.
- Control nativo de comparación con inicio en 50 %, controles de etapa con selección anunciada y desplegables de experiencia presentes.
- Contraste calculado de selección y CTA con fondo de acento: 4,99:1 en claro y 10,27:1 en oscuro. Texto, CTA principal y leyendas comprobados por encima de 4,5:1.
- CV, fotografía y resultado de test conservan exactamente sus bytes originales.
- Revisión de limpieza de efectos, breakpoints, movimiento reducido y texto visible. No se añaden dependencias de producción.

La revisión visual, el arrastre real en dispositivos, los recorridos completos por teclado y Lighthouse están pendientes. No hay un navegador de pruebas habilitado en este entorno; Sites indica omitir esa comprobación si `control-browser` no está disponible. Estos controles deben realizarse después del despliegue y no se presentan como pruebas completadas.
