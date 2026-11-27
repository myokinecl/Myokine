import type { Article } from '../data';

/**
 * Serie "Explicar el dolor" (8 partes, para pacientes).
 * Conceptos de Explain Pain (Butler y Moseley, 2.ª ed., Noigroup), contados con ejemplos propios.
 * No reproduce texto ni ilustraciones del libro.
 */

const LIBRO = {
  author: 'Butler DS, Moseley GL.',
  year: '2013',
  journal: 'Noigroup Publications, Adelaide (2.ª edición)',
  title: 'Explain Pain'
};

const FECHA = '27 de Noviembre, 2026';
const BASE = {
  categoryType: 'paciente' as const,
  categoryValue: 'explicar-dolor',
  categoryLabel: 'Explicar el dolor',
  audience: 'paciente' as const,
  date: FECHA,
  author: 'Lukas · MyoKine',
};

const S = {
  p1: 'explicar-el-dolor-1-el-dolor-protege',
  p2: 'explicar-el-dolor-2-el-contexto-cambia-el-dolor',
  p3: 'explicar-el-dolor-3-una-alarma-mas-sensible',
  p4: 'explicar-el-dolor-4-la-cancion-que-se-repite',
  p5: 'explicar-el-dolor-5-las-amenazas-escondidas',
  p6: 'explicar-el-dolor-6-ni-evitar-ni-aguantar',
  p7: 'explicar-el-dolor-7-tu-linea-de-partida',
  p8: 'explicar-el-dolor-8-entrenar-sin-que-suene-la-alarma',
};

