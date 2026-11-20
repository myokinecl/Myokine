import img01 from '../assets/images/infografias/01-tu-espalda-es-fuerte.jpg';
import img02 from '../assets/images/infografias/02-el-dolor-es-tu-alarma.jpg';
import img03 from '../assets/images/infografias/03-tu-hombro-es-fuerte.jpg';
import img04 from '../assets/images/infografias/04-artrosis-rodilla-moverte-es-tratamiento.jpg';
import img05 from '../assets/images/infografias/05-tendinopatia-carga-no-reposo.jpg';
import img06 from '../assets/images/infografias/06-moverte-es-medicina.jpg';
import img07 from '../assets/images/infografias/07-alimentacion-lo-basico.jpg';
import img08 from '../assets/images/infografias/08-proteina-construir-musculo.jpg';
import img09 from '../assets/images/infografias/09-creatina-que-si-y-que-no.jpg';
import img10 from '../assets/images/infografias/10-las-palabras-importan.jpg';
import img11 from '../assets/images/infografias/11-para-ti-dolor-de-hombro.jpg';
import img12 from '../assets/images/infografias/12-no-existe-la-postura-perfecta.jpg';
import img13 from '../assets/images/infografias/13-10-hechos-dolor-de-espalda.jpg';
import img14 from '../assets/images/infografias/14-carga-y-capacidad.jpg';
import img15 from '../assets/images/infografias/15-que-irrita-a-un-tendon.jpg';
import img16 from '../assets/images/infografias/16-buena-atencion.jpg';
import img17 from '../assets/images/infografias/17-por-que-mejore.jpg';
import img18 from '../assets/images/infografias/18-sueno-y-dolor.jpg';
import img19 from '../assets/images/infografias/19-estilo-de-vida-dolor-persistente.jpg';
import img20 from '../assets/images/infografias/20-plan-crisis-de-dolor.jpg';
import img21 from '../assets/images/infografias/21-como-medir-tu-progreso.jpg';

export interface Infografia {
  id: string;
  slug: string;
  title: string;
  topic: string;
  image: string;
  description: string;
  downloadName?: string;
  /** categoryValue de los artículos relacionados (ver CATEGORIES en data.ts) */
  relatedCategories: string[];
}

/**
 * Infografías para pacientes de MyoKine.
 * Para agregar una: copia la imagen en src/assets/images/infografias/,
 * impórtala arriba y añade un objeto con un `slug` único (es el link compartible).
 */
