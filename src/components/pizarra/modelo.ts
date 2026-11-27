// Modelo de datos de la Pizarra de consulta.
// Todo vive en coordenadas de la hoja (1080×1350 vertical o 1600×1000 horizontal).

export type Kind =
  | "cuerpo"
  | "tendon"
  | "rodilla"
  | "carga"
  | "capacidad"
  | "semaforo"
  | "tiempo"
  | "fuerza"
  | "semana"
  | "escala"
  | "protecto"
  | "barras"
  | "torta"
  | "proteina"
  | "nota"
  | "titulo"
  | "plan"
  | "flecha"
  | "contexto"
  | "arribaabajo"
  | "camino"
  | "dato"
  | "escucha"
  | "metafora";

export interface Item {
  id: string;
  kind: Kind;
  x: number;
  y: number;
  s: number; // escala
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  d: any; // datos propios de cada elemento
}

export interface Stroke {
  c: string;
  w: number;
  pts: [number, number][];
}

export type Formato = "vertical" | "horizontal";

export interface Hoja {
  formato: Formato;
  items: Item[];
  strokes: Stroke[];
}

export const TAM: Record<Formato, { w: number; h: number }> = {
  vertical: { w: 1080, h: 1350 },
  horizontal: { w: 1600, h: 1000 },
};

export const C = {
  ink: "#1D2433",
  ink2: "#5A6170",
  rule: "#E3E5E8",
  soft: "#F6F7F8",
  hl: "#F5E663",
  go: "#0F5C4D",
  rojo: "#c0392b",
  naranjo: "#e67e22",
  azul: "#2563eb",
  verde: "#2E8B57",
  amarillo: "#E9B949",
};

export const FONT = "'Bricolage Grotesque', system-ui, -apple-system, sans-serif";

export const nuevoId = () => Math.random().toString(36).slice(2, 10);

// ---------- Presets de líneas de tiempo ----------
export const TIEMPOS: Record<string, { titulo: string; fases: { n: string; t: string }[] }> = {
  lca: {
    titulo: "Tu camino después de la cirugía de LCA",
    fases: [
      { n: "Bajar la inflamación y extender la rodilla", t: "0–2 sem" },
      { n: "Caminar bien y fuerza básica", t: "2–6 sem" },
      { n: "Fuerza y control", t: "6–12 sem" },
      { n: "Trote y saltos", t: "3–6 meses" },
      { n: "Cambios de dirección y deporte sin contacto", t: "6–9 meses" },
      { n: "Vuelta al deporte", t: "desde 9 meses" },
    ],
  },
  desgarro: {
    titulo: "Tu camino después del desgarro",
    fases: [
      { n: "Proteger y moverse sin dolor", t: "primeros días" },
      { n: "Fuerza progresiva", t: "1–3 sem" },
      { n: "Carrera y velocidad", t: "2–6 sem" },
      { n: "Vuelta al entrenamiento y a competir", t: "según evolución" },
    ],
  },
  tendinopatia: {
    titulo: "Tu camino con el tendón",
    fases: [
      { n: "Calmar el dolor con carga tolerable", t: "0–2 sem" },
      { n: "Fuerza lenta y pesada", t: "2–8 sem" },
      { n: "Fuerza rápida y saltos", t: "8–12 sem" },
      { n: "Vuelta al deporte", t: "desde 12 sem" },
    ],
  },
  postop: {
    titulo: "Tu camino después de la cirugía",
    fases: [
      { n: "Proteger, controlar el dolor y moverse", t: "0–2 sem" },
      { n: "Recuperar movilidad", t: "2–6 sem" },
      { n: "Fuerza", t: "6–12 sem" },
      { n: "Volver a tus actividades", t: "según evolución" },
    ],
  },
  entreno: {
    titulo: "Lo que viene al entrenar",
    fases: [
      { n: "Aprender la técnica", t: "sem 1–4" },
      { n: "Más fuerza (aprende tu sistema nervioso)", t: "sem 4–8" },
      { n: "Empieza a notarse el tamaño", t: "sem 8–12" },
      { n: "Seguir progresando", t: "desde sem 12" },
    ],
  },
  vacia: {
    titulo: "Las etapas",
    fases: [
      { n: "Etapa 1", t: "" },
      { n: "Etapa 2", t: "" },
      { n: "Etapa 3", t: "" },
    ],
  },
};

