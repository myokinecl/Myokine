import type { Article } from '../data';

/**
 * Bloque de artículos agregado en noviembre de 2026:
 * tendones (Aquiles, rotuliano, glúteo, isquiotibial proximal), pliometría en personas mayores,
 * creencias y comunicación, fisiología clínica del ejercicio y contenido para pacientes.
 */
export const ARTICULOS_NUEVOS: Article[] = [
  {
    id: '50',
    slug: 'guia-holandesa-tendinopatia-aquiles-de-vos-2021',
    title: 'Tendinopatía de Aquiles: lo que recomienda la guía holandesa',
    subtitle: 'De Vos y colaboradores (BJSM, 2021) ordenaron la evidencia en seis módulos, con pacientes participando en cada etapa. Diagnóstico, imagen, tratamiento, pronóstico y cómo evitar que vuelva.',
    categoryType: 'segmento',
    categoryValue: 'tobillo-pie',
    categoryLabel: 'Tobillo y pie',
    audience: 'ambos',
    date: '26 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 7,
    summary: 'Diagnóstico con cuatro criterios clínicos, ecografía solo en casos puntuales, 12 semanas de educación, ajuste de carga y fuerza de pantorrilla, y paciencia con el retorno. Eso es lo central de la guía.',
    pullQuote: 'Los hallazgos de la imagen no tienen valor pronóstico, y conviene decírselo así al paciente.',
    content: `La tendinopatía de Aquiles es frecuente: en atención primaria se ven entre 2 y 3 casos nuevos por cada 1.000 adultos al año, y en corredores la probabilidad de tenerla alguna vez en la vida llega a cerca de la mitad. Aun así, cada profesional suele manejarla a su manera, y eso confunde a los pacientes.

Por eso un grupo de sociedades holandesas, liderado por Robert-Jan de Vos, publicó en 2021 una guía clínica en el *British Journal of Sports Medicine*. Lo interesante es cómo se hizo: además de médicos, kinesiólogos y otros profesionales, **participaron pacientes en todas las fases**. Antes de escribir una sola recomendación, hicieron grupos focales con pacientes y una encuesta nacional para saber qué les costaba más. Lo que apareció fue justamente la confusión: distintos profesionales les decían cosas distintas.

Para cada pregunta revisaron la literatura, evaluaron la certeza con el sistema GRADE y después sumaron otras consideraciones: valores de los pacientes, costos, disponibilidad y si la recomendación era aplicable en la práctica. La guía tiene seis módulos: factores de riesgo y prevención, diagnóstico, imagen, tratamiento, pronóstico y prevención de recaídas.

Un detalle del inicio que me gusta: la guía recuerda que el problema aparece tanto en deportistas como en personas poco activas. En los primeros, muchas veces porque la carga externa sube demasiado. En los segundos, porque su capacidad de base es tan baja que una carga cotidiana ya les resulta excesiva.

### Cómo se diagnostica

El diagnóstico es clínico. La guía pide que estén presentes **los cuatro criterios** a la vez:

[[figura:aquiles-diagnostico]]

También separa dos cuadros que se manejan algo distinto: la tendinopatía de la **porción media** (unos 2 a 7 cm sobre el talón) y la **insercional** (donde el tendón llega al calcáneo).

Si el cuadro cumple los cuatro criterios, **no hace falta ningún examen adicional**. La imagen se considera solo si los síntomas no calzan con los cuatro criterios, si la evolución es inesperada o cambia durante el seguimiento, o si se está pensando en cirugía.

La guía también pide mirar más allá del tendón en algunos casos:

- **Reumatología**, si la tendinopatía es insercional y hay sospecha de espondiloartritis (por ejemplo, dolor lumbar persistente que empezó antes de los 45 años o psoriasis).
- **Medicina general**, si es de porción media y hay sospecha de hipercolesterolemia familiar: colesterol muy alto sin tratar, familiares directos con enfermedad cardiovascular antes de los 60 años o un arco lipoideo en la córnea antes de los 45.
- **Medicina del deporte o traumatología**, si la duda diagnóstica persiste o la evolución no es la esperada.

Y recuerda que en el dolor posterior del tobillo hay otros diagnósticos posibles que conviene descartar.

### ¿Hace falta una imagen?

Casi nunca para diagnosticar. Si hay dudas, la ecografía es la primera opción; la resonancia queda para casos específicos y, en la insercional, una radiografía lateral del talón puede aportar.

Hay dos recomendaciones que me parecen las más útiles para la consulta:

- **No pedir imágenes para predecir cómo va a evolucionar ni para controlar el tratamiento.**
- **Explicarle a la persona que lo que muestra la imagen no predice su evolución.**

Para seguir el progreso, la guía recomienda el cuestionario **VISA-A** (de 0 a 100), que mide dolor, función y actividad.

### El tratamiento base

Esperar sin hacer nada da poca o ninguna mejoría en el corto plazo. Lo que se recomienda es un tratamiento activo de **al menos 12 semanas**, conversado con la persona:

[[figura:aquiles-tratamiento]]

La educación incluye explicar qué es el cuadro, qué pronóstico tiene, cómo funciona el dolor y qué factores psicológicos pueden estar influyendo. El consejo de carga es bastante concreto: pausar o reemplazar por un tiempo lo que provoca síntomas, volver de forma gradual y usar una escala de dolor para decidir cuánto hacer.

La guía insiste en que el ejercicio tiene que calzar con la persona. Pide considerar su motivación, el tiempo que tiene, cómo vigila su dolor y a qué lugares o materiales tiene acceso. No hay un protocolo único: la mejor versión es la que la persona puede sostener 12 semanas. Lo mismo para quienes tienen un trabajo que carga el tendón: se identifican los factores del trabajo que provocan síntomas y se ajustan por un tiempo.

Otra recomendación que vale la pena: revisar características como el nivel de actividad o las enfermedades asociadas para personalizar el tratamiento, **pero no usarlas para dar un pronóstico**, porque no se han identificado factores que lo predigan bien.

El ejercicio de pantorrilla (gastrocnemio y sóleo) va progresando según el dolor durante y después de cada sesión y según la fatiga muscular. La guía propone un flujograma que parte con ejercicio isotónico, vuelve a isométricos si el dolor sube mucho, agrega peso cuando el tendón lo tolera y termina con ejercicios pliométricos y la vuelta al deporte. En la insercional, al comienzo conviene hacer los ejercicios en suelo plano, sin dejar caer el talón por debajo del escalón.

### Si a los tres meses no hay mejoría

Recién ahí se conversan opciones adicionales, siempre explicando la incertidumbre sobre su efecto: terapia extracorpórea por ondas (ESWT), otras modalidades pasivas, inyecciones o acupuntura. La guía pide **cautela con los antiinflamatorios y con las infiltraciones de corticoides**. La cirugía se considera solo después de **seis meses de tratamiento activo** sin recuperación.

### Qué esperar

[[figura:aquiles-pronostico]]

La mayoría de las personas mejora, aunque puede tomar meses o incluso años. Cerca del 85% de los deportistas vuelve a su deporte, aunque la guía aclara que no se sabe si vuelven a su nivel previo ni si lo hacen sin síntomas. Entre un 23% y un 37% mantiene alguna molestia hasta 10 años después. La guía pide contarle esto a la persona con honestidad, incluido que **hoy no podemos predecir cómo le va a ir a cada uno**. Lo que sí se asocia a más recaídas es **volver al deporte en pocos días**: como regla, volver a la carga completa sin síntomas toma algunos meses de tratamiento activo. Después de recuperarse, vale la pena mantener el ejercicio de pantorrilla.

### Prevención

El factor de riesgo con mejor evidencia es haber tenido antes una tendinopatía en las piernas. Para esas personas la guía sugiere subir el entrenamiento de forma gradual, fortalecer la pantorrilla antes de la temporada, abrigarse en invierno y, si hay alternativa, evitar las fluoroquinolonas (un tipo de antibiótico).

### Lo que me llevo a la consulta

De toda la guía, me quedo con tres cosas. La primera, que el diagnóstico se hace con las manos y la conversación, y que una ecografía con cambios no dice cómo le va a ir a esa persona. La segunda, que 12 semanas es el piso del tratamiento activo, no el techo, y que conviene decirlo desde el primer día para que nadie espere resultados en dos semanas. La tercera, que el momento de mayor riesgo es el retorno: volver en días se asocia a más recaídas, y mantener la fuerza de pantorrilla después de recuperarse es una forma simple de cuidarse.
### Límites

Es una guía nacional, construida con revisiones sistemáticas y consenso. Varias recomendaciones se basan en evidencia de certeza baja o en la opinión del grupo, como suele pasar en tendón.`,
    references: [
      {
        author: 'de Vos RJ, van der Vlist AC, Zwerver J, et al.',
        year: '2021',
        journal: 'British Journal of Sports Medicine, 55(20):1125-1134',
        doi: '10.1136/bjsports-2020-103867',
        title: 'Dutch multidisciplinary guideline on Achilles tendinopathy'
      },
      {
        author: 'Silbernagel KG, Thomeé R, Eriksson BI, Karlsson J.',
        year: '2007',
        journal: 'The American Journal of Sports Medicine, 35(6):897-906',
        doi: '10.1177/0363546506298279',
        title: 'Continued sports activity, using a pain-monitoring model, during rehabilitation in patients with Achilles tendinopathy: a randomized controlled study'
      }
    ]
  },
  {
    id: '51',
    slug: 'aquiles-seguir-corriendo-monitoreo-dolor-silbernagel',
    title: '¿Puedo seguir corriendo con dolor en el Aquiles?',
    subtitle: 'Un ensayo de Silbernagel (AJSM, 2007) comparó seguir entrenando con un modelo de monitoreo del dolor contra hacer reposo activo. A los 12 meses no hubo diferencias.',
    categoryType: 'segmento',
    categoryValue: 'tobillo-pie',
    categoryLabel: 'Tobillo y pie',
    audience: 'ambos',
    date: '26 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 5,
    summary: 'Seguir corriendo y saltando mientras haces tu rehabilitación, guiándote por el dolor, no empeoró la recuperación en comparación con dejar de hacerlo por seis semanas.',
    pullQuote: 'No se pudo demostrar ningún efecto negativo de continuar con la carrera y los saltos usando un modelo de monitoreo del dolor.',
    content: `Es una de las preguntas que más me hacen corredores y deportistas: si me duele el Aquiles, ¿tengo que parar? Muchas veces la indicación inicial es reposo. El problema es que parar del todo tiene costos: se pierde condición, se pierde rutina y, para muchas personas, se pierde algo de identidad.

Karin Grävare Silbernagel y su equipo en Suecia lo pusieron a prueba en un ensayo clínico publicado en 2007 en el *American Journal of Sports Medicine*.

### Qué hicieron

Incluyeron a 38 personas con tendinopatía de Aquiles y las dividieron en dos grupos. Ambos hicieron **el mismo programa de ejercicio** para la pantorrilla y el tendón, que iba aumentando la carga de forma gradual.

- **Grupo que siguió entrenando:** podía continuar corriendo y saltando, guiándose por un modelo de monitoreo del dolor.
- **Grupo de reposo activo:** tuvo que dejar de correr y saltar durante las primeras seis semanas.

El programa de ejercicio común duraba 12 semanas y seguía después como mantención. Avanzaba por fases: primero elevaciones de talón con ambas piernas y ejercicios suaves de pantorrilla, después elevaciones con una pierna, luego excéntricos y elevaciones con carga, y al final ejercicios más rápidos y saltos. Se evaluó a las 6 semanas, a los 3, 6 y 12 meses, con el cuestionario VISA-A, el dolor durante la actividad y pruebas de función como saltos y elevaciones de talón repetidas.

### El modelo de monitoreo del dolor

La idea es usar el dolor como una guía en vez de como una alarma:

[[figura:modelo-monitoreo-dolor]]

Durante la actividad se acepta dolor hasta 5 de 10. Lo que se mira con atención es la respuesta: que a la mañana siguiente estés como antes y que, semana a semana, el dolor y la rigidez no vayan subiendo. Si eso pasa, se baja un poco la carga, sin necesidad de suspender todo.

### Qué encontraron

Los dos grupos mejoraron de forma clara y **no hubo diferencias entre ellos**. En el cuestionario VISA-A, que va de 0 a 100, ambos partieron cerca de 57 puntos. A los 12 meses, el grupo que siguió entrenando llegó a 85 y el de reposo activo a 91, una diferencia que no fue significativa.

Los autores concluyen que seguir con la carrera y los saltos, guiados por el dolor, no mostró efectos negativos y puede ser una opción válida.

Ojo con cómo se lee esto: no dice que seguir entrenando sea mejor, dice que **no fue peor**. Y como el estudio es pequeño, una diferencia chica entre grupos podría no haberse detectado. Aun así, para alguien cuya vida gira en torno a correr, saber que no tiene que elegir entre su deporte y su recuperación ya es bastante.

### Por qué me parece importante

Este estudio cambia la conversación. En vez de "para hasta que deje de doler", podemos decir algo más cercano a "sigamos, pero escuchando cómo responde tu tendón". Para muchas personas eso hace una gran diferencia en la adherencia y en cómo viven el proceso.

La guía holandesa de 2021 recoge esta idea cuando recomienda usar una escala de dolor para ajustar la actividad.

### Cómo lo explico en consulta

Me sirve presentarlo como un semáforo. Mientras el dolor durante la actividad esté en 5 de 10 o menos, y a la mañana siguiente vuelvas a estar como antes, puedes seguir. Si amaneces bastante peor o la rigidez matinal viene subiendo semana a semana, no se suspende todo: se baja un poco la carga y se vuelve a mirar.

Lo valioso es que le da a la persona un criterio propio para decidir, sin depender de mí cada vez que siente algo. Y cambia la relación con el dolor: deja de ser una señal de que hay que parar y pasa a ser una información para ajustar.
### Límites

Es un ensayo pequeño, con 38 personas, en adultos con tendinopatía de la porción media. No sabemos si los resultados se repiten igual en tendinopatía insercional o en deportistas de alto rendimiento con mucha carga.`,
    references: [
      {
        author: 'Silbernagel KG, Thomeé R, Eriksson BI, Karlsson J.',
        year: '2007',
        journal: 'The American Journal of Sports Medicine, 35(6):897-906',
        doi: '10.1177/0363546506298279',
        title: 'Continued sports activity, using a pain-monitoring model, during rehabilitation in patients with Achilles tendinopathy: a randomized controlled study'
      },
      {
        author: 'de Vos RJ, van der Vlist AC, Zwerver J, et al.',
        year: '2021',
        journal: 'British Journal of Sports Medicine',
        doi: '10.1136/bjsports-2020-103867',
        title: 'Dutch multidisciplinary guideline on Achilles tendinopathy'
      }
    ]
  },
  {
    id: '52',
    slug: 'tendinopatia-rotuliana-carga-progresiva-breda-2021',
    title: 'Tendinopatía rotuliana: carga progresiva mejor que solo excéntricos',
    subtitle: 'Breda y colaboradores (BJSM, 2021) compararon un programa de carga del tendón en cuatro etapas con el clásico ejercicio excéntrico en plano inclinado. A las 24 semanas, la carga progresiva funcionó mejor.',
    categoryType: 'segmento',
    categoryValue: 'rodilla',
    categoryLabel: 'Rodilla',
    audience: 'ambos',
    date: '26 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 5,
    summary: 'En 76 personas con dolor rotuliano de larga data, el programa de carga progresiva mejoró 28 puntos en el VISA-P contra 18 del programa excéntrico.',
    pullQuote: 'La carga progresiva del tendón se recomienda como tratamiento conservador inicial de la tendinopatía rotuliana.',
    content: `La tendinopatía rotuliana, conocida como "rodilla del saltador", es común en deportes con saltos como el vóleibol y el básquetbol. Durante años, el tratamiento más usado fue el ejercicio **excéntrico en plano inclinado**: bajar en sentadilla sobre una tabla inclinada, aunque duela.

Stephan Breda y su grupo en Rotterdam se preguntaron si un programa que va cargando el tendón de forma progresiva funciona mejor. Lo publicaron en 2021 en el *British Journal of Sports Medicine*.

### Quiénes participaron

Fueron 76 deportistas recreativos, competitivos y profesionales, de 18 a 35 años (promedio 24), que entrenaban al menos tres veces por semana. Llevaban **una mediana de dos años con síntomas**, el 42% tenía dolor en ambas rodillas y el 82% ya había probado otros tratamientos sin recuperarse del todo, sobre todo kinesiología. Es decir, no eran casos fáciles.

El diagnóstico se confirmó con examen clínico (dolor al palpar el polo inferior de la rótula y en la sentadilla a una pierna) y con ecografía. Al inicio, el puntaje VISA-P promedio era de 55 sobre 100.

### Las dos intervenciones

Ambos programas duraron 24 semanas, se hacían sin supervisión con folletos y videos, e incluían además ejercicios para la cadera, la pantorrilla y el tronco. Todos recibieron la misma educación: qué es la tendinopatía, cómo se relacionan la carga y el dolor usando el modelo de monitoreo del dolor, y la indicación de bajar o evitar por al menos 4 semanas lo que provocaba mucho dolor.

**Ejercicio excéntrico:** dos veces al día durante 12 semanas, en una tabla inclinada a 25°. Se bajaba con la pierna afectada y se subía con la otra. La indicación era hacerlo **con dolor**, al menos 5 de 10, y agregar peso en una mochila si dolía poco.

**Carga progresiva del tendón**, en cuatro etapas, siempre con dolor de **3 de 10 o menos**:

[[figura:rotuliana-etapas]]

- **Etapa 1, isométricos:** prensa o extensión de rodilla a una pierna, 5 repeticiones de 45 segundos a 60° de flexión, con alrededor del 70% de la fuerza máxima, todos los días.
- **Etapa 2, isotónicos:** día por medio, partiendo con 4 series de 15 repeticiones y avanzando hasta 4 series de 6, con más peso y más rango.
- **Etapa 3, almacenar energía:** cada tres días, sentadillas con salto, saltos al cajón y cambios de dirección, de 3 series de 10 con ambas piernas hasta 6 series de 10 con una.
- **Etapa 4, deporte:** volver de a poco a los gestos del deporte, cada 2 o 3 días.

Para pasar de etapa, la persona hacía una sentadilla a una pierna: si el dolor era de 3 de 10 o menos y llevaba al menos una semana en esa etapa, avanzaba. Lo más rápido posible para volver a competir era 4 semanas.

### Qué encontraron

[[figura:rotuliana-ptle]]

A las 24 semanas, el grupo de carga progresiva mejoró **28 puntos** en el cuestionario VISA-P (de 56 a 84), contra **18 puntos** del grupo excéntrico (de 57 a 75). La diferencia ajustada fue de 9 puntos a favor de la carga progresiva.

Hay un detalle interesante en el tiempo: **a las 12 semanas los dos grupos estaban prácticamente iguales**. La diferencia apareció en la segunda mitad, cuando el grupo de carga progresiva entró a las etapas de saltos y deporte. Los autores lo leen como una señal de que la etapa de almacenar energía importa antes de volver al deporte.

Otros resultados:

- Volvió a su deporte al nivel previo un 43% del grupo de carga progresiva frente a un 27% del excéntrico. La tendencia favorece a la carga progresiva, pero la diferencia no fue significativa.
- Los ejercicios **dolían menos**: 2 de 10 contra 4 de 10.
- La satisfacción general fue parecida (81% y 83%), pero quienes la calificaron como "excelente" fueron muchos más en la carga progresiva: 38% contra 10%.
- La adherencia fue baja en ambos: 40% y 49% de las sesiones indicadas.
- No hubo eventos adversos graves.

### Por qué tiene sentido

El tendón rotuliano funciona como un resorte que almacena y libera energía al saltar. Un programa que primero calma el dolor, luego construye fuerza y después vuelve a entrenar esa función de resorte se parece más a lo que la persona necesita para volver a su deporte. El excéntrico solo trabaja una parte de ese camino.

Se pensaba que la ventaja venía de los isométricos, por su efecto sobre el dolor. Pero los mismos autores reconocen que estudios recientes no han confirmado ese efecto inmediato, y en este ensayo la diferencia apareció tarde, no al principio.

### Lo que me deja

Que el tendón no necesita doler mucho para mejorar. Que la progresión con criterios claros (dolor de 3 de 10 o menos en una sentadilla a una pierna) le da a la persona un mapa. Y que, incluso con el mejor programa, menos de la mitad volvió a su nivel previo en seis meses, con poca adherencia y sin supervisión. Los autores sugieren que con acompañamiento de un kinesiólogo los resultados podrían ser mejores, y estoy de acuerdo: el programa es bueno, pero hay que sostenerlo.
### Límites

El seguimiento principal fue a 24 semanas y menos de la mitad cumplió bien con los ejercicios. Fue un solo centro, con deportistas jóvenes y una mezcla de niveles. Se perdieron 9 personas en el seguimiento, 8 de ellas del grupo excéntrico, y en el peor escenario posible de esos datos perdidos la ventaja de la carga progresiva desaparecería, aunque los autores lo consideran poco probable. La variación entre personas fue grande: a algunos les fue muy bien y a otros poco.`,
    references: [
      {
        author: 'Breda SJ, Oei EHG, Zwerver J, Visser E, Waarsing E, Krestin GP, de Vos RJ.',
        year: '2021',
        journal: 'British Journal of Sports Medicine, 55(9):501-509',
        doi: '10.1136/bjsports-2020-103403',
        title: 'Effectiveness of progressive tendon-loading exercise therapy in patients with patellar tendinopathy: a randomised clinical trial'
      }
    ]
  },
  {
    id: '53',
    slug: 'tendinopatia-glutea-educacion-ejercicio-leap-mellor-2018',
    title: 'Dolor lateral de cadera: educación y ejercicio frente a una infiltración',
    subtitle: 'El ensayo LEAP (Mellor y colaboradores, BMJ 2018) comparó educación más ejercicio, una infiltración de corticoides y esperar sin tratamiento en 204 personas con tendinopatía glútea.',
    categoryType: 'segmento',
    categoryValue: 'cadera',
    categoryLabel: 'Cadera',
    audience: 'ambos',
    date: '26 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 6,
    summary: 'A las 8 semanas, el 77% de quienes hicieron educación y ejercicio reportó una mejoría clara, contra el 58% con infiltración y el 29% de quienes esperaron.',
    pullQuote: 'La educación más ejercicio funcionó mejor que la infiltración de corticoides, y la diferencia se mantuvo al año.',
    content: `El dolor en la parte lateral de la cadera, que antes se llamaba casi siempre "bursitis trocantérea", hoy se entiende sobre todo como una **tendinopatía de los glúteos medio y menor**. Es frecuente en mujeres después de la menopausia y puede afectar bastante el sueño y la vida diaria.

Durante mucho tiempo la respuesta habitual fue una infiltración de corticoides. El ensayo LEAP, liderado por Rebecca Mellor y Bill Vicenzino en Australia y publicado en el *BMJ* en 2018, comparó esa opción con un programa de educación y ejercicio. Alison Grimaldi, una de las referentes en cadera, fue parte del equipo.

### Quiénes participaron

Fueron 204 personas de Brisbane y Melbourne, de entre 35 y 70 años (82% mujeres, edad promedio 55 años), con dolor lateral de cadera por más de tres meses y al menos 4 de 10 de intensidad. La mediana de duración de los síntomas era de dos años, y en casi 9 de cada 10 había empezado sin una causa clara. El diagnóstico lo hacía un kinesiólogo con pruebas clínicas y se confirmaba con resonancia. Se excluyó a quienes tenían dolor lumbar, ciático o inguinal relevante, para estudiar el cuadro lo más puro posible.

Según los autores, este problema afecta a una de cada cuatro mujeres mayores de 50 años, y la discapacidad que genera se compara con la de una artrosis de cadera severa.

### Los tres grupos

- **Educación y ejercicio:** 14 sesiones individuales con kinesiólogo durante 8 semanas (una primera de 60 minutos y las demás de 30), con material escrito y en video, más 4 a 6 ejercicios diarios en casa.
- **Infiltración:** una sola inyección de corticoides guiada por ecografía.
- **Esperar y ver:** una sesión con un kinesiólogo que explicó el cuadro y los posibles factores de riesgo, aconsejó seguir activo y aseguró que tiende a mejorar con el tiempo.

El programa de educación y ejercicio tenía dos focos:

1. **Evitar posiciones y movimientos que comprimen los tendones** del glúteo medio y menor contra el trocánter. Por ejemplo, cruzar las piernas, quedarse de pie cargando el peso hacia un lado (con la cadera "colgada") o dormir de lado sin apoyo entre las rodillas.
2. **Fortalecer de forma progresiva y específica** los abductores de cadera y entrenar el control para que la rodilla y la pelvis no se vayan hacia adentro durante tareas como caminar o subir escaleras.

La adherencia a los ejercicios en casa fue alta: más del 80% de las sesiones semanales.

### Qué encontraron

[[figura:glutea-leap]]

A las **8 semanas**, reportó una mejoría clara el 77% del grupo de educación y ejercicio, el 58% del grupo con infiltración y el 29% de quienes esperaron. El dolor promedio fue de 1,5, 2,7 y 3,8 sobre 10, respectivamente.

Para dimensionarlo, los autores calcularon el número necesario a tratar: **por cada 2 personas** que hacen educación y ejercicio en vez de esperar, una más reporta una mejoría clara a las 8 semanas. Comparado con la infiltración, hay que tratar a 5 para que una más mejore.

Un dato que me llamó la atención: a las 4 semanas, educación-ejercicio e infiltración estaban empatadas (58% cada una). La inyección alivia rápido, pero desde ahí el ejercicio siguió subiendo y la infiltración se estancó.

Al **año**, la mejoría global se mantuvo mejor con educación y ejercicio (78%) que con infiltración (57%) o esperando (52%). La infiltración, de hecho, ya no se diferenciaba de esperar. En intensidad de dolor, en cambio, educación-ejercicio e infiltración terminaron parecidas, y ambas mejor que esperar.

Otro hallazgo curioso: a las 8 semanas, la fuerza de los abductores casi no cambió entre grupos. Los autores sugieren que gran parte del beneficio pudo venir de la **educación**: entender qué irrita el tendón, cómo dosificar y sentir más control sobre el problema. El grupo de educación y ejercicio también mejoró más en autoeficacia frente al dolor y en calidad de vida.

### Cómo lo leo

La infiltración ayuda en el corto plazo, pero la educación y el ejercicio ayudan más y por más tiempo, y además dejan a la persona con herramientas propias. También vale notar que la mitad de quienes esperaron mejoraron al año: el cuadro tiende a mejorar, aunque más lento.

En consulta, esto me recuerda que la educación sobre compresión no es una charla de cinco minutos antes del "verdadero" tratamiento. Es una parte central, que hay que repasar, ajustar a la vida de cada persona y acompañar con un ejercicio bien elegido. Un ensayo anterior con ejercicios en casa genéricos, sin educación sobre compresión, había mostrado resultados muy pobres. La diferencia probablemente estuvo en ser específicos.
### Límites

Las personas sabían qué tratamiento recibían y los resultados principales fueron reportados por ellas mismas, lo que puede inflar las diferencias, sobre todo frente a un grupo sin tratamiento. El grupo de ejercicio tuvo muchas más sesiones de contacto con un profesional. Y se excluyó a personas con dolor lumbar o artrosis de cadera, que en la práctica aparecen a menudo junto a este cuadro.`,
    references: [
      {
        author: 'Mellor R, Bennell K, Grimaldi A, Nicolson P, Kasza J, Hodges P, Wajswelner H, Vicenzino B.',
        year: '2018',
        journal: 'BMJ, 361:k1662',
        doi: '10.1136/bmj.k1662',
        title: 'Education plus exercise versus corticosteroid injection use versus a wait and see approach on global outcome and pain from gluteal tendinopathy: prospective, single blinded, randomised clinical trial'
      },
      {
        author: 'Grimaldi A, Fearon A.',
        year: '2015',
        journal: 'Journal of Orthopaedic & Sports Physical Therapy, 45(11):910-922',
        doi: '10.2519/jospt.2015.5829',
        title: 'Gluteal Tendinopathy: Integrating Pathomechanics and Clinical Features in Its Management'
      }
    ]
  },
  {
    id: '54',
    slug: 'tendinopatia-isquiotibial-proximal-goom-2016',
    title: 'Dolor profundo en el glúteo al sentarte: tendinopatía isquiotibial proximal',
    subtitle: 'Goom, Malliaras, Reiman y Purdam (JOSPT, 2016) resumen cómo evaluarla y manejarla, tomando los principios que funcionan en otros tendones.',
    categoryType: 'segmento',
    categoryValue: 'cadera',
    categoryLabel: 'Cadera',
    audience: 'ambos',
    date: '26 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 5,
    summary: 'Duele en la parte baja del glúteo, sobre todo al estar sentado o al correr rápido. El manejo combina menos compresión del tendón al principio y carga progresiva después.',
    pullQuote: 'Algunos principios establecidos en la tendinopatía de Aquiles y rotuliana parecen aplicar también aquí.',
    content: `Es ese dolor profundo en la parte baja del glúteo, justo donde te sientas. Aparece en corredores, en deportistas de velocidad y también en personas que no hacen deporte. Suele durar bastante y molesta en cosas tan cotidianas como manejar o pasar horas sentado.

Tom Goom, Peter Malliaras, Michael Reiman y Craig Purdam publicaron en 2016 en el *JOSPT* una revisión narrativa sobre cómo evaluar y manejar la **tendinopatía isquiotibial proximal**. Una aclaración honesta desde el inicio: en ese momento no existían ensayos clínicos sobre su rehabilitación. Lo que proponen se basa en lo que sabemos de otros tendones y en experiencia clínica.

### Cómo se presenta

- Dolor localizado en el origen de los isquiotibiales, en la tuberosidad isquiática.
- Empeora al **estar sentado**, sobre todo en superficies duras.
- Molesta en carreras rápidas, en subidas, en zancadas largas o en estiramientos con la cadera flexionada.

La evaluación busca reproducir ese dolor con cargas progresivas del tendón, empezando con poca flexión de cadera y avanzando a posiciones de más flexión, donde el tendón queda más comprimido y estirado. Algunos ejemplos: un puente sostenido, el puente a una pierna, pruebas de estiramiento con la rodilla flexionada y, si todo eso se tolera, movimientos más rápidos. La idea es encontrar en qué punto aparece el dolor y usarlo como referencia para seguir la evolución.

Igual de importante es **descartar otras fuentes de dolor** en la zona. El dolor glúteo profundo también puede venir de la columna lumbar, del nervio ciático, de la articulación sacroilíaca o de la cadera. Una lesión aguda del tendón, como un desgarro en el origen, se maneja distinto.

### La compresión importa

Igual que en el glúteo medio, el tendón se irrita cuando queda **comprimido contra el hueso**, y eso pasa cuando la cadera está muy flexionada: al sentarse inclinado hacia adelante o al estirar los isquiotibiales. Por eso, al comienzo se sugiere reducir esas posiciones por un tiempo, por ejemplo usando un cojín al sentarse o evitando los estiramientos intensos.

### Cómo se progresa

[[figura:isquio-proximal]]

La propuesta es por etapas:

- **Etapa 1, calmar y cargar sin comprimir.** Isométricos con la cadera poco flexionada, por ejemplo puentes sostenidos o flexión de rodilla contra resistencia. Mantener la actividad que no provoca, como trotar suave si se tolera.
- **Etapa 2, fuerza.** Ejercicios lentos y pesados, primero con poca flexión de cadera y después sumando de a poco más flexión, por ejemplo pasando de puentes a variantes de peso muerto. Fortalecer también glúteos, cuádriceps y pantorrilla.
- **Etapa 3, energía.** Ejercicios más rápidos que usan el tendón como resorte, como saltos y aceleraciones.
- **Etapa 4, retorno.** Carrera a mayor velocidad, subidas, zancadas largas y los gestos propios del deporte.

El dolor durante el ejercicio y la respuesta al día siguiente guían el ritmo, igual que en Aquiles y rotuliana. Como en otros tendones, se suele aceptar algo de dolor durante la carga, siempre que se calme pronto y no empeore al día siguiente.

### El problema de estirar

Muchas personas con este dolor sienten "apretados" los isquiotibiales y los estiran con fuerza. El problema es que el estiramiento en flexión de cadera es justamente la posición que más comprime el tendón irritado. Por eso al comienzo se sugiere suspender los estiramientos intensos y reintroducirlos más adelante, cuando el tendón tolere mejor la carga.

### Sentarse también es carga

Para quienes trabajan sentados, ajustar la silla puede hacer una gran diferencia: un cojín más blando, apoyar el peso más hacia la parte de atrás de los muslos, evitar inclinarse mucho hacia adelante y pararse cada cierto rato. No es un detalle: si el tendón pasa ocho horas comprimido, cuesta que el ejercicio por sí solo alcance.
### Límites

Es una revisión narrativa y una propuesta clínica. No hay ensayos que comparen este enfoque con otros, así que conviene tomarlo como un buen punto de partida y no como una receta.`,
    references: [
      {
        author: 'Goom TSH, Malliaras P, Reiman MP, Purdam CR.',
        year: '2016',
        journal: 'Journal of Orthopaedic & Sports Physical Therapy, 46(6):483-493',
        doi: '10.2519/jospt.2016.5986',
        title: 'Proximal Hamstring Tendinopathy: Clinical Aspects of Assessment and Management'
      }
    ]
  },
  {
    id: '55',
    slug: 'pliometria-potencia-personas-mayores',
    title: 'Saltar después de los 60: potencia y pliometría en personas mayores',
    subtitle: 'Con los años perdemos más rápido la capacidad de generar fuerza veloz que la fuerza máxima. Tres revisiones recientes muestran que eso también se entrena.',
    categoryType: 'tematica',
    categoryValue: 'entrenamiento-fuerza',
    categoryLabel: 'Fuerza como intervención',
    audience: 'ambos',
    date: '26 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 5,
    summary: 'Entrenar con intención de moverse rápido mejora algo más la función física que el entrenamiento de fuerza tradicional en personas mayores, y los saltos también mejoran con entrenamiento a cualquier edad.',
    pullQuote: 'El entrenamiento de potencia se asoció a una mejora modesta de la función física frente al entrenamiento de fuerza tradicional.',
    content: `Levantarte rápido de una silla, subir un escalón alto o recuperar el equilibrio cuando tropiezas. Todas esas tareas dependen menos de cuánta fuerza tienes y más de **qué tan rápido puedes generarla**. Esa capacidad, la potencia, se pierde antes y más rápido que la fuerza máxima con el envejecimiento.

Por eso tiene sentido preguntarse si en personas mayores conviene entrenar con velocidad, e incluso con saltos. Durante mucho tiempo la respuesta implícita fue "mejor no". La evidencia actual dice otra cosa.

### Levantar rápido frente a levantar lento

Una revisión sistemática de Balachandran y colaboradores, publicada en *JAMA Network Open* en 2022, juntó **20 ensayos con 566 personas mayores de 60 años** que vivían en la comunidad. Compararon el entrenamiento de fuerza tradicional (subir y bajar el peso controlado) con el de potencia (subir el peso lo más rápido posible y bajarlo controlado).

Los participantes tenían en promedio 70 años y dos tercios eran mujeres. La función física se midió con pruebas como pararse de una silla, subir escaleras o caminar cierta distancia.

El entrenamiento de potencia se asoció a una **mejora pequeña pero mayor en la función física** (diferencia estandarizada de 0,30 en 13 ensayos). En la función reportada por las propias personas la diferencia fue incierta, porque había solo 3 ensayos. La certeza de la evidencia fue baja, por riesgo de sesgo e imprecisión, así que es una señal a favor más que una conclusión cerrada.

Lo que me parece más útil es que **el cambio en el entrenamiento es mínimo**: el mismo ejercicio, con el mismo peso, pero con la intención de subir lo más rápido posible. No requiere máquinas especiales ni saltos.

### Potencia y riesgo de caídas

Otra revisión, de Jiménez-Lupión y colaboradores (*Archives of Physical Medicine and Rehabilitation*, 2023), analizó 12 estudios con 478 personas mayores que podían hacer ejercicio de forma independiente. El entrenamiento de potencia mejoró algo más que otros tipos de ejercicio en pruebas ligadas al riesgo de caídas: unas tres décimas de segundo menos en el *Timed Up and Go* y cerca de 2 repeticiones más en el test de sentarse y pararse en 30 segundos. Son diferencias pequeñas y con intervalos amplios, pero apuntan en la misma dirección.

### ¿Y los saltos?

Una revisión del chileno Rodrigo Ramírez-Campillo y colaboradores (*Sports Medicine*, 2023) reunió 61 estudios con 2.576 participantes de **8 a 73 años**. Miraron el índice de fuerza reactiva, que mide qué tan bien usas el rebote: cuánto saltas en relación al tiempo que estás en el suelo.

El entrenamiento pliométrico mejoró ese índice con un efecto moderado (0,54) y con certeza moderada. El efecto fue **mayor en adultos que en niños**, y mejor con programas de más de 7 semanas, más de 14 sesiones y tres sesiones por semana. La mayoría de los estudios no reportó dolor ni lesiones asociadas.

Hay que decirlo con honestidad: la mayoría de los participantes eran jóvenes y deportistas, y muy pocos eran personas mayores. Lo que muestra esta revisión es que la capacidad de rebote sigue respondiendo al entrenamiento en la adultez, no que esté probado en personas de 75 años.

[[figura:potencia-mayores]]

### Cómo lo llevaría a la práctica

- **Empezar con fuerza.** La potencia se construye sobre una base de fuerza suficiente.
- **Agregar intención de velocidad** en ejercicios conocidos: pararse de una silla lo más rápido posible, subir un escalón rápido, empujar en la prensa con velocidad y bajar lento.
- **Progresar a saltos de baja altura**: pequeños rebotes en el lugar, saltos a un escalón bajo, siempre con buen aterrizaje, pocas repeticiones y bastante pausa entre series.
- **Usar pruebas simples para seguir el progreso**, como el test de sentarse y pararse en 30 segundos o el *Timed Up and Go*.
- **Ajustar según la confianza, el dolor y la historia de cada persona.** Alguien con osteoporosis avanzada, una prótesis reciente o miedo a caerse necesita otro punto de partida, no quedar fuera.

Me parece importante porque muchas veces el entrenamiento en personas mayores se queda en ejercicios lentos y suaves por precaución. La evidencia sugiere que esa precaución, aplicada a todos por igual, puede dejar fuera algo que les sirve para su vida diaria: reaccionar rápido.
### Límites

La mayoría de los estudios incluyó personas mayores sanas y activas. Hay menos información en personas frágiles o con osteoporosis avanzada, y la certeza de la evidencia sigue siendo baja.`,
    references: [
      {
        author: 'Balachandran AT, Steele J, Angielczyk D, et al.',
        year: '2022',
        journal: 'JAMA Network Open, 5(5):e2211623',
        doi: '10.1001/jamanetworkopen.2022.11623',
        title: 'Comparison of Power Training vs Traditional Strength Training on Physical Function in Older Adults: A Systematic Review and Meta-analysis'
      },
      {
        author: 'Jiménez-Lupión D, Chirosa-Ríos L, Martínez-García D, Rodríguez-Pérez M, Jerez-Mayorga D.',
        year: '2023',
        journal: 'Archives of Physical Medicine and Rehabilitation, 104(9):1514-1525',
        doi: '10.1016/j.apmr.2023.01.022',
        title: 'Effects of Power Training on Functional Capacity Related to Fall Risk in Older Adults: A Systematic Review and Meta-analysis'
      },
      {
        author: 'Ramirez-Campillo R, Thapa RK, Afonso J, Perez-Castilla A, Bishop C, Byrne PJ, Granacher U.',
        year: '2023',
        journal: 'Sports Medicine, 53(5):1029-1053',
        doi: '10.1007/s40279-023-01825-0',
        title: 'Effects of Plyometric Jump Training on the Reactive Strength Index in Healthy Individuals Across the Lifespan: A Systematic Review with Meta-analysis'
      }
    ]
  },
  {
    id: '56',
    slug: 'maquina-de-creer-alcock',
    title: 'La máquina de creer: por qué cuesta tanto cambiar una creencia',
    subtitle: 'El psicólogo James Alcock explica que nuestro sistema nervioso no evolucionó para acertar, sino para sobrevivir. Entenderlo cambia cómo conversamos con nuestros pacientes y con nosotros mismos.',
    categoryType: 'tematica',
    categoryValue: 'sesgos-cognitivos',
    categoryLabel: 'Sesgos cognitivos en clínica',
    audience: 'ambos',
    date: '26 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 6,
    summary: 'Creemos cosas sin evidencia con la misma seguridad con la que creemos cosas ciertas. No es un problema de inteligencia: es cómo funciona el cerebro.',
    pullQuote: 'La pregunta útil no es por qué alguien cree algo falso, sino qué lo sostiene hoy.',
    content: `Un horóscopo, un amuleto, una técnica que "siempre me ha funcionado". Son creencias muy distintas, pero las sostenemos con una seguridad parecida. James Alcock, psicólogo de la Universidad de York en Canadá, dedicó un libro entero a explicar por qué: *Belief: What It Means to Believe and Why Our Convictions Are So Compelling* (2018).

Su idea central es incómoda y útil a la vez: **nuestro sistema nervioso no evolucionó para distinguir lo verdadero de lo falso. Evolucionó para mantenernos vivos.**

### No es un problema de inteligencia

Hace dos siglos se pensaba que la educación terminaría con las supersticiones. No pasó. Las personas con más años de estudio también sostienen certezas sin evidencia detrás. Un ejemplo simple: casi todos creemos que lavarnos los dientes protege nuestra salud dental, y casi ninguno de nosotros conoce la evidencia que lo respalda. Nos lo enseñaron, tiene sentido y nadie nos pidió cuestionarlo.

### Un sistema que prefiere sobrevivir a acertar

Piensa en un conejo que escucha un crujido entre los pastos. Si se detiene a confirmar si es un zorro, quizás no llega a tener crías. El que arranca ante la duda sobrevive más. Para un cerebro así, a veces equivocarse a tiempo vale más que acertar tarde.

### Cómo nace una creencia

**Por asociación.** El cerebro une cosas que ocurren juntas, aunque no tengan relación. Piensas en alguien y a los minutos te llama: la mente arma la explicación al instante y olvida todas las veces que pensaste en esa persona y no llamó.

**Por percepción y emoción.** No vemos el mundo limpio: lo filtramos con lo que ya creemos, y notamos mucho más rápido lo que confirma una idea que lo que la contradice. Si además la experiencia viene con una emoción fuerte, la creencia queda grabada con más fuerza.

### Cómo se mantiene

**Con una memoria que se reescribe.** No guardamos grabaciones exactas. Reconstruimos el recuerdo cada vez que lo evocamos, y lo ajustamos a lo que creemos hoy. Por eso dos hermanos pueden recordar la misma comida familiar de formas distintas, ambos con total seguridad.

**Con retroalimentación.** Si actúas según una creencia y "te funciona", no hay razón para cambiarla. El entorno pocas veces castiga una creencia falsa que dio el resultado esperado.

### Por qué me importa en la consulta

Muchas creencias sobre el dolor siguen este camino. "Se me salió algo de lugar", "tengo la cadera descuadrada", "si me duele es porque me estoy dañando". Llegan por una explicación que alguien dio, se refuerzan con una emoción fuerte y se sostienen porque, cada vez que la persona descansa, el dolor baja.

Discutir esa creencia de frente rara vez funciona. Alcock propone cambiar la pregunta: **no es por qué cree algo que no es cierto, sino qué retroalimentación la sostiene hoy y qué experiencia nueva podría actualizarla.**

En la práctica, eso puede empezar con algo como: "Entiendo que sientas que algo está fuera de lugar. ¿Qué fue lo que notaste la primera vez que lo pensaste?". Dejar que la creencia se explique antes de intentar reemplazarla. Y después ofrecer experiencias, como moverse y ver que no pasa nada malo, que la contradigan desde el cuerpo y no solo desde el argumento.

### Lo que me deja a mí

Esto no es solo para entender a otros. Si mi sistema nervioso funciona igual, mis certezas clínicas también pueden estar sostenidas por asociación, emoción y retroalimentación. Saberlo me vuelve un poco más humilde con lo que creo que "siempre funciona".`,
    references: [
      {
        author: 'Alcock J.',
        year: '2018',
        journal: 'Prometheus Books',
        title: 'Belief: What It Means to Believe and Why Our Convictions Are So Compelling'
      }
    ]
  },
  {
    id: '57',
    slug: 'patologizacion-narrativa-adaptacion',
    title: 'Contar la historia sin convertir a la persona en un diagnóstico',
    subtitle: 'Peckham y Hamilton (International Journal of Mental Health Nursing, 2026) proponen mirar el sufrimiento como una adaptación y no solo como una patología. Lo que eso le enseña a la kinesiología sobre cómo hablamos.',
    categoryType: 'tematica',
    categoryValue: 'salud-mental',
    categoryLabel: 'Salud mental y movimiento',
    audience: 'clinico',
    date: '26 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 6,
    summary: 'Las palabras con que explicamos lo que le pasa a alguien pueden hacerlo sentir dañado o adaptado. La diferencia no es solo de tono: cambia lo que la persona cree que puede hacer.',
    pullQuote: 'Pasar de "qué tienes de malo" a "qué te ha pasado" es un avance, pero no basta si la historia sigue contada como daño.',
    content: `Hay frases que escuchamos tanto en consulta que dejamos de notarlas: "tienes una espalda de 70 años", "tu rodilla está mal", "tienes el sistema nervioso desregulado". Son explicaciones bien intencionadas, pero cuentan la historia de la persona como una historia de daño.

Haley Peckham y Bridget Hamilton, de la Universidad de Melbourne, escribieron en 2026 un artículo de perspectiva sobre este problema en salud mental. Aunque su foco es el trauma y la adversidad en la infancia, la idea de fondo sirve mucho para quienes trabajamos con dolor.

### El problema que plantean

Desde los estudios sobre experiencias adversas en la infancia sabemos que haber vivido trauma o adversidad se asocia a más problemas de salud física y mental en la adultez. La lectura médica habitual es que esas experiencias **dañan** y producen patología.

Las autoras señalan que incluso los enfoques "informados en trauma", que cambiaron la pregunta "¿qué tienes de malo?" por "¿qué te ha pasado?", pueden seguir contando la historia como daño. Le llaman a eso un **marco patologizante**.

### La alternativa: adaptación

Proponen lo que llaman la *Narrativa Neuroplástica*. La idea es que el cerebro y la fisiología se moldean según el entorno en que crecemos. Si ese entorno fue amenazante, el cuerpo aprendió a funcionar de una forma que tenía sentido para sobrevivir ahí. Eso no es una falla: es haberse adaptado.

Para explicarlo usan una idea de la biología evolutiva, la **teoría de historia de vida**. Todo organismo reparte su energía entre crecer, mantenerse y reproducirse, y el entorno temprano empuja ese reparto hacia una estrategia más "rápida" o más "lenta".

- En entornos **seguros y predecibles**, el desarrollo tiende a ser más lento: más inversión en aprender, planificar y cuidar la salud a largo plazo.
- En entornos **amenazantes e impredecibles**, tiene sentido una estrategia más rápida: estar alerta, aprovechar el presente, tomar más riesgos. Si el futuro es incierto, vivir para hoy es lógico.

Ninguna estrategia es mejor en sí misma. Cada una calza con el entorno en que se formó. El problema aparece cuando una estrategia rápida, que tuvo sentido en un entorno duro, sigue funcionando en un entorno distinto, y además tiene un costo en salud y en años de vida.

A esa variedad de cerebros y fisiologías que resulta de adaptarse a distintas experiencias la llaman **diversidad neuroecológica**. Y sostienen que contarlo así es **menos vergonzante** para la persona, además de llevar la atención hacia las condiciones sociales e injusticias que generan esos entornos.

### Qué tiene que ver con el dolor

Mucho. Un sistema nervioso más sensible, una forma protectora de moverse o un miedo a ciertas actividades también pueden entenderse como adaptaciones que en algún momento tuvieron sentido. Contarlo así cambia el mensaje:

- En vez de "tu sistema nervioso está alterado", algo como "tu cuerpo aprendió a protegerse mucho, y eso se puede volver a entrenar".
- En vez de "tienes una espalda débil", algo como "tu espalda se acostumbró a moverse poco, y puede volver a tolerar más".

La segunda versión no niega lo que pasa. Pero deja a la persona con algo que puede hacer, en vez de con algo que tiene que cargar.

Lo mismo con la historia de cada persona. Alguien que vivió años de estrés, que dormía poco o que trabajaba en condiciones duras no tiene "un cuerpo malo". Tiene un cuerpo que hizo lo que pudo en ese contexto. Y si el contexto cambia, el cuerpo también puede cambiar: esa es justamente la idea de neuroplasticidad que usan las autoras.

### Cómo intento hablar en consulta

- Describir lo que encuentro como una respuesta del cuerpo, no como una falla: "está protegiendo", "se acostumbró", "se sensibilizó".
- Preguntar por la historia antes de explicar: qué pasaba en su vida cuando empezó el dolor, qué cosas lo empeoran.
- Dejar siempre una puerta abierta al cambio: lo que se adaptó una vez puede volver a adaptarse.
- Cuidar los diagnósticos con palabras que asustan y explicarlos cuando aparecen en un informe.

### Por qué me importa

Lo que decimos en consulta se queda con las personas mucho después de la sesión. Si la historia que se lleva es la de un cuerpo dañado, es lógico que se mueva con miedo. Si es la de un cuerpo que se adaptó y que puede seguir adaptándose, hay espacio para el cambio.

Esto no significa evitar los diagnósticos ni endulzar la realidad. Significa elegir con cuidado cómo contamos la historia, porque también es parte del tratamiento.

### Límites

Es un artículo de perspectiva, no un estudio con datos nuevos, escrito para enfermería en salud mental. Su aplicación al dolor musculoesquelético es mi lectura, y la evidencia directa sobre el efecto de este lenguaje en kinesiología todavía es limitada.`,
    references: [
      {
        author: 'Peckham H, Hamilton B.',
        year: '2026',
        journal: 'International Journal of Mental Health Nursing, 35',
        doi: '10.1111/inm.70248',
        title: 'The Neuroplastic Narrative and Neuro-Ecological Diversity: Non-Pathologizing Biological Foundations for Trauma-Informed Medical and Mental Health Nursing'
      }
    ]
  },
  {
    id: '58',
    slug: 'ejercicio-diabetes-pediatrica-ispad-2022',
    title: 'Ejercicio en niños y adolescentes con diabetes: la consulta en cinco pasos',
    subtitle: 'La guía ISPAD 2022 (Adolfsson y colaboradores) ordena qué preguntar, cómo responde la glicemia a cada tipo de ejercicio y cuándo conviene esperar.',
    categoryType: 'tematica',
    categoryValue: 'fisiologia-clinica',
    categoryLabel: 'Fisiología clínica del ejercicio',
    audience: 'clinico',
    date: '26 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 6,
    summary: 'El ejercicio baja la HbA1c, mejora la condición física y protege el corazón. Lo que frena a muchos niños es el miedo a la hipoglicemia, y eso se trabaja con un plan.',
    pullQuote: 'No existe un enfoque único: la respuesta de cada niño depende de la duración, la intensidad, la glicemia inicial, la insulina y la comida.',
    content: `El ejercicio es una de las mejores herramientas para un niño o adolescente con diabetes, y también una de las que menos se usa. Menos del 10% de la población juvenil cumple las recomendaciones de movimiento, y los niños con diabetes tipo 1 menores de 7 años se mueven todavía menos que sus pares.

La Sociedad Internacional de Diabetes Pediátrica y del Adolescente (ISPAD) publicó en 2022 su guía sobre ejercicio, liderada por Peter Adolfsson. Lo que sigue es un resumen de lo que revisé en el magíster, pensando en cómo usarlo en consulta.

### Qué gana el niño al moverse

- Baja la HbA1c entre 0,3% y 0,5%.
- Mejora la condición cardiorrespiratoria, la masa y la fuerza muscular y la densidad ósea.
- Mejora la sensibilidad a la insulina y el perfil cardiovascular, y se asocia a menor mortalidad.

### Por qué cuesta

Las barreras más comunes son la hipoglicemia y **el miedo a ella**, la hiperglicemia, la imagen corporal, la planificación y las dudas de los padres. En adolescentes con diabetes tipo 2, la actividad moderada a vigorosa es muy baja. Gran parte del trabajo es darles un plan que les devuelva la confianza.

### Qué pasa con la glicemia al moverse

Entender la fisiología ayuda a anticipar:

- **Ejercicio aeróbico** (trotar, andar en bicicleta): el músculo usa grasas y glucosa, y la glicemia suele bajar. El músculo puede captar glucosa incluso con muy poca insulina, gracias a los transportadores GLUT4 que se activan con la contracción. Por eso, si además hay insulina rápida circulando, el riesgo de hipoglicemia sube.
- **Ejercicio anaeróbico o muy intenso** (sprints, pesas pesadas): predomina el uso de glucógeno y fosfocreatina, y las hormonas de estrés pueden hacer que la glicemia baje poco o incluso suba.
- **Ejercicio mixto o intermitente** (fútbol, básquetbol): la caída suele ser menor que en el aeróbico continuo y a veces no requiere ajustar la insulina.

La respuesta de cada niño depende de la duración, la intensidad, la glicemia al empezar, su condición física, la hora del día, la insulina, las hormonas que contrarregulan y lo que comió.

### La consulta en cinco pasos

[[figura:diabetes-pediatrica-consulta]]

**1. Metas.** Partir de lo que el niño quiere hacer y de lo que lo motiva.

**2. Tipo de ejercicio.** El aeróbico suele bajar la glicemia de forma predecible. El ejercicio muy intenso puede subirla por las hormonas de estrés. El intermitente, como la mayoría de los deportes de equipo, produce una caída menor que el aeróbico continuo.

**3. Horario e insulina activa.** Lo ideal es hacer ejercicio con poca o ninguna insulina rápida circulando. Esa insulina tiene su mayor efecto entre 60 y 100 minutos después de aplicarla y dura unas 5 horas.

**4. Contexto de riesgo.** Una hipoglicemia en las 24 a 48 horas previas aumenta el riesgo de otra, porque la respuesta del cuerpo para subir la glicemia queda atenuada. El riesgo también sigue durante la noche después del ejercicio. El sensor continuo de glucosa ayuda mucho.

**5. Revisar y ajustar.** Usar los datos de la bomba y el sensor, y adaptar el plan a lo que va pasando en cada sesión.

### Cuándo no conviene hacer ejercicio

- Hipoglicemia severa en las 24 horas previas.
- Cetosis elevada, infección o lesión aguda (contraindicación temporal).
- El ejercicio vigoroso no se recomienda con diabetes inestable, complicaciones avanzadas o retinopatía proliferativa avanzada.

### Algunos datos prácticos

- Una hiperglicemia leve o moderada puntual no empeora el rendimiento. Una hipoglicemia leve sí. En cambio, la hiperglicemia sostenida en el tiempo se asocia a menos masa muscular, menos mitocondrias y menos capilares en el músculo.
- La hipoglicemia de las 24 a 48 horas previas, el frío y la obesidad atenúan la respuesta del cuerpo para subir la glicemia.
- El alcohol bloquea la producción de glucosa en el hígado y aumenta el riesgo de hipoglicemia durante y después del ejercicio. En adolescentes, vale la pena conversarlo.
- Las dietas bajas en carbohidratos no se recomiendan en diabetes tipo 1 en niños.
- Los suplementos no tienen beneficio claro bajo los 18 años y pueden venir contaminados con sustancias prohibidas.
- La guía propone rangos de carbohidratos alrededor del ejercicio (entre 0,2 y 0,6 g por kilo según el tipo de ejercicio y la glicemia) y, en quienes usan bomba, bajar la insulina basal nocturna si el ejercicio fue en la tarde y largo. Son **puntos de partida**, con evidencia de nivel bajo, que se afinan con cada niño junto al equipo de diabetes, idealmente midiendo la glicemia cada 30 minutos al principio.

### Mi rol como kinesiólogo

No me toca ajustar la insulina, pero sí puedo hacer mucho: preguntar por hipoglicemias recientes antes de la sesión, conocer cómo responde ese niño a cada tipo de ejercicio, elegir el orden de los ejercicios (hacer fuerza o sprints antes del aeróbico puede atenuar la caída), tener carbohidratos a mano y coordinar con el equipo tratante. Y, sobre todo, ayudar a que la familia confíe en que el ejercicio es posible.
### Límites

Muchas recomendaciones vienen de estudios en adultos con diabetes tipo 1, mayoritariamente hombres, y la variabilidad entre personas es grande. No hay un único plan que sirva para todos.`,
    references: [
      {
        author: 'Adolfsson P, Taplin CE, Zaharieva DP, et al.',
        year: '2022',
        journal: 'Pediatric Diabetes, 23(8):1341-1372',
        doi: '10.1111/pedi.13452',
        title: 'ISPAD Clinical Practice Consensus Guidelines 2022: Exercise in children and adolescents with diabetes'
      }
    ]
  },
  {
    id: '59',
    slug: 'pasos-diarios-cambio-minimo-relevante',
    title: '¿Cuántos pasos más hacen una diferencia?',
    subtitle: 'Antes de prescribir el programa perfecto, conviene saber cuánto se mueve la persona en su día. Y qué cambio en los pasos ya es relevante para su salud.',
    categoryType: 'tematica',
    categoryValue: 'fisiologia-clinica',
    categoryLabel: 'Fisiología clínica del ejercicio',
    audience: 'ambos',
    date: '26 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 5,
    summary: 'Según la población, sumar entre 600 y 1.100 pasos diarios ya es un cambio que la persona nota. En personas operadas de estenosis lumbar, el umbral fue de unos 750.',
    pullQuote: 'Si no tenemos esta base, cualquier prescripción queda poco aterrizada.',
    content: `En el magíster hubo una frase que me quedó dando vueltas: por más que queramos prescribir lo último y lo mejor, si no sabemos cuánto se mueve la persona en su día, la prescripción queda en el aire.

Alguien puede entrenar tres veces por semana y pasar el resto del tiempo sentado diez horas. Otra persona puede no "entrenar" nunca y caminar muchísimo por su trabajo. Por eso los pasos diarios son un dato básico, fácil de medir con el teléfono o un reloj, y muy útil para conversar.

### Qué es un cambio mínimo clínicamente importante

Es el cambio más pequeño que la persona percibe como una mejoría real en su vida, no solo uno que sale significativo en un estudio. Se le dice MCID por sus siglas en inglés. Saberlo sirve para poner metas que valgan la pena y para no frustrarse con metas imposibles.

Hay dos formas principales de calcularlo:

- **Con un ancla:** se compara el cambio en los pasos con algo que la persona sí valora, como sentirse satisfecha con cómo camina o mejorar en un cuestionario de discapacidad. El umbral es el cambio que mejor separa a quienes mejoraron de quienes no.
- **Con la distribución:** se usa una fracción de cuánto varían los datos, por ejemplo 0,3 o 0,5 desviaciones estándar. Es más estadístico y menos ligado a la experiencia de la persona.

Por eso los valores cambian según el método, y conviene leerlos como un rango.

### Lo que dicen los estudios

[[figura:pasos-mcid]]

- **EPOC:** Demeyer y colaboradores (2016) estimaron un cambio mínimo de entre 600 y 1.100 pasos diarios. Otro estudio, de Polgar (2021), lo situó cerca de 430.
- **Estenosis lumbar después de cirugía:** McIlroy y colaboradores (*European Spine Journal*, 2025) siguieron a 97 personas de unos 70 años en tres hospitales del Reino Unido. Midieron los pasos con un acelerómetro durante 7 días antes de la operación y tres meses después. Con el ancla de satisfacción al caminar, el umbral fue de **680 pasos**; con el método de distribución, de **750**. En la caminata de 6 minutos, el cambio relevante fue de 26 a 35 metros.
- **Enfermedad arterial periférica:** Gardner (2022) estimó unos 1.200 pasos.

En otras condiciones, como el asma o el Parkinson, los valores reportados también caen en ese orden de magnitud, entre unos 600 y 1.400 pasos.

### Cómo lo uso

El número exacto cambia según la población y el método, así que no lo tomo como una regla fija. Lo que sí me sirve es la idea: **no hace falta llegar a 10.000 pasos para que haya un cambio que importe**. Sumar unos 700 a 1.000 pasos diarios a lo que la persona ya hace es una meta concreta, alcanzable y con sentido.

Algunas formas simples:

- Una caminata de 7 a 10 minutos después de almuerzo.
- Bajarse una parada antes del transporte.
- Hacer las llamadas caminando.

### Por qué el contexto importa

En clases veíamos que hoy obtener energía requiere mucho menos movimiento que antes, y que el trabajo de cada persona influye mucho en su salud. Un conductor de transporte público, por ejemplo, pasa gran parte del día sentado y tiene un riesgo alto de diabetes. En esas personas, sumar pasos durante la jornada puede ser más realista y más útil que pedirles una hora de gimnasio.

Por eso en la evaluación pregunto por los pasos, pero también por el trabajo, los traslados y cuántas horas pasa sentado. Ese contexto me dice dónde hay espacio para moverse más.
### Límites

Cada estudio calcula el cambio mínimo con métodos y poblaciones distintas, y los valores no se pueden trasladar directo de una condición a otra. Sirven como referencia, no como meta universal.`,
    references: [
      {
        author: 'McIlroy S, Mah Y, Tahtis V, Beddard A, Bearne L, Weinman J, Norton S.',
        year: '2025',
        journal: 'European Spine Journal, 34(12):5690-5700',
        doi: '10.1007/s00586-025-09085-4',
        title: 'Minimal clinically important difference of the 6-Minute walk test and daily step count at 3 months following surgery for lumbar spinal stenosis'
      },
      {
        author: 'Demeyer H, Burtin C, Hornikx M, et al.',
        year: '2016',
        journal: 'PLoS One, 11(4):e0154587',
        doi: '10.1371/journal.pone.0154587',
        title: 'The Minimal Important Difference in Physical Activity in Patients with COPD'
      }
    ]
  },
  {
    id: '60',
    slug: 'fitness-cardiorrespiratorio-signo-vital',
    title: 'El fitness cardiorrespiratorio debería medirse como un signo vital',
    subtitle: 'La American Heart Association (Ross y colaboradores, 2016) propone evaluarlo de rutina. Predice la mortalidad tanto o más que el tabaco, la presión o el colesterol, y casi nadie lo mide.',
    categoryType: 'tematica',
    categoryValue: 'fisiologia-clinica',
    categoryLabel: 'Fisiología clínica del ejercicio',
    audience: 'ambos',
    date: '26 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 5,
    summary: 'Una condición cardiorrespiratoria baja se asocia a más riesgo cardiovascular, más mortalidad y más muertes por cáncer. Evaluarla es la base para empezar a prescribir ejercicio.',
    pullQuote: 'El fitness cardiorrespiratorio puede ser un predictor de mortalidad más fuerte que factores de riesgo bien establecidos.',
    content: `En una consulta típica se mide la presión, el pulso, a veces el peso. Casi nunca se pregunta o se estima qué tan buena es la condición cardiorrespiratoria de la persona. Y sin embargo es uno de los datos que más dice sobre su salud.

En 2016, la American Heart Association publicó una declaración científica liderada por Robert Ross para proponer algo simple: **tratar el fitness cardiorrespiratorio como un signo vital clínico**.

### Qué es y cómo se mide

Es la capacidad del corazón, los pulmones y los músculos para captar y usar oxígeno durante el ejercicio. Se expresa en VO2máx o en MET (un MET es lo que gastas en reposo).

La forma más precisa es una prueba de esfuerzo con análisis de gases. Le sigue la prueba de esfuerzo sin gases, donde se estima a partir de la velocidad y la pendiente alcanzadas. Pero no siempre hace falta: **existen ecuaciones que lo estiman sin hacer ejercicio**, usando datos como la edad, el sexo, el peso o la cintura, la frecuencia cardiaca en reposo y el nivel de actividad. También sirven pruebas de campo simples, como caminatas o test de escalón.

La declaración propone que, como mínimo, todos los adultos tengan una estimación anual con una de estas ecuaciones, igual que se mide la presión. No es perfecta, pero es mucho mejor que no tener el dato.

### Por qué importa tanto

La declaración resume que una condición cardiorrespiratoria baja se asocia a más enfermedad cardiovascular, más mortalidad por cualquier causa y más mortalidad por varios tipos de cáncer. Plantea incluso que podría ser un predictor más fuerte que el tabaco, la hipertensión, el colesterol alto o la diabetes tipo 2. Además, sumar este dato a los factores de riesgo tradicionales **mejora la forma en que clasificamos el riesgo** de una persona.

Hay otra idea que me parece clave: el fitness cardiorrespiratorio depende en parte de la genética, pero responde mucho al entrenamiento. Y las personas que parten más bajo son las que más ganan. Pasar de muy baja condición a una condición moderada es donde se ve la mayor reducción de riesgo.

[[figura:fitness-signo-vital]]

Un metaanálisis de Kodama y colaboradores (*JAMA*, 2009), con 33 estudios y más de 100 mil personas, mostró que cada MET adicional de capacidad se asocia a cerca de un **13% menos de mortalidad** por cualquier causa y un 15% menos de eventos cardiovasculares. En adultos, una capacidad bajo unos 5 MET se considera de riesgo alto. En clases del magíster lo planteamos así: idealmente no estar bajo 7 MET, y mejor aún acercarse a 10.

Para darle una referencia concreta: caminar a paso tranquilo son unos 3 MET, trotar suave unos 7 y correr a buen ritmo 10 o más. Alguien que no puede sostener una caminata rápida probablemente está en la zona de riesgo.

En clases también vimos el ejemplo de mineros chilenos: los turnos rotativos y la hipoxia intermitente de la altura se asociaban a más riesgo cardiovascular. El trabajo y el entorno cambian el riesgo, y una buena condición física es una de las pocas cosas que lo atenúan.

Lo que más me gusta de este dato es que funciona como un **factor protector**: una buena condición física atenúa el efecto de otros factores de riesgo.

### Por qué es la base para prescribir

Si no sé desde dónde parte una persona, no puedo saber qué intensidad es suave, moderada o alta para ella. Estimar su capacidad me permite:

- Elegir intensidades con sentido, y no copiadas de otro.
- Mostrarle a la persona un dato que puede mejorar y que se relaciona directo con su salud.
- Volver a medir y ver el progreso.
### Límites

La mayoría de los datos son de estudios observacionales: muestran asociación, no que mejorar el fitness cause directamente cada beneficio. Las ecuaciones sin ejercicio son útiles, pero menos precisas que una prueba directa.`,
    references: [
      {
        author: 'Ross R, Blair SN, Arena R, et al.',
        year: '2016',
        journal: 'Circulation, 134(24):e653-e699',
        doi: '10.1161/CIR.0000000000000461',
        title: 'Importance of Assessing Cardiorespiratory Fitness in Clinical Practice: A Case for Fitness as a Clinical Vital Sign: A Scientific Statement From the American Heart Association'
      },
      {
        author: 'Kodama S, Saito K, Tanaka S, et al.',
        year: '2009',
        journal: 'JAMA, 301(19):2024-2035',
        doi: '10.1001/jama.2009.681',
        title: 'Cardiorespiratory fitness as a quantitative predictor of all-cause mortality and cardiovascular events in healthy men and women: a meta-analysis'
      }
    ]
  },
  {
    id: '61',
    slug: 'once-recomendaciones-buena-atencion-dolor-lin-2020',
    title: 'Qué deberías encontrar en una buena atención por dolor',
    subtitle: 'Lin y colaboradores (BJSM, 2020) revisaron 44 guías clínicas. Las 11 de mejor calidad coincidieron en las mismas recomendaciones. Te las cuento para que sepas qué esperar en tu kinesiólogo.',
    categoryType: 'paciente',
    categoryValue: 'preguntas-kinesiologo',
    categoryLabel: 'Preguntas para tu kinesiólogo',
    audience: 'paciente',
    date: '26 de Noviembre, 2026',
    author: 'Lukas · MyoKine',
    readingTime: 5,
    summary: 'Que te escuchen, que descarten lo grave, que te expliquen, que el ejercicio sea el centro y que las imágenes se pidan solo cuando cambian algo. Eso dicen las mejores guías.',
    pullQuote: 'Ninguna de estas recomendaciones depende de tu diagnóstico. Dependen de cómo te atiendan.',
    content: `Si tienes dolor de espalda, cuello, hombro, rodilla u otra articulación, es normal no saber qué esperar de una consulta. Cada profesional parece hacer algo distinto. Por eso me gusta este estudio.

Ivan Lin y su equipo, en Australia, revisaron **44 guías clínicas** sobre dolor musculoesquelético, de 11 países. Evaluaron su calidad con una herramienta estandarizada (AGREE II) y solo 11 tenían alta calidad: 4 de dolor lumbar, 4 de artrosis, 2 de cuello y 1 de hombro. Lo interesante es que, aunque eran de zonas del cuerpo distintas, **coincidieron en las mismas 11 recomendaciones**. Lo publicaron en 2020 en el *British Journal of Sports Medicine*.

Lo hicieron porque en el dolor musculoesquelético hay muchas prácticas que se usan más de lo que deberían. Los autores citan algunos ejemplos: entre un 25% y un 42% de las personas con dolor lumbar recibe una imagen aunque no se recomienda de rutina, las cirugías de hombro y de rodilla siguen creciendo aunque sus resultados no superan al ejercicio en muchos casos, y solo un 20% de las personas con dolor lumbar recibe educación y consejos en atención primaria.

[[figura:once-recomendaciones]]

### Al evaluarte

**1. Que te pregunten qué esperas.** El plan se decide contigo, no por ti.

**2. Que descarten lo grave.** En la primera consulta deberían preguntarte por señales de alarma, como fiebre, baja de peso sin explicación, antecedentes de cáncer o pérdida de fuerza que avanza. Son poco frecuentes, pero hay que mirarlas.

**3. Que pregunten por más que tu cuerpo.** El miedo a moverte, tu ánimo y lo que esperas de tu recuperación influyen tanto como muchos hallazgos físicos.

**4. Que pidan imágenes solo cuando cambian algo.** Una resonancia o radiografía se justifica si hay sospecha de algo serio, si no mejoras con el tratamiento o si el resultado va a cambiar lo que se hará.

**5. Que te examinen de verdad.** Movilidad, fuerza y, si corresponde, pruebas neurológicas.

**6. Que midan tu progreso.** Con cuestionarios o pruebas validadas, no solo con cómo "te ves".

### Durante el tratamiento

**7. Que te expliquen.** Qué te pasa, qué esperar y cómo manejarlo. Entender tu dolor es parte del tratamiento.

**8. Que el ejercicio sea el centro.** La actividad física y el ejercicio son el eje, no una tarea extra para la casa.

**9. Que la terapia manual no vaya sola.** Si se usa, debería ir junto a ejercicio y educación.

**10. Que la cirugía no sea lo primero.** Salvo señales de alarma, antes debería probarse un tratamiento conservador de calidad.

**11. Que te ayuden a seguir con tu vida.** Mantenerte o volver al trabajo y a tus actividades de forma gradual.

### Lo que las guías no recomiendan

Varias de esas guías también señalan cosas que conviene evitar como primera opción: imágenes de rutina sin señales de alarma, reposo prolongado, tratamientos pasivos solos (como aparatos o masajes sin ejercicio), opioides para el dolor persistente y cirugías antes de haber probado un buen tratamiento conservador.

### Preguntas que puedes hacer

Esta lista no es para desconfiar de tu profesional. Es para que sepas qué es razonable esperar y para que te sientas con derecho a preguntar. Algunas preguntas útiles:

- ¿Qué crees que está pasando y qué esperas que pase en las próximas semanas?
- ¿Hay algo que te preocupe y que haya que descartar?
- ¿Necesito una imagen? ¿Qué cambiaría si me la hago?
- ¿Qué ejercicios voy a hacer y cómo sabremos si estoy avanzando?
- ¿Qué puedo hacer yo entre sesiones?

Si algo de esto no aparece en tu atención, puedes preguntar por qué.

### Límites

Las guías se basan sobre todo en dolor lumbar, cervical, de rodilla y de hombro en adultos. No reemplazan la evaluación de tu caso, pero dan un piso común de lo que es una buena atención.`,
    references: [
      {
        author: 'Lin I, Wiles L, Waller R, Goucke R, Nagree Y, Gibberd M, Straker L, Maher CG, O\'Sullivan PPB.',
        year: '2020',
        journal: 'British Journal of Sports Medicine, 54(2):79-86',
        doi: '10.1136/bjsports-2018-099878',
        title: 'What does best practice care for musculoskeletal pain look like? Eleven consistent recommendations from high-quality clinical practice guidelines: systematic review'
      }
    ]
  }
];
