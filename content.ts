export const profile = {
  name: "Fabricio Velez",
  fullName: "Lucas Fabricio Velez",
  title: "Ingeniero Biomédico",
  location: "Córdoba, Argentina",
  age: 24,
  origin: "Ushuaia",
  email: "velez.lucasfabricio@gmail.com",
  phone: "+54 2901 588791",
  whatsappHref: "https://wa.me/5492901588791",
  github: "https://github.com/velezfabri",
  linkedin: "https://www.linkedin.com/in/fabricio-velez/",
  cv: `${import.meta.env.BASE_URL}cv/Fabricio_Velez_CV.pdf`,
};

export const introduction = {
  origin:
    "Tengo 24 años y soy de Ushuaia. A los 17 me mudé a Córdoba para estudiar Ingeniería Biomédica en la UNC. Me recibí en junio de 2026 y me quedé en una ciudad que me encanta.",
  learning:
    "Hoy estoy haciendo una diplomatura en Ciencia de Datos. Me entusiasma la inteligencia artificial y todo lo que ya podemos hacer con ella: entender datos, trabajar con imágenes y resolver problemas reales.",
  interests: ["Inglés", "Jiu-jitsu", "Gimnasio"],
};

export type ProjectImage = {
  src: string;
  alt: string;
  label: string;
  caption: string;
  width: number;
  height: number;
};

export type Project = {
  pipeline: string[];
  id: string;
  number: string;
  category: "IA" | "Datos";
  title: string;
  subtitle: string;
  description: string;
  cardDescription: string;
  tags: string[];
  question: string;
  work: string[];
  result: string;
  note?: string;
  links?: { label: string; href: string }[];
  images?: ProjectImage[];
};

