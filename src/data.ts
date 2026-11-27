export interface Reference {
  author: string;
  year: string;
  journal: string;
  doi?: string;
  title: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  categoryType: 'segmento' | 'tematica' | 'paciente';
  categoryValue: string;
  categoryLabel: string;
  date: string;
  author: string;
  readingTime: number;
  pullQuote: string;
  content: string; // Markdown supported
  references: Reference[];
  summary: string; // 2-line description that hooks
  audience?: 'paciente' | 'clinico' | 'ambos';
  /** Si es true, no aparece en el journal: solo se ve en #/borradores. */
  borrador?: boolean;
}

export const CATEGORIES = {
  segmento: [
    { value: 'columna-lumbar', label: 'Columna lumbar', desc: 'Evidencia sobre modelos biocomportamentales y el desacople estructural.' },
    { value: 'columna-cervical', label: 'Columna cervical', desc: 'Control motor, propiocepción y abordaje actual de la inestabilidad.' },
    { value: 'hombro', label: 'Hombro', desc: 'Cinemática escapulohumeral, manguito rotador y el mito de la simetría.' },
    { value: 'rodilla', label: 'Rodilla', desc: 'Mecanobiología del cartílago, tendinopatías y dosificación de carga.' },
    { value: 'tobillo-pie', label: 'Tobillo y pie', desc: 'Inestabilidad crónica, rigidez del tendón y control neuromuscular.' },
    { value: 'cadera', label: 'Cadera', desc: 'Conflicto femoroacetabular y el rol de la fuerza en la estabilidad articular.' },
    { value: 'codo-muneca', label: 'Codo y muñeca', desc: 'Manejo de epicondilalgias y neurodinámica aplicada de miembro superior.' }
  ],
  tematica: [
    { value: 'dolor-persistente', label: 'Dolor persistente y neurociencia', desc: 'Educación en neurociencia del dolor y modulación central.' },
    { value: 'sesgos-cognitivos', label: 'Sesgos cognitivos en clínica', desc: 'Trampas heurísticas en el diagnóstico y razonamiento clínico.' },
    { value: 'entrenamiento-fuerza', label: 'Fuerza como intervención', desc: 'Dosificación, adaptaciones neuromusculares y programación de ejercicio.' },
    { value: 'retorno-deporte', label: 'Retorno al deporte (RTS)', desc: 'Criterios de progresión biológica, carga de entrenamiento y asimetrías.' },
    { value: 'rehabilitacion-razonamiento', label: 'Razonamiento clínico', desc: 'Fisiología del tejido, toma de decisiones y modelos integrativos.' },
    { value: 'nutricion', label: 'Nutrición y composición', desc: 'Ingesta proteica, inflamación sistémica y reparación tisular.' },
    { value: 'sueno', label: 'Sueño y recuperación', desc: 'Cómo dormir influye en el dolor, la recuperación y el rendimiento.' },
    { value: 'salud-mental', label: 'Salud mental y movimiento', desc: 'Emociones, estrés, interocepción y cómo se viven en el cuerpo.' },
    { value: 'ciencias-deporte', label: 'Ciencias del deporte', desc: 'Monitoreo de carga interna y externa, fisiología del rendimiento.' },
    { value: 'fisiologia-clinica', label: 'Fisiología clínica del ejercicio', desc: 'Fitness cardiorrespiratorio, pasos diarios y ejercicio en enfermedades crónicas.' }
  ],
  paciente: [
    { value: 'evidencia-dolor', label: '¿Qué dice la evidencia sobre mi dolor?', desc: 'Hallazgos explicados en simple, para que entiendas tu proceso.' },
    { value: 'diagnostico', label: 'Entender mi diagnóstico', desc: 'Traducción de términos clínicos atemorizantes a explicaciones biológicas útiles.' },
    { value: 'mitos', label: 'Mitos frecuentes', desc: 'Ideas antiguas que no se sostienen, como la postura ideal o la alineación perfecta.' },
    { value: 'preguntas-kinesiologo', label: 'Preguntas para tu kinesiólogo', desc: 'Herramientas prácticas para que tomes el control de tu consulta.' }
  ]
};

import { ARTICULOS_NUEVOS } from './data/articulosNuevos';
import { BORRADORES } from './data/borradores';
export { BORRADORES };

export const STATIC_ARTICLES: Article[] = [
  ...ARTICULOS_NUEVOS,
  {
    id: '49',
    slug: 'dolor-hombro-atencion-primaria-haas-2026',
    title: 'Dolor de hombro: lo que dice la revisión más reciente sobre cómo manejarlo',
    subtitle: 'Haas, Ibounig y Buchbinder (JAMA Internal Medicine, 2026) resumen qué es el dolor de hombro más frecuente, cuándo preocuparse y por qué casi nunca hace falta partir con una resonancia.',
    categoryType: 'segmento',
    categoryValue: 'hombro',
    categoryLabel: 'Hombro',
    audience: 'ambos',
    date: '25 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 6,
    summary: 'El dolor de hombro es una de las consultas más comunes. La mayoría de las veces viene de tejidos alrededor de la articulación, no es grave y mejora con poco más que información, ajustes y tiempo.',
    pullQuote: 'La mayoría de las personas con dolor subacromial se recupera por completo con una intervención mínima.',
    content: `El dolor de hombro es la **tercera consulta musculoesquelética más frecuente** en atención primaria. Romi Haas, Thomas Ibounig y Rachelle Buchbinder publicaron en 2026 una revisión en *JAMA Internal Medicine* para ordenar qué sabemos sobre cómo evaluarlo y tratarlo.

### De dónde viene el dolor, casi siempre

En atención primaria, la mayoría de los casos aparece **sin un golpe ni una caída** y tiene que ver con los tejidos blandos que rodean la articulación. La zona más frecuente es la región subacromial, justo debajo del acromion.

Los autores proponen hablar de **"dolor subacromial"** en vez de usar etiquetas que se superponen y se definen distinto según quién las use: tendinopatía o rotura del manguito, síndrome de pinzamiento o bursitis subacromial. Menos veces el dolor viene de la articulación misma, como en la artrosis glenohumeral o la capsulitis adhesiva (el "hombro congelado").

### Cuándo sí hay que mirar con más cuidado

La evaluación se basa en una buena conversación y un buen examen físico: cómo y cuándo duele, qué movimientos se limitan y, sobre todo, **descartar causas graves**, que son raras. Entre ellas, una infección, un tumor o un dolor que en realidad viene de otro lugar (por ejemplo, del cuello o del corazón).

La derivación a especialista se reserva para la sospecha de algo serio (infección, tumor, fractura o luxación), pérdida importante de función o de fuerza por causa neurológica, signos de una enfermedad inflamatoria sistémica, o un dolor que persiste o empeora a pesar del manejo.

### Por qué no partir con una imagen

Sin un trauma importante ni señales de alarma (fiebre, baja de peso sin explicación o antecedentes de cáncer), **la imagen precoz no está indicada**. Lo que se ve en una resonancia o una ecografía muchas veces no se relaciona con los síntomas, rara vez cambia lo que se hace y puede llevar a sobrediagnóstico y a tratamientos innecesarios.

### Qué se recomienda primero

Una vez descartado lo grave, el tratamiento inicial es parecido para casi todas las personas, igual que en otros dolores musculoesqueléticos:

- **Explicar** que el pronóstico es favorable.
- **Aliviar los síntomas** y ajustar la actividad si hace falta.
- **Dar tiempo** con seguimiento (lo que en inglés llaman *watchful waiting*).

La revisión es clara en un punto: hay evidencia de **alta certeza** de que el dolor subacromial **no mejora más con cirugía**.

En la práctica, ese "ajustar la actividad" suele traducirse en un plan de ejercicio progresivo y adaptado a la persona. Otras revisiones sobre el manguito rotador coinciden en que la educación y el ejercicio son la primera línea de tratamiento.

### Lo que me llevo

Que una imagen muestre cambios en el manguito no significa que eso explique el dolor ni que haga falta operar. Lo esperable es mejorar, aunque a veces tome tiempo y tenga altibajos. Y que nuestra explicación es parte del tratamiento: descartar lo grave, evitar etiquetas que asustan, pedir imágenes solo cuando cambian la conducta y acompañar con un plan claro es, según esta revisión, lo que más ayuda.

### Límites

Es una revisión narrativa para atención primaria, no una revisión sistemática con nuevos datos. Resume la evidencia disponible y la opinión de sus autores, que son referentes en el tema.`,
    references: [
      {
        author: 'Haas R, Ibounig T, Buchbinder R.',
        year: '2026',
        journal: 'JAMA Internal Medicine, 186(10):1256-1268',
        doi: '10.1001/jamainternmed.2026.3135',
        title: 'Management of Shoulder Pain in Primary Care: A Review'
      },
      {
        author: 'Boland K, Smith C, Bond H, Briggs S, Walton J.',
        year: '2021',
        journal: 'Shoulder & Elbow',
        title: 'Current concepts in the rehabilitation of rotator cuff related disorders'
      }
    ]
  },
  {
    id: '48',
    slug: 'relaciones-sociales-longevidad-holt-lunstad',
    title: '¿Qué nos hace vivir más? Lo que dicen los estudios sobre las relaciones',
    subtitle: 'Un metaanálisis de 148 estudios y el estudio de Harvard sobre la vida adulta llegan a una conclusión parecida: las relaciones pesan en la salud tanto como otros factores que sí solemos medir.',
    categoryType: 'tematica',
    categoryValue: 'salud-mental',
    categoryLabel: 'Salud mental y movimiento',
    audience: 'ambos',
    date: '25 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 5,
    summary: 'En 148 estudios con más de 300 mil personas, quienes tenían relaciones sociales más fuertes tuvieron un 50 % más de probabilidad de sobrevivir durante el seguimiento.',
    pullQuote: 'La influencia de las relaciones sociales sobre la mortalidad es comparable con factores de riesgo bien establecidos.',
    content: `Cuando pensamos en vivir más y mejor, solemos hablar de ejercicio, alimentación y sueño. Las relaciones casi nunca entran en la conversación clínica, y la evidencia sugiere que deberían.

### El metaanálisis de Holt-Lunstad

En 2010, **Julianne Holt-Lunstad**, Timothy Smith y Bradley Layton reunieron **148 estudios** con **308.849 personas** seguidas en el tiempo. Querían saber cuánto influyen las relaciones sociales en el riesgo de morir.

El resultado: quienes tenían relaciones sociales más fuertes tuvieron un **50 % más de probabilidad de sobrevivir** durante el periodo de seguimiento (OR 1,50; IC 95 % 1,42 a 1,59).

Ese efecto fue parecido sin importar la edad, el sexo, el estado de salud inicial, la causa de muerte o el tiempo de seguimiento.

[[figura:relaciones-integracion]]

### No es lo mismo vivir acompañado que estar integrado

El tipo de medición importó mucho:

- La relación fue **más fuerte** cuando se midió la **integración social** de forma completa: tener vínculos, sentirse parte, recibir apoyo (OR 1,91).
- Fue **más débil** cuando solo se preguntó si la persona vivía sola o acompañada (OR 1,19, sin diferencia clara).

Es decir, no basta con tener gente cerca. Pesa más la calidad y la red de vínculos que la persona siente que tiene.

Los autores concluyen que la influencia de las relaciones sobre la mortalidad es **comparable con factores de riesgo bien establecidos**.

### El estudio de Harvard

El **Estudio de Harvard sobre el Desarrollo Adulto** sigue a sus participantes desde 1938. Robert Waldinger, su director actual, y Marc Schulz resumieron sus hallazgos en el libro *The Good Life* (2023). La idea que más repiten es que la calidad de las relaciones estuvo entre lo que mejor acompañó una vida más sana y satisfactoria.

### Qué tiene que ver esto con la kinesiología

Mucho más de lo que parece:

- **El dolor persistente aísla.** Dejar de hacer lo que uno disfrutaba muchas veces significa dejar de ver a otros. Recuperar actividad también es recuperar vínculos.
- **El ejercicio en compañía** suele sostenerse mejor en el tiempo. Un plan que se hace con un amigo o en grupo puede ser más útil que uno "perfecto" que se hace solo.
- **Preguntar por la red de apoyo** es parte de una evaluación centrada en la persona, no un tema aparte.

### ¿Qué tan grande es el efecto?

Para dimensionarlo, los autores compararon su resultado con otros factores de riesgo conocidos. La magnitud de la asociación entre relaciones sociales débiles y mortalidad fue comparable a la de factores como el tabaquismo o el consumo excesivo de alcohol, y mayor que la de otros como la inactividad física o la obesidad. Es una comparación aproximada entre estudios distintos, pero ayuda a entender por qué este tema no es menor.

### ¿Por qué las relaciones influirían en la salud?

Los autores mencionan varios caminos posibles, que pueden actuar al mismo tiempo:

- **Amortiguar el estrés.** Tener apoyo reduce la respuesta del cuerpo ante situaciones difíciles.
- **Influir en los hábitos.** Las personas cercanas pueden animarnos a cuidarnos, a ir al médico o a movernos más.
- **Dar sentido y propósito.** Sentirse parte de algo y tener roles que importan.
- **Ayuda práctica.** Alguien que acompañe a una consulta, que ayude cuando estamos enfermos o que note que algo no anda bien.

### Lo que puedo hacer como kinesiólogo

- **Preguntar.** "¿Con quién vives?", "¿quién te acompaña en esto?", "¿has dejado de ver a alguien por el dolor?". Son preguntas cortas que abren mucha información.
- **Incluir a otros cuando tiene sentido.** Invitar a un familiar a una sesión, proponer actividades en pareja o en grupo, o conectar a la persona con talleres o clubes.
- **Usar las metas sociales.** Muchas veces la mejor motivación no es "bajar el dolor", sino volver a jugar con los nietos, salir a caminar con amigos o volver al equipo.
- **Notar el aislamiento.** Si alguien está muy solo, vale la pena considerarlo parte del cuadro y, si corresponde, sugerir apoyo de otros profesionales.

### Límites

Son estudios observacionales: muestran asociación, no prueban que las relaciones causen por sí solas una vida más larga. Las personas con más vínculos también pueden diferir en otros hábitos o condiciones. Aun así, el efecto se repite en poblaciones y contextos muy distintos.`,
    references: [
      {
        author: 'Holt-Lunstad J, Smith TB, Layton JB.',
        year: '2010',
        journal: 'PLoS Medicine, 7(7):e1000316',
        doi: '10.1371/journal.pmed.1000316',
        title: 'Social relationships and mortality risk: a meta-analytic review'
      },
      {
        author: 'Waldinger RJ, Schulz MS.',
        year: '2023',
        journal: 'Simon & Schuster (libro)',
        title: 'The Good Life: Lessons from the World’s Longest Scientific Study of Happiness'
      }
    ]
  },
  {
    id: '47',
    slug: 'modelo-transteorico-cambio-adherencia',
    title: '¿Por qué una persona no cambia aunque sepa lo que tiene que hacer? El modelo transteórico',
    subtitle: 'Prochaska y DiClemente describieron el cambio de conducta como un proceso por etapas. Reconocer en cuál está tu paciente cambia qué decir y qué prescribir.',
    categoryType: 'tematica',
    categoryValue: 'rehabilitacion-razonamiento',
    categoryLabel: 'Razonamiento clínico',
    audience: 'clinico',
    date: '25 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 6,
    summary: 'La falta de adherencia rara vez es solo falta de información. El modelo transteórico ayuda a ajustar la intervención al momento en que está cada persona.',
    pullQuote: 'Un buen programa de carga entregado en el momento equivocado puede quedar sin hacerse.',
    content: `Le explicaste todo con claridad, le diste una rutina bien pensada y a la semana siguiente vuelve sin haberla hecho. Es fácil concluir que "no tiene motivación". El **modelo transteórico** propone otra lectura: quizás la persona no estaba en el momento de actuar.

### Las etapas del cambio

James Prochaska y Carlo DiClemente describieron el cambio de conducta como un proceso que pasa por etapas:

1. **Precontemplación.** No ve el problema o no planea cambiar pronto.
2. **Contemplación.** Reconoce el problema, pero duda y pesa pros y contras.
3. **Preparación.** Quiere actuar pronto y da los primeros pasos.
4. **Acción.** Cambia su conducta de forma activa y visible.
5. **Mantenimiento.** Sostiene el cambio y trabaja para no recaer.

Algunas versiones agregan una sexta etapa, la terminación. Lo importante es que **volver a una etapa anterior es parte habitual del proceso**. La mayoría de las personas recorre el ciclo varias veces antes de consolidar un cambio.

En poblaciones en riesgo, Prochaska y Velicer describieron una regla aproximada: cerca de **40 %** está en precontemplación, **40 %** en contemplación y solo **20 %** en preparación. O sea, la mayoría de quienes nos consultan no está lista para "la acción" el primer día.

[[figura:etapas-cambio]]

### Cómo ajustar lo que hacemos

- **Contemplación:** explorar dudas, expectativas, pros y contras antes de sumar ejercicios.
- **Preparación:** acordar un primer paso pequeño y concreto: qué día, cuánto y dónde.
- **Acción:** dar retroalimentación, progresar la carga y reforzar lo logrado.
- **Mantenimiento:** anticipar los días difíciles y acordar qué hacer si se corta la rutina.

### En dolor persistente

Kerns y colaboradores desarrollaron el *Pain Stages of Change Questionnaire*, que mide qué tan dispuesta está una persona a autogestionar su dolor. Jensen y colaboradores observaron que, durante un tratamiento multidisciplinario, aumentar esa disposición se asoció con cambios en las estrategias de afrontamiento y con mejoría.

### Lo que cambia en la consulta

- **El mismo plan, otro resultado.** Un buen programa entregado en el momento equivocado puede quedar sin hacerse.
- **La recaída deja de ser un fracaso.** Pasa a ser parte esperable del ciclo y se puede planificar con la persona, sin culpa.
- **Las habilidades de comunicación pesan tanto como la técnica.** Saber escuchar, preguntar y acordar es parte del tratamiento.

### Más allá de las etapas

El modelo no se limita a describir dónde está la persona. También propone qué ayuda a avanzar:

- **Balance decisional.** En las primeras etapas, las desventajas de cambiar suelen pesar más que las ventajas. A medida que la persona avanza, ese balance se invierte. Prochaska y Velicer encontraron este patrón de forma consistente en 12 conductas de salud distintas.
- **Autoeficacia.** La confianza en poder sostener el cambio, incluso en situaciones difíciles, crece a medida que la persona avanza.
- **Tentaciones.** Las situaciones que empujan a volver a la conducta anterior, como el cansancio, el estrés o la falta de tiempo.
- **Procesos de cambio.** Los autores identificaron diez, desde tomar conciencia del problema hasta reorganizar el entorno o buscar apoyo. En las etapas tempranas ayudan más los procesos de reflexión; en las tardías, los de acción.

### Un ejemplo en la consulta

Imagina a dos personas con dolor lumbar crónico a las que les propones caminar 20 minutos al día.

- **La primera** dice: "no creo que caminar me sirva, lo mío es un disco". Probablemente está en precontemplación o contemplación. Darle una rutina detallada puede no servir de mucho. Primero vale la pena conversar sobre qué entiende de su dolor y qué espera.
- **La segunda** dice: "quiero hacerlo, pero no sé cómo partir con mi horario". Está en preparación. Aquí sí conviene acordar algo concreto: qué días, a qué hora, con quién y qué hará si llueve.

Mismo diagnóstico, mismo consejo, pero una conversación muy distinta.

### Preguntas que me sirven

- "¿Qué tan importante es esto para ti ahora, del 0 al 10?"
- "¿Y qué tan seguro te sientes de poder hacerlo?"
- "¿Qué te haría pasar de un 4 a un 6?"
- "¿Qué podría hacer que lo dejes, y qué haríamos en ese caso?"

Son preguntas simples que ayudan a ubicar la etapa sin aplicar un cuestionario y a que la persona sea parte de la decisión.

### Límites

El modelo es muy usado y útil para ordenar la conversación, pero también ha sido criticado: las etapas no siempre son tan separadas en la vida real, y las intervenciones "por etapa" no han mostrado ventajas consistentes en todas las conductas. Sirve como mapa para conversar, no como receta.`,
    references: [
      {
        author: 'Prochaska JO, Velicer WF.',
        year: '1997',
        journal: 'American Journal of Health Promotion, 12(1):38-48',
        doi: '10.4278/0890-1171-12.1.38',
        title: 'The transtheoretical model of health behavior change'
      },
      {
        author: 'Prochaska JO, DiClemente CC, Norcross JC.',
        year: '1992',
        journal: 'American Psychologist, 47(9):1102-1114',
        title: 'In search of how people change: applications to addictive behaviors'
      },
      {
        author: 'Kerns RD, Rosenberg R, Jamison RN, Caudill MA, Haythornthwaite J.',
        year: '1997',
        journal: 'Pain, 72(1-2):227-234',
        title: 'Readiness to adopt a self-management approach to chronic pain: the Pain Stages of Change Questionnaire (PSOCQ)'
      }
    ]
  },
  {
    id: '46',
    slug: 'creatina-inmovilizacion-rehabilitacion-pratt-2026',
    title: 'Creatina durante la inmovilización y la rehabilitación: lo que sabemos y lo que no',
    subtitle: 'Una revisión sistemática de Pratt y colaboradores (Experimental Physiology, 2026) reunió los ensayos que probaron creatina cuando un brazo o una pierna estuvo inmovilizado.',
    categoryType: 'tematica',
    categoryValue: 'nutricion',
    categoryLabel: 'Nutrición y composición',
    audience: 'ambos',
    date: '25 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 6,
    summary: 'La creatina no parece evitar la pérdida de músculo durante la inmovilización. Durante la rehabilitación con ejercicio de fuerza hay señales de beneficio, pero la evidencia todavía es poca.',
    pullQuote: 'La creatina podría ayudar cuando vuelve la carga, pero no reemplaza al ejercicio.',
    content: `Después de una lesión o una cirugía, es común pasar días o semanas con una pierna o un brazo inmovilizado. En ese tiempo el músculo se achica rápido. La creatina tiene buena evidencia junto al entrenamiento de fuerza, así que la pregunta es lógica: **¿sirve también cuando no podemos entrenar?**

### El estudio

**Jedd Pratt** y su equipo (con Darren Candow, Eric Rawson, Scott Forbes y Konstantinos Prokopidis) hicieron una revisión sistemática hasta marzo de 2026. Encontraron **6 ensayos aleatorizados con placebo**, con **118 participantes** jóvenes (edad promedio entre 15 y 24 años) inmovilizados entre **1 y 2 semanas**. La dosis típica fue de 20 g al día por 5 a 7 días, seguida de 3 a 5 g al día.

### Durante la inmovilización

- **Tamaño del músculo:** dos estudios que midieron el cuádriceps con tomografía o resonancia encontraron **pérdidas parecidas** con creatina y con placebo (−5,6 % vs −5,5 % y −11,0 % vs −9,4 %).
- **Masa magra:** otros dos estudios mostraron menos pérdida con creatina, pero se midió con DXA o bioimpedancia. Estos métodos se afectan por el agua, y la creatina retiene agua dentro del músculo. Los autores advierten que eso podría explicar la diferencia **sin que realmente se haya conservado más músculo**.
- **Fuerza y rendimiento:** resultados mezclados. Hubo algo de beneficio en estudios de miembro superior, pero no en miembro inferior.

### Durante la rehabilitación

Cuatro estudios siguieron la recuperación, y tres usaron ejercicio de fuerza. Dos encontraron **mayores ganancias con creatina**:

- Tamaño del cuádriceps: **21,3 % vs 14,3 %**.
- Masa magra de la pierna: 5,6 % vs 3,8 %.
- Potencia: 52,2 % vs 35,2 %.
- Fuerza: 28,7 % vs 22,8 %.

Otros dos estudios no mostraron diferencias en la recuperación de la fuerza máxima.

[[figura:creatina-rehab]]

### Lo que me llevo

Durante la inmovilización, la creatina no parece evitar la atrofia por sí sola. Lo que más ayuda sigue siendo volver a cargar el músculo apenas se pueda, de forma segura y progresiva. En la rehabilitación, acompañada de ejercicio de fuerza, podría sumar algo, pero la evidencia todavía no permite afirmarlo con seguridad. Si alguien quiere usarla, conviene conversarlo con su equipo de salud, sobre todo si tiene alguna enfermedad renal o toma otros medicamentos.

### Por qué se pensó que podía ayudar

La creatina aumenta las reservas de fosfocreatina del músculo, una fuente rápida de energía para esfuerzos cortos e intensos. Junto al entrenamiento de fuerza, se ha asociado a más ganancias de masa magra y fuerza en muchos estudios. Por eso se planteó que, en un período sin entrenamiento, quizás podría frenar la pérdida de músculo o ayudar a recuperarlo después.

Los resultados de esta revisión muestran que esa idea funciona mejor en la teoría que en los datos actuales, al menos durante la inmovilización.

### La trampa de la medición

Este punto merece una explicación. La creatina hace que el músculo retenga más agua dentro de sus células. Métodos como la bioimpedancia o el DXA no distinguen bien entre agua y tejido muscular, así que pueden mostrar "más masa magra" sin que haya realmente más músculo.

Por eso los autores dan más peso a los estudios que midieron el tamaño del cuádriceps con tomografía o resonancia. Y en esos estudios, la pérdida de músculo fue prácticamente igual con creatina y con placebo.

### Lo que sí parece claro

Lo que más protege el músculo durante y después de una inmovilización no es un suplemento, sino:

- **Moverse lo antes posible**, dentro de lo que permita la lesión.
- **Activar el músculo** aunque la articulación esté inmovilizada, con contracciones isométricas si están permitidas.
- **Entrenar la pierna o el brazo sano**, que también ayuda a mantener la fuerza del lado inmovilizado por efectos del sistema nervioso.
- **Comer suficiente proteína** y energía.
- **Volver a cargar de forma progresiva** en cuanto se pueda.

La creatina, si se usa, sería un complemento de todo esto, no un reemplazo.

### Límites

Son pocos estudios, pequeños, en personas jóvenes y sanas, con inmovilizaciones cortas. Justamente quienes más músculo pierden al estar quietos (personas mayores y pacientes hospitalizados) **no han sido estudiados**. Los autores piden ensayos en esas poblaciones antes de sacar conclusiones.`,
    references: [
      {
        author: 'Pratt J, Candow DG, Rawson ES, Forbes SC, Prokopidis K.',
        year: '2026',
        journal: 'Experimental Physiology',
        doi: '10.1113/EP093965',
        title: 'Effects of creatine supplementation on lean mass, muscle size and muscle performance during immobilisation and rehabilitation: A systematic review'
      }
    ]
  },
  {
    id: '45',
    slug: 'decision-cirugia-hombro-manguito-rotador-malliaras-2021',
    title: '"El kinesiólogo no va a reparar un tendón roto": cómo deciden operarse las personas con dolor de hombro',
    subtitle: 'Un estudio cualitativo de Malliaras y colaboradores (2021) escuchó a 15 personas que se operaron del manguito rotador. Lo que pesó en su decisión dice mucho de cómo comunicamos.',
    categoryType: 'segmento',
    categoryValue: 'hombro',
    categoryLabel: 'Hombro',
    audience: 'ambos',
    date: '20 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 7,
    summary: 'Dolor intenso, sensación de haber probado todo, confianza en el cirujano y una idea poderosa: "si está roto, hay que repararlo". Así decidieron operarse 15 personas con dolor de hombro.',
    pullQuote: 'Para muchos pacientes, la idea de que un tendón roto necesita cirugía es coherente y lógica, aunque no necesariamente sea cierta.',
    content: `Imagina que llevas meses sin poder dormir de lado, que te cuesta lavarte el pelo y que la resonancia dice "rotura del supraespinoso". La conclusión parece obvia: si algo está roto, hay que repararlo.

Ese razonamiento es justamente lo que estudiaron **Peter Malliaras** y su equipo en la Universidad de Monash (Australia). Entrevistaron en profundidad a **15 personas** de entre 34 y 71 años que se habían operado del manguito rotador en el último año, para entender cómo tomaron esa decisión.

### Por qué importa

Las guías clínicas recomiendan probar entre **6 y 12 semanas** de tratamiento sin cirugía (ejercicio, educación y ajustes de actividad) antes de pensar en infiltraciones u operación. Además, una revisión Cochrane mostró con alta certeza que la descompresión subacromial no es mejor que una cirugía placebo. Aun así, en Australia las tasas de estas cirugías se duplicaron entre 2001 y 2013, y sus costos se triplicaron.

Si la evidencia no empuja hacia la cirugía, ¿qué es lo que la empuja?

### Lo que contaron los pacientes: seis temas

**1. "Había que resolverlo."** Dos de cada tres describieron un dolor que les cambiaba la vida: no dormían, no podían trabajar, tomaban analgésicos todos los días. La mitad llevaba un año o más con dolor. Para ellos, operarse era la forma más directa de salir de ahí.

**2. "Sentía que ya había hecho todo."** Los 15 habían hecho ejercicio y 10 se habían infiltrado. La mayoría sintió que había agotado las alternativas. Algunos dejaron el ejercicio porque les dolía y temían estar empeorando el tendón.

**3. "El kinesiólogo no va a reparar un tendón roto."** Es la frase que da nombre al estudio. Dos tercios pensaban que su problema era mecánico y que solo una cirugía podía arreglarlo. Muchas veces esa idea nació de cómo les explicaron la resonancia: "no tienes opción, te tienes que operar".

**4. Confianza total en el cirujano.** Uno lo dijo así: si le hubieran dicho que se tragara mil arañas, lo habría hecho. La reputación del cirujano se construía de boca en boca, sin mucho cuestionamiento.

**5. "El doctor Google pesó mucho."** Sentían que informarse era su responsabilidad. Buscaron en internet y preguntaron a conocidos, aunque confiaban más en lo que les decían los profesionales.

**6. Barreras del sistema.** El costo, el seguro y hasta que el kinesiólogo se cambiara de ciudad influyeron en la decisión.

### Lo que más preocupa

Solo **7 de 15** sintieron que les explicaron los riesgos de la cirugía. Otros dijeron que nadie les habló de complicaciones, y una persona supo después de operarse que existían ejercicios como alternativa.

Mientras tanto, la evidencia dice cosas que casi ningún paciente sabía:
- Muchas personas tienen roturas del manguito **sin ningún dolor**.
- Una rotura no necesariamente crece ni empeora con el tiempo.
- Muchas personas con roturas mejoran sin cirugía.
- Hasta un **40 %** vuelve a romperse después de la reparación y, aun así, mejora parecido. Eso pone en duda que el beneficio venga de "reparar" el tendón.

### Lo que me llevo

Una imagen alterada no es una sentencia. Antes de decidir una cirugía vale la pena preguntar qué beneficio real se espera, qué riesgos tiene y qué pasa si se sigue con un plan de ejercicio bien hecho. Y lo que decimos al mostrar una resonancia pesa más que casi cualquier ejercicio que indiquemos: explicar que los hallazgos son frecuentes en personas sin dolor, dar un plan con dosis y progresión claras y compartir la decisión no es un detalle, es parte del tratamiento.

### Límites del estudio

Es un estudio cualitativo de 15 personas reclutadas en un solo centro de imágenes de Melbourne, todas atendidas en el sistema privado. Sus resultados sirven para generar hipótesis, no para medir frecuencias en la población.`,
    references: [
      {
        author: 'Malliaras P, Rathi S, Burstein F, Watt L, Ridgway J, King C, Warren N.',
        year: '2021',
        journal: 'Disability and Rehabilitation',
        doi: '10.1080/09638288.2021.1879945',
        title: "'Physio's not going to repair a torn tendon': patient decision-making related to surgery for rotator cuff related shoulder pain"
      }
    ]
  },
  {
    id: '44',
    slug: 'musculos-espalda-dolor-lumbar-cronico-matheve-2023',
    title: 'Los músculos de la espalda en el dolor lumbar crónico: qué cambia y cómo entrenarlos',
    subtitle: 'Matheve, Hodges y Danneels (2023) resumen lo que sabemos de los cambios en el multífido y los erectores, y proponen un marco para individualizar el entrenamiento.',
    categoryType: 'segmento',
    categoryValue: 'columna-lumbar',
    categoryLabel: 'Columna lumbar',
    audience: 'clinico',
    date: '20 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 9,
    summary: 'En el dolor lumbar crónico los músculos de la espalda cambian, pero no igual en todos. La pregunta clínica no es si entrenarlos, sino a quién, cuándo y cómo.',
    pullQuote: 'Los efectos del entrenamiento probablemente son mayores cuando apuntan a lo que a esa persona le falta para volver a las actividades que valora.',
    content: `Cerca del 80 % de las personas tendrá dolor lumbar alguna vez. La mayoría mejora en semanas, pero hasta dos tercios tienen una recaída dentro del año y alrededor del 15 % desarrolla dolor lumbar crónico (más de tres meses).

En ese escenario, el **multífido lumbar** y los **erectores espinales** suelen estar en el centro del tratamiento. **Thomas Matheve, Paul Hodges y Lieven Danneels** revisaron la evidencia disponible hasta 2023 para responder tres preguntas: qué cambia en estos músculos, si el ejercicio lo puede revertir y si esos cambios explican la mejoría clínica.

### Un repaso rápido de anatomía

- **Multífido profundo:** fibras cortas que cruzan dos segmentos. Casi no extiende la columna; aporta compresión para el control segmentario.
- **Multífido superficial y erectores:** brazos de palanca largos. Extienden la columna y manejan cargas externas.

### Qué cambia en el dolor lumbar crónico

**En la estructura:**
- Menor área de sección del multífido, a menudo **en ambos lados** y en varios niveles (en el dolor agudo suele ser más localizada).
- Más infiltración de grasa y tejido fibroso.
- En un subgrupo, menor proporción de fibras tipo I.

**En la función:**
- Cuando hay alteraciones en la activación ante perturbaciones, lo típico es un **retraso** en la respuesta de los erectores.
- En tareas funcionales es frecuente ver **más actividad** de los erectores (y no del multífido), probablemente como estrategia de protección.
- Durante tareas de fatiga se activan más las regiones altas de los extensores, lo que se asocia a fatiga más precoz y más dolor.
- Cambios en la corteza motora relacionados con peor función del multífido, y menor propiocepción lumbar.
- Menor fuerza y resistencia de los extensores en muchos pacientes.

Pero el punto central del artículo es este: **no todos los pacientes presentan estos cambios, ni en la misma medida.** Que existan en el grupo no significa que expliquen el dolor de la persona que tienes al frente.

### ¿El ejercicio los revierte?

- **Fuerza y resistencia:** sí, hay evidencia clara de que mejoran con ejercicio específico.
- **Patrones de activación:** el entrenamiento de control sensoriomotor puede cambiarlos; la extensión de espalda genérica, no tanto.
- **Estructura:** la evidencia es incompleta. El control motor de baja carga solo no basta para recuperar masa muscular, pero combinarlo con sobrecarga progresiva sí logró hipertrofia del multífido junto con menos dolor y discapacidad. La infiltración grasa parece difícil de revertir, aunque muchos programas estudiados quizá fueron cortos o con cargas insuficientes.

### ¿Mejorar el músculo explica que mejore el dolor?

No está claro. Los programas mejoran tanto la función muscular como el dolor, pero la relación causal entre ambos sigue en duda. Parte del problema es metodológico: los ensayos suelen medir de forma genérica y mezclan pacientes muy distintos. Cuando se usan diseños de caso único con medidas individualizadas, la relación entre cambios en el movimiento y en el dolor aparece en el 72 % de las comparaciones, frente al 31 % en ensayos clínicos convencionales.

### El marco que proponen

**1. Considera la heterogeneidad.** El ejercicio específico (control sensoriomotor, fuerza, resistencia) funciona peor en personas con rasgos nociplásticos marcados o creencias poco útiles, como miedo al movimiento. Ahí suele convenir partir por exposición gradual, ejercicio general o abordaje cognitivo-conductual. El ejercicio específico tiene más sentido en dolor de predominio nociceptivo: localizado, con patrones claros de provocación y alivio según posturas y movimientos.

**2. Equilibra carga y capacidad.** Enseñar a "proteger la espalda" puede instalar la idea de que es frágil. Lo que se busca es entrenar con cargas suficientes para mejorar fuerza y resistencia. La carga probablemente no daña, aunque puede doler, y el dolor transitorio es una razón frecuente de abandono. Educar sobre el dolor antes de cargar ayuda a la adherencia.

**3. Entrena el control sensoriomotor cuando haga falta.** Si hay alteraciones, la activación selectiva del multífido al inicio puede restaurar patrones de activación. Una vez logrado, no hace falta insistir: lo lógico es avanzar a tareas funcionales y a etapas más automáticas del aprendizaje motor.

**4. Progresa a fuerza y resistencia** según lo que la persona necesita en su vida: no es lo mismo alguien que hace flexiones repetidas en su trabajo que alguien que pasa horas en semiflexión.

### Para llevar a la consulta

- Los cambios musculares en el dolor lumbar crónico existen, pero son variables. Evalúa antes de asumir.
- Define primero el mecanismo de dolor predominante; eso decide si el ejercicio específico es prioridad.
- Si entrenas la musculatura, hazlo con carga real y progresión, no solo con activación de baja carga.
- Mide lo que es relevante para esa persona, no solo parámetros genéricos.

### Límites

Es una revisión narrativa del estado del arte, no una revisión sistemática. Varias de sus propuestas, como el orden de las fases de entrenamiento, son hipótesis razonables que todavía requieren confirmación.`,
    references: [
      {
        author: 'Matheve T, Hodges P, Danneels L.',
        year: '2023',
        journal: 'Journal of Clinical Medicine',
        doi: '10.3390/jcm12175510',
        title: 'The Role of Back Muscle Dysfunctions in Chronic Low Back Pain: State-of-the-Art and Clinical Implications'
      }
    ]
  },
  {
    id: '43',
    slug: 'beneficios-salud-ejercicio-mecanismos-moleculares-celulares-ying-2026',
    title: 'Los beneficios del ejercicio para la salud: Mecanismos celulares y moleculares',
    subtitle: 'De las exoquinas al diálogo multiorgánico: señalización por canales Piezo1, ejes AMPK/PGC-1α, neurogénesis por BDNF e irisina, remodelación mitocondrial y medicina de precisión.',
    categoryType: 'tematica',
    categoryValue: 'ciencias-deporte',
    categoryLabel: 'Ciencias del deporte',
    audience: 'ambos',
    date: '18 de Noviembre, 2026',
    author: 'Peifeng Ying, Huilin Wang, Shukuan Ling et al. (Adaptado por MyoKine)',
    readingTime: 13,
    summary: '¿Cómo reprograma el ejercicio nuestro organismo a escala molecular? Una revisión en MedComm explica las señales (exerquinas, vesículas extracelulares, cambios genéticos) que conectan el ejercicio con la salud de todo el cuerpo.',
    pullQuote: 'El ejercicio físico no es simplemente un gasto de calorías; es una intervención molecular y celular sistémica que activa programas biológicos evolutivamente conservados para combatir la enfermedad y el envejecimiento.',
    content: `Durante décadas, el ejercicio físico fue investigado primordialmente desde variables fisiológicas tradicionales: consumo de oxígeno (VO₂máx), fuerza muscular isométrica y parámetros hemodinámicos. Sin embargo, la irrupción de las ciencias multiómicas (genómica, transcriptómica, proteómica, metabolómica) y la biología celular de alta resolución ha transformado radicalmente nuestro entendimiento: **el ejercicio es una potente señal biológica sistémica capaz de reprogramar la homeostasis tisular**.

En esta magna revisión publicada en **MedComm (2026)**, un equipo internacional liderado por **Peifeng Ying, Huilin Wang y Shukuan Ling** integra las redes de transducción de señales, la secreción de exoquinas (*exerkines*) y la comunicación interorgánica que median los beneficios del ejercicio sobre los sistemas musculoesquelético, cardiovascular, nervioso, inmunitario y metabólico.

---

### 1. Sistema Musculoesquelético: Mecanotransducción y Diálogo Hueso-Músculo

#### Mecanobiología Ósea: Piezo1 y la Vía Wnt/β-Catenina
El hueso es un tejido extremadamente plástico que percibe las deformaciones mecánicas cíclicas a través del canal iónico mecanosensible **Piezo1** en los osteocitos. Su activación provoca un influjo inmediato de Ca²⁺ que activa quinasas clave (CaMKII, ERK1/2, pAKT) y transloca a los coactivadores **YAP/TAZ** al núcleo.

Simultáneamente, la carga mecánica inhibe la secreción de **esclerostina (SOST)**, liberando a los correceptores LRP5/6 y encendiendo la cascada **Wnt/β-catenina**. La β-catenina nuclear induce los factores de transcripción osteogénicos **Runx2 y Osterix** en las células madre mesenquimales (BMSCs), favoreciendo la diferenciación a osteoblastos e inhibiendo la adipogénesis (vía represión de PPARγ). En el eje osteoclástico, el ejercicio eleva la **osteoprotegerina (OPG)**, un receptor señuelo que bloquea a RANKL, frenando la resorción ósea.

#### Músculo Esquelético: Biogénesis Mitocondrial y Síntesis Proteica
1. **El Sensor Energético AMPK / PGC-1α:** El consumo de ATP durante la contracción muscular eleva la relación intracelular AMP/ATP, activando a **AMPK**, que fosforila e induce al coactivador maestro **PGC-1α**. Esta vía orquesta la replicación del ADN mitocondrial, la translocación de transportadores **GLUT4** independientes de insulina y la transición fenotípica hacia fibras oxidativas resistentes a la fatiga.
2. **La Vía IGF-1 / PI3K / AKT / mTORC1:** La tensión mecánica activa la síntesis de IGF-1, reclutando a la quinasa AKT y al complejo **mTORC1**. Esto desactiva al represor 4E-BP1, permitiendo la iniciación de la traducción ribosómica por eIF4E y reprimiendo a los factores FoxO (disminuyendo las ubiquitina-ligasas atróficas MAFbx y MuRF-1).
3. **Células Satélite y Reparación:** El ejercicio activa las células madre del músculo mediante la inducción de **MyoD y miogenina**, reguladas epigenéticamente por la metiltransferasa Mettl3 (m⁶A).

#### Crosstalk Bidireccional Hueso-Músculo
El músculo secreta **irisina** (vía vesículas extracelulares) que estimula la supervivencia del osteocito mediante integrinas αV/β₅, mientras que el hueso responde liberando **osteocalcina no carboxilada (ucOCN)** y PGE₂ (a través de hemicanales de conexina 43), los cuales promueven la captación de glucosa y la miogénesis en el músculo.

---

### 2. Sistema Cardiovascular: Flujo de Cizallamiento y Angiogénesis
* **Endotelio Vascular:** El aumento del flujo sanguíneo genera tensión de cizallamiento (*shear stress*) laminar sobre el endotelio, fosforilando a la óxido nítrico sintasa endotelial (**eNOS**) y aumentando la biodisponibilidad de óxido nítrico (NO), revirtiendo la rigidez arterial.
* **Autofagia y Placa Ateromatosa:** AMPK estimula a Beclin-1 y LC3, promoviendo la fagocitosis y eliminación de células espumosas en las lesiones vasculares y suprimiendo a NF-κB, VCAM-1 e ICAM-1.
* **Corazón y Mitofagia:** El entrenamiento continuo activa la vía **PINK1/Parkin** para degradar selectivamente mitocondrias cardíacas senescentes dañadas, al tiempo que activa al factor antioxidante **Nrf2/ARE** e induce angiogénesis coronaria a través de VEGF y FSTL1.

---

### 3. Sistema Nervioso: Plasticidad Sináptica y Neuroprotección

#### El Eje Irisina-BDNF y la Neurogénesis Hipocampal
El ejercicio induce en el músculo la expresión de la proteína FNDC5, cuyo fragmento extracelular se escinde y libera al torrente sanguíneo como **irisina**. La irisina tiene la capacidad comprobada de cruzar la barrera hematoencefálica (BHE), donde actúa sobre las células de la microglía (vía señalización STAT6) induciendo un fenotipo antiinflamatorio M2 y desencadenando una potente síntesis de **BDNF** en el hipocampo y la corteza prefrontal.

El BDNF se une a receptores **TrkB**, estimulando la plasticidad sináptica (LTP), el crecimiento dendrítico y la neurogénesis en el giro dentado.

#### Protección Frente a Patologías Neurodegenerativas
* **Enfermedad de Alzheimer:** El ejercicio estimula enzimas que degradan el péptido β-amiloide (como la neprilisina y la enzima degradadora de insulina - IDE) y desactiva a la enzima GSK3β (vía PI3K/AKT), frenando la hiperfosforilación de la proteína Tau.
* **Enfermedad de Parkinson:** Favorece la depuración autofágica de agregados de α-sinucleína, protege la vía nigroestriatal dopaminérgica y eleva el factor neurotrófico derivado de la glía (GDNF).
* **Accidente Cerebrovascular (ACV):** El ejercicio moderado temprano tras un evento isquémico acelera la angiogénesis cerebral dependiente de VEGFR2 y la sinaptogénesis mediada por BDNF, reduciendo el volumen del infarto.

---

### 4. Inmunometabolismo y el Eje Intestino-Cerebro
* **El Rol Contextual de la IL-6:** Como mioquina liberada por el músculo durante el ejercicio, la IL-6 actúa como sensor metabólico que estimula la lipólisis en tejido adiposo y la captación de glucosa; a diferencia de la IL-6 crónica de origen inmune, la IL-6 muscular no activa rutas inflamatorias de señalización trans.
* **Lactato como Molécula Señal:** Lejos de ser un desecho tóxico, el lactato ejerce efectos de modulación inmunológica (vía receptor GPR81 y lactilación de histonas), facilitando la tolerancia inmune y la polarización macrofágica reparadora.
* **Microbiota Intestinal:** El ejercicio diversifica la microbiota, enriqueciendo especies productoras de ácidos grasos de cadena corta (AGCC, como *Faecalibacterium*, *Roseburia* y *Akkermansia*). El **butirato** cruza la BHE mediante transportadores MCT1, inhibe desacetilasas de histonas (HDACs) y mejora la sensibilidad metabólica en el hipotálamo.

---

### 5. Envejecimiento, Telómeros y Medicina de Precisión
* **Mantenimiento Telomérico:** Aunque el ejercicio no alarga los telómeros directamente, frena drásticamente su desgaste prematuro al silenciar el estrés oxidativo tisular y mantener la expresión de ARN telomérico (TERRA) vía la cascada AMPK/PGC-1α/NRF1.
* **Fármacos "Miméticos del Ejercicio" (Exercise Pills):** Moléculas experimentales como activadores de AMPK (AICAR) o agonistas de PPARδ (GW501516) han intentado replicar los efectos del ejercicio; sin embargo, no logran reproducir la intrincada sincronización multiorgánica ni el perfil de seguridad del movimiento real, demostrando que **el ejercicio es una sinfonía biológica irreemplazable por un único fármaco**.

### Conclusión
Todo lo mencionado acá está respaldado por los papers que se dejan a continuación.
- El ejercicio orquesta una red molecular integrada: mioquinas, osteoquinas, vesículas extracelulares y metabolitos dialogan entre músculos, huesos, vasos sanguíneos y cerebro.
- La prescripción del ejercicio en kinesiología y medicina deportiva debe concebirse como una dosificación farmacológica precisa, adaptada a las necesidades biológicas individuales del paciente.`,
    references: [
      {
        author: 'Ying P, Wang H, Lu X, Zhang W, Lin Z, Wang K, Li S, Chen L, Jiang M, Hamad S, Wang Y, Wu J, Ling S.',
        year: '2026',
        journal: 'MedComm',
        doi: '10.1002/mco2.70926',
        title: 'The Health Benefits of Exercise: Molecular and Cellular Mechanisms'
      }
    ]
  },
  {
    id: '42',
    slug: 'restauracion-dorsiflexion-tobillo-deportistas-sistema-toma-decisiones-clinicas-tourillon-2025',
    title: 'Restauración de la dorsiflexión de tobillo en deportistas: Un sistema individualizado de toma de decisiones clínicas',
    subtitle: 'Marco estructurado en 3 pasos: evaluación cuantitativa/cualitativa con el WBLT, pruebas diagnósticas confirmatorias y dosificación precisa de terapia manual, estiramiento crónico y neurodinámica.',
    categoryType: 'segmento',
    categoryValue: 'tobillo-pie',
    categoryLabel: 'Tobillo y pie',
    audience: 'clinico',
    date: '14 de Noviembre, 2026',
    author: 'Romain Tourillon, Massamba M’Baye & Michelle Smith (Adaptado por MyoKine)',
    readingTime: 11,
    summary: '¿Por qué el enfoque de "talla única" fracasa al rehabilitar la dorsiflexión de tobillo? Descubre el algoritmo clínico basado en las zonas de bloqueo del WBLT, test confirmatorios y dosis exactas de movilización y estiramiento.',
    pullQuote: 'La restricción de la dorsiflexión no tiene una causa única: mapear la zona de dolor o bloqueo durante el lunge test permite diferenciar si el tope es talocrural, subtalar, miofascial (FHL o peronéos) o neurodinámico (nervio tibial).',
    content: `El rango de movimiento (ROM) de dorsiflexión de tobillo juega un papel biomecánico crítico en el miembro inferior: es el pivote central del segundo balancín del pie (*ankle rocker*), permitiendo la transición de absorción de fuerzas a propulsión durante la marcha, la carrera y el aterrizaje de saltos.

Cuando la dorsiflexión está restringida tras un esguince o por sobrecarga, el pie no puede alcanzar su posición de estabilidad articular (*closed-pack position*), provocando compensaciones cinemáticas en cadena: **mayor desplazamiento en valgo de rodilla, aumento de las fuerzas de impacto vertical y sobrecarga rotacional en cadera**. Esto multiplica exponencialmente el riesgo de inestabilidad crónica de tobillo, tendinopatía aquiliana, fascitis plantar, tendinopatía rotuliana y fracturas por estrés en metatarsianos.

Sin embargo, en la práctica habitual se aplica con frecuencia un protocolo genérico de "estirar gemelos y mover el pie". En esta perspectiva clínica publicada en **Frontiers in Sports and Active Living (2025)**, **Romain Tourillon, Massamba M’Baye y Michelle Smith** proponen un **sistema individualizado de toma de decisiones en 3 pasos** que sustituye la rutina estandarizada por razonamiento clínico de precisión.

---

### Paso 1: Evaluación Cuantitativa y Cualitativa con el WBLT
El **Weight-Bearing Lunge Test (WBLT)** es el estándar de oro para medir la dorsiflexión funcional en carga. Para garantizar su reproducibilidad diagnóstica, los autores establecen **4 reglas de estandarización innegociables**:

1. **Posición en tándem:** Apoyo de peso firme sobre la extremidad evaluada adelantada.
2. **Talón del pie posterior despegado del suelo:** Evita que la rigidez articular o muscular de la pierna trasera condicione el desplazamiento hacia adelante.
3. **Alineación recta de la rótula:** Guiar la rodilla verticalmente hacia una línea marcada en la pared, impidiendo rotación interna de cadera o colapso en valgo que falseen el rango por pronación del mediopié.
4. **Palpación continua del talón:** Monitorizar digitalmente la almohadilla plantar posterior para detener la medición en el instante milimétrico exacto en que el calcáneo comienza a despegarse.

#### Métricas de Referencia y Cambio Mínimo Detectable (MDC)
* **Valores Normativos Esperados:** Distancia dedo-pared > 9–10 cm o inclinación tibial > 40–42°.
* **Déficit Clínicamente Relevante:** Asimetría entre miembros > 1.5 cm o > 4.7° de inclinación tibial.

#### Mapeo Cualitativo: Las 5 Zonas de Dolor o Bloqueo
Además de medir los centímetros o grados, el clínico debe preguntar al deportista **dónde localiza el tope o disconfort** al final del rango:
1. **Zona Anterior:** Sugiere restricción del deslizamiento posterior del astrágalo en la mortaja talocrural o hipomovilidad de la articulación tarsiana transversa (navicular/cuboides).
2. **Zona Anterolateral:** Sugiere disfunción de la articulación tibioperonea inferior o conflicto anterolateral de partes blandas/sindesmosis.
3. **Zona Retromaleolar Medial:** Sugiere rigidez/atrapamiento del tendón del flexor largo del dedo gordo (*flexor hallucis longus* - FHL) o restricción subtalar.
4. **Zona Retromaleolar Lateral:** Sugiere rigidez de tendones peronéos (*fibularis longus/brevis*) o disfunción tibioperonea distal.
5. **Zona Posterior:** Sugiere rigidez pasiva del tríceps sural (complejo gastrocnemio-sóleo) o mecanosensibilidad aumentada del **nervio tibial**.

---

### Paso 2: Pruebas Diagnósticas Confirmatorias
Una vez localizada la zona sospechosa, se aplican pruebas ortopédicas y biomecánicas específicas para aislar la estructura diana:

* **Para la Zona Anterior (Astrágalo vs. Mediotié):**
  * *Posterior Talar Glide Test (PTGT):* Paciente sentado con rodilla flexionada y pie en flexión dorsal máxima; el terapeuta fija el astrágalo y flexiona pasivamente la rodilla con inclinómetro en la tibia. Asimetrías > 4.7° confirman pérdida del deslizamiento posterior astragalino.
  * *Maniobra del Mediotié:* Si el PTGT es normal, se aplica un deslizamiento caudal/plantar manual al navicular y cuboides mientras se repite el WBLT. Si el bloqueo anterior desaparece o mejora el rango, la diana es el mediopié.
* **Para la Zona Anterolateral (Tibioperonea Inferior):**
  * Deslizamiento anteroposterior pasivo del peroné distal. Si la movilización posterior del maléolo externo durante la dorsiflexión desbloquea el movimiento, confirma implicación sindesmal/tibioperonea.
* **Para la Zona Retromaleolar Medial (FHL vs. Subtalar):**
  * *WBLT Modificado con Hallux en Extensión Máxima:* Al extender pasivamente el 1.er dedo se tensiona el FHL en su paso por el túnel fibroóseo retromaleolar. Una pérdida > 1.5 cm o > 4.7° respecto al WBLT basal confirma rigidez del FHL.
  * Si la prueba del FHL es negativa, se evalúa el juego articular medio-lateral y látero-medial de la articulación subtalar.
* **Para la Zona Retromaleolar Lateral (Peronéos):**
  * *WBLT Modificado en Inversión:* Se realiza el lunge sobre una cuña inclinada a ~25° de inversión. Si el rango se reduce significativamente (> 1.5 cm o > 4.7°), se confirma acortamiento de los tendones peronéos.
* **Para la Zona Posterior (Tríceps Sural vs. Nervio Tibial):**
  * *SLR Modificado / Slump con Neurodinámica del Tibial:* Prueba de elevación de pierna recta o Slump combinada con dorsiflexión, eversión del retropié y abducción del antepié. Una asimetría > 7.0° o reproducción de síntomas urentes/tirantes en la pantorrilla indica mecanosensibilidad del nervio tibial. Si es negativa, la causa primaria es rigidez del tejido miofascial del tríceps sural.

---

### Paso 3: Intervenciones Terapéuticas Dirigidas y Dosificación Específica
El cuadro siguiente sintetiza las técnicas recomendadas por el consenso, su volumen de tratamiento y la frecuencia clínica:

| Estructura Diana | Técnica de Intervención | Parámetros y Dosis por Sesión | Frecuencia Semanal |
| :--- | :--- | :--- | :--- |
| **Astrágalo (Anterior)** | Deslizamiento A-P pasivo (Maitland Grado III-IV) o Movilización con Movimiento (MWM Mulligan) con cincha | • **Agudo:** 4 series de 15 oscilaciones (60 totales) o 4 series de 10 MWM (mantenimiento 5 s).<br>• **Crónico:** 8 series de 15 oscilaciones (120 totales) o 4 series de 15 MWM. | 2 a 3 sesiones / semana (hasta normalizar WBLT) |
| **Tarsiana Transversa** | Deslizamiento caudal de cuboides/navicular (oscilatorio o MWM en carga) | • Idéntica dosificación que la movilización astragalina (60 a 120 oscilaciones según cronicidad). | 2 a 3 sesiones / semana |
| **Tibioperonea Inferior** | Deslizamiento A-P (supino) o P-A (prono) del maléolo lateral | • Oscilaciones rítmicas de 1 segundo (Grado III-IV), 60 a 120 repeticiones por sesión. | 2 a 3 sesiones / semana |
| **Flexor Largo Hallux (FHL)** | Estiramiento crónico en WBLT con cuña bajo el 1.er radio | • **Intensidad:** Entre punto de disconfort y umbral de dolor.<br>• **Volumen:** > 200 s bajo tensión por sesión (ej. 3 series de 75 s con 30 s de descanso). | 5 a 7 días / semana (> 1.200 s acumulados por semana; mín. 5 semanas) |
| **Tendones Peronéos** | Estiramiento crónico en WBLT con pie en inversión | • Idéntico protocolo de alta intensidad y pausas cortas (> 200 s por sesión). | 5 a 7 días / semana (> 1.200 s/semana; mín. 5 semanas) |
| **Tríceps Sural** | Estiramiento crónico estático en WBLT con antepié elevado | • > 200 s por sesión (3 series de 75 s con 30 s descanso). | 5 a 7 días / semana (> 1.200 s/semana) |
| **Nervio Tibial (Posterior)** | Técnicas de tensión neurodinámica en Slump / SLR con dorsiflexión y eversión | • 80 a 100 segundos totales bajo tensión por sesión (2 series de 10 repeticiones con 5 s de mantenimiento). | 3 sesiones / semana |

---

### Aplicación en el Deporte y Criterios de Progresión
Una vez desbloqueado el rango pasivo o articular, la dorsiflexión recuperada debe consolidarse mediante **control motor dinámico en cadena cerrada**: sentadillas unipodales, caídas laterales con flexión de tobillo (*lateral step-down*) y ejercicios de desaceleración y frenado excéntrico en el plano sagital.

### Conclusión
Todo lo mencionado acá está respaldado por los papers que se dejan a continuación.
- Medir únicamente los centímetros del WBLT es insuficiente: interrogar y palpar el sitio anatómico del bloqueo es la clave diagnóstica.
- Cada tejido requiere un estímulo mecánico específico: el hueso y la cápsula responden a oscilaciones accesorias de alta cadencia; el tendón a estiramientos prolongados acumulados (> 1.200 s semanales); y el nervio periférico a deslizamiento y tensión neurodinámica suave dosificada.`,
    references: [
      {
        author: 'Tourillon R, M’Baye M, Smith M.',
        year: '2025',
        journal: 'Frontiers in Sports and Active Living',
        doi: '10.3389/fspor.2025.1677383',
        title: 'Restoring ankle dorsiflexion range of motion in athletes: an individualized clinical decision-making system'
      }
    ]
  },
  {
    id: '41',
    slug: 'neurociencia-dolor-practica-parte-8-dolor-nociceptivo-neuropatico-nociplastico-hoegh-2025',
    title: 'Neurociencia del dolor en la práctica (Parte 8): Dolor nociceptivo, neuropático y nociplástico',
    subtitle: 'Análisis crítico de los 3 descriptores mecanísticos de la IASP: criterios clínicos, algoritmos diagnósticos, solapamiento fenotípico y el enfoque centrado en la persona.',
    categoryType: 'tematica',
    categoryValue: 'dolor-persistente',
    categoryLabel: 'Dolor persistente y neurociencia',
    audience: 'ambos',
    date: '10 de Noviembre, 2026',
    author: 'Morten Hoegh & Paul Hodges (Adaptado por MyoKine)',
    readingTime: 11,
    summary: '¿Qué distingue realmente al dolor nociceptivo, neuropático y nociplástico? Analizamos los descriptores mecanísticos de la IASP, los algoritmos de gradación neurológica y las trampas de etiquetar el dolor en la clínica.',
    pullQuote: 'Los descriptores mecanísticos son categorías clínicas presuntivas, no mecanismos biológicos directos. En un mismo paciente coexisten múltiples dimensiones; la intervención debe ser siempre holística y centrada en la persona.',
    content: `Identificar factores modificables subyacentes es el fundamento de la medicina moderna. Para superar la antigua dicotomía simplista entre "dolor orgánico" y "dolor psicógeno", la Asociación Internacional para el Estudio del Dolor (**IASP**) consolidó tres descriptores mecanísticos: **dolor nociceptivo, dolor neuropático y dolor nociplástico**.

En el octavo y culminante editorial de la serie **Pain Science in Practice**, el Dr. **Morten Hoegh** y el Dr. **Paul Hodges** presentan un examen crítico sobre qué son estos descriptores, cómo se definen con rigor y cuáles son sus virtudes y limitaciones en el razonamiento clínico.

---

### 1. Descriptores Mecanísticos vs. Mecanismos del Dolor
Es imprescindible no confundir un **mecanismo biológico** con un **descriptor mecanístico**:
* **Mecanismo Biológico:** Son los procesos moleculares, sinápticos e inmunes que impulsan el dolor (por ejemplo: fosforilación de canales NaV1.7, pérdida de magnesio en receptores NMDA, activación microglial, degeneración axonal).
* **Descriptor Mecanístico:** Es una etiqueta clínica descriptiva utilizada para clasificar presentaciones clínicas en grupos que presumiblemente comparten procesos fisiopatológicos predominantes, con el fin de guiar el tratamiento hacia intervenciones específicas.

---

### 2. Los Tres Descriptores de la IASP
1. **Dolor Nociceptivo:**
   * *Definición:* Dolor que surge del daño tisular real o potencial en tejidos no neurales y que se debe a la activación continuada de nociceptores periféricos.
   * *Características:* Dependiente del estímulo mecánico, químico o térmico; responde proporcionalmente a la carga física y cede con el reposo o la cicatrización. El sistema somatosensorial funciona normalmente.
2. **Dolor Neuropático:**
   * *Definición:* Dolor causado directamente por una **lesión o enfermedad demostrable que afecta al sistema nervioso somatosensorial** (periférico o central).
   * *Gradación diagnóstica (Schmid / Finnerup):* Requiere distribución neuroanatómica plausible, historia clínica compatible, signos clínicos confirmatorios en el examen neurológico (déficit sensorial de fibras finas o gruesas: hipoestesia, pérdida de reflejos) y/o pruebas confirmatorias objetivas (resonancia, electromiografía, biopsia cutánea).
3. **Dolor Nociplástico (Aprobado en 2016):**
   * *Definición:* Dolor que surge de la alteración del procesamiento nociceptivo (**procesamiento nociceptivo alterado**) a pesar de no existir evidencia clara de daño tisular real o amenazante que active nociceptores periféricos, ni evidencia de enfermedad o lesión del sistema somatosensorial.
   * *Características:* Hipersensibilidad generalizada, hiperalgesia difusa, comorbilidades asociadas (fatiga extrema, insomnio, niebla cognitiva, intolerancia a estímulos sensoriales). Ejemplos: fibromialgia, síndrome de intestino irritable y dolor lumbar crónico primario.

---

### 3. Solapamiento Clínico y Controversias
Hoegh y Hodges señalan cuatro dilemas clínicos fundamentales:
1. **El Paciente no es una Categoría Pura:** La inmensa mayoría de los pacientes con dolor crónico musculoesquelético presentan cuadros mixtos (por ejemplo, una artrosis de rodilla avanzada con componente nociceptivo por carga, pero con sensibilización central y amplificación nociplástica simultánea).
2. **El Riesgo de usar "Nociplástico" como Cajón de Sastre:** Nociplástico no debe ser un diagnóstico de descarte pasivo para cualquier dolor que no comprendamos; legitimó la experiencia biológica del dolor sin daño tisular visible, pero aún carece de pruebas biológicas exclusivas en humanos vivos.
3. **Diferencia con el "Dolor Primario Crónico" del CIE-11:** Mientras que el CIE-11 define el dolor primario por su impacto multidimensional y discapacidad asociada en el paciente, el concepto nociplástico busca identificar el proceso neurobiológico anormal.
4. **La Medicina Centrada en la Persona:** Identificar el descriptor dominante orienta la caja de herramientas terapéutica (educación, desensibilización gradual, ejercicio físico, optimización del descanso), pero jamás debe desplazar la atención holística a los factores psicosociales, creencias y metas personales del paciente.

### Conclusión
Todo lo mencionado acá está respaldado por los papers que se dejan a continuación.
- Los tres descriptores de la IASP orientan el razonamiento clínico pero con frecuencia se solapan en el paciente real.
- La atención en salud del dolor debe trascender las etiquetas diagnósticas y centrarse en la persona en su totalidad.`,
    references: [
      {
        author: 'Hoegh M, Hodges P.',
        year: '2025',
        journal: 'J Orthop Sports Phys Ther',
        doi: '10.2519/jospt.2025.13335',
        title: 'Pain Science in Practice (Part 8): Nociceptive, Neuropathic, and Nociplastic Pain'
      }
    ]
  },
  {
    id: '40',
    slug: 'neurociencia-dolor-practica-parte-7-evaluacion-modulacion-descendente-cpm-placebo-hoegh-2024',
    title: 'Neurociencia del dolor en la práctica (Parte 7): ¿Cómo se mide la modulación descendente del dolor?',
    subtitle: 'Paradigmas de modulación condicionada del dolor (CPM), analgesia por desfase (offset analgesia), circuitos de placebo y el impacto de fármacos sobre el DPMS.',
    categoryType: 'tematica',
    categoryValue: 'dolor-persistente',
    categoryLabel: 'Dolor persistente y neurociencia',
    audience: 'clinico',
    date: '05 de Noviembre, 2026',
    author: 'Morten Hoegh & Kirsty Bannister (Adaptado por MyoKine)',
    readingTime: 10,
    summary: '¿Cómo evalúa la ciencia los frenos inhibitorios del dolor en humanos? Analizamos los paradigmas de CPM, sumación temporal, analgesia por desfase, placebo y el mecanismo de acción de opioides, gabapentinoides y duloxetina.',
    pullQuote: 'La analgesia por placebo, el condicionamiento modulador (CPM) y la analgesia por ejercicio reclutan circuitos neurobiológicos distintos en el tronco encefálico; la medicina personalizada busca emparejar el tratamiento con el perfil neuroplástico.',
    content: `Medir la actividad de axones individuales del sistema descendente en seres humanos vivos no es posible de manera directa. Sin embargo, los investigadores han desarrollado paradigmas psicofísicos estandarizados que permiten cuantificar la respuesta neta (el balance entre inhibición y facilitación) del sistema modulador descendente del dolor (DPMS).

En la séptima entrega de la serie **Pain Science in Practice**, el Dr. **Morten Hoegh** y la Dra. **Kirsty Bannister** revisan los principales métodos de cuantificación neurofuncional y el mecanismo neurofarmacológico de los analgésicos más habituales.

---

### 1. Los Paradigmas Experimentales del DPMS en Humanos
Para evaluar el estado del DPMS se emplean varios protocolos de prueba sensorial cuantitativa (QST):

1. **Modulación Condicionada del Dolor (CPM):**
   * Es el análogo humano del fenómeno DNIC. Se aplica un **estímulo test (TS)** —por ejemplo, el umbral de dolor a la presión con un manguito o algómetro en una extremidad— antes y durante la aplicación simultánea de un **estímulo condicionante doloroso (CS)** remoto (como agua helada a 4°C o isquemia en el brazo opuesto).
   * En aproximadamente el 80% de los adultos sanos, el dolor del estímulo test disminuye significativamente (efecto CPM positivo). En pacientes con fibromialgia, dolor lumbar persistente o neuropatía diabética, el efecto suele estar deprimido o abolido.
2. **Sumación Temporal del Dolor (TSP):**
   * Evalúa la facilitación espinal mediante estímulos nociceptivos idénticos repetidos a ritmo constante (> 1 por segundo, como 10 toques con monofilamento rígido). Un aumento desproporcionado de la intensidad del dolor traduce hiperactividad de receptores NMDA.
3. **Analgesia por Desfase (*Offset Analgesia*):**
   * Fenómeno en el que un incremento térmico temporal de 1°C seguido de un retorno a la temperatura previa genera un alivio del dolor desproporcionadamente mayor que la disminución térmica administrada, reflejando un filtrado temporal dinámico del SNC.
4. **Analgesia por Placebo:**
   * La expectativa positiva contextual y el condicionamiento activan la corteza prefrontal dorsolateral y la médula rostral ventromedial (RVM), liberando opioides endógenos en la médula. Este efecto se bloquea completamente con la administración de **naloxona** (antagonista opioide).

---

### 2. Farmacología y Reclutamiento del DPMS
Comprender la neurociencia del DPMS ilumina el mecanismo de acción de los principales analgésicos prescritos en dolor crónico:
* **Opioides:** Se unen preferentemente a receptores opioides μ (MOR) en el asta dorsal y en las células OFF de la RVM. En presinapsis atenúan la liberación de glutamato; en postsinapsis hiperpolarizan la neurona nociceptiva.
* **Gabapentinoides (Pregabalina, Gabapentina):** A pesar de su nombre, no actúan sobre receptores GABA. Se unen a la subunidad α₂δ de los canales de calcio dependientes de voltaje en neuronas espinales, frenando la exocitosis de neurotransmisores y reduciendo la facilitación descendente mediada por receptores 5-HT₃.
* **Antidepresivos Inhibidores de la Recaptación de Serotonina y Noradrenalina (ISRN - ej. Duloxetina):** Prolongan la permanencia de noradrenalina en la hendidura sináptica del asta dorsal, potenciando la activación de receptores α₂-adrenérgicos que frenan la transmisión del dolor.

### Conclusión
Todo lo mencionado acá está respaldado por los papers que se dejan a continuación.
- Los paradigmas como el CPM y la sumación temporal permiten caracterizar si el sistema de un paciente tiende hacia la facilitación (pronociceptivo) o la inhibición (antinociceptivo).
- La analgesia no depende de una sola vía; el cerebro dispone de múltiples mecanismos paralelos (placebo, monoaminas, opioides endógenos) para modular la experiencia dolorosa.`,
    references: [
      {
        author: 'Hoegh M, Bannister K.',
        year: '2024',
        journal: 'J Orthop Sports Phys Ther',
        doi: '10.2519/jospt.2024.12113',
        title: 'Pain Science in Practice (Part 7): How Is Descending Modulation of Pain Measured?'
      }
    ]
  },
  {
    id: '39',
    slug: 'neurociencia-dolor-practica-parte-6-modulacion-descendente-ejercicio-eih-hoegh-2024',
    title: 'Neurociencia del dolor en la práctica (Parte 6): ¿Cómo funciona el sistema modulador descendente del dolor?',
    subtitle: 'Vías inhibitorias y facilitadoras (DPMS), controles inhibitorios nocivos difusos (DNIC), monoaminas espinales y la hipoalgesia inducida por el ejercicio (EIH).',
    categoryType: 'tematica',
    categoryValue: 'dolor-persistente',
    categoryLabel: 'Dolor persistente y neurociencia',
    audience: 'clinico',
    date: '30 de Octubre, 2026',
    author: 'Morten Hoegh & Kirsty Bannister (Adaptado por MyoKine)',
    readingTime: 10,
    summary: '¿Cómo regula el cerebro la entrada de dolor en la médula? Descubrimos el sistema modulador descendente (DPMS), los controles inhibitorios nocivos y la neurobiología de la hipoalgesia inducida por el ejercicio.',
    pullQuote: 'El sistema modulador descendente no es un interruptor de encendido/apagado: equilibra continuamente la inhibición y la facilitación del dolor; el sedentarismo degrada esta capacidad regulatoria endógena.',
    content: `El dolor no es el resultado pasivo de un mensaje que sube mecánicamente desde la periferia hasta la corteza cerebral. El sistema nervioso central dispone de una sofisticada red anatómica y neuroquímica capaz de filtrar, atenuar o amplificar las señales nociceptivas antes de que alcancen la percepción consciente: el **Sistema Modulador Descendente del Dolor (DPMS - *Descending Pain Modulatory System*)**.

En la sexta entrega de la serie **Pain Science in Practice**, el Dr. **Morten Hoegh** y la Dra. **Kirsty Bannister** exploran la bidireccionalidad de estas vías, el rol de las monoaminas y el impacto directo de la actividad física sobre este sistema.

---

### 1. La Red Anatómica del DPMS: De la Corteza al Asta Dorsal
Las vías del DPMS se originan en áreas corticales y límbicas (corteza cingulada anterior, ínsula, amígdala), conectan con centros subcorticales del tronco del encéfalo y proyectan sus axones hacia el asta dorsal espinal:
* **Sustancia Gris Periacueductal (PAG):** Estación central de procesamiento emocional y antinociceptivo en el mesencéfalo.
* **Médula Rostral Ventromedial (RVM):** Centro bulbar que contiene dos tipos neuronales opuestos:
  * **Células OFF:** Su descarga inhibe la transmisión espinal del dolor (antinociceptivas; activadas por opioides).
  * **Células ON:** Su descarga facilita o amplifica la transmisión nociceptiva (pronociceptivas; hiperactivadas durante estados inflamatorios crónicos o hiperalgesia).
* **Locus Coeruleus (Núcleo A6):** Principal fuente noradrenérgica del SNC, cuyas proyecciones descienden por el cordón dorsolateral hacia el asta dorsal liberando noradrenalina sobre receptores alfa-2 adrenérgicos inhibidores.

---

### 2. Controles Inhibitorios Nocivos Difusos (DNIC)
En 1979, Le Bars y Dickenson demostraron en ratas que la aplicación de un estímulo nocivo en una región corporal remota (la cola o una pata) inhibía de inmediato la descarga de neuronas WDR espinales que respondían a un estímulo local independiente ("el dolor inhibe al dolor").

Este fenómeno, denominado **DNIC** (*Diffuse Noxious Inhibitory Controls*), depende funcionalmente de la integridad del tronco del encéfalo (subnúcleo reticular dorsal y núcleo de raphe magnus) y utiliza noradrenalina y serotonina como mediadores espinales. En humanos, su homólogo experimental es la **Modulación Condicionada del Dolor (CPM)**.

---

### 3. Ejercicio e Hipoalgesia Inducida por Ejercicio (EIH)
En personas sanas, una sesión de ejercicio aeróbico o contracciones isométricas sostenidas desencadena un aumento inmediato en el umbral de dolor a la presión y una reducción de la sensibilidad nociceptiva, conocido como **hipoalgesia inducida por ejercicio (EIH - *Exercise-Induced Hypoalgesia*)**.

* **Mecanismos de la EIH:** Activación coordinada del sistema opioide endógeno, el sistema endocannabinoide y la vía noradrenérgica descendente del DPMS.
* **La Paradoja del Dolor Crónico:** En sujetos con dolor crónico y sedentarismo prolongado, la EIH suele encontrarse atenuada o invertida (el ejercicio puede generar exacerbación transitoria del dolor). Sin embargo, el reposo crónico deteriora aún más el DPMS; la reincorporación progresiva, dosificada y desensibilizante del ejercicio físico regular es precisamente la herramienta que rehabilita la función antinociceptiva del sistema a largo plazo.

### Conclusión
Todo lo mencionado acá está respaldado por los papers que se dejan a continuación.
- El sistema modulador descendente es bidireccional: puede actuar como freno (inhibición) o como acelerador (facilitación) del dolor.
- La actividad física regular es un potente fármaco neurobiológico que entrena y restaura los frenos endógenos del dolor.`,
    references: [
      {
        author: 'Hoegh M, Bannister K.',
        year: '2024',
        journal: 'J Orthop Sports Phys Ther',
        doi: '10.2519/jospt.2024.12112',
        title: 'Pain Science in Practice (Part 6): How Does Descending Modulation of Pain Work?'
      }
    ]
  },
  {
    id: '38',
    slug: 'neurociencia-dolor-practica-parte-5-sensibilizacion-central-wind-up-ltp-hoegh-2023',
    title: 'Neurociencia del dolor en la práctica (Parte 5): Sensibilización central II – Wind-up y potenciación a largo plazo (LTP)',
    subtitle: 'Despolarización acumulativa en receptores NMDA, plasticidad heterosináptica clásica de Woolf y las limitaciones metodológicas de extrapolar la sensibilización a la clínica.',
    categoryType: 'tematica',
    categoryValue: 'dolor-persistente',
    categoryLabel: 'Dolor persistente y neurociencia',
    audience: 'clinico',
    date: '25 de Octubre, 2026',
    author: 'Morten Hoegh (Adaptado por MyoKine)',
    readingTime: 9,
    summary: '¿Qué diferencia al wind-up de la sensibilización central clásica o la potenciación a largo plazo? Ordenamos qué pasa en la sinapsis y en qué momento, y analizamos el impacto del método experimental en las conclusiones clínicas.',
    pullQuote: 'El wind-up dura apenas segundos tras cesar el estímulo; la sensibilización central clásica y la LTP espinal, en cambio, reflejan cambios neuroplásticos prolongados mediados por calcio y receptores NMDA.',
    content: `El término paraguas "sensibilización central" a menudo genera confusión en la práctica clínica porque se utiliza indistintamente para referirse a fenómenos bioeléctricos de duraciones y naturalezas muy diversas: desde cambios sinápticos efímeros de milisegundos hasta potenciaciones prolongadas de meses o años.

En la quinta parte de la serie **Pain Science in Practice**, el Dr. **Morten Hoegh** clasifica con rigor tres fenómenos clave: el *wind-up*, la sensibilización central clásica de Woolf y la potenciación a largo plazo (LTP) espinal.

---

### 1. Wind-Up: El Descubrimiento de Mendell y Wall (1965)
Cuando una fibra C aferente primaria se estimula repetitivamente a frecuencias bajas constantes (< 5 Hz), la neurona de segundo orden del asta dorsal no mantiene una respuesta plana, sino que experimenta una **despolarización acumulativa progresiva** que aumenta el número de potenciales de acción emitidos por estímulo ("más respuesta por el mismo estímulo").

* **Mecanismo Bioquímico:** Inicialmente, el glutamato activa receptores AMPA. Si la estimulación persiste, la despolarización progresiva de la membrana expulsa el ión de magnesio (Mg²⁺) que bloquea el poro del receptor **NMDA**. Al desobstruirse el canal, penetran iones de Na⁺ y Ca²⁺, disparando la excitabilidad.
* **Cronología:** El *wind-up* es un fenómeno estrictamente **homosináptico** de muy corta duración; cesa a los pocos segundos de detener el estímulo. Su correlato en humanos es la **sumación temporal del dolor (TSP)**, utilizada como marcador indirecto de excitabilidad sináptica.

---

### 2. Sensibilización Central Clásica (Clifford Woolf, 1983)
En 1983, Clifford Woolf demostró que tras una estimulación eléctrica nociva o un proceso inflamatorio, la eficacia sináptica del asta dorsal aumentaba durante "decenas de minutos" y —crucialmente— **se propagaba hacia neuronas que inervaban territorios alejados e involucraba fibras mecanorreceptoras A-beta**.

A diferencia del *wind-up*, la sensibilización central clásica es **heterosináptica**, se retroalimenta por la respuesta inflamatoria periférica y persiste mientras se mantenga el estímulo o la activación de segundos mensajeros celulares.

---

### 3. Potenciación a Largo Plazo (LTP) en el Asta Dorsal
Descrita originalmente en el hipocampo para explicar la memoria y el aprendizaje, la LTP espinal representa un fortalecimiento sináptico duradero (de horas a semanas):
* El influjo masivo de Ca²⁺ a través de canales dependientes de voltaje (VGCC) y receptores NMDA activa kinasas intracelulares clave: Proteína Kinasa C (**PKC**) y **CaMKII**.
* Estas enzimas fosforilan los receptores existentes y promueven la inserción de nuevos receptores AMPA en la membrana postsináptica, reduciendo de forma duradera el umbral de activación.
* En presencia de activación glial, la LTP puede volverse independiente de la aferencia inicial, constituyendo un mecanismo plausible para el dolor persistente que sobrevive a la cicatrización tisular.

---

### 4. La Metodología Modela la Conclusión
Hoegh advierte sobre un sesgo científico habitual: gran parte de lo que sabemos sobre sensibilización central proviene de preparaciones de médula aislada en placas de cultivo o estímulos eléctricos no fisiológicos a 100 Hz en animales anestesiados. En el ser humano intacto, **la sensibilización central coexiste permanentemente con potentes sistemas endógenos de inhibición y modulación**.

### Conclusión
Todo lo mencionado acá está respaldado por los papers que se dejan a continuación.
- El wind-up es transitorio e intrínsecamente insuficiente para explicar el dolor crónico persistente por sí solo.
- La sensibilización central es un proceso dinámico condicionado por el balance neuroquímico del asta dorsal y la modulación descendente.`,
    references: [
      {
        author: 'Hoegh M.',
        year: '2023',
        journal: 'J Orthop Sports Phys Ther',
        doi: '10.2519/jospt.2023.11571',
        title: 'Pain Science in Practice (Part 5): Central Sensitization II'
      }
    ]
  },
  {
    id: '37',
    slug: 'neurociencia-dolor-practica-parte-4-sensibilizacion-central-plasticidad-glia-hoegh-2023',
    title: 'Neurociencia del dolor en la práctica (Parte 4): Sensibilización central I – Plasticidad sináptica y células gliales',
    subtitle: 'Asta dorsal de la médula espinal, plasticidad homosináptica vs. heterosináptica, alodinia mecánica por fibras Aβ y el rol modulador de la microglía y astrocitos.',
    categoryType: 'tematica',
    categoryValue: 'dolor-persistente',
    categoryLabel: 'Dolor persistente y neurociencia',
    audience: 'clinico',
    date: '20 de Octubre, 2026',
    author: 'Morten Hoegh (Adaptado por MyoKine)',
    readingTime: 9,
    summary: '¿Por qué la zona vecina a una lesión se vuelve hipersensible al roce suave? Analizamos la sensibilización central espinal, la convergencia sináptica de fibras Aβ y la contribución de la microglía.',
    pullQuote: 'La sensibilización central permite que estímulos mecánicos inocuos transmitidos por fibras Aβ provoquen dolor (alodinia); la glía espinal actúa como un amplificador neuroinmune de este circuito.',
    content: `La **sensibilización central** se define formalmente como el *incremento en la capacidad de respuesta de las neuronas nociceptivas en el sistema nervioso central ante sus entradas aferentes habituales o subumbrales*. Traduce un fenómeno de facilitación de la plasticidad sináptica en el que la señal original se amplifica.

En esta cuarta entrega de la serie **Pain Science in Practice**, el Dr. **Morten Hoegh** desglosa la arquitectura de la médula espinal, la diferencia entre plasticidad homosináptica y heterosináptica, y la participación indispensable de las células gliales.

---

### 1. La Arquitectura del Asta Dorsal y la Convergencia Neural
El asta dorsal de la médula espinal está estratificada anatómicamente en láminas descritas originalmente por Rexed:
* **Láminas I y II (Sustancia Gelatinosa):** Reciben aferencias nociceptivas primarias (fibras C y A-delta) que hacen sinapsis con neuronas nociceptivas específicas (NS, que responden exclusivamente a estímulos de alta intensidad).
* **Lámina V:** Alberga neuronas de **amplio rango dinámico (WDR - *Wide Dynamic Range*)**, las cuales reciben convergencia tanto de fibras nociceptivas de alto umbral como de fibras táctiles mecanosensibles de bajo umbral (fibras A-beta).

Cuando las neuronas del asta dorsal son estimuladas de forma repetida o intensa por un bombardeo nociceptivo periférico, su umbral de activación se deprime y su eficacia sináptica se multiplica.

---

### 2. Plasticidad Homosináptica vs. Heterosináptica: El Origen de la Alodinia
Para comprender cómo se manifiesta clínicamente la sensibilización central, es vital distinguir ambos tipos de plasticidad:

* **Plasticidad Homosináptica:**
  * El incremento de la eficacia sináptica ocurre estrictamente en la misma sinapsis que fue estimulada (por ejemplo, entre la fibra C estimulada y la neurona de segundo orden).
  * Conduce a la expansión del campo receptivo de la neurona espinal, explicando la **hiperalgesia secundaria** (aumento de sensibilidad al pinchazo en piel no lesionada circundante).
* **Plasticidad Heterosináptica (Sensibilización Central Clásica):**
  * La facilitación se propaga a sinapsis vecinas no estimuladas previamente.
  * Fibras táctiles inocuas **A-beta** que habitualmente transmiten el roce suave o la vibración pasan a ser capaces de despolarizar neuronas de transmisión nociceptiva en el asta dorsal.
  * Ésta es la base neurofisiológica de la **alodinia mecánica táctil** (el roce de la ropa o una caricia desencadenan dolor agudo).

---

### 3. Células Gliales: ¿La Mitad Olvidada de la Ecuación?
Tradicionalmente se consideraba que las neuronas eran las únicas protagonistas de la transmisión nociceptiva. La investigación actual demuestra que las **células gliales (microglía y astrocitos)** son determinantes:
* **Microglía:** Actúa como los macrófagos residentes del SNC. Ante señales de alarma o lesión axonal periférica, la microglía adopta un estado reactivo y secreta citocinas proinflamatorias (IL-1β, TNF-α) y quimiocinas que aumentan la fosforilación de receptores de glutamato.
* **Astrocitos:** Regulan la recaptación de glutamato de la hendidura sináptica y mantienen la integridad de la barrera hematoencefálica. En estados reactivos crónicos, disminuyen la recaptación de neurotransmisores excitatorios, favoreciendo un estado hiperpolarizado e hiperexcitable que genera una auténtica "huella de memoria" en las vías nociceptivas.

### Conclusión
Todo lo mencionado acá está respaldado por los papers que se dejan a continuación.
- La sensibilización central es un fenómeno neurofisiológico dinámico y potencialmente reversible; no debe confundirse con un estado de dolor intratable o irreversible.
- Las manifestaciones como la hiperalgesia secundaria y la alodinia son ventanas clínicas indirectas hacia la plasticidad espinal.`,
    references: [
      {
        author: 'Hoegh M.',
        year: '2023',
        journal: 'J Orthop Sports Phys Ther',
        doi: '10.2519/jospt.2023.11569',
        title: 'Pain Science in Practice (Part 4): Central Sensitization I'
      }
    ]
  },
  {
    id: '36',
    slug: 'neurociencia-dolor-practica-parte-3-sensibilizacion-periferica-reflejo-axonico-hoegh-2022',
    title: 'Neurociencia del dolor en la práctica (Parte 3): Sensibilización periférica e inflamación neurogénica',
    subtitle: 'Fibras C peptidérgicas, canales TRPV1, reflejo axónico antidrómico y la cascada de segundos mensajeros que hiperactivan al nociceptor.',
    categoryType: 'tematica',
    categoryValue: 'dolor-persistente',
    categoryLabel: 'Dolor persistente y neurociencia',
    audience: 'clinico',
    date: '15 de Octubre, 2026',
    author: 'Morten Hoegh (Adaptado por MyoKine)',
    readingTime: 9,
    summary: '¿Por qué un tejido lesionado duele ante estímulos habitualmente indoloros? Analizamos la fisiología de la sensibilización periférica, el reflejo axónico y el papel de las fibras C peptidérgicas.',
    pullQuote: 'La sensibilización periférica no se ve a simple vista; los signos de hiperalgesia primaria traducen la sopa inflamatoria de neuropéptidos y segundos mensajeros que aumentan la excitabilidad del nociceptor.',
    content: `La sensibilización se define por la IASP como el *aumento de la capacidad de respuesta de las neuronas nociceptivas a sus estímulos habituales, y/o el reclutamiento de respuestas ante estímulos habitualmente subumbrales*. No constituye un diagnóstico en sí mismo, sino una propiedad neurofisiológica de plasticidad que permite proteger al tejido herido durante su cicatrización.

En la tercera entrega de la serie **Pain Science in Practice**, el Dr. **Morten Hoegh** aborda en profundidad la **sensibilización periférica** y su estrecho vínculo con la respuesta inflamatoria y la inflamación neurogénica.

---

### 1. Fibras C y el Receptor TRPV1
La mayoría de los nociceptores cutáneos y musculares de alto umbral son **fibras C amielínicas** rodeadas de células de Schwann no mielinizantes (haces de Remak). Casi todas expresan el canal **TRPV1** (*Transient Receptor Potential Vanilloid 1*), receptor polimodal sensible a temperaturas superiores a 42-43°C, acidosis local (caída de pH tisular) y capsaicina (el principio activo del chile o ají).

Curiosamente, la sobreestimulación continua del canal TRPV1 agota la reserva de neurotransmisores y desensibiliza o inactiva los canales de membrana; este principio neurobiológico fundamenta los parches de capsaicina de alta concentración utilizados en dolor neuropático periférico. Además, existen fibras C "silentes" o mecanoinsensibles que en reposo fisiológico no descargan ante estímulos mecánicos, pero al inflamarse el tejido adquieren gran sensibilidad a la carga física.

---

### 2. Inflamación Neurogénica y el Reflejo Axónico
A diferencia de la inflamación clásica mediada exclusivamente por células del sistema inmunitario, las **fibras C peptidérgicas** participan activamente en la inflamación local mediante el denominado **reflejo axónico**:
1. Cuando un terminal periférico de la fibra C se activa, el potencial de acción no solo viaja ortodrómicamente hacia la médula espinal, sino que se propaga **antidrómicamente (en retroceso)** hacia las ramificaciones colaterales vecinas.
2. En estos terminales colaterales se liberan neuropéptidos al intersticio tisular: **Sustancia P (SP)** y el **Péptido Relacionado con el Gen de la Calcitonina (CGRP)**.
3. La sustancia P y CGRP provocan vasodilatación arteriolar potente (eritema / *flare* cutáneo), incremento de la permeabilidad capilar (edema) y degranulación de mastocitos tisulares, liberando histamina y reclutando macrófagos.

Este mecanismo es un proceso fisiológico adaptativo indispensable para la reparación del tejido; sin embargo, en condiciones patológicas puede perpetuar hipersensibilidad dolorosa.

---

### 3. Cascada Intracelular de Segundos Mensajeros
Cuando el tejido sufre una sobrecarga o traumatismo, se vierten a la matriz extracelular factores proinflamatorios y algógenos: factor de necrosis tumoral alfa (TNF-α), interleucinas, PGE₂ y factor de crecimiento nervioso (NGF).
* Estos algógenos se unen a receptores en la membrana del nociceptor y activan sistemas de **segundos mensajeros** intracelulares: Ca²⁺, AMPc e inositol trifosfato (IP₃).
* Estos mensajeros activan quinasas enzimáticas (Proteína Kinasa A - **PKA**, Fosfolipasa C - **PLC**, CaMK), las cuales **fosforilan los canales de sodio dependientes de voltaje (NaV1.7, NaV1.8, NaV1.9) y el canal TRPV1**.
* La fosforilación disminuye drásticamente el umbral de apertura del canal, permitiendo que estímulos mecánicos o térmicos de baja intensidad desencadenen trenes continuos de potenciales de acción hacia la médula.

### Conclusión
Todo lo mencionado acá está respaldado por los papers que se dejan a continuación.
- La hiperalgesia primaria (dolor desmedido en el área de la lesión) es la manifestación clínica directa de la sensibilización periférica.
- La inflamación neurogénica refleja el diálogo bidireccional entre el sistema nervioso y el sistema inmune para proteger y reparar el tejido sobrecargado.`,
    references: [
      {
        author: 'Hoegh M.',
        year: '2022',
        journal: 'J Orthop Sports Phys Ther',
        doi: '10.2519/jospt.2022.11202',
        title: 'Pain Science in Practice (Part 3): Peripheral Sensitization'
      }
    ]
  },
  {
    id: '35',
    slug: 'neurociencia-dolor-practica-parte-2-canales-ionicos-receptores-mecanismos-hoegh-2022',
    title: 'Neurociencia del dolor en la práctica (Parte 2): Canales iónicos, receptores y efectos del tratamiento',
    subtitle: 'De la biomecánica a la neurobiología: receptores ionotrópicos, metabotrópicos, canales Piezo y por qué terapias distintas convergen en los mismos circuitos.',
    categoryType: 'tematica',
    categoryValue: 'dolor-persistente',
    categoryLabel: 'Dolor persistente y neurociencia',
    audience: 'clinico',
    date: '10 de Octubre, 2026',
    author: 'Morten Hoegh (Adaptado por MyoKine)',
    readingTime: 8,
    summary: '¿Cómo explican los receptores y canales iónicos el dolor musculoesquelético? Analizamos cómo la educación, el ejercicio, la terapia manual y los fármacos convergen en cascadas neuroquímicas comunes.',
    pullQuote: 'Diferentes terapias pueden catalizar las mismas vías de señalización química: la educación, el ejercicio, la terapia cognitiva y la terapia manual comparten dianas neurobiológicas con la farmacología.',
    content: `Históricamente, la formación de la mayoría de los fisioterapeutas y kinesiólogos se centró en "identificar la disfunción mecánica del movimiento para corregirla", asumiendo de manera lineal que la alineación o corrección cinemática eliminaría el dolor. Sin embargo, este modelo reduccionista es insuficiente ante la evidencia contemporánea, donde el dolor crónico frecuentemente persiste sin daño tisular demostrable, o donde tratamientos biomecánicamente "inespecíficos" generan alivio clínico rotundo.

En la segunda entrega de la serie **Pain Science in Practice**, el Dr. **Morten Hoegh** explora la microestructura molecular del dolor: los tipos de receptores, los canales mecanosensibles y el concepto de tratamiento basado en mecanismos.

---

### 1. Receptores y Canales Iónicos: El Enchufe Molecular
Un **canal iónico** es una proteína transmembrana con compuerta que permite el flujo selectivo de iones a favor de su gradiente electroquímico, modificando el potencial de membrana. Un **receptor**, por su parte, es un complejo proteico capaz de reconocer selectivamente ligandos específicos. En las terminaciones nociceptivas destacan tres familias principales:

1. **Receptores Ionotrópicos (Ligand-Gated):**
   * Funcionan como una "llave en su cerradura". La unión del ligando abre instantáneamente el poro del canal iónico acoplado.
   * *Ejemplo clave:* El receptor **NMDA** y **AMPA** activados por glutamato en la médula espinal, esenciales en la transmisión rápida y en fenómenos de plasticidad como el *wind-up*.
2. **Receptores Metabotrópicos (Acoplados a Proteínas G - GPCRs):**
   * Actúan a través de segundos mensajeros intracelulares (AMPc, IP₃, Ca²⁺) e inducen cambios metabólicos rápidos y cascadas enzimáticas.
   * *Ejemplo clave:* El receptor de prostaglandina **EP₂**, activado por PGE₂, y el receptor **NK₁**, activado por Sustancia P, inductores primarios de sensibilización periférica y central.
3. **Receptores Tirosina Quinasa (Trk):**
   * Median la respuesta neuronal a factores de crecimiento tisular y neurotrofinas.
   * *Ejemplo clave:* **TrkA** (activado por Factor de Crecimiento Nervioso / NGF) y **TrkB** (activado por BDNF), protagonistas centrales de la neuroplasticidad maladaptativa y la regeneración axónica.

---

### 2. La Mecanotransducción y los Canales Piezo
Durante décadas se comprendió bien cómo los estímulos térmicos (vía receptores TRPV) o químicos (vía receptores de bradicinina y protones) desencadenaban nocicepción, pero la transducción de presiones mecánicas intensas permanecía esquiva. El descubrimiento de los canales **Piezo (especialmente Piezo2)** —galardonado con el Premio Nobel en 2021— demostró cómo la deformación mecánica de la membrana abre físicamente el poro iónico.

En clínica, cuando un paciente pregunta *"¿por qué me duele al moverme?"*, la respuesta neurobiológica más precisa no reside en una supuesta "mala postura", sino en la **sensibilización** de estos canales y terminaciones periféricas.

---

### 3. Efectos Específicos e Inespecíficos: Vías Compartidas
La farmacología opera mediante moléculas diseñadas para actuar directamente como agonistas o antagonistas sobre receptores específicos (por ejemplo, los AINEs bloquean las enzimas COX reduciendo la producción de PGE₂, aliviando la activación del receptor EP₂).

Las terapias no farmacológicas (ejercicio terapéutico, educación en dolor, terapia manual, modificación de hábitos de sueño) no actúan mediante un fármaco único, pero **desencadenan cascadas químicas endógenas idénticas**: promueven la liberación de opioides endógenos, endocannabinoides y monoaminas que se unen a estos mismos receptores inhibidores, normalizando la excitabilidad sináptica con un perfil de seguridad infinitamente superior.

### Conclusión
Todo lo mencionado acá está respaldado por los papers que se dejan a continuación.
- La neurociencia explica por qué el dolor persiste en ausencia de daño y por qué tratamientos activos no quirúrgicos resultan tan eficaces.
- El ejercicio, la educación y las intervenciones activas modulan las mismas vías intracelulares que la farmacología clásica, habilitando la autorregulación del paciente.`,
    references: [
      {
        author: 'Hoegh M.',
        year: '2022',
        journal: 'J Orthop Sports Phys Ther',
        doi: '10.2519/jospt.2022.10994',
        title: 'Pain Science in Practice: What Is Pain Neuroscience? Part 2'
      }
    ]
  },
  {
    id: '34',
    slug: 'neurociencia-dolor-practica-parte-1-transduccion-transmision-percepcion-hoegh-2022',
    title: 'Neurociencia del dolor en la práctica (Parte 1): ¿Qué es la neurociencia del dolor?',
    subtitle: 'Conceptos fundamentales de transducción, transmisión axonal, canales de sodio NaV1.7 y por qué nocicepción y dolor no son lo mismo.',
    categoryType: 'tematica',
    categoryValue: 'dolor-persistente',
    categoryLabel: 'Dolor persistente y neurociencia',
    audience: 'ambos',
    date: '05 de Octubre, 2026',
    author: 'Morten Hoegh (Adaptado por MyoKine)',
    readingTime: 8,
    summary: '¿Es la nocicepción equivalente al dolor? Desglosamos la fisiología elemental de la transducción y transmisión neural, examinando por qué los estímulos nocivos nunca equivalen a la experiencia subjetiva del dolor.',
    pullQuote: 'Los estímulos nocivos no equivalen a dolor; activan nociceptores. En la clínica puedes intentar descartar la nocicepción, pero jamás descalificar la experiencia de dolor descrita por el paciente.',
    content: `La neurociencia es una disciplina multidisciplinar centrada en el sistema nervioso que constituye la columna vertebral de la investigación moderna sobre el dolor y un pilar insustituible en la práctica clínica musculoesquelética (MSK). Sin embargo, trasladar los descubrimientos neurobiológicos al box de atención requiere comprender con claridad sus conceptos elementales, sus alcances y sus limitaciones.

En este primer editorial de la serie **Pain Science in Practice** publicada en el **Journal of Orthopaedic & Sports Physical Therapy (JOSPT)**, el Dr. **Morten Hoegh** establece los cimientos fisiológicos que conectan el estímulo ambiental con la percepción consciente.

---

### 1. Estímulo vs. Percepción: La Pregunta del Árbol en el Bosque
Si un árbol cae en medio del bosque y no hay nadie cerca para oírlo, ¿produce sonido? Físicamente, la caída genera vibraciones mecánicas y desplazamiento de partículas en el aire que pueden medirse y cuantificarse con instrumental objetivo. Sin embargo, dado que el "sonido" es una cualidad atribuida por la mente consciente, esas ondas de presión no serán percibidas como sonido a menos que exista un sistema auditivo que las decodifique.

En neurociencia ocurre exactamente lo mismo:
* **El Estímulo:** Es el fenómeno físico medible (energía mecánica, térmica o química).
* **La Nocicepción:** Es el proceso neuronal de codificar y transmitir señales desencadenadas por estímulos nocivos o potencialmente lesivos.
* **El Dolor:** Es una experiencia sensorial y emocional subjetiva, construida en la conciencia, modulada por el contexto, las expectativas y el estado afectivo.

Por tanto, **la activación de una fibra sensorial no conduce automáticamente a una percepción predeterminada: los estímulos nociceptivos no son dolor, simplemente activan nociceptores.**

---

### 2. Los Eslabones Neurobiológicos: Transducción, Transmisión y Modulación
El trayecto de la información nociceptiva involucra tres fases fundamentales:

1. **Transducción:** Transformación de una forma de energía del entorno (química, térmica o mecánica) en energía eléctrica (potenciales de acción neuronales). Los nociceptores son receptores de alto umbral ubicados en las terminaciones libres de axones periféricos (fibras C amielínicas y fibras A-delta débilmente mielinizadas).
2. **Transmisión:** Propagación del potencial de acción a lo largo del axón mediante canales iónicos dependientes de voltaje. Entre ellos, el canal de sodio **NaV1.7** (codificado por el gen *SCN9A*) cumple un rol crítico: mutaciones de pérdida de función en este gen causan insensibilidad congénita al dolor en humanos, mientras que mutaciones con ganancia de función provocan eritromelalgia primaria (crisis de dolor urente extremo).
3. **Modulación y Liberación Sináptica:** Cuando el potencial de acción alcanza el terminal central en el asta dorsal de la médula espinal, la apertura de canales de calcio dependientes de voltaje permite la exocitosis de neurotransmisores (como glutamato y sustancia P) hacia la hendidura sináptica para activar neuronas de segundo orden en el haz espinotalámico.

---

### 3. La Complejidad Sináptica: Más Allá de un Cable Telefónico
Con frecuencia se enseña la vía del dolor como si fuera un simple circuito de dos neuronas conectadas en serie. Esta simplificación oculta que en la hendidura sináptica intervienen **células gliales (microglía y astrocitos)**, interneuronas inhibitorias GABAérgicas y moduladores descendentes procedentes del tronco del encéfalo. La transmisión neural es un proceso biológico vivo y altamente dinámico que nunca puede reducirse a una lectura mecánica directa.

### Conclusión
Todo lo mencionado acá está respaldado por los papers que se dejan a continuación.
- La nocicepción es la respuesta neuronal a estímulos de alta intensidad; el dolor es la percepción subjetiva y consciente.
- Presta atención a los cambios sensoriales objetivos (hipoestesia, alodinia, hiperalgesia) mediante un examen neurológico riguroso, recordando que la plasticidad del sistema nervioso es fundamental para la supervivencia.`,
    references: [
      {
        author: 'Hoegh M.',
        year: '2022',
        journal: 'J Orthop Sports Phys Ther',
        doi: '10.2519/jospt.2022.10995',
        title: 'Pain Science in Practice: What Is Pain Neuroscience? Part 1'
      }
    ]
  },
  {
    id: '33',
    slug: 'ejercicio-paterno-herencia-epigenetica-micrornas-esperma-2025',
    title: 'El ejercicio paterno transmite capacidad de resistencia a la descendencia mediante microARNs del esperma',
    subtitle: 'Un estudio en Cell Metabolism, hecho principalmente en ratones, sugiere que el entrenamiento aeróbico del padre modifica microARNs del esperma que influyen en el metabolismo de las crías.',
    categoryType: 'tematica',
    categoryValue: 'ciencias-deporte',
    categoryLabel: 'Ciencias del deporte',
    audience: 'clinico',
    date: '28 de Septiembre, 2026',
    author: 'Xin Yin, Chen-Yu Zhang, Xi Chen & Colaboradores (Adaptado por MyoKine)',
    readingTime: 11,
    summary: '¿Puede el entrenamiento físico de un padre mejorar el rendimiento y la salud metabólica de sus hijos? Descubrimos la vía epigenética por la cual los microARNs del esperma regulan el desarrollo embrionario.',
    pullQuote: 'El ejercicio físico del padre no solo beneficia su propia salud: los microARNs de su esperma reconfiguran la expresión génica del embrión temprano, dotando a la descendencia de mayor capacidad mitocondrial y resistencia a la obesidad.',
    content: `Tradicionalmente se ha asumido que los hábitos de vida del padre antes de la concepción solo aportaban la secuencia estática del ADN cromosómico. Sin embargo, la investigación epigenética reciente ha comenzado a revelar que los factores ambientales paternos —como la nutrición, el estrés y el nivel de actividad física— dejan huellas moleculares transmisibles en los espermatozoides.

En un avance científico publicado en **Cell Metabolism** (2025), **Xin Yin y colaboradores** demuestran por primera vez la causalidad molecular y la vía epigenética mediante la cual el entrenamiento aeróbico paterno confiere a la descendencia una mayor capacidad de resistencia muscular, superior biogénesis mitocondrial y protección frente a la disfunción metabólica.

---

### 1. El Fenotipo Heredado: Mayor Resistencia y Capacidad Oxidativa
Los investigadores entrenaron a ratones machos en cinta rodante durante 8 semanas (grupo F0-Et) y los cruzaron con hembras sedentarias. La descendencia (F1-Et), sin haber realizado ningún tipo de entrenamiento previo, presentó adaptaciones físicas y metabólicas notables en comparación con los hijos de padres sedentarios (F1-Sed):
* **Rendimiento Físico:** Los ratones F1-Et corrieron distancias significativamente mayores hasta el agotamiento, registraron menores niveles de lactato sanguíneo post-esfuerzo y mostraron una mayor fuerza de agarre y resistencia muscular.
* **Transformación Muscular:** El músculo gastrocnemio de la descendencia F1-Et mostró una clara transición fenotípica hacia fibras musculares altamente oxidativas (Tipo I, IIa y IIx), con mayor actividad de la enzima succinato deshidrogenasa (SDH) y citrato sintasa (CS).
* **Expansión Mitocondrial:** Se observó un incremento marcado en la densidad mitocondrial, el número de copias de ADN mitocondrial (mtDNA) y la expresión de proteínas clave de la cadena respiratoria (PGC-1α, ATP5a, Cyt-C, COX5a, NDUFA9).

---

### 2. PGC-1α Muscular Paterno: El Disparador Tisular de la Señal Epigenética
Para determinar si las adaptaciones oxidativas del músculo del padre eran la fuente primaria de esta herencia, los autores emplearon un modelo transgénico de sobreexpresión muscular específica de **PGC-1α** (MCK-PGC-1α), el coactivador transcripcional maestro del metabolismo mitocondrial.

Sorprendentemente, los descendientes nacidos de padres transgénicos pero que **no heredaron el transgén** (F1-PGC-1α-WT) mostraron las mismas adaptaciones de alta resistencia, transición fibrilar oxidativa y mejoría metabólica que los hijos de padres entrenados. Esto confirmó que la activación de PGC-1α en el músculo esquelético paterno induce una señal sistémica que modifica el contenido informativo del esperma.

---

### 3. El Vehículo Epigenético: microARNs del Esperma y el Eje miR-148a-3p / NCoR1
Mediante secuenciación profunda de ARN pequeño (*sRNA deep sequencing*) y experimentos de microinyección en cigotos:
1. **Alteración del Perfil de microARNs:** Se identificaron microARNs del esperma significativamente elevados tanto en padres entrenados como en padres transgénicos PGC-1α. Entre ellos, el **miR-148a-3p** mostró un aumento superior a 3 veces.
2. **Transferencia al Embrión Temprano:** Tras la fertilización, estos microARNs espermáticos se entregan al oocito y reprimen directamente al **Co-represor Nuclear 1 (NCoR1)** en el embrión de 2 a 8 células.
3. **Desinhibición de PGC-1α en el Embrión:** Puesto que NCoR1 es un antagonista y represor natural de PGC-1α y de los receptores nucleares PPARs/ERRα, su silenciamiento durante las primeras divisiones embrionarias libera la maquinaria transcripcional oxidativa, reconfigurando la programación del desarrollo muscular y metabólico.
4. **Validación por Microinyección Directa:** La sola microinyección del microARN sintético **miR-148a-3p** en cigotos normales fue suficiente para replicar en los adultos resultantes las adaptaciones de alta resistencia y masa mitocondrial.

---

### 4. Protección Frente a la Obesidad y Salud Metabólica
Cuando la descendencia fue sometida a una dieta rica en grasas (*High-Fat Diet*), los hijos de padres ejercitados (F1-Et-HFD) o microinyectados con sRNAs de esperma ejercitado mostraron:
* **Tolerancia a la Glucosa e Insulina Preservada:** Menores picos de glucemia y mayor sensibilidad a la insulina.
* **Mayor Captación de Glucosa Muscular:** Demostrado in vivo mediante tomografía PET/CT con ¹⁸F-FDG, con un incremento marcado en la fosforilación de AKT y la traslocación del transportador GLUT4 en el músculo esquelético.
* **Menor Acumulación de Grasa:** Preservación de la flexibilidad metabólica a pesar de la sobrecarga calórica.

---

### 5. Conservación Humana y Relevancia Clínica
Destacadamente, los autores analizaron el esperma de donantes humanos entrenados aeróbicamente frente a sujetos sedentarios, confirmando que **7 de los principales microARNs identificados en roedores (incluyendo miR-148a-3p) también están significativamente incrementados en el esperma de hombres entrenados**.

### Conclusión
Todo lo mencionado acá está respaldado por los papers que se dejan a continuación.
- El entrenamiento aeróbico paterno genera beneficios metabólicos y de rendimiento que se transmiten epigeneticamente a la siguiente generación mediante microARNs del esperma.
- El eje miR-148a-3p / NCoR1 embrionario actúa como un reconfigurador del desarrollo que potencia la biogénesis mitocondrial y la resiliencia metabólica de la descendencia.`,
    references: [
      {
        author: 'Yin X, Anwar A, Yan L, Yu R, Luo Y, Shi L, ..., Chen D, Zhang T, Zhang CY, Chen X.',
        year: '2025',
        journal: 'Cell Metabolism',
        doi: '10.1016/j.cmet.2025.09.003',
        title: 'Paternal exercise confers endurance capacity to offspring through sperm microRNAs'
      }
    ]
  },
  {
    id: '32',
    slug: 'actividad-muscular-complejo-lumbo-pelvis-cadera-trx-rip-trainer-2019',
    title: 'Actividad muscular del complejo lumbo-pelvis-cadera en ejercicios isométricos con TRX® Rip Trainer™',
    subtitle: 'Un estudio electromiográfico de Flores-León y colaboradores sobre cómo la dirección y asimetría de la resistencia elástica modulan el reclutamiento muscular del core.',
    categoryType: 'tematica',
    categoryValue: 'entrenamiento-fuerza',
    categoryLabel: 'Fuerza como intervención',
    audience: 'clinico',
    date: '22 de Septiembre, 2026',
    author: 'Andrés Felipe Flores-León & Colaboradores (Adaptado por MyoKine)',
    readingTime: 9,
    summary: '¿Cómo afecta la resistencia elástica asimétrica al reclutamiento del core? Analizamos la activación del complejo lumbo-pelvis-cadera en tres ejercicios isométricos con TRX Rip Trainer.',
    pullQuote: 'La dirección del vector y el lado de anclaje de la resistencia elástica asimétrica determinan de forma específica la magnitud y lateralidad del reclutamiento muscular en el core.',
    content: `El complejo lumbo-pelvis-cadera (CLPC o *core*) actúa como un eslabón central de transferencia de fuerza entre las extremidades superiores e inferiores, proporcionando estabilidad a la columna lumbar, la pelvis y las articulaciones de la cadera. El entrenamiento de la estabilidad lumbopélvica suele iniciarse con contracciones isométricas controladas para progresar hacia movimientos dinámicos y funcionales.

El dispositivo **TRX® Rip Trainer™** utiliza una barra acoplada a un cordón de resistencia elástica (RE) para generar fuerzas desestabilizadoras asimétricas. En este estudio publicado en la revista **Retos** (2019), **Flores-León et al.** evaluaron la actividad electromiográfica de superficie (sEMG) en 22 hombres jóvenes físicamente activos durante tres ejercicios isométricos resistidos.

---

### 1. Los Tres Ejercicios Evaluados y sus Vectores
Los participantes sostuvieron durante 30 segundos tres posturas isométricas estándar frente al punto de anclaje de la resistencia elástica:
* **Drag (Tensión Anterior):** El participante se ubica frente al anclaje resistiendo una tracción hacia adelante, lo que genera un momento extensor y exige control anterior.
* **Drive (Tensión Posterior):** De espaldas al anclaje, extendiendo los brazos al frente, resistiendo una tracción posterior que genera un momento flexor de tronco y cadera.
* **Stack (Tensión Rotacional):** De lado al punto de anclaje, ejecutando una torsión de tronco para sostener la barra frente al cuerpo, resistiendo una fuerza de rotación asimétrica.

---

### 2. Principales Hallazgos Electromiográficos por Músculo
Se registró la actividad electromiográfica del músculo **longísimo (LG)**, **oblicuo externo (OE)**, **glúteo medio (GM)** y **bíceps femoral (BF)** de forma bilateral (lado ipsilateral y contralateral a la banda de resistencia):

1. **Longísimo (Eractor Espinal / LG):**
   * El ejercicio **Stack (rotacional)** generó los niveles más altos de activación muscular cuando la resistencia elástica se situó en el lado ipsilateral (p < 0.002).
   * En el ejercicio *Drive* (tensión posterior), situar la resistencia en el lado ipsilateral incrementó significativamente la actividad del longísimo para mantener la postura erguida.
2. **Oblicuo Externo (OE):**
   * Mostró una activación significativamente superior durante el ejercicio **Stack** en comparación con *Drive* y *Drag*, demostrando su rol primario en la desaceleración y control de torques rotacionales.
3. **Glúteo Medio (GM):**
   * En el ejercicio **Stack**, la ubicación contralateral de la resistencia elástica incrementó de forma significativa la actividad del glúteo medio (p = 0.038), actuando como estabilizador de la pelvis en el plano frontal y transversal.
4. **Bíceps Femoral (BF):**
   * Durante **Drag** (tensión anterior), la activación del bíceps femoral fue máxima cuando la resistencia estaba en el lado ipsilateral (p < 0.001), coadyuvando en la extensión de cadera contra el momento flexor anterior.
   * Durante **Stack** y **Drive**, el bíceps femoral contralateral registró mayor actividad para estabilizar la cadena cinética cerrada del miembro inferior.

---

### 3. Implicancias para la Rehabilitación y el Entrenamiento
* **Dosificación Específica del Vector:** La elección del ejercicio (*Drag*, *Drive* o *Stack*) y la posición respecto al anclaje permiten dirigir de forma precisa la carga hacia la musculatura extensora, flexora, rotadora o estabilizadora lateral de cadera.
* **Progresión de la Estabilidad Rotacional:** Los ejercicios que imponen resistencia rotacional (*Stack*) reclutan de manera más global y coordinada el complejo lumbo-pelvis-cadera, siendo una excelente herramienta para la prevención de lesiones y la preparación deportiva.
* **Alternativa a Pesos Libres:** La resistencia elástica asimétrica ofrece niveles de activación muscular comparables a resistencias isoinerciales tradicionales, minimizando picos de sobrecarga articular directa.

### Conclusión
Todo lo mencionado acá está respaldado por los papers que se dejan a continuación.
- La orientación del vector elástico y la asimetría del anclaje modifican selectivamente la activación del core.
- El ejercicio *Stack* destaca como la opción de mayor demanda neuromuscular integrada para la estabilidad lumbopélvica.`,
    references: [
      {
        author: 'Flores-León AF, Soto V, Araneda OF, Guzman-Venegas RA, Berral de la Rosa FJ.',
        year: '2019',
        journal: 'Retos',
        doi: '10.47197/retos.v0i35.63922',
        title: 'Muscle activity of the Lumbo-pelvic-hip complex in three isometric exercises using TRX ® rip trainer™'
      }
    ]
  },
  {
    id: '31',
    slug: 'efecto-dr-house-impolite-expertos-persuasion-2026',
    title: 'El "Efecto Dr. House": La impaciencia o falta de cortesía del experto y su impacto en la persuasión',
    subtitle: 'Un estudio en PsyCh Journal que analiza cómo el estilo de comunicación directa e impaciente de una autoridad clínica influye en la percepción de credibilidad y actitud del oyente.',
    categoryType: 'tematica',
    categoryValue: 'sesgos-cognitivos',
    categoryLabel: 'Sesgos cognitivos en clínica',
    audience: 'clinico',
    date: '16 de Septiembre, 2026',
    author: 'Teresa Garcia-Marques, Rita Silva, Filipe Loureiro, Ana Lapa (Adaptado por MyoKine)',
    readingTime: 8,
    summary: '¿Es más persuasivo un experto educado o uno impaciente y directo? Investigamos el "Efecto Dr. House" y su impacto en la comunicación clínica y la adherencia.',
    pullQuote: 'En comunicadores con alta pericia percibida, un lenguaje directo o descortés puede incrementar la persuasión, mientras que en no expertos la cortesía es indispensable para generar confianza.',
    content: `En el ámbito de la salud y la rehabilitación, la forma en que transmitimos un mensaje es tan determinante como su contenido científico. La figura del personaje televisivo "Dr. House" personifica al clínico altamente competente pero socialmente hosco, capaz de convencer y transformar la conducta del paciente a pesar de su lenguaje directo e impaciente.

En una serie de tres experimentos publicados en **PsyCh Journal** (2026), **Garcia-Marques et al.** evaluaron experimentalmente el impacto del estilo del lenguaje (cortés vs. impolítico/directo) cruzado con el nivel de pericia percibida (experto vs. no experto) sobre la actitud y la persuasión de los participantes ("Efecto Dr. House").

---

### 1. Metodología Experimental y Diseño
Los autores expusieron a los participantes a mensajes de salud con argumentos idénticos pero manipulando dos variables independientes principales:
1. **Nivel de Pericia:** Presentado como un especialista clínico (alto experto) frente a un comunicador no profesional (no experto).
2. **Estilo de Lenguaje:** Versión cortés/amable (p. ej., "Cuidar nuestra salud nos hace sentir mejor y protegidos") frente a versión impolítica/directa (p. ej., "Tener un problema no significa que debas descuidar tu cuerpo; no vas a mejorar solo con lamentarte").

---

### 2. Resultados Principales: La Interacción Pericia × Cortesía
* **El "Efecto Dr. House" en Expertos:** Cuando el emisor era percibido como un experto técnico de alto nivel, la versión con lenguaje **directo e impolítico resultó significativamente más persuasiva** y generó actitudes más favorables hacia el mensaje que la versión suave o hiper-cortés (p < 0.05).
* **El Efecto en No Expertos:** En contraste, cuando el emisor era un no experto, la cortesía y la amabilidad fueron indispensables para lograr persuasión. La impaciencia en un no experto redujo drásticamente la confianza percibida y la credibilidad.
* **Mecanismos Evaluados:** El efecto se mantuvo robusto al controlar por la relevancia del tema, la intención persuasiva percibida o los niveles de procesamiento consciente del oyente.

---

### 3. Implicancias para la Consulta y la Comunicación Clínica
* **Expectativa de Autoridad:** Los oyentes asocian la cortesía excesiva en un experto con posible vacilación, falta de convicción o afán comercial/superficial. Por el contrario, un lenguaje firme, directo y sin rodeos puede ser interpretado como señal de alta seguridad técnica y honestidad clínica.
* **Cuidado con el Sesgo:** Aunque el estudio muestra un beneficio persuasivo del lenguaje firme en expertos, la falta de empatía genuina puede lesionar la alianza terapéutica si no se equilibra con competencia percibida.
* **Aplicación en Educación en Dolor:** Al abordar creencias limitantes o kinesiofobia, el clínico no debe dudar en ser claro, asertivo y directo respecto a la seguridad del movimiento, evitando la ambigüedad o la cautela excesiva que pueda alimentar la percepción de fragilidad en el paciente.

### Conclusión
Todo lo mencionado acá está respaldado por los papers que se dejan a continuación.
- La firmeza y asertividad sin ambigüedades por parte de un profesional bien capacitado fortalecen la fuerza persuasiva de sus recomendaciones.
- Adaptar el estilo comunicativo comprendiendo los sesgos de percepción del paciente optimiza la alianza y el cumplimiento terapéutico.`,
    references: [
      {
        author: 'Garcia-Marques T, Silva R, Loureiro F, Lapa A.',
        year: '2026',
        journal: 'PsyCh Journal',
        doi: '10.1002/pchj.70081',
        title: 'The Dr. House Effect: Experts\' Impoliteness Influences Persuasion'
      }
    ]
  },
  {
    id: '30',
    slug: 'guia-mecanobiologia-biologia-fisica-2015',
    title: 'Guía de mecanobiología: El punto de encuentro entre la biología y la física',
    subtitle: 'Cómo las células detectan, traducen y responden a las fuerzas mecánicas del entorno matriz a través de integrinas, citoesqueleto y señalización intracelular.',
    categoryType: 'tematica',
    categoryValue: 'rehabilitacion-razonamiento',
    categoryLabel: 'Razonamiento clínico',
    audience: 'clinico',
    date: '10 de Septiembre, 2026',
    author: 'Karin A. Jansen, Dominique M. Donato, Hayri E. Balcioglu, Thomas Schmidt, Erik H.J. Danen, Gijsje H. Koenderink (Adaptado por MyoKine)',
    readingTime: 12,
    summary: '¿Cómo "sienten" las células la rigidez del tejido y la tensión mecánica? Exploramos la mecanotransducción a través de integrinas, matriz extracelular (2D vs 3D) y citoesqueleto.',
    pullQuote: 'Las células no solo responden a señales químicas; exploran activamente la rigidez de su matriz ejerciendo fuerzas de tracción y traduciendo la física tisular en decisiones genéticas.',
    content: `Cuando le decimos a un paciente que "la carga ayuda al tendón a adaptarse", estamos resumiendo en una frase un proceso fascinante: las células de nuestro cuerpo **sienten las fuerzas mecánicas** y responden a ellas, cambiando lo que producen, cómo se mueven e incluso en qué se convierten.

Ese campo se llama **mecanobiología**. Karin Jansen y colaboradores, de varios centros de investigación en Países Bajos, publicaron en *Biochimica et Biophysica Acta* (2015) una guía introductoria sobre cómo las células detectan y procesan la información mecánica. Es un texto de biología celular y biofísica, pero tiene mucho que decirle a quien prescribe ejercicio.

### La idea central

Las células no solo responden a señales químicas, como hormonas o factores de crecimiento. También perciben y procesan la información mecánica de su entorno para tomar decisiones sobre cuánto crecer, hacia dónde moverse y en qué tipo de célula convertirse.

Los autores dan algunos ejemplos de por qué esto importa:

- La **rigidez de la matriz** que rodea a las células influye en su función normal, en la diferenciación de las células madre y en el equilibrio de los tejidos.
- Cuando esa rigidez se altera, puede contribuir a enfermedades como la **fibrosis** o el **cáncer**. Un tejido tumoral puede ser hasta 10 veces más rígido que uno sano.
- Las células reciben fuerzas todo el tiempo: el roce del flujo sanguíneo, la respiración y la tensión y compresión de la contracción muscular.

### Los protagonistas

**La matriz extracelular.** Es la red que rodea a las células, formada por fibras como el colágeno y por moléculas que retienen agua. Su organización depende del tejido: en el tendón, las fibras de colágeno son gruesas y alineadas para resistir tensión; en la córnea, son finas y ordenadas para ser transparentes. Bajo fuerza, algunas proteínas de la matriz pueden cambiar de forma y exponer sitios ocultos o liberar factores de crecimiento.

**Las integrinas.** Son proteínas que atraviesan la membrana de la célula y la conectan con la matriz por fuera y con su esqueleto interno por dentro. Algunas de esas uniones se vuelven **más fuertes cuando se tensan**, en vez de soltarse.

**Las adhesiones focales.** Son grupos de proteínas que se forman donde la célula se agarra a la matriz. Una de ellas, la talina, se despliega cuando se estira y expone sitios para que se unan otras proteínas. Funciona como un sensor directo de fuerza.

**El citoesqueleto.** Es el andamiaje interno de la célula, formado por filamentos de actina, microtúbulos y filamentos intermedios. Gracias a la miosina, la célula puede **tirar** de la matriz y, así, "probar" qué tan rígida es.

### De la fuerza a los genes

Las fuerzas se transforman en señales químicas y, finalmente, en cambios en la expresión de genes. Algunas vías importantes:

- **Rho y ROCK:** regulan la contracción y la formación de adhesiones.
- **YAP y TAZ:** cuando la matriz es más rígida o la célula se estira, estas proteínas se trasladan al núcleo y activan programas de crecimiento y diferenciación. En cultivos, las células madre tienden a diferenciarse hacia hueso en superficies rígidas y hacia grasa en superficies blandas.
- **MRTF-A y SRF:** otro camino que conecta los cambios en la actina con la expresión de genes.

### 2D versus 3D

Una parte importante del artículo compara lo que pasa cuando las células crecen sobre una superficie plana (2D) con lo que pasa dentro de una matriz tridimensional (3D), que se parece más a un tejido real. En 3D, el tamaño de los poros, la deformabilidad del núcleo y la forma en que las fibras se endurecen al estirarse cambian cómo la célula se mueve y responde. Las matrices naturales, como el colágeno, se vuelven más rígidas cuando se deforman, lo que permite transmitir fuerzas a distancia.

### El puente hacia la clínica: la mecanoterapia

Karim Khan y Alex Scott, en el *British Journal of Sports Medicine* (2009), tradujeron estas ideas a la práctica. Propusieron llamar **mecanoterapia** al uso del ejercicio para estimular la reparación y remodelación de tendones, músculos, cartílago y hueso a través de la mecanotransducción.

Esto ayuda a entender por qué:

- **La carga progresiva** es la base del tratamiento de las tendinopatías.
- **La inmovilización prolongada** debilita los tejidos, no solo los músculos.
- **El movimiento temprano y controlado** suele favorecer la recuperación después de muchas lesiones.

### Lo que hay que tener presente

Gran parte de lo que describe esta guía viene de estudios en células y en laboratorio. Es una base biológica sólida, pero no se traduce de forma directa en una dosis de ejercicio. Saber que las células del tendón responden a la carga no nos dice cuántas series o qué peso necesita un paciente concreto. Para eso necesitamos estudios clínicos y, sobre todo, la respuesta de cada persona.

### Cómo lo uso

Me sirve para explicar, con palabras simples, por qué el ejercicio no es solo "fortalecer":

"Tus tejidos están hechos de células que sienten la carga. Cuando les das un estímulo adecuado, responden adaptándose y volviéndose más capaces. Cuando no reciben estímulo, se debilitan. Por eso vamos a cargar de a poco, pero de forma constante."

Es una forma de mostrar que la carga, bien dosificada, no es el enemigo del tejido. Es el mensaje que necesita para adaptarse.`,
    references: [
      {
        author: 'Jansen KA, Donato DM, Balcioglu HE, Schmidt T, Danen EHJ, Koenderink GH.',
        year: '2015',
        journal: 'Biochimica et Biophysica Acta',
        doi: '10.1016/j.bbamcr.2015.05.007',
        title: 'A guide to mechanobiology: Where biology and physics meet'
      },
      {
        author: 'Khan KM, Scott A.',
        year: '2009',
        journal: 'British Journal of Sports Medicine',
        doi: '10.1136/bjsm.2008.054239',
        title: 'Mechanotherapy: how physical therapists\' prescription of exercise promotes tissue repair'
      }
    ]
  },
  {
    id: '29',
    slug: 'futuro-gestion-obesidad-desafios-oportunidades-2026',
    title: 'El futuro de la gestión de la obesidad: Desafíos, oportunidades y soluciones',
    subtitle: 'Análisis del consenso internacional de 2026 sobre la redefinición de la obesidad como enfermedad crónica, estratificación de severidad y objetivos individualizados.',
    categoryType: 'tematica',
    categoryValue: 'nutricion',
    categoryLabel: 'Nutrición y composición',
    audience: 'ambos',
    date: '04 de Septiembre, 2026',
    author: 'Alexander Dimitri Miras & Colaboradores (Adaptado por MyoKine)',
    readingTime: 11,
    summary: '¿Cómo debemos definir, estadiar y tratar la obesidad? Un grupo internacional de expertos plantea 5 prioridades para transformar el modelo clínico y superar la visión reductivista del IMC.',
    pullQuote: 'La obesidad es una enfermedad crónica biológica y heterogénea; medir solo el IMC es insuficiente para guiar el tratamiento y definir objetivos de salud reales.',
    content: `La prevalencia global de la obesidad ha aumentado drásticamente en las últimas cuatro décadas. Aunque factores del entorno (disponibilidad de alimentos ultraprocesados, sedentarismo, disrupción del sueño) han impulsado este incremento, la respuesta de cada individuo está fuertemente modulada por la genética y la biología intrínseca (con estimaciones de heredabilidad entre el 45% y el 75%).

Publicado en **Obesity Science & Practice** (2026) por un panel internacional de expertos académicos, clínicos e industriales, este consenso analiza el panorama global y establece 5 prioridades de acción clínica y política.

---

### 1. Definición y Diagnóstico: Superando el Reduccionismo del IMC
El Índice de Masa Corporal (IMC) es una métrica poblacional útil pero clínicamente limitada. La *Lancet Commission on Obesity* y consensos europeos la definen como una **enfermedad crónica sistémica caracterizada por exceso o disfunción del tejido adiposo** que altera la función de órganos y tejidos.
* **Adiposidad Clínica vs. Preclínica:** Se distingue entre la adiposidad con compromiso funcional u orgánico (obesidad clínica) y el estado de exceso de grasa sin disfunción actual pero con riesgo incrementado (obesidad preclínica).
* **Métricas Complementarias:** El uso de la circunferencia de cintura (CC), el índice cintura-estatura (WtHR < 0.5) y la medición directa de adiposidad aportan una evaluación de riesgo cardiometabólico superior a la cifra de peso o IMC aislado.

---

### 2. Estadiamiento de la Severidad de la Enfermedad
Así como en oncología o cardiología, la intensidad del tratamiento debe guiarse por la severidad y disfunción del paciente:
* **Edmonton Obesity Staging System (EOSS):** Clasifica la condición en 5 estadios según el compromiso metabólico, mecánico y psicológico, siendo un predictor independiente de mortalidad superior al IMC.
* **Cardiometabolic Disease Staging (CMDS):** Evalúa el riesgo de progresión a diabetes tipo 2 y enfermedad cardiovascular para priorizar intervenciones.

---

### 3. Objetivos Terapéuticos Individualizados
La meta histórica de lograr un "5% de pérdida de peso" resulta insuficiente para muchas complicaciones asociadas a la adiposidad (como MASH, apnea obstructiva del sueño o enfermedad cardiovascular), las cuales requieren reducciones superiores al 10-15%.
* **Enfoque Centrado en Salud:** El éxito terapéutico debe evaluarse por la mejoría en la calidad de vida, resolución de comorbilidades y función cardiometabólica, más que por una cifra estática en la balanza.
* **Fenotipificación y Biomarcadores:** La integración de herramientas de inteligencia artificial y datos multi-ómicos permitirá predecir qué pacientes responderán a intervenciones nutricionales, farmacológicas (p. ej., agonistas de receptores GLP-1/GIP) o cirugía metabólica.

---

### 4. Las 5 Prioridades de Acción para el Futuro
1. **Colaboración Academia-Salud-Industria:** Fomentar alianzas que prioricen al paciente y la sostenibilidad económica de los sistemas de salud.
2. **Identificación de Biomarcadores Predictivos:** Determinar precozmente la respuesta a tratamientos específicos (especialmente ante intervenciones no reversibles como la cirugía bariátrica).
3. **Metas Terapéuticas Personalizadas:** Definir objetivos según la heterogeneidad de riesgo, multimorbilidad y preferencias del paciente.
4. **Reducción del Sesgo y Estigma de Peso:** Combatir la discriminación contra personas con obesidad en el ámbito clínico, legislativo y social.
5. **Uso de IA y Machine Learning:** Combinar datos de ensayos clínicos y cohortes para acelerar la medicina de precisión.

### Conclusión
Todo lo mencionado acá está respaldado por los papers que se dejan a continuación.
- La gestión de la obesidad exige transitar de un enfoque centrado exclusivamente en el peso a un modelo de salud integral y estadiado.
- El abordaje a largo plazo en atención primaria y el combate activo contra el estigma son pilares esenciales para una atención justa y efectiva.`,
    references: [
      {
        author: 'Miras AD, Kokkinos A, Tahrani A, et al.',
        year: '2026',
        journal: 'Obesity Science & Practice',
        doi: '10.1002/osp4.70127',
        title: 'The Future of the Obesity Management Landscape: Challenges, Opportunities and Solutions'
      }
    ]
  },
  {
    id: '28',
    slug: 'aspetar-rectus-femoris-injury-pathway-2026',
    title: 'La vía de rehabilitación de lesiones del recto femoral de Aspetar',
    subtitle: 'Abordaje clínico para la lesión del recto anterior del cuádriceps: progresión del golpeo de balón, control lumbopélvico y exposición al sprint.',
    categoryType: 'tematica',
    categoryValue: 'retorno-deporte',
    categoryLabel: 'Retorno al deporte (RTS)',
    audience: 'clinico',
    date: '28 de Agosto, 2026',
    author: 'Simon Wallace, Dermot Simpson, Helen McKeever, Rod Whiteley, Enda King (Adaptado por MyoKine)',
    readingTime: 10,
    summary: 'El recto femoral se involucra frecuentemente en acciones de golpeo de balón y aceleración. Analizamos la guía de Aspetar basada en criterios objetivos para la fuerza excéntrica y la progresión del golpeo.',
    pullQuote: 'Debido a su naturaleza biarticular, el entrenamiento del recto femoral requiere ejercicios excéntricos en longitudes musculares específicas.',
    content: `Cuando hablamos de lesiones musculares del muslo, casi siempre pensamos en los isquiotibiales. Pero las lesiones de cuádriceps son frecuentes en deportes donde se patea y se esprinta, y suelen ser más graves que otras lesiones musculares de la pierna. En el fútbol de élite representan cerca del 6% de todas las lesiones, y nueve de cada diez lesiones de cuádriceps son del **recto femoral**.

Además, se repiten: alrededor del 20% se vuelve a lesionar, y más de la mitad de esas recaídas ocurre en los dos primeros meses. Aun así, hay poca evidencia de calidad sobre cómo rehabilitarlas. Parte del problema es que un equipo tiene, en promedio, tres o menos lesiones de recto femoral por temporada, así que es difícil acumular experiencia.

Por eso el equipo de Aspetar, que recibe muchos atletas de élite al año, propuso un camino de rehabilitación específico. Lo publicaron Simon Wallace, Dermot Simpson, Helen McKeever, Rod Whiteley y Enda King en *JOSPT Open* (2026), junto con su versión para isquiotibiales.

[[figura:recto-femoral-cifras]]

### Qué hicieron

Clínicos con experiencia diseñaron el camino con un marco de implementación (*Knowledge-to-Action*) y lo enviaron a 32 profesionales que asistieron al taller previo a la conferencia de Aspetar 2024. Respondieron 27. Cada sección se evaluó con una escala de acuerdo de 5 puntos, y se definió de antemano que un 75% o más significaba acuerdo alto.

El camino tiene ocho secciones: evaluación, hitos, fuerza, control motor, explosividad y fuerza reactiva, carrera, pateo y planificación semanal.

### Resultados

- Acuerdo general: **89%**. Desacuerdo: 2%.
- Carrera tuvo el mayor acuerdo (94%).
- Fuerza tuvo el menor desacuerdo (0%).
- La planificación semanal fue la única sección que no alcanzó el umbral (67%).
- Explosividad y fuerza reactiva tuvo el mayor desacuerdo (6%).

### Lo que propone el camino

**Evaluar antes de empezar.** Una frase clínica del artículo lo dice bien: antes de iniciar la rehabilitación, define y mide las variables que vas a usar para decidir cada transición y la vuelta al juego. Si no lo haces, puedes retrasar la vuelta y aumentar el riesgo de recaída. Igual que en isquiotibiales, hay preguntas con valor pronóstico: dolor al lesionarse, días hasta caminar sin dolor y cuánto cree el atleta que va a tardar. También importa su carga previa de entrenamiento y partidos.

**Avanzar por hitos.** Cada fase termina con criterios claros que combinan pruebas de varios componentes. Los autores proponen que esto mejora los resultados, la comunicación y la adherencia, porque el atleta tiene metas cortas y concretas. Reconocen que muchos umbrales se basan en la experiencia del grupo, porque falta evidencia de alto nivel.

**Fuerza en las dos funciones del músculo.** El recto femoral cruza la cadera y la rodilla, así que el programa usa cuatro líneas de ejercicios: flexión de cadera y extensión de rodilla, cada una en posición corta y larga. Se prioriza la sobrecarga excéntrica y el trabajo en posición alargada, por su efecto en el crecimiento muscular, en la longitud de los fascículos y en estructuras como el tendón y la aponeurosis.

Dos detalles prácticos que me gustaron:

- Ajustar el ejercicio para que realmente cargue el recto femoral. Por ejemplo, reclinar el tronco a unos 40° de flexión de cadera en la extensión de rodilla.
- Preguntar "¿dónde lo sientes?" para individualizar la posición y evitar que otros músculos hagan el trabajo.

**Carrera como habilidad.** La carrera se introduce temprano para mantener una carga crónica alta y evitar aumentos bruscos más adelante. Las velocidades altas y las aceleraciones intensas se reservan para fases tardías, porque exigen mucho al muslo. La técnica se trabaja en varias líneas (despegue, apoyo medio, control rotacional, aceleración, desaceleración y cambios de dirección), con énfasis en la calidad y en la variabilidad para aprender. Al final, el atleta se expone a los momentos más intensos de un partido, que suelen preceder a las lesiones musculares.

**Pateo progresivo.** Patear es el principal mecanismo de lesión del recto femoral: explica más de la mitad de las lesiones y cerca del 70% de las recaídas. El camino lo reintroduce temprano y aumenta de forma gradual la intensidad, el volumen y el "caos" (situaciones menos predecibles). Al inicio se reduce la exigencia cambiando la presión o el tipo de balón. Los autores sugieren medir la demanda del pateo por velocidad y no solo por distancia, porque la distancia subestima cuántos pateos son realmente exigentes.

### La planificación semanal, el punto débil

Que la semana tipo haya tenido solo un 67% de acuerdo tiene sentido. Cada deporte, club y atleta tiene restricciones distintas: calendario, viajes, cantidad de personal, otras sesiones. Una plantilla semanal fija choca con esa realidad.

### Límites

Los propios autores lo dicen con claridad:

- El acuerdo entre expertos no demuestra que el camino funcione.
- No se midieron resultados clínicos como tiempo de vuelta o recaídas.
- El camino se desarrolló y evaluó en la misma institución, lo que puede introducir sesgo.

### Qué me llevo

El recto femoral no es "un cuádriceps más". Es biarticular, se lesiona sobre todo pateando y esprintando, y recae pronto. Rehabilitarlo bien implica cargarlo en sus dos funciones, en posiciones largas, con alta intención, y devolverle progresivamente el gesto que lo lesionó. Si trabajas con futbolistas, la progresión del pateo merece tanta planificación como la de la carrera.`,
    references: [
      {
        author: 'Wallace S, Simpson D, McKeever H, Whiteley R, King E.',
        year: '2026',
        journal: 'JOSPT Open',
        doi: '10.2519/josptopen.2026.0212',
        title: 'The Aspetar Rectus Femoris Injury Rehabilitation Pathway'
      }
    ]
  },
  {
    id: '27',
    slug: 'aspetar-hamstring-injury-pathway-2026',
    title: 'La vía de rehabilitación de lesiones de isquiotibiales de Aspetar',
    subtitle: 'Análisis del modelo basado en hitos clínicos, fuerza excéntrica, control lumbopélvico y recondicionamiento de carrera.',
    categoryType: 'tematica',
    categoryValue: 'retorno-deporte',
    categoryLabel: 'Retorno al deporte (RTS)',
    audience: 'clinico',
    date: '22 de Agosto, 2026',
    author: 'Dermot Simpson, Simon Wallace, Enda King, Helen McKeever, Rod Whiteley (Adaptado por MyoKine)',
    readingTime: 11,
    summary: 'Las lesiones de isquiotibiales presentan tasas de recurrencia relevantes en deportes de campo. Analizamos el protocolo multifactorial basado en criterios de Aspetar para el retorno seguro al deporte.',
    pullQuote: 'El retorno al deporte tras una lesión de isquiotibiales debe guiarse por el cumplimiento de hitos clínicos y de rendimiento neuromuscular.',
    content: `Las lesiones de isquiotibiales son de las más frecuentes en los deportes de campo, y tienen un problema que todos los que trabajamos en deporte conocemos: vuelven. En el deporte de élite, hasta uno de cada cuatro atletas se vuelve a lesionar dentro del primer año, muchas veces en los primeros dos meses después de volver a jugar. Quien ya tuvo una lesión de isquiotibiales tiene un riesgo 3,6 veces mayor de tener otra.

En veinte años de investigación hemos aprendido mucho, pero las cifras de recaída casi no han bajado. El equipo de rehabilitación de Aspetar, en Doha, propuso una respuesta: un camino de rehabilitación por criterios que reúne lo que ya sabemos en una sola estructura. Lo publicaron Dermot Simpson, Simon Wallace, Enda King, Helen McKeever y Rod Whiteley en *JOSPT Open* (2026).

### Qué hicieron

Un grupo de clínicos senior de Aspetar diseñó el camino usando un marco de implementación llamado *Knowledge-to-Action*, que consiste en desarrollar, aplicar en la práctica real y ajustar. Luego lo enviaron a 32 profesionales que trabajan en deporte de élite, antes de un taller en la conferencia internacional de Aspetar 2024. Respondieron 24 (75%), en su mayoría de fútbol y fútbol australiano, y casi todos con magíster o doctorado.

Cada sección se evaluó con una escala de acuerdo de 5 puntos. El acuerdo general fue del 92%, y el desacuerdo, del 1%.

Es importante entender bien qué mide esto: **no es un ensayo clínico**. Muestra que profesionales con experiencia consideran el camino razonable y aplicable, no que reduzca las recaídas.

### Las seis fases

El camino se divide en seis fases, y para avanzar de una a otra hay que cumplir criterios, no esperar una cantidad de días:

1. **Foundation** (base)
2. **Reload** (recarga)
3. **Accumulation** (acumulación)
4. **Transition** (transición)
5. **Simulation** (simulación)
6. **Resilience** (resiliencia)

Cada fase tiene requisitos mínimos de dolor, rango de movimiento, fuerza, carrera y rendimiento. Progresar por criterios se ha asociado a menos recaídas que progresar por tiempo, y además mejora la comunicación entre el equipo y el atleta.

[[figura:aspetar-isquios-fases]]

### Lo que me parece más valioso

**Una evaluación completa desde el inicio.** Preguntas simples tienen valor pronóstico: cuántos días tardó en caminar sin dolor, cuánto le dolió al lesionarse y cuánto cree el propio atleta que va a tardar en volver. También importa saber su historial de cargas de entrenamiento y su velocidad máxima. Una de sus frases clínicas lo resume bien: lo que no encuentras al principio suele aparecer después.

**La resonancia no decide el alta.** Las clasificaciones por imagen describen la estructura lesionada, pero predicen mal los tiempos de vuelta. Hay mucha superposición entre lesiones con y sin compromiso del tendón intramuscular. Pedir resonancias seriadas puede aumentar la ansiedad del jugador y retrasar su vuelta sin mejorar los resultados. La decisión se apoya en criterios clínicos y de rendimiento.

**Fuerza de cadera y de rodilla.** Los isquiotibiales cruzan dos articulaciones, así que el programa combina ejercicios dominantes de cadera y de rodilla, y suma glúteo mayor y aductor mayor. Se agregó una prueba de fuerza de extensión de cadera porque la debilidad isométrica en ese gesto se ha relacionado con lesiones. El nórdico no se usa para decidir la progresión, porque al ser bilateral puede esconder déficits de un lado.

**Excéntricos en posición alargada.** El trabajo excéntrico con el músculo largo (por ejemplo, con la cadera flectada) favorece el aumento de la longitud de los fascículos, que se asocia a menos recaídas. Y un detalle práctico: si el atleta no siente el ejercicio en el músculo que buscas, revisa técnica, selección, carga y si realmente estás llegando a la zona.

**Estiramiento temprano.** Introducir antes los ejercicios de elongación de isquiotibiales se ha asociado a una vuelta más rápida.

**Correr temprano y prepararse para lo peor.** El camino propone empezar a correr pronto para construir carga crónica, y avanzar de forma gradual. Tanto los picos bruscos de carrera como la falta de carga se relacionan con más lesiones. Más adelante, el atleta se expone a sus "peores escenarios": los 1, 3 o 5 minutos más intensos de un partido, calculados con datos GPS de sus propios partidos. Además, se trabaja la técnica de carrera en seis líneas: despegue, apoyo medio, antirrotación, aceleración, desaceleración y cambios de dirección.

**Explosividad y fuerza reactiva.** Muchas lesiones ocurren al final del balanceo durante el sprint, cuando el músculo tiene que absorber fuerza muy rápido y luego devolverla. Por eso se entrena la capacidad de producir y absorber fuerza rápidamente, desde la fase de acumulación.

### La parte con menos acuerdo

La "semana Aspetar", que organiza cuántas sesiones de cada tipo hacer, tuvo el acuerdo más bajo (85%), sobre todo en la frecuencia de las sesiones. Los participantes explicaron que depende mucho de cada atleta y de lo que el club puede ofrecer. Un comentario lo dice claro: algunos jugadores necesitan seis sesiones de cardio sin impacto y otros tres; algunos toleran fuerza todos los días y otros necesitan periodizar.

### Límites

- Es una encuesta de acuerdo, no un estudio de resultados. No hay datos de recaídas ni de tiempos de vuelta.
- Muchos participantes venían del fútbol australiano, que tiene demandas de carrera particulares.
- Un 25% de los invitados no respondió, lo que puede sesgar los resultados.
- Fue una sola ronda de encuesta, no un Delphi con varias rondas.

Los autores insisten en que el camino debe apoyar el razonamiento clínico, no reemplazarlo.

### Qué me llevo

Aunque no trabajes en élite, la lógica sirve: evaluar bien al inicio, avanzar por criterios y no por calendario, cargar el músculo en posición alargada, correr desde temprano y preparar al atleta para lo que realmente le va a pedir su deporte. La recaída suele aparecer cuando el atleta vuelve a jugar preparado para entrenar, pero no para competir.`,
    references: [
      {
        author: 'Simpson D, Wallace S, King E, McKeever H, Whiteley R.',
        year: '2026',
        journal: 'JOSPT Open',
        doi: '10.2519/josptopen.2026.0213',
        title: 'The Aspetar Hamstring Injury Rehabilitation Pathway'
      }
    ]
  },
  {
    id: '26',
    slug: 'cambios-control-motor-dolor-lumbar-2019',
    title: 'Cambios de control motor en dolor lumbar: Fenotipos y presentaciones',
    subtitle: 'Análisis del modelo de Jaap van Dieën, Peter Reeves, Greg Kawchuk, Linda van Dillen y Paul Hodges sobre los fenotipos de control motor.',
    categoryType: 'segmento',
    categoryValue: 'columna-lumbar',
    categoryLabel: 'Columna lumbar',
    audience: 'clinico',
    date: '16 de Agosto, 2026',
    author: 'Jaap H. van Dieën, N. Peter Reeves, Greg Kawchuk, Linda R. van Dillen, Paul W. Hodges (Adaptado por MyoKine)',
    readingTime: 10,
    summary: '¿Cómo varían los patrones de movimiento en personas con dolor lumbar? Analizamos el modelo que identifica respuestas mecánicas de control rígido vs. control laxo.',
    pullQuote: 'Reconocer las diferencias individuales en el control motor ayuda a personalizar la selección de ejercicios en personas con dolor lumbar.',
    content: `Si observas a varias personas con dolor lumbar moverse, vas a notar algo curioso. Algunas se mueven como un bloque: tronco rígido, músculos tensos, todo muy controlado. Otras parecen moverse con menos control, con más oscilación y respuestas más lentas. Ambas tienen dolor lumbar. ¿Tiene sentido darles el mismo ejercicio?

Esa es la pregunta de fondo del artículo de Jaap van Dieën, Peter Reeves, Greg Kawchuk, Linda van Dillen y Paul Hodges publicado en *JOSPT* (2019). Es un comentario clínico que revisa décadas de estudios sobre control motor del tronco y propone una forma de ordenar resultados que, a primera vista, parecían contradecirse.

### El problema que intentan resolver

Durante años, los estudios sobre control motor en dolor lumbar mostraron resultados opuestos. Algunos encontraban **más** actividad muscular en personas con dolor; otros encontraban **menos**. Algunos describían movimientos más rígidos; otros, más variables.

La conclusión fácil habría sido "los estudios no se ponen de acuerdo". Los autores proponen otra lectura: quizá no hay un solo patrón, sino un espectro, y distintas personas se ubican en distintos puntos de ese espectro.

### Cómo controlamos el tronco

Para entender la propuesta conviene recordar algo básico. El tronco recibe perturbaciones todo el tiempo: el propio "ruido" del sistema nervioso, la respiración, el impacto de cada paso al caminar. El sistema nervioso las maneja de tres formas:

- **Rigidez de base:** actividad muscular sostenida que vuelve el tronco más rígido.
- **Control anticipatorio:** activar músculos antes de una perturbación esperada, como al levantar un brazo.
- **Control por retroalimentación:** corregir en base a la información de la propiocepción, la vista, el tacto y el sistema vestibular.

El sistema tiene mucha flexibilidad para elegir qué músculos y articulaciones usar en cada tarea. Por eso no hay una única forma "correcta" de moverse.

### Los dos extremos del espectro

Los autores describen, de forma tentativa, dos fenotipos en los extremos:

**Control rígido (tight control).** Mayor excitabilidad, más coactivación de los músculos del tronco y menos movimiento.

- *Ventaja a corto plazo:* evita movimientos grandes y no controlados que podrían someter a los tejidos a mucha deformación.
- *Costo posible:* más compresión sobre la columna por la contracción muscular sostenida, más fatiga y menos variabilidad.

**Control laxo (loose control).** Menor excitabilidad, respuestas musculares atenuadas y más movimiento del tronco.

- *Ventaja a corto plazo:* evita fuerzas musculares altas y la compresión que generan.
- *Costo posible:* más tensión sobre los tejidos por movimientos excesivos o mal controlados.

En ambos casos hay una carga anormal sobre los tejidos de la espalda, pero por mecanismos distintos. Y en ambos queda abierta la pregunta de si la ventaja de corto plazo compensa el costo de largo plazo. Probablemente depende de la persona, de las tareas que hace y del estado de sus tejidos.

[[figura:control-motor-espectro]]

### Por qué aparece cada patrón

Los autores plantean dos posibles orígenes, que pueden coexistir:

1. **Adaptación protectora:** el sistema nervioso cambia la estrategia para proteger la zona.
2. **Interferencia directa:** el dolor y los cambios asociados alteran el control motor sin que eso sea "útil".

Hay un detalle clave. Factores no específicos como el **miedo** pueden producir cambios en el control motor muy parecidos a los que produce el dolor. Y si el miedo no está justificado, esa adaptación no protege nada: solo agrega carga y rigidez sin beneficio. Esto conecta el control motor con las creencias del paciente, y es un puente directo entre la biomecánica y la educación.

### Qué cambia en la evaluación y el tratamiento

Si existen estos fenotipos, los objetivos del ejercicio podrían ser **distintos e incluso opuestos** según la persona.

**Para alguien con control rígido**, tendría sentido:

- Reducir la coactivación innecesaria y la protección excesiva.
- Recuperar movimiento y variabilidad.
- Trabajar la confianza en moverse (relajar, exponer gradualmente a movimientos evitados).

**Para alguien con control laxo**, tendría sentido:

- Mejorar el control y la respuesta muscular del tronco.
- Progresar en fuerza y resistencia.
- Entrenar tareas que exijan coordinación ante perturbaciones.

Imagina dos pacientes con dolor al agacharse. Uno se agacha sin flectar nada la columna, con la respiración contenida y todo apretado. El otro flecta de golpe, sin control, y le cuesta volver. Un programa genérico de "estabilización del core" podría ayudar al segundo, pero empeorar la rigidez del primero.

### Las precauciones de los propios autores

Esto es importante y los autores lo dicen claramente: su interpretación **requiere validación** y no puede traducirse directamente en guías clínicas. Es un marco para la investigación y el razonamiento clínico, no una receta.

Además, los fenotipos son extremos de un espectro. La mayoría de las personas estará en algún punto intermedio, y una misma persona puede comportarse distinto según la tarea. Todavía no sabemos si elegir el ejercicio según el fenotipo da mejores resultados que un buen programa general.

### Cómo lo uso en la práctica

No etiqueto a nadie como "rígido" o "laxo" en la primera sesión. Lo que sí hago es mirar cómo se mueve la persona en tareas que le importan: agacharse, levantar algo, girar, sentarse y pararse. Me pregunto si su estrategia parece protegerla o si le está costando más de lo que le da. Y converso sobre lo que teme, porque muchas veces el patrón rígido se explica mejor por el miedo que por la columna.

El mensaje que me llevo es simple: no todas las personas con dolor lumbar necesitan lo mismo. A veces el trabajo es dar más control; otras veces, soltar.`,
    references: [
      {
        author: 'van Dieën JH, Reeves NP, Kawchuk G, van Dillen LR, Hodges PW.',
        year: '2019',
        journal: 'Journal of Orthopaedic & Sports Physical Therapy',
        doi: '10.2519/jospt.2019.7917',
        title: 'Motor Control Changes in Low Back Pain: Divergence in Presentations and Mechanisms'
      }
    ]
  },
  {
    id: '25',
    slug: 'cambios-estructurales-funcionales-musculos-espalda-2019',
    title: 'Cambios estructurales y funcionales de los músculos lumbares en dolor de espalda: Diferentes estadios y mecanismos',
    subtitle: 'Análisis del modelo temporal de Paul Hodges y Lieven Danneels sobre las adaptaciones del multífido lumbar.',
    categoryType: 'segmento',
    categoryValue: 'columna-lumbar',
    categoryLabel: 'Columna lumbar',
    audience: 'clinico',
    date: '10 de Agosto, 2026',
    author: 'Paul W. Hodges & Lieven Danneels (Adaptado por MyoKine)',
    readingTime: 11,
    summary: '¿Cómo se adaptan los músculos de la espalda durante el dolor lumbar? Hodges y Danneels revisan los cambios desde la inhibición refleja en fases iniciales hasta adaptaciones tisulares en fases persistentes.',
    pullQuote: 'En la fase inicial predomina la inhibición refleja del multífido profundo, mientras que en estadios prolongados ocurren cambios estructurales que requieren fortalecimiento progresivo.',
    content: `Es común escuchar que las personas con dolor lumbar tienen "el multífido atrofiado" o "infiltrado de grasa". Y es verdad que muchos estudios lo han encontrado. Pero si uno revisa la literatura con calma, aparece un problema: los resultados no son uniformes. Algunos estudios encuentran atrofia, otros no. Algunos ven menos activación, otros ven más.

Paul Hodges y Lieven Danneels, en un comentario clínico publicado en *JOSPT* (2019), proponen una explicación que ordena gran parte de esa confusión: **los cambios en los músculos de la espalda dependen del tiempo**. Lo que pasa en la primera semana no es lo mismo que pasa a los seis meses, y tampoco se explica por el mismo mecanismo.

### Por qué importan estos músculos

La salud de la columna depende en parte de que sus músculos funcionen bien, y eso depende de su estructura y de cómo se activan. El multífido, en particular, tiene fibras profundas que cruzan pocos segmentos y fibras más superficiales que actúan más como extensoras. Las fibras profundas parecen tener un rol fino en el control de cada segmento.

Cuando hablamos de "cambios" en el multífido, nos referimos a tres cosas: tamaño (atrofia), calidad del tejido (grasa y tejido conectivo) y patrón de activación.

### Un modelo en tres fases

A partir de estudios en humanos y de modelos animales con lesión del disco intervertebral, los autores proponen esta secuencia:

**1. Fase aguda: inhibición y regeneración (primeros días a semanas)**

- Inhibición refleja del multífido.
- Reducción rápida del área muscular, del lado y el nivel del dolor. Se observa en personas durante un episodio agudo unilateral y aparece a los pocos días en modelos animales.
- Activación temprana de tejido adiposo.

Esta reducción es tan rápida que no puede explicarse por desuso. Responde más bien a mecanismos reflejos y vasculares.

**2. Fase subaguda y crónica temprana: inflamación (semanas a meses)**

- Aumento de citoquinas proinflamatorias en el músculo.
- Cambio de fibras lentas (tipo I) a fibras rápidas (tipo II).
- Inicio de fibrosis e infiltración de grasa.

**3. Fase crónica: desuso y desacondicionamiento (meses a años)**

- Atrofia de las fibras musculares.
- Más fibrosis y más grasa.

En esta etapa los cambios se han explicado por desuso: cambios en la forma de moverse que "protegen" al multífido de la carga, evitación por dolor o miedo, y desacondicionamiento general.

Un dato interesante: en personas en remisión, el área muscular parece recuperarse con el tiempo desde el último episodio, pero la grasa intramuscular era mayor y se relacionaba con la frecuencia de los episodios. Es decir, el tamaño puede volver, pero la calidad del tejido no siempre.

[[figura:multifido-fases]]

### Los cambios en la activación

En los episodios agudos, la activación de las fibras profundas del multífido tiende a disminuir. En personas con dolor recurrente o crónico, el patrón se vuelve más sistemático: el multífido profundo se activa menos y empieza a funcionar más como extensor que como regulador fino, mientras que los músculos más superficiales (como el erector espinal) suelen activarse **más**.

Esto se relaciona con lo que otros autores describen como estrategias de protección: más tensión superficial, menos control fino.

### Qué implica para la rehabilitación

Si el mecanismo cambia con el tiempo, el tratamiento también debería cambiar. Los autores proponen:

- **En la fase aguda:** entrenamiento de control motor para contrarrestar la inhibición y restaurar el patrón de activación.
- **En la fase subaguda:** ejercicio que favorezca un efecto antiinflamatorio y la transición de fibras rápidas a lentas.
- **En la fase crónica:** primero recuperar la activación si está alterada, y luego **entrenamiento de fuerza y resistencia** con sobrecarga progresiva para recuperar el tamaño muscular y reducir la grasa y el tejido conectivo.

Este último punto es importante. Un estudio del grupo de Danneels mostró que el entrenamiento de control motor a baja carga **no fue suficiente** para recuperar el área del multífido. Se necesitó agregar sobrecarga progresiva para lograr hipertrofia y reducir dolor y discapacidad. Y como hay menos fibras tipo I, también hace falta trabajo de resistencia.

### ¿Y el debate entre ejercicio específico y general?

Los autores lo abordan con honestidad. Las revisiones sistemáticas muestran que el control motor funciona en el dolor lumbar crónico, pero **no mejor que el ejercicio general**. Ellos proponen algunas razones:

- Los estudios suelen aplicar el control motor a grupos con dolor lumbar inespecífico, sin individualizar.
- La variación entre personas es grande, y no todas tienen las mismas alteraciones musculares.
- El control motor no es para todos. En personas cuyo dolor se mantiene sobre todo por sensibilización central, probablemente no sea la prioridad.

Y agregan algo que me parece central: en algunas personas, los factores psicosociales serán el blanco principal del tratamiento, y pueden interactuar con los cambios musculares. El peso relativo de cada abordaje depende de la persona.

### Cómo lo traduzco a la consulta

Primero, el tiempo de evolución importa. No es lo mismo un dolor de cinco días que uno de un año, aunque la persona lo describa igual.

Segundo, si alguien lleva meses con dolor, el ejercicio suave de activación probablemente no alcance. Hay que llegar a cargar: fuerza y resistencia de los extensores, con progresión real.

Tercero, no hace falta una resonancia para tomar estas decisiones. La evaluación de cómo se mueve la persona, qué evita y cómo responde a la carga entrega mucha información.

### Límites

Gran parte del modelo se apoya en estudios animales y en estudios transversales en humanos, que no permiten establecer causa. Los propios autores piden estudios longitudinales para confirmar los mecanismos de la fase crónica. Es un modelo plausible y útil para razonar, no una certeza.`,
    references: [
      {
        author: 'Hodges PW, Danneels L.',
        year: '2019',
        journal: 'Journal of Orthopaedic & Sports Physical Therapy',
        doi: '10.2519/jospt.2019.8827',
        title: 'Changes in Structure and Function of the Back Muscles in Low Back Pain: Different Time Points, Observations, and Mechanisms'
      }
    ]
  },
  {
    id: '24',
    slug: 'revision-dolor-lumbar-jama-2026',
    title: 'Dolor Lumbar Inespecífico: Revisión de la evidencia en JAMA',
    subtitle: 'Análisis de la evidencia sobre el dolor lumbar inespecífico: indicaciones de imágenes diagnósticas e intervenciones de primera línea.',
    categoryType: 'tematica',
    categoryValue: 'evidencia-dolor',
    categoryLabel: '¿Qué dice la evidencia sobre mi dolor?',
    audience: 'ambos',
    date: '04 de Agosto, 2026',
    author: 'Aidan G. Cashin, Roger Chou, Melissa B. Weimer, James H. McAuley (Adaptado por MyoKine)',
    readingTime: 12,
    summary: 'El dolor lumbar es la principal causa de discapacidad en el mundo. Esta revisión en JAMA analiza el manejo del dolor lumbar inespecífico y las pautas de tratamiento recomendadas.',
    pullQuote: 'Aproximadamente el 90% de los pacientes con dolor lumbar tienen dolor inespecífico. Los hallazgos en imágenes son comunes en personas sin dolor y reflejan cambios asociados a la edad.',
    content: `El dolor lumbar es la principal causa de años vividos con discapacidad en el mundo. Afecta a unos 619 millones de personas. Casi todos lo vamos a tener alguna vez, y muchos lo vamos a tener más de una vez.

Aun así, sigue siendo un tema lleno de mitos: que hay que hacer reposo, que la resonancia dice qué tienes, que el disco "se salió", que hay que fortalecer el core para que no vuelva. La revisión de Aidan Cashin, Roger Chou, Melissa Weimer y James McAuley en *JAMA* (2026) ordena lo que hoy sabemos. Aquí va un panorama completo, pensado tanto para pacientes como para clínicos.

### Qué es y cómo se clasifica

La revisión define el dolor lumbar como el dolor ubicado entre el borde inferior de las costillas y el pliegue de los glúteos, con o sin dolor en la pierna.

Cerca del 90% de las personas que consultan tienen **dolor lumbar inespecífico**: no se asocia a una condición puntual como radiculopatía, estenosis, fractura, espondiloartritis axial, infección o cáncer. Según su duración:

- **Agudo:** menos de 6 semanas.
- **Subagudo:** entre 6 y 12 semanas.
- **Crónico:** más de 12 semanas.

La prevalencia es mayor en mujeres (9.330 por 100.000 frente a 5.520 por 100.000 en hombres) y aumenta con la edad.

### Factores de riesgo

La revisión menciona obesidad, síntomas depresivos, exposiciones laborales como levantar peso con frecuencia, tabaquismo, enfermedades crónicas como la diabetes y, el más potente, haber tenido dolor lumbar antes.

Fíjate que en la lista aparecen factores biológicos, psicológicos y de estilo de vida. El dolor lumbar no depende de una sola estructura.

### Cómo evoluciona

Esta es probablemente la parte más importante para contarle a un paciente.

- En el dolor **agudo**, cerca del **72% se recupera dentro de 12 meses**. En una revisión de 60 cohortes con casi 18.000 personas, el dolor promedio bajó de 56 a 26 puntos (sobre 100) en solo seis semanas.
- En el **subagudo** también hay una mejoría importante: de 63 a 29 puntos en seis semanas.
- En el **crónico** el pronóstico es menos favorable: el dolor promedio cambió poco en seis semanas (de 56 a 48), aunque igual un **42% se recupera en 12 meses**.

Dicho de otra forma: el cuerpo suele resolver bien el dolor agudo. Nuestro trabajo es no estorbar ese proceso y detectar a quienes tienen más riesgo de que se haga persistente.

[[figura:lumbar-pronostico]]

### La evaluación

La primera tarea es descartar lo poco frecuente pero importante. Las señales de alerta incluyen antecedente de cáncer, fiebre, trauma importante, déficit neurológico que progresa y cambios nuevos en vejiga o intestino. El síndrome de cauda equina es raro (alrededor del 0,1% en atención primaria), pero exige resonancia inmediata y derivación urgente.

La revisión también recuerda que pocas banderas rojas sirven por sí solas; la combinación de varias es lo que debería aumentar la sospecha.

Para estimar el riesgo de que el dolor se vuelva persistente existen herramientas como el **STarT Back Tool** (5 ítems que clasifican el riesgo psicosocial en bajo, medio o alto) y el **cuestionario Örebro**. No son perfectas, pero ayudan a decidir cuánta intervención necesita cada persona. Quien tiene bajo riesgo suele necesitar poco más que buena información; quien tiene alto riesgo se beneficia de un abordaje más intensivo.

**Imágenes:** no se recomiendan de rutina. Los cambios degenerativos son casi igual de frecuentes en personas con y sin dolor (77,8% frente a 74,4% en un estudio de 3.369 adultos). Se reservan para déficit neurológico grave o progresivo, sospecha de condición seria o candidatos a cirugía.

### El tratamiento

**Para todos, sin importar la duración:**

- Explicar que es poco probable una enfermedad seria.
- Conversar sobre cuánto suele tardar la recuperación.
- Mantenerse activo, seguir con las actividades y el trabajo, evitar el reposo prolongado.
- Automanejo: calor local y dosificar la actividad (mantenerla o subirla de a poco).

**Dolor agudo, primera línea:**

- Calor local.
- Manipulación espinal, masaje o acupuntura, con beneficios pequeños y de corto plazo.
- Antiinflamatorios o relajantes musculares si hacen falta, por poco tiempo.

Un dato que llama la atención: el ejercicio estructurado o supervisado **no se recomienda de rutina en el agudo**, porque su efecto ahí es limitado. En esa etapa, mantenerse activo en la vida diaria pesa más que un programa formal.

**Dolor crónico, primera línea:**

- **Ejercicio**, de cualquier tipo. Ninguna modalidad ha mostrado ser superior a otra, así que conviene elegir la que la persona disfrute, pueda costear y tenga a mano. La revisión sugiere una dosis acumulada de al menos 20 horas en 8 a 12 semanas.
- **Terapias psicológicas** como la terapia cognitivo-conductual. Incluso una sola sesión de dos horas con educación en dolor, mindfulness y habilidades de manejo fue similar a un programa de ocho sesiones a los tres meses.
- **Enfoques que integran ejercicio y psicología**, como la terapia cognitivo funcional (educación individual, exposición gradual al movimiento y cambios de estilo de vida), que redujo dolor y discapacidad hasta un año.
- **Rehabilitación multidisciplinaria** para quienes tienen mucha discapacidad o no mejoran.
- Manipulación y acupuntura como complementos.

Los antiinflamatorios quedan en segunda línea. El paracetamol, los corticoides, los relajantes musculares y los antiepilépticos no se recomiendan en el crónico.

### Qué me llevo como kinesiólogo

Lo primero es la importancia de las palabras. Gran parte del tratamiento de primera línea es conversación: tranquilizar, explicar, ajustar expectativas. Eso no es "solo hablar"; es intervención.

Lo segundo es que el ejercicio en el dolor crónico no necesita ser perfecto ni específico. Necesita ser suficiente y sostenido. La mejor rutina es la que la persona va a hacer.

Lo tercero es que el dolor lumbar persistente casi nunca se explica solo por la columna. Sueño, ánimo, miedo, trabajo y creencias forman parte del cuadro, y el tratamiento funciona mejor cuando los toma en cuenta.

### Límites

Es una revisión narrativa que integra guías y metaanálisis. Muchos efectos de los tratamientos son pequeños, y las guías no coinciden en todos los puntos (por ejemplo, en el uso de opioides). Pero el mensaje central es sólido y consistente: buena información, mantenerse activo y ejercicio sostenido, con menos imágenes y menos fármacos.`,
    references: [
      {
        author: 'Cashin AG, Chou R, Weimer MB, McAuley JH.',
        year: '2026',
        journal: 'JAMA',
        doi: '10.1001/jama.2026.9631',
        title: 'Low Back Pain: A Review'
      }
    ]
  },
  {
    id: '23',
    slug: 'conceptos-actuales-ejercicio-pliometrico-2015',
    title: 'Conceptos actuales de ejercicio pliométrico: Del laboratorio a la clínica',
    subtitle: 'Las fases del ciclo estiramiento-acortamiento, sus bases neurofisiológicas y cómo progresar la carga en rehabilitación deportiva.',
    categoryType: 'tematica',
    categoryValue: 'ciencias-deporte',
    categoryLabel: 'Ciencias del deporte',
    audience: 'clinico',
    date: '29 de Julio, 2026',
    author: 'George Davies, Bryan L. Riemann, Robert Manske (Adaptado por MyoKine)',
    readingTime: 10,
    summary: '¿Cuál es la base neurofisiológica y mecánica de la pliometría? Analizamos las fases de estiramiento excéntrico, amortiguación y contracción concéntrica, junto con el algoritmo sistemático de preparación y progresión clínica.',
    pullQuote: 'La fase de amortiguación o "tiempo de rebote" es el secreto de la pliometría: si la transición excede el delay neurofisiológico, la energía elástica se disipa como calor, anulando el reflejo miotático.',
    content: `El ejercicio pliométrico se ha convertido en un componente integral de las fases avanzadas y finales de la rehabilitación de lesiones musculoesqueléticas deportivas. A medida que el paciente se aproxima al retorno a la actividad (RTS), la pliometría ofrece el puente indispensable entre el entrenamiento de fuerza tradicional y las demandas balísticas, rápidas y multidireccionales del deporte. 

Este artículo de revisión clínica resume la base fisiológica, biomecánica y neurofisiológica de los movimientos pliométricos, junto con criterios objetivos basados en evidencia para guiar su progresión y evitar lesiones por sobreuso.

---

### 1. Las Tres Fases del Ciclo Estiramiento-Acortamiento (SSC)

La pliometría se fundamenta en el **Ciclo Estiramiento-Acortamiento (SSC)**, un fenómeno neuro-mecánico donde una contracción muscular excéntrica (alargamiento activo) es seguida inmediatamente por una contracción concéntrica (acortamiento activo). Este ciclo consta de tres fases bien diferenciadas:

1. **Fase Excéntrica (Pre-estiramiento):** El grupo músculo-tendinoso experimenta un estiramiento rápido que estimula los husos musculares y almacena energía elástica potencial en las estructuras no contráctiles del músculo (Componente Elástico en Serie, **SEC**, y Componente Elástico en Paralelo, **PEC**). Tres variables determinan la magnitud de la energía acumulada: la velocidad del estiramiento, el rango o amplitud del estiramiento y la fuerza aplicada.
2. **Fase de Amortiguación (Tiempo de Rebote):** Es el intervalo que transcurre desde la finalización de la contracción excéntrica hasta el inicio de la concéntrica. También se conoce como *retardo electromecánico*. **Esta fase es la clave del rendimiento pliométrico.** Cuanto más corta sea la fase de amortiguación, más eficiente y potente será el movimiento posterior. Si este tiempo se prolonga, la energía elástica almacenada se disipa en forma de calor y el reflejo de estiramiento (miotático) se inhibe.
3. **Fase Concéntrica (Acortamiento):** Es la fase de liberación de la fuerza acumulada. La energía elástica almacenada en el SEC se libera de forma de rebote elástico, sumándose a la fuerza contráctil concéntrica facilitada por la descarga refleja motora del huso muscular.

---

### 2. Bases Fisiológicas y Reclutamiento de Fibras Rápidas

A nivel celular, el sistema nervioso central recluta unidades motoras siguiendo el *principio del tamaño de Henneman*, donde las fibras musculares lentas (Tipo I) se activan ante esfuerzos leves o moderados, y las rápidas (Tipo IIa y IIb) ante esfuerzos mayores o veloces. 

Dado que las fibras musculares rápidas de contracción rápida son las principales responsables del desarrollo de potencia y velocidad de contracción, la pliometría resulta indispensable debido a que aprovecha tres métodos biológicos para activarlas selectivamente:
* **Esfuerzos de intensidad máxima:** Esfuerzos voluntarios que superen el 80% de la capacidad de contracción voluntaria máxima (MVC).
* **Movimientos de alta velocidad:** El pre-estiramiento de baja amplitud y velocidad extrema recluta preferencialmente fibras Tipo II.
* **Reflejo miotático:** La estimulación propioceptiva del huso muscular envía señales de alta frecuencia a través de las fibras aferentes Ia hacia el cordón espinal, estimulando una contracción eferente rápida y síncrona.

---

### 3. Criterios de Entrada: Algoritmo de Preparación Clínica

Iniciar un programa pliométrico de forma prematura en tejidos descondicionados o articulaciones con déficit de control neuromuscular incrementa drásticamente el riesgo de dolor, inflamación articular y lesiones de tendón. El estudio describe una serie de requisitos clínicos cuantitativos y cualitativos indispensables (Tabla 1):

| Parámetro clínico | Criterio de Selección Requerido |
| :--- | :--- |
| **Dolor e Inflamación** | Ausencia absoluta de dolor e inflamación en extremidades inferiores. |
| **Rango de Movimiento (ROM)** | ROM completo en todas las articulaciones involucradas. |
| **Estabilidad Monopodal** | Mantener apoyo en un solo pie por **30 segundos** con ojos abiertos y 30 segundos con ojos cerrados sin compensaciones. |
| **Fuerza de Base Requerida** | Capacidad de realizar sentadilla libre con **1.5 a 2.5 veces el peso corporal**, y/o realizar sentadillas con el **60% del peso corporal 5 veces en 5 segundos**. |
| **Control Neuromuscular** | Patrón cualitativo de movimiento óptimo en la media sentadilla monopodal (sin valgo dinámico de rodilla o pérdida de eje lumbopélvico). |

---

### 4. Dosificación, Volumen y Progresión de la Carga

La pliometría es una intervención de alta tensión mecánica que requiere periodización científica. La calidad de cada repetición debe priorizarse siempre por encima de la cantidad. Si la técnica se deteriora debido a la fatiga neuromuscular, la sesión debe darse por finalizada.

* **Frecuencia:** Se recomienda un descanso entre sesiones pliométricas de alta intensidad para permitir la recuperación.
* **Progresión de Ejercicios:**
  - *Principiante:* Saltos bipodales pequeños, rebotes de tobillo, saltos en el lugar.
  - *Intermedio:* Saltos a cajón bajo, desplazamientos en zigzag.
  - *Avanzado:* Saltos profundos desde cajón, saltos monopodales.

### Conclusión
Todo lo mencionado acá está respaldado por los papers que se dejan a continuación.
- La pliometría ofrece una herramienta progresiva para la rehabilitación avanzada en el deporte.
- Su aplicación requiere evaluación de criterios de entrada, control de volumen e intervalos de recuperación adecuados.`,
    references: [
      {
        author: 'Davies G, Riemann BL, Manske R.',
        year: '2015',
        journal: 'International Journal of Sports Physical Therapy',
        doi: '10.1123/ijspt.2015.760',
        title: 'Current concepts of plyometric exercise'
      }
    ]
  },
  {
    id: '22',
    slug: 'analgesia-ejercicio-meta-metaanalisis-2026',
    title: 'Ejercicio y dolor: Evidencia del metanálisis paraguas de 2026',
    subtitle: 'Análisis del estudio publicado en PAIN Reports sobre la efectividad del ejercicio en la reducción del dolor clínico.',
    categoryType: 'tematica',
    categoryValue: 'evidencia-dolor',
    categoryLabel: '¿Qué dice la evidencia sobre mi dolor?',
    audience: 'ambos',
    date: '24 de Julio, 2026',
    author: 'Dr. Ben Singh & Colaboradores (Adaptado por MyoKine)',
    readingTime: 8,
    summary: '¿Qué dosis y tipo de ejercicio son eficaces en dolor? Analizamos la síntesis de evidencia con más de 200,000 participantes.',
    pullQuote: 'Los datos confirman que programas graduales y accesibles ofrecen alivio clínicamente significativo del dolor.',
    content: `"El ejercicio ayuda con el dolor." Es una frase que repetimos tanto que a veces parece un eslogan. Pero si un paciente te pregunta cuánto ayuda, en qué condiciones, qué tipo de ejercicio y cuánto tiene que hacer, la respuesta suele ser más vaga.

Ben Singh y su equipo de la Universidad de Adelaida intentaron responder esas preguntas con el análisis más grande que se ha hecho sobre el tema, publicado en *PAIN Reports* (2026). Es una revisión paraguas con meta-metaanálisis: en vez de reunir ensayos, reúne revisiones sistemáticas que ya habían reunido ensayos.

### El tamaño del estudio

- **157 revisiones sistemáticas** con metaanálisis.
- **2.736 ensayos clínicos aleatorizados**.
- **221.279 participantes**.
- Búsqueda en 11 bases de datos hasta agosto de 2024.

Solo incluyeron revisiones de ensayos que comparaban ejercicio con un grupo control, con dolor clínico como resultado. Dejaron fuera el dolor inducido en laboratorio. Evaluaron la calidad de cada revisión (AMSTAR-2) y la certeza de la evidencia (GRADE).

### Lo que encontraron

El ejercicio redujo el dolor frente a los controles, con una diferencia de medias estandarizada de **−0,59**. Para tener una referencia, un efecto de 0,5 se considera moderado. La certeza general de la evidencia fue **moderada**.

El efecto apareció en casi todo:

- **Dolor crónico** (−0,57) y también **dolor agudo** (−0,87).
- Condiciones musculoesqueléticas, neurológicas, inflamatorias y oncológicas.
- Aeróbico, fuerza, yoga, pilates y tai chi. Todos funcionaron.

Algunos ejemplos por condición: artrosis (entre −0,30 y −0,50, en 48 metaanálisis), migraña y cefalea (−1,13) y dismenorrea primaria (−2,09). Los autores advierten que los efectos más grandes, como el de dismenorrea, la migraña o el baile en fibromialgia, venían de una sola revisión cada uno, así que hay que tomarlos con cautela.

### La parte sorprendente: menos fue más

Los programas que mostraron más alivio fueron:

- De **menor intensidad**.
- **De menos de 12 semanas**.
- De **menos de 120 minutos por semana**.

Y no hubo diferencias entre hacer 1 o 2 sesiones semanales y hacer 3 o más.

Esto no significa que el ejercicio deje de funcionar con el tiempo. Los autores dan una explicación razonable: en muchos ensayos largos, el apoyo formal se retira y las personas terminan haciendo menos ejercicio. El efecto más pequeño probablemente refleja menos exposición, no menos beneficio.

Lo que sí sugiere es algo muy útil para la práctica: **empezar con dosis manejables**. Para alguien con dolor crónico, una meta de 150 minutos semanales puede sentirse inalcanzable y generar miedo a empeorar. Empezar con poco construye confianza, mejora la adherencia y reduce el temor a las crisis. Después se puede progresar.

[[figura:ejercicio-dolor-dosis]]

### ¿Cómo alivia el dolor el ejercicio?

Los autores mencionan cuatro mecanismos principales:

1. Liberación de **opioides endógenos**, que aumentan la tolerancia al dolor.
2. Más **serotonina y noradrenalina**, que participan en el ánimo y en la modulación del dolor.
3. Menor **inflamación sistémica**.
4. Activación del **sistema endocannabinoide**.

A esto se suma algo que no aparece en un tubo de ensayo: moverse sin que pase nada malo cambia lo que la persona espera de su cuerpo.

### Cómo se compara con los fármacos

Los autores señalan que el efecto es comparable o mayor al de muchos tratamientos farmacológicos para el dolor, con mucho menos riesgo y con beneficios adicionales para la salud mental y la función. Por eso proponen que el ejercicio sea una base del manejo del dolor, dentro de un enfoque multimodal y centrado en la persona.

### Límites

- Una revisión paraguas depende de la calidad de las revisiones que incluye, y muchas no eran de alta calidad.
- Puede haber sesgo de publicación.
- Los ensayos de ejercicio no pueden ser "ciegos": la persona sabe que está haciendo ejercicio.
- Mezclar condiciones tan distintas da una visión amplia, pero no reemplaza la evidencia específica de cada una.

### Qué cambia en la consulta

**Si eres paciente:** no necesitas un programa perfecto ni intenso para que el ejercicio te ayude con el dolor. El que disfrutes y puedas sostener es un buen punto de partida, aunque sean dos sesiones cortas a la semana.

**Si eres clínico:** la pregunta deja de ser "¿qué ejercicio es el mejor?" y pasa a ser "¿qué ejercicio va a hacer esta persona?". Empieza por una dosis que la persona sienta posible, explica que un poco de molestia durante el ejercicio puede ser normal y planifica cómo mantener el hábito cuando termine el programa. Ahí es donde suele perderse el efecto.`,
    references: [
      {
        author: 'Singh B, Miatke A, Dumuid D, Curtis R, Szeto K, Dankiw K, Eglitis E, Petersen J, Zhou M, Simpson C, Matricciani L, Braithwaite F, Stanton T, Maher C.',
        year: '2026',
        journal: 'PAIN Reports',
        doi: '10.1097/PR9.0000000000001455',
        title: 'The effect of exercise on clinical pain: a systematic umbrella review and meta-meta-analysis'
      },
      {
        author: 'Sluka KA, Frey-Law L, Hoeger Bement M.',
        year: '2018',
        journal: 'PAIN',
        doi: '10.1097/j.pain.0000000000001110',
        title: 'Exercise-induced pain and analgesia? Underlying mechanisms and clinical translation'
      }
    ]
  },
  {
    id: '21',
    slug: 'fisiologia-ejercicio-analgesia-inducida',
    title: 'Fisiología del ejercicio y modulación del dolor: Mecanismos del movimiento',
    subtitle: 'Análisis de los mecanismos moleculares y neurofisiológicos que explican la analgesia inducida por el ejercicio (EIA) y la mecanotransducción.',
    categoryType: 'tematica',
    categoryValue: 'dolor-persistente',
    categoryLabel: 'Dolor persistente y neurociencia',
    audience: 'ambos',
    date: '19 de Julio, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 7,
    summary: '¿Cómo reduce el dolor el movimiento? Analizamos la fisiología de la analgesia inducida por el ejercicio, la mecanotransducción y la vía endógena opioide.',
    pullQuote: 'El ejercicio promueve la activación de vías opioides y serotoninérgicas descendentes que regulan la sensibilidad nociceptiva a nivel espinal.',
    content: `Hay una paradoja que muchos pacientes con dolor persistente conocen bien: el ejercicio regular les ayuda, pero una sesión puede dejarlos con más dolor. ¿Cómo puede ser que algo que alivia también duela?

Kathleen Sluka, Laura Frey-Law y Marie Hoeger Bement abordaron esa pregunta en una revisión publicada en la revista *PAIN* (2018). Explican qué hace el ejercicio en el sistema nervioso y en el sistema inmune, y por qué la respuesta puede ser distinta en personas sanas y en personas con dolor crónico.

### Dos efectos que parecen contradictorios

**Una sesión aislada** de actividad física puede aumentar el dolor en algunas personas con dolor crónico.

**El ejercicio regular**, en cambio, es uno de los tratamientos más efectivos para muchas condiciones de dolor.

Entender por qué ocurren ambos efectos ayuda a prescribir mejor y a explicar mejor.

### Analgesia inducida por el ejercicio

En personas sanas, una sesión de ejercicio suele **reducir la sensibilidad al dolor** durante un rato. A esto se le llama analgesia o hipoalgesia inducida por el ejercicio. Se produce, entre otras cosas, por:

- **El sistema opioide endógeno**, con la liberación de sustancias como las endorfinas.
- **Las vías inhibitorias descendentes**, que van desde el tronco encefálico hacia la médula y frenan las señales de dolor. Participan la serotonina y la noradrenalina.
- **El sistema endocannabinoide**, otro mecanismo propio del cuerpo para regular el dolor.

En algunas personas con dolor crónico, sobre todo con fibromialgia o dolor generalizado, esta respuesta puede estar **disminuida o incluso invertida**. En vez de bajar el dolor, una sesión intensa puede aumentarlo. Esto no significa que el ejercicio les haga daño. Significa que su sistema de modulación está funcionando distinto.

### Lo que cambia con el ejercicio regular

Sluka y colaboradores describen, con datos de estudios en humanos y animales:

- **El sedentarismo** se asocia a más excitabilidad y menos inhibición en el sistema nervioso central, en zonas del tronco encefálico que regulan el dolor.
- **La actividad física regular** hace lo contrario: **reduce la excitabilidad y mejora la inhibición**.
- Algo parecido ocurre en el **sistema inmune**. El sedentarismo favorece un perfil más inflamatorio, mientras que el ejercicio regular promueve un perfil más antiinflamatorio, por ejemplo, en el tipo de macrófagos que predominan en el músculo.
- También influye en **factores psicológicos** asociados al dolor, como el miedo, la catastrofización y la autoeficacia.

### El músculo como órgano que se comunica

Bente Pedersen y Mark Febbraio propusieron hace años que el músculo funciona como un **órgano secretor**. Al contraerse, libera cientos de moléculas llamadas **miocinas**, que actúan sobre el propio músculo y sobre otros órganos, como el hígado, el tejido graso, el hueso y el cerebro. Algunas tienen efectos antiinflamatorios. Como muchas dependen de la contracción, la inactividad altera esa comunicación, lo que podría ayudar a explicar la relación entre sedentarismo y enfermedades crónicas.

### La carga como estímulo para los tejidos

Karim Khan y Alex Scott recuperaron el término **mecanoterapia** para describir cómo el ejercicio, a través de la **mecanotransducción**, promueve la reparación y remodelación de tendones, músculos, cartílago y hueso. Las células sienten la carga mecánica y responden produciendo proteínas y ajustando el tejido. Este es otro camino, más lento, por el que el ejercicio ayuda: no solo modula el dolor, también mejora la capacidad del tejido.

### Qué significa para la prescripción

Sluka y colaboradores entregan recomendaciones prácticas, sobre todo para personas con dolor crónico:

- **Empezar con poco** y progresar de forma gradual.
- **Evitar sesiones demasiado intensas al inicio**, que pueden provocar más dolor y desmotivar.
- **Explicar que algo de aumento del dolor puede ser esperable** al comenzar, y que no significa daño.
- **Buscar la regularidad**, porque los beneficios más importantes aparecen con el tiempo.
- **Elegir actividades que la persona disfrute** y pueda sostener.
- **Combinar el ejercicio con educación** sobre el dolor, para reducir el miedo y mejorar la adherencia.

### Cómo lo explico a un paciente

"Es posible que al principio sientas algo más de dolor después de entrenar. Eso no significa que te estés dañando. Tu sistema de alarma está sensible y necesita tiempo para acostumbrarse. Vamos a empezar suave, y a medida que tu cuerpo se adapte, el ejercicio va a ir ayudando a calmar esa alarma."

### Para cerrar

El ejercicio alivia el dolor por muchos caminos: el sistema nervioso, el sistema inmune, los tejidos y la mente. Pero en personas con dolor persistente, la dosis importa. Empezar con poco, avanzar de a poco y sostener en el tiempo es, probablemente, la mejor forma de que el movimiento se convierta en un aliado y no en una amenaza.`,
    references: [
      {
        author: 'Sluka KA, Frey-Law L, Hoeger Bement M.',
        year: '2018',
        journal: 'PAIN',
        doi: '10.1097/j.pain.0000000000001235',
        title: 'Exercise-induced pain and analgesia? Underlying mechanisms and clinical translation'
      },
      {
        author: 'Pedersen BK, Febbraio MA.',
        year: '2012',
        journal: 'Nature Reviews Endocrinology',
        doi: '10.1038/nrendo.2012.49',
        title: 'Muscles, exercise and obesity: skeletal muscle as a secretory organ'
      },
      {
        author: 'Khan KM, Scott A.',
        year: '2009',
        journal: 'British Journal of Sports Medicine',
        doi: '10.1136/bjsm.2008.054239',
        title: 'Mechanotherapy: how physical therapists\' prescription of exercise promotes tissue repair'
      }
    ]
  },
  {
    id: '20',
    slug: 'nuevo-modelo-clinico-triangulacion-radar-evaluacion-dolor-walton-2018',
    title: 'Gráficos de radar y triangulación: Modelo para el reconocimiento de patrones en la evaluación del dolor',
    subtitle: 'La propuesta clínica de David M. Walton y James M. Elliott para abordar la evaluación del dolor mediante un enfoque multidimensional y sistemático.',
    categoryType: 'tematica',
    categoryValue: 'rehabilitacion-razonamiento',
    categoryLabel: 'Evaluación y abordaje del dolor',
    audience: 'clinico',
    date: '14 de Julio, 2026',
    author: 'David M. Walton & James M. Elliott',
    readingTime: 8,
    summary: '¿Cómo evaluar de manera ordenada y personalizada el dolor musculoesquelético? Walton y Elliott proponen un modelo visual basado en un gráfico de radar de 7 dominios clave y el método de la triangulación.',
    pullQuote: 'Agrupar a los pacientes en categorías rígidas o basarse en un solo examen clínico simplifica la complejidad del dolor. Se propone avanzar hacia el reconocimiento de patrones mediante la triangulación multidimensional.',
    content: `Una de las cosas más difíciles al empezar a atender personas con dolor es ordenar la información. La entrevista, los cuestionarios, el examen físico, las imágenes: todo entrega datos, pero ¿cómo se juntan? ¿Qué pesa más? ¿Por dónde empezar el tratamiento?

Los clínicos con experiencia suelen hacerlo casi sin pensarlo. Reconocen patrones. David Walton y James Elliott propusieron en *Musculoskeletal Science and Practice* (2018) una herramienta para enseñar ese razonamiento a estudiantes y clínicos jóvenes: un **gráfico de radar** combinado con el principio de **triangulación**.

### El problema que intentan resolver

Los ensayos clínicos comparan promedios de grupos. Eso es valioso, pero aplicar esos resultados de la misma forma a todos los pacientes puede llevar a tratar de más o de menos a una persona concreta.

Las clasificaciones en subgrupos ayudan, sobre todo al principio. Pero en la clínica pocas personas calzan exactamente en una categoría. Los autores, citando a Patricia Benner, recuerdan que pasar de novato a experto implica depender menos de reglas fijas y más de patrones aprendidos con la experiencia, y sentirse más cómodo con la ambigüedad.

### El radar de siete dominios

La propuesta es ubicar a cada persona en un gráfico de siete ejes. Cada eje representa un posible "motor" de su experiencia de dolor:

1. **Entrada nociceptiva.** Dolor producido sobre todo por estímulos en los tejidos periféricos, lo que a veces llamamos dolor mecánico o inflamatorio.
2. **Neuropatía periférica.** Dolor causado por una lesión o enfermedad del sistema nervioso periférico.
3. **Cambio nociplástico central.** Amplificación o desinhibición de las señales en el sistema nervioso central. Los autores usan el término nociplástico porque sugiere que es un proceso reversible.
4. **Alteración emocional.** Síntomas o trastornos como depresión o ansiedad. El dolor empeora el ánimo, y el ánimo bajo amplifica el dolor.
5. **Cogniciones desadaptativas.** Creencias, pensamientos o conductas poco precisas sobre el dolor, como la catastrofización o el miedo excesivo al movimiento.
6. **Contexto socioambiental.** Relaciones, cultura, lenguaje sobre el dolor, roles de género, experiencias tempranas, exigencias del entorno y estrés. También influye en el acceso a atención y en cómo se reporta el dolor.
7. **Desintegración sensoriomotora.** Desajuste entre el cuerpo percibido y el real, o entre distintas fuentes sensoriales.

Los ejes se eligieron porque cada uno se puede abordar con intervenciones distintas, incluso cuando no hay un diagnóstico claro. La herramienta **no es diagnóstica**: no busca ponerle un nombre a la condición, sino estimar qué dominios pesan más en esta persona, ahora.

[[figura:radar-walton]]

### Triangulación: tres fuentes antes de decidir

Para ubicar a la persona en cada eje con algo de confianza, los autores proponen usar **al menos tres fuentes de información** por dominio. Por ejemplo, el relato del paciente, un cuestionario y una prueba clínica.

Cuando fuentes muy distintas apuntan en la misma dirección, la confianza aumenta. Lo explican con razones de verosimilitud: tres pruebas de validez baja a moderada, si coinciden, pueden mover bastante la probabilidad de que un dominio sea relevante.

Y no todas las fuentes tienen que ser tests complejos. Una buena pregunta directa puede servir.

### Cómo se ve en la práctica

Imagina dos personas con dolor cervical después de un accidente de tránsito.

- La primera tiene dolor localizado que cambia con el movimiento, poco miedo, buen ánimo y apoyo en casa. Su radar se carga hacia la **entrada nociceptiva**.
- La segunda tiene dolor más difuso, sensibilidad aumentada en zonas lejanas, mucha preocupación por lo que le pasa, mal sueño y un conflicto laboral por el accidente. Su radar se extiende hacia lo **nociplástico**, lo **cognitivo**, lo **emocional** y lo **socioambiental**.

El diagnóstico médico puede ser el mismo. El plan de tratamiento, claramente no.

### Lo que me gusta de este modelo

- **Es visual.** Ayuda a ver de un vistazo qué está pasando.
- **Prioriza lo modificable** en vez de las etiquetas.
- **Facilita la comunicación** con el paciente y con otros profesionales.
- **Permite ver cambios.** Repetir el radar en el tiempo muestra qué dominios mejoraron.

### Sus límites, según los propios autores

Los autores lo presentan como un concepto emergente, no como una fórmula validada. Reconocen que:

- Es **reduccionista**: asume límites claros entre dominios que en la realidad se superponen.
- No considera las **interacciones** entre dominios.
- Su utilidad como herramienta de enseñanza se basa en su experiencia, no en estudios formales.

Y advierten algo importante: no quieren que se convierta en un algoritmo rígido, porque eso podría reducir las habilidades de razonamiento clínico que justamente buscan desarrollar.

### Cómo lo uso

No dibujo el radar con cada paciente, pero sí me hago sus preguntas. ¿Qué tanto pesa aquí lo que pasa en el tejido? ¿Hay señales de sensibilización? ¿Cómo está su ánimo, qué cree que le pasa, qué está pasando en su vida? Y antes de concluir, busco al menos tres pistas que apunten en la misma dirección.

Es una forma simple de recordar que el dolor tiene varias dimensiones y que, para tratar bien a una persona, primero hay que mirarla completa.`,
    references: [
      {
        author: 'Walton DM, Elliott JM.',
        year: '2018',
        journal: 'Musculoskeletal Science and Practice',
        doi: '10.1016/j.msksp.2018.03.006',
        title: 'A new clinical model for facilitating the development of pattern recognition skills in clinical pain assessment'
      }
    ]
  },
  {
    id: '19',
    slug: 'fuerza-no-es-todo-rehabilitacion-musculoesqueletica-bjsm-2025',
    title: 'No todo es fuerza: Repensando los mecanismos del ejercicio en rehabilitación',
    subtitle: 'Un artículo de Jared Powell y colaboradores en BJSM (2025) cuestiona la explicación biomecánica clásica: los cambios de fuerza no explican por qué baja el dolor.',
    categoryType: 'tematica',
    categoryValue: 'rehabilitacion-razonamiento',
    categoryLabel: 'Razonamiento clínico',
    audience: 'clinico',
    date: '09 de Julio, 2026',
    author: 'Jared Powell, Lianne Wood & Col.',
    readingTime: 6,
    summary: '¿Por qué el ejercicio reduce el dolor si no se debe solo a que te haces más fuerte? Un artículo en BJSM (2025) muestra que ganar fuerza no explica, por sí solo, el alivio del dolor musculoesquelético.',
    pullQuote: 'La fuerza es excelente para tu salud y longevidad, pero no es el mecanismo causal por el cual el ejercicio alivia el dolor musculoesquelético. Debemos abandonar narrativas de debilidad y fragilidad.',
    content: `"Tienes que fortalecer." Es probablemente la frase más repetida en kinesiología musculoesquelética. La usamos para el hombro, la rodilla, la espalda y el tendón. Y detrás hay una idea simple: el dolor aparece porque falta fuerza, y desaparece cuando la recuperamos.

Jared Powell, Lianne Wood, Aidan Cashin y Jeremy Lewis publicaron en 2025 un editorial en el *British Journal of Sports Medicine* que cuestiona esa idea. No dicen que la fuerza no importe. Dicen que hemos asumido un mecanismo que la evidencia no respalda del todo.

### La pregunta de fondo

Que el ejercicio funcione en el dolor musculoesquelético está bastante claro. La pregunta es **por qué** funciona. Para responderla se usan los **análisis de mediación**: estudios que analizan si el efecto de un tratamiento pasa a través de un cambio específico, como la fuerza.

Si la fuerza fuera el mecanismo principal, esperaríamos que los pacientes que más ganan fuerza fueran los que más mejoran, y que la ganancia de fuerza explicara buena parte del efecto.

### Lo que muestran los estudios

Los autores revisan análisis de mediación en distintas condiciones:

- **Artrosis de rodilla y cadera.** Con datos individuales de 12 ensayos y más de 1.400 personas, Runhaar y colaboradores (2023) encontraron que la fuerza de extensión de rodilla explicó solo **alrededor del 2%** del efecto del ejercicio sobre el dolor y la función en artrosis de rodilla. En cadera, no explicó nada. El 98% del efecto sigue sin explicación.
- **Dolor patelofemoral.** En un ensayo con 218 personas, los ejercicios de cadera aumentaron la fuerza, pero esa fuerza **no explicó** la mejoría en el dolor ni en las sentadillas sin dolor (Holden y colaboradores, 2021).
- **Tendinopatía rotuliana.** El beneficio de la carga progresiva no se explicó por cambios en la fuerza, el salto, el rango de tobillo ni la imagen del tendón (Deng y colaboradores, 2025).
- **Tendinopatía de Aquiles.** Una revisión sistemática no encontró ningún estudio que relacionara los cambios musculares con los cambios en el dolor (Murphy y colaboradores, 2023).
- **Dolor subacromial.** En un ensayo de estabilización escapular, ni la cinemática ni la fuerza de la escápula explicaron el efecto (Hotta y colaboradores, 2022).

En cambio, en dolor lumbar crónico, algunos estudios encuentran que factores como la **catastrofización** y la **kinesiofobia** sí median parte de la mejoría, por ejemplo con pilates o con programas de educación y reentrenamiento sensoriomotor.

[[figura:fuerza-mediacion]]

### Entonces, ¿la fuerza no sirve?

Sí sirve, y mucho. Los autores lo dejan claro. La fuerza muscular se asocia a **menos mortalidad**, a **menos caídas** en personas mayores, a un **envejecimiento más saludable** y a mejor función después de lesiones como la reconstrucción del ligamento cruzado anterior. Es una cualidad valiosa en sí misma.

El punto es otro: no conviene presentar la ganancia de fuerza como **la** explicación de por qué va a dejar de doler. Esa explicación puede ser incorrecta y, además, tiene efectos secundarios:

- Si la persona no gana fuerza, puede pensar que el tratamiento está fallando, aunque esté mejorando.
- Si la persona cree que su dolor es por "debilidad", puede sentirse frágil.
- Puede llevarnos a elegir ejercicios por su efecto en un músculo y no por lo que la persona necesita o disfruta.

### Otros mecanismos posibles

El ejercicio probablemente actúa por varias vías a la vez:

- **Efectos sobre el sistema nervioso** y la modulación del dolor.
- **Exposición gradual** a movimientos y actividades que la persona evitaba, con menos miedo y más confianza.
- **Mayor autoeficacia**: sentirse capaz de hacer cosas.
- Cambios en las **expectativas** y en la interpretación del dolor.
- Efectos **metabólicos e inmunitarios**.
- El contexto terapéutico y la relación con el profesional.

Una revisión realista de Wood y colaboradores (2024) sobre dolor lumbar persistente apunta en esa dirección: el contexto, los mecanismos conductuales y la forma de prescribir influyen en los resultados tanto como el tipo de ejercicio.

### Qué cambia en la práctica

**Explicar mejor.** En vez de "tu hombro duele porque está débil", algo como: "el ejercicio es una de las mejores herramientas para el dolor de hombro; ayuda de varias maneras, y además ganar fuerza te va a servir para muchas cosas".

**Elegir ejercicios con más libertad.** Si el mecanismo no es solo la fuerza, la preferencia del paciente, la adherencia y la relevancia para su vida pesan más. En dolor subacromial, por ejemplo, un ensayo no encontró diferencias entre ejercicio específico y general.

**Medir otras cosas.** Además de la fuerza, vale la pena observar el miedo, la confianza, la función en tareas reales y lo que la persona espera.

**No abandonar la fuerza.** Seguir cargando de forma progresiva, porque tiene beneficios propios y porque muchas personas necesitan esa capacidad para volver a sus actividades.

### Para cerrar

La fuerza es importante, pero no lo explica todo. Reconocerlo no le quita valor al ejercicio. Al contrario: nos permite usarlo con más flexibilidad, explicarlo con más honestidad y dejar de medir el éxito de un tratamiento solo con un dinamómetro.`,
    references: [
      {
        author: 'Powell J, Wood L, Cashin AG, Lewis JS.',
        year: '2025',
        journal: 'British Journal of Sports Medicine',
        doi: '10.1136/bjsports-2025-110372',
        title: 'It is not all about strength: rethinking mechanistic assumptions in exercise-based rehabilitation for musculoskeletal pain relief'
      },
      {
        author: 'Runhaar J, Holden MA, Hattle M, et al.',
        year: '2023',
        journal: 'RMD Open',
        doi: '10.1136/rmdopen-2023-003220',
        title: 'Mechanisms of action of therapeutic exercise for knee and hip OA remain a black box phenomenon: an individual patient data mediation study with the OA Trial Bank'
      },
      {
        author: 'Holden S, Matthews M, Rathleff MS, Kasza J, Vicenzino B.',
        year: '2021',
        journal: 'Journal of Orthopaedic & Sports Physical Therapy',
        doi: '10.2519/jospt.2021.10674',
        title: 'How Do Hip Exercises Improve Pain in Individuals With Patellofemoral Pain? Secondary Mediation Analysis of Strength and Psychological Factors as Mechanisms'
      },
      {
        author: 'Deng J, Runhaar J, Breda SJ, Oei EHG, Eygendaal D, de Vos RJ.',
        year: '2025',
        journal: 'Journal of Science and Medicine in Sport',
        doi: '10.1016/j.jsams.2024.12.006',
        title: 'Do physical or imaging changes explain the effectiveness of progressive tendon loading exercises? A causal mediation analysis of athletes with patellar tendinopathy'
      },
      {
        author: 'Murphy MC, Travers M, Chivers P, Debenham J, Docking SI, Rio EK, Gibson W, Ardern C.',
        year: '2023',
        journal: 'Journal of Science and Medicine in Sport',
        doi: '10.1016/j.jsams.2023.03.007',
        title: 'Can we really say getting stronger makes your tendon feel better? No current evidence of a relationship between change in Achilles tendinopathy pain or disability and changes in Triceps Surae structure or function when completing rehabilitation: A systematic review'
      },
      {
        author: 'Hotta GH, Alaiti RK, Ribeiro DC, McQuade KJ, de Oliveira AS.',
        year: '2022',
        journal: 'Archives of Physiotherapy',
        doi: '10.1186/s40945-022-00138-1',
        title: 'Causal mechanisms of a scapular stabilization intervention for patients with subacromial pain syndrome: a secondary analysis of a randomized controlled trial'
      }
    ]
  },
  {
    id: '18',
    slug: 'educacion-neurociencia-dolor-pne-metanalisis-louw',
    title: 'Educación en neurociencia del dolor: El poder de la reconceptualización en kinesiología',
    subtitle: 'La revisión sistemática de Louw, Zimney, Puentedura y Diener (2016) resume qué logra educar a los pacientes sobre la biología del dolor.',
    categoryType: 'tematica',
    categoryValue: 'dolor-persistente',
    categoryLabel: 'Dolor persistente y neurociencia',
    audience: 'ambos',
    date: '04 de Julio, 2026',
    author: 'Adriaan Louw & Kory Zimney',
    readingTime: 8,
    summary: '¿Por qué explicar al paciente la fisiología de su sistema nervioso alivia el dolor? La revisión de Louw et al. (2016) encontró que la educación en neurociencia del dolor reduce el miedo, la catastrofización y el uso de recursos de salud.',
    pullQuote: 'Cuando un paciente comprende que el dolor es una alarma del sistema nervioso sensibilizado y no una medida exacta de daño tisular, la amenaza disminuye, el cerebro libera analgésicos naturales y el movimiento vuelve a ser seguro.',
    content: `Durante mucho tiempo, explicarle el dolor a un paciente se reducía a nombrar una estructura: "es el disco", "es el tendón", "está inflamado". La educación en neurociencia del dolor (PNE, por sus siglas en inglés) propone otra cosa: enseñarle a la persona cómo funciona su sistema nervioso, por qué el dolor puede persistir aunque los tejidos hayan sanado y qué factores lo amplifican o lo calman.

¿Funciona? Adriaan Louw, Kory Zimney, Emilio Puentedura e Ina Diener revisaron esa pregunta en una revisión sistemática publicada en *Physiotherapy Theory and Practice* (2016).

### Qué hicieron

Buscaron en 11 bases de datos ensayos clínicos aleatorizados que evaluaran la PNE en adultos con dolor musculoesquelético crónico. Incluyeron **13 ensayos** con un total de **734 pacientes**: dolor lumbar crónico, fatiga crónica, fibromialgia, dolor cervical crónico, cirugía por radiculopatía lumbar y otras condiciones.

Como los estudios usaban instrumentos y comparaciones muy distintos, no pudieron combinar los resultados en un metaanálisis. Hicieron una síntesis narrativa por tipo de resultado.

### Lo que encontraron

Los autores concluyeron que la evidencia apoya el uso de la PNE en dolor musculoesquelético crónico para:

- **Reducir el dolor.**
- **Mejorar el conocimiento** sobre el dolor.
- **Mejorar la función** y reducir la discapacidad.
- **Disminuir la catastrofización** y el miedo al movimiento.
- **Mejorar el movimiento** y el rendimiento físico.
- **Reducir el uso de servicios de salud.**

Un dato importante: **ningún estudio mostró que la PNE empeorara algún resultado** frente al control. La relación entre beneficio y riesgo es claramente favorable.

### El hallazgo que más me importa

Hay una observación en la discusión que cambia cómo se aplica la PNE en la práctica.

- En **cinco estudios** la intervención fue **solo educación**. **Ninguno** logró reducir el dolor.
- En **seis estudios** la educación se combinó con una intervención física (ejercicio, exposición gradual a actividades, terapia manual, ejercicio acuático, entre otras). **Cinco de los seis** redujeron el dolor de forma significativa.

Los autores lo dicen claramente: la educación sola podría no ser suficiente para el cambio. Y advierten que muchos clínicos creen que la PNE es "solo hablar", o la ven como un enfoque "sin manos". Esta revisión sugiere lo contrario: **combinarla con movimiento** parece clave.

Tiene sentido. Explicarle a alguien que su espalda es fuerte ayuda. Pero que lo compruebe agachándose, cargando peso y viendo que no pasa nada probablemente convence mucho más.

[[figura:pne-con-movimiento]]

### Otro hallazgo interesante

Tres estudios mostraron que la PNE aumentaba el conocimiento sobre el dolor, pero ese conocimiento todavía no se había relacionado directamente con menos dolor o discapacidad. En dos de ellos, más conocimiento sí se acompañó de menos catastrofización.

Esto sugiere que no se trata de que la persona "apruebe un examen" sobre el dolor. Lo que importa es que la nueva comprensión cambie cómo interpreta lo que siente y lo que se atreve a hacer.

### Límites

- Los estudios fueron muy distintos en diseño, población, instrumentos de medición y forma de entregar la educación.
- Pocos estudios tuvieron seguimientos largos. Solo uno superó el año.
- No se pudieron combinar los datos en un metaanálisis.

Revisiones posteriores, con metaanálisis, han encontrado efectos más modestos de la educación en dolor por sí sola, sobre todo a largo plazo. Eso refuerza el mensaje central: la educación funciona mejor como parte de un tratamiento activo, no como reemplazo.

### Cómo lo aplico

**No doy una charla y ya.** La educación se mezcla con el resto de la sesión. Explico algo, lo probamos con movimiento y conversamos sobre lo que sintió.

**Uso ejemplos y metáforas.** Comparar el sistema nervioso con una alarma que se volvió muy sensible, o hablar del dolor como un sistema de protección, ayuda a muchas personas.

**Adapto el contenido a la persona.** No todos necesitan lo mismo. Hay pacientes que quieren entender los mecanismos y otros que solo necesitan saber que pueden moverse con seguridad.

**Reviso lo que entendió.** Al final pregunto: "¿cómo le explicarías esto a alguien de tu familia?". Así veo si la idea quedó clara o si hay algo que corregir.

**Conecto con sus metas.** La educación tiene más sentido cuando abre la puerta a algo que la persona quiere volver a hacer: jugar con sus hijos, trabajar sin miedo, volver a entrenar.

### Para cerrar

Explicar el dolor es una intervención. Pero esta revisión nos recuerda que las palabras funcionan mejor cuando van acompañadas de experiencia. Enseñar cómo funciona el dolor y, en la misma sesión, ayudar a la persona a moverse con más confianza, es probablemente la combinación más potente.`,
    references: [
      {
        author: 'Louw A, Zimney K, Puentedura EJ, Diener I.',
        year: '2016',
        journal: 'Physiotherapy Theory and Practice',
        doi: '10.1080/09593985.2016.1194646',
        title: 'The efficacy of pain neuroscience education on musculoskeletal pain: A systematic review of the literature'
      }
    ]
  },
  {
    id: '17',
    slug: 'guia-dolor-lumbar-inespecifico-jama-2026',
    title: 'Manejo del dolor lumbar inespecífico: Desmontando el sobreuso de imágenes y fármacos',
    subtitle: 'La revisión de Aidan Cashin y Roger Chou en JAMA (2026) resume lo que recomiendan las guías: educación, movimiento y menos medicalización.',
    categoryType: 'segmento',
    categoryValue: 'columna-lumbar',
    categoryLabel: 'Columna lumbar',
    audience: 'ambos',
    date: '29 de Junio, 2026',
    author: 'Aidan G. Cashin, Roger Chou & Col.',
    readingTime: 7,
    summary: '¿Tu resonancia lumbar muestra "desgaste"? Una revisión en JAMA (2026) recuerda que alrededor del 90 % de los dolores lumbares son inespecíficos, y que lo que más ayuda es mantenerse activo y evitar exámenes de rutina.',
    pullQuote: 'El dolor lumbar inespecífico es una condición heterogénea y de excelente pronóstico en agudo si evitamos la trampa de la patologización, el reposo y la cascada inútil de fármacos e imágenes de rutina.',
    content: `Cuando a alguien le duele la espalda, lo primero que suele pedir es un examen o un remedio. Es comprensible: queremos ver qué pasa y queremos que deje de doler. Pero en el dolor lumbar inespecífico, que es la gran mayoría de los casos, esas dos cosas ayudan bastante menos de lo que creemos.

La revisión de Aidan Cashin, Roger Chou, Melissa Weimer y James McAuley publicada en *JAMA* (2026) reúne la evidencia y las guías de Estados Unidos (ACP), Reino Unido (NICE) y la Organización Mundial de la Salud. En este artículo me enfoco en dos temas donde más nos equivocamos: las imágenes y los fármacos.

### Primero, de qué hablamos

Alrededor del 90% de las personas que consultan por dolor lumbar tienen dolor **inespecífico**. Eso significa que no se asocia a una condición concreta como radiculopatía, estenosis, fractura, espondiloartritis axial, infección o cáncer. No es un diagnóstico de descarte vago: es la categoría más común y, en general, la de mejor pronóstico.

Según su duración se clasifica en agudo (menos de 6 semanas), subagudo (6 a 12 semanas) y crónico (más de 12 semanas).

### Imágenes: cuándo sí y cuándo no

La revisión es clara: **no se recomiendan radiografías, tomografías ni resonancias de rutina** en el dolor lumbar inespecífico, sin importar cuánto tiempo lleve. No mejoran los resultados clínicos y suelen encontrar hallazgos incidentales que llevan a más exámenes e intervenciones innecesarias.

Un dato del propio artículo lo ilustra bien. En un estudio poblacional de 3.369 adultos, los cambios degenerativos en la resonancia aparecieron en el 77,8% de las personas con dolor lumbar y en el 74,4% de las personas sin dolor. La diferencia es mínima. En personas sin dolor, la degeneración discal pasó del 38,1% entre los 41 y 49 años al 81,9% entre los 60 y 68.

Cuando estos hallazgos se interpretan como la causa del dolor ("tienes una discopatía", "tienes un disco abombado"), la persona puede ponerse más ansiosa, recibir un diagnóstico que no corresponde y terminar en tratamientos que no le sirven.

La imagen sí tiene lugar en estas situaciones:

- **Déficit neurológico grave o progresivo:** pérdida de fuerza, anestesia en silla de montar, retención urinaria.
- **Sospecha de condición seria:** antecedente de cáncer, fiebre, trauma importante, cambios nuevos en vejiga o intestino.
- **Síndrome de cauda equina:** afecta a muy pocas personas en atención primaria (cerca del 0,1%), pero requiere resonancia inmediata y evaluación urgente.
- **Radiculopatía o estenosis** en alguien que es candidato a cirugía o a un procedimiento.

También deja claro cuándo no hace falta: si no hay criterios de alarma, si el dolor mejoró tras un mes de tratamiento o si ya existe una imagen previa y nada ha cambiado.

[[figura:lumbar-cuando-imagen]]

### Fármacos: menos de lo que parece

Aquí la revisión trae varias sorpresas para quienes crecieron con la idea de "paracetamol y reposo".

**Paracetamol.** Ya no se considera de primera línea. En un ensayo con 1.652 adultos con dolor lumbar agudo, el tiempo de recuperación fue prácticamente igual con paracetamol en horario fijo, paracetamol según necesidad o placebo (alrededor de 17 días en todos los grupos). Tampoco se recomienda en el dolor crónico.

**Antiinflamatorios (AINE).** Son el fármaco con mejor respaldo. Frente a placebo, en menos de dos semanas, reducen el dolor en unos 11 puntos sobre 100 y la discapacidad en unos 8 puntos. Es un efecto pequeño. Aumentan los efectos adversos gastrointestinales, y hay que usarlos con cuidado en personas mayores o con problemas renales, cardiovasculares o digestivos. En el dolor crónico quedan como opción de segunda línea.

**Relajantes musculares.** Pueden ayudar algo en el dolor agudo, con más efectos adversos como mareo y somnolencia. En el crónico no se recomiendan.

**Benzodiacepinas, corticoides y antiepilépticos** (como pregabalina o gabapentina). No se recomiendan para el dolor lumbar inespecífico crónico: no muestran beneficio y sí aumentan los efectos adversos.

**Opioides.** Las guías no coinciden del todo, y la tendencia es restringirlos. NICE solo acepta opioides débiles en el dolor agudo si un AINE no se puede usar o no funcionó; la OMS y NICE no los recomiendan para el dolor crónico, y la ACP los reserva para casos graves que no responden a nada más.

**Duloxetina.** Muestra una reducción pequeña del dolor en el dolor crónico, con más efectos adversos que el placebo.

### Entonces, ¿qué sí ayuda?

Lo primero, para cualquier duración, es lo que la revisión llama manejo inicial:

- Tranquilizar: explicar que es poco probable una enfermedad seria.
- Conversar sobre el tiempo esperado de recuperación.
- Mantenerse activo, seguir con las actividades habituales (incluido el trabajo) y evitar el reposo prolongado.
- Automanejo: calor local para aliviar y dosificar la actividad, manteniéndola o aumentándola de a poco.

En el dolor agudo se suman calor, manipulación, masaje o acupuntura, con beneficios pequeños y de corto plazo. En el crónico, el centro es el **ejercicio** (cualquier tipo que la persona disfrute y pueda sostener), las terapias psicológicas como la terapia cognitivo-conductual y, para casos más complejos, la rehabilitación multidisciplinaria.

### Lo que esto cambia en la práctica

Para el paciente, el mensaje es tranquilizador: la mayoría mejora, una imagen rara vez cambia el plan y los remedios tienen un rol acotado. Lo que más pesa está en sus manos: moverse, retomar de a poco y entender lo que pasa.

Para el clínico, el desafío es otro. Pedir una resonancia o recetar algo es rápido; explicar bien y acompañar toma más tiempo. Pero es lo que la evidencia respalda. Antes de cada examen o fármaco, vale la pena preguntarse: ¿esto va a cambiar lo que hago o solo va a calmar la incertidumbre de hoy?

### Un límite a considerar

Es una revisión narrativa basada en guías y metaanálisis, no un estudio nuevo. Muchos efectos son pequeños y las guías no siempre coinciden. Aun así, en lo esencial (no imágenes de rutina, menos fármacos, más educación y movimiento) el acuerdo es amplio.`,
    references: [
      {
        author: 'Cashin AG, Chou R, Weimer MB, McAuley JH.',
        year: '2026',
        journal: 'JAMA',
        doi: '10.1001/jama.2026.9631',
        title: 'Low Back Pain: A Review'
      }
    ]
  },
  {
    id: '16',
    slug: 'ejercicio-no-compensa-sedentarismo-resistencia-ejercicio',
    title: 'El ejercicio no borra el sedentarismo: El mito de la compensación y la resistencia metabólica',
    subtitle: 'Dempsey et al. (2026) muestran que una sesión de entrenamiento no compensa del todo muchas horas sentado, y proponen repartir el movimiento durante el día.',
    categoryType: 'tematica',
    categoryValue: 'ciencias-deporte',
    categoryLabel: 'Ciencias del deporte',
    audience: 'ambos',
    date: '24 de Junio, 2026',
    author: 'Dempsey P.C., Owen N. & Col.',
    readingTime: 6,
    summary: '¿Crees que entrenar una hora al día te inmuniza contra estar sentado el resto de la jornada? Analizamos el estudio de Dempsey et al. (2026) sobre el comportamiento sedentario y el fenómeno biológico de la resistencia al ejercicio.',
    pullQuote: 'La actividad física y el sedentarismo no son opuestos lineales que se cancelan entre sí, sino comportamientos interdependientes con vías fisiológicas distintas. Sentarse por más de 10 horas crea resistencia a los beneficios del ejercicio.',
    content: `Muchas personas tienen esta lógica: "trabajo ocho horas sentado, pero salgo a trotar media hora, así que estoy compensando". ¿Es realmente así?

En 2026, la revista *Medicine & Science in Sports & Exercise* publicó un debate entre dos grupos de investigadores sobre esta pregunta. Por un lado, Paddy Dempsey, Christian Brakenridge, Dorothea Dumuid y Neville Owen argumentaron que **la actividad física no compensa completamente** los riesgos del sedentarismo. Por otro, Ulf Ekelund y colaboradores sostuvieron que **sí puede compensarlos**, si la dosis es suficiente. Ambos grupos publicaron respuestas al otro.

Que dos grupos serios lleguen a conclusiones distintas con datos parecidos ya dice mucho. Vale la pena entender ambos lados.

### El argumento a favor de la compensación

La postura de Ekelund se apoya en un metaanálisis que su grupo publicó en *The Lancet* (2016), con datos de más de un millón de personas. Encontraron que quienes hacían mucha actividad física moderada, alrededor de **60 a 75 minutos al día**, no tenían el mayor riesgo de mortalidad asociado a estar mucho tiempo sentados. Es decir, con suficiente actividad, el exceso de riesgo del sedentarismo prácticamente desaparecía.

Pero hay un matiz importante en ese mismo estudio: esa dosis es bastante más alta que la recomendación mínima, y el efecto fue menor para el tiempo frente a la televisión.

### El argumento en contra

Dempsey y colaboradores plantean que la compensación no es completa. Sus razones principales:

- **Pocas personas alcanzan esa dosis.** Una hora o más de actividad moderada todos los días está lejos de lo que hace la mayoría.
- **Estar sentado y moverse no son extremos de una misma línea.** El día tiene 24 horas, y el tiempo que dedicamos a dormir, estar sentados, movernos suave y hacer ejercicio se reparte entre sí. Cambiar uno cambia los demás.
- **La forma de medir importa.** Muchos estudios usaban cuestionarios, que tienden a sobrestimar la actividad y subestimar el tiempo sentado. Con acelerómetros, el panorama puede cambiar.
- **Los mecanismos son distintos.** Estar sentado mucho tiempo sin interrupción reduce la actividad de los músculos grandes de las piernas, lo que afecta el manejo de la glucosa y las grasas después de comer. Las pausas frecuentes ayudan en esos marcadores, incluso si son cortas.

### ¿Qué es la "resistencia al ejercicio"?

Un concepto que aparece en esta discusión es la llamada resistencia al ejercicio. Estudios de laboratorio (entre ellos los del grupo de Edward Coyle) han observado que, después de un día casi completo sentado, algunos beneficios metabólicos de una sesión de ejercicio, como la reducción de las grasas en sangre después de comer, pueden verse atenuados.

Son estudios pequeños y de corto plazo, así que no se pueden extrapolar sin cuidado. Pero sugieren que lo que hacemos el resto del día puede influir en cuánto aprovechamos el ejercicio.

### En qué coinciden

Más allá del debate, hay puntos de acuerdo:

- **Moverse más es mejor que moverse menos.** Para casi cualquier persona.
- **Algo es mejor que nada.** Cualquier aumento de actividad ayuda, especialmente en quienes hacen muy poco.
- **Las recomendaciones actuales** (como las de la Organización Mundial de la Salud) ya sugieren tanto aumentar la actividad física como reducir el tiempo sentado.

### Qué hago con esto en la consulta

**No pongo a competir el ejercicio con las pausas.** Le digo al paciente que las dos cosas suman: entrenar es muy valioso, y moverse a lo largo del día también.

**Busco pausas realistas.** Pararse a caminar unos minutos cada cierto tiempo, subir escaleras, hacer algunas llamadas de pie, caminar después de comer. No hace falta un programa perfecto.

**Me adapto a las personas con dolor.** Para alguien con dolor persistente, una hora de ejercicio diario puede ser inalcanzable. Pequeñas interrupciones del tiempo sentado pueden ser una puerta de entrada más amable, y además ayudan a que el cuerpo no se rigidice.

**Uso el enfoque de las 24 horas.** Dormir bien, moverse durante el día y hacer ejercicio son partes de un mismo sistema. Mejorar una puede facilitar las otras.

### Para cerrar

¿El ejercicio compensa el sedentarismo? Con una dosis alta, puede que sí en gran parte. Pero para la mayoría de las personas, la respuesta práctica es otra: no hay que elegir. Entrenar y pasar menos tiempo sentado son dos herramientas distintas que, juntas, funcionan mejor.`,
    references: [
      {
        author: 'Dempsey PC, Brakenridge CJ, Dumuid D, Owen N.',
        year: '2026',
        journal: 'Medicine & Science in Sports & Exercise',
        doi: '10.1249/MSS.0000000000004055',
        title: 'Physical Activity Does Not Fully Offset the Health Risks of Sedentary Behavior'
      },
      {
        author: 'Ekelund U, Dalene KE, Husøy A, Tarp J.',
        year: '2026',
        journal: 'Medicine & Science in Sports & Exercise',
        doi: '10.1249/MSS.0000000000004056',
        title: 'Physical Activity Fully Offsets the Health Risks of Sedentary Behavior: Response to Dempsey and Colleagues'
      },
      {
        author: 'Dempsey PC, Brakenridge CJ, Dumuid D, Owen N.',
        year: '2026',
        journal: 'Medicine & Science in Sports & Exercise',
        doi: '10.1249/MSS.0000000000004057',
        title: 'Physical Activity Does Not Fully Offset the Health Risks of Sedentary Behavior: Response to Ekelund and Colleagues'
      },
      {
        author: 'Ekelund U, Steene-Johannessen J, Brown WJ, et al.',
        year: '2016',
        journal: 'The Lancet',
        doi: '10.1016/S0140-6736(16)30370-1',
        title: 'Does physical activity attenuate, or even eliminate, the detrimental association of sitting time with mortality? A harmonised meta-analysis of data from more than 1 million men and women'
      }
    ]
  },
  {
    id: '15',
    slug: 'neuroendocrinologia-estres-continuo-enfermedad-cronica',
    title: 'La neuroendocrinología del estrés: El continuo fisiopatológico hacia la enfermedad crónica',
    subtitle: 'El modelo de alostasis y carga cacostática de Agorastos y Chrousos (2021) explica cómo el estrés prolongado altera la resiliencia celular y perpetúa el dolor.',
    categoryType: 'tematica',
    categoryValue: 'salud-mental',
    categoryLabel: 'Salud mental y movimiento',
    audience: 'ambos',
    date: '19 de Junio, 2026',
    author: 'Agorastos A. & Chrousos G.P.',
    readingTime: 7,
    summary: '¿Cómo se transforma el estrés psicológico en enfermedad física real? Revisamos el trabajo de Agorastos y Chrousos (2021) sobre los ejes del estrés (HPA y SAM) y el concepto de cacostasis.',
    pullQuote: 'El estrés crónico no es simplemente una sensación mental, sino un estado de cacostasis activa donde la sobrecarga sostenida de los sistemas glucocorticoides y autonómicos degrada de forma silenciosa la fisiología celular y tisular.',
    content: `Muchas personas con dolor persistente cuentan que su dolor empeora en épocas de estrés: problemas en el trabajo, en la casa, de plata o de salud. A veces eso se interpreta como "es psicológico". Pero el estrés no ocurre solo en la cabeza. Es una respuesta del cuerpo entero.

Agorastos Agorastos y George Chrousos, de la Universidad Aristóteles de Tesalónica y de la Universidad de Atenas, publicaron en *Molecular Psychiatry* (2021) una revisión sobre la neuroendocrinología del estrés. Proponen entender el estrés como un **continuo** que va desde una respuesta adaptativa y útil hasta un estado que contribuye a la enfermedad crónica.

### Qué es el estrés, según los autores

Lo definen como un estado en que el **equilibrio homeodinámico** del organismo se ve amenazado por estímulos internos o externos, reales o percibidos. A esos estímulos se les llama **estresores**.

Para mantener ese equilibrio, el cuerpo tiene un **sistema del estrés** que redistribuye la energía según lo que se necesita en cada momento.

### Los dos brazos del sistema del estrés

**El eje hipotálamo-hipófisis-suprarrenal (HPA).** Termina en la liberación de **cortisol**, que moviliza energía, regula la inflamación y prepara al cuerpo para responder.

**El sistema simpático.** Libera **adrenalina y noradrenalina**, que aumentan la frecuencia cardíaca, la presión arterial, la alerta y el tono muscular.

Ambos están conectados con otros sistemas: el sueño, el metabolismo, el sistema inmune, la reproducción y el crecimiento.

### Del estrés útil al estrés que enferma

Los autores proponen un continuo con varios estados:

- **Eustasis:** el equilibrio óptimo.
- **Estrés breve y manejable:** estresores repetidos, cortos y motivadores generan **respuestas adaptativas** y acostumbramiento. Es el tipo de estrés que nos fortalece, como el del entrenamiento.
- **Hiperstasis:** un estado de mayor resiliencia y capacidad de adaptación, alcanzado al superar estresores manejables.
- **Cacostasis:** cuando el estrés es inadecuado, excesivo, aversivo o prolongado, supera la capacidad de regulación del organismo y produce respuestas que ya no ayudan.
- **Carga cacostática:** el costo acumulado de vivir en ese estado alterado, que aumenta el riesgo de enfermedades mentales y físicas.

[[figura:estres-continuo]]

### Por qué algunas personas son más vulnerables

Según los autores, la respuesta al estrés depende de:

- **El momento de la vida** en que ocurre. El estrés en la infancia o la adolescencia puede dejar huellas más profundas.
- **La duración.**
- **La hora del día**, porque el cortisol sigue un ritmo diario.
- **El tipo de estresor.**

Con el tiempo, esto puede generar un fenotipo vulnerable, con un sistema del estrés que reacciona de más o de menos, una señalización alterada del cortisol y una carga acumulada que eleva el riesgo de enfermedad.

### Qué tiene que ver con el dolor

El artículo no se enfoca específicamente en el dolor, pero sus ideas ayudan a entenderlo:

- El sistema del estrés y el sistema de modulación del dolor comparten estructuras y mensajeros.
- El estrés sostenido altera el **sueño**, que a su vez aumenta la sensibilidad al dolor.
- Puede favorecer un **perfil inflamatorio** de bajo grado.
- Aumenta la **tensión muscular** y la vigilancia sobre el cuerpo.

Por eso, cuando un paciente dice que le duele más cuando está estresado, no está exagerando. Está describiendo una realidad biológica.

### Qué hacer con esto en la consulta

**Preguntar por el contexto.** Cómo está durmiendo, qué está pasando en su vida, qué le preocupa. No es un tema aparte del dolor; es parte del cuadro.

**Ajustar la carga total, no solo la del ejercicio.** Si la persona está pasando por un período muy estresante, quizás no sea el momento de subir mucho la intensidad del entrenamiento. El cuerpo tiene una capacidad de adaptación total que se reparte entre todo lo que vive.

**Usar el ejercicio como estrés bueno.** El ejercicio bien dosificado es un estresor breve y controlado que puede mejorar la resiliencia. Lo importante es que sea manejable para la persona.

**Sumar herramientas de regulación.** Respiración lenta, actividades al aire libre, rutinas de sueño, contacto social. Son intervenciones simples que ayudan a bajar la activación del sistema del estrés.

**Derivar cuando corresponde.** Si el estrés es intenso, prolongado o hay síntomas de ansiedad o depresión, trabajar junto a un profesional de salud mental puede marcar una gran diferencia.

### Límites

Es una revisión narrativa que integra mucha investigación básica y clínica. Propone un modelo conceptual útil, pero no es un estudio que pruebe una intervención. Términos como "cacostasis" o "hiperstasis" son propuestas de los autores y no se usan de forma universal.

### Para cerrar

El estrés no es el enemigo. En dosis breves y manejables nos ayuda a adaptarnos y crecer. El problema aparece cuando es excesivo o no termina. Entender ese continuo nos permite mirar al paciente completo y ajustar el tratamiento a la carga real que está viviendo, no solo a la que vemos en el gimnasio.`,
    references: [
      {
        author: 'Agorastos A, Chrousos GP.',
        year: '2021',
        journal: 'Molecular Psychiatry',
        doi: '10.1038/s41380-021-01224-9',
        title: 'The neuroendocrinology of stress: the stress-related continuum of chronic disease development'
      }
    ]
  },
  {
    id: '14',
    slug: 'sinergia-span-sueno-actividad-nutricion-longevidad',
    title: 'La revolución de los pequeños cambios: Sinergia de sueño, actividad física y nutrición (SPAN) en la longevidad',
    subtitle: 'Un estudio de cohorte (2026) sugiere que pequeñas mejoras simultáneas en sueño, actividad y alimentación se asocian a más años de vida sin enfermedad.',
    categoryType: 'tematica',
    categoryValue: 'sueno',
    categoryLabel: 'Sueño y recuperación',
    audience: 'ambos',
    date: '14 de Junio, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 6,
    summary: '¿Necesitas cambios drásticos para vivir más y mejor? Koemel et al. (2026) revelan que un enfoque sinérgico (SPAN) con micro-ajustes diarios de 5 min de sueño, 2 min de ejercicio y media porción de vegetales suma un año entero de vida.',
    pullQuote: 'Por separado, hacen falta cambios grandes en ejercicio o sueño para notar efecto en la longevidad. Combinados, pequeños ajustes en sueño, actividad y alimentación suman mucho más con poco esfuerzo.',
    content: `Cuando alguien quiere cuidar su salud, muchas veces piensa en cambios grandes: entrenar todos los días, dormir ocho horas sí o sí, cambiar por completo su alimentación. Y como esos cambios cuestan, muchos ni siquiera empiezan.

Un grupo de la Universidad de Sídney, liderado por Nicholas Koemel y Emmanuel Stamatakis, se hizo otra pregunta: **¿cuál es el cambio mínimo, combinando sueño, actividad física y alimentación, que se asocia a vivir más y con mejor salud?** A esa combinación la llamaron **SPAN** (por *sleep, physical activity and nutrition*). Publicaron dos estudios en 2026 con datos del UK Biobank.

### Cómo lo midieron

Ambos estudios usaron un subgrupo del UK Biobank que usó un acelerómetro en la muñeca durante 7 días. Con eso midieron de forma objetiva:

- **Sueño**, en horas por día.
- **Actividad física moderada a vigorosa**, en minutos por día.

La alimentación se evaluó con un **puntaje de calidad de la dieta** de 10 ítems (0 a 100), que considera verduras, frutas, cereales, carnes, pescado, lácteos, aceites y bebidas azucaradas.

### Estudio 1: años de vida y años de vida sana

Publicado en *eClinicalMedicine*, incluyó a **59.078 personas** (mediana de edad 64 años), seguidas por unos 8 años. Estimaron dos cosas: la **esperanza de vida** y la **esperanza de vida sin enfermedad** (sin enfermedad cardiovascular, cáncer, diabetes tipo 2, EPOC ni demencia).

**La mejor combinación** (7,2 a 8 horas de sueño, más de 42 minutos diarios de actividad moderada a vigorosa y un buen puntaje de dieta), comparada con la peor, se asoció a:

- **9,35 años más de vida**.
- **9,45 años más de vida sana**.

**El cambio mínimo** que se asoció a **un año más de vida** fue sorprendentemente pequeño, sumado entre los tres hábitos:

- **5 minutos más de sueño** al día.
- **1,9 minutos más** de actividad moderada a vigorosa al día.
- **5 puntos más** en la calidad de la dieta, por ejemplo, media porción más de verduras al día.

Para **cuatro años más de vida sana**, el cambio combinado fue mayor: 24 minutos más de sueño, 3,7 minutos más de actividad y 23 puntos más en la dieta.

[[figura:span-minimo]]

### Estudio 2: el corazón

Publicado en el *European Journal of Preventive Cardiology*, incluyó a **53.242 personas** y se enfocó en **eventos cardiovasculares mayores** (infarto, insuficiencia cardíaca y accidente cerebrovascular). En 8 años ocurrieron 2.034 eventos.

- **La mejor combinación** (8 a 9,4 horas de sueño, 42 a 104 minutos de actividad y buena dieta) se asoció a un **57% menos de riesgo** de eventos cardiovasculares, comparada con la peor.
- Un **puntaje SPAN intermedio** ya se asoció a un **41% menos** de riesgo.
- **Un cambio pequeño** se asoció a un 10% menos de riesgo: unos 11 minutos más de sueño, 4,5 minutos más de actividad y 3 puntos más en la dieta (como un cuarto de taza extra de verduras).

### ¿Hay "sinergia"?

Es tentador decir que los tres hábitos juntos se potencian entre sí. Pero el estudio cardiovascular lo evaluó formalmente y **no encontró una interacción sinérgica**: los efectos se sumaron, pero no se multiplicaron.

Lo que sí muestran ambos estudios es que **pequeños cambios repartidos en varios hábitos** suman beneficios que, por separado, requerirían cambios mucho más grandes en uno solo.

### Lo que no dicen estos estudios

- Son **estudios observacionales**. Muestran asociación, no prueban que añadir 5 minutos de sueño cause un año más de vida.
- Las personas con mejores hábitos pueden ser distintas en otros aspectos (ingresos, acceso a salud, otras conductas), aunque los autores ajustaron por muchos factores.
- El UK Biobank incluye personas más sanas que la población general, y los hábitos se midieron en una sola semana.
- Las cifras mínimas son estimaciones estadísticas, no una receta exacta.

### Por qué me gusta para la consulta

Porque cambia la conversación. En vez de pedir cambios enormes, puedo proponer algo posible:

- **Acostarse un poco antes**, aunque sean diez minutos.
- **Moverse algo más**, como subir escaleras o caminar rápido unos minutos.
- **Agregar una porción de verduras** a una comida.

Para alguien con dolor, cansancio o poco tiempo, esto es mucho más alcanzable que un programa ideal. Y una vez que la persona siente que puede cambiar algo, es más fácil construir lo siguiente.

### Para cerrar

No hace falta una transformación total para cuidar la salud. Estos estudios sugieren que pequeños ajustes en sueño, movimiento y alimentación, sumados y sostenidos en el tiempo, se asocian a vivir más y mejor. Es un mensaje simple, realista y esperanzador.`,
    references: [
      {
        author: 'Koemel NA, Biswas RK, Ahmadi MN, Teixeira-Pinto A, Hamer M, Rezende LFM, Mitchell J, Leech RM, Sawan M, Allman-Farinelli M, Dumuid D, Bauman A, Maher C, Barrett S, Chow C, Gibson AA, Raubenheimer D, Hocking SL, Williams K, Cistulli PA, Simpson SJ, Stamatakis E.',
        year: '2026',
        journal: 'eClinicalMedicine',
        doi: '10.1016/j.eclinm.2025.103741',
        title: 'Minimum combined sleep, physical activity, and nutrition variations associated with lifeSPAN and healthSPAN improvements: a population cohort study'
      },
      {
        author: 'Koemel NA, Biswas RK, Simpson SJ, et al.',
        year: '2026',
        journal: 'European Journal of Preventive Cardiology',
        doi: '10.1093/eurjpc/zwag141',
        title: 'Sleep, physical activity, nutrition, and cardiovascular risk: minimum combined variations associated with major adverse cardiovascular events'
      }
    ]
  },
  {
    id: '13',
    slug: 'homeostasis-tisular-dolor-patelofemoral-dye',
    title: 'La rodilla no es de cristal: El dolor patelofemoral desde la perspectiva de la homeostasis tisular',
    subtitle: 'Por qué culpar a la "condromalacia" o al "malalineamiento" es un error clínico. Una forma de entenderlo basada en el equilibrio de los tejidos.',
    categoryType: 'segmento',
    categoryValue: 'rodilla',
    categoryLabel: 'Rodilla',
    audience: 'ambos',
    date: '09 de Junio, 2026',
    author: 'Scott F. Dye & Col.',
    readingTime: 6,
    summary: 'El modelo estructural no logra explicar bien el dolor patelofemoral. Revisamos la idea del "envelope of function" (sobre de función) de Scott Dye y cómo la pérdida de equilibrio en los tejidos se relaciona con el dolor.',
    pullQuote: 'El dolor patelofemoral no responde a un daño estructural inerte del cartílago, sino a una perturbación metabólica activa de la homeostasis celular en los tejidos inervados como la sinovial y el hueso subcondral.',
    content: `El dolor en la parte anterior de la rodilla es uno de los motivos de consulta más frecuentes en traumatología y kinesiología. Y, sin embargo, durante más de un siglo ha sido un enigma. Se le atribuyó al "desgaste" del cartílago de la rótula, a una rótula "mal alineada" o que "no corre bien por su riel". Se propusieron cirugías para realinearla y programas para corregir su recorrido. Muchos no funcionaron, y algunos dejaron rodillas peor de lo que estaban.

Scott Dye, cirujano de rodilla de la Universidad de California en San Francisco, propuso hace años otra forma de entender este dolor. En un artículo publicado con Christopher Dye en *Annals of Joint* (2018), resume esa perspectiva: la **homeostasis tisular** y la **envoltura de función** de la rodilla.

### El problema con la mirada estructural

Dye plantea que el error histórico fue mirar el dolor patelofemoral solo desde la estructura, la anatomía y la biomecánica. Si la imagen mostraba condromalacia o una rótula inclinada, eso se asumía como la causa.

Pero hay un problema: la condromalacia puede no doler. Dye relata que él mismo tiene condromalacia rotuliana avanzada en ambas rodillas desde hace al menos 18 años y sigue sin dolor en ninguna de sus actividades. También cuenta que, en experimentos hechos en sus propias rodillas, sintió dolor intenso al presionar la membrana sinovial sin anestesia y al aumentar la presión dentro de su rótula. El cartílago, en cambio, no tiene inervación.

Su conclusión es clara: encontrar condromalacia en una resonancia no significa que esa sea la causa del dolor, y no debería usarse por sí sola como justificación para operar.

### La rodilla como transmisión biológica

Dye propone ver las articulaciones como **sistemas vivos** diseñados para aceptar, transferir y disipar cargas repetidas, como una transmisión biológica. Cada tejido (sinovial, hueso, grasa, ligamentos) tiene un rango normal de funcionamiento, que él llama **homeostasis tisular**.

Su idea central es esta:

- Si una articulación está en homeostasis, por definición no duele.
- Si duele, algún tejido perdió su homeostasis.

En el dolor patelofemoral, los tejidos que más suelen estar involucrados son la **membrana sinovial irritada** y el **hueso sobrecargado**, más que el cartílago.

### La envoltura de función

Este es el concepto que más me sirve en la consulta. La **envoltura de función** es el rango de cargas y repeticiones que una rodilla puede tolerar sin dolor y manteniendo su homeostasis.

La articulación patelofemoral soporta fuerzas muy altas, varias veces el peso corporal, incluso en actividades cotidianas. Cuando una carga supera la envoltura de función, por ejemplo después de muchas sentadillas, una caminata larga cuesta abajo o subir muchas escaleras, la rodilla pierde su homeostasis y aparece el dolor.

Lo que suele pasar en el dolor persistente es que, cuando la rodilla está empezando a recuperarse, llega una segunda o tercera sobrecarga. La envoltura se achica tanto que hasta las actividades diarias empiezan a doler: subir escaleras, sentarse y pararse, arrodillarse o estar mucho rato sentado con las rodillas dobladas.

[[figura:envoltura-funcion]]

### Cómo se presenta

Según Dye, en la historia suele haber un evento o una serie de eventos que iniciaron el dolor: sentadillas o estocadas repetidas, caminatas en cerros, escaleras, cargar peso, arrodillarse o un golpe directo. Los síntomas suelen ir y venir según la carga, con períodos sin dolor.

En el examen, puede haber sensibilidad alrededor de la rótula, algo de calor o un pequeño derrame. Y recomienda descartar siempre otras fuentes de dolor, como problemas de cadera o una neuropatía de la rama infrapatelar del nervio safeno, que según él es más frecuente de lo que se cree.

También señala que la sensación de que la rodilla "se va" muchas veces no es inestabilidad real, sino una inhibición refleja del cuádriceps por dolor, como cuando soltamos una olla caliente.

### Qué propone para el tratamiento

El objetivo es **devolver la rodilla dentro de su envoltura de función** y dejar que los tejidos recuperen su homeostasis. Para Dye, esto explica gran parte de la mejoría.

- **Bajar la carga** a un nivel que la rodilla tolere. Por ejemplo, evitar sillas muy bajas o usar un asiento de baño más alto.
- **Medidas para calmar la irritación**, como frío local, y tratamientos médicos cuando corresponda.
- **Kinesiología con progresión cuidadosa**: fortalecimiento, elongación suave, trabajo de tronco y cadera, y vendaje si ayuda.
- **Ampliar la envoltura de a poco**, a medida que la rodilla tolera más.

Y advierte algo sobre la cirugía: cualquier operación es una nueva lesión para la rodilla, que necesita tiempo para recuperarse.

### Un matiz desde la evidencia actual

Dye recomienda evitar las actividades que causen dolor durante la recuperación. Hoy, muchas guías de dolor patelofemoral y de tendinopatías aceptan un nivel bajo de dolor durante el ejercicio, siempre que no aumente al día siguiente. Las dos ideas no están tan lejos: ambas buscan cargar dentro de lo que el tejido tolera. La diferencia está en cuánto margen se acepta.

También vale la pena decir que el artículo es una revisión basada en la experiencia del autor y en su modelo, no un estudio clínico. Sus ideas han sido muy influyentes, pero no todas han sido comprobadas en ensayos.

### Por qué me gusta este modelo

Porque es fácil de explicar a un paciente. En vez de "tu rótula está desalineada" o "tienes el cartílago gastado", puedo decir: "tu rodilla está sensible porque recibió más carga de la que podía tolerar. Vamos a bajarla un poco para que se calme y luego la vamos a ir subiendo para que tolere cada vez más".

Es un mensaje que no asusta, que no depende de una imagen y que le da a la persona un rol activo en su recuperación.`,
    references: [
      {
        author: 'Dye SF, Dye CC.',
        year: '2018',
        journal: 'Annals of Joint',
        doi: '10.21037/aoj.2018.04.03',
        title: 'An overview of patellofemoral pain—from a tissue homeostasis perspective'
      },
      {
        author: 'Dye SF.',
        year: '1996',
        journal: 'Clinical Orthopaedic and Related Research',
        doi: '10.1097/00003086-199604000-00003',
        title: 'The knee as a biologic transmission with an envelope of function: a theory'
      }
    ]
  },
  {
    id: '12',
    slug: 'riesgo-de-confundir-correlacion-causalidad-deporte',
    title: 'Factores de riesgo en medicina del deporte: Evitando la ilusión de causalidad',
    subtitle: 'Revisamos por qué etiquetar una simple asociación estadística como "factor modificable" puede guiar a intervenciones inútiles y costosas.',
    categoryType: 'tematica',
    categoryValue: 'sesgos-cognitivos',
    categoryLabel: 'Sesgos cognitivos en clínica, de MyoKine',
    audience: 'clinico',
    date: '04 de Junio, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 6,
    summary: 'A partir del trabajo de Stovitz, Impellizzeri y Shrier (2025), revisamos por qué "factor de riesgo" es un concepto impreciso y cómo nos lleva a suponer causas que no están demostradas.',
    pullQuote: 'Que una variable se asocie estadísticamente con un mayor índice de lesiones no significa que modificarla vaya a reducir la tasa real de lesiones del paciente. Confundir predicción con explicación es un error costoso.',
    content: `En la literatura de kinesiología y medicina deportiva abundan los artículos dirigidos a identificar "factores de riesgo modificables" para diversas lesiones musculoesqueléticas. Guiados por estas investigaciones, los clínicos prescribimos rutinas asumiendo que, al combatir esa asimetría o rasgo específico, reduciremos directamente el riesgo de lesión de nuestro paciente.

Este enfoque epidemiológico ha sido abordado por los epidemiólogos **Steven D. Stovitz, Franco M. Impellizzeri e Ian Shrier (2025)** en su artículo publicado en la revista *Sports Medicine*. Los autores advierten que el término "factor de riesgo" se utiliza de manera imprecisa en la investigación clínica, lo que genera confusiones y promueve intervenciones inefectivas.

### Los cuatro caminos de la asociación (¿Por qué se conectan dos variables?)
Para comprender la raíz del problema, Stovitz y col. nos recuerdan que la existencia de una asociación estadística entre dos variables (X e Y) no implica causalidad. Existen cuatro formas fundamentales en las que dos variables pueden estar correlacionadas:
1. **Efecto Causal Directo (X causa Y):** Por ejemplo, un impacto directo de alta energía sobre la rodilla (X) causa mecánicamente la rotura del ligamento cruzado anterior (Y).
2. **Efecto Causal Reverso (Y causa X):** En lugar de que X sea el origen, es la condición de salud la que altera la variable. Por ejemplo, presentar dolor patelofemoral (Y) provoca de forma refleja inhibición y debilidad del cuádriceps (X), y no al revés.
3. **Asociación no causal por Confusión (Confounding):** Ambas variables están causadas por un tercer factor común "C". Por ejemplo, un corredor que entrena con fatiga severa y falta de sueño (C) puede tener un patrón dinámico de valgo de rodilla acentuado (X) y terminar lesionándose (Y). El valgo y la lesión están asociados no porque uno cause el otro, sino porque ambos son el resultado del estado de fatiga.
4. **Asociación no causal por Sesgo de Selección (Selection Bias):** Se produce cuando la inclusión de sujetos en el estudio se ve afectada de alguna manera por ambas variables.

### La propuesta de Stovitz: Una terminología de tres niveles
Para erradicar la ambigüedad, los autores proponen tres términos precisos:
- **Causal Risk Factor (Factor de Riesgo Causal):** Debe emplearse únicamente cuando existe evidencia científica de que intervenir directamente sobre la variable modificará de forma predecible el desenlace final.
- **Noncausal Risk Factor (Factor de Riesgo No Causal):** Se aplica cuando la variable está asociada al desenlace pero su modificación directa **no** alterará la probabilidad de que ocurra la lesión.
- **Risk Marker (Marcador de Riesgo):** Reconoce que existe una asociación estadística correlativa, pero asume que aún no contamos con pruebas suficientes para afirmar o negar una relación de causalidad.

### La trampa de la palabra "Modificable"
Uno de los puntos de discusión del artículo es el uso del término **"modifiable risk factor"** (factor de riesgo modificable):
- La palabra *modificable* solo indica que el clínico tiene la capacidad física de cambiar el valor de esa variable.
- Sin embargo, **modificable no es sinónimo de causal**. Si la flexibilidad reducida es solo un *Noncausal Risk Factor*, invertir tiempo en estirar al atleta para cambiar esa variable no alterará la tasa real de lesiones.

### Conclusión
Antes de adoptar tablas de "factores de riesgo modificables" para diseñar programas de tratamiento, los profesionales del movimiento deben considerar los siguientes criterios:
1. **Distingue predicción de explicación:** Un modelo estadístico puede predecir qué atletas se lesionan basándose en ciertos predictores, pero esos predictores son marcadores asociativos de riesgo, no necesariamente las causas físicas del problema.
2. **Cuestiona la plausibilidad biológica:** Evalúa si existe plausibilidad estructural y evidencia empírica directa de que modificar un rango de movimiento o una asimetría leve realmente cambiará la adaptabilidad tisular del deportista.
3. **Promueve la adaptabilidad:** En su lugar, promueve un enfoque de adaptación progresiva y control de carga de entrenamiento.`,
    references: [
      {
        author: 'Stovitz SD, Impellizzeri FM, Shrier I.',
        year: '2025',
        journal: 'Sports Medicine',
        doi: '10.1007/s40279-025-02378-0',
        title: "The Risks of Misunderstanding the Term 'Risk Factor': A Primer with Suggestions to Improve Sports Medicine"
      }
    ]
  },
  {
    id: '11',
    slug: 'definicion-lesion-deportiva-percepciones',
    title: '¿Qué es una lesión deportiva? El abismo de percepciones en el alto rendimiento',
    subtitle: 'La lesión no es un suceso en blanco y negro. Analizamos cómo el dolor es modulado por el contexto, la motivación y el calendario competitivo.',
    categoryType: 'tematica',
    categoryValue: 'rehabilitacion-razonamiento',
    categoryLabel: 'Razonamiento clínico',
    audience: 'clinico',
    date: '29 de Mayo, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 5,
    summary: 'Un análisis sociológico de la kinesiología adaptativa basada en la investigación cualitativa de Bolling et al. (2019) sobre percepciones de lesión deportiva.',
    pullQuote: 'Para un deportista de elite, el dolor no equivale a lesión. Se perciben como "lesionados" de forma exclusiva cuando la alteración del sistema interrumpe directamente su nivel de rendimiento.',
    content: `¿Cuándo está lesionado un deportista? Parece una pregunta fácil, pero no lo es. En investigación, una lesión puede definirse por el tiempo perdido de entrenamiento, por haber necesitado atención médica o por cualquier molestia reportada. Cada definición cambia cuántas lesiones contamos y cómo las interpretamos.

Y en la práctica, el problema es aún mayor: el atleta, el entrenador y el kinesiólogo pueden tener ideas muy distintas sobre qué es una lesión. Si no hablan el mismo idioma, es difícil prevenir, detectar a tiempo o decidir cuándo volver.

### Qué hizo el estudio

Caroline Bolling, Saulo Delfino Barboza, Willem van Mechelen y Roeline Pasman, del Amsterdam Collaboration on Health & Safety in Sports, publicaron en 2019 en *Translational Sports Medicine* un estudio cualitativo sobre cómo perciben una lesión deportiva quienes viven el deporte de élite.

Entrevistaron a atletas, entrenadores y fisioterapeutas de distintos deportes olímpicos, de nivel internacional. En vez de imponer una definición, les preguntaron qué significa para ellos estar lesionado.

### Lo que encontraron

**El dolor no equivale a lesión.** En el alto rendimiento, convivir con molestias se considera parte del entrenamiento. Los atletas distinguen entre el dolor "normal" del esfuerzo y algo que les preocupa.

**Lo que define una lesión es no poder rendir.** El atleta se considera lesionado cuando el problema le impide entrenar o competir como necesita, cuando afecta su gesto técnico o su rendimiento. Es decir, la definición es funcional, no tisular.

**El contexto cambia la decisión de reportar.** Que un atleta cuente o no una molestia depende de muchas cosas: la cercanía de una competencia importante, el miedo a perder un lugar en el equipo, la confianza con el cuerpo técnico. Antes de competencias clave, algunos atletas toleran más riesgo o usan analgésicos para seguir.

**La relación con el equipo importa.** Cuando hay confianza y buena comunicación, los atletas reportan antes. Cuando sienten que hablar puede tener consecuencias negativas, callan.

### Lo que dice un estudio complementario

El mismo grupo publicó en el *British Journal of Sports Medicine* (2020) un estudio con 19 atletas, entrenadores y fisioterapeutas de deportes olímpicos sobre cómo se previenen las lesiones en la élite. Encontraron que los participantes ven el riesgo de lesión como parte del deporte, porque mejorar implica empujar los límites. La prevención se describió como un **proceso de aprendizaje** que cambia con la experiencia y con las lesiones vividas, y la **comunicación** entre atleta, entrenador y fisioterapeuta apareció como un componente clave. Algo muy revelador: para ellos, el objetivo central es el **rendimiento**, y la prevención es un medio para lograrlo, no un fin en sí mismo.

### Por qué esto importa

**Las definiciones de investigación no siempre calzan con la realidad.** Si contamos solo las lesiones que hacen perder tiempo, dejamos fuera muchos problemas que el atleta arrastra mientras sigue entrenando. Esos problemas, que reducen el rendimiento sin sacarlo de la cancha, son muy comunes.

**El silencio también es un dato.** Si un atleta no reporta, no es necesariamente porque no le pase nada. Puede ser por miedo, por la presión del calendario o por desconfianza.

**La prevención depende de la conversación.** Ningún protocolo funciona si el atleta no cuenta lo que siente a tiempo.

### Qué me llevo a la práctica

**Preguntar por el rendimiento, no solo por el dolor.** En vez de "¿te duele?", preguntas como "¿esto te está impidiendo entrenar como quieres?" o "¿sientes que rindes igual?" pueden revelar más.

**Construir confianza.** El atleta tiene que sentir que contar una molestia no lo va a dejar automáticamente fuera, sino que le ayudará a seguir rindiendo.

**Hablar el idioma del rendimiento.** Si la prevención se presenta como algo que ayuda a rendir más y por más tiempo, es más probable que el atleta y el entrenador la adopten.

**Ponerse de acuerdo en las palabras.** Vale la pena conversar con el equipo qué entendemos por "lesión", "molestia" y "estar disponible", para tomar decisiones con criterios comunes.

### Para cerrar

Una lesión no es solo un daño en un tejido. Es una experiencia que depende del contexto, de las relaciones y de lo que está en juego. Entender cómo la viven el atleta y su entorno es el primer paso para detectarla a tiempo y acompañar mejor su recuperación.`,
    references: [
      {
        author: 'Bolling C, Barboza SD, van Mechelen W, Pasman HR.',
        year: '2019',
        journal: 'Translational Sports Medicine',
        doi: '10.1002/tsm2.53',
        title: 'How elite athletes, coaches, and physiotherapists perceive a sports injury'
      },
      {
        author: 'Bolling C, Delfino Barboza S, van Mechelen W, Pasman HR.',
        year: '2020',
        journal: 'British Journal of Sports Medicine',
        doi: '10.1136/bjsports-2019-100773',
        title: 'Letting the cat out of the bag: athletes, coaches and physiotherapists share their perspectives on injury prevention in elite sports'
      }
    ]
  },
  {
    id: '10',
    slug: 'precision-test-fuerza-manguito-rotador',
    title: 'La ilusión de la medición de fuerza en el dolor de hombro',
    subtitle: '¿Tu dinamómetro de mano mide debilidad estructural o una inhibición por dolor?',
    categoryType: 'segmento',
    categoryValue: 'hombro',
    categoryLabel: 'Hombro',
    audience: 'clinico',
    date: '24 de Mayo, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 5,
    summary: 'Un análisis clínico crítico del manguito rotador basado en Cook, Lewis y Powell (2026). Revisamos qué tan útil es realmente medir la fuerza máxima para diagnosticar.',
    pullQuote: 'La aparente debilidad detectada en un test de fuerza de manguito rotador refleja con frecuencia una inhibición cortical temporal secundaria al dolor, no una pérdida real de capacidad contráctil estructural del tejido.',
    content: `Cuando alguien llega con dolor de hombro relacionado con el manguito rotador, uno de los primeros pasos de la evaluación suele ser medir la fuerza. Con las manos o con un dinamómetro, probamos la rotación externa, la abducción, la rotación interna. Si un movimiento sale más débil, lo anotamos y, muchas veces, construimos el tratamiento alrededor de ese hallazgo.

Tim Cook, Jeremy Lewis y Jared Powell publicaron en 2026, en el *Journal of Manual & Manipulative Therapy*, un editorial que cuestiona esta costumbre. Su título lo resume con humor: una tradición clínica que "carece de músculo".

### La idea central

Los autores no dicen que medir la fuerza no sirva. Plantean que solemos interpretar esos números con más certeza de la que realmente tienen, y que eso puede llevarnos a conclusiones equivocadas.

Estos son los puntos que me parecen más importantes.

### 1. Debilidad no siempre significa músculo débil

Cuando un hombro duele, la fuerza que la persona puede expresar cae. El dolor y la amenaza frenan la producción de fuerza. Por eso, un test que sale "débil" en un hombro doloroso puede reflejar dolor o protección, no necesariamente un músculo que perdió capacidad.

Una forma de verlo en la práctica es cuando la fuerza mejora rápido, en la misma sesión o en pocos días, apenas baja el dolor. Esos cambios son demasiado rápidos para explicarse por cambios en el músculo.

### 2. Los tests no identifican un músculo aislado

Las pruebas clásicas se presentan como si evaluaran un músculo específico: el supraespinoso, el infraespinoso, el subescapular. Pero en cualquier movimiento del hombro participan varios músculos a la vez. Un test "de supraespinoso" también involucra al deltoides, al resto del manguito y a los estabilizadores de la escápula.

Por eso es difícil saber qué músculo está fallando a partir de un test manual o con dinamómetro.

### 3. Un test estático dice poco de la función real

Medir una contracción isométrica en camilla o de pie, en una sola posición, entrega un dato útil, pero limitado. La vida diaria pide otra cosa: levantar una bolsa, alcanzar un estante, lanzar, empujar, repetir un gesto muchas veces. Un buen número en el dinamómetro no garantiza tolerancia en esas tareas, y un mal número no siempre significa incapacidad.

### 4. La fuerza no explica por qué mejoran los pacientes

Esto se conecta con otros trabajos de Powell y Lewis. Los análisis de mediación en dolor de hombro y en otras condiciones muestran que la ganancia de fuerza explica poco de la mejoría que produce el ejercicio. Si alguien mejora sin ganar fuerza, eso no significa que el tratamiento haya fallado.

### Entonces, ¿dejo de medir la fuerza?

No. Medir la fuerza puede ser útil para:

- **Comparar en el tiempo** a la misma persona, siempre con el mismo método.
- **Orientar la carga** del ejercicio.
- **Preparar el regreso** a actividades exigentes, como el deporte o un trabajo físico.
- **Detectar señales de alerta**, como una debilidad marcada después de un trauma, que puede sugerir una rotura importante y necesitar otra evaluación.

Lo que conviene evitar es usar un test aislado para concluir qué músculo "está malo" y construir todo el tratamiento y la explicación alrededor de eso.

### Cómo lo aplico

**Interpreto la fuerza junto al dolor.** Si un test duele, anoto que la fuerza puede estar limitada por el dolor.

**Uso tareas que importan a la persona.** Además de la fuerza en camilla, observo cómo hace las actividades que le cuestan: subir el brazo para peinarse, levantar algo sobre la cabeza, dormir sobre ese lado.

**Cuido lo que digo.** Decirle a alguien "tu manguito está débil" puede hacerle sentir que su hombro es frágil. Prefiero algo como: "tu hombro está sensible y por eso le cuesta hacer fuerza; con ejercicio progresivo va a ir tolerando más".

**Elijo ejercicios por lo que la persona necesita.** Un programa de carga progresiva y bien dosificado ayuda en el dolor de hombro relacionado con el manguito rotador. No necesita estar dirigido a un músculo en particular para funcionar.

### Para cerrar

Medir la fuerza es útil, pero un número no cuenta toda la historia de un hombro con dolor. Interpretarlo con humildad nos ayuda a evaluar mejor, a explicar mejor y a no convertir una debilidad pasajera en un diagnóstico que acompañe a la persona más tiempo del necesario.`,
    references: [
      {
        author: 'Cook T, Lewis J, Powell J.',
        year: '2026',
        journal: 'Journal of Manual & Manipulative Therapy',
        doi: '10.1080/10669817.2026.2663623',
        title: 'Rethinking strength testing in rotator cuff-related shoulder pain: a clinical tradition that lacks muscle'
      }
    ]
  },
  {
    id: '9',
    slug: 'mito-inestabilidad-lumbar-paradigma-sistemas',
    title: '¿Es la inestabilidad de columna un mito? Reconstruyendo el miedo lumbar',
    subtitle: 'Revisamos cómo el concepto de "fragilidad lumbar" fomenta hipervigilancia, coactivación patológica de tronco y perpetúa el dolor clínico.',
    categoryType: 'segmento',
    categoryValue: 'columna-lumbar',
    categoryLabel: 'Columna lumbar',
    audience: 'ambos',
    date: '19 de Mayo, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 6,
    summary: 'A partir de Reeves et al. (2019), revisamos por qué la idea de una "columna inestable" puede generar miedo y estrategias de movimiento que perpetúan el dolor.',
    pullQuote: 'Informar al paciente de que su columna está "inestable" o es "frágil" desencadena una respuesta biológica de bloqueo y coactivación protectora excesiva que acaba fatigando los músculos de la espalda e incrementando el dolor.',
    content: `"Tienes la columna inestable." Pocas frases dejan tanta huella en un paciente. Desde ese momento, agacharse, levantar a un hijo o salir a trotar se vuelven riesgos. Muchas personas empiezan a caminar apretando el abdomen, evitan girar y dejan de hacer lo que les gustaba.

Pero ¿qué sabemos realmente sobre la inestabilidad de la columna? Peter Reeves, Jacek Cholewicki, Jaap van Dieën, Greg Kawchuk y Paul Hodges abordaron esa pregunta en un comentario clínico en *JOSPT* (2019). La respuesta es más matizada, y más interesante, de lo que solemos transmitir.

### Qué significa "estable"

Los autores parten de una definición general. Un sistema es estable si, al recibir una pequeña perturbación, vuelve a un comportamiento parecido al anterior. El ejemplo clásico es una bolita en el fondo de un valle: la empujas un poco y vuelve a su lugar. Si está en la cima de una colina, un empujón pequeño la hace caer.

En términos de control, lo que estabiliza un sistema es la retroalimentación negativa (corregir en sentido contrario al error). La retroalimentación positiva (amplificar el error) lo desestabiliza.

El concepto de estabilidad de columna ha evolucionado. Primero fue una idea estática: cuánta actividad muscular hace falta para que la columna no "colapse". Luego se volvió dinámica: importan también el momento en que se activan los músculos, los reflejos y la preparación anticipada ante una carga.

### Lo que sí sabemos

- **El sistema nervioso vigila de cerca la estabilidad.** Varios estudios muestran que la activación de los músculos del tronco se ajusta a las demandas de estabilidad de cada tarea.
- **La columna sana está bien protegida.** El acoplamiento neural y mecánico entre segmentos hace muy difícil que un error de control produzca inestabilidad segmentaria.
- **Los hallazgos degenerativos no explican por sí solos el dolor.** Los cambios en la imagen pueden alterar la rigidez de la columna, pero no hay una correspondencia uno a uno con el dolor. Lo que importa también es si el control muscular alcanza a compensar.

### Lo que no sabemos

Esta es la parte más honesta del artículo: **no sabemos si la columna presenta un comportamiento inestable que cause lesiones.** No podemos observar directamente el sistema nervioso ni todos los elementos que controlan la columna, así que la inestabilidad no se puede medir con facilidad en una persona.

Los autores sí reconocen que, en una columna lesionada, la laxitud articular, la inhibición neural y la menor fuerza y resistencia muscular podrían crear condiciones para inestabilidad si todos esos factores coinciden. Y aun cuando no la causen, aumentan las demandas para mantener la estabilidad, lo que podría contribuir al dolor por fatiga o por más carga sobre los tejidos.

En resumen: la inestabilidad es un concepto relevante para investigar, pero rara vez es un diagnóstico que podamos hacer con seguridad en la consulta. Y las pruebas clínicas que se usan para "detectarla" tienen limitaciones importantes.

[[figura:inestabilidad-mensaje]]

### Cuando la protección se vuelve el problema

Los autores plantean una pregunta que me parece clave: ¿puede el miedo al dolor hacer que la persona abandone un control más fino y eficiente para usar una estrategia más básica, como apretar todo el tronco a la vez (coactivación), con el fin de protegerse de una inestabilidad que quizá no existe?

Esto conecta con lo que describen van Dieën y colaboradores sobre el "control rígido". La coactivación sostenida aumenta la compresión sobre la columna, fatiga los músculos y reduce la variabilidad del movimiento. Si la amenaza no es real, la persona paga el costo sin recibir protección a cambio.

Por eso la palabra "inestable" no es neutra. Puede empujar a alguien hacia una forma de moverse que sostiene el problema.

### Una idea más amplia: el dolor como sistema

En la parte más especulativa del artículo, los autores llevan el concepto de estabilidad más allá de la mecánica y lo aplican a las señales de dolor.

Los nociceptores tienen una característica propia de los sistemas inestables: un ciclo de retroalimentación positiva. Cuando se activan, liberan sustancias químicas que sensibilizan a los nociceptores vecinos y aumentan la excitabilidad de las neuronas de la médula. Así, un mismo estímulo puede generar cada vez más señal.

Desde esta mirada, el dolor persistente podría entenderse como un sistema que perdió su "estabilidad". También abre la puerta a pensar en dolor de origen **iatrogénico**, es decir, provocado o mantenido por la propia atención en salud: diagnósticos que asustan, explicaciones que aumentan la amenaza, tratamientos que refuerzan la idea de fragilidad.

Los autores son claros en que esta parte es especulativa, pero ofrece un marco útil para integrar biomecánica, neurofisiología y lo que vive la persona.

### Qué hacer con esto en la consulta

**Cuidar las palabras.** En vez de "tu columna es inestable", algo como: "tu espalda está sensible y protegiéndose; vamos a ayudarla a recuperar confianza y capacidad". Es más preciso y no agrega miedo.

**Evaluar el control sin asumir fragilidad.** Observar cómo se mueve la persona, si aprieta todo para cualquier tarea, si contiene la respiración, si evita ciertos movimientos.

**Si hay rigidez protectora,** el objetivo puede ser soltar: movimiento variado, exposición gradual a lo que evita, respiración, confianza.

**Si hay poco control o poca capacidad,** el objetivo puede ser construir fuerza y coordinación, con progresión.

**Explicar que la columna es robusta.** La evidencia muestra que una columna sana está muy bien protegida por su propio sistema de control. Esa información, bien dada, ya es parte del tratamiento.

### Para cerrar

Los autores no dicen que la inestabilidad sea un mito absoluto. Dicen algo más útil: es un concepto complejo, difícil de medir y fácil de usar mal. Mientras la ciencia sigue investigándolo, lo que sí está en nuestras manos es no convertir una hipótesis incierta en una sentencia para el paciente.`,
    references: [
      {
        author: 'Reeves NP, Cholewicki J, van Dieën JH, Kawchuk G, Hodges PW.',
        year: '2019',
        journal: 'Journal of Orthopaedic & Sports Physical Therapy',
        doi: '10.2519/jospt.2019.8144',
        title: 'Are Stability and Instability Relevant Concepts for Back Pain?'
      }
    ]
  },
  {
    id: '8',
    slug: 'biomecanica-injerto-lca-ejercicio-seguro',
    title: 'Dosificación mecánica del injerto en la rehabilitación de LCA',
    subtitle: 'Qué ejercicios en cadena abierta y cerrada cargan más o menos el ligamento, según las fuerzas de cizallamiento y la tensión que generan.',
    categoryType: 'segmento',
    categoryValue: 'rodilla',
    categoryLabel: 'Rodilla',
    audience: 'clinico',
    date: '14 de Mayo, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 6,
    summary: 'Cómo se carga el injerto de LCA en cada ejercicio, según la revisión biomecánica de Escamilla et al. (2012).',
    pullQuote: 'Los ejercicios en cadena cinética abierta como la extensión de rodilla sentado cargan significativamente más el LCA entre los 10° y 50° de flexión que los ejercicios de cadena cerrada como las sentadillas o prensa.',
    content: `Después de una reconstrucción del ligamento cruzado anterior (LCA), una de las preguntas que más se repiten en la rehabilitación es: ¿este ejercicio es seguro para el injerto? Queremos cargar lo suficiente para recuperar fuerza y función, pero sin estirar en exceso un injerto que todavía se está integrando.

Rafael Escamilla, Toran MacLeod, Kevin Wilk, Lonnie Paulos y James Andrews publicaron en el *Journal of Orthopaedic & Sports Physical Therapy* (2012) una revisión que sigue siendo muy útil para responder esa pregunta. Reunieron los estudios que midieron cuánto se carga el LCA durante distintos ejercicios.

### Cómo se mide la carga sobre el LCA

Se ha estimado de tres formas:

- **Fuerza de cizalla anterior** en la rodilla, calculada con técnicas de dinámica inversa. Es la fuerza que tiende a desplazar la tibia hacia adelante, y que el LCA principalmente frena.
- **Tensión (strain) del LCA medida directamente**, con sensores colocados en el ligamento de personas vivas. Se expresa como el porcentaje de alargamiento respecto de su longitud original.
- **Fuerza de tensión estimada** con modelos matemáticos y computacionales.

Como referencia, una prueba de Lachman con 150 newtons de fuerza produce una tensión de alrededor del 3,5% en el LCA.

### Los tres hallazgos principales

**1. El ángulo de la rodilla es lo que más importa.**
Tanto en ejercicios con carga de peso como sin ella, el LCA se carga más entre **10° y 50° de flexión**, con un máximo generalmente entre **10° y 30°**. Desde los 30° a los 60° la carga baja de forma progresiva, y **más allá de los 60° prácticamente no hay carga sobre el LCA**.

**2. Los ejercicios sin carga de peso cargan más el LCA en ese rango.**
La extensión de rodilla sentado entre 10° y 50° produce bastante más carga sobre el LCA que ejercicios con carga de peso en el mismo rango, como sentadillas, prensa, estocadas, subir escaleras, step-ups o bicicleta. En la extensión sentada, la tensión máxima del LCA va de 3,2% a 4,4%, entre 10° y 30° de flexión.

**3. La técnica cambia la carga.**

- **Sentadilla con las rodillas muy adelante de los pies y los talones levantados:** tiende a aumentar la carga sobre el LCA.
- **Sentadilla y estocada con el tronco inclinado hacia adelante:** tienden a disminuirla, probablemente porque aumenta la activación de los isquiotibiales, que ayudan a frenar el desplazamiento de la tibia.
- **Extensión de rodilla sentado:** la carga sobre el LCA baja cuando la resistencia se ubica más cerca de la rodilla, en vez de en el tobillo.

[[figura:lca-angulo]]

### Algunos ejercicios en detalle

**Prensa de piernas.** No se registraron fuerzas de tensión sobre el LCA ni siquiera con la carga más pesada que permitía 12 repeticiones, y tampoco al cambiar la posición o el ancho de los pies. Los autores la consideran un ejercicio muy útil para reclutar músculos de rodilla y cadera con poca carga sobre el LCA. Sugieren empezar con poca carga entre 0° y 45°, y aumentar el rango hacia 90° y la carga a medida que disminuye la inflamación y mejora la fuerza.

**Bicicleta, escaleras y estocadas.** Generan tensiones bajas a moderadas, en general menores que la extensión sentada en el mismo rango.

**Ejercicios con carga de peso en general.** Además de cargar menos el LCA, tienen la ventaja de reclutar músculos importantes de la cadera, como los extensores y abductores.

### Cuánto tarda en integrarse el injerto

Los autores recuerdan estudios en animales que sugieren que la integración de injertos de tejido blando en el hueso toma alrededor de **8 a 12 semanas**. Antes de ese período, la unión entre el injerto y el hueso es el punto más débil.

Pero también reconocen el mayor desafío: **no sabemos cuál es la cantidad óptima de tensión** para un injerto durante su integración y maduración. Algo de carga probablemente es necesaria para que el tejido se adapte; demasiada podría ser perjudicial.

### Las limitaciones que conviene tener presentes

Los propios autores piden interpretar los datos con cautela:

- **Ningún estudio** incluyó personas recién operadas del LCA, ni personas con debilidad importante. Los datos corresponden a ligamentos sanos, en rodillas sin dolor, inflamación ni pérdida de movilidad.
- Los estudios con sensores directos usaron pocas personas, generalmente no deportistas, con carga corporal o resistencias livianas.
- Los modelos computacionales permiten probar más ejercicios, pero dependen de supuestos.

### Qué cambió desde entonces

La práctica actual ha avanzado. Hoy muchos programas incluyen la extensión de rodilla en cadena abierta desde etapas tempranas, en un rango limitado (por ejemplo, de 90° a 45°), y luego amplían el rango de forma progresiva. Algunos ensayos, como el de Fukuda y colaboradores (2013), no encontraron más laxitud del injerto al introducir este ejercicio antes. El cuádriceps suele quedar débil después de la cirugía, y este ejercicio es una de las mejores formas de fortalecerlo de manera aislada.

La revisión de Escamilla no contradice esto. Más bien entrega el mapa para hacerlo con criterio: qué rangos cargan más, qué técnicas cargan menos y cómo progresar.

### Cómo lo uso

- **En las primeras semanas:** priorizo ejercicios con carga de peso y prensa en rangos cómodos. Si hago extensión sentada, empiezo en rangos de mayor flexión y con la resistencia más proximal.
- **Ajusto la técnica:** una leve inclinación del tronco en sentadillas y estocadas reduce la carga sobre el LCA y aumenta el trabajo de cadera e isquiotibiales.
- **Progreso por criterios:** inflamación, dolor, rango y fuerza, más que solo por semanas.
- **Respeto la decisión del equipo quirúrgico:** el tipo de injerto, las lesiones asociadas (como meniscos) y el protocolo del cirujano también influyen.

### Para cerrar

Saber cuánto carga cada ejercicio sobre el LCA no es para tenerle miedo al movimiento, sino para dosificarlo mejor. Con esa información, podemos cargar el cuádriceps desde temprano, elegir la técnica adecuada y acompañar al injerto en su maduración sin frenar la recuperación.`,
    references: [
      {
        author: 'Escamilla RF, Macleod TD, Wilk KE, Paulos L, Andrews JR.',
        year: '2012',
        journal: 'Journal of Orthopaedic & Sports Physical Therapy',
        doi: '10.2519/jospt.2012.3768',
        title: 'Anterior Cruciate Ligament Strain and Tensile Forces for Weight-Bearing and Non-Weight-Hearing Exercises: A Guide to Exercise Selection'
      },
      {
        author: 'Fukuda TY, Fingerhut D, Moreira VC, et al.',
        year: '2013',
        journal: 'American Journal of Sports Medicine',
        doi: '10.1177/0363546513476482',
        title: 'Open kinetic chain exercises in a restricted range of motion after anterior cruciate ligament reconstruction: a randomized controlled clinical trial'
      }
    ]
  },
  {
    id: '7',
    slug: 'mitos-tendon-aquiles-fuerza-dolor',
    title: '¿Por qué fortalecer un tendón no siempre alivia su dolor?',
    subtitle: 'Se suponía que ganar fuerza o remodelar el tríceps sural explicaba el alivio. Los datos muestran algo distinto.',
    categoryType: 'segmento',
    categoryValue: 'tobillo-pie',
    categoryLabel: 'Tobillo y pie',
    audience: 'clinico',
    date: '09 de Mayo, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 6,
    summary: 'El metanálisis de Murphy et al. (2023) muestra que la mejoría del dolor en la tendinopatía de Aquiles no se relaciona de forma clara con los cambios musculares.',
    pullQuote: 'No existe actualmente evidencia científica sólida que vincule de forma causal la mejoría en el dolor o la discapacidad de la tendinopatía con cambios estructurales o de fuerza neuromuscular en el Triceps Surae.',
    content: `Cuando alguien tiene una tendinopatía de Aquiles, el plan suele ser claro: ejercicios de carga, como los excéntricos o la resistencia lenta y pesada. Y la explicación que damos también suele ser clara: "vamos a fortalecer el tendón y la pantorrilla, y cuando estén más fuertes, va a doler menos".

Es una explicación razonable. El problema es que, cuando alguien fue a buscar la evidencia que la respalda, no la encontró.

### Qué hizo el estudio

Myles Murphy y su equipo publicaron en 2023, en el *Journal of Science and Medicine in Sport*, una revisión sistemática con un título bastante directo: *¿Podemos realmente decir que ponerse más fuerte hace que el tendón se sienta mejor?*

Querían saber si las mejoras en dolor y discapacidad de personas con tendinopatía de Aquiles de porción media se relacionan con cambios en la estructura o la función del tríceps sural (gemelos y sóleo) durante la rehabilitación con ejercicio.

Buscaron en seis bases de datos y en literatura gris, e incluyeron 17 estudios.

### Lo que encontraron

Los resultados son más llamativos por lo que **no** encontraron:

- **Ningún estudio** había analizado directamente la relación entre los cambios en el músculo y los cambios en el dolor o la discapacidad.
- Doce estudios midieron la estructura o función muscular antes y después.
- Solo **tres** mostraron mejoras en la fuerza después del tratamiento.
- **Ocho** no mostraron cambios en la estructura ni en la función del músculo.
- Todos los estudios fueron de **baja calidad**.

Su conclusión: no está claro si los protocolos actuales de ejercicio para la tendinopatía de Aquiles mejoran siquiera la estructura o la función muscular. Y, por lo tanto, tampoco podemos afirmar que esas mejoras expliquen el alivio del dolor.

### Cómo leer esto sin exagerar

Este estudio **no** dice que el ejercicio no sirva. El ejercicio de carga sigue siendo el tratamiento de primera línea en las guías de tendinopatía de Aquiles, y las personas suelen mejorar con él.

Tampoco demuestra que la fuerza no tenga nada que ver. Lo que muestra es un vacío: hemos asumido un mecanismo sin haberlo comprobado.

Hay algo más. Si muchos programas no lograron aumentar la fuerza, cabe preguntarse si la dosis era suficiente. Es posible que algunos protocolos no hayan cargado lo bastante como para generar cambios musculares, y eso también es útil para la práctica.

### Otros estudios apuntan en la misma dirección

En tendinopatía rotuliana, un análisis de mediación de Jie Deng y colaboradores (2025) encontró que el beneficio de un programa de carga progresiva **no se explicó** por cambios en la fuerza del cuádriceps, el rango de tobillo, el salto, el grosor del tendón ni la neovascularización.

Algo parecido se ha visto en dolor patelofemoral y en artrosis de rodilla: el ejercicio ayuda, pero la fuerza explica solo una pequeña parte del efecto.

### Entonces, ¿por qué mejoran las personas?

No lo sabemos con certeza, pero hay varias explicaciones posibles que pueden actuar juntas:

- **Efectos del ejercicio sobre el dolor**, que no requieren cambios estructurales.
- **Más tolerancia a la carga** del tendón y de la persona.
- **Menos miedo** a usar la pierna y más confianza al caminar, correr o saltar.
- **Mejor manejo de la carga diaria**, porque durante la rehabilitación también ajustamos cuánto y cómo entrena la persona.
- El **curso natural** de la condición, que en muchos casos tiende a mejorar con el tiempo.

### Qué cambia en la consulta

**Cambia la explicación, no el tratamiento.** La carga progresiva sigue siendo la base. Pero en vez de prometer "cuando estés más fuerte no te va a doler", puedo decir algo más honesto: "el ejercicio de carga es lo que mejor funciona para el tendón; ayuda a que tolere más y a que duela menos, y a la vez vamos a ir ajustando tu entrenamiento".

**Medir la fuerza sigue siendo útil.** Sirve para saber si la persona está preparada para volver a correr o saltar, y para verificar que la dosis realmente está generando un estímulo. Lo que no conviene es usarla como la única explicación del dolor.

**Mirar más allá del tendón.** El miedo, la carga de entrenamiento, el sueño y las expectativas también influyen en cómo evoluciona una tendinopatía.

### Para cerrar

Que algo funcione no significa que sepamos por qué funciona. Este estudio nos invita a ser más humildes con nuestras explicaciones, sin dejar de lado algo que sí sabemos: cargar el tendón, de forma progresiva y sostenida, sigue siendo el mejor camino.`,
    references: [
      {
        author: 'Murphy MC, Travers M, Chivers P, Debenham J, Docking SI, Rio EK, Gibson W, Ardern C.',
        year: '2023',
        journal: 'Journal of Science and Medicine in Sport',
        doi: '10.1016/j.jsams.2023.03.007',
        title: 'Can we really say getting stronger makes your tendon feel better? No current evidence of a relationship between change in Achilles tendinopathy pain or disability and changes in Triceps Surae structure or function when completing rehabilitation: A systematic review'
      },
      {
        author: 'Deng J, Runhaar J, Breda SJ, Oei EHG, Eygendaal D, de Vos RJ.',
        year: '2025',
        journal: 'Journal of Science and Medicine in Sport',
        doi: '10.1016/j.jsams.2024.12.006',
        title: 'Do physical or imaging changes explain the effectiveness of progressive tendon loading exercises? A causal mediation analysis of athletes with patellar tendinopathy'
      }
    ]
  },
  {
    id: '6',
    slug: 'pliometria-rehabilitacion-deportiva-davies',
    title: 'Pliometría progresiva en kinesiología: Ciencia y progresión del ciclo estiramiento-acortamiento',
    subtitle: 'Cómo usar lo que sabemos de pliometría para dosificar de forma segura en el retorno al deporte.',
    categoryType: 'tematica',
    categoryValue: 'retorno-deporte',
    categoryLabel: 'Retorno al juego (RTS)',
    audience: 'clinico',
    date: '04 de Mayo, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 5,
    summary: 'Un análisis clínico de las fases biomecánicas de los pliométricos. Analizamos las guías de dosificación de volumen y progresión basándonos en Davies et al. (2015).',
    pullQuote: 'El componente clave del ejercicio pliométrico es la fase de amortización (tiempo de rebote). Si esta fase se prolonga, la energía elástica almacenada se disipa en forma de calor y el reflejo de estiramiento se inoficializa.',
    content: `En las últimas etapas de una rehabilitación deportiva, la fuerza ya no basta. Un futbolista, una basquetbolista o un corredor necesitan producir fuerza **rápido**: saltar, frenar, cambiar de dirección, lanzar. Esa capacidad se llama potencia, y una de las mejores formas de entrenarla es la **pliometría**.

George Davies, Bryan Riemann y Robert Manske publicaron en el *International Journal of Sports Physical Therapy* (2015) una revisión clínica sobre la pliometría en rehabilitación: qué es, cómo funciona, cuándo empezar, cómo progresar y cuándo no usarla.

### Qué es la pliometría

Un ejercicio pliométrico usa el **ciclo de estiramiento-acortamiento**: un estiramiento rápido del músculo (fase excéntrica) seguido de inmediato por una contracción (fase concéntrica). Es lo que haces cuando bajas un poco antes de saltar, o cuando caes de un salto y rebotas.

Los autores lo dividen en tres fases:

1. **Preestiramiento excéntrico.** El músculo se alarga bajo carga. Se estimulan los husos musculares y los componentes elásticos del músculo y el tendón. La magnitud, la velocidad y la duración de ese estiramiento influyen en el resultado.
2. **Amortiguación o tiempo de rebote.** Es el tiempo entre el final del estiramiento y el inicio de la contracción. Es la fase clave: **mientras más corta, más potente es el movimiento**, porque se aprovecha la energía elástica almacenada. Si se demora, esa energía se pierde como calor y no se aprovecha el reflejo de estiramiento.
3. **Acortamiento concéntrico.** Es la fase de producción de potencia, que suma la contracción muscular y el retroceso elástico.

### Antes de empezar: los prerrequisitos

Este es probablemente el punto más importante del artículo. Para los autores, **la contraindicación más relevante es no tener una base de fuerza y entrenamiento suficiente**. Sin esa base, faltan la coordinación y el control para avanzar a ejercicios exigentes.

Entre los criterios que mencionan (de distintos autores) para iniciar pliometría de extremidad inferior:

- Rango de movimiento completo.
- Base adecuada de fuerza, resistencia y control neuromuscular, para hacer los ejercicios sin síntomas.
- Mantenerse 30 segundos en un pie, con ojos abiertos y cerrados.
- Una media sentadilla a una pierna de buena calidad.
- Algunos autores proponen umbrales de fuerza más exigentes, como hacer una sentadilla con 1,5 a 2,5 veces el peso corporal, o 5 sentadillas con el 60% del peso corporal en 5 segundos.

Los autores reconocen que estos criterios no están bien establecidos y que el juicio clínico sigue siendo insustituible. En la práctica, los umbrales más altos son difíciles de cumplir para muchos pacientes, así que los uso más como orientación que como requisito absoluto.

Otras contraindicaciones que mencionan: dolor, inflamación, esguinces o desgarros agudos o subagudos, inestabilidad articular y limitaciones de los tejidos después de una cirugía.

### Cómo progresar

La regla general es ir de **intensidad baja a media y luego alta**.

**Intensidad baja**
- Subir y bajar escalones hacia adelante, atrás y al lado, aumentando la altura de forma gradual.
- Saltos con los dos pies en el lugar.
- Desplazamientos laterales y carioca para ver cómo tolera la carga.

**Intensidad media**
- Saltos verticales y horizontales con los dos pies.
- Saltos laterales.
- Trote en el lugar y luego carrera.

**Intensidad alta**
- Saltos a una pierna.
- Saltos en profundidad desde un cajón.
- Ejercicios específicos del deporte.

Saltar con los dos pies a un cajón es de baja intensidad; saltar desde un cajón a una pierna es de alta intensidad. Cambiar la altura, el apoyo, la dirección o la velocidad cambia mucho la exigencia.

[[figura:pliometria-progresion]]

### Cuánto y con qué frecuencia

- **Volumen.** En la extremidad inferior se suele contar en contactos con el suelo. Unos **50 contactos** por sesión se consideran volumen bajo; **más de 200**, volumen alto. El aumento debe ser progresivo.
- **Intensidad.** Para reclutar fibras rápidas, los ejercicios deben hacerse con alta intención. Importa más la **velocidad** del estiramiento que su amplitud.
- **Calidad antes que cantidad.** Si la técnica se deteriora, probablemente hay fatiga y conviene terminar la parte pliométrica de la sesión.
- **Recuperación.** No hay evidencia clara sobre el descanso óptimo, pero los autores recomiendan **48 a 72 horas** entre sesiones pliométricas intensas.
- **Especificidad.** Los ejercicios deben parecerse cada vez más al deporte y la posición del atleta.

### Extremidad superior

La pliometría también se usa para el hombro, especialmente en deportes de lanzamiento. Los autores proponen ir desde ejercicios en cadena cerrada, como flexiones contra la pared, hacia flexiones pliométricas, y luego a ejercicios en cadena abierta, como lanzamientos de balón medicinal, primero con varias articulaciones y luego más aislados.

### Cómo lo aplico

**No empiezo por los saltos.** Primero me aseguro de que la persona tenga buena fuerza, control en un pie y tolere bien las tareas básicas sin dolor ni inflamación.

**Uso la pliometría también para evaluar.** Cómo cae, si frena bien, si duda o se protege. Todo eso me da información sobre su preparación.

**Cuido la técnica de aterrizaje.** Caer suave, con buena alineación y sin quedarse rígido.

**Progreso según la respuesta.** Si al día siguiente hay más dolor o inflamación, ajusto el volumen o la intensidad.

**La hago parte del regreso al deporte.** Sin trabajo de potencia, un atleta puede volver con buena fuerza en el gimnasio, pero sin la capacidad para tolerar los gestos rápidos de su deporte, que es justamente donde suelen ocurrir las lesiones.

### Para cerrar

La pliometría no es un ejercicio de moda, sino una forma de entrenar cómo los músculos y tendones almacenan y devuelven energía. Bien dosificada y bien progresada, es el puente entre recuperar la fuerza y volver a competir.`,
    references: [
      {
        author: 'Davies G, Riemann BL, Manske R.',
        year: '2015',
        journal: 'International Journal of Sports Physical Therapy',
        title: 'Current Concepts of Plyometric Exercise'
      }
    ]
  },
  {
    id: '5',
    slug: 'sesgo-confirmacion-camilla-clinica',
    title: 'El sesgo de confirmación en la camilla: Cuándo nuestras técnicas favoritas nos mienten',
    subtitle: 'Cómo nuestros sesgos influyen en el razonamiento clínico, y por qué una mejoría puede no deberse a lo que creemos.',
    categoryType: 'tematica',
    categoryValue: 'sesgos-cognitivos',
    categoryLabel: 'Sesgos cognitivos en clínica, de MyoKine',
    audience: 'clinico',
    date: '28 de Abril, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 6,
    summary: '¿Mejoró por mi fantástica técnica manual o por regresión a la media e historia natural? Una autocrítica necesaria para kinesiólogos con experiencia y para quienes recién empiezan.',
    pullQuote: 'Confundir causa y efecto terapéutico es la trampa heurística más común de la consulta de salud. El paciente que mejora después de una sesión contigo no necesariamente mejoró debido a lo que hiciste en su cuerpo.',
    content: `Como clínicos del movimiento humano, dedicamos cientos de horas e invertimos sumas cuantiosas de dinero en certificarnos en técnicas sofisticadas: manipulación fascial, punción seca, vendaje neuromuscular especializado, movilización articular de alta velocidad o terapia de ondas de choque. Cuando un paciente ingresa a nuestra consulta con dolor severo y se retira manifestando una mejoría instantánea del 60% tras aplicar nuestra técnica favorita, nuestro cerebro archiva de forma automática este suceso como una demostración irrefutable: *"La técnica manual X funciona"*.

Esta respuesta intuitiva es el origen del **sesgo de confirmación clínica**. Nos enamoramos de nuestra intervención favorita y pasamos el resto de nuestra carrera técnica buscando selectivamente a pacientes que respondan bien a ella, ignorando sistemáticamente a aquellos que no muestran cambios clínicos sustanciales o atribuyendo sus fracasos diagnósticos a su "falta de apego al tratamiento".

### Las trampas del azar y el sesgo heurístico

Cuando realizamos cualquier intervención clínica y observamos un desenlace positivo, interactúan múltiples fenómenos simultáneos que se confunden fácilmente con un efecto fisiológico específico de la técnica manual aplicada:

1. **La historia natural de la condición:** Gran parte de los episodios de molestias benignas agudas (lumbagos, tendinitis incipientes, sobrecargas musculares transitorias) son procesos autolimitados. Iban a mejorar voluntariamente con el paso de los días, independientemente de qué hiciéramos en la camilla de evaluación.
2. **Regresión a la media estadística:** Los pacientes acuden a la consulta kinesiología precisamente en el momento álgido de su experiencia dolorosa, cuando la molestia es insoportable. Por pura probabilidad matemática, es sumamente factible que la sintomatología disminuya en los días siguientes hacia su promedio clínico ordinario, hagamos lo que hagamos.
3. **Efectos contextuales placenteros:** Las expectativas del paciente, el aroma de la consulta, la seguridad verbal del terapeuta, el tacto humano empático y la contención biocomportamental son moduladores potentes del sistema modulador descendente de inhibición del dolor. Estos cambios neurobiológicos son reales, pero son el resultado del **contexto de atención**, no del estímulo específico de nuestra costosa aguja o cinta elástica.

### Con rigor científico: La tensión en la evidencia

¿Significa esto que todas las técnicas de kinesiología son inútiles o intercambiables por simples placebos verbales? No exactamente. El movimiento y la estimulación mecánica son señales biológicas reales transducidas por mecanorreceptores que remodelan tejidos de forma exquisita. 

Lo que esta perspectiva nos exige es una dosis saludable de **humildad clínica**. Cuando proclamas que una manipulación articular de cadera solucionó de forma mágica una asimetría pélvica de 4 milímetros que detectaste palpando el hueso coxal, estás sosteniendo una afirmación científicamente inválida. Los datos más consistentes demuestran que las asimetrías pélvicas milimétricas no predicen dolor, que evaluar tales detalles por palpación manual tiene una confiabilidad bajísima y que las manipulaciones no realinean estructuralmente ningún hueso del cuerpo: actúan desensibilizando momentáneamente el sistema nervioso por vía refleja espinal.

### Caminando hacia un razonamiento maduro

El clínico maduro ama más la verdad científica que su kit de herramientas favoritas. Utiliza técnicas manuales con regularidad para abrir ventanas terapéuticas de alivio que le permitan al paciente moverse con libertad, pero es completamente honesto sobre cómo actúan estas técnicas en el cuerpo humano. 

No inventes explicaciones mecánicas fantásticas sobre liberar fascias pegadas, reubicar vértebras rotadas o apagar puntos dolorosos de forma definitiva. Sé honesto contigo y con la persona frente a ti: infórmale que ese estímulo mecánico disminuye el tono de protección de su sistema nervioso, dándole la oportunidad perfecta para empezar a fortalecer las estructuras mediante movimiento activo progresivo, el verdadero catalizador de un retorno duradero y vital al bienestar corporal.`,
    references: [
      {
        author: 'Croskerry P.',
        year: '2013',
        journal: 'New England Journal of Medicine',
        doi: '10.1056/NEJMp1303712',
        title: 'From mindless to mindful practice — cognitive bias in clinical decision making'
      },
      {
        author: 'Jones MA.',
        year: '1992',
        journal: 'Physical Therapy',
        doi: '10.1093/ptj/72.12.875',
        title: 'Clinical reasoning in physical therapy'
      }
    ]
  },
  {
    id: '4',
    slug: 'mitos-cartilago-rodilla-neumaticos',
    title: 'La verdad sobre el "desgaste de rodilla": Por qué tus cartílagos no son neumáticos',
    subtitle: 'Hablar de "desgaste" ha generado mucho miedo. Qué dice la biología sobre el cartílago y la carga.',
    categoryType: 'paciente',
    categoryValue: 'evidencia-dolor',
    categoryLabel: 'Para el paciente',
    audience: 'paciente',
    date: '20 de Abril, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 4,
    summary: '¿Te dijeron que tienes desgaste o que "ya no tienes cartílago"? El cartílago es tejido vivo que se adapta a la carga mecánica y no goma inerte.',
    pullQuote: 'Dile a un paciente que su rodilla está "desgastada por el uso" y probablemente dejará de caminar para cuidarla. Explícale que su rodilla necesita carga para nutrir su cartílago y verás cómo reanuda su vida activa.',
    content: `Si acudes a una consulta por molestias en la rodilla y el profesional te explica que tus articulaciones están *"gastadas"* o que *"tus cartílagos se están borrando debido al uso"*, es natural que sientas una enorme preocupación. Esa metáfora visual es letal: asocia inmediatamente tu cuerpo con una máquina inerte cuyos componentes se rompen inevitablemente por el roce continuo. Imaginas tus articulaciones rozando hueso con hueso como metales oxidados sin aceite.

Pero hay un problema gigante con esta metáfora: **tú no eres una máquina inerte. Eres un organismo biológico vivo.**

Las máquinas acumulan daño con el uso y se desgastan de forma lineal. Los organismos vivos, en cambio, poseen una capacidad de autorregulación y remodelación tisular asombrosa. Tu cartílago articular no es un trozo de goma inerte como el neumático de un automóvil; es un tejido vivo dinámico que requiere de estímulos mecánicos continuos para mantener su viabilidad fisiológica.

### El cartílago articular se nutre de la carga

El cartílago articular es un tejido avascular (no tiene vasos sanguíneos directos) e aneural (no contiene terminaciones nerviosas). ¿Cómo se alimenta y elimina sus desechos metabólicos entonces? A través de un proceso físico de bombeo de fluido mecánico llamado **difusión hidrodinámica**, el cual ocurre de forma exclusiva mediante ciclos repetitivos de compresión y descompresión.

Cuando caminas, corres o doblas la rodilla bajo carga, la presión empuja el líquido sinovial cargado de nutrientes hacia el interior de la matriz del cartílago. Al liberar la carga, los desechos de desecho celular celular se expulsan hacia la cavidad articular para su filtración biológica ordinaria. 

Si dejas de moverte o reduces drásticamente la actividad diaria por miedo al "roce", detienes este bombeo biológico saludable. El cartílago, privado de su nutrición regular, comienza a ablandarse e inhibe su capacidad protectora. El reposo no recupera tu cartílago: la inactividad lo desnutre.

### ¿Qué dice la ciencia sobre correr y la artrosis?

Durante mucho tiempo se pensó que correr largas distancias arruinaba las rodillas de por vida. Sin embargo, estudios epidemiológicos amplios (como el metanálisis de Alentorn-Geli et al., 2017) demuestran que los corredores recreativos habituales presentan de hecho **tasas significativamente menores** de artrosis de rodilla e inflamación sinovial en comparación con sujetos sedentarios emparejados por edad.

Los datos apuntan a que los ciclos rítmicos de carga mecánica asociados a la marcha o el trote recreativo actúan como un estímulo anabólico potente, estimulando la diferenciación celular de los condrocitos y fortaleciendo la calidad estructural de la matriz de colágeno articular y del hueso subcondral subyacente.

### Toma las riendas de tu proceso

Si tienes un diagnóstico de artrosis en tu rodilla, no asumas que tu cuerpo se está averiando irremediablemente. Tu rodilla sigue siendo una estructura asombrosamente fuerte. La clave clínica para restaurar tu salud articular radica en dosificar la carga:

- **Movimiento progresivo adaptado:** Realiza actividades mecánicas que desafíen tus músculos de forma cómoda y tolerable.
- **Evita la inmovilización defensiva prolongada:** El movimiento en rangos libres irriga tus tejidos y reprograma las alertas de peligro de tu cerebro.
- **Busca un profesional de la kinesiología actualizado:** Alguien que entienda que tu cuerpo se adapta a la carga y te ayude a programar la dosificación ideal en lugar de prohibirte mover el cuerpo.`,
    references: [
      {
        author: 'Alentorn-Geli E, Samuelsson K, Musahl V, et al.',
        year: '2017',
        journal: 'Journal of Orthopaedic & Sports Physical Therapy',
        doi: '10.2519/jospt.2017.7137',
        title: 'The Association of Recreational and Competitive Running With Hip and Knee Osteoarthritis: A Systematic Review and Meta-analysis'
      },
      {
        author: 'Culvenor AG, Øiestad BE, Hart HF, et al.',
        year: '2019',
        journal: 'British Journal of Sports Medicine',
        doi: '10.1136/bjsports-2018-099447',
        title: 'Prevalence of MRI-detected structural features of knee osteoarthritis in asymptomatic populations: a systematic review and meta-analysis'
      }
    ]
  },
  {
    id: '3',
    slug: 'fuerza-neuromuscular-cortex',
    title: 'Fuerza como medicina: Mecanismos neurofisiológicos más allá de la hipertrofia',
    subtitle: 'El entrenamiento de fuerza clínico suele prescribirse pensando solo en el músculo. Pero buena parte de los primeros cambios ocurre en el sistema nervioso.',
    categoryType: 'tematica',
    categoryValue: 'entrenamiento-fuerza',
    categoryLabel: 'Entrenamiento de fuerza clínico',
    audience: 'ambos',
    date: '12 de Abril, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 6,
    summary: '¿Crees que entrenar la fuerza es solo ganar músculo? Descubre cómo tu sistema nervioso se reorganiza desde las primeras sesiones clínicas.',
    pullQuote: 'Las ganancias iniciales de fuerza obtenidas durante las primeras 3 a 5 semanas de entrenamiento clínico ocurren de forma virtual sin ningún aumento apreciable en el área transversal del músculo. Es el cerebro aprendiendo a sintonizar su propio motor.',
    content: `Cuando alguien empieza a entrenar fuerza, suele ganar fuerza bastante rápido. En pocas semanas levanta más peso, aunque al mirarse al espejo no note músculos más grandes. ¿De dónde sale esa fuerza?

Una parte importante viene del **sistema nervioso**. Antes de que el músculo crezca de forma visible, el cerebro y la médula aprenden a usarlo mejor. Dos revisiones clásicas ayudan a entender este proceso: la de Timothy Carroll, Stephan Riek y Richard Carson (2001) en *Sports Medicine*, y la de Jacques Duchateau, John Semmler y Roger Enoka (2006) en el *Journal of Applied Physiology*.

### Dónde puede adaptarse el sistema nervioso

Carroll y colaboradores describen que muchos niveles del sistema nervioso tienen potencial de adaptarse al entrenamiento de fuerza:

- Los **centros supraespinales**, es decir, la corteza y otras áreas del cerebro que planifican y ordenan el movimiento.
- Las **vías descendentes** que llevan esas órdenes hacia la médula.
- Los **circuitos de la médula espinal**.
- La **unión entre la motoneurona y la fibra muscular**.

Pero agregan algo que muchas veces se omite: son pocos los estudios que han identificado experimentalmente **dónde** ocurren exactamente esas adaptaciones. Gran parte de la evidencia es indirecta. Sabemos que el sistema nervioso cambia, pero todavía no conocemos todo el mapa.

También plantean una idea práctica: el entrenamiento de fuerza probablemente modifica la forma en que reclutamos los músculos en **tareas parecidas** a las entrenadas. Por eso la transferencia depende tanto de qué y cómo entrenamos.

### Qué pasa con las unidades motoras

Duchateau y colaboradores se enfocaron en las unidades motoras, que son una motoneurona y las fibras musculares que activa. El sistema nervioso regula la fuerza de dos maneras: reclutando más unidades y aumentando la frecuencia con que descargan.

Sus conclusiones:

- La **activación voluntaria** del músculo puede aumentar levemente con el entrenamiento de fuerza, aunque no se sabe bien cómo cambian las descargas para lograrlo.
- Ese aumento **no parece deberse a una mayor sincronización** entre unidades motoras, una explicación que se repetía mucho.
- El entrenamiento sí puede aumentar la **velocidad de desarrollo de la fuerza** y la **frecuencia de descarga** de las unidades motoras. Esto es clave para gestos rápidos.
- Tanto el entrenamiento de fuerza como practicar tareas de precisión cambian la forma en que descargan las unidades motoras, y eso influye en qué tan estable es la fuerza en contracciones submáximas. Es decir, también afecta actividades cotidianas que requieren control fino.

### Por qué esto importa en rehabilitación

**Explica las ganancias tempranas.** En las primeras semanas de un programa, buena parte de la mejoría probablemente es neural. Esto ayuda a ajustar expectativas: alguien puede sentirse más fuerte antes de que haya cambios visibles en el músculo.

**La especificidad importa.** Si las adaptaciones son en parte un aprendizaje, el tipo de ejercicio, la posición, la velocidad y la intención con que se hace influyen en lo que se gana. No es lo mismo un ejercicio lento en máquina que un gesto rápido de pie.

**La intención de moverse rápido cuenta.** Si queremos mejorar la velocidad de desarrollo de la fuerza, por ejemplo en un adulto mayor que necesita reaccionar para no caerse o en un deportista que vuelve a saltar, conviene incluir ejercicios hechos con intención de máxima velocidad.

**La carga tiene que ser suficiente.** Para reclutar las unidades motoras de mayor umbral hace falta un esfuerzo alto, ya sea con cargas pesadas o con series llevadas cerca del fallo. Series eternas con bandas muy livianas, lejos del esfuerzo real, probablemente no alcanzan ese estímulo. Usar escalas como el esfuerzo percibido o las repeticiones en reserva ayuda a dosificar sin necesidad de pesos máximos.

### Un matiz importante

Es tentador decir que "la fuerza está en el cerebro" y quedarse ahí. Pero los propios autores son prudentes: muchas de estas adaptaciones son difíciles de medir, la evidencia directa es limitada y todavía no sabemos cuánto aporta cada nivel (corteza, médula, propiedades de la motoneurona) a los cambios observados.

Además, con el tiempo la hipertrofia sí aporta a la fuerza. El cambio neural no reemplaza al muscular; ocurren juntos, con distinto peso según la etapa del entrenamiento.

### Cómo lo explico a un paciente

"Las primeras semanas, tu cuerpo aprende a usar mejor los músculos que ya tienes. Por eso vas a sentir que puedes más antes de notar cambios en el tamaño. Si seguimos progresando, el músculo también se va a adaptar. Lo importante es que el ejercicio sea lo suficientemente desafiante y que lo hagas con intención."

Entrenar fuerza no es solo hacer crecer un músculo. Es enseñarle al sistema nervioso a usarlo mejor, y esa es una gran noticia para cualquiera que esté empezando, incluso con dolor.`,
    references: [
      {
        author: 'Carroll TJ, Riek S, Carson RG.',
        year: '2001',
        journal: 'Sports Medicine',
        doi: '10.2165/00007256-200131120-00001',
        title: 'Neural adaptations to resistance training: implications for movement control'
      },
      {
        author: 'Duchateau J, Semmler JG, Enoka RM.',
        year: '2006',
        journal: 'Journal of Applied Physiology',
        doi: '10.1152/japplphysiol.00543.2006',
        title: 'Training adaptations in the behavior of human motor units'
      }
    ]
  },
  {
    id: '2',
    slug: 'diskinesia-escapular-hombro',
    title: 'Rotación ascendente y diskinesia escapular: ¿Causa real o variante anatómica benigna?',
    subtitle: 'Por años se buscó la simetría perfecta del hombro. Revisamos si la asimetría escapular realmente se relaciona con los síntomas.',
    categoryType: 'segmento',
    categoryValue: 'hombro',
    categoryLabel: 'Hombro',
    audience: 'clinico',
    date: '04 de Abril, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 5,
    summary: '¿Es la falta de rotación ascendente o la diskinesia escapular la verdadera culpable del dolor de hombro? Los datos cuestionan la idea de que el hombro debe moverse de forma simétrica.',
    pullQuote: 'La obsesión con corregir la diskinesia escapular a menudo ignora que el 61% de los atletas de alto rendimiento asintomáticos presentan diskinesia visible. La asimetría podría no ser un defecto, sino una adaptación adaptativa funcional.',
    content: `Durante años, evaluar un hombro con dolor incluía casi siempre lo mismo: pedirle a la persona que subiera y bajara los brazos, mirar su escápula y buscar alguna asimetría. Si una escápula se despegaba un poco o rotaba distinto, aparecía el diagnóstico de **diskinesia escapular**, y con él, un programa centrado en "corregirla".

La idea tenía lógica: si la escápula no rota bien hacia arriba, el espacio bajo el acromion se reduce y el hombro duele. Pero cuando miramos la evidencia completa, la historia es más matizada. La diskinesia no es irrelevante, pero tampoco es la explicación de todo.

### Qué dice el consenso

En 2013, un grupo internacional de expertos liderado por W. Ben Kibler publicó en el *British Journal of Sports Medicine* el consenso de la "Scapular Summit". Sus conclusiones principales fueron:

- La diskinesia escapular aparece en un **alto porcentaje** de las lesiones de hombro.
- **No está claro** su rol exacto en causar o agravar el problema.
- Los síntomas de pinzamiento parecen especialmente relacionados con ella.
- Conviene verla como un **posible impedimento** de la función del hombro, no como un diagnóstico.
- Existe un método de observación clínica confiable para evaluarla.
- Los programas que trabajan la posición y el movimiento escapular pueden ser efectivos **dentro de una rehabilitación más completa** del hombro.

Fíjate en el tono: "posible", "no está claro", "dentro de". Es un consenso prudente.

### ¿Aumenta el riesgo de dolor?

Aquí hay un dato que vale la pena conocer. Darren Hickey y su equipo (2018) hicieron un metaanálisis de estudios prospectivos en atletas **sin dolor**, a quienes evaluaron la escápula y luego siguieron en el tiempo.

- 5 estudios, 419 atletas.
- De los que tenían diskinesia, el **35%** tuvo dolor de hombro durante el seguimiento.
- De los que no la tenían, el **25%**.
- Eso equivale a un riesgo **43% mayor** en un período de 9 a 24 meses.

Este hallazgo importa porque desarma una idea que a veces se repite: que la diskinesia es "solo una variante normal" sin ninguna relación con el dolor. Sí hay una asociación. Pero también hay que leerla en perspectiva: tres de cada cuatro atletas con diskinesia **no** tuvieron dolor, y uno de cada cuatro sin diskinesia **sí** lo tuvo. Es un factor de riesgo, no una sentencia.

[[figura:diskinesia-riesgo]]

### ¿El ejercicio funciona porque corrige la escápula?

Esta es la otra pregunta importante. Gisele Hotta y colaboradores (2022) analizaron un ensayo con 60 personas con dolor subacromial que hicieron ejercicios de estabilización escapular o de fortalecimiento periescapular durante 8 semanas. Querían saber si la mejoría se explicaba por cambios en el movimiento, la posición o la fuerza de la escápula.

La respuesta fue que **no**. Ninguno de esos factores explicó el efecto del tratamiento sobre el dolor o la discapacidad. Eso sí, una mayor fuerza del serrato anterior y del trapecio se asoció con menos discapacidad.

En otras palabras, las personas mejoran con el ejercicio, pero no necesariamente porque su escápula empiece a moverse "mejor".

### Entonces, ¿por qué mejoran?

Probablemente por varias razones a la vez:

- El hombro recupera **tolerancia a la carga**.
- El ejercicio tiene **efectos sobre el dolor** que no dependen de la mecánica.
- La persona gana **confianza** para usar el brazo.
- Cambia lo que espera de su hombro.

Esto se parece a lo que muestran otros estudios en tendinopatías y dolor de rodilla: el ejercicio funciona, pero sus mecanismos son más amplios que "corregir" una estructura.

### Cómo lo uso en la consulta

**Observo la escápula, pero no la convierto en el diagnóstico.** Es una pieza más de información, sobre todo útil si al modificarla cambian los síntomas.

**Pruebo si su corrección cambia el dolor.** Pruebas como la de asistencia escapular o la de retracción escapular ayudan a ver si ajustar la escápula alivia el gesto doloroso. Si cambia, es una pista para el tratamiento. Si no cambia, probablemente no sea la prioridad.

**Cuido el lenguaje.** Decirle a alguien que su escápula "está mal" o "desalineada" puede hacer que se sienta frágil. Prefiero algo como: "tu escápula se mueve un poco distinto, y eso es frecuente; vamos a trabajar para que el hombro tolere más".

**Entreno el hombro completo.** Fuerza del manguito y de los músculos escapulares, en distintos rangos y posiciones, con progresión. En atletas, especialmente lanzadores, el trabajo escapular puede ser parte de la prevención, junto con el control de la carga de entrenamiento.

### Para cerrar

La diskinesia escapular no es un mito, pero tampoco es la llave que abre todos los hombros dolorosos. Se asocia a más riesgo de dolor en atletas, aparece en muchas lesiones y puede ser un objetivo útil del tratamiento. Pero el hombro mejora por muchas vías, y obsesionarse con la simetría puede hacernos perder de vista a la persona que tiene adelante.`,
    references: [
      {
        author: 'Kibler WB, Ludewig PM, McClure PW, Michener LA, Bak K, Sciascia AD.',
        year: '2013',
        journal: 'British Journal of Sports Medicine',
        doi: '10.1136/bjsports-2013-092425',
        title: 'Clinical implications of scapular dyskinesis in shoulder injury: the 2013 consensus statement from the Scapular Summit'
      },
      {
        author: 'Hickey D, Solvig V, Cavalheri V, Harrold M, Mckenna L.',
        year: '2018',
        journal: 'British Journal of Sports Medicine',
        doi: '10.1136/bjsports-2017-097559',
        title: 'Scapular dyskinesis increases the risk of future shoulder pain by 43% in asymptomatic athletes: a systematic review and meta-analysis'
      },
      {
        author: 'Hotta GH, Alaiti RK, Ribeiro DC, McQuade KJ, de Oliveira AS.',
        year: '2022',
        journal: 'Archives of Physiotherapy',
        doi: '10.1186/s40945-022-00138-1',
        title: 'Causal mechanisms of a scapular stabilization intervention for patients with subacromial pain syndrome: a secondary analysis of a randomized controlled trial'
      }
    ]
  },
  {
    id: '1',
    slug: 'paradoja-imagenologia-lumbar',
    title: 'La paradoja de la imagenología lumbar',
    subtitle: '¿Por qué tu resonancia no es una sentencia?',
    categoryType: 'segmento',
    categoryValue: 'columna-lumbar',
    categoryLabel: 'Columna lumbar',
    audience: 'ambos',
    date: '25 de Marzo, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 6,
    summary: '¿Tu resonancia dice "hernia discal"? Es probable que sea una arruga de la edad. Analizamos la evidencia sobre los hallazgos estructurales en personas completamente sanas.',
    pullQuote: 'La prevalencia de degeneración discal en individuos asintomáticos de 30 años es del 52%, y sube al 80% a los 50 años. Lo que ves en tu resonancia se parece mucho más a las canas de tu piel que a una lesión de gravedad.',
    content: `Pocas cosas asustan tanto a una persona con dolor lumbar como leer su propio informe de resonancia. "Discopatía degenerativa", "protrusión", "fisura del anillo", "deshidratación discal". Son palabras que suenan a daño, y es lógico que alguien piense que su espalda se está rompiendo.

El problema es que esas mismas palabras aparecen en los informes de muchísimas personas que no tienen ningún dolor. Esa es la paradoja: lo que vemos en la imagen y lo que siente la persona muchas veces van por caminos distintos.

### Qué hizo el estudio

Waleed Brinjikji y su equipo (2015) hicieron una revisión sistemática de 33 estudios que habían tomado resonancias o tomografías de columna a personas **sin dolor lumbar**. En total, 3.110 personas asintomáticas. Agruparon los hallazgos por década de edad, desde los 20 hasta los 80 años, y calcularon con qué frecuencia aparecía cada cambio "degenerativo".

La pregunta era simple: si alguien sin dolor se hace una resonancia, ¿qué va a encontrar?

### Lo que encontraron

| Hallazgo | 20 años | 30 años | 40 años | 50 años | 60 años | 70 años | 80 años |
|---|---|---|---|---|---|---|---|
| Degeneración discal | 37% | 52% | 68% | 80% | 88% | 93% | 96% |
| Abombamiento discal | 30% | 40% | 50% | 60% | 69% | 77% | 84% |
| Protrusión discal | 29% | 31% | 33% | 36% | 38% | 40% | 43% |
| Fisura anular | 19% | 20% | 22% | 23% | 25% | 27% | 29% |

Hay que leer esta tabla con calma. A los 20 años, más de un tercio de las personas sin dolor ya tiene algún grado de degeneración discal. A los 50, son ocho de cada diez. A los 80, prácticamente todos.

Los autores lo resumen así: muchos de estos hallazgos forman parte del envejecimiento normal y no se asocian necesariamente con dolor. Se parecen más a las canas o a las arrugas que a una lesión.

[[figura:imagen-lumbar-edad]]

### Por qué esto importa en la consulta

Si estos cambios están en la mayoría de las personas sin dolor, no podemos usarlos para explicar el dolor de una persona en particular. Que tu resonancia muestre una protrusión no significa que esa protrusión sea la causa de lo que sientes. Puede serlo, pero la imagen sola no lo demuestra.

Esto tiene consecuencias reales. La revisión de Cashin y colaboradores en *JAMA* (2026) advierte que atribuir los síntomas a estos hallazgos puede aumentar la ansiedad del paciente, llevar a diagnósticos inadecuados y a exámenes y tratamientos que no mejoran los resultados. Las guías no recomiendan imágenes de rutina en el dolor lumbar inespecífico, de ninguna duración, cuando no hay señales de alarma.

También importa por el lenguaje. Una persona que lee "columna degenerada" puede empezar a moverse con miedo, evitar agacharse, dejar de entrenar o de trabajar. Ese miedo y esa protección sostenidos en el tiempo sí se relacionan con peor evolución. La palabra pesa.

### Lo que no dice este estudio

Sería un error pasar al otro extremo y decir que la anatomía nunca importa. Hay situaciones donde la imagen es útil y necesaria:

- Sospecha de fractura, infección o cáncer.
- Déficit neurológico grave o que progresa (pérdida de fuerza en una pierna, anestesia en silla de montar, problemas para orinar).
- Dolor radicular o estenosis cuando la persona es candidata a cirugía o a un procedimiento.

En esos casos, la resonancia ayuda a decidir. Fuera de ellos, rara vez cambia el tratamiento.

Hay otro matiz. Este es un estudio de personas sin dolor; no compara directamente con personas con dolor. Un metaanálisis posterior del mismo grupo encontró que algunos hallazgos son algo más frecuentes en personas con dolor lumbar menores de 50 años. Es decir, la asociación existe, pero es débil y no sirve para explicar un caso individual.

### Qué hacer con esto

**Si eres paciente:** tu informe describe cómo es tu columna, no cuánto te va a doler ni qué puedes hacer. La mayoría de las personas con dolor lumbar mejora, con o sin esos hallazgos. Lo que más ayuda es mantenerte activo, retomar tus actividades de forma gradual y entender qué está pasando.

**Si eres clínico:** antes de pedir una imagen, pregúntate qué decisión vas a cambiar con ella. Si ya existe, ayuda a la persona a leerla. Una frase como "esto es algo que tiene la mayoría de la gente de tu edad sin dolor" puede bajar mucho la amenaza. Después, el trabajo es el mismo de siempre: evaluar cómo se mueve, qué evita, qué cree sobre su espalda, cómo duerme y qué espera, y construir un plan de carga progresiva que le devuelva confianza.

### Para cerrar

Una resonancia muestra estructura. El dolor es una experiencia que depende de muchas cosas más: el sistema nervioso, el contexto, el miedo, el sueño, la carga. Cuando entendemos que la mayoría de los "hallazgos" son parte de vivir, dejamos de tratar imágenes y volvemos a tratar personas.`,
    references: [
      {
        author: 'Brinjikji W, Luetmer PH, Comstock B, et al.',
        year: '2015',
        journal: 'American Journal of Neuroradiology',
        doi: '10.3174/ajnr.A4173',
        title: 'Systematic literature review of imaging features of spinal degeneration in asymptomatic populations'
      },
      {
        author: 'Brinjikji W, Diehn FE, Jarvik JG, et al.',
        year: '2015',
        journal: 'American Journal of Neuroradiology',
        doi: '10.3174/ajnr.A4498',
        title: 'MRI Findings of Disc Degeneration are More Prevalent in Adults with Low Back Pain than in Asymptomatic Controls: A Systematic Review and Meta-Analysis'
      },
      {
        author: 'Cashin AG, Chou R, Weimer MB, McAuley JH.',
        year: '2026',
        journal: 'JAMA',
        doi: '10.1001/jama.2026.9631',
        title: 'Low Back Pain: A Review'
      },
      {
        author: 'O\'Sullivan P, Caneiro JP, O\'Keeffe M, et al.',
        year: '2018',
        journal: 'British Journal of Sports Medicine',
        doi: '10.1136/bjsports-2017-098563',
        title: 'Cognitive Functional Therapy: An Integrated Behavioral Approach for the Targeted Management of Disabling Low Back Pain'
      }
    ]
  }
];