export const DIMS_SUGERIDOS = [
  "Miedo a moverme",
  "Lo que me dijeron de la imagen",
  "Dormir mal",
  "Estrés",
  "Pensar que algo está dañado",
  "No entender qué me pasa",
  "Dolor anterior",
];
export const SIMS_SUGERIDOS = [
  "Entender qué me pasa",
  "Caminar",
  "Dormir bien",
  "Ejercicio que disfruto",
  "Mi familia y amigos",
  "Tener un plan claro",
  "Saber que mi cuerpo es fuerte",
];

export const PALETA_TORTA = ["#0F5C4D", "#E9B949", "#2563eb", "#c0392b", "#8B5CF6", "#5A6170"];

// ---------- Datos iniciales de cada elemento ----------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function datosIniciales(kind: Kind, preset?: string): any {
  switch (kind) {
    case "cuerpo":
      return { vista: preset === "espalda" ? "espalda" : "frente" };
    case "tendon":
      return { marca: "ninguna" };
    case "rodilla":
      return { marca: "ninguna" };
    case "carga":
      return {
        titulo: "Tu carga de las últimas semanas",
        unidad: "min",
        semanas: [180, 200, 190, 210],
        actual: 340,
      };
    case "capacidad":
      return { modo: preset === "plan" ? "plan" : "pico" };
    case "semaforo":
      return { valor: -1 };
    case "tiempo": {
      const p = TIEMPOS[preset || "lca"] || TIEMPOS.vacia;
      return { titulo: p.titulo, fases: p.fases.map((f) => ({ ...f })), hoy: 0 };
    }
    case "fuerza":
      return {};
    case "semana":
      return { titulo: "Tu semana", dias: ["Fuerza", "", "Trote suave", "", "Fuerza", "Deporte", ""] };
    case "escala":
      return preset === "rpe"
        ? { titulo: "Esfuerzo (0 a 10)", valor: 7, izq: "Nada", der: "Máximo" }
        : { titulo: "Dolor hoy", valor: 4, izq: "Sin dolor", der: "El peor imaginable" };
    case "protecto":
      return { dims: ["Miedo a moverme", "Dormir mal"], sims: ["Entender qué me pasa", "Caminar"] };
    case "barras":
      if (preset === "sueno")
        return {
          titulo: "Tus horas de sueño",
          etiquetas: ["L", "M", "M", "J", "V", "S", "D"],
          valores: [6, 5.5, 7, 6, 5, 8, 8],
          meta: 7,
          metaTexto: "Meta: 7 h o más",
          destacar: -1,
        };
      return {
        titulo: "Título del gráfico",
        etiquetas: ["A", "B", "C", "D"],
        valores: [3, 5, 4, 7],
        meta: null,
        metaTexto: "",
        destacar: 3,
      };
    case "torta":
      if (preset === "plato")
        return {
          titulo: "Cómo armar tu plato",
          partes: [
            { n: "Verduras y frutas", v: 50 },
            { n: "Proteína", v: 25 },
            { n: "Carbohidratos", v: 25 },
          ],
        };
      if (preset === "dolor")
        return {
          titulo: "Lo que influye en tu dolor",
          partes: [
            { n: "Carga", v: 30 },
            { n: "Sueño", v: 20 },
            { n: "Estrés", v: 25 },
            { n: "Lo que crees que pasa", v: 25 },
          ],
        };
      return { titulo: "Título", partes: [{ n: "Parte 1", v: 50 }, { n: "Parte 2", v: 50 }] };
    case "proteina":
      return { peso: 70, gkg: 1.6, comidas: 4 };
    case "nota":
      return {
        texto:
          preset === "alarma"
            ? "El dolor es una alarma que te protege. No siempre significa daño."
            : preset === "fuerte"
              ? "Tu cuerpo es fuerte y se adapta a la carga."
              : "Escribe aquí",
        color: C.hl,
      };
    case "titulo":
      return { texto: "Título" };
    case "plan":
      if (preset === "evidencia")
        return {
          titulo: "Lo que dice la evidencia",
          items: ["Entender qué te pasa", "Ejercicio progresivo, adaptado a ti", "Ajustar la carga del día a día", "Cuidar sueño, alimentación y estrés"],
        };
      return {
        titulo: "Lo que vamos a hacer",
        items: ["Bajar la carga esta semana", "Fuerza 2 veces por semana", "Volver a subir de a poco"],
      };
    case "flecha":
      return { r: 0, color: C.ink };
    case "contexto":
      return {
        titulo: "Tú, en tu contexto",
        factores: ["Cómo duermes", "Qué comes", "Cuánto te mueves", "Lo que haces cada día", "Qué crees que te pasa", "Estrés y emociones"],
        frase: "Todo esto también cuenta.",
      };
    case "arribaabajo":
      return {
        arriba: ["Lo que crees que pasa", "Miedo o preocupación", "Estrés", "Dormir mal"],
        abajo: ["Tejido irritado", "Carga del día a día", "Más sensibilidad"],
        zona: "Hombro",
      };
    case "camino":
      return {};
    case "metafora":
      return { tipo: preset || "alarma" };
    case "escucha":
      return {
        titulo: "Lo que me contaste",
        frases: ["Me duele al levantar el brazo para tomar cosas altas", "Tengo miedo de que sea algo grave"],
        meta: "Volver a jugar tenis con mi hijo",
      };
    case "dato":
      return preset === "hombro"
        ? { numero: "La mayoría", texto: "de las personas con dolor subacromial se recupera por completo con una intervención mínima. Las causas graves son raras.", fuente: "Haas, Ibounig y Buchbinder · JAMA Intern Med 2026" }
        : { numero: "00%", texto: "Escribe aquí lo que significa el dato.", fuente: "Fuente" };
  }
}

