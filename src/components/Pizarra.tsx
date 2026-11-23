import { useEffect, useMemo, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { Undo2, Trash2, Eraser, Pencil, Send, Download, Plus, X, RotateCcw } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Pizarra de consulta: dibujar sobre una silueta, sumar DIMs y SIMs, */
/*  ver el Protectometer y enviarle la imagen al paciente.             */
/*  Nada se guarda ni se envía a ningún servidor.                      */
/* ------------------------------------------------------------------ */

type Pt = { x: number; y: number };
type Stroke = { color: string; size: number; erase: boolean; pts: Pt[] };
type View = "frente" | "espalda";

const W = 600; // sistema de coordenadas de la silueta
const H = 900;

const COLORS = [
  { c: "#c0392b", label: "Dolor" },
  { c: "#e67e22", label: "Molestia" },
  { c: "#2563eb", label: "Hormigueo" },
  { c: "#0a0a0c", label: "Notas" },
];

const DIMS_SUGERIDOS = [
  "Miedo a moverme",
  "Lo que me dijeron de la imagen",
  "Dormir mal",
  "Estrés en el trabajo",
  "Estar mucho rato sentado",
  "Pensar que algo está dañado",
  "No entender qué me pasa",
  "Experiencias de dolor anteriores",
];
const SIMS_SUGERIDOS = [
  "Entender qué me pasa",
  "Caminar",
  "Dormir bien",
  "Ejercicio que disfruto",
  "Mi familia y amigos",
  "Tener un plan claro",
  "Saber que mi cuerpo es fuerte",
  "Calor / ducha caliente",
];

/** Silueta simple y neutra, solo contorno. */
function siluetaPath(view: View) {
  // Cuerpo frontal; la vista de espalda usa el mismo contorno con detalles distintos.
  const body = `
    M300,60 C333,60 352,86 352,118 C352,152 333,178 300,178 C267,178 248,152 248,118 C248,86 267,60 300,60 Z
    M272,180 L328,180 L332,206
    C380,214 418,226 432,262 L470,420 C476,446 482,470 486,500 L492,560
    C494,574 474,580 468,566 L452,508 C446,486 438,462 430,440 L404,330
    L400,470 C400,510 404,540 410,580 L422,700 C428,760 430,800 428,850
    C428,866 404,870 396,856 L372,712 C366,672 358,620 350,580 L300,560
    L250,580 C242,620 234,672 228,712 L204,856 C196,870 172,866 172,850
    C170,800 172,760 178,700 L190,580 C196,540 200,510 200,470 L196,330
    L170,440 C162,462 154,486 148,508 L132,566 C126,580 106,574 108,560
    L114,500 C118,470 124,446 130,420 L168,262 C182,226 220,214 268,206 Z`;
  const frente = `M276,300 C290,306 310,306 324,300 M262,560 C280,548 320,548 338,560`;
  const espalda = `M300,206 L300,520 M240,250 C262,268 282,274 300,276 C318,274 338,268 360,250 M262,540 C280,560 320,560 338,540`;
  return { body, detail: view === "frente" ? frente : espalda };
}

function siluetaSVG(view: View) {
  const { body, detail } = siluetaPath(view);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <path d="${body}" fill="#fbf9f5" stroke="#0a0a0c" stroke-opacity="0.55" stroke-width="3" stroke-linejoin="round"/>
    <path d="${detail}" fill="none" stroke="#0a0a0c" stroke-opacity="0.25" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`;
}

function drawStroke(ctx: CanvasRenderingContext2D, s: Stroke, scale: number, ox = 0, oy = 0) {
  if (s.pts.length === 0) return;
  ctx.save();
  ctx.globalCompositeOperation = s.erase ? "destination-out" : "source-over";
  ctx.strokeStyle = s.color;
  ctx.fillStyle = s.color;
  ctx.globalAlpha = s.erase ? 1 : 0.75;
  ctx.lineWidth = s.size * scale;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  const p0 = s.pts[0];
  ctx.moveTo(ox + p0.x * scale, oy + p0.y * scale);
  if (s.pts.length === 1) {
    ctx.arc(ox + p0.x * scale, oy + p0.y * scale, (s.size * scale) / 2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    for (let i = 1; i < s.pts.length; i++) {
      const a = s.pts[i - 1];
      const b = s.pts[i];
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      ctx.quadraticCurveTo(ox + a.x * scale, oy + a.y * scale, ox + mx * scale, oy + my * scale);
    }
    ctx.stroke();
  }
  ctx.restore();
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxW: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

/* ------------------------------ Protectometer ------------------------------ */
function Protectometer({ dims, sims }: { dims: number; sims: number }) {
  // -1 (mucha seguridad) a +1 (mucha amenaza)
  const total = dims + sims;
  const v = total === 0 ? 0 : (dims - sims) / Math.max(total, 4);
  const pct = 50 + v * 45;
  const label =
    total === 0
      ? "Agrega DIMs y SIMs para ver el balance"
      : v > 0.15
      ? "Hoy pesa más la amenaza: el sistema protege más (más dolor)"
      : v < -0.15
      ? "Hoy pesa más la seguridad: el sistema necesita proteger menos"
      : "La amenaza y la seguridad están parejas";
  return (
    <div className="rounded-2xl border border-[#0a0a0c]/10 bg-white p-4 sm:p-5">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-serif text-lg font-semibold text-[#0a0a0c]">Protectometer</h3>
        <span className="text-[11px] uppercase tracking-widest text-[#0a0a0c]/45">
          {dims} DIMs · {sims} SIMs
        </span>
      </div>
      <div className="relative h-4 rounded-full overflow-hidden" style={{ background: "linear-gradient(90deg,#2f7d5b 0%,#e9e2d0 50%,#c0392b 100%)" }}>
        <div
          className="absolute top-1/2 w-6 h-6 -mt-3 -ml-3 rounded-full bg-[#0a0a0c] border-4 border-white shadow transition-all duration-500"
          style={{ left: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-[11px] font-semibold uppercase tracking-wider mt-2">
        <span className="text-[#2f7d5b]">Seguridad</span>
        <span className="text-[#c0392b]">Protección / dolor</span>
      </div>
      <p className="text-sm text-[#0a0a0c]/70 mt-3">{label}</p>
    </div>
  );
}

/* ------------------------------ Lista DIMs/SIMs ------------------------------ */
function ListaDS({
  tipo,
  items,
  setItems,
  sugeridos,
}: {
  tipo: "DIMs" | "SIMs";
  items: string[];
  setItems: (v: string[]) => void;
  sugeridos: string[];
}) {
  const [txt, setTxt] = useState("");
  const isDim = tipo === "DIMs";
  const color = isDim ? "#c0392b" : "#2f7d5b";
  const add = (v: string) => {
    const t = v.trim();
    if (!t || items.includes(t)) return;
    setItems([...items, t]);
  };
  return (
    <div className="rounded-2xl border border-[#0a0a0c]/10 bg-white p-4 sm:p-5 space-y-3">
      <div>
        <h3 className="font-serif text-lg font-semibold" style={{ color }}>
          {isDim ? "DIMs · lo que suma amenaza" : "SIMs · lo que suma seguridad"}
        </h3>
        <p className="text-xs text-[#0a0a0c]/55">
          {isDim ? "Cosas que el cuerpo interpreta como peligro." : "Cosas que el cuerpo interpreta como seguridad."}
        </p>
      </div>

      {items.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {items.map((it) => (
            <li
              key={it}
              className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 rounded-full text-sm font-medium text-white"
              style={{ background: color }}
            >
              {it}
              <button
                type="button"
                aria-label={`Quitar ${it}`}
                onClick={() => setItems(items.filter((x) => x !== it))}
                className="p-0.5 rounded-full hover:bg-white/20"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          add(txt);
          setTxt("");
        }}
        className="flex gap-2"
      >
        <input
          value={txt}
          onChange={(e) => setTxt(e.target.value)}
          placeholder={isDim ? "Escribe un DIM del paciente" : "Escribe un SIM del paciente"}
          className="flex-1 min-w-0 px-3 py-2.5 rounded-xl border border-[#0a0a0c]/15 text-sm bg-[#f7f4ef]/50 focus:outline-none focus:border-[#8b3a2a]"
        />
        <button type="submit" className="px-3 rounded-xl text-white" style={{ background: color }} aria-label="Agregar">
          <Plus className="w-4 h-4" />
        </button>
      </form>

      <div className="flex flex-wrap gap-1.5">
        {sugeridos
          .filter((s) => !items.includes(s))
          .map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => add(s)}
              className="px-2.5 py-1 rounded-full border text-xs text-[#0a0a0c]/70 hover:text-[#0a0a0c] transition-colors"
              style={{ borderColor: color + "55" }}
            >
              + {s}
            </button>
          ))}
      </div>
    </div>
  );
}

/* ================================== Pizarra ================================== */
export function Pizarra() {
  const [view, setView] = useState<View>("frente");
  const [strokes, setStrokes] = useState<Record<View, Stroke[]>>({ frente: [], espalda: [] });
  const [color, setColor] = useState(COLORS[0].c);
  const [size, setSize] = useState(18);
  const [erase, setErase] = useState(false);
  const [dims, setDims] = useState<string[]>([]);
  const [sims, setSims] = useState<string[]>([]);
  const [nota, setNota] = useState("");
  const [paciente, setPaciente] = useState("");
  const [busy, setBusy] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drawing = useRef<Stroke | null>(null);

  const silueta = useMemo(
    () => ({
      frente: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(siluetaSVG("frente")),
      espalda: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(siluetaSVG("espalda")),
    }),
    []
  );

  // Redibuja el lienzo cuando cambian los trazos, la vista o el tamaño
  const redraw = () => {
    const cv = canvasRef.current;
    const wrap = wrapRef.current;
    if (!cv || !wrap) return;
    const dpr = window.devicePixelRatio || 1;
    const cssW = wrap.clientWidth;
    const cssH = (cssW * H) / W;
    if (cv.width !== Math.round(cssW * dpr)) {
      cv.width = Math.round(cssW * dpr);
      cv.height = Math.round(cssH * dpr);
      cv.style.width = cssW + "px";
      cv.style.height = cssH + "px";
    }
    const ctx = cv.getContext("2d")!;
    ctx.clearRect(0, 0, cv.width, cv.height);
    const scale = cv.width / W;
    for (const s of strokes[view]) drawStroke(ctx, s, scale);
    if (drawing.current) drawStroke(ctx, drawing.current, scale);
  };

  useEffect(() => {
    redraw();
  });
  useEffect(() => {
    const onR = () => redraw();
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  });

  const toPt = (e: RPointerEvent): Pt => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H };
  };

  const onDown = (e: RPointerEvent) => {
    e.preventDefault();
    (e.target as Element).setPointerCapture(e.pointerId);
    drawing.current = { color, size: erase ? size * 1.8 : size, erase, pts: [toPt(e)] };
    redraw();
  };
  const onMove = (e: RPointerEvent) => {
    if (!drawing.current) return;
    e.preventDefault();
    drawing.current.pts.push(toPt(e));
    redraw();
  };
  const onUp = () => {
    if (!drawing.current) return;
    const s = drawing.current;
    drawing.current = null;
    setStrokes((prev) => ({ ...prev, [view]: [...prev[view], s] }));
  };

  const undo = () => setStrokes((p) => ({ ...p, [view]: p[view].slice(0, -1) }));
  const clearView = () => setStrokes((p) => ({ ...p, [view]: [] }));
  const resetAll = () => {
    if (!confirmReset()) return;
    setStrokes({ frente: [], espalda: [] });
    setDims([]);
    setSims([]);
    setNota("");
    setPaciente("");
  };
  const confirmReset = () => {
    // Sin diálogos del navegador: se resetea con doble toque en menos de 2 s
    const now = Date.now();
    const last = Number((window as any).__mkReset || 0);
    (window as any).__mkReset = now;
    return now - last < 2000;
  };
  const [resetHint, setResetHint] = useState(false);

  /* -------------------- Componer la imagen para el paciente -------------------- */
  const buildImage = async (): Promise<Blob> => {
    const OW = 1080;
    const OH = 1620;
    const cv = document.createElement("canvas");
    cv.width = OW;
    cv.height = OH;
    const ctx = cv.getContext("2d")!;
    ctx.fillStyle = "#f7f4ef";
    ctx.fillRect(0, 0, OW, OH);

    // Encabezado
    ctx.fillStyle = "#8b3a2a";
    ctx.beginPath();
    ctx.arc(70, 78, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0a0a0c";
    ctx.font = "700 34px Georgia, serif";
    ctx.fillText("MyoKine", 92, 90);
    ctx.font = "400 24px system-ui, sans-serif";
    ctx.fillStyle = "rgba(10,10,12,0.55)";
    const fecha = new Date().toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
    const sub = (paciente.trim() ? paciente.trim() + " · " : "") + fecha;
    ctx.textAlign = "right";
    ctx.fillText(sub, OW - 60, 90);
    ctx.textAlign = "left";

    ctx.fillStyle = "#0a0a0c";
    ctx.font = "700 52px Georgia, serif";
    ctx.fillText("Lo que conversamos hoy", 60, 180);

    // Siluetas (frente y espalda) con sus trazos
    const views: View[] = ["frente", "espalda"];
    const sw = 420;
    const sh = (sw * H) / W;
    for (let i = 0; i < 2; i++) {
      const v = views[i];
      const ox = 60 + i * (sw + 60) + 30;
      const oy = 220;
      const img = await loadImage(silueta[v]);
      ctx.drawImage(img, ox, oy, sw, sh);
      const layer = document.createElement("canvas");
      layer.width = OW;
      layer.height = OH;
      const lctx = layer.getContext("2d")!;
      for (const s of strokes[v]) drawStroke(lctx, s, sw / W, ox, oy);
      ctx.drawImage(layer, 0, 0);
      ctx.fillStyle = "rgba(10,10,12,0.5)";
      ctx.font = "600 20px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(v === "frente" ? "FRENTE" : "ESPALDA", ox + sw / 2, oy + sh + 30);
      ctx.textAlign = "left";
    }

    // DIMs y SIMs
    let y = 220 + sh + 80;
    const colW = (OW - 120 - 40) / 2;
    const drawList = (title: string, items: string[], x: number, col: string) => {
      ctx.fillStyle = col;
      ctx.font = "700 30px Georgia, serif";
      ctx.fillText(title, x, y);
      ctx.font = "400 26px system-ui, sans-serif";
      ctx.fillStyle = "#0a0a0c";
      let yy = y + 44;
      const list = items.length ? items : ["—"];
      for (const it of list.slice(0, 7)) {
        const lines = wrapText(ctx, it, colW - 30);
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(x + 8, yy - 9, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#0a0a0c";
        for (const ln of lines) {
          ctx.fillText(ln, x + 26, yy);
          yy += 34;
        }
        yy += 6;
      }
      return yy;
    };
    const y1 = drawList("Lo que suma amenaza (DIMs)", dims, 60, "#c0392b");
    const y2 = drawList("Lo que suma seguridad (SIMs)", sims, 60 + colW + 40, "#2f7d5b");
    y = Math.max(y1, y2) + 20;

    // Protectometer
    const total = dims.length + sims.length;
    const v = total === 0 ? 0 : (dims.length - sims.length) / Math.max(total, 4);
    const bx = 60;
    const bw = OW - 120;
    const grad = ctx.createLinearGradient(bx, 0, bx + bw, 0);
    grad.addColorStop(0, "#2f7d5b");
    grad.addColorStop(0.5, "#e9e2d0");
    grad.addColorStop(1, "#c0392b");
    ctx.fillStyle = grad;
    ctx.beginPath();
    (ctx as any).roundRect ? (ctx as any).roundRect(bx, y, bw, 22, 11) : ctx.rect(bx, y, bw, 22);
    ctx.fill();
    const px = bx + bw * ((50 + v * 45) / 100);
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(px, y + 11, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0a0a0c";
    ctx.beginPath();
    ctx.arc(px, y + 11, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = "600 20px system-ui, sans-serif";
    ctx.fillStyle = "#2f7d5b";
    ctx.fillText("SEGURIDAD", bx, y + 62);
    ctx.fillStyle = "#c0392b";
    ctx.textAlign = "right";
    ctx.fillText("PROTECCIÓN / DOLOR", bx + bw, y + 62);
    ctx.textAlign = "left";
    y += 110;

    // Nota
    if (nota.trim()) {
      ctx.fillStyle = "#0a0a0c";
      ctx.font = "700 28px Georgia, serif";
      ctx.fillText("Lo que acordamos", 60, y);
      ctx.font = "400 26px system-ui, sans-serif";
      ctx.fillStyle = "rgba(10,10,12,0.8)";
      let yy = y + 40;
      for (const ln of wrapText(ctx, nota.trim(), OW - 120).slice(0, 4)) {
        ctx.fillText(ln, 60, yy);
        yy += 34;
      }
    }

    // Pie
    ctx.fillStyle = "rgba(10,10,12,0.45)";
    ctx.font = "400 20px system-ui, sans-serif";
    ctx.fillText("Lukas · Kinesiólogo · myokinecl.netlify.app", 60, OH - 50);

    return await new Promise<Blob>((res) => cv.toBlob((b) => res(b!), "image/png"));
  };

  const fileName = () =>
    "MyoKine-consulta-" + new Date().toISOString().slice(0, 10) + ".png";

  const share = async () => {
    setBusy(true);
    try {
      const blob = await buildImage();
      const file = new File([blob], fileName(), { type: "image/png" });
      const nav: any = navigator;
      if (nav.canShare && nav.canShare({ files: [file] })) {
        await nav.share({ files: [file], title: "Lo que conversamos hoy · MyoKine" });
      } else {
        download(blob);
      }
    } catch {
      /* el usuario canceló */
    } finally {
      setBusy(false);
    }
  };
  const download = (blob: Blob) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName();
    a.click();
  };
  const downloadClick = async () => {
    setBusy(true);
    try {
      download(await buildImage());
    } finally {
      setBusy(false);
    }
  };

  /* ---------------------------------- UI ---------------------------------- */
  return (
    <div className="space-y-6" id="pizarra">
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#8b3a2a]">Para usar en la consulta</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0a0a0c] tracking-tight">
          Pizarra de consulta
        </h1>
        <p className="text-sm sm:text-base text-[#0a0a0c]/70 max-w-2xl">
          Dibuja con tu paciente dónde le duele, anoten juntos lo que suma amenaza y lo que suma seguridad, y envíale la
          imagen al terminar. Nada se guarda ni sale de este dispositivo.
        </p>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-start">
        {/* -------- Lienzo -------- */}
        <div className="rounded-2xl border border-[#0a0a0c]/10 bg-white p-3 sm:p-4 space-y-3 lg:sticky lg:top-20">
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex rounded-xl bg-[#f7f4ef] p-1">
              {(["frente", "espalda"] as View[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-colors ${
                    view === v ? "bg-[#0a0a0c] text-white" : "text-[#0a0a0c]/60"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <button type="button" onClick={undo} className="p-2 rounded-lg hover:bg-[#0a0a0c]/5" aria-label="Deshacer">
                <Undo2 className="w-5 h-5" />
              </button>
              <button type="button" onClick={clearView} className="p-2 rounded-lg hover:bg-[#0a0a0c]/5" aria-label="Borrar dibujo de esta vista">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div ref={wrapRef} className="relative w-full mx-auto select-none" style={{ aspectRatio: `${W} / ${H}`, maxWidth: `calc(64vh * ${W / H})` }}>
            <img src={silueta[view]} alt="" className="absolute inset-0 w-full h-full pointer-events-none" draggable={false} />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              style={{ touchAction: "none", cursor: erase ? "cell" : "crosshair" }}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              onPointerLeave={onUp}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {COLORS.map((c) => (
              <button
                key={c.c}
                type="button"
                onClick={() => {
                  setColor(c.c);
                  setErase(false);
                }}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-semibold ${
                  !erase && color === c.c ? "border-[#0a0a0c] bg-[#0a0a0c]/5" : "border-[#0a0a0c]/15"
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full" style={{ background: c.c }} />
                {c.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setErase((e) => !e)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-semibold ${
                erase ? "border-[#0a0a0c] bg-[#0a0a0c]/5" : "border-[#0a0a0c]/15"
              }`}
            >
              {erase ? <Eraser className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5" />}
              {erase ? "Borrador" : "Lápiz"}
            </button>
            <label className="flex items-center gap-2 text-xs text-[#0a0a0c]/60 ml-auto">
              Grosor
              <input type="range" min={6} max={40} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-24 accent-[#8b3a2a]" />
            </label>
          </div>
        </div>

        {/* -------- Panel -------- */}
        <div className="space-y-4">
          <ListaDS tipo="DIMs" items={dims} setItems={setDims} sugeridos={DIMS_SUGERIDOS} />
          <ListaDS tipo="SIMs" items={sims} setItems={setSims} sugeridos={SIMS_SUGERIDOS} />
          <Protectometer dims={dims.length} sims={sims.length} />

          <div className="rounded-2xl border border-[#0a0a0c]/10 bg-white p-4 sm:p-5 space-y-3">
            <h3 className="font-serif text-lg font-semibold text-[#0a0a0c]">Lo que acordamos</h3>
            <textarea
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              rows={3}
              placeholder="Ej: caminar 15 minutos al día y volver a agacharme de a poco."
              className="w-full px-3 py-2.5 rounded-xl border border-[#0a0a0c]/15 text-sm bg-[#f7f4ef]/50 focus:outline-none focus:border-[#8b3a2a]"
            />
            <input
              value={paciente}
              onChange={(e) => setPaciente(e.target.value)}
              placeholder="Iniciales o nombre (opcional)"
              className="w-full px-3 py-2.5 rounded-xl border border-[#0a0a0c]/15 text-sm bg-[#f7f4ef]/50 focus:outline-none focus:border-[#8b3a2a]"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={share}
              disabled={busy}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#0a0a0c] hover:bg-[#8b3a2a] text-white text-sm font-semibold transition-colors disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              Enviar al paciente
            </button>
            <button
              type="button"
              onClick={downloadClick}
              disabled={busy}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-[#0a0a0c]/15 bg-white text-sm font-semibold hover:border-[#8b3a2a] disabled:opacity-60"
            >
              <Download className="w-4 h-4" />
              Descargar imagen
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              setResetHint(true);
              setTimeout(() => setResetHint(false), 2000);
              resetAll();
            }}
            className="w-full inline-flex items-center justify-center gap-2 text-xs text-[#0a0a0c]/50 hover:text-[#8b3a2a] py-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {resetHint ? "Toca otra vez para empezar con un paciente nuevo" : "Nuevo paciente (borrar todo)"}
          </button>
          <p className="text-[11px] text-[#0a0a0c]/45 leading-relaxed">
            DIMs y SIMs (Danger In Me / Safety In Me) y Protectometer: herramientas de educación en dolor propuestas por
            Moseley y Butler. Esta pizarra es una ayuda para explicar, no una evaluación clínica.
          </p>
        </div>
      </div>
    </div>
  );
}
