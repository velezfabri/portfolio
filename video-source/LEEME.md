# Video de segmentación hepática — Fabricio Velez

Video de 20 segundos, 1920×1080, 30 fps, H.264 y audio AAC. Utiliza la CT,
las predicciones HP4/HP1 y las activaciones del archivo `video_hepaticvessel_002.zip`.

Para reproducir la creación, extraer ese archivo en una carpeta `video_assets`
junto a `render_video.py` y ejecutar `python render_video.py` en el entorno
Linux utilizado para el render. Requiere NumPy, Pillow, SciPy y FFmpeg.
En otro equipo, ajustar las rutas `FONT`, `BOLD` y `MONO` a fuentes instaladas.
`python render_video.py --preview` genera un storyboard para revisar el diseño.

Las escenas están en `intro`, `model_scene`, `binary_scene` y `finale`.
Los puntos de transición están en `scene` y `render`. Esta revisión recupera
la composición y los títulos grandes de la primera versión, con menos texto
secundario y sin nombre ni cabeceras permanentes.
El fondo verde claro se configura en `CANVAS` y en la creación de `BACKGROUND`;
`GREEN`, `INK` y `MUTED` controlan los detalles y el texto de la presentación.
El hígado vuelve al cian original. Los ocho segmentos conservan la paleta
multicolor de `metadata.json`, compartida por los overlays y la reconstrucción
3D. Las imágenes de tomografía, overlays y activaciones se cargan directamente
de los PNG originales, sin teñirlas de verde.
La vista 3D usa la superficie del volumen
predicho, muestreada en XY; no se generó anatomía mediante IA.

La matriz visible corresponde al plano central de un filtro 3×3×3 real de
cada red. El esquema de movimiento explica el proceso; las activaciones,
los pesos mostrados y las segmentaciones son reales. El audio sintetizado
es original y se crea con la función `soundtrack`.

Se verificaron la integridad del ZIP original, los 66 cortes, las formas y
affines de los volúmenes, las etiquetas 0..8, la contención dentro del hígado,
la coincidencia exacta entre la CT y su PNG, y la reproducción del MP4 completo.
Esta verificación comprueba los archivos y el render, sin medir exactitud
anatómica frente a una referencia manual.