// ---------- Tamaño base de cada elemento (antes de escalar) ----------
export function base(it: Item): { w: number; h: number } {
  switch (it.kind) {
    case "cuerpo":
      return { w: 300, h: 620 };
    case "tendon":
      return { w: 640, h: 250 };
    case "rodilla":
      return { w: 360, h: 470 };
    case "carga":
      return { w: 600, h: 420 };
    case "capacidad":
      return { w: 600, h: 400 };
    case "semaforo":
      return { w: 600, h: 330 };
    case "tiempo":
      return { w: 640, h: 100 + filasTiempo(it.d.fases).reduce((a, b) => a + b, 0) + 60 };
    case "fuerza":
      return { w: 600, h: 420 };
    case "semana":
      return { w: 700, h: 250 };
    case "escala":
      return { w: 640, h: 190 };
    case "protecto":
      return { w: 640, h: 132 + altoListas(it.d.dims, it.d.sims) + 30 + 120 };
    case "barras":
      return { w: 600, h: 420 };
    case "torta":
      return { w: 600, h: 380 };
    case "proteina":
      return { w: 520, h: 330 };
    case "nota":
      return { w: 440, h: 80 + lineas(it.d.texto, 22).length * 44 };
    case "titulo":
      return { w: 900, h: 20 + lineas(it.d.texto, 28).length * 72 };
    case "plan":
      return { w: 600, h: 100 + filasPlan(it.d.items).reduce((a, b) => a + b, 0) };
    case "flecha":
      return { w: 260, h: 80 };
    case "contexto":
      return { w: 760, h: 820 };
    case "arribaabajo":
      return { w: 680, h: 560 };
    case "camino":
      return { w: 600, h: 380 };
    case "metafora":
      return { w: 640, h: it.d.tipo === "montanas" ? 480 : 420 };
    case "dato":
      return { w: 600, h: 300 };
    case "escucha":
      return { w: 640, h: 96 + altoMotivo(it.d.motivo) + filasEscucha(it.d.frases).reduce((a, b) => a + b, 0) + altoMeta(it.d.meta) + 12 };
  }
}