export const EXPLICAR_DOLOR: Article[] = [
  {
    ...BASE,
    id: '62',
    slug: S.p1,
    title: 'Explicar el dolor (1): el dolor protege, no mide el daño',
    subtitle: 'La idea que ordena todo lo demás: el dolor es una respuesta de protección que decide tu sistema nervioso, y no un medidor de cuánto daño hay en el cuerpo.',
    readingTime: 5,
    summary: 'Un corte con papel puede doler más que un esguince en pleno partido. Eso pasa porque el dolor depende de cuánto peligro percibe el sistema nervioso, no solo de lo que pasa en los tejidos.',
    pullQuote: 'El dolor no te dice cuánto daño hay. Te dice cuánto cree tu cuerpo que necesita protegerte.',
    content: `Esta es la primera parte de una serie de ocho para entender el dolor con ejemplos de la vida diaria. Está basada en las ideas de *Explain Pain*, un libro de David Butler y Lorimer Moseley que ha ayudado a miles de personas a entender lo que les pasa. Lo que vas a leer está contado con mis palabras y con ejemplos que veo en la consulta.

### Dos situaciones que no calzan

Piensa en un futbolista que se dobla el tobillo a los 20 minutos del segundo tiempo. Siente un tirón, sigue jugando y termina el partido. Recién en la ducha, cuando ve el tobillo hinchado, empieza a dolerle de verdad.

Ahora piensa en un corte con papel. Es una herida mínima, casi no sangra, y sin embargo duele muchísimo y te deja de mal humor un buen rato.

Si el dolor midiera el daño, el futbolista tendría que haber sentido mucho más dolor que la persona con el corte. No fue así. Y no es un caso raro: pasa todo el tiempo.

[[figura:dano-vs-dolor]]

### Lo que esto nos dice

El dolor no es una señal que viaja desde el tejido hasta el cerebro y llega tal cual. Es una respuesta que produce tu sistema nervioso después de evaluar, en fracciones de segundo, cuánto peligro hay. Para decidirlo usa lo que llega desde el cuerpo, pero también lo que estás viendo, lo que recuerdas, lo que esperas y lo que está en juego en ese momento.

En el partido, lo más importante para el futbolista era terminar el partido. Su sistema nervioso decidió que el dolor podía esperar. En la casa, con el papel, no había nada más urgente, y la mano es una parte del cuerpo que necesitamos mucho. Ahí el sistema decidió que valía la pena avisar fuerte.

### Pasa también al revés

Muchas personas tienen hernias de disco, cambios en el cartílago o en los tendones que aparecen en una resonancia, y nunca han tenido dolor. Son cambios frecuentes que vienen con los años, como las canas. Si el sistema nervioso no los percibe como una amenaza, no duelen.

También hay personas con mucho dolor y exámenes casi normales. Eso no significa que el dolor sea inventado o que "esté en la cabeza". El dolor es siempre real. Lo que significa es que el sistema de protección está trabajando más de lo que el tejido necesita.

### Entonces, ¿para qué sirve el dolor?

Para protegerte. Es el sistema de protección más poderoso que tenemos. Te hace sacar la mano de una olla caliente antes de quemarte en serio, te hace cojear cuando te tuerces un tobillo y te recuerda cuidar esa zona mientras sana. Que sea desagradable es justamente lo que lo hace efectivo.

El problema aparece cuando ese sistema sigue protegiendo más de la cuenta, mucho después de que el tejido sanó. De eso se trata gran parte de esta serie: entender por qué pasa y qué se puede hacer.

### Para llevarte

- El dolor es real, siempre.
- El dolor no mide el daño. Mide cuánto cree tu sistema nervioso que necesita protegerte.
- Por eso puede haber mucho dolor con poco daño, y poco dolor con mucho daño.

Siguiente parte: [Explicar el dolor (2): el contexto cambia el dolor](#/articulo/${S.p2})`,
    references: [
      LIBRO,
      {
        author: 'Raja SN, Carr DB, Cohen M, et al.',
        year: '2020',
        journal: 'Pain, 161(9):1976-1982',
        doi: '10.1097/j.pain.0000000000001939',
        title: 'The revised International Association for the Study of Pain definition of pain: concepts, challenges, and compromises'
      },
      {
        author: 'Brinjikji W, Luetmer PH, Comstock B, et al.',
        year: '2015',
        journal: 'American Journal of Neuroradiology, 36(4):811-816',
        doi: '10.3174/ajnr.A4173',
        title: 'Systematic literature review of imaging features of spinal degeneration in asymptomatic populations'
      }
    ]
  },
  {
    ...BASE,
    id: '63',
    slug: S.p2,
    title: 'Explicar el dolor (2): el contexto cambia el dolor',
    subtitle: 'El mismo golpe, la misma rodilla o el mismo dolor de espalda se sienten distinto según dónde estás, qué está en juego y qué crees que significa.',
    readingTime: 5,
    summary: 'El dolor no depende solo del cuerpo. Depende de lo que significa para ti, de quién está cerca y de lo que esperas que pase. Por eso cambia tanto de un día a otro.',
    pullQuote: 'Tu sistema nervioso no solo pregunta qué pasó. También pregunta qué significa y qué está en juego.',
    content: `En la [primera parte](#/articulo/${S.p1}) vimos que el dolor es una respuesta de protección y no un medidor de daño. Si eso es así, tiene sentido que todo lo que cambie la sensación de peligro también cambie el dolor. A eso le llamamos contexto.

### Lo que está en juego

El libro *Explain Pain* usa un ejemplo que me gusta mucho. La misma herida en un dedo le duele más a un violinista profesional que a un bailarín, porque para el violinista ese dedo es su trabajo y su identidad.

Pensemos en algo parecido. Una molestia de hombro en alguien que trabaja en oficina puede ser solo incómoda. La misma molestia en un nadador a dos semanas de su competencia más importante puede doler mucho más, porque la amenaza es más grande. No es que el nadador sea más exagerado. Su sistema nervioso tiene más motivos para proteger ese hombro.

### Lo que crees que significa

Si un dolor de cabeza aparece después de dormir mal, lo tomas como algo pasajero. Si aparece justo después de que alguien de tu familia tuvo un problema serio en la cabeza, probablemente lo vas a sentir distinto, más intenso y más difícil de ignorar.

Hay estudios que muestran esto en laboratorio. En uno, el mismo estímulo frío dolía más cuando venía acompañado de una luz roja que de una luz azul, solo porque el rojo se asocia con calor y peligro. El estímulo era idéntico. Lo que cambió fue el significado.

### Dónde estás y con quién

Un dolor de espalda que te molesta poco un sábado en la playa puede sentirse mucho más fuerte el domingo en la noche, pensando en la semana de trabajo. Una rodilla que se porta bien en vacaciones puede doler más en la semana de exámenes.

Pasa también con los niños. Cuando un niño chico se cae, muchas veces mira primero a su mamá o a su papá antes de llorar. Si ve preocupación, llora más. Si ve calma, muchas veces se levanta y sigue jugando. Está usando la reacción de los adultos para decidir cuánto peligro hay.

[[figura:contexto-dolor]]

### Por qué esto es una buena noticia

Saber que el contexto influye no significa que el dolor sea imaginario. Significa que hay más formas de influir en él de las que solemos creer. Si el dolor dependiera solo del tejido, lo único que podríamos hacer sería esperar a que sane. Como también depende del significado, del entorno y de lo que esperas, tienes más herramientas.

Entender lo que te pasa, por ejemplo, ya baja el peligro percibido. Hacer actividades que disfrutas, con personas que te hacen sentir bien, también. Y saber que un día malo no significa que algo se dañó te ayuda a no entrar en pánico.

### Una tarea para esta semana

Anota cuándo te duele más y cuándo menos, y qué estaba pasando alrededor: cómo dormiste, dónde estabas, con quién, qué estabas pensando. No es para encontrar culpables. Es para empezar a ver qué cosas suben y bajan el volumen de tu dolor.

Siguiente parte: [Explicar el dolor (3): una alarma más sensible](#/articulo/${S.p3})`,
    references: [
      LIBRO,
      {
        author: 'Moseley GL, Arntz A.',
        year: '2007',
        journal: 'Pain, 133(1-3):64-71',
        doi: '10.1016/j.pain.2007.03.002',
        title: 'The context of a noxious stimulus affects the pain it evokes'
      }
    ]
  },
  {
    ...BASE,
    id: '64',
    slug: S.p3,
    title: 'Explicar el dolor (3): una alarma más sensible',
    subtitle: 'Cuando el dolor dura mucho tiempo, el sistema de alarma del cuerpo se vuelve más sensible. Suena antes, suena más fuerte y a veces suena sin motivo.',
    readingTime: 5,
    summary: 'Como la alarma de un auto que se dispara cuando pasa un camión, el sistema nervioso puede quedar tan atento que cosas inofensivas empiezan a doler.',
    pullQuote: 'La alarma no está fallando. Está haciendo demasiado bien su trabajo.',
    content: `Después de una lesión, es normal que la zona quede más sensible por un tiempo. Si te quemas la mano con agua caliente, la ducha tibia del día siguiente te va a molestar. Eso es útil: te obliga a cuidar la piel mientras se recupera.

Lo que vemos en el dolor que dura meses es que esa sensibilidad no siempre se apaga cuando el tejido sana. El sistema de alarma queda encendido.

### La alarma del auto

Imagina que te roban la radio del auto dos veces. La tercera vez instalas una alarma muy sensible, que detecta movimiento, vibración y cualquier cosa que se acerque. El auto queda bien protegido. El problema es que ahora la alarma suena cuando pasa un camión, cuando llueve fuerte o cuando un gato se sube al capó.

La alarma no está fallando. Está haciendo su trabajo con demasiado entusiasmo. Algo parecido puede pasar en el sistema nervioso: después de un tiempo con dolor, las neuronas que llevan las señales de peligro se vuelven más excitables, la médula espinal empieza a amplificar los mensajes y el cerebro se vuelve muy bueno para producir dolor.

[[figura:alarma-sensible]]

### Cómo se nota en el día a día

Algunas señales de que la alarma está más sensible que lo que el tejido necesita:

- El dolor sigue mucho después del tiempo que normalmente tarda en sanar ese tejido.
- Se extiende a zonas que no estaban afectadas al principio.
- Cosas pequeñas, como un roce, la ropa o estar sentado un rato, empiezan a doler.
- El dolor es impredecible: un día puedes hacer algo sin problema y al siguiente no.
- A veces aparece horas o incluso un día después de la actividad.
- Empeora con el estrés, el cansancio o un mal día, y mejora cuando estás tranquilo o entretenido.

Si te reconoces en varias de estas, no significa que algo grave esté pasando. Significa que tu sistema de protección está más alerta de lo necesario.

### Un ejemplo frecuente

Es muy común el dolor lumbar que empezó al levantar algo pesado hace un año o más. Al principio dolía en un punto. Ahora duele en toda la espalda baja, a veces en el glúteo, y molesta incluso al estar sentado en el auto. Las imágenes no muestran nada que explique ese cambio. Lo que cambió no fue la espalda, sino la sensibilidad del sistema que la protege.

### Lo importante: se puede bajar la sensibilidad

El sistema nervioso cambia todo el tiempo. Así como aprendió a ser más sensible, puede volver a calmarse. Eso no pasa de un día para otro, pero pasa. Entender lo que ocurre ya ayuda a bajar el volumen, porque reduce la sensación de amenaza. Y moverse de forma gradual, sin asustar al sistema, le va mostrando que esas actividades son seguras.

En las próximas partes vamos a ver cómo hacerlo en la práctica.

Siguiente parte: [Explicar el dolor (4): la canción que se repite](#/articulo/${S.p4})`,
    references: [
      LIBRO,
      {
        author: 'Woolf CJ.',
        year: '2011',
        journal: 'Pain, 152(3 Suppl):S2-S15',
        doi: '10.1016/j.pain.2010.09.030',
        title: 'Central sensitization: implications for the diagnosis and treatment of pain'
      }
    ]
  },
  {
    ...BASE,
    id: '65',
    slug: S.p4,
    title: 'Explicar el dolor (4): la canción que se repite',
    subtitle: 'Con el tiempo, el cerebro aprende a producir dolor con más facilidad, como una canción que se queda pegada. Lo que se aprende también se puede volver a aprender.',
    readingTime: 5,
    summary: 'El dolor que dura se parece a una canción que el cerebro toca una y otra vez. Cuanto más la toca, más fácil le sale. La buena noticia es que el cerebro puede aprender otros repertorios.',
    pullQuote: 'Tu cerebro es capaz de mucho más que producir dolor. Solo necesita practicar otras canciones.',
    content: `A todos nos ha pasado que una canción se nos queda pegada. La escuchaste en la radio en la mañana y la tarareas todo el día, aunque ni siquiera te guste. Mientras más la repites, más fácil vuelve.

*Explain Pain* usa una imagen parecida para el dolor persistente. Compara al cerebro con una orquesta que, después de mucho tiempo con dolor, termina tocando casi siempre la misma canción.

### Cómo se aprende la canción

Cuando el dolor dura meses, el cerebro no solo recibe señales. También cambia. Las conexiones que participan en producir dolor se vuelven más fuertes y más fáciles de activar, igual que pasa con cualquier cosa que practicamos mucho, como tocar guitarra o manejar.

Por eso, con el tiempo, el dolor puede aparecer con estímulos cada vez más pequeños, e incluso sin estímulo en el cuerpo. Hay personas a las que les duele la espalda solo de pensar en agacharse, o de ver a alguien levantar una caja pesada. No están exagerando ni imaginándolo. Su cerebro aprendió a asociar esas situaciones con peligro, y toca la canción apenas las reconoce.

Piensa en alguien que se torció el tobillo en una cancha específica. Meses después, ya recuperado, puede sentir una molestia apenas entra a esa cancha. El tobillo está bien. Lo que se activa es el recuerdo.

### La orquesta que deja de tocar otras cosas

Cuando una orquesta toca siempre la misma canción, el resto de su repertorio se va perdiendo. Algunos músicos dejan de ensayar, otros se cansan de tocar todo el tiempo y algunos empiezan a tocar partes que no les corresponden.

En el cuerpo pasa algo parecido. Cuando el dolor se vuelve el centro, se pierden otras cosas: el deporte, salir con amigos, dormir bien, jugar con los hijos. Y el cerebro también cambia la forma en que "dibuja" la zona que duele. Esa parte del mapa del cuerpo se vuelve más borrosa, lo que puede hacer que la sientas rara, más grande o distinta, y que te cueste moverla con precisión.

[[figura:cancion-repetida]]

### Lo que se aprende se puede volver a aprender

Esta es la parte importante. Esos cambios no son permanentes. El cerebro sigue cambiando toda la vida. Los estudios muestran que el mapa del cuerpo que se vuelve borroso con el dolor puede volver a ordenarse con entrenamiento.

La idea no es "dejar de tocar" la canción del dolor a la fuerza, porque eso casi nunca funciona. La idea es practicar otras canciones: movimientos nuevos, actividades que disfrutas, contextos distintos, de a poco y sin asustar al sistema. Con el tiempo, la orquesta vuelve a tener un repertorio amplio y la canción del dolor suena menos.

### Para llevarte

- El dolor persistente se parece a una canción que el cerebro aprendió muy bien.
- Por eso puede aparecer con poco estímulo, con recuerdos o incluso al pensar en un movimiento.
- Lo que el cerebro aprendió, lo puede volver a aprender, y eso se entrena.

Siguiente parte: [Explicar el dolor (5): las amenazas escondidas](#/articulo/${S.p5})`,
    references: [
      LIBRO,
      {
        author: 'Moseley GL, Butler DS.',
        year: '2015',
        journal: 'The Journal of Pain, 16(9):807-813',
        doi: '10.1016/j.jpain.2015.05.005',
        title: 'Fifteen Years of Explaining Pain: The Past, Present, and Future'
      }
    ]
  },
  {
    ...BASE,
    id: '66',
    slug: S.p5,
    title: 'Explicar el dolor (5): las amenazas escondidas',
    subtitle: 'El sistema nervioso protege de todo lo que percibe como peligro, no solo de lo que pasa en el tejido. Algunas amenazas están en lugares donde no se nos ocurre mirar.',
    readingTime: 5,
    summary: 'Lo que crees que tienes, lo que te dijeron, cómo te tratan en el trabajo o la sensación de que no te creen pueden pesar tanto como el tejido. Identificarlas es parte del tratamiento.',
    pullQuote: 'Cualquier cosa que aumente la sensación de peligro puede aumentar el dolor, aunque no tenga nada que ver con el tejido.',
    content: `Si el dolor es una respuesta de protección, la pregunta clave no es solo "¿qué tengo?", sino también "¿de qué me está protegiendo mi cuerpo?". A veces la respuesta está en el tejido. Muchas otras veces, también está en lugares donde no se nos ocurre buscar.

### Las capas de una cebolla

Una forma de ordenarlo, que el libro toma de la psicología, es pensar el dolor como una cebolla con varias capas. Todas pueden sumar al mismo tiempo:

[[figura:capas-cebolla]]

Para que se entienda mejor, pensemos en un caso inventado, pero muy parecido a muchos reales.

### El caso de Carla

Carla tiene 42 años y trabaja en una oficina. Hace un año se le "fue la espalda" al levantar una caja en una mudanza. Hoy todavía le duele, aunque la resonancia no muestra nada importante.

**Los tejidos.** Probablemente su espalda está menos acostumbrada a moverse y a cargar peso que antes. Eso suma, pero no lo explica todo.

**Lo que cree y teme.** Un amigo le dijo que tenía la espalda "chueca", y desde entonces piensa que algo está fuera de lugar. Le da miedo agacharse. Además, siente que fue su culpa por levantar mal la caja.

**Cuánto sufre.** No solo le duele: está cansada, duerme mal y siente que esto no se va a terminar nunca.

**Lo que hace para escapar.** Ha ido a varios profesionales, cada uno con una explicación distinta, y gasta bastante plata buscando la solución definitiva.

**Su entorno.** Su jefe le dice que "tiene que aguantar", su familia está cansada de escucharla y ella siente que nadie le cree del todo.

Cada una de estas capas le dice a su sistema nervioso lo mismo: hay peligro. Y un sistema que ya está sensible, como vimos en la [tercera parte](#/articulo/${S.p3}), responde a eso produciendo más dolor.

### Amenazas que a veces no vemos

Algunas son difíciles de notar o de aceptar:

- Explicaciones que asustan, como "tienes la columna de una persona de 80 años".
- Sentir que no te creen, en el trabajo, en la casa o en la consulta.
- Diagnósticos distintos de cada profesional, que generan más incertidumbre.
- Problemas que no tienen nada que ver con el cuerpo: plata, trabajo, una relación difícil.
- Experiencias duras del pasado que dejaron al sistema más alerta.

### Por qué vale la pena buscarlas

Porque muchas de estas amenazas se pueden cambiar. Una explicación clara puede reemplazar una que asusta. Una conversación con el jefe puede bajar la presión. Entender que el dolor no significa daño puede bajar el miedo. Cada amenaza que se reduce le quita trabajo al sistema de protección.

No hace falta resolverlas todas de una vez. Basta con empezar a verlas. A veces requiere algo de valentía, porque algunas son más difíciles de reconocer que otras.

### Una pregunta para ti

Si tu sistema nervioso pudiera hablar, ¿de qué crees que te estaría protegiendo además de tu cuerpo?

Siguiente parte: [Explicar el dolor (6): ni evitar ni aguantar](#/articulo/${S.p6})`,
    references: [
      LIBRO,
      {
        author: 'Moseley GL, Butler DS.',
        year: '2015',
        journal: 'The Journal of Pain, 16(9):807-813',
        doi: '10.1016/j.jpain.2015.05.005',
        title: 'Fifteen Years of Explaining Pain: The Past, Present, and Future'
      }
    ]
  },
  {
    ...BASE,
    id: '67',
    slug: S.p6,
    title: 'Explicar el dolor (6): ni evitar ni aguantar',
    subtitle: 'Hay dos formas muy comunes de relacionarse con el dolor: dejar de hacer todo lo que duele o aguantar hasta reventar. Ninguna de las dos funciona a largo plazo.',
    readingTime: 5,
    summary: 'Quien evita todo lo que duele va haciendo cada vez menos. Quien aguanta hasta no poder más termina en cama varios días. Las dos terminan en el mismo lugar: cada vez se puede hacer menos.',
    pullQuote: 'El dolor no hay que temerlo ni vencerlo. Hay que entenderlo y trabajar con él.',
    content: `Cuando algo duele, la reacción natural es dejar de hacerlo o tratar de ignorarlo. Las dos son comprensibles. El problema es que, cuando el dolor dura meses, ninguna de las dos ayuda.

### El que evita

Juan tiene dolor de rodilla. Al principio dejó de trotar. Después dejó de subir escaleras, luego de caminar mucho rato y ahora evita incluso agacharse a recoger cosas. Cada vez que algo le duele, lo deja de hacer.

Tiene lógica: si duele, para. Pero con los meses su rodilla y el resto de su cuerpo se desacostumbran a la carga, y su sistema nervioso se vuelve más sensible. El dolor empieza a aparecer con actividades cada vez más pequeñas. Juan hace cada vez menos, y aun así le sigue doliendo.

Este patrón suele aparecer en personas que tienen miedo de dañarse o de volver a lesionarse. Se conoce como el ciclo del miedo y la evitación, y es uno de los mejor estudiados en el dolor persistente.

### El que aguanta

Paula es lo contrario. Tiene dolor de espalda, pero no se detiene. Un sábado limpia toda la casa, hace las compras y ordena el clóset, aunque desde la mitad de la mañana ya le dolía. "Mejor lo termino de una vez." El domingo y el lunes no se puede levantar de la cama. El miércoles se siente mejor y vuelve a hacer todo de golpe.

Es lo que se llama el patrón de auge y caída: días de hacer mucho, seguidos de días de no poder hacer nada. Es muy común en personas perfeccionistas, muy responsables o que sienten que no tienen opción de parar.

[[figura:evitar-aguantar]]

### Los dos terminan en el mismo lugar

Aunque parecen opuestos, los dos patrones tienen algo en común: con el tiempo, la cantidad de actividad que la persona tolera va bajando. En el que evita, poco a poco. En el que aguanta, a golpes. En ambos casos el dolor termina decidiendo cuánto se puede hacer.

### El tercer camino

El libro lo resume en una idea que me gusta: el dolor no hay que temerlo ni vencerlo, hay que entenderlo. Ni "si duele, para", ni "sin dolor no hay ganancia".

El tercer camino consiste en planificar la actividad en vez de dejar que el dolor la decida. Partir desde una cantidad que sabes que puedes hacer sin tener un brote al día siguiente, e ir subiendo de a poco, con un plan hecho antes y no en el momento.

Para Juan, eso podría significar volver a caminar 5 minutos en plano todos los días, aunque le dé un poco de miedo, e ir aumentando. Para Paula, significaría limpiar la casa por partes durante la semana, con una alarma que le avise cuándo parar, aunque se sienta bien y quiera seguir.

### ¿Con cuál te identificas?

La mayoría de las personas se reconoce más en uno de los dos, aunque a veces pasamos de uno a otro. Darte cuenta de tu patrón es el primer paso para cambiarlo. En la siguiente parte vemos cómo armar ese plan.

Siguiente parte: [Explicar el dolor (7): tu línea de partida](#/articulo/${S.p7})`,
    references: [
      LIBRO,
      {
        author: 'Vlaeyen JWS, Linton SJ.',
        year: '2000',
        journal: 'Pain, 85(3):317-332',
        doi: '10.1016/S0304-3959(99)00242-0',
        title: 'Fear-avoidance and its consequences in chronic musculoskeletal pain: a state of the art'
      }
    ]
  },
  {
    ...BASE,
    id: '68',
    slug: S.p7,
    title: 'Explicar el dolor (7): tu línea de partida',
    subtitle: 'Cómo encontrar cuánto puedes hacer sin tener un brote, y cómo ir subiendo de a poco para que el cuerpo y el sistema nervioso se acostumbren.',
    readingTime: 6,
    summary: 'Elegir una actividad, encontrar tu línea de partida, planificar cuánto subir y no asustarte si hay un brote. Es lento, pero funciona.',
    pullQuote: 'Haz un poco más que ayer, pero no mucho más.',
    content: `En la [parte anterior](#/articulo/${S.p6}) vimos que ni evitar todo ni aguantar hasta reventar funcionan. El camino del medio requiere un plan. Aquí te cuento cómo armarlo, en cinco pasos.

### 1. Elige una actividad

Empieza por una sola cosa que quieras o necesites hacer más. Puede ser caminar, estar sentado, cocinar, jugar con tus hijos, trotar o dormir mejor. Elegir una sola parece poco, pero es mucho más fácil de llevar.

### 2. Encuentra tu línea de partida

Tu línea de partida es la cantidad de esa actividad que puedes hacer sabiendo que no vas a tener un brote. Un brote es ese aumento de dolor que te deja mal por horas o días, a veces al día siguiente.

Para encontrarla, puedes hacerte preguntas como estas, con honestidad:

- ¿Puedo caminar 30 minutos sin pagarlo al otro día? No, al otro día quedo mal.
- ¿Y 15 minutos? Probablemente tampoco, sobre todo si hay subidas.
- ¿Y 8 minutos en plano? Creo que sí.
- ¿Y 5 minutos en plano? Seguro.

Tu línea de partida sería 5 minutos de caminata en plano. Puede parecer muy poco. No importa. Lo importante es partir desde un lugar seguro.

### 3. Planifica cómo vas a subir

Decide de antemano cuánto vas a aumentar, por ejemplo 30 segundos o un minuto más cada día o cada dos días. La regla es simple: **un poco más que ayer, pero no mucho más**.

Usa una alarma en el celular. Te permite distraerte mientras caminas, escuchar música o conversar, sin pasarte del límite. Y cuando suene, para, aunque te sientas bien. Esta es la parte más difícil, sobre todo para quienes tienden a aguantar. Si sigues porque "hoy me siento bien", lo más probable es que caigas en el patrón de auge y caída.

[[figura:linea-de-partida]]

### 4. Si tienes un brote, no te asustes

Aunque lo hagas bien, es probable que en algún momento aparezca un brote, porque el sistema todavía está sensible. No significa que te dañaste ni que el plan no sirve. Significa que tu sistema de protección se activó.

Cuando pase, baja un poco la cantidad por unos días, sin dejarla del todo, y vuelve a subir de a poco. No es momento de buscar una solución mágica ni de abandonar.

### 5. Hazlo parte de tu vida

Busca actividades que disfrutes y hazlas con personas que te hacen bien. Las actividades agradables tienen efectos reales sobre el sistema nervioso y ayudan a bajar la sensación de peligro. Con el tiempo, también puedes enfrentar actividades que te dan miedo, siempre con el mismo principio: de a poco y planificado.

### Por qué funciona

Al principio, el dolor aparece mucho antes de que el tejido esté realmente en peligro. Hay un margen grande de protección. Cuando vas subiendo de a poco, pasan tres cosas al mismo tiempo: el punto en que aparece el dolor se va corriendo hacia arriba, el sistema nervioso se va calmando y los tejidos se van poniendo más fuertes.

Es lento y requiere paciencia. Pero es una de las herramientas con mejor respaldo para volver a hacer lo que te importa.

### Un ejemplo

Imagina a alguien con dolor lumbar que quiere volver a cocinar para su familia los domingos, pero después de 20 minutos de pie tiene que acostarse. Podría partir con 10 minutos de pie en la cocina, con pausas sentada, y subir 2 minutos por semana. En unos meses podría cocinar el almuerzo completo. Quizás no deje de tener dolor por completo, pero el dolor deja de decidir por ella.

Siguiente parte: [Explicar el dolor (8): entrenar sin que suene la alarma](#/articulo/${S.p8})`,
    references: [LIBRO]
  },
  {
    ...BASE,
    id: '69',
    slug: S.p8,
    title: 'Explicar el dolor (8): entrenar sin que suene la alarma',
    subtitle: 'El cerebro tiene un mapa del cuerpo que también se puede entrenar. Cambiar cómo, dónde y para qué haces un movimiento ayuda a que deje de asociarlo con peligro.',
    readingTime: 6,
    summary: 'Imaginar el movimiento, hacerlo en el agua, mirarte en un espejo o hacerlo mientras conversas son formas de mostrarle al sistema nervioso que moverse es seguro.',
    pullQuote: 'La idea es que tu cerebro se pregunte "¿y ahora qué?", en vez de "¿esto es peligroso?".',
    content: `Esta es la última parte de la serie. Vimos que el dolor protege, que depende del contexto, que la alarma se puede volver sensible y que el cerebro aprende a producir dolor con facilidad. Ahora vamos a una herramienta que me parece de las más interesantes: entrenar el mapa del cuerpo que tiene el cerebro.

### El cuerpo que vive en el cerebro

El cerebro tiene una especie de mapa de todo tu cuerpo. Gracias a él puedes cerrar los ojos y tocarte la nariz, o tomar una taza sin mirarla. Ese mapa cambia con lo que hacemos: en personas que leen braille, por ejemplo, la zona del dedo índice se agranda.

Como vimos en la [cuarta parte](#/articulo/${S.p4}), cuando hay dolor por mucho tiempo, la parte del mapa que corresponde a la zona que duele se vuelve más borrosa. Y algunos movimientos quedan "marcados" como peligrosos. Basta con empezar a hacerlos para que suene la alarma.

La idea de esta parte es entrenar esos movimientos de formas distintas, para que el cerebro pueda vivirlos sin activar el dolor.

### Cambiar el cómo

Tomemos como ejemplo agacharse, que a muchas personas con dolor lumbar les cuesta. Algunas formas de entrenarlo:

- **Imaginarlo.** Pensar en el movimiento activa muchas de las mismas zonas del cerebro que hacerlo, pero sin cargar la espalda. Si incluso imaginarlo molesta, puedes imaginar solo una parte.
- **Cambiar la posición.** Acostado de espaldas llevando las rodillas al pecho, sentado en una silla inclinándote hacia adelante o de pie apoyado en una mesa. La espalda se dobla en todos los casos, pero el cerebro lo vive distinto.
- **Hacerlo en el agua.** En una piscina cambia el peso, la temperatura y la sensación de seguridad.
- **Mirar o no mirar.** Hacerlo frente a un espejo le muestra al cerebro que el movimiento ocurre sin problema. Hacerlo con los ojos cerrados lo vuelve más desafiante.

### Cambiar el dónde y el para qué

- **Otro lugar.** En la casa, en el parque o, cuando te sientas más seguro, en el lugar donde empezó el dolor.
- **Con un propósito.** El cerebro acepta mejor los movimientos que tienen sentido: amarrarte los zapatos, recoger un juguete del suelo, hablarle a un niño a su altura.
- **Con distracción.** Con música, conversando o mientras haces otra cosa. La atención puesta en el dolor es una de las cosas que más lo enciende.
- **En distintos estados de ánimo.** No solo en los días buenos. Hacerlo también en días más difíciles le da al cerebro más experiencias seguras.

[[figura:entrenar-mapa]]

### Las mañas

Con el tiempo, casi todos desarrollamos mañas para movernos con dolor: apoyar la mano en la rodilla para levantarnos, girar todo el cuerpo en vez del cuello, mantener la espalda rígida. Al principio ayudan. Con los meses, pueden volverse un recordatorio constante de que ese movimiento es peligroso.

Vale la pena preguntarse si todavía necesitas esa maña, y probar hacer el movimiento de otra forma, de a poco. Por ejemplo, levantarte de una silla con un pie adelante, después con el otro, más rápido, más lento, con los ojos cerrados.

### Si te duele el cuello

Las mismas ideas sirven para otras zonas. Para girar la cabeza, puedes sentarte en una silla con ruedas, mirar fijo un punto y girar la silla. El cuello rota, pero de otra forma. También puedes "escribir" tu nombre en el aire con la nariz, seguir primero con los ojos un punto en la pared y luego girar la cabeza, o hacerlo acostado, donde suele ser más fácil.

### Para cerrar la serie

Todo lo que vimos apunta a lo mismo: el dolor es real, protege y se puede cambiar. Entenderlo baja la amenaza. Moverse de forma planificada y variada le muestra al sistema nervioso que hay más seguridad de la que cree. No es rápido, pero es un camino que funciona, y no tienes que recorrerlo solo.

Si quieres volver al inicio, aquí está la [primera parte](#/articulo/${S.p1}).`,
    references: [
      LIBRO,
      {
        author: 'Moseley GL, Butler DS.',
        year: '2015',
        journal: 'The Journal of Pain, 16(9):807-813',
        doi: '10.1016/j.jpain.2015.05.005',
        title: 'Fifteen Years of Explaining Pain: The Past, Present, and Future'
      }
    ]
  }
];
