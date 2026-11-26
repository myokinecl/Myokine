import { useCallback, useEffect, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { svgAPng } from "../lib/exportarSvg";
import { PanelEvaluacion } from "./pizarra/PanelEvaluacion";
import {
  CATALOGO,
  C,
  FONT,
  PLANTILLAS,
  TAM,
  base,
  datosIniciales,
  nuevoId,
  type Entrada,
  type Formato,
  type Hoja,
  type Item,
  type Plantilla,
  type Stroke,
} from "./pizarra/modelo";
import { Elemento } from "./pizarra/elementos";
import { Editor } from "./pizarra/editores";

type Modo = "mover" | "dibujar" | "borrar";

const LS_KEY = "myokine-pizarra-v2";
const COLORES = [
  { c: C.rojo, label: "Dolor" },
  { c: C.naranjo, label: "Molestia" },
  { c: C.azul, label: "Hormigueo" },
  { c: C.go, label: "Verde" },
  { c: C.ink, label: "Negro" },
];

const hojaVacia = (formato: Formato = "vertical"): Hoja => ({ formato, items: [], strokes: [] });

function cargar(): Hoja[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const h = JSON.parse(raw);
      if (Array.isArray(h) && h.length) return h;
    }
  } catch {
    /* sin almacenamiento disponible */
  }
  return [hojaVacia()];
}

function strokePath(s: Stroke) {
  if (s.pts.length === 1) {
    const [x, y] = s.pts[0];
    return `M${x},${y} L${x + 0.1},${y}`;
  }
  return "M" + s.pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L");
}