/** Alto de cada fila según cuántas líneas ocupa su texto (para no cortar textos). */
export const filasTiempo = (fases: { n: string }[]) => fases.map((f) => 40 + Math.min(3, lineas(f.n, 34).length) * 26);
export const filasPlan = (items: string[]) => items.map((t) => 30 + Math.min(3, lineas(t, 36).length) * 28);
export const filasEscucha = (frases: string[]) => frases.map((t) => 22 + Math.min(4, lineas(`“${t}”`, 40).length) * 32);
export const altoMotivo = (m?: string) => (m && m.trim() ? Math.min(4, lineas(m, 46).length) * 28 + 22 : 0);
export const altoMeta = (meta: string) => (meta && meta.trim() ? 70 + Math.min(4, lineas(meta, 36).length) * 34 + 24 : 16);
export function altoListas(a: string[], b: string[]) {
  const col = (xs: string[]) => xs.slice(0, 5).reduce((acc, t) => acc + Math.min(3, lineas(t, 24).length) * 26 + 8, 0);
  return Math.max(col(a), col(b));
}

/** Corte simple de texto por cantidad de caracteres. */
export function lineas(texto: string, max: number): string[] {
  const out: string[] = [];
  for (const parrafo of String(texto || "").split("\n")) {
    let linea = "";
    for (const w of parrafo.split(/\s+/)) {
      if (!w) continue;
      if ((linea + " " + w).trim().length > max && linea) {
        out.push(linea);
        linea = w;
      } else linea = (linea + " " + w).trim();
    }
    out.push(linea);
  }
  return out.length ? out : [""];
}

// ---------- Catálogo para el menú "Agregar" ----------
export interface Entrada {
  kind: Kind;
  preset?: string;
  nombre: string;
  ayuda: string;
}

