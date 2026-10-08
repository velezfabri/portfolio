// Descripciones y tiempos del guion original render_video.py.
export const segmentationChapters = [
  { name: "Tomografía", time: 0.6, start: 0, title: "Todo empieza con una tomografía.", text: "Una imagen 3D formada por cortes. El objetivo: identificar el hígado y después sus segmentos anatómicos." },
  { name: "Primera red", time: 4.9, start: 3.1, title: "Una red para encontrar el hígado.", text: "La primera 3D U-Net analiza el volumen. Aprende a distinguir el órgano del resto de la imagen." },
  { name: "Hígado", time: 8.6, start: 7.5, title: "Primero, el órgano completo.", text: "La primera predicción identifica el hígado. Es el primer resultado de la cascada, antes de distinguir sus segmentos anatómicos." },
  { name: "Segunda red", time: 11.8, start: 10, title: "Después, sus ocho segmentos.", text: "La segunda 3D U-Net distingue los segmentos de Couinaud. Cada color representa una región anatómica." },
  { name: "Resultado", time: 17.6, start: 14, title: "Un resultado que puedo visualizar y evaluar.", text: "Recorrí las predicciones en 3D Slicer y evalué la segmentación con Dice. El video muestra el resultado de un caso del proyecto." },
];
