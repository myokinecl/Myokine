import type { Article } from '../data';

/**
 * Reflexiones de Lukas en BORRADOR.
 * No aparecen en el journal. Se ven solo en #/borradores mientras Lukas las revisa.
 * Para publicar una: cambiar `borrador: true` por `borrador: false` (o borrar la línea).
 */
export const BORRADORES: Article[] = [
  {
    id: 'r1',
    borrador: true,
    slug: 'reflexion-por-que-sigue-alta-la-incidencia-de-lesiones',
    title: 'Si tenemos mejores máquinas y más evidencia, ¿por qué seguimos lesionándonos tanto?',
    subtitle: 'Una reflexión sobre la distancia entre lo que sabemos y lo que pasa en la cancha.',
    categoryType: 'tematica',
    categoryValue: 'ciencias-deporte',
    categoryLabel: 'Ciencias del deporte',
    audience: 'ambos',
    date: '26 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 4,
    summary: 'Medimos más que nunca y aun así la incidencia de lesiones no baja como esperaríamos. Creo que el problema no está en los datos, sino en lo que dejamos fuera de ellos.',
    pullQuote: 'Medimos con mucha precisión una parte del problema y la confundimos con el problema completo.',
    content: `Hoy tenemos plataformas de fuerza, GPS, dinamómetros, sensores de sueño y más estudios publicados que nunca. Uno esperaría que las lesiones deportivas vinieran bajando de forma clara. No es lo que veo, ni en la consulta ni en los datos de muchos deportes.

Me he preguntado bastante por qué, y no tengo una respuesta cerrada. Tengo algunas ideas.

### Medimos lo que es fácil de medir

Durante años se buscó un número que predijera la lesión. La razón carga aguda:crónica fue uno de los más populares. Tim Gabbett la difundió como una forma de pensar la progresión, y tenía sentido: los saltos bruscos de carga son un problema. Pero después se mostró que ese número tiene problemas estadísticos y que nadie ha probado que ajustarlo reduzca lesiones.

Creo que pasa algo parecido con muchas tecnologías. Miden con mucha precisión una parte del problema, y terminamos confundiendo esa parte con el problema completo.

### La carga no es solo la del entrenamiento

Dos deportistas pueden tener exactamente la misma semana de entrenamiento. Uno duerme bien y está tranquilo. El otro está en exámenes, duerme cinco horas y tiene un conflicto en su casa. En el papel, el riesgo es el mismo. En la vida real, probablemente no.

El estrés, el sueño, el trabajo y lo que pasa fuera del deporte también cambian cómo el cuerpo tolera la carga. Y eso casi nunca entra en el software.

### La evidencia llega tarde y llega poco

Sabemos que los programas de prevención funcionan cuando se hacen. El problema es que muchas veces no se hacen, o se hacen mal, o se dejan a mitad de temporada. Lo que funciona en un estudio con un equipo motivado no siempre sobrevive al calendario real.

### Lo que sí creo

- Que la progresión gradual de la carga sigue siendo de lo más sólido que tenemos.
- Que la lesión previa es uno de los mejores predictores, y deberíamos tomarla más en serio.
- Que preguntar cómo duerme alguien y qué más está cargando esa semana vale tanto como cualquier métrica.
- Que la prevención es una conversación continua, no un protocolo que se aplica una vez.

No creo que la tecnología sea el problema. Creo que el problema es esperar que una máquina resuelva algo que depende mucho de personas, contextos y decisiones.

*Borrador para revisar. Ideas que quiero desarrollar: datos de incidencia en fútbol profesional en los últimos años, adherencia a programas de prevención (FIFA 11+), y mi experiencia en reintegro deportivo.*`,
    references: [
      {
        author: 'Gabbett TJ.',
        year: '2020',
        journal: 'British Journal of Sports Medicine, 54(1):58-66',
        doi: '10.1136/bjsports-2018-099784',
        title: 'Debunking the myths about training load, injury and performance: empirical evidence, hot topics and recommendations for practitioners'
      },
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
    id: 'r2',
    borrador: true,
    slug: 'reflexion-cuando-importa-la-biomecanica',
    title: '¿En qué paciente importa la biomecánica?',
    subtitle: 'No creo que la biomecánica sea irrelevante. Creo que la usamos en el lugar equivocado.',
    categoryType: 'tematica',
    categoryValue: 'rehabilitacion-razonamiento',
    categoryLabel: 'Razonamiento clínico',
    audience: 'clinico',
    date: '26 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 4,
    summary: 'La biomecánica sirve poco para explicar el dolor de alguien con años de síntomas. Sirve bastante más para progresar la carga de un tendón o para volver a un gesto deportivo.',
    pullQuote: 'La pregunta no es si la biomecánica importa, sino para qué decisión la estoy usando.',
    content: `En la formación aprendemos mucha biomecánica, y después llegamos a la clínica a escuchar que "la postura no importa" o que "la alineación no predice el dolor". Las dos cosas pueden ser ciertas a la vez, y creo que vale la pena ordenarlas.

### Donde la biomecánica explica poco

Una escápula que se mueve distinto, una rodilla que se va hacia adentro al bajar o una curva lumbar más marcada se encuentran en muchísimas personas sin dolor. Usarlas como la causa del dolor de alguien con meses o años de síntomas suele explicar poco, y además puede dejarle la idea de que su cuerpo está "mal armado".

Tampoco funcionan bien como pruebas para predecir quién se va a lesionar. Que algo se asocie con lesiones en un grupo grande no significa que sirva para predecir lo que le va a pasar a una persona.

### Donde sí me sirve

**Cuando necesito dosificar carga en un tejido concreto.** En un tendón de Aquiles o rotuliano, saber qué ejercicio carga más o menos ese tendón me ayuda a progresar. En una tendinopatía glútea o isquiotibial, entender cuándo se comprime el tendón cambia lo que indico.

**Cuando hay un gesto deportivo que volver a construir.** En el reintegro, la técnica de aterrizaje, cambio de dirección o carrera sí importa, porque es lo que la persona va a hacer miles de veces.

**Cuando hay una cirugía o una estructura que proteger.** Después de una reconstrucción de ligamento cruzado, por ejemplo, la biomecánica guía qué cargas son razonables en cada etapa.

**Cuando la persona rinde menos de lo que quiere.** En rendimiento, pequeñas diferencias de técnica pueden importar mucho.

### Cómo lo pienso hoy

La pregunta no es si la biomecánica importa, sino **para qué decisión la estoy usando**. Si es para explicar por qué duele, casi siempre me quedo corto. Si es para decidir cómo cargar, progresar o volver a un gesto, me sirve bastante.

Y en todos los casos intento cuidar cómo lo cuento. Una cosa es decir "vamos a trabajar este movimiento porque lo vas a necesitar en tu deporte", y otra muy distinta es decir "te duele porque te mueves mal".

*Borrador para revisar. Me gustaría sumar un caso clínico mío (por ejemplo, un deportista en reintegro) y alguna referencia sobre biomecánica y predicción de lesiones.*`,
    references: [
      {
        author: 'Bahr R.',
        year: '2016',
        journal: 'British Journal of Sports Medicine, 50(13):776-780',
        doi: '10.1136/bjsports-2016-096256',
        title: 'Why screening tests to predict injury do not work—and probably never will…: a critical review'
      },
      {
        author: 'Mellor R, Bennell K, Grimaldi A, et al.',
        year: '2018',
        journal: 'BMJ',
        doi: '10.1136/bmj.k1662',
        title: 'Education plus exercise versus corticosteroid injection use versus a wait and see approach on global outcome and pain from gluteal tendinopathy'
      }
    ]
  },
  {
    id: 'r3',
    borrador: true,
    slug: 'reflexion-explicar-el-dolor-a-ninos',
    title: '¿Cómo le explico el dolor a un niño?',
    subtitle: 'Notas sobre cómo caracterizar, explicar y aterrizar el dolor en pacientes pediátricos, y sobre lo que todavía no sé hacer bien.',
    categoryType: 'tematica',
    categoryValue: 'dolor-persistente',
    categoryLabel: 'Dolor persistente y neurociencia',
    audience: 'clinico',
    date: '26 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 4,
    summary: 'Los recursos de educación en dolor están pensados para adultos. Con niños, el lenguaje, los ejemplos y el rol de los padres cambian casi todo.',
    pullQuote: 'Antes de explicarle qué es el dolor, quiero saber qué cree él que es.',
    content: `Cuando atiendo a un niño con dolor, me doy cuenta de que casi todo lo que sé sobre educación en dolor lo aprendí pensando en adultos. Y no funciona igual.

### Partir por lo que el niño ya cree

Joshua Pate y su equipo encuestaron a expertos en dolor pediátrico sobre algo que llaman el **concepto de dolor del niño**: cómo entiende qué es el dolor, para qué sirve y qué pasa en el cuerpo cuando duele. Los expertos coincidieron en que evaluarlo es importante y útil. También encontraron que las preguntas que usamos con adultos sirven en contenido, pero son demasiado complejas para niños de 8 a 12 años.

Eso me dejó una idea práctica: antes de explicarle qué es el dolor, quiero saber qué cree él que es. A veces la respuesta sorprende. "Me duele porque tengo algo malo adentro", "porque me porté mal", "porque el doctor dijo que mi rodilla está mala".

### Cómo intento caracterizarlo

- **Con sus palabras:** ¿cómo es? ¿te pincha, te aprieta, te quema?
- **Con escalas visuales** según la edad, como caras o colores.
- **Con lo que deja de hacer:** ¿qué te gustaría hacer y hoy no puedes? Eso me dice más que un número.
- **Con los padres, pero no solo con ellos.** Les pregunto a ambos, por separado si se puede.

### Cómo intento explicarlo

Uso ejemplos de su mundo. El dolor como una alarma que se puso muy sensible, como la de un auto que suena cuando pasa un gato. Un sistema que protege, no uno que avisa que algo se está dañando. Y luego, experiencias: movernos y ver que no pasa nada malo.

Hannah Robins y colaboradores, en una revisión sobre educación en neurociencia del dolor en pediatría, recuerdan que el tratamiento del dolor persistente muchas veces va en contra de la intuición (más movimiento en vez de reposo), y por eso **explicar bien el porqué es clave para que el niño y sus padres se comprometan**.

### El rol de los padres

Con niños, trato a la familia completa. Si los padres sienten miedo cada vez que el niño se queja, el niño aprende que el dolor es peligroso. Si entienden qué está pasando, pueden acompañar de otra forma.

### Lo que todavía no sé

Me cuesta encontrar el equilibrio entre tomar en serio el dolor y no darle más protagonismo del que merece. Y la evidencia en pediatría todavía es escasa. Esto es más una forma de trabajar que estoy construyendo que una receta.

*Borrador para revisar. Me gustaría sumar ejemplos concretos que uso en consulta y alguna metáfora que me haya funcionado con niños.*`,
    references: [
      {
        author: 'Pate JW, Hush JM, Hancock MJ, Moseley GL, Butler DS, Simons LE, Pacey V.',
        year: '2018',
        journal: 'Children, 5(1):12',
        doi: '10.3390/children5010012',
        title: "A Child's Concept of Pain: An International Survey of Pediatric Pain Experts"
      },
      {
        author: 'Robins H, Perron V, Heathcote LC, Simons LE.',
        year: '2016',
        journal: 'Children, 3(4):43',
        doi: '10.3390/children3040043',
        title: 'Pain Neuroscience Education: State of the Art and Application in Pediatrics'
      }
    ]
  },
  {
    id: 'r4',
    borrador: true,
    slug: 'reflexion-siempre-le-duele-algo-pero-funciona',
    title: '¿Qué hago con el paciente que siempre tiene algún dolor, pero funciona bien?',
    subtitle: 'No todo dolor es un problema que resolver. A veces el trabajo es ayudar a convivir con él sin que ocupe tanto espacio.',
    categoryType: 'tematica',
    categoryValue: 'dolor-persistente',
    categoryLabel: 'Dolor persistente y neurociencia',
    audience: 'ambos',
    date: '26 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 4,
    summary: 'Hay personas que siempre traen una molestia nueva, pero entrenan, trabajan y viven bien. Perseguir cada dolor puede hacer más daño que ayudar.',
    pullQuote: 'Cuando el dolor no limita la vida de alguien, mi trabajo quizás no es eliminarlo, sino quitarle importancia.',
    content: `Todos tenemos a ese paciente. Un día es el hombro, otra semana la rodilla, después la espalda. Entrena, trabaja, hace su vida. Pero cada sesión empieza con "hoy me duele acá".

Durante un tiempo sentía que tenía que resolver cada una de esas molestias. Hoy lo veo distinto.

### El dolor no siempre es una señal de daño

La definición actual de la Asociación Internacional para el Estudio del Dolor lo describe como una experiencia sensorial y emocional desagradable asociada, o parecida a la asociada, con un daño real o potencial. Esa palabra, "parecida", importa: el dolor puede aparecer sin que haya un tejido dañado. Y los mismos autores aclaran que el dolor y la nocicepción son cosas distintas.

En muchas personas activas, las molestias que van y vienen son parte de tener un cuerpo que se usa.

### Lo que puede pasar si persigo cada dolor

- La persona aprende que cada molestia necesita atención profesional.
- Empieza a vigilar más su cuerpo, y vigilarlo más suele hacer que lo note más.
- Pierde confianza en su propia capacidad de manejarlo.

Sin querer, puedo convertir algo pequeño en algo central.

### Lo que intento hacer

**Primero, descartar lo que sí importa.** Si aparece algo con señales de alarma o que cambia su función, lo evalúo con cuidado.

**Después, mirar la función.** Si entrena, duerme y vive bien, se lo hago notar. "Te duele, y aun así hiciste todo esto esta semana."

**Normalizar sin minimizar.** No le digo que no es nada. Le digo que es frecuente, que entiendo que moleste y que no parece ser una señal de que algo se esté dañando.

**Darle herramientas propias.** Qué hacer cuando aparece, cuándo vale la pena consultar y cuándo no.

**Preguntar qué hay detrás.** A veces el dolor que siempre está es también una forma de hablar de estrés, cansancio o preocupación. No siempre, pero vale la pena preguntarlo.

### Lo que me cuesta

No quiero que se sienta ignorado. El equilibrio entre tomar en serio lo que cuenta y no alimentar la vigilancia es fino, y no siempre lo logro.

*Borrador para revisar. Me gustaría agregar cómo lo converso en la práctica, con frases que uso, y si hay evidencia sobre hipervigilancia y consultas frecuentes.*`,
    references: [
      {
        author: 'Raja SN, Carr DB, Cohen M, et al.',
        year: '2020',
        journal: 'Pain, 161(9):1976-1982',
        doi: '10.1097/j.pain.0000000000001939',
        title: 'The revised International Association for the Study of Pain definition of pain: concepts, challenges, and compromises'
      }
    ]
  },
  {
    id: 'r5',
    borrador: true,
    slug: 'reflexion-realmente-necesitamos-una-imagen',
    title: '¿Realmente necesitamos una imagen?',
    subtitle: 'Lo que aprendí de una charla de Rod Whiteley y de la evidencia sobre hallazgos en personas sin dolor.',
    categoryType: 'tematica',
    categoryValue: 'rehabilitacion-razonamiento',
    categoryLabel: 'Razonamiento clínico',
    audience: 'ambos',
    date: '26 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 4,
    summary: 'La imagen encuentra algo en casi todos, cambia poco lo que hacemos y no ve donde ocurren muchas lesiones. Eso no la hace inútil, pero sí menos necesaria de lo que creemos.',
    pullQuote: 'La pregunta no es qué muestra la imagen, sino qué haría distinto si la tuviera.',
    content: `Es de las preguntas que más me hacen: "¿no debería hacerme una resonancia?". Y entiendo por qué. Una imagen se siente concreta, objetiva, como si por fin fuéramos a ver qué pasa.

Rod Whiteley, del Aspetar en Qatar, dio una charla que se llamaba justamente así: *¿realmente necesitamos la imagen?* Me dejó varias ideas que quiero ordenar.

### La imagen encuentra algo en casi todos

Entre un 67% y un 100% de las personas sin síntomas tiene algún hallazgo en imágenes de columna, cadera, rodilla, tobillo u hombro, según la zona y la edad. En la columna lumbar, por ejemplo, la mayoría de las personas de 50 años sin dolor tiene cambios en sus discos.

Si casi todos tienen algo, encontrar algo no nos dice mucho sobre por qué le duele a esta persona.

### Cambia poco lo que hacemos

Whiteley mostraba datos en que la imagen cambiaba el manejo en muy pocos casos, cerca de un 1%. Y en lesiones musculares de isquiotibiales, los tiempos de retorno según los grados de la resonancia se superponen tanto que el grado no permite saber cuánto va a tardar una persona.

### No ve donde ocurre la lesión

Una lesión muscular por estiramiento ocurre a nivel de fibras, de alrededor de 0,1 mm. Ninguna resonancia en una persona viva tiene esa resolución. Lo que vemos es una consecuencia, no la lesión misma.

### Lo que sí funciona

Según Whiteley, la historia, el examen y la respuesta a la carga dicen más. En isquiotibiales, por ejemplo, cómo se reduce el área dolorosa a la palpación y cómo se recupera la fuerza excéntrica orientan mejor que la imagen. Y la pregunta diaria es simple: ¿hoy está igual, mejor o peor?

### Cuándo sí la pediría

- Si sospecho algo grave: fractura, infección, tumor o un compromiso neurológico que avanza.
- Si no hay respuesta a un buen tratamiento después de un tiempo razonable.
- Si el resultado va a cambiar lo que voy a hacer, por ejemplo, ante una posible cirugía.

### Cómo lo converso

Intento no decir "no la necesitas" a secas. Prefiero explicar qué esperamos encontrar, por qué probablemente no cambiaría el plan y qué señales nos harían pedirla. La pregunta que me guía es: **¿qué haría distinto si tuviera esa imagen?**

*Borrador para revisar. Me gustaría sumar el costo de los hallazgos incidentales para el paciente (miedo, etiquetas) y alguna experiencia propia.*`,
    references: [
      {
        author: 'Brinjikji W, Luetmer PH, Comstock B, et al.',
        year: '2015',
        journal: 'American Journal of Neuroradiology, 36(4):811-816',
        doi: '10.3174/ajnr.A4173',
        title: 'Systematic literature review of imaging features of spinal degeneration in asymptomatic populations'
      },
      {
        author: 'Lin I, Wiles L, Waller R, et al.',
        year: '2020',
        journal: 'British Journal of Sports Medicine, 54(2):79-86',
        doi: '10.1136/bjsports-2018-099878',
        title: 'What does best practice care for musculoskeletal pain look like? Eleven consistent recommendations from high-quality clinical practice guidelines: systematic review'
      },
      {
        author: 'Whiteley R.',
        year: '2025',
        journal: 'Charla, SportFisioWiss',
        title: 'Do we really need imaging?'
      }
    ]
  },
  {
    id: 'r6',
    borrador: true,
    slug: 'reflexion-que-es-una-lesion',
    title: '¿Qué es una lesión? Depende de a quién le preguntes',
    subtitle: 'Para un deportista, estar lesionado a veces no tiene que ver con un diagnóstico, sino con no poder rendir como quiere.',
    categoryType: 'tematica',
    categoryValue: 'retorno-deporte',
    categoryLabel: 'Retorno al deporte (RTS)',
    audience: 'ambos',
    date: '26 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 4,
    summary: 'Médicos, entrenadores y deportistas no definen la lesión de la misma forma. Si no lo conversamos, cada uno trabaja con una idea distinta del problema.',
    pullQuote: 'Para muchos deportistas, la lesión empieza cuando ya no pueden rendir como quieren, no cuando aparece un diagnóstico.',
    content: `Parece una pregunta obvia, pero no lo es. ¿Cuándo está lesionado alguien?

Para un estudio epidemiológico, puede ser cuando pierde al menos un día de entrenamiento. Para un médico, cuando hay un diagnóstico. Para un entrenador, cuando no está disponible para jugar. Y para el deportista, muchas veces, **cuando ya no puede rendir como quiere**, aunque siga entrenando.

### Lo que dicen los propios deportistas

Caroline Bolling y su equipo entrevistaron a deportistas de élite, entrenadores y kinesiólogos sobre cómo entienden una lesión. Lo que encontraron es que la percepción va mucho más allá del daño físico. Para los deportistas, la lesión se relaciona con no poder rendir, con lo que significa para su carrera y con cómo se sienten. Hay deportistas que entrenan con dolor y no se consideran lesionados, y otros que sin un diagnóstico claro sienten que sí lo están.

### Por qué importa en la consulta

Si yo pienso que el problema es un tendón y el deportista piensa que el problema es que no salta como antes, podemos estar trabajando para objetivos distintos sin darnos cuenta.

Por eso intento preguntar:

- ¿Qué significa para ti estar lesionado?
- ¿Qué te gustaría poder hacer que hoy no puedes?
- ¿Cuándo sentirías que ya estás bien?

Las respuestas me dicen hacia dónde va el tratamiento mucho más que el diagnóstico.

### También en la prevención

Si solo contamos como lesión lo que hace perder días, nos perdemos muchas molestias que limitan el rendimiento y que podrían ser el inicio de algo más. Por eso cada vez se usan más registros que incluyen también los problemas que afectan el rendimiento sin sacar al deportista de la cancha.

### Lo que me deja

No hay una única definición correcta. Pero sí creo que hay que hacerla explícita con cada persona, porque define qué vamos a considerar éxito.

*Borrador para revisar. Me gustaría agregar ejemplos de mis pacientes y comparar con definiciones de consenso usadas en epidemiología.*`,
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
    id: 'r7',
    borrador: true,
    slug: 'reflexion-honestidad-con-la-evidencia',
    title: 'Por qué prefiero ser honesto con lo que no sabemos',
    subtitle: 'Muchas veces la evidencia no da respuestas definitivas y las diferencias entre tratamientos son pequeñas. Decirlo así le devuelve a la persona la libertad de elegir.',
    categoryType: 'tematica',
    categoryValue: 'rehabilitacion-razonamiento',
    categoryLabel: 'Razonamiento clínico',
    audience: 'ambos',
    date: '26 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 4,
    summary: 'Veo mucha seguridad frente a la cámara. Yo prefiero contar lo que dice la evidencia, incluidas sus dudas, para que cada persona elija con libertad con quién atenderse.',
    pullQuote: 'Si los tratamientos se parecen tanto en promedio, lo honesto es decirlo y dejar que la persona elija.',
    content: `Veo a muchas personas hablando frente a una cámara con mucha seguridad. Serios, ortodoxos, especialistas. Tienen la respuesta para todo, y casi siempre su método es el mejor.

Respeto ese trabajo, pero no me siento cómodo comunicando así. Y quiero explicar por qué.

### Lo que la evidencia dice muchas veces

Jared Powell, Amy McDevitt y Chad Cook publicaron en 2026 en el *JOSPT* un artículo sobre lo que llaman **pluralismo terapéutico**. Su punto de partida es incómodo: después de décadas de investigación, **no se ha encontrado un tratamiento que sea consistentemente superior** para el dolor musculoesquelético. El ejercicio y la terapia manual, por ejemplo, muestran efectos modestos y bastante parecidos en promedio, probablemente porque comparten mecanismos que no son tan específicos como creemos.

Al mismo tiempo, las personas responden de formas muy distintas. Lo que en promedio se parece, en cada individuo puede variar mucho.

### Qué proponen

Aceptar un rango acotado de opciones que sean seguras, plausibles y basadas en evidencia. Dentro de ese rango, distintos profesionales pueden trabajar con distintos enfoques, **siempre que lo comuniquen con transparencia** y que se alinee con los valores, metas y preferencias de la persona.

### Por qué me hace sentido

Porque es honesto. Si las diferencias entre tratamientos razonables son pequeñas, decir que mi método es el único que funciona no es verdad. Y prefiero que la persona sepa eso.

Ser honesto también significa decir cosas como:

- "La evidencia no tiene una respuesta definitiva para esto."
- "Hay varias opciones que podrían funcionar; esta es la que te propongo y por qué."
- "Si no avanzamos, hay otras alternativas."

### Elegir con libertad

Lo que más me importa es esto: que la persona elija con quién atenderse con información real, no por quién parece más seguro en un video. Si después de entender lo que sabemos y lo que no, decide atenderse conmigo, genial. Si decide otra cosa, también está bien.

Creo que esa honestidad no le quita valor a lo que hacemos. Al contrario: la confianza que se construye sin prometer certezas es más sólida.

### Lo que no significa

No significa que todo valga. Hay tratamientos sin respaldo, otros que pueden hacer daño y otros que generan dependencia. El pluralismo tiene límites. Y tampoco significa no tener opinión: tengo una forma de trabajar y la defiendo, pero no la presento como la única verdad.

*Borrador para revisar. Me gustaría escribir esto en un tono más personal, con por qué empecé MyoKine.*`,
    references: [
      {
        author: 'Powell JK, McDevitt A, Cook C.',
        year: '2026',
        journal: 'Journal of Orthopaedic & Sports Physical Therapy',
        doi: '10.2519/jospt.2026.13992',
        title: 'Many Paths to Recovery: The Case for Treatment Pluralism'
      },
      {
        author: 'Lin I, Wiles L, Waller R, et al.',
        year: '2020',
        journal: 'British Journal of Sports Medicine, 54(2):79-86',
        doi: '10.1136/bjsports-2018-099878',
        title: 'What does best practice care for musculoskeletal pain look like? Eleven consistent recommendations from high-quality clinical practice guidelines: systematic review'
      }
    ]
  }
];