export const CATALOGO: { grupo: string; items: Entrada[] }[] = [
  {
    grupo: "Cuerpo",
    items: [
      { kind: "cuerpo", preset: "frente", nombre: "Cuerpo de frente", ayuda: "Para marcar dónde duele" },
      { kind: "cuerpo", preset: "espalda", nombre: "Cuerpo de espalda", ayuda: "Columna, isquios, gemelos" },
      { kind: "tendon", nombre: "Músculo, tendón y hueso", ayuda: "Tendinopatía o desgarro" },
      { kind: "rodilla", nombre: "Rodilla por dentro", ayuda: "LCA, menisco, ligamento interno" },
    ],
  },
  {
    grupo: "Carga y lesión",
    items: [
      { kind: "carga", nombre: "Carga de las últimas semanas", ayuda: "4 semanas vs esta semana" },
      { kind: "capacidad", preset: "pico", nombre: "Carga vs lo que tolera", ayuda: "Por qué apareció la lesión" },
      { kind: "capacidad", preset: "plan", nombre: "Subir de a poco", ayuda: "Cómo vamos a progresar" },
      { kind: "semaforo", nombre: "Semáforo del dolor", ayuda: "Cuánto dolor es aceptable" },
      { kind: "tiempo", preset: "lca", nombre: "Etapas LCA", ayuda: "Reconstrucción de ligamento" },
      { kind: "tiempo", preset: "desgarro", nombre: "Etapas desgarro", ayuda: "Lesión muscular" },
      { kind: "tiempo", preset: "tendinopatia", nombre: "Etapas tendinopatía", ayuda: "Aquiles, rotuliano, glúteo" },
      { kind: "tiempo", preset: "postop", nombre: "Etapas post operatorio", ayuda: "Cualquier cirugía" },
    ],
  },
  {
    grupo: "Dolor",
    items: [
      { kind: "escala", preset: "dolor", nombre: "Escala de dolor 0 a 10", ayuda: "Cómo está hoy" },
      { kind: "protecto", nombre: "DIMs y SIMs", ayuda: "Lo que suma peligro y seguridad" },
      { kind: "nota", preset: "alarma", nombre: "El dolor es una alarma", ayuda: "Nota lista" },
      { kind: "torta", preset: "dolor", nombre: "Lo que influye en tu dolor", ayuda: "Torta editable" },
      { kind: "contexto", nombre: "Tú, en tu contexto", ayuda: "La persona al centro y lo que suma" },
      { kind: "arribaabajo", nombre: "De arriba abajo y de abajo arriba", ayuda: "Top-down y bottom-up" },
      { kind: "camino", nombre: "La mejora no es lineal", ayuda: "Días mejores y peores" },
      { kind: "plan", preset: "evidencia", nombre: "Lo que dice la evidencia", ayuda: "Primera línea de tratamiento" },
      { kind: "dato", preset: "hombro", nombre: "Dato de la evidencia", ayuda: "Número grande con su fuente" },
      { kind: "escucha", nombre: "Lo que me contaste", ayuda: "Sus palabras y lo que le importa" },
      { kind: "metafora", preset: "alarma", nombre: "Una alarma más sensible", ayuda: "Suena antes y más fuerte" },
      { kind: "metafora", preset: "evitar", nombre: "Ni evitar ni aguantar", ayuda: "Dos patrones y el tercer camino" },
      { kind: "metafora", preset: "montanas", nombre: "El margen de protección", ayuda: "Dolor, brote y tejido al subir de a poco" },
    ],
  },
  {
    grupo: "Entrenamiento",
    items: [
      { kind: "fuerza", nombre: "Fuerza primero, tamaño después", ayuda: "Primeras 8–12 semanas" },
      { kind: "tiempo", preset: "entreno", nombre: "Etapas al empezar a entrenar", ayuda: "Qué esperar" },
      { kind: "semana", nombre: "Tu semana", ayuda: "Plan de lunes a domingo" },
      { kind: "escala", preset: "rpe", nombre: "Escala de esfuerzo", ayuda: "RPE de 0 a 10" },
      { kind: "nota", preset: "fuerte", nombre: "Tu cuerpo es fuerte", ayuda: "Nota lista" },
    ],
  },
  {
    grupo: "Nutrición y sueño",
    items: [
      { kind: "torta", preset: "plato", nombre: "Cómo armar tu plato", ayuda: "Torta editable" },
      { kind: "proteina", nombre: "Proteína al día", ayuda: "Calcula según tu peso" },
      { kind: "barras", preset: "sueno", nombre: "Horas de sueño", ayuda: "Semana con meta" },
    ],
  },
  {
    grupo: "Para explicar",
    items: [
      { kind: "titulo", nombre: "Título", ayuda: "Texto grande" },
      { kind: "nota", nombre: "Nota", ayuda: "Texto en papel amarillo" },
      { kind: "plan", nombre: "Lo que vamos a hacer", ayuda: "Lista de pasos" },
      { kind: "flecha", nombre: "Flecha", ayuda: "Se puede girar" },
      { kind: "barras", nombre: "Gráfico de barras", ayuda: "En blanco" },
      { kind: "torta", nombre: "Gráfico de torta", ayuda: "En blanco" },
    ],
  },
];

// ---------- Plantillas: hojas ya armadas ----------
export interface Plantilla {
  nombre: string;
  ayuda: string;
  formato: Formato;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: { kind: Kind; preset?: string; x: number; y: number; s: number; d?: any }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mas?: { kind: Kind; preset?: string; x: number; y: number; s: number; d?: any }[][];
}