/** Dibujo completo de una hoja. Se usa en pantalla y para exportar la imagen. */
function HojaSVG({
  hoja,
  iniciales,
  sel,
  svgRef,
  live,
  handlers,
}: {
  hoja: Hoja;
  iniciales: string;
  sel?: string | null;
  svgRef?: (el: SVGSVGElement | null) => void;
  live?: Stroke | null;
  handlers?: {
    onPointerDown: (e: RPointerEvent<SVGSVGElement>) => void;
    onPointerMove: (e: RPointerEvent<SVGSVGElement>) => void;
    onPointerUp: (e: RPointerEvent<SVGSVGElement>) => void;
  };
}) {
  const { w, h } = TAM[hoja.formato];
  const fecha = new Date().toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
  const selIt = hoja.items.find((i) => i.id === sel);
  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${w} ${h}`}
      width="100%"
      style={{ display: "block", touchAction: "none", userSelect: "none" }}
      {...handlers}
    >
      <rect x={0} y={0} width={w} height={h} fill="#fff" />
      {hoja.items.map((it) => (
        <g key={it.id} data-item={it.id} transform={`translate(${it.x} ${it.y}) scale(${it.s})`} style={{ cursor: "move" }}>
          <Elemento it={it} />
        </g>
      ))}
      {hoja.strokes.map((s, i) => (
        <path key={i} d={strokePath(s)} fill="none" stroke={s.c} strokeWidth={s.w} strokeLinecap="round" strokeLinejoin="round" opacity={0.9} />
      ))}
      {live && <path d={strokePath(live)} fill="none" stroke={live.c} strokeWidth={live.w} strokeLinecap="round" strokeLinejoin="round" opacity={0.9} />}
      <text x={40} y={h - 28} fontFamily={FONT} fontSize={22} fill={C.ink2}>
        {iniciales ? `Para ${iniciales} · ${fecha}` : fecha}
      </text>
      <text x={w - 40} y={h - 28} fontFamily={FONT} fontSize={22} fill={C.ink2} textAnchor="end">
        Lukas · Kinesiólogo · myokine.web.app
      </text>
      {selIt && (() => {
        const b = base(selIt);
        const bw = b.w * selIt.s, bh = b.h * selIt.s;
        return (
          <g data-ui="1">
            <rect x={selIt.x - 8} y={selIt.y - 8} width={bw + 16} height={bh + 16} fill="none" stroke={C.go} strokeWidth={3} strokeDasharray="12 8" rx={12} pointerEvents="none" />
            <g data-handle={selIt.id} style={{ cursor: "nwse-resize" }}>
              <circle cx={selIt.x + bw + 8} cy={selIt.y + bh + 8} r={30} fill="transparent" />
              <circle cx={selIt.x + bw + 8} cy={selIt.y + bh + 8} r={18} fill={C.go} stroke="#fff" strokeWidth={4} />
            </g>
          </g>
        );
      })()}
    </svg>
  );
}

export function Pizarra() {
  const [hojas, setHojas] = useState<Hoja[]>(cargar);
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const [modo, setModo] = useState<Modo>("mover");
  const [color, setColor] = useState(C.rojo);
  const [grosor, setGrosor] = useState(10);
  const [iniciales, setIniciales] = useState("");
  const [panel, setPanel] = useState<"agregar" | "plantillas" | "evaluacion" | null>(null);
  const [live, setLive] = useState<Stroke | null>(null);
  const [lapiz, setLapiz] = useState(false);
  const [busy, setBusy] = useState(false);
  const [aviso, setAviso] = useState("");
  const [confirmarNueva, setConfirmarNueva] = useState(false);
  const [exportando, setExportando] = useState(false);

  const svgEl = useRef<SVGSVGElement | null>(null);
  const exportRefs = useRef<(SVGSVGElement | null)[]>([]);
  const hist = useRef<string[]>([]);
  const lastCommit = useRef(0);
  const drag = useRef<
    | { tipo: "mover"; id: string; dx: number; dy: number }
    | { tipo: "escalar"; id: string; s0: number; d0: number; ox: number; oy: number }
    | { tipo: "dibujar" }
    | { tipo: "borrar" }
    | null
  >(null);

  const hoja = hojas[Math.min(idx, hojas.length - 1)];
  const { w: HW, h: HH } = TAM[hoja.formato];

  // Guardado automático solo en este dispositivo
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(hojas));
      } catch {
        /* almacenamiento lleno o bloqueado */
      }
    }, 400);
    return () => clearTimeout(t);
  }, [hojas]);

  const commit = useCallback(
    (forzar = true) => {
      const now = Date.now();
      if (!forzar && now - lastCommit.current < 900) return;
      lastCommit.current = now;
      hist.current.push(JSON.stringify(hojas));
      if (hist.current.length > 60) hist.current.shift();
    },
    [hojas]
  );

  const setHoja = (fn: (h: Hoja) => Hoja) => setHojas((hs) => hs.map((h, i) => (i === idx ? fn(h) : h)));
  const setItem = (id: string, fn: (it: Item) => Item) => setHoja((h) => ({ ...h, items: h.items.map((it) => (it.id === id ? fn(it) : it)) }));

  const deshacer = () => {
    const prev = hist.current.pop();
    if (!prev) return;
    const hs = JSON.parse(prev) as Hoja[];
    setHojas(hs);
    setIdx((i) => Math.min(i, hs.length - 1));
    setSel(null);
  };

  const toBoard = (e: { clientX: number; clientY: number }) => {
    const svg = svgEl.current!;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const m = svg.getScreenCTM();
    const p = m ? pt.matrixTransform(m.inverse()) : pt;
    return [p.x, p.y] as [number, number];
  };

  const borrarEn = (x: number, y: number) => {
    const r = 26;
    setHoja((h) => ({ ...h, strokes: h.strokes.filter((s) => !s.pts.some(([a, b]) => (a - x) ** 2 + (b - y) ** 2 < (r + s.w / 2) ** 2)) }));
  };

  const onDown = (e: RPointerEvent<SVGSVGElement>) => {
    if (e.pointerType === "pen" && !lapiz) setLapiz(true);
    const usaLapiz = lapiz || e.pointerType === "pen";
    const dedoConLapiz = usaLapiz && e.pointerType === "touch";
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* algunos navegadores no lo permiten */
    }
    const [x, y] = toBoard(e);
    if (modo === "dibujar" && !dedoConLapiz) {
      commit();
      drag.current = { tipo: "dibujar" };
      setLive({ c: color, w: grosor, pts: [[x, y]] });
      return;
    }
    if (modo === "borrar" && !dedoConLapiz) {
      commit();
      drag.current = { tipo: "borrar" };
      borrarEn(x, y);
      return;
    }
    const t = e.target as Element;
    const handle = t.closest("[data-handle]")?.getAttribute("data-handle");
    const itemId = t.closest("[data-item]")?.getAttribute("data-item");
    if (handle) {
      const it = hoja.items.find((i) => i.id === handle);
      if (!it) return;
      commit();
      drag.current = { tipo: "escalar", id: it.id, s0: it.s, d0: Math.max(20, Math.hypot(x - it.x, y - it.y)), ox: it.x, oy: it.y };
    } else if (itemId) {
      const it = hoja.items.find((i) => i.id === itemId);
      if (!it) return;
      commit();
      setSel(it.id);
      drag.current = { tipo: "mover", id: it.id, dx: x - it.x, dy: y - it.y };
    } else {
      setSel(null);
      drag.current = null;
    }
  };

  const onMove = (e: RPointerEvent<SVGSVGElement>) => {
    const d = drag.current;
    if (!d) return;
    const [x, y] = toBoard(e);
    if (d.tipo === "dibujar") setLive((s) => (s ? { ...s, pts: [...s.pts, [x, y]] } : s));
    else if (d.tipo === "borrar") borrarEn(x, y);
    else if (d.tipo === "mover")
      setItem(d.id, (it) => {
        const b = base(it);
        return {
          ...it,
          x: Math.max(-b.w * it.s * 0.6, Math.min(HW - b.w * it.s * 0.4, x - d.dx)),
          y: Math.max(-b.h * it.s * 0.6, Math.min(HH - b.h * it.s * 0.4, y - d.dy)),
        };
      });
    else if (d.tipo === "escalar") {
      const s = Math.max(0.25, Math.min(3.5, (d.s0 * Math.hypot(x - d.ox, y - d.oy)) / d.d0));
      setItem(d.id, (it) => ({ ...it, s }));
    }
  };

  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (d?.tipo === "dibujar" && live) {
      const s = live;
      setHoja((h) => ({ ...h, strokes: [...h.strokes, s] }));
      setLive(null);
    }
  };

  const agregar = (en: Entrada) => {
    commit();
    const it: Item = { id: nuevoId(), kind: en.kind, x: 0, y: 0, s: 1, d: datosIniciales(en.kind, en.preset) };
    const b = base(it);
    it.s = Math.min(1.2, (HW * (en.kind === "cuerpo" || en.kind === "flecha" ? 0.3 : 0.6)) / b.w);
    const n = hoja.items.length % 6;
    it.x = Math.round((HW - b.w * it.s) / 2 + n * 24);
    it.y = Math.round(Math.max(40, (HH - b.h * it.s) / 2 - 120 + n * 24));
    setHoja((h) => ({ ...h, items: [...h.items, it] }));
    setSel(it.id);
    setModo("mover");
    setPanel(null);
  };

  const usarPlantilla = (p: Plantilla) => {
    commit();
    const armar = (items: Plantilla["items"]): Hoja => ({
      formato: p.formato,
      strokes: [],
      items: items.map((x) => ({ id: nuevoId(), kind: x.kind, x: x.x, y: x.y, s: x.s, d: { ...datosIniciales(x.kind, x.preset), ...(x.d || {}) } })),
    });
    const nuevas = [armar(p.items), ...(p.mas || []).map(armar)];
    const vacia = hoja.items.length === 0 && hoja.strokes.length === 0;
    if (vacia) {
      setHojas((hs) => [...hs.slice(0, idx), ...nuevas, ...hs.slice(idx + 1)]);
    } else {
      setHojas((hs) => [...hs, ...nuevas]);
      setIdx(hojas.length);
    }
    setSel(null);
    setModo("mover");
    setPanel(null);
  };

  const usarEvaluacion = (nuevas: Hoja[]) => {
    commit();
    const vacia = hoja.items.length === 0 && hoja.strokes.length === 0;
    if (vacia) {
      setHojas((hs) => [...hs.slice(0, idx), ...nuevas, ...hs.slice(idx + 1)]);
    } else {
      setHojas((hs) => [...hs, ...nuevas]);
      setIdx(hojas.length);
    }
    setSel(null);
    setModo("mover");
    setPanel(null);
    setTimeout(() => document.getElementById("pizarra")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const selItem = hoja.items.find((i) => i.id === sel) || null;

  const accionSel = (a: "chico" | "grande" | "duplicar" | "frente" | "eliminar") => {
    if (!selItem) return;
    commit();
    if (a === "eliminar") {
      setHoja((h) => ({ ...h, items: h.items.filter((i) => i.id !== selItem.id) }));
      setSel(null);
    } else if (a === "duplicar") {
      const c: Item = { ...JSON.parse(JSON.stringify(selItem)), id: nuevoId(), x: selItem.x + 30, y: selItem.y + 30 };
      setHoja((h) => ({ ...h, items: [...h.items, c] }));
      setSel(c.id);
    } else if (a === "frente") {
      setHoja((h) => ({ ...h, items: [...h.items.filter((i) => i.id !== selItem.id), selItem] }));
    } else {
      const f = a === "grande" ? 1.15 : 1 / 1.15;
      setItem(selItem.id, (it) => ({ ...it, s: Math.max(0.25, Math.min(3.5, it.s * f)) }));
    }
  };

  // Teclado en computador: borrar y deshacer
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if ((e.key === "Backspace" || e.key === "Delete") && sel) {
        e.preventDefault();
        accionSel("eliminar");
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        deshacer();
      }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  });

  const nuevaHoja = (formato: Formato) => {
    commit();
    setHojas((hs) => [...hs, hojaVacia(formato)]);
    setIdx(hojas.length);
    setSel(null);
  };

  const borrarHoja = () => {
    if (hojas.length === 1) return;
    commit();
    setHojas((hs) => hs.filter((_, i) => i !== idx));
    setIdx((i) => Math.max(0, i - 1));
    setSel(null);
  };

  const nuevaPizarra = () => {
    if (!confirmarNueva) {
      setConfirmarNueva(true);
      setTimeout(() => setConfirmarNueva(false), 2500);
      return;
    }
    commit();
    setHojas([hojaVacia()]);
    setIdx(0);
    setSel(null);
    setIniciales("");
    setConfirmarNueva(false);
  };

  const enviar = async () => {
    setBusy(true);
    setAviso("");
    setSel(null);
    setExportando(true);
    try {
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      const files: File[] = [];
      for (let i = 0; i < hojas.length; i++) {
        const el = exportRefs.current[i];
        const h = hojas[i];
        if (!el || (h.items.length === 0 && h.strokes.length === 0)) continue;
        const { w, h: hh } = TAM[h.formato];
        const blob = await svgAPng(el, w, hh);
        files.push(new File([blob], `pizarra-myokine-${i + 1}.png`, { type: "image/png" }));
      }
      if (!files.length) {
        setAviso("La pizarra está vacía. Agrega algo antes de enviar.");
        return;
      }
      const nav = navigator as Navigator & { canShare?: (d: { files: File[] }) => boolean };
      if (nav.share && nav.canShare?.({ files })) {
        try {
          await nav.share({ files, title: "Pizarra MyoKine", text: "Lo que vimos hoy en la consulta" });
          return;
        } catch (err) {
          if ((err as Error).name === "AbortError") return;
        }
      }
      files.forEach((f) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(f);
        a.download = f.name;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      });
      setAviso(files.length > 1 ? `Se descargaron ${files.length} imágenes.` : "Se descargó la imagen.");
    } catch {
      setAviso("No se pudo crear la imagen. Prueba de nuevo o toma una captura de pantalla.");
    } finally {
      setExportando(false);
      setBusy(false);
    }
  };

  const btn = (on: boolean) =>
    `px-4 py-2.5 rounded-[10px] text-[16px] font-semibold border-[1.5px] transition-colors cursor-pointer ${
      on ? "bg-[#1D2433] text-white border-[#1D2433]" : "bg-white text-[#1D2433] border-[#E3E5E8] hover:border-[#1D2433]"
    }`;

  return (
    <div className="space-y-6" id="pizarra">
      <header className="max-w-3xl">
        <h1 className="font-display text-[34px] sm:text-5xl font-bold tracking-[-0.03em] text-[#1D2433]">Pizarra de consulta</h1>
        <p className="font-serif text-[18px] sm:text-[19px] leading-relaxed text-[#5A6170] mt-3">
          Arma la explicación con dibujos y gráficos listos, escribe o dibuja encima y envíale la imagen a tu paciente. Si no te gusta dibujar, parte con una plantilla.
        </p>
      </header>

      {/* Barra de herramientas */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button type="button" onClick={() => setPanel(panel === "plantillas" ? null : "plantillas")} className="px-4 py-2.5 rounded-[10px] text-[16px] font-semibold bg-[#0F5C4D] text-white cursor-pointer hover:bg-[#0B4A3E]">
          Plantillas
        </button>
        <button type="button" onClick={() => setPanel(panel === "evaluacion" ? null : "evaluacion")} className="px-4 py-2.5 rounded-[10px] text-[16px] font-semibold bg-[#0F5C4D] text-white cursor-pointer hover:bg-[#0B4A3E]">
          Desde mi evaluación
        </button>
        <button type="button" onClick={() => setPanel(panel === "agregar" ? null : "agregar")} className="px-4 py-2.5 rounded-[10px] text-[16px] font-semibold bg-[#0F5C4D] text-white cursor-pointer hover:bg-[#0B4A3E]">
          Agregar
        </button>
        <span className="w-px h-8 bg-[#E3E5E8] mx-1" />
        <button type="button" className={btn(modo === "mover")} onClick={() => setModo("mover")}>Mover</button>
        <button type="button" className={btn(modo === "dibujar")} onClick={() => { setModo("dibujar"); setSel(null); }}>Dibujar</button>
        <button type="button" className={btn(modo === "borrar")} onClick={() => { setModo("borrar"); setSel(null); }}>Borrar trazos</button>
        <button type="button" className={btn(false)} onClick={deshacer} disabled={!hist.current.length}>Deshacer</button>
      </div>

      {modo === "dibujar" && (
        <div className="flex flex-wrap items-center gap-3">
          {COLORES.map((c) => (
            <button key={c.c} type="button" onClick={() => setColor(c.c)} className={`flex items-center gap-2 px-3 py-2 rounded-[10px] border-[1.5px] text-[15px] font-semibold cursor-pointer ${color === c.c ? "border-[#1D2433]" : "border-[#E3E5E8]"}`}>
              <span className="w-4 h-4 rounded-full" style={{ background: c.c }} />
              {c.label}
            </button>
          ))}
          <label className="flex items-center gap-2 text-[15px] text-[#5A6170]">
            Grosor
            <input type="range" min={4} max={28} value={grosor} onChange={(e) => setGrosor(Number(e.target.value))} className="accent-[#0F5C4D]" />
          </label>
          {lapiz && <span className="text-[15px] text-[#5A6170]">Lápiz detectado: el lápiz dibuja y el dedo mueve.</span>}
        </div>
      )}

      {/* Menús */}
      {panel && (
        <div className="rounded-[18px] border-[1.5px] border-[#E3E5E8] bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl font-bold text-[#1D2433]">{panel === "agregar" ? "Agregar a la hoja" : panel === "evaluacion" ? "Armar desde mi evaluación" : "Empezar con una plantilla"}</h2>
            <button type="button" onClick={() => setPanel(null)} className="text-[16px] font-semibold text-[#0F5C4D] underline underline-offset-4 cursor-pointer">Cerrar</button>
          </div>
          {panel === "evaluacion" ? (
            <PanelEvaluacion onArmar={usarEvaluacion} />
          ) : panel === "plantillas" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PLANTILLAS.map((p) => (
                <button key={p.nombre} type="button" onClick={() => usarPlantilla(p)} className="text-left rounded-[14px] bg-[#F6F7F8] p-4 hover:bg-[#EEF0F2] cursor-pointer">
                  <span className="block font-display text-[19px] font-bold text-[#1D2433]">{p.nombre}</span>
                  <span className="block text-[15px] text-[#5A6170] mt-1">{p.ayuda}</span>
                </button>
              ))}
              <p className="sm:col-span-2 lg:col-span-3 text-[14px] text-[#5A6170]">Si la hoja actual tiene algo, la plantilla se abre en una hoja nueva.</p>
            </div>
          ) : (
            <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-1">
              {CATALOGO.map((g) => (
                <div key={g.grupo}>
                  <h3 className="font-display text-[18px] font-bold text-[#1D2433] mb-2">{g.grupo}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {g.items.map((en) => (
                      <button key={en.nombre} type="button" onClick={() => agregar(en)} className="text-left rounded-[12px] bg-[#F6F7F8] px-4 py-3 hover:bg-[#EEF0F2] cursor-pointer">
                        <span className="block text-[16px] font-semibold text-[#1D2433]">{en.nombre}</span>
                        <span className="block text-[14px] text-[#5A6170]">{en.ayuda}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Hojas */}
      <div className="flex flex-wrap items-center gap-2">
        {hojas.map((_, i) => (
          <button key={i} type="button" onClick={() => { setIdx(i); setSel(null); }} className={btn(i === idx)}>
            Hoja {i + 1}
          </button>
        ))}
        {hojas.length < 8 && (
          <>
            <button type="button" onClick={() => nuevaHoja("vertical")} className={btn(false)}>+ Hoja vertical</button>
            <button type="button" onClick={() => nuevaHoja("horizontal")} className={btn(false)}>+ Hoja horizontal</button>
          </>
        )}
        {hojas.length > 1 && (
          <button type="button" onClick={borrarHoja} className="text-[15px] text-[#c0392b] font-semibold underline underline-offset-4 cursor-pointer ml-1">Quitar esta hoja</button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-6 items-start">
        <div>
          <div
            className="mx-auto rounded-[16px] border-[1.5px] border-[#E3E5E8] overflow-hidden bg-white shadow-[0_1px_0_#E3E5E8]"
            style={{ maxWidth: `calc(76vh * ${HW / HH})` }}
          >
            <HojaSVG
              hoja={hoja}
              iniciales={iniciales}
              sel={modo === "mover" || lapiz ? sel : null}
              live={live}
              svgRef={(el) => (svgEl.current = el)}
              handlers={{ onPointerDown: onDown, onPointerMove: onMove, onPointerUp: onUp }}
            />
          </div>
          {hoja.items.length === 0 && hoja.strokes.length === 0 && (
            <p className="text-center text-[16px] text-[#5A6170] mt-3">Hoja vacía. Toca “Plantillas” o “Agregar” para empezar, o “Dibujar” para hacerlo a mano.</p>
          )}
        </div>

        {/* Panel lateral: editar elemento y enviar */}
        <aside className="space-y-5 lg:sticky lg:top-24">
          {selItem ? (
            <div className="rounded-[18px] border-[1.5px] border-[#E3E5E8] bg-white p-5 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-bold text-[#1D2433]">Editar</h2>
                <button type="button" onClick={() => setSel(null)} className="text-[15px] font-semibold text-[#0F5C4D] underline underline-offset-4 cursor-pointer">Listo</button>
              </div>
              <Editor it={selItem} set={(d) => { commit(false); setItem(selItem.id, (it) => ({ ...it, d })); }} />
              <div className="flex flex-wrap gap-2 pt-1">
                <button type="button" className={btn(false)} onClick={() => accionSel("chico")}>Más chico</button>
                <button type="button" className={btn(false)} onClick={() => accionSel("grande")}>Más grande</button>
                <button type="button" className={btn(false)} onClick={() => accionSel("duplicar")}>Duplicar</button>
                <button type="button" className={btn(false)} onClick={() => accionSel("frente")}>Al frente</button>
                <button type="button" onClick={() => accionSel("eliminar")} className="px-4 py-2.5 rounded-[10px] text-[16px] font-semibold border-[1.5px] border-[#c0392b] text-[#c0392b] cursor-pointer">Eliminar</button>
              </div>
              <p className="text-[14px] text-[#5A6170]">Arrastra para mover. El círculo verde de la esquina cambia el tamaño.</p>
            </div>
          ) : (
            <div className="rounded-[18px] bg-[#F6F7F8] p-5 text-[16px] text-[#5A6170] leading-relaxed">
              Toca un elemento para editarlo. Con “Dibujar” marcas encima de todo: dónde duele, flechas o lo que necesites.
            </div>
          )}

          <div className="rounded-[18px] border-[1.5px] border-[#E3E5E8] bg-white p-5 space-y-4">
            <label className="block">
              <span className="block text-[15px] font-medium text-[#5A6170] mb-1.5">Iniciales del paciente (opcional)</span>
              <input value={iniciales} maxLength={6} onChange={(e) => setIniciales(e.target.value.toUpperCase())} placeholder="Ej: MP" className="w-full rounded-[10px] border-[1.5px] border-[#E3E5E8] px-3 py-2.5 text-[17px] outline-none focus:border-[#1D2433]" />
            </label>
            <button type="button" onClick={enviar} disabled={busy} className="w-full bg-[#0F5C4D] text-white rounded-[10px] px-5 py-3.5 text-[17px] font-semibold hover:bg-[#0B4A3E] disabled:opacity-60 cursor-pointer">
              {busy ? "Creando imagen…" : hojas.length > 1 ? `Enviar ${hojas.length} hojas` : "Enviar al paciente"}
            </button>
            {aviso && <p className="text-[15px] text-[#1D2433]">{aviso}</p>}
            <button type="button" onClick={nuevaPizarra} className="w-full rounded-[10px] px-5 py-3 text-[16px] font-semibold border-[1.5px] border-[#E3E5E8] text-[#1D2433] cursor-pointer">
              {confirmarNueva ? "Toca otra vez para borrar todo" : "Nueva pizarra (siguiente paciente)"}
            </button>
            <p className="text-[14px] text-[#5A6170] leading-relaxed">
              Se guarda solo en este dispositivo, para que no pierdas nada si se cierra la página. Usa iniciales, no nombres. Los gráficos son para explicar; no reemplazan tu evaluación.
            </p>
          </div>
        </aside>
      </div>

      {/* Copias ocultas para crear las imágenes */}
      {exportando && (
        <div aria-hidden="true" style={{ position: "fixed", left: -10000, top: 0, width: 1600 }}>
          {hojas.map((h, i) => (
            <div key={i} style={{ width: TAM[h.formato].w }}>
              <HojaSVG hoja={h} iniciales={iniciales} svgRef={(el) => (exportRefs.current[i] = el)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
