// Convierte lo conversado en la evaluación en hojas de pizarra listas para enviar.
// Todo ocurre en el navegador: nada de lo que se escribe sale del dispositivo.
import { TAM, base, datosIniciales, nuevoId, type Hoja, type Item, type Kind } from "./modelo";

export interface Evaluacion {
  nombre: string;
  motivo: string;
  zona: string;
  dolor: string;
  frases: string[];
  metas: string[];
  hallazgos: string[];
  factores: string[];
  preocupaciones: string[];
  ayudas: string[];
  plan: string[];
  acuerdos: string[];
  proxima: string;
  mejoraNoLineal: boolean;
}

export const evaluacionVacia = (): Evaluacion => ({
  nombre: "",
  motivo: "",
  zona: "",
  dolor: "",
  frases: [],
  metas: [],
  hallazgos: [],
  factores: [],
  preocupaciones: [],
  ayudas: [],
  plan: [],
  acuerdos: [],
  proxima: "",
  mejoraNoLineal: true,
});

type Campo = keyof Omit<Evaluacion, "mejoraNoLineal">;
const LISTAS: Campo[] = ["frases", "metas", "hallazgos", "factores", "preocupaciones", "ayudas", "plan", "acuerdos"];

const sinTildes = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// Palabras con que suele empezar cada sección de una ficha.
const CLAVES: [Campo, RegExp][] = [
  ["nombre", /^(nombre|paciente|usuari[oa])\b/],
  ["motivo", /^(motivo|consulta|motivo de consulta|que le pasa|problema|diagnostico|historia)\b/],
  ["zona", /^(zona|region|lugar del dolor)\b/],
  ["dolor", /^(dolor hoy|dolor|eva|evn|nprs|intensidad)\b/],
  ["frases", /^(dijo|sus palabras|frases|relato|cita|en sus palabras|me conto|refiere)\b/],
  ["metas", /^(metas?|objetivos?|psfs|le importa|lo que mas le importa|quiere|expectativas?)\b/],
  ["hallazgos", /^(hallazgos?|examen|evaluacion|encontre|encontramos|tests?|pruebas?|observaciones?)\b/],
  ["factores", /^(factores|contexto|estilo de vida|habitos)\b/],
  ["preocupaciones", /^(preocupa\w*|miedos?|temores?|creencias|dims?|banderas amarillas)\b/],
  ["ayudas", /^(ayuda\w*|alivia\w*|sims?|lo que le sirve|recursos)\b/],
  ["plan", /^(plan|tratamiento|vamos a|intervencion|ejercicios?)\b/],
  ["acuerdos", /^(acuerdos?|acordamos|compromisos?|tareas?|para la casa)\b/],
  ["proxima", /^(proxima( sesion)?|control|siguiente sesion|nos vemos)\b/],
];

const limpiar = (t: string) => t.replace(/^[\s\-•*·–—\d.)]+/, "").trim();

