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

export const EJEMPLO_NOTAS = `Nombre: Camila Rojas
Motivo: Dolor de hombro derecho hace 4 meses, sin golpe ni caída. Empeoró al volver al gimnasio.
Zona: Hombro
EVA 6/10
"Me duele al tomar cosas de la repisa"
"Tengo miedo de que sea un tendón roto"
"Duermo mal porque me despierta el dolor"
Meta: Volver a entrenar y tomar en brazos a mi sobrino sin dolor
Hallazgos:
- Dolor al elevar el brazo sobre los 90°
- Fuerza conservada, con dolor al rotar hacia afuera
- Sin señales de algo grave
Preocupaciones: miedo a que esté roto; estrés en el trabajo; duerme 5 horas
Ayudas: caminar; entender qué le pasa
Plan:
- Ejercicio de hombro progresivo 3 veces por semana
- Ajustar el gimnasio por ahora, sin dejarlo
- Rutina para dormir mejor
Acuerdos:
- Hacer los ejercicios lunes, miércoles y viernes
- Anotar el dolor de 0 a 10 después de entrenar
Próxima: martes 3 de diciembre`;
