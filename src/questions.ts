export interface ClinicalQuestion {
  id: string;
  pilar: "mitos-imagen" | "biomecanica-deporte" | "neurociencia-tendon" | "cinematica-hombro" | "sesgos-cognitivos" | "biologia-cartilago";
  pilarLabel: string;
  question: string;
  options: {
    key: string;
    text: string;
  }[];
  correctKey: string;
  evidenceLevel: string;
  reasoning: string;
  linkedArticleId: string;
  linkedArticleTitle: string;
}

export const CLINICAL_QUESTIONS: ClinicalQuestion[] = [
  {
    id: "q1",
    pilar: "mitos-imagen",
    pilarLabel: "Imágenes y dolor",
    question: "Si le haces una resonancia lumbar a personas de 50 años que nunca han tenido dolor de espalda, ¿qué proporción mostrará degeneración discal?",
    options: [
      { key: "A", text: "Cerca del 30 %, sobre todo en quienes hacen trabajos pesados." },
      { key: "B", text: "Alrededor del 80 %, aunque no tengan ningún dolor." },
      { key: "C", text: "Cerca del 55 %, y la mayoría tendrá dolor en pocos años." }
    ],
    correctKey: "B",
    evidenceLevel: "Revisión sistemática (Brinjikji et al., AJNR 2015)",
    reasoning: "Brinjikji y colaboradores reunieron resonancias de más de 3.000 personas sin dolor. La degeneración discal aparecía en el 37 % a los 20 años, en el 52 % a los 30 y en el 80 % a los 50. Son hallazgos frecuentes con la edad y no explican por sí solos el dolor, así que presentarlos como \"daño\" puede generar miedo innecesario.",
    linkedArticleId: "1",
    linkedArticleTitle: "La paradoja de la imagenología lumbar"
  },
  {
    id: "q2",
    pilar: "biomecanica-deporte",
    pilarLabel: "LCA y retorno al deporte",
    question: "En la rehabilitación temprana de LCA, ¿qué ejercicio genera más tensión sobre el injerto entre los 10° y 30° de flexión?",
    options: [
      { key: "A", text: "La sentadilla bilateral profunda, bajo los 90° de flexión." },
      { key: "B", text: "La prensa unilateral en rango medio, entre 45° y 90°." },
      { key: "C", text: "La extensión de rodilla en cadena abierta, cerca de la extensión completa." }
    ],
    correctKey: "C",
    evidenceLevel: "Revisión biomecánica (Escamilla et al., JOSPT 2012)",
    reasoning: "Según la revisión de Escamilla y colaboradores, la extensión de rodilla en cadena abierta produce la mayor tensión anterior sobre el LCA en los últimos grados de extensión. En cadena cerrada, la cocontracción de isquiotibiales y la carga axial reducen esa traslación tibial anterior. No significa prohibir la cadena abierta, sino dosificar el rango según la etapa.",
    linkedArticleId: "8",
    linkedArticleTitle: "Dosificación mecánica del injerto en la rehabilitación de LCA"
  },
  {
    id: "q3",
    pilar: "neurociencia-tendon",
    pilarLabel: "Tendón y dolor",
    question: "Una persona con tendinopatía de Aquiles mejora mucho en sus primeras semanas de ejercicio con carga. ¿Qué explica mejor esa mejoría según la evidencia?",
    options: [
      { key: "A", text: "Factores como la modulación del dolor, la confianza y la exposición al movimiento." },
      { key: "B", text: "Una remodelación rápida y medible de las fibras de colágeno del tendón." },
      { key: "C", text: "Un aumento proporcional de la fuerza y la rigidez del tendón." }
    ],
    correctKey: "A",
    evidenceLevel: "Revisión sistemática con metanálisis (Murphy et al., 2023)",
    reasoning: "El metanálisis de Murphy y colaboradores encontró que la mejoría clínica en la tendinopatía de Aquiles no se relaciona de forma consistente con cambios en la estructura del tendón ni en la fuerza muscular. Los mecanismos probablemente son varios, e incluyen cambios en el procesamiento del dolor y en cómo la persona se relaciona con la carga. La carga sigue siendo el tratamiento central; lo que cambia es cómo explicamos por qué funciona.",
    linkedArticleId: "7",
    linkedArticleTitle: "¿Por qué fortalecer un tendón no siempre sana su dolor?"
  },
  {
    id: "q4",
    pilar: "cinematica-hombro",
    pilarLabel: "Hombro",
    question: "Un paciente con dolor de hombro relacionado al manguito rotador muestra poca fuerza en el dinamómetro. ¿Cómo conviene interpretarlo de entrada?",
    options: [
      { key: "A", text: "Como una rotura del tendón que limita mecánicamente la fuerza." },
      { key: "B", text: "Como una posible inhibición por dolor, no necesariamente daño estructural." },
      { key: "C", text: "Como atrofia por desuso que exige carga excéntrica máxima inmediata." }
    ],
    correctKey: "B",
    evidenceLevel: "Estudios clínicos y opinión de expertos (Cook, Lewis y Powell)",
    reasoning: "En personas con dolor de hombro, la fuerza medida puede aumentar cuando se reduce el dolor, por ejemplo tras una infiltración anestésica. Eso sugiere que parte de la debilidad refleja una inhibición protectora y no solo un problema del tendón. Por eso la fuerza medida en presencia de dolor es un mal indicador del estado estructural.",
    linkedArticleId: "10",
    linkedArticleTitle: "La ilusión de la medición de fuerza en el dolor de hombro"
  },
  {
    id: "q5",
    pilar: "sesgos-cognitivos",
    pilarLabel: "Razonamiento clínico",
    question: "Un paciente con lumbago agudo mejora mucho después de tu técnica manual favorita. ¿Qué explica con más frecuencia esa mejoría?",
    options: [
      { key: "A", text: "La técnica reposicionó el disco y liberó la raíz nerviosa." },
      { key: "B", text: "Se liberaron adherencias de la fascia toracolumbar." },
      { key: "C", text: "La historia natural del lumbago y la regresión a la media." }
    ],
    correctKey: "C",
    evidenceLevel: "Guías de práctica clínica y estudios de pronóstico en dolor lumbar",
    reasoning: "La mayoría de los episodios agudos de dolor lumbar mejoran con el tiempo. Además, las personas suelen consultar cuando el dolor está en su peak, así que lo esperable es que baje en los días siguientes (regresión a la media). Atribuir toda la mejoría a nuestra técnica es un sesgo de confirmación. Eso no quita que la terapia manual pueda aliviar síntomas a corto plazo; el punto es no inventar mecanismos estructurales.",
    linkedArticleId: "5",
    linkedArticleTitle: "El sesgo de confirmación en la camilla"
  },
  {
    id: "q6",
    pilar: "biologia-cartilago",
    pilarLabel: "Cartílago y carga",
    question: "¿Qué relación hay entre correr de forma recreativa y la artrosis de rodilla y cadera?",
    options: [
      { key: "A", text: "Los corredores recreativos tienen menos artrosis que las personas sedentarias." },
      { key: "B", text: "Correr desgasta el cartílago y aumenta la artrosis con los años." },
      { key: "C", text: "No hay ninguna relación, porque el cartílago no responde a la carga." }
    ],
    correctKey: "A",
    evidenceLevel: "Revisión sistemática con metanálisis (Alentorn-Geli et al., JOSPT 2017)",
    reasoning: "En el metanálisis de Alentorn-Geli y colaboradores, los corredores recreativos tuvieron menor prevalencia de artrosis de cadera y rodilla que los sedentarios y que los corredores de élite. El cartílago es un tejido vivo que se nutre y adapta con la carga cíclica, por lo que la idea del \"desgaste por uso\" no se sostiene para la actividad recreativa.",
    linkedArticleId: "4",
    linkedArticleTitle: "La verdad sobre el \"desgaste de rodilla\""
  }
];
