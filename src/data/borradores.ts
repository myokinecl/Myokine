import type { Article } from '../data';

/**
 * Reflexiones de Lukas en BORRADOR.
 * No aparecen en el journal. Se ven solo en #/borradores mientras Lukas las revisa.
 * Para publicar una: borrar la línea `borrador: true`.
 */
export const BORRADORES: Article[] = [
  {
    id: 'r8',
    borrador: true,
    slug: 'reflexion-si-el-sistema-nervioso-pudiera-hablar',
    title: 'Si el sistema nervioso pudiera hablar, seríamos más humildes',
    subtitle: 'Sobre lo poco que entendemos del cuerpo, lo rápido que cambian nuestras certezas y el momento de la historia en que nos tocó estudiarlo.',
    categoryType: 'tematica',
    categoryValue: 'rehabilitacion-razonamiento',
    categoryLabel: 'Razonamiento clínico',
    audience: 'ambos',
    date: '27 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 4,
    summary: 'Explicamos con mucha seguridad lo que le pasa a un cuerpo que apenas empezamos a entender. Cada década cambia lo que creemos importante, y eso debería hacernos más cuidadosos con lo que afirmamos.',
    pullQuote: 'Si el sistema nervioso pudiera escucharnos explicar lo que le pasa, probablemente se reiría un poco.',
    content: `Hay una idea que me ronda hace tiempo y que me gusta decir medio en broma: si el sistema nervioso pudiera escucharnos mientras explicamos lo que le pasa, y respondernos con palabras, seríamos bastante más humildes.

Lo pienso cada vez que me escucho explicando un dolor con mucha seguridad. "Es el tendón." "Es la postura." "Es que el sistema nervioso está sensibilizado." Puede que algo de eso sea cierto, pero casi siempre es una versión muy simplificada de lo que realmente ocurre. Estamos hablando del sistema más complejo que conocemos, que integra lo que sentimos, lo que recordamos, lo que esperamos y lo que hacemos, todo al mismo tiempo. Pretender resumirlo en una frase de consulta tiene algo de ingenuo.

No soy el primero en pensar algo parecido. Hay una frase que se atribuye al físico Emerson Pugh, alrededor de 1938, y que dice más o menos así: si el cerebro humano fuera tan simple que pudiéramos entenderlo, nosotros seríamos tan simples que no podríamos. Su hijo, George Pugh, la publicó en un libro de 1977 y contó que venía de su padre. Me gusta porque dice lo mismo desde otro ángulo: el instrumento con el que intentamos entender el cuerpo es parte del mismo cuerpo que queremos entender.

Esto no significa que no sepamos nada. Hay muchísima evidencia que respalda lo que hacemos en salud y deporte, y la uso todos los días. Pero hay una diferencia entre decir "esto es lo que sabemos hoy" y decir "esto es lo que pasa". La primera frase deja espacio para aprender. La segunda lo cierra.

Basta mirar unas décadas hacia atrás. Durante mucho tiempo, la recomendación de ejercicio para la salud fue casi solo aeróbica: correr, nadar, andar en bicicleta. La primera declaración del American College of Sports Medicine, en 1978, hablaba de capacidad cardiorrespiratoria y composición corporal, y recién en 1990 sumó el entrenamiento de fuerza. Después vino una época en que la fuerza pasó a estar en el centro, cuando entendimos que el músculo también funciona como un órgano que se comunica con el resto del cuerpo. Hoy hablamos de longevidad, de VO2máx y de fuerza como predictores de cuántos años vamos a vivir y en qué condiciones.

Cada una de esas etapas tuvo algo de razón, y cada una dejó cosas fuera. No creo que estemos en el final de esa historia. Creo que estamos en un punto bastante temprano.

Si lo pienso en perspectiva, llevamos muy poco tiempo estudiando el cuerpo con método científico, comparado con todo el tiempo que llevamos existiendo como especie. Me pregunto qué van a pensar de nosotros en 50 años. Probablemente algunas de las cosas que hoy defendemos con convicción les parezcan tan incompletas como a nosotros nos parecen ciertas ideas de hace 50 años.

Para mí, esto tiene consecuencias bien concretas en la consulta. Intento explicar lo que creo que está pasando, pero dejando claro que es una hipótesis razonable, no una verdad cerrada. Intento no prometer certezas que no tengo. Y cuando un paciente me pregunta algo que no sé, prefiero decirle que no lo sé, o que la evidencia todavía no lo tiene claro, antes que inventar una explicación que suene bien.

Creo que esa humildad no le quita valor a lo que hacemos. Al contrario, nos obliga a mirar con más atención a la persona que tenemos al frente, que al final es la que mejor nos puede contar cómo le está yendo.`,
    references: [
      {
        author: 'Pugh GE.',
        year: '1977',
        journal: 'Basic Books, Nueva York (cap. 7, p. 154)',
        title: 'The Biological Origin of Human Values'
      },
      {
        author: 'Garber CE, Blissmer B, Deschenes MR, et al.',
        year: '2011',
        journal: 'Medicine & Science in Sports & Exercise, 43(7):1334-1359',
        doi: '10.1249/MSS.0b013e318213fefb',
        title: 'Quantity and quality of exercise for developing and maintaining cardiorespiratory, musculoskeletal, and neuromotor fitness in apparently healthy adults: guidance for prescribing exercise'
      },
      {
        author: 'Pedersen BK, Febbraio MA.',
        year: '2012',
        journal: 'Nature Reviews Endocrinology, 8(8):457-465',
        doi: '10.1038/nrendo.2012.49',
        title: 'Muscles, exercise and obesity: skeletal muscle as a secretory organ'
      }
    ]
  },
  {
    id: 'r1',
    borrador: true,
    slug: 'reflexion-por-que-sigue-alta-la-incidencia-de-lesiones',
    title: 'Si tenemos mejores máquinas y más evidencia, ¿por qué seguimos lesionándonos tanto?',
    subtitle: 'Sobre la distancia entre lo que sabemos medir y lo que realmente pasa en la vida de un deportista.',
    categoryType: 'tematica',
    categoryValue: 'ciencias-deporte',
    categoryLabel: 'Ciencias del deporte',
    audience: 'ambos',
    date: '27 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 4,
    summary: 'Hoy medimos más que nunca y, aun así, las lesiones no bajan como esperaríamos. Creo que parte del problema está en lo que queda fuera de los datos.',
    pullQuote: 'Medimos con mucha precisión una parte del problema y a veces la confundimos con el problema completo.',
    content: `Hoy un equipo profesional puede tener plataformas de fuerza, GPS, dinamómetros, sensores de sueño y un software que integra todo. Se publican más estudios sobre prevención de lesiones que nunca. Con todo eso, uno esperaría que las lesiones vinieran bajando de forma clara año a año. No es lo que veo en la consulta, y tampoco es lo que muestran muchos deportes.

No tengo una respuesta cerrada, pero sí algunas ideas que quiero ordenar.

La primera es que tendemos a medir lo que es fácil de medir. Durante varios años se buscó un número que anticipara la lesión, y uno de los más populares fue la razón entre la carga aguda y la crónica. Tim Gabbett la difundió como una forma de pensar la progresión del entrenamiento, y la idea de fondo tenía mucho sentido: los aumentos bruscos de carga son un problema. Con el tiempo, otros investigadores mostraron que ese número tiene problemas estadísticos y que nadie ha demostrado que ajustarlo reduzca las lesiones. Creo que pasa algo parecido con muchas tecnologías. Miden con mucha precisión una parte del problema, y a veces terminamos confundiendo esa parte con el problema completo.

La segunda idea es que la carga no es solo la del entrenamiento. Pienso en dos deportistas con exactamente la misma semana en el papel. Uno duerme bien y está tranquilo. El otro está en época de exámenes, duerme cinco horas y tiene un problema en su casa. Para el software, el riesgo es el mismo. En la vida real, probablemente no. El sueño, el estrés, el trabajo y lo que pasa fuera de la cancha también influyen en cuánto tolera el cuerpo, y casi nunca aparecen en un gráfico.

La tercera tiene que ver con la distancia entre los estudios y la práctica. Sabemos que los programas de prevención funcionan cuando se hacen bien y de forma constante. El problema es que muchas veces no se hacen, se hacen a medias o se abandonan a mitad de temporada porque el calendario aprieta. Lo que funciona en un estudio con un equipo motivado no siempre sobrevive a un campeonato real.

También pienso que hay algo de expectativa irreal. Una parte de las lesiones viene con el deporte mismo, sobre todo en deportes de contacto o de alta velocidad. Ninguna tecnología va a llevar ese riesgo a cero, y quizás no sea justo medir nuestro trabajo con esa vara.

Lo que sí sigo creyendo es que la progresión gradual de la carga es de lo más sólido que tenemos. Que haber tenido una lesión antes es uno de los mejores predictores de tener otra, y que deberíamos tomarlo más en serio en el retorno. Y que preguntarle a un deportista cómo durmió y qué más está cargando esa semana vale tanto como cualquier métrica.

No creo que la tecnología sea el problema. El problema aparece cuando esperamos que una máquina resuelva algo que depende mucho de personas, de contextos y de decisiones que se toman todos los días.`,
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
    subtitle: 'No creo que la biomecánica sea irrelevante. Creo que muchas veces la usamos para responder la pregunta equivocada.',
    categoryType: 'tematica',
    categoryValue: 'rehabilitacion-razonamiento',
    categoryLabel: 'Razonamiento clínico',
    audience: 'clinico',
    date: '27 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 4,
    summary: 'La biomecánica explica poco el dolor de alguien con años de síntomas, pero ayuda mucho a decidir cómo cargar un tendón o cómo volver a un gesto deportivo.',
    pullQuote: 'La pregunta no es si la biomecánica importa, sino para qué decisión la estoy usando.',
    content: `En la universidad aprendemos mucha biomecánica: ejes, palancas, ángulos, momentos de fuerza. Después llegamos a la clínica y escuchamos que la postura no importa, que la alineación no predice el dolor y que no hay que corregir cómo se mueve la gente. Durante un tiempo sentí que una de las dos cosas tenía que estar mal. Hoy creo que ambas pueden ser ciertas, dependiendo de para qué usemos la biomecánica.

Donde me parece que explica poco es en el dolor persistente. Una escápula que se mueve distinto, una rodilla que se va hacia adentro al bajar un escalón o una curva lumbar más marcada aparecen en muchísimas personas que no tienen ningún dolor. Si a alguien con dos años de dolor lumbar le digo que le duele por cómo se agacha, probablemente le estoy dando una explicación incompleta y, además, le dejo la idea de que su cuerpo está mal armado. Esa idea puede hacer que se mueva con más miedo, que es justamente lo contrario de lo que quiero.

Tampoco funciona bien para predecir lesiones. Roald Bahr lo explicó hace años: que un factor se asocie con más lesiones en un grupo grande no significa que sirva para anticipar qué le va a pasar a una persona en particular. Por eso las pruebas de detección que prometen identificar al deportista que se va a lesionar han dado resultados tan pobres.

Donde la biomecánica sí me sirve, y mucho, es cuando tengo que decidir cómo cargar un tejido. En una tendinopatía de Aquiles o rotuliana, saber qué ejercicio carga más o menos ese tendón me permite progresar con criterio. En el dolor lateral de cadera o en el glúteo profundo, entender en qué posiciones se comprime el tendón cambia por completo lo que le indico a la persona, desde cómo se sienta hasta cómo duerme.

También me sirve en el reintegro deportivo. Cuando alguien vuelve a correr, a saltar o a cambiar de dirección, la técnica importa, porque es un gesto que va a repetir miles de veces. Lo mismo después de una cirugía, como una reconstrucción de ligamento cruzado, donde la biomecánica ayuda a decidir qué cargas son razonables en cada etapa. Y en el rendimiento, pequeñas diferencias técnicas pueden marcar diferencias grandes en el resultado.

Por eso hoy me hago una pregunta antes de usar la biomecánica en una explicación: ¿para qué decisión la estoy usando? Si es para explicar por qué duele, casi siempre me quedo corto. Si es para decidir cómo cargar, cómo progresar o cómo volver a un gesto, suele ser muy útil.

Y en ambos casos intento cuidar cómo lo digo. No es lo mismo decirle a alguien que vamos a entrenar un movimiento porque lo va a necesitar en su deporte, que decirle que le duele porque se mueve mal. La primera frase invita a trabajar. La segunda suele dejar miedo.`,
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
        journal: 'BMJ, 361:k1662',
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
    subtitle: 'Casi todo lo que sé sobre educación en dolor lo aprendí pensando en adultos. Con niños, eso no basta.',
    categoryType: 'tematica',
    categoryValue: 'dolor-persistente',
    categoryLabel: 'Dolor persistente y neurociencia',
    audience: 'clinico',
    date: '27 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 4,
    summary: 'Antes de explicarle a un niño qué es el dolor, me sirve saber qué cree él que es. Después vienen las palabras de su mundo, la familia y, sobre todo, la experiencia de moverse.',
    pullQuote: 'Antes de explicarle qué es el dolor, quiero saber qué cree él que es.',
    content: `Cuando atiendo a un niño con dolor me doy cuenta de lo poco preparado que estoy para hacerlo. Casi todo lo que aprendí sobre educación en dolor viene de estudios y materiales pensados para adultos, y con un niño de nueve años las mismas palabras no funcionan.

Me ayudó mucho un estudio de Joshua Pate y su equipo, que encuestaron a expertos en dolor pediátrico sobre lo que llaman el concepto de dolor del niño, es decir, cómo entiende qué es el dolor, para qué sirve y qué pasa en su cuerpo cuando le duele. Casi todos los expertos estuvieron de acuerdo en que evaluarlo es importante. También coincidieron en que las preguntas que usamos con adultos sirven en contenido, pero están escritas de una forma demasiado compleja para niños de entre 8 y 12 años.

De ahí saqué algo muy práctico. Antes de explicarle a un niño qué es el dolor, le pregunto qué cree él que es. Las respuestas a veces sorprenden: que le duele porque tiene algo malo adentro, porque se portó mal o porque el doctor dijo que su rodilla estaba mala. Si no conozco esa idea, cualquier explicación mía corre el riesgo de pasar por encima de ella sin cambiarla.

Para entender cómo es su dolor, intento usar sus palabras. Le pregunto si le pincha, si le aprieta o si le quema, y según la edad uso caras o colores en vez de números. Pero lo que más información me da es preguntarle qué le gustaría hacer y hoy no puede. Que no pueda jugar a la pelota en el recreo me dice mucho más que un 6 de 10.

Para explicar, uso ejemplos de su mundo. Le digo que el dolor funciona como una alarma que nos protege, y que a veces esa alarma se pone muy sensible, como la de un auto que suena cuando pasa un gato. La alarma es real y suena fuerte, pero no siempre significa que haya un peligro. Después de la explicación viene lo más importante, que es moverse y comprobar que no pasa nada malo. Con niños, una buena experiencia convence más que cualquier dibujo.

Hannah Robins y sus colegas lo plantean bien en una revisión sobre educación en neurociencia del dolor en pediatría. El tratamiento del dolor persistente muchas veces va contra la intuición, porque se indica más movimiento en vez de reposo. Por eso, explicar bien el porqué es clave para que el niño y sus padres se comprometan con el plan.

Y con los padres pasa algo especial. Si cada vez que el niño se queja la mamá o el papá se asustan, el niño aprende que el dolor es peligroso. Si entienden lo que está pasando, pueden acompañar de otra manera, con calma y sin dejar de tomarlo en serio. Por eso trato de explicarle a toda la familia, y a veces pregunto por separado al niño y a los padres, porque no siempre cuentan lo mismo.

Lo que más me cuesta es encontrar el equilibrio entre tomar en serio el dolor y no darle más protagonismo del que merece. La evidencia en pediatría todavía es escasa, así que esto es más una forma de trabajar que estoy construyendo que una receta.`,
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
    title: '¿Qué hago con el paciente al que siempre le duele algo, pero funciona bien?',
    subtitle: 'No todo dolor es un problema que haya que resolver. A veces el trabajo es ayudar a que ocupe menos espacio.',
    categoryType: 'tematica',
    categoryValue: 'dolor-persistente',
    categoryLabel: 'Dolor persistente y neurociencia',
    audience: 'ambos',
    date: '27 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 4,
    summary: 'Hay personas que siempre traen una molestia nueva, pero entrenan, trabajan y viven bien. Perseguir cada dolor puede hacer más mal que bien.',
    pullQuote: 'Cuando el dolor no limita la vida de alguien, quizás mi trabajo no es eliminarlo, sino quitarle importancia.',
    content: `Todos los que trabajamos en esto tenemos a ese paciente. Un día le duele el hombro, la semana siguiente la rodilla y después la espalda. Entrena, trabaja y hace su vida con normalidad, pero cada sesión empieza con un "hoy me duele acá".

Durante un tiempo sentí que tenía que resolver cada una de esas molestias. Buscaba la causa, ajustaba el ejercicio y trataba la zona. Con los meses me di cuenta de que eso no siempre ayudaba, y que a veces incluso empeoraba las cosas.

Una de las ideas que más me ordenó fue la definición actual de dolor de la Asociación Internacional para el Estudio del Dolor. La describe como una experiencia sensorial y emocional desagradable, asociada o parecida a la que se asocia con un daño real o potencial. Esa palabra, "parecida", es importante, porque reconoce que puede haber dolor sin que haya un tejido dañado. Las notas que acompañan la definición agregan que el dolor y la nocicepción son fenómenos distintos, y que el dolor siempre es una experiencia personal influida por factores biológicos, psicológicos y sociales.

En personas activas, muchas de las molestias que van y vienen son simplemente parte de tener un cuerpo que se usa. El problema aparece cuando cada una de ellas se convierte en un motivo de consulta. La persona aprende que cualquier molestia necesita atención profesional, empieza a vigilar más su cuerpo y, como suele pasar, mientras más lo vigila, más lo nota. Sin quererlo, puedo transformar algo pequeño en algo central y quitarle confianza en su propia capacidad para manejarlo.

Hoy intento hacer algo distinto. Primero descarto lo que sí importa: si aparece una señal de alarma o algo que cambia su función, lo evalúo con cuidado. Después miro qué ha podido hacer, y se lo hago notar. Le digo algo como "te dolió la rodilla, y aun así entrenaste tres veces esta semana". Esa frase cambia el foco del dolor a lo que la persona sí logra.

También intento normalizar sin minimizar. No le digo que no es nada, porque para ella es algo. Le explico que es frecuente, que entiendo que moleste y que no parece ser una señal de que algo se esté dañando. Y le doy herramientas para manejarlo por su cuenta: qué hacer cuando aparece, cuándo vale la pena consultar y cuándo puede esperar a ver cómo evoluciona.

A veces vale la pena preguntar qué más está pasando. Un dolor que cambia de lugar pero nunca se va puede ser también una forma de expresar estrés, cansancio o preocupación. No siempre es así, pero hacer la pregunta abre una conversación que de otra forma no aparecería.

Lo que más me cuesta es que la persona no se sienta ignorada. El equilibrio entre tomar en serio lo que cuenta y no alimentar la vigilancia es fino, y no siempre lo logro. Pero cada vez estoy más convencido de que, cuando el dolor no limita la vida de alguien, mi trabajo no es eliminarlo, sino ayudar a que pese menos.`,
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
    date: '27 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 4,
    summary: 'La imagen encuentra algo en casi todas las personas, cambia poco lo que hacemos y no alcanza a ver donde ocurren muchas lesiones. Eso no la hace inútil, pero sí menos necesaria de lo que solemos creer.',
    pullQuote: 'La pregunta no es qué muestra la imagen, sino qué haría distinto si la tuviera.',
    content: `Es una de las preguntas que más me hacen en consulta: "¿no debería hacerme una resonancia?". Entiendo de dónde viene. Una imagen se siente concreta y objetiva, como si por fin fuéramos a ver qué está pasando adentro.

Rod Whiteley, kinesiólogo del hospital Aspetar en Qatar, dio una charla que se llamaba justamente así, "¿Realmente necesitamos la imagen?". Me dejó varias ideas que quiero ordenar, porque cambiaron bastante cómo respondo esa pregunta.

La primera es que la imagen encuentra algo en casi todas las personas. Según la zona del cuerpo y la edad, entre un 67% y un 100% de las personas sin ningún síntoma tiene algún hallazgo en imágenes de columna, cadera, rodilla, tobillo u hombro. En la columna lumbar, por ejemplo, la mayoría de las personas de 50 años sin dolor muestra cambios en sus discos. Si casi todos tienen algo, encontrar algo no nos dice mucho sobre por qué le duele a la persona que tenemos al frente.

La segunda es que la imagen cambia poco lo que hacemos. Whiteley mostraba datos en los que el resultado modificaba el manejo en muy pocos casos, cerca de un 1%. Y en las lesiones musculares de los isquiotibiales, los tiempos de retorno al deporte según el grado de la lesión en la resonancia se superponen tanto que el grado no permite saber cuánto va a tardar una persona en volver.

La tercera me pareció la más interesante. Una lesión muscular por estiramiento ocurre a nivel de las fibras, en estructuras de alrededor de 0,1 milímetros. Ninguna resonancia que se le haga a una persona viva tiene esa resolución. Lo que vemos en la imagen es una consecuencia de la lesión, como el edema, y no la lesión misma.

¿Qué funciona mejor, entonces? Según Whiteley, la historia clínica, el examen físico y la forma en que la persona responde a la carga. En los isquiotibiales, por ejemplo, cómo se va reduciendo el área dolorosa a la palpación y cómo se recupera la fuerza orientan más que cualquier imagen. Y la pregunta que guía cada día es bastante simple: ¿hoy está igual, mejor o peor que ayer?

Nada de esto significa que la imagen no sirva. Yo la pediría si sospecho algo grave, como una fractura, una infección, un tumor o un compromiso neurológico que avanza. También si alguien no responde a un buen tratamiento después de un tiempo razonable, o si el resultado podría cambiar una decisión importante, como una cirugía. Las guías clínicas de mejor calidad recomiendan justamente eso: usar la imagen de forma selectiva.

Cuando un paciente me pide una resonancia, intento no responderle con un "no la necesitas" seco. Prefiero explicarle qué esperaríamos encontrar, por qué probablemente no cambiaría el plan y qué señales nos harían pedirla. La pregunta que me guía es otra: ¿qué haría distinto si tuviera esa imagen? Si la respuesta es "nada", probablemente no la necesitamos todavía.`,
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
    subtitle: 'Para muchos deportistas, estar lesionado tiene menos que ver con un diagnóstico y más con no poder rendir como quieren.',
    categoryType: 'tematica',
    categoryValue: 'retorno-deporte',
    categoryLabel: 'Retorno al deporte (RTS)',
    audience: 'ambos',
    date: '27 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 4,
    summary: 'Médicos, entrenadores y deportistas no definen la lesión de la misma forma. Si no lo conversamos, cada uno trabaja con una idea distinta del problema.',
    pullQuote: 'Para muchos deportistas, la lesión empieza cuando ya no pueden rendir como quieren, no cuando aparece un diagnóstico.',
    content: `Parece una pregunta obvia, pero no lo es: ¿cuándo está lesionada una persona?

Depende de a quién le preguntes. En un estudio epidemiológico, alguien suele contar como lesionado cuando pierde al menos un día de entrenamiento o de competencia. Para un médico, cuando hay un diagnóstico. Para un entrenador, cuando el jugador no está disponible. Y para el deportista, muchas veces, cuando ya no puede rendir como quiere, aunque siga entrenando con normalidad.

Caroline Bolling y su equipo entrevistaron a deportistas de élite, entrenadores y kinesiólogos para entender cómo percibe cada uno una lesión. Lo que encontraron es que, para los deportistas, la lesión va mucho más allá del daño físico. Se relaciona con no poder rendir, con lo que significa para su carrera y con cómo se sienten. Hay deportistas que entrenan con dolor y no se consideran lesionados, y otros que, sin un diagnóstico claro, sienten que sí lo están.

Esto tiene consecuencias directas en la consulta. Si yo pienso que el problema es un tendón irritado y el deportista piensa que el problema es que ya no salta como antes, podemos estar trabajando hacia objetivos distintos sin darnos cuenta. Yo puedo celebrar que el tendón ya no duele, mientras él sigue sintiendo que no está bien.

Por eso intento hacer algunas preguntas al principio. Le pregunto qué significa para él estar lesionado, qué le gustaría poder hacer que hoy no puede y cuándo sentiría que ya está recuperado. Esas respuestas me orientan mucho más que el diagnóstico, porque me dicen qué va a considerar un buen resultado.

En prevención pasa algo parecido. Si solo contamos como lesión lo que hace perder días, se nos escapan muchas molestias que limitan el rendimiento y que pueden ser el inicio de algo más grande. Por eso cada vez se usan más registros que incluyen también los problemas que afectan el rendimiento sin sacar al deportista de la cancha.

No creo que exista una única definición correcta de lesión. Lo que sí creo es que hay que hacerla explícita con cada persona, porque esa definición es la que decide qué vamos a considerar un éxito.`,
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
    subtitle: 'Muchas veces la evidencia no tiene respuestas definitivas y las diferencias entre tratamientos son pequeñas. Decirlo así le devuelve a la persona la libertad de elegir.',
    categoryType: 'tematica',
    categoryValue: 'rehabilitacion-razonamiento',
    categoryLabel: 'Razonamiento clínico',
    audience: 'ambos',
    date: '27 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 4,
    summary: 'Veo mucha seguridad frente a la cámara. Yo prefiero contar lo que dice la evidencia, incluidas sus dudas, para que cada persona elija con libertad con quién atenderse.',
    pullQuote: 'Si los tratamientos razonables se parecen tanto en promedio, lo honesto es decirlo y dejar que la persona elija.',
    content: `Veo a muchas personas hablando de salud frente a una cámara con mucha seguridad. Se ven serias y muy especialistas, y parecen tener una respuesta para todo. Casi siempre, además, su método es el mejor.

Respeto ese trabajo, pero no me siento cómodo comunicando así, y quiero explicar por qué.

En 2026, Jared Powell, Amy McDevitt y Chad Cook publicaron en el JOSPT un artículo sobre lo que llaman pluralismo terapéutico. Su punto de partida es incómodo para nuestra profesión: después de décadas de investigación, no se ha encontrado un tratamiento que sea claramente superior a los demás para el dolor musculoesquelético. El ejercicio y la terapia manual, por ejemplo, muestran efectos modestos y bastante parecidos en promedio. Los autores proponen que esto podría deberse a que comparten mecanismos menos específicos de lo que solemos creer.

Al mismo tiempo, cada persona responde de forma distinta. Dos tratamientos que en promedio se parecen pueden funcionar muy diferente en dos pacientes. Por eso los autores proponen aceptar un rango acotado de opciones que sean seguras, plausibles y respaldadas por evidencia, y que dentro de ese rango cada profesional pueda trabajar con su enfoque. La condición es comunicarlo con transparencia y ajustarlo a los valores, las metas y las preferencias de cada persona.

Me hace mucho sentido porque es honesto. Si las diferencias entre tratamientos razonables son pequeñas, decir que mi método es el único que funciona simplemente no es verdad, y prefiero que la persona lo sepa. En la práctica, eso significa decir cosas como "la evidencia todavía no tiene una respuesta clara para esto", "hay varias opciones que podrían servirte, y esta es la que te propongo por estas razones" o "si en unas semanas no avanzamos, tenemos otras alternativas".

Lo que más me importa es que la persona elija con quién atenderse con información real, y no por quién se ve más seguro en un video. Si después de entender lo que sabemos y lo que todavía no sabemos decide atenderse conmigo, me parece genial. Si decide hacerlo con otra persona, también está bien.

Esto no quiere decir que todo valga. Hay tratamientos sin ningún respaldo, otros que pueden hacer daño y otros que generan dependencia del profesional. El pluralismo que proponen los autores tiene límites claros. Tampoco quiere decir que no tenga una opinión. Tengo una forma de trabajar y la defiendo, pero no la presento como la única verdad.

Creo que esta honestidad no le quita valor a lo que hacemos. La confianza que se construye sin prometer certezas suele ser más sólida, porque no se rompe cuando aparece la primera duda.`,
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