export const INFOGRAFIAS: Infografia[] = [
  {
    id: 'inf-1',
    relatedCategories: ['columna-lumbar'],
    slug: "tu-espalda-es-fuerte",
    title: "Tu espalda es fuerte",
    topic: "Espalda",
    image: img01,
    description: "El dolor lumbar es muy común y la mayoría de las personas mejora. Que duela no significa que algo esté dañado.",
    downloadName: 'MyoKine-tu-espalda-es-fuerte.jpg',
  },
  {
    id: 'inf-2',
    relatedCategories: ['dolor-persistente', 'evidencia-dolor'],
    slug: "el-dolor-es-tu-alarma",
    title: "El dolor es tu alarma de protección",
    topic: "Dolor",
    image: img02,
    description: "Tu sistema nervioso crea el dolor para protegerte. Como una alarma de humo: a veces suena fuerte aunque no haya incendio.",
    downloadName: 'MyoKine-el-dolor-es-tu-alarma.jpg',
  },
  {
    id: 'inf-3',
    relatedCategories: ['hombro'],
    slug: "tu-hombro-es-fuerte",
    title: "Tu hombro es más fuerte de lo que crees",
    topic: "Hombro",
    image: img03,
    description: "Lo que aparece en una imagen no siempre explica el dolor. La mayoría mejora con ejercicio, ajustes de carga y tiempo.",
    downloadName: 'MyoKine-tu-hombro-es-fuerte.jpg',
  },
  {
    id: 'inf-4',
    relatedCategories: ['rodilla'],
    slug: "artrosis-rodilla-moverte-es-tratamiento",
    title: "Artrosis de rodilla: moverte es tratamiento",
    topic: "Rodilla y tendones",
    image: img04,
    description: "La artrosis es muy frecuente y no significa que tu rodilla esté “acabada”. El ejercicio es el tratamiento principal.",
    downloadName: 'MyoKine-artrosis-rodilla-moverte-es-tratamiento.jpg',
  },
  {
    id: 'inf-5',
    relatedCategories: ['tobillo-pie', 'rodilla'],
    slug: "tendinopatia-carga-no-reposo",
    title: "Tendinopatía: el tendón necesita carga, no reposo",
    topic: "Rodilla y tendones",
    image: img05,
    description: "Aquiles, rotuliano o glúteo: el tendón se adapta a lo que le pides, con ejercicio progresivo y paciencia.",
    downloadName: 'MyoKine-tendinopatia-carga-no-reposo.jpg',
  },
  {
    id: 'inf-6',
    relatedCategories: ['ciencias-deporte', 'entrenamiento-fuerza'],
    slug: "moverte-es-medicina",
    title: "Moverte es medicina",
    topic: "Actividad física",
    image: img06,
    description: "Algo de actividad física es mejor que nada, y más es mejor. Lo importante es empezar desde donde estás.",
    downloadName: 'MyoKine-moverte-es-medicina.jpg',
  },
  {
    id: 'inf-7',
    relatedCategories: ['nutricion'],
    slug: "alimentacion-lo-basico",
    title: "Alimentación: lo básico que sí está claro",
    topic: "Nutrición",
    image: img07,
    description: "No hay alimentos mágicos. Lo que más pesa es lo que comes la mayoría de los días.",
    downloadName: 'MyoKine-alimentacion-lo-basico.jpg',
  },
  {
    id: 'inf-8',
    relatedCategories: ['nutricion', 'entrenamiento-fuerza'],
    slug: "proteina-construir-musculo",
    title: "Proteína: el material para construir músculo",
    topic: "Nutrición",
    image: img08,
    description: "Junto con el ejercicio de fuerza, comer suficiente proteína ayuda a ganar fuerza y masa muscular.",
    downloadName: 'MyoKine-proteina-construir-musculo.jpg',
  },
  {
    id: 'inf-9',
    relatedCategories: ['nutricion'],
    slug: "creatina-que-si-y-que-no",
    title: "Creatina: qué sí y qué no",
    topic: "Nutrición",
    image: img09,
    description: "Uno de los suplementos más estudiados. Ayuda sobre todo cuando se combina con ejercicio de fuerza.",
    downloadName: 'MyoKine-creatina-que-si-y-que-no.jpg',
  },
  {
    id: 'inf-10',
    relatedCategories: ['hombro', 'sesgos-cognitivos'],
    slug: "las-palabras-importan",
    title: "Las palabras importan",
    topic: "Hombro",
    image: img10,
    description: "El nombre de tu diagnóstico puede cambiar cómo vives tu dolor. “Desgarro” o “pinzamiento” suenan peor de lo que suelen ser.",
    downloadName: 'MyoKine-las-palabras-importan.jpg',
  },
  {
    id: 'inf-11',
    relatedCategories: ['hombro'],
    slug: "para-ti-dolor-de-hombro",
    title: "Para ti, que tienes dolor de hombro",
    topic: "Hombro",
    image: img11,
    description: "Tu dolor es real, y la mayoría de las personas mejora. Esto es lo que hoy sabemos.",
    downloadName: 'MyoKine-para-ti-dolor-de-hombro.jpg',
  },
  {
    id: 'inf-12',
    relatedCategories: ['columna-lumbar'],
    slug: "no-existe-la-postura-perfecta",
    title: "No existe la postura perfecta",
    topic: "Espalda",
    image: img12,
    description: "Sentarte “derecho” no previene el dolor. La mejor postura es la siguiente: cambiar de posición seguido.",
    downloadName: 'MyoKine-no-existe-la-postura-perfecta.jpg',
  },
  {
    id: 'inf-13',
    relatedCategories: ['columna-lumbar', 'evidencia-dolor'],
    slug: "10-hechos-dolor-de-espalda",
    title: "10 hechos sobre el dolor de espalda",
    topic: "Espalda",
    image: img13,
    description: "Lo que toda persona debería saber, según un grupo de investigadores en dolor lumbar (O'Sullivan y colegas, BJSM 2020).",
    downloadName: 'MyoKine-10-hechos-dolor-de-espalda.jpg',
  },
  {
    id: 'inf-14',
    relatedCategories: ['retorno-deporte', 'entrenamiento-fuerza', 'rehabilitacion-razonamiento'],
    slug: "carga-y-capacidad",
    title: "Carga y capacidad",
    topic: "Actividad física",
    image: img14,
    description: "El dolor por sobrecarga aparece cuando lo que haces supera, por ahora, lo que tu cuerpo tolera. La capacidad se entrena.",
    downloadName: 'MyoKine-carga-y-capacidad.jpg',
  },
  {
    id: 'inf-15',
    relatedCategories: ['tobillo-pie'],
    slug: "que-irrita-a-un-tendon",
    title: "Qué irrita a un tendón (y qué lo calma)",
    topic: "Rodilla y tendones",
    image: img15,
    description: "El tendón responde a cómo lo cargas. Algunas cargas lo irritan más; otras lo ayudan a adaptarse.",
    downloadName: 'MyoKine-que-irrita-a-un-tendon.jpg',
  },
  {
    id: 'inf-16',
    relatedCategories: ['rehabilitacion-razonamiento', 'evidencia-dolor'],
    slug: "buena-atencion",
    title: "Qué esperar de una buena atención",
    topic: "Dolor",
    image: img16,
    description: "Lo que las guías clínicas de mayor calidad dicen que debería recibir una persona con dolor musculoesquelético.",
    downloadName: 'MyoKine-buena-atencion.jpg',
  },
  {
    id: 'inf-17',
    relatedCategories: ['rehabilitacion-razonamiento', 'sesgos-cognitivos'],
    slug: "por-que-mejore",
    title: "¿Por qué mejoré?",
    topic: "Dolor",
    image: img17,
    description: "Cuando te sientes mejor, rara vez es por una sola cosa. Varias razones se suman.",
    downloadName: 'MyoKine-por-que-mejore.jpg',
  },
  {
    id: 'inf-18',
    relatedCategories: ['sueno', 'dolor-persistente'],
    slug: "sueno-y-dolor",
    title: "Sueño y dolor: un camino de ida y vuelta",
    topic: "Hábitos",
    image: img18,
    description: "Dormir mal puede subir el dolor, y el dolor puede empeorar el sueño. Cuidar tu sueño también es tratar tu dolor.",
    downloadName: 'MyoKine-sueno-y-dolor.jpg',
  },
  {
    id: 'inf-19',
    relatedCategories: ['dolor-persistente', 'salud-mental'],
    slug: "estilo-de-vida-dolor-persistente",
    title: "Estilo de vida y dolor persistente",
    topic: "Hábitos",
    image: img19,
    description: "El dolor persistente no depende solo de una zona del cuerpo. Tu día a día también influye, y eso se puede trabajar.",
    downloadName: 'MyoKine-estilo-de-vida-dolor-persistente.jpg',
  },
  {
    id: 'inf-20',
    relatedCategories: ['dolor-persistente', 'columna-lumbar'],
    slug: "plan-crisis-de-dolor",
    title: "Plan para una crisis de dolor",
    topic: "Dolor",
    image: img20,
    description: "Las crisis son parte normal de muchos dolores. No significan que te estés dañando ni que vuelvas a cero.",
    downloadName: 'MyoKine-plan-crisis-de-dolor.jpg',
  },
  {
    id: 'inf-21',
    relatedCategories: ['rehabilitacion-razonamiento', 'retorno-deporte'],
    slug: "como-medir-tu-progreso",
    title: "Cómo medir tu progreso",
    topic: "Dolor",
    image: img21,
    description: "El dolor no es la única medida. Lo más importante es lo que vuelves a poder hacer.",
    downloadName: 'MyoKine-como-medir-tu-progreso.jpg',
  },
];
