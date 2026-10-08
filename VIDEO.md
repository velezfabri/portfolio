# Video de segmentación

- `public/videos/segmentacion-hepatica.mp4`: original subido por el usuario, conservado byte por byte. 20 segundos, 1920×1080, H.264 y audio AAC.
- `public/videos/segmentacion-hepatica-scroll.mp4`: copia 1280×720 sin audio para el relato. Fotogramas clave cada 0,5 segundos y cabecera MP4 al principio para facilitar las búsquedas.
- `public/videos/segmentacion-hepatica.vtt`: descripciones de las cinco escenas en español.
- `public/images/segmentacion-video-poster.jpg`: fotograma del original, sin recolorear.
- `video-source/video-hepatico-proyecto-editable.zip`: ZIP editable original, sin modificar.
- `video-source/render_video.py` y `LEEME.md`: copias de sus dos archivos para facilitar futuras ediciones.

El original se abre con controles en un diálogo y se pausa al cerrar. No se reproduce audio automáticamente. Las imágenes médicas y la paleta de segmentos mantienen sus colores originales, también en el tema oscuro.

## Si cambia el diseño del video

El ZIP editable contiene el guion, no los volúmenes ni todos los PNG del caso. Para volver a renderizar, se necesita también el archivo `video_hepaticvessel_002.zip` usado en la creación original. Extraerlo en `video-source/video_assets/` y seguir `video-source/LEEME.md`. Los datos volumétricos no se agregan al repositorio web ni al despliegue.

Las variables `CANVAS`, `GREEN`, `INK` y `MUTED`, y la creación de `BACKGROUND`, controlan la presentación. `PALETTE` procede de `metadata.json` y mantiene los colores anatómicos. Los cambios del CSS de la página no modifican automáticamente un MP4 ya renderizado.

Reemplazar el MP4 original y generar nuevamente la copia para scroll:

```sh
ffmpeg -i public/videos/segmentacion-hepatica.mp4 -an -vf scale=1280:720 \
  -c:v libx264 -preset fast -crf 21 -g 15 -keyint_min 15 \
  -sc_threshold 0 -movflags +faststart \
  public/videos/segmentacion-hepatica-scroll.mp4
```

Si cambian la duración o las escenas, actualizar `segmentationChapters` en `src/components/SegmentationStory.tsx` y el VTT. El fotograma de portada se puede extraer con FFmpeg de la versión nueva.
