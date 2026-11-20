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
    pilarLabel: "Imagenología & Desacople",
    question: "Si realizamos resonancias lumbares a personas de 50 años que jamás han sentido dolor de espalda, ¿qué proporción aproximada presentará signos de degeneración discal?",
    options: [
      { key: "A", text: "Alrededor del 30%, predominando exclusivamente en individuos expuestos a trabajos con alta vibración corporal o carga pesada repetitiva." },
      { key: "B", text: "Cerca del 55%, siendo en su gran mayoría hallazgos clínicos que progresan de forma inminente a dolor persistente en un plazo de 3 a 5 años." },
      { key: "C", text: "Un 80% o más, demostrando que los cambios estructurales son una adaptación natural del envejecimiento biológico no correlacionada linealmente con el dolor." }
    ],
    correctKey: "C",
    evidenceLevel: "Nivel I (Metanálisis publicado en Spine / Guías de Práctica Clínica de la AOPT)",
    reasoning: "El metanálisis seminal de Brinjikji et al. (publicado en la prestigiosa revista Spine, 2015) reveló que el 80% de los sujetos de 50 años absolutamente asintomáticos presentan degeneración discal en resonancias. A los 30 años la tasa ya es de 52%. Por ende, calificar estos hallazgos como 'daño irreparable' o causal directa del dolor lumbar agudo constituye un grave error nocebo según las Guías de Práctica Clínica (CPGs) de mayor prestigio internacional. El dolor persistente es de naturaleza multidimensional y no estructural.",
    linkedArticleId: "1",
    linkedArticleTitle: "La paradoja de la imagenología lumbar: Por qué tu resonancia no es una sentencia"
  },
  {
    id: "q2",
    pilar: "biomecanica-deporte",
    pilarLabel: "Biomecánica & Retorno al Deporte",
    question: "En la fase temprana de rehabilitación del ligamento cruzado anterior (LCA), ¿cuál de estos ejercicios impone un strain o cizallamiento anterior directo mayor sobre el injerto entre los 10° y 30° de flexión?",
    options: [
      { key: "A", text: "La Extensión de rodilla en cadena abierta (NWB) realizada en los rangos finales de extensión activa (entre 30° y 0°)." },
      { key: "B", text: "La Sentadilla bilateral profunda (WB) por debajo de los 90° de flexión debido a las elevadas fuerzas de compresión femororrotuliana." },
      { key: "C", text: "La Prensa de piernas unilateral (WB) controlada en rango medio (45° a 90° de flexión) por la fuerza de tracción del tendón rotuliano." }
    ],
    correctKey: "A",
    evidenceLevel: "Nivel II (Análisis de cinemática computacional publicado en JOSPT / Consensos de la AOPT)",
    reasoning: "La evidencia analizada por Escamilla et al. en el Journal of Orthopaedic & Sports Physical Therapy (JOSPT) demuestra que la extensión de rodilla sentado en cadena cinética abierta (sin carga de peso) genera un strain anterior significativo sobre el LCA en rangos finales de extensión (10°-30°), al carecer del efecto neutralizador de los isquiotibiales que ocurre de forma de cocontracción protectora en cadena cerrada (como en la sentadilla descrita en guías de práctica clínica de vanguardia).",
    linkedArticleId: "8",
    linkedArticleTitle: "Dosificación mecánica del injerto en la rehabilitación de LCA"
  },
  {
    id: "q3",
    pilar: "neurociencia-tendon",
    pilarLabel: "Mecanobiología & Dolor de Tendón",
    question: "Cuando un paciente con tendinopatía de Aquiles experimenta un alivio sustancial de sus síntomas durante las primeras 4-6 semanas de entrenamiento kinesiológico con carga, ¿cuál es el factor directo causal según los datos de mayor impacto?",
    options: [
      { key: "A", text: "La remodelación histológica inmediata de la matriz extracelular, evidenciada por la regularización del alineamiento de las fibras de colágeno tipo I." },
      { key: "B", text: "Cambios en el procesamiento nociceptivo central y modulación cortical (analgesia por ejercicio), junto con el aumento de la autoeficacia motora." },
      { key: "C", text: "Un incremento agudo y detectable en la rigidez estructural (stiffness) del tendón medido por elastografía de transición." }
    ],
    correctKey: "B",
    evidenceLevel: "Nivel I (Revisión Sistemática Cochrane / Publicación de Consenso en BJSM)",
    reasoning: "Revisiones sistemáticas masivas de Cochrane y consensos internacionales en el British Journal of Sports Medicine (BJSM) de autores como Myles Murphy et al. (2023) concluyen que el alivio del dolor y la ganancia de funcionalidad no se correlacionan causalmente con cambios morfológicos tendinosos ni con incrementos de fuerza inmediatos. Las tendinopatías mejoran inicialmente mediante la modulación del dolor central, la neuroplasticidad cortical y la deconstrucción del miedo al movimiento.",
    linkedArticleId: "7",
    linkedArticleTitle: "¿Por qué fortalecer un tendón no siempre sana su dolor? Desmitificando las tendinopatías"
  },
  {
    id: "q4",
    pilar: "cinematica-hombro",
    pilarLabel: "Cinemática Clínica",
    question: "Al evaluar a un paciente con dolor de hombro relacionado al manguito rotador, ¿cómo debe interpretarse la debilidad muscular detectada inicialmente mediante dinamometría isométrica?",
    options: [
      { key: "A", text: "Como una atrofia muscular por desuso primario, la cual requiere sobrecarga excéntrica de alta tensión inmediata para regenerar miofibrillas." },
      { key: "B", text: "Como un microdesgarro inadvertido en las fibras del tendón supraespinoso que compromete de forma puramente mecánica la palanca de fuerza." },
      { key: "C", text: "Como un fenómeno de inhibición artrogénica o cortical de protección ante el dolor, donde el cerebro restringe el torque muscular voluntario." }
    ],
    correctKey: "C",
    evidenceLevel: "Nivel II (Investigación clínica experimental publicada en JOSPT / Consensos de Jeremy Lewis)",
    reasoning: "Como analizan Jeremy Lewis, Cook y Powell en publicaciones del Journal of Orthopaedic & Sports Physical Therapy (JOSPT), la aparente debilidad del manguito rotador suele ser un epifenómeno de inhibición cortical protectora: al suprimir el dolor transitoriamente mediante bloqueos analgésicos subacromiales, la fuerza máxima registrada en dinamometría se restablece de inmediato. El cerebro restringe el torque muscular por protección, no por daño tisular mecánico primario.",
    linkedArticleId: "10",
    linkedArticleTitle: "La ilusión de la medición de fuerza en el dolor de hombro"
  },
  {
    id: "q5",
    pilar: "sesgos-cognitivos",
    pilarLabel: "Razonamiento Clínico & Sesgos",
    question: "¿Qué fenómeno estadístico-clínico explica con mayor frecuencia la mejoría masiva de un paciente con lumbago agudo tras realizarle tu técnica de terapia manual favorita?",
    options: [
      { key: "A", text: "La historia natural autolimitada del dolor lumbar agudo inespecífico complementada por la regresión a la media estadística." },
      { key: "B", text: "La modulación puramente mecánica de la posición discal, que reduce la compresión sobre la raíz nerviosa tras la manipulación." },
      { key: "C", text: "La ruptura y liberación de adherencias de la fascia toracolumbar profunda que restaura el deslizamiento interplanar óptimo." }
    ],
    correctKey: "A",
    evidenceLevel: "Nivel III (Metodología de Revisiones Sistemáticas de Cochrane y Guías de Práctica Clínica de Dolor Lumbar)",
    reasoning: "Las Guías de Práctica Clínica internacionales de mayor prestigio y revisiones de Cochrane confirman que la mayoría de los lumbagos agudos son procesos autolimitados benignos. Los pacientes acuden a consulta en el punto álgido de dolor, por lo que la regresión a la media predice una mejoría probabilística inmediata. Atribuir este resultado a hipótesis mecánicas dudosas (como 'alinear vértebras') es un sesgo cognitivo de confirmación; las terapias manuales modulan la sensibilidad periférica y central del sistema nervioso, no su estructura ósea.",
    linkedArticleId: "5",
    linkedArticleTitle: "El sesgo de confirmación en la camilla: Cuándo nuestras técnicas favoritas nos mienten"
  },
  {
    id: "q6",
    pilar: "biologia-cartilago",
    pilarLabel: "Biología Tisular & Nutrición",
    question: "¿De qué forma responde el cartílago articular de la rodilla de corredores recreativos al estímulo continuo del trote habitual?",
    options: [
      { key: "A", text: "Un deterioro condral progresivo por fatiga de material mecánico, indicando que el trote regular acelera la pérdida de glicosaminoglicanos." },
      { key: "B", text: "Una respuesta neutra ya que el cartílago, al ser un tejido avascular y aneural, carece de mecanorreceptores activos para modular su matriz." },
      { key: "C", text: "Un proceso de acondicionamiento biológico adaptativo donde el bombeo cíclico de carga estimula la síntesis de proteoglicanos y la lubricación hidrodinámica." }
    ],
    correctKey: "C",
    evidenceLevel: "Nivel I (Revisión Sistemática publicada en Journal of Orthopaedic & Sports Physical Therapy - JOSPT)",
    reasoning: "Una revisión sistemática seminal publicada en JOSPT (Alentorn-Geli et al.) reveló que los corredores recreativos regulares presentan tasas significativamente menores de artrosis de rodilla en comparación con sedentarios. Al ser un tejido avascular, el cartílago requiere de la carga y el bombeo mecánico continuo (compresión y descompresión) para absorber nutrientes del líquido sinovial, estimulando la síntesis en los condrocitos y potenciando la resiliencia.",
    linkedArticleId: "4",
    linkedArticleTitle: "La verdad sobre el \"desgaste de rodilla\": Por qué tus cartílagos no son neumáticos"
  }
];