export const projects: Project[] = [
  {
    id: "segmentacion",
    cardDescription: "De una tomografía al hígado y sus ocho segmentos anatómicos.",
    pipeline: ["Tomografía", "Hígado", "Couinaud", "Visualización"],
    number: "01",
    category: "IA",
    title: "De una tomografía a un mapa anatómico.",
    subtitle: "Segmentación de hígado y segmentos de Couinaud",
    description:
      "Una cascada de redes 3D U-Net para identificar el hígado y sus ocho segmentos anatómicos en imágenes tomográficas.",
    tags: ["Python", "PyTorch", "3D Slicer", "Deep learning"],
    question:
      "¿Cómo automatizar la segmentación del hígado y sus segmentos de Couinaud para apoyar el estudio de imágenes tomográficas?",
    work: [
      "Desarrollé una cascada de redes 3D U-Net: primero segmentación del hígado y después de sus ocho segmentos anatómicos.",
      "Evalué los resultados con la métrica Dice y realicé una evaluación externa en seis casos clínicos.",
      "Integré el trabajo con herramientas de visualización de imágenes médicas como 3D Slicer.",
    ],
    result:
      "En el conjunto de test: Dice de 97,63 % para hígado y Dice macro de 81,56 % para los segmentos. La evaluación externa incluyó seis casos clínicos.",
    note: "Proyecto final de Ingeniería Biomédica · UNC · 2026. Los resultados corresponden a una evaluación académica; no implican validación para uso clínico autónomo.",
    links: [
      {
        label: "Código en GitHub",
        href: "https://github.com/velezfabri/PI-Velez-Final",
      },
      {
        label: "Sitio del proyecto",
        href: "https://segmentacion-hepatica-web-theta.vercel.app/",
      },
    ],
  },
  {
    id: "reingresos",
    cardDescription: "Datos clínicos, SQL y un dashboard para explorar reingresos.",
    pipeline: ["Datos clínicos", "SQL", "Métricas", "Power BI"],
    number: "02",
    category: "Datos",
    title: "Reingresos hospitalarios",
    subtitle: "De datos clínicos a un dashboard explorable",
    description:
      "Preparación de datos, consultas SQL y visualización de pacientes, diagnósticos y reingresos con Power BI.",
    tags: ["SQL", "Power BI", "Análisis de datos"],
    question:
      "¿Cómo organizar los datos de internaciones para explorar los reingresos hospitalarios y sus variables asociadas?",
    work: [
      "Preparé y consulté datos del conjunto Diabetes 130-US Hospitals.",
      "Definí métricas de reingreso y organicé la información para su análisis.",
      "Construí un dashboard interactivo para explorar pacientes, diagnósticos y reingresos.",
    ],
    result:
      "Un dashboard de análisis que permite recorrer la información clínica y comparar métricas de reingreso.",
    note: "Proyecto de análisis de datos · 2026. El detalle del proyecto está incluido en mi CV.",
    links: [
      {
        label: "Ver proyecto en GitHub",
        href: "https://github.com/velezfabri/Reingresos-hospitales-Dashboard",
      },
    ],
    images: [
      {
        src: "reingresos-dashboard.png",
        width: 1920,
        height: 1140,
        label: "Dashboard",
        alt: "Vista estática del dashboard de reingresos hospitalarios con indicadores y gráficos por admisión, internaciones previas, edad y estadía.",
        caption:
          "Vista estática recreada para la documentación del informe de Power BI, publicada en el repositorio del proyecto.",
      },
    ],
  },
  {
    id: "enfr",
    cardDescription: "Un mapa y cinco indicadores de la ENFR 2018 para explorar por provincia.",
    pipeline: ["ENFR 2018", "Ponderación", "Análisis en R", "Shiny"],
    number: "03",
    category: "Datos",
    title: "Salud pública en perspectiva",
    subtitle: "Encuesta Nacional de Factores de Riesgo 2018",
    description:
      "Una aplicación para explorar cinco indicadores de salud con filtros por provincia, gráficos y un mapa de Argentina.",
    tags: ["R", "Shiny", "tidyverse", "ggplot2"],
    question:
      "¿Cómo hacer que los indicadores de una encuesta nacional sean más accesibles para su exploración y comparación?",
    work: [
      "Desarrollé una aplicación interactiva a partir de la ENFR 2018.",
      "Incorporé ponderación muestral al análisis de los indicadores.",
      "Sumé filtros por provincia, gráficos y un mapa de Argentina para explorar cinco indicadores de salud.",
    ],
    result:
      "Una aplicación Shiny que reúne análisis estadístico y visualización interactiva de indicadores de salud pública.",
    note: "Proyecto de ciencia de datos · 2026. El detalle del proyecto está incluido en mi CV.",
    links: [
      {
        label: "Ver proyecto en GitHub",
        href: "https://github.com/velezfabri/dashboard-enfr-2018",
      },
    ],
    images: [
      {
        src: "enfr-mapa.png",
        width: 1423,
        height: 721,
        label: "Mapa",
        alt: "Mapa provincial del dashboard ENFR 2018 con Córdoba seleccionada y su panel de consulta.",
        caption:
          "Vista del mapa por provincia y del panel de consulta del dashboard ENFR 2018.",
      },
      {
        src: "enfr-resumen.png",
        width: 1486,
        height: 356,
        label: "Resumen",
        alt: "Resumen del dashboard ENFR 2018 con tamaño de muestra e indicador de diabetes por autorreporte.",
        caption: "Vista de los indicadores de resumen del dashboard ENFR 2018.",
      },
      {
        src: "enfr-comparaciones.png",
        width: 1401,
        height: 427,
        label: "Comparaciones",
        alt: "Vista de comparación de prevalencia de colesterol elevado por autorreporte entre provincias.",
        caption:
          "Vista de comparación de indicadores entre provincias del dashboard ENFR 2018.",
      },
    ],
  },
  {
    id: "incendios",
    cardDescription: "Datos oficiales y observaciones satelitales para explorar dos eventos.",
    pipeline: ["Fuentes oficiales", "Python", "Cruce espacial", "Web interactiva"],
    number: "04", category: "Datos", title: "Incendios en Córdoba",
    subtitle: "Datos oficiales y observaciones satelitales en una historia interactiva",
    description: "Una página para explorar incendios reportados y cruzar áreas de IDECOR con observaciones satelitales de NASA FIRMS.",
    tags: ["Python", "NASA FIRMS", "GeoJSON", "Visualización web"],
    question: "¿Cómo relacionar los incendios documentados en Córdoba con observaciones satelitales, respetando las diferencias entre las fuentes?",
    work: [
      "Organicé series nacionales y datos provinciales de incendios, con sus fuentes y coberturas.",
      "Crucé detecciones VIIRS NOAA-20 de NASA FIRMS con polígonos oficiales de IDECOR y ventanas de fecha local.",
      "Construí una página interactiva con gráficos, un visor de los dos eventos y descargas de los datos publicados.",
    ],
    result: "El cruce publicado reúne 256 detecciones térmicas en El Durazno y 1.099 en Capilla del Monte durante los primeros cinco días de cada evento, dentro de sus polígonos finales.",
    note: "Proyecto de análisis de datos. Cada punto es una observación satelital; no equivale a un incendio adicional ni mide directamente el daño o la superficie quemada.",
    links: [
      { label: "Abrir la página", href: "https://incendios-cordoba.vercel.app/" },
      { label: "Código en GitHub", href: "https://github.com/velezfabri/Incendios-Cordoba" },
    ],
    images: [{
      src: "incendios-cruce.png", width: 1600, height: 900, label: "Cruce satelital",
      alt: "Polígonos de los incendios de El Durazno y Capilla del Monte con las detecciones satelitales coincidentes de NASA FIRMS.",
      caption: "Visualización estática de los polígonos y detecciones del conjunto publicado en el repositorio. Los dos eventos se muestran a escalas independientes.",
    }],
  },
];