export const PLANTILLAS: Plantilla[] = [
  {
    nombre: "Dolor de hombro persistente",
    ayuda: "La persona en su contexto, de dónde viene el dolor y cómo lo vamos a manejar (3 hojas)",
    formato: "vertical",
    items: [
      { kind: "titulo", x: 60, y: 40, s: 0.85, d: { texto: "Tu dolor de hombro" } },
      { kind: "contexto", x: 80, y: 170, s: 1.21 },
    ],
    mas: [
      [{ kind: "arribaabajo", x: 47, y: 200, s: 1.45, d: { zona: "Hombro" } }],
      [
        { kind: "plan", preset: "evidencia", x: 60, y: 50, s: 1.15 },
        { kind: "camino", x: 60, y: 510, s: 1.15 },
        { kind: "dato", preset: "hombro", x: 60, y: 980, s: 1 },
      ],
    ],
  },
  {
    nombre: "Lesión por carga",
    ayuda: "Dónde duele, qué pasó con la carga y qué haremos",
    formato: "vertical",
    items: [
      { kind: "titulo", x: 60, y: 50, s: 0.8, d: { texto: "Por qué apareció tu dolor" } },
      { kind: "cuerpo", preset: "frente", x: 60, y: 160, s: 0.75 },
      { kind: "carga", x: 330, y: 160, s: 1.15 },
      { kind: "plan", x: 330, y: 680, s: 1.1 },
      { kind: "semaforo", x: 60, y: 1000, s: 0.9 },
    ],
  },
  {
    nombre: "Dolor persistente",
    ayuda: "Escala, DIMs/SIMs y el plan",
    formato: "vertical",
    items: [
      { kind: "nota", preset: "alarma", x: 60, y: 60, s: 1.1 },
      { kind: "cuerpo", preset: "frente", x: 640, y: 50, s: 0.62 },
      { kind: "escala", preset: "dolor", x: 60, y: 300, s: 0.85 },
      { kind: "protecto", x: 60, y: 500, s: 1 },
      { kind: "plan", x: 60, y: 990, s: 1 },
    ],
  },
  {
    nombre: "LCA o post operatorio",
    ayuda: "Rodilla, etapas y plan",
    formato: "vertical",
    items: [
      { kind: "rodilla", x: 60, y: 60, s: 1 },
      { kind: "nota", x: 480, y: 80, s: 1.15, d: { texto: "El LCA ayuda a estabilizar la rodilla al girar y frenar.", color: "#F5E663" } },
      { kind: "tiempo", preset: "lca", x: 60, y: 545, s: 1.2 },
    ],
  },
  {
    nombre: "Tendinopatía o desgarro",
    ayuda: "Tendón, carga tolerable y etapas",
    formato: "vertical",
    items: [
      { kind: "tendon", x: 60, y: 50, s: 1.4 },
      { kind: "semaforo", x: 60, y: 420, s: 1.1 },
      { kind: "tiempo", preset: "tendinopatia", x: 60, y: 790, s: 1.08 },
    ],
  },
  {
    nombre: "Empezar a entrenar",
    ayuda: "Qué esperar, tu semana y proteína",
    formato: "vertical",
    items: [
      { kind: "fuerza", x: 60, y: 50, s: 1.15 },
      { kind: "semana", x: 60, y: 570, s: 1.35 },
      { kind: "proteina", x: 60, y: 920, s: 1 },
      { kind: "escala", preset: "rpe", x: 600, y: 940, s: 0.65 },
    ],
  },
  {
    nombre: "Nutrición y sueño",
    ayuda: "Plato, proteína y horas de sueño",
    formato: "vertical",
    items: [
      { kind: "torta", preset: "plato", x: 60, y: 50, s: 1.15 },
      { kind: "proteina", x: 60, y: 520, s: 1 },
      { kind: "barras", preset: "sueno", x: 60, y: 870, s: 1 },
    ],
  },
];