/** Ordena notas libres en los campos de la evaluación. */
export function ordenarNotas(texto: string, previa: Evaluacion = evaluacionVacia()): Evaluacion {
  const ev: Evaluacion = JSON.parse(JSON.stringify(previa));
  let actual: Campo | null = null;
  const agregar = (campo: Campo, valor: string) => {
    const v = limpiar(valor);
    if (!v) return;
    if (LISTAS.includes(campo)) {
      const lista = ev[campo] as string[];
      v.split(/\s*;\s*/).forEach((x) => {
        const y = limpiar(x).replace(/^["“”«]|["“”»]$/g, "");
        if (y && !lista.includes(y)) lista.push(y);
      });
    } else {
      (ev[campo] as string) = (ev[campo] as string) ? `${ev[campo]} ${v}` : v;
    }
  };

  for (const bruta of texto.split(/\r?\n/)) {
    const linea = bruta.trim();
    if (!linea) continue;
    const norm = sinTildes(linea);
    const dosPuntos = linea.indexOf(":");
    const cabeza = dosPuntos > 0 ? norm.slice(0, dosPuntos).trim() : norm;
    const hit = CLAVES.find(([, re]) => re.test(cabeza) && (dosPuntos > 0 || cabeza.split(" ").length <= 4));
    if (hit && (dosPuntos > 0 || /^[A-ZÁÉÍÓÚÑ]/.test(linea))) {
      actual = hit[0];
      const resto = dosPuntos > 0 ? linea.slice(dosPuntos + 1) : "";
      if (resto.trim()) agregar(actual, resto);
      continue;
    }
    // Frases entre comillas en cualquier parte: son palabras de la persona.
    const citas = linea.match(/[“"«]([^”"»]{6,})[”"»]/g);
    if (citas) {
      citas.forEach((c) => agregar("frases", c.slice(1, -1)));
      continue;
    }
    if (actual) agregar(actual, linea);
    else agregar("hallazgos", linea);
  }

  // Intensidad del dolor escrita como "EVA 6/10", "6 de 10", etc.
  if (!ev.dolor) {
    const m = sinTildes(texto).match(/\b(?:eva|evn|nprs|dolor)\D{0,12}(\d{1,2}(?:[.,]\d)?)\s*(?:\/|de)?\s*10?\b/);
    if (m) ev.dolor = m[1];
  } else {
    const m = ev.dolor.match(/\d{1,2}(?:[.,]\d)?/);
    ev.dolor = m ? m[0] : "";
  }
  return ev;
}

// ---------- Armado de las hojas ----------
type Pieza = { kind: Kind; d: Record<string, unknown>; max: number; junto?: boolean };

const ANCHO = 960;
const MARGEN = 60;

function apilar(piezas: Pieza[][], tituloSigue: (n: number) => string): Hoja[] {
  const { w: W, h: H } = TAM.vertical;
  const hojas: Hoja[] = [];
  for (const grupo of piezas) {
    if (!grupo.length) continue;
    let items: Item[] = [];
    let y = 50;
    const cerrar = () => {
      if (items.length) hojas.push({ formato: "vertical", strokes: [], items });
      items = [];
      y = 50;
    };
    let prev: { x: number; y: number; w: number; h: number } | null = null;
    grupo.forEach((p, i) => {
      const it: Item = { id: nuevoId(), kind: p.kind, x: 0, y: 0, s: 1, d: p.d };
      const b = base(it);
      it.s = Math.min(p.max, ANCHO / b.w);
      const alto = b.h * it.s;
      // Al lado del anterior, si se pidió y cabe
      if (p.junto && prev && prev.x + prev.w + 30 + b.w * it.s <= W - MARGEN + 1) {
        it.x = Math.round(prev.x + prev.w + 30);
        it.y = Math.round(prev.y);
        items.push(it);
        y = Math.max(y, prev.y + alto + 32);
        prev = null;
        if (i === grupo.length - 1) cerrar();
        return;
      }
      if (y + alto > H - 50 && items.length > 1) {
        cerrar();
        const t: Item = { id: nuevoId(), kind: "titulo", x: MARGEN, y, s: 0.7, d: { texto: tituloSigue(hojas.length) } };
        items.push(t);
        y += base(t).h * 0.7 + 30;
      }
      const siguienteJunto = grupo[i + 1]?.junto;
      it.x = p.kind === "titulo" || siguienteJunto ? MARGEN : Math.round((W - b.w * it.s) / 2);
      it.y = Math.round(y);
      items.push(it);
      prev = { x: it.x, y: it.y, w: b.w * it.s, h: alto };
      y += alto + (p.kind === "titulo" ? 20 : 32);
      if (i === grupo.length - 1) cerrar();
    });
  }
  return hojas;
}

const titulo = (texto: string): Pieza => ({ kind: "titulo", d: { texto }, max: 0.8 });

export function armarHojas(ev: Evaluacion): Hoja[] {
  const nombre = ev.nombre.trim().split(/\s+/)[0] || "";
  const hoja1: Pieza[] = [titulo(nombre ? `Lo que conversamos, ${nombre}` : "Lo que conversamos")];
  if (ev.frases.length || ev.metas.length || ev.motivo.trim()) {
    hoja1.push({
      kind: "escucha",
      d: { titulo: "Lo que me contaste", motivo: ev.motivo.trim(), frases: ev.frases.slice(0, 6), meta: ev.metas.join(". ") },
      max: 1.45,
    });
  }
  const dolor = parseFloat(ev.dolor.replace(",", "."));
  if (Number.isFinite(dolor)) {
    hoja1.push({ kind: "escala", d: { ...datosIniciales("escala", "dolor"), titulo: "Tu dolor hoy", valor: Math.max(0, Math.min(10, Math.round(dolor))) }, max: 1.3 });
  }

  const hoja2: Pieza[] = [];
  if (ev.hallazgos.length || ev.factores.length || ev.preocupaciones.length || ev.ayudas.length) {
    hoja2.push(titulo("Lo que encontramos juntos"));
    if (ev.hallazgos.length) hoja2.push({ kind: "plan", d: { titulo: "Lo que vimos en la evaluación", items: ev.hallazgos.slice(0, 7), vineta: "punto" }, max: 1.6 });
    if (ev.factores.length) hoja2.push({ kind: "contexto", d: { ...datosIniciales("contexto"), factores: ev.factores.slice(0, 8) }, max: 1.15 });
    if (ev.preocupaciones.length || ev.ayudas.length)
      hoja2.push({ kind: "protecto", d: { dims: ev.preocupaciones.slice(0, 5), sims: ev.ayudas.slice(0, 5) }, max: 1.45 });
  }

  const hoja3: Pieza[] = [];
  if (ev.plan.length || ev.acuerdos.length || ev.proxima.trim()) {
    hoja3.push(titulo("Lo que vamos a hacer"));
    if (ev.plan.length) hoja3.push({ kind: "plan", d: { titulo: "El plan", items: ev.plan.slice(0, 7) }, max: 1.25 });
    if (ev.acuerdos.length) hoja3.push({ kind: "plan", d: { titulo: "Lo que acordamos", items: ev.acuerdos.slice(0, 7) }, max: 1.25 });
    if (ev.mejoraNoLineal) hoja3.push({ kind: "camino", d: {}, max: 0.8 });
    const cierre = [ev.proxima.trim() ? `Nos vemos: ${ev.proxima.trim()}.` : "", "Si algo no quedó claro, escríbeme."].filter(Boolean).join(" ");
    hoja3.push({ kind: "nota", d: { texto: cierre, color: "#F5E663" }, max: ev.mejoraNoLineal ? 0.95 : 1.25, junto: ev.mejoraNoLineal });
  }

  return apilar([hoja1, hoja2, hoja3], () => "Sigue");
}

// ---------- Pegar la evaluación y obtener la pizarra al tiro ----------

type Caso = {
  id: string;
  re: RegExp;
  titulo: string;
  graficos: Pieza[];
  plan: string[];
};

const DATO_LUMBAR = {
  numero: "72%",
  texto: "de las personas con dolor lumbar reciente se recupera dentro de un año. Moverse y retomar tus actividades de a poco ayuda.",
  fuente: "Cashin, Chou, Weimer y McAuley · JAMA 2026",
};

const CASOS: Caso[] = [
  {
    id: "lca",
    re: /\b(lca|ligamento cruzado|cruzado anterior)\b/,
    titulo: "Tu rodilla y lo que viene",
    graficos: [
      { kind: "rodilla", d: { marca: "lca" }, max: 1 },
      { kind: "tiempo", d: datosIniciales("tiempo", "lca"), max: 1.3 },
    ],
    plan: ["Recuperar movilidad y activar el cuádriceps", "Fuerza progresiva de pierna y cadera", "Volver a correr y saltar cuando cumplas los criterios"],
  },
  {
    id: "postop",
    re: /\b(post ?op\w*|cirugia|operad[oa]|artroscopia)\b/,
    titulo: "Tu recuperación después de la cirugía",
    graficos: [{ kind: "tiempo", d: datosIniciales("tiempo", "postop"), max: 1.4 }, { kind: "semaforo", d: datosIniciales("semaforo"), max: 1.4 }],
    plan: ["Cuidar la herida y controlar la inflamación", "Moverte dentro de lo permitido", "Ir sumando carga de a poco"],
  },
  {
    id: "desgarro",
    re: /\b(desgarro|distension|lesion muscular|isquio\w*|gemelo|cuadriceps|recto femoral)\b/,
    titulo: "Cómo se recupera un músculo",
    graficos: [
      { kind: "tendon", d: { marca: "musculo" }, max: 1.4 },
      { kind: "tiempo", d: datosIniciales("tiempo", "desgarro"), max: 1.4 },
    ],
    plan: ["Cargar el músculo desde temprano, sin pasarte", "Fuerza en posiciones largas", "Volver a correr de forma progresiva"],
  },
  {
    id: "tendon",
    re: /\b(tendinopat\w*|tendinitis|tendinosis|aquiles|aquiliano|rotulian\w*|patelar|epicondil\w*|gluteo medio|trocanter\w*)\b/,
    titulo: "Por qué se irritó tu tendón",
    graficos: [
      { kind: "capacidad", d: datosIniciales("capacidad", "pico"), max: 1.5 },
      { kind: "semaforo", d: datosIniciales("semaforo"), max: 1.5 },
    ],
    plan: ["Ajustar la carga, sin reposo completo", "Ejercicio de fuerza 2 a 3 veces por semana", "Usar el semáforo para guiarte con el dolor"],
  },
  {
    id: "hombro",
    re: /\b(hombro|manguito|subacromial|supraespinoso|escapul\w*)\b/,
    titulo: "Lo que pasa con tu hombro",
    graficos: [
      { kind: "arribaabajo", d: { ...datosIniciales("arribaabajo"), zona: "Hombro" }, max: 1.2 },
      { kind: "dato", d: datosIniciales("dato", "hombro"), max: 1.35 },
    ],
    plan: ["Ejercicio progresivo de hombro", "Ajustar lo que más lo irrita, sin dejar de usarlo", "Cuidar el sueño y el estrés"],
  },
  {
    id: "lumbar",
    re: /\b(lumbar|lumbago|lumbalgia|espalda baja|ciatica|ciatico|columna)\b/,
    titulo: "Tu espalda es fuerte",
    graficos: [
      { kind: "dato", d: DATO_LUMBAR, max: 1.5 },
      { kind: "camino", d: {}, max: 1.5 },
    ],
    plan: ["Mantenerte activo y retomar tus actividades de a poco", "Ejercicio que disfrutes, 2 a 3 veces por semana", "Calor local si te alivia"],
  },
  {
    id: "rodilla",
    re: /\b(rodilla|rotula|patelofemoral|menisco|artrosis)\b/,
    titulo: "Carga y capacidad de tu rodilla",
    graficos: [
      { kind: "capacidad", d: datosIniciales("capacidad", "pico"), max: 1.5 },
      { kind: "capacidad", d: datosIniciales("capacidad", "plan"), max: 1.5 },
    ],
    plan: ["Ajustar lo que más la irrita por ahora", "Fuerza de cuádriceps y cadera", "Subir la carga de a poco"],
  },
];

const PERSISTENTE = /\b(persistente|cronic[oa]|hace (varios )?(meses|anos)|\d+ (meses|anos)|sensibiliza\w*|fibromialgia|catastrofi\w*|kinesiofobia)\b/;

const FACTORES: [RegExp, string][] = [
  [/\b(sueno|duerme|dormir|insomnio|despierta)\b/, "Cómo duermes"],
  [/\b(estres|estresad\w*|ansiedad|angustia|preocupad\w*)\b/, "Estrés y emociones"],
  [/\b(trabajo|laboral|oficina|turnos?)\b/, "Lo que haces cada día"],
  [/\b(sedentari\w*|poco activ\w*|no hace ejercicio)\b/, "Cuánto te mueves"],
  [/\b(miedo|temor|kinesiofobia|cree que|piensa que)\b/, "Qué crees que te pasa"],
  [/\b(aliment\w*|dieta|come|peso|obesidad|sobrepeso)\b/, "Qué comes"],
  [/\b(entren\w*|carga|volumen|maraton|competencia|gimnasio)\b/, "Tu carga de entrenamiento"],
];

const MIEDOS: [RegExp, string][] = [
  [/\b(miedo|temor) (a|de) (moverse|moverme|mover)\b/, "Miedo a moverme"],
  [/\b(roto|rotura|cortado)\b/, "Pensar que algo está roto"],
  [/\b(grave|cancer|operar|cirugia)\b/, "Pensar que es algo grave"],
  [/\b(sueno|duerme mal|insomnio)\b/, "Dormir mal"],
  [/\b(estres|ansiedad)\b/, "Estrés"],
  [/\b(reposo|dejo de|evita)\b/, "Evitar actividades"],
];

/** Pasa una frase escrita en tercera persona ("le duele", "tiene miedo") a segunda ("te duele", "tienes miedo"). */
export function aSegunda(t: string): string {
  const reglas: [RegExp, string][] = [
    [/\bse le\b/gi, "se te"],
    [/\bse (agach|muev|sient|levant|acuest|par|estir|gir)(a|e)\b/gi, "te $1$2s"],
    [/\b(le|la|lo) (duele|duelen|molesta|molestan|despierta|preocupa|cuesta|asusta|limita|impide)\b/gi, "te $2"],
    [/\bsus\b/gi, "tus"],
    [/\bsu\b/gi, "tu"],
    [/\b(no )?(tiene|siente|duerme|quiere|puede|piensa|cree|teme|sabe|necesita|camina|entrena|trabaja|corre|juega)\b/gi, "$1$2s"],
    [/\best[aá]\b/gi, "estás"],
    [/\bes capaz\b/gi, "eres capaz"],
  ];
  let out = t.trim();
  for (const [re, r] of reglas) out = out.replace(re, r);
  out = out.replace(/\.$/, "");
  return out.charAt(0).toUpperCase() + out.slice(1);
}

function primeraIdea(texto: string, max = 170): string {
  const limpio = texto.replace(/\s+/g, " ").trim();
  const frases = limpio.split(/(?<=[.!?])\s+/);
  let out = "";
  for (const f of frases) {
    if ((out + " " + f).trim().length > max) break;
    out = (out + " " + f).trim();
  }
  return out || limpio.slice(0, max).replace(/\s\S*$/, "") + "…";
}

/** Recibe la evaluación tal como la escribiste y devuelve las hojas listas para enviar. */
export function pizarraDesdeTexto(entrada: string): Hoja[] {
  // Si los títulos vienen en medio de una línea ("… Meta: volver a trabajar"), se separan.
  const texto = entrada.replace(/([.;])\s+((?:meta|metas|objetivos?|plan|pr[oó]xima(?: sesi[oó]n)?|examen|hallazgos|acuerdos|indicaciones)\s*:)/gi, "$1\n$2");
  const ev = ordenarNotas(texto);
  const norm = sinTildes(texto);
  const caso = CASOS.find((c) => c.re.test(norm));
  const persistente = PERSISTENTE.test(norm);

  // Frases de la persona: las que van entre comillas se muestran tal cual.
  // Si no hay comillas, se toman las que siguen a "refiere", "dice", "relata"… y se pasan a "tú".
  let comillas = true;
  if (!ev.frases.length) {
    comillas = false;
    const m = texto.match(/(?:refiere|relata|dice|comenta|cuenta|menciona|manifiesta)(?: que)?\s+([^.\n]{12,140})/gi) || [];
    ev.frases = m.map((x) => aSegunda(x.replace(/^(refiere|relata|dice|comenta|cuenta|menciona|manifiesta)(\s+que)?\s+/i, ""))).slice(0, 3);
  }
  const fuenteMotivo = ev.motivo.trim() ? ev.motivo : texto.split(/\n\s*\n/)[0] || texto;
  const sinRelato = fuenteMotivo
    .split(/(?<=[.!?])\s+|\n/)
    .filter(
      (f) =>
        !/\b(refiere|relata|dice|comenta|cuenta|menciona|manifiesta|eva|evn|nprs|banderas?|signos?|examen|test|rom|fuerza|palpaci\w*|dx|diagn\w*)\b/i.test(f) &&
        !/["“”]/.test(f) &&
        !/^\s*(meta|metas|objetivos?|plan|pr[oó]xima|examen|hallazgos|acuerdos|indicaciones|tratamiento)\b/i.test(f)
    )
    .join(" ");
  ev.motivo = aSegunda(primeraIdea(sinRelato || fuenteMotivo, 150)) + ".";
  ev.metas = ev.metas.map(aSegunda);

  const factores = FACTORES.filter(([re]) => re.test(norm)).map(([, t]) => t);
  const miedos = [...ev.preocupaciones.slice(0, 3), ...MIEDOS.filter(([re]) => re.test(norm)).map(([, t]) => t)];
  const unicos = (xs: string[]) => Array.from(new Set(xs)).slice(0, 5);

  if (!ev.nombre.trim()) {
    const m = texto.trim().match(/^(?:paciente:?\s*)?([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?\s*,?\s*\d{1,2}\s*a(?:ñ|n)os/);
    if (m) ev.nombre = m[1];
  }
  // El motivo no debería repetir el nombre ni la edad
  ev.motivo = ev.motivo.replace(/^(?:paciente:?\s*)?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?\s*,?\s*\d{1,2}\s*a(?:ñ|n)os[^.]*\.\s*/, "");
  ev.motivo = ev.motivo.replace(/^consulta por\s+/i, "Consultaste por ").replace(/^motivo de consulta:?\s*/i, "");
  const nombre = ev.nombre.trim().split(/\s+/)[0] || "";
  const hojas: Pieza[][] = [];

  // Hoja 1: lo que me contaste
  const h1: Pieza[] = [titulo(nombre ? `Lo que conversamos, ${nombre}` : "Lo que conversamos")];
  h1.push({
    kind: "escucha",
    d: { titulo: "Lo que me contaste", motivo: ev.motivo, frases: ev.frases.slice(0, 3), comillas, meta: ev.metas.slice(0, 2).join(". ") },
    max: 1.45,
  });
  const dolor = parseFloat(ev.dolor.replace(",", "."));
  if (Number.isFinite(dolor)) {
    h1.push({ kind: "escala", d: { ...datosIniciales("escala", "dolor"), titulo: "Tu dolor hoy", valor: Math.max(0, Math.min(10, Math.round(dolor))) }, max: 1.3 });
  }
  hojas.push(h1);

  // Hoja 2: qué está pasando, con el gráfico que corresponde
  const h2: Pieza[] = [titulo(caso ? caso.titulo : "Qué está pasando")];
  if (caso) {
    caso.graficos.forEach((g) => {
      const d = JSON.parse(JSON.stringify(g.d));
      if (g.kind === "arribaabajo") {
        if (miedos.length) d.arriba = unicos(miedos);
      }
      h2.push({ ...g, d });
    });
  } else if (miedos.length) {
    h2.push({ kind: "protecto", d: { dims: unicos(miedos), sims: unicos(ev.ayudas.length ? ev.ayudas : ["Entender qué te pasa", "Moverte de a poco"]) }, max: 1.45 });
    h2.push({ kind: "camino", d: {}, max: 1.4 });
  } else {
    h2.push({ kind: "capacidad", d: datosIniciales("capacidad", "pico"), max: 1.5 });
    h2.push({ kind: "camino", d: {}, max: 1.4 });
  }
  hojas.push(h2);

  // Hoja 3: tu contexto y lo que haremos
  const h3: Pieza[] = [titulo("Lo que vamos a hacer")];
  const may = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
  ev.plan = ev.plan.map(may);
  ev.acuerdos = ev.acuerdos.map(may);
  const plan = ev.plan.length ? ev.plan : caso ? caso.plan : ["Entender qué te pasa", "Ejercicio progresivo, adaptado a ti", "Ajustar la carga del día a día"];
  h3.push({ kind: "plan", d: { titulo: "El plan", items: plan.slice(0, 6) }, max: 1.3 });
  if (ev.acuerdos.length) h3.push({ kind: "plan", d: { titulo: "Lo que acordamos", items: ev.acuerdos.slice(0, 5) }, max: 1.3 });
  let conContexto = false;
  if (!ev.acuerdos.length && (persistente || factores.length >= 2) && !(caso && caso.id === "hombro")) {
    conContexto = true;
    h3.push({ kind: "contexto", d: { ...datosIniciales("contexto"), factores: unicos([...factores, "Cómo duermes", "Cuánto te mueves", "Qué crees que te pasa"]).slice(0, 6) }, max: 0.75 });
  }
  const cierre = [ev.proxima.trim() ? `Nos vemos: ${ev.proxima.trim()}.` : "", "Si algo no quedó claro, escríbeme."].filter(Boolean).join(" ");
  h3.push({ kind: "nota", d: { texto: cierre, color: "#F5E663" }, max: conContexto ? 0.8 : 1.25, junto: conContexto });
  hojas.push(h3);

  return apilar(hojas, () => "Sigue");
}

export const EJEMPLO_NOTAS = `Camila, 34 años, oficinista. Consulta por dolor de hombro derecho de 4 meses de evolución, sin trauma. Empeoró al volver al gimnasio.
Refiere que le duele al tomar cosas de la repisa. Dice que tiene miedo de que sea un tendón roto. Duerme mal porque el dolor la despierta. Mucho estrés en el trabajo. EVA 6/10.
Examen: dolor en arco entre 90 y 120°, fuerza de rotación externa 4/5 con dolor, sin banderas rojas.
Objetivo: volver a entrenar y tomar en brazos a su sobrino sin dolor.
Plan:
- Ejercicio progresivo de hombro 3 veces por semana
- Ajustar el gimnasio por ahora, sin dejarlo
- Rutina para dormir mejor
Próxima: martes 3 de diciembre`;