export const experience = [
  {
    period: "MAR - JUN 2025",
    company: "Droguería Salud Renal",
    role: "Pasante de Ingeniería Biomédica · Servicio Técnico",
    description:
      "Mantenimiento de equipos de diálisis, mantenimiento preventivo y calibración de bombas de infusión. Participación en instalación de sillones odontológicos y trabajo con KPI, documentación y procedimientos ISO 9001.",
    tags: ["Servicio técnico", "Equipamiento médico", "Calidad"],
  },
  {
    period: "ABR - JUL 2024",
    company: "Hospital Italiano Córdoba",
    role: "Practicante de Bioingeniería Clínica",
    description:
      "Mantenimiento preventivo de bombas de infusión e intervenciones en lámparas cialíticas, monitores, ventiladores y centrífugas. Gestión de inventario y registros en el sistema de incidencias.",
    tags: ["Ingeniería clínica", "Mantenimiento", "Inventario"],
  },
  {
    period: "ENE 2024",
    company: "Clínica San Jorge",
    role: "Pasante de Bioingeniería Clínica",
    description:
      "Reemplazo de filtros de ósmosis, mantenimiento preventivo y limpieza de autoclave. Actualización de registros técnicos y diseño y armado de un tablero eléctrico.",
    tags: ["Mantenimiento", "Documentación técnica"],
  },
];

export const capabilities = [
  {
    title: "Tecnología médica",
    text: "Equipamiento, mantenimiento preventivo y correctivo, soporte hospitalario e inventario.",
    tools: [
      "Ingeniería clínica",
      "Bombas de infusión",
      "Diálisis",
      "Lámparas cialíticas",
      "Monitores multiparamétricos",
      "Sillones odontológicos",
    ],
  },
  {
    title: "Datos e inteligencia artificial",
    text: "Limpieza y exploración de datos, dashboards, machine learning e imágenes médicas.",
    tools: [
      "Python",
      "R",
      "SQL básico",
      "Power BI",
      "PyTorch",
      "scikit-learn",
      "3D Slicer",
      "Git / GitHub",
    ],
  },
  {
    title: "Calidad y procesos",
    text: "Documentación técnica, procedimientos, indicadores y seguimiento de procesos.",
    tools: ["ISO 9001", "KPI", "Excel"],
  },
];
