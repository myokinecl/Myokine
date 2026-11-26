import type { ReactNode } from "react";
import { C, FONT, PALETA_TORTA, altoListas, altoMeta, altoMotivo, base, filasEscucha, filasPlan, filasTiempo, lineas, type Item } from "./modelo";

// Dibujo de cada elemento en sus coordenadas base (sin escalar).

const T = (props: {
  key?: string | number;
  x: number;
  y: number;
  s?: number;
  w?: number;
  c?: string;
  a?: "start" | "middle" | "end";
  i?: boolean;
  children: ReactNode;
}) => (
  <text
    x={props.x}
    y={props.y}
    fontFamily={FONT}
    fontSize={props.s ?? 22}
    fontWeight={props.w ?? 500}
    fill={props.c ?? C.ink}
    textAnchor={props.a ?? "start"}
    fontStyle={props.i ? "italic" : "normal"}
  >
    {props.children}
  </text>
);

function Tarjeta({ w, h, titulo, children }: { w: number; h: number; titulo?: string; children: ReactNode }) {
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={20} fill="#fff" stroke={C.rule} strokeWidth={2} />
      {titulo &&
        lineas(titulo, Math.floor(w / 15)).slice(0, 2).map((l, i) => (
          <T key={i} x={28} y={50 + i * 34} s={28} w={700}>
            {l}
          </T>
        ))}
      {children}
    </g>
  );
}

const Nota = ({ x, y, children }: { x: number; y: number; children: ReactNode }) => (
  <T x={x} y={y} s={16} c={C.ink2} i>
    {children}
  </T>
);

// ---------- Cuerpo ----------
const CUERPO = `M300,60 C333,60 352,86 352,118 C352,152 333,178 300,178 C267,178 248,152 248,118 C248,86 267,60 300,60 Z
M272,180 L328,180 L332,206 C380,214 418,226 432,262 L470,420 C476,446 482,470 486,500 L492,560
C494,574 474,580 468,566 L452,508 C446,486 438,462 430,440 L404,330 L400,470 C400,510 404,540 410,580 L422,700
C428,760 430,800 428,850 C428,866 404,870 396,856 L372,712 C366,672 358,620 350,580 L300,560 L250,580
C242,620 234,672 228,712 L204,856 C196,870 172,866 172,850 C170,800 172,760 178,700 L190,580
C196,540 200,510 200,470 L196,330 L170,440 C162,462 154,486 148,508 L132,566 C126,580 106,574 108,560
L114,500 C118,470 124,446 130,420 L168,262 C182,226 220,214 268,206 Z`;
const FRENTE = `M276,300 C290,306 310,306 324,300 M262,560 C280,548 320,548 338,560`;
const ESPALDA = `M300,206 L300,520 M240,250 C262,268 282,274 300,276 C318,274 338,268 360,250 M262,540 C280,560 320,560 338,540`;

function Cuerpo({ it }: { it: Item }) {
  const { w, h } = base(it);
  return (
    <g>
      <svg x={0} y={0} width={w} height={h - 40} viewBox="100 50 400 830">
        <path d={CUERPO} fill={C.soft} stroke={C.ink} strokeOpacity={0.55} strokeWidth={3} strokeLinejoin="round" />
        <path d={it.d.vista === "espalda" ? ESPALDA : FRENTE} fill="none" stroke={C.ink} strokeOpacity={0.25} strokeWidth={2.5} strokeLinecap="round" />
      </svg>
      <T x={w / 2} y={h - 8} s={20} c={C.ink2} a="middle">
        {it.d.vista === "espalda" ? "Espalda" : "Frente"}
      </T>
    </g>
  );
}

// ---------- Músculo, tendón y hueso ----------
function Tendon({ it }: { it: Item }) {
  const { w, h } = base(it);
  const m = it.d.marca;
  const marcas: Record<string, [number, number]> = { tendon: [470, 125], union: [400, 125], musculo: [280, 125] };
  return (
    <Tarjeta w={w} h={h} titulo="Músculo, tendón y hueso">
      <rect x={30} y={95} width={70} height={60} rx={14} fill="#E8E2D6" stroke={C.ink} strokeOpacity={0.4} strokeWidth={2} />
      <rect x={540} y={95} width={70} height={60} rx={14} fill="#E8E2D6" stroke={C.ink} strokeOpacity={0.4} strokeWidth={2} />
      <path d="M100,118 L170,112 L170,138 L100,132 Z M470,112 L540,118 L540,132 L470,138 Z" fill="#F4EFE6" stroke={C.ink} strokeOpacity={0.45} strokeWidth={2} />
      <path d="M170,112 C230,78 410,78 470,112 L470,138 C410,172 230,172 170,138 Z" fill="#E7A8A1" stroke={C.ink} strokeOpacity={0.45} strokeWidth={2} />
      {[100, 112, 125, 138, 150].map((y, i) => (
        <path key={i} d={`M185,${125 + (y - 125) * 0.6} C260,${y} 380,${y} 455,${125 + (y - 125) * 0.6}`} fill="none" stroke="#B85C55" strokeOpacity={0.5} strokeWidth={1.5} />
      ))}
      <T x={65} y={190} s={20} a="middle" c={C.ink2}>Hueso</T>
      <T x={135} y={92} s={20} a="middle" c={C.ink2}>Tendón</T>
      <T x={320} y={190} s={20} a="middle" c={C.ink2}>Músculo</T>
      <T x={505} y={92} s={20} a="middle" c={C.ink2}>Tendón</T>
      <T x={575} y={190} s={20} a="middle" c={C.ink2}>Hueso</T>
      {marcas[m] && (
        <circle cx={marcas[m][0]} cy={marcas[m][1]} r={26} fill="none" stroke={C.rojo} strokeWidth={6} />
      )}
      <Nota x={28} y={232}>Esquema simplificado</Nota>
    </Tarjeta>
  );
}

// ---------- Rodilla ----------
function Rodilla({ it }: { it: Item }) {
  const { w, h } = base(it);
  const m = it.d.marca;
  const on = (k: string) => (m === k ? C.rojo : undefined);
  return (
    <Tarjeta w={w} h={h} titulo="Tu rodilla por dentro">
      {/* fémur */}
      <path d="M130,80 L230,80 L232,190 C262,200 270,232 252,250 C236,262 212,256 200,246 C192,256 168,256 160,246 C148,256 124,262 108,250 C90,232 98,200 128,190 Z" fill="#EFE9DE" stroke={C.ink} strokeOpacity={0.5} strokeWidth={2.5} />
      {/* tibia y peroné */}
      <path d="M100,300 C120,290 240,290 260,300 L262,318 C250,330 236,336 226,340 L222,440 L138,440 L134,340 C124,336 110,330 98,318 Z" fill="#EFE9DE" stroke={C.ink} strokeOpacity={0.5} strokeWidth={2.5} />
      <path d="M274,330 L298,330 L294,440 L278,440 Z" fill="#EFE9DE" stroke={C.ink} strokeOpacity={0.5} strokeWidth={2.5} />
      {/* meniscos */}
      <path d="M104,290 C120,278 162,278 172,288 L166,296 C150,290 124,290 110,298 Z" fill={on("menisco") ?? "#9DB8D9"} />
      <path d="M256,290 C240,278 198,278 188,288 L194,296 C210,290 236,290 250,298 Z" fill={on("menisco") ?? "#9DB8D9"} />
      {/* LCA y LCP */}
      <line x1={196} y1={232} x2={164} y2={300} stroke={on("lca") ?? C.go} strokeWidth={on("lca") ? 11 : 8} strokeLinecap="round" />
      <line x1={166} y1={232} x2={200} y2={302} stroke={C.ink2} strokeOpacity={0.6} strokeWidth={7} strokeLinecap="round" />
      {/* ligamento interno (lado izquierdo del dibujo) */}
      <line x1={100} y1={205} x2={104} y2={350} stroke={on("lcm") ?? "#B0905A"} strokeWidth={on("lcm") ? 10 : 7} strokeLinecap="round" />
      <T x={300} y={190} s={18} c={C.ink2}>Fémur</T>
      <T x={300} y={400} s={18} c={C.ink2}>Tibia</T>
      <T x={300} y={268} s={18} c={on("lca") ?? C.go} w={600}>LCA</T>
      <T x={300} y={296} s={18} c={on("menisco") ?? "#5B7FA8"} w={600}>Menisco</T>
      <T x={14} y={378} s={16} c={on("lcm") ?? "#8A6E3E"}>Lig. interno</T>
      <Nota x={28} y={h - 14}>Esquema simplificado, vista de frente</Nota>
    </Tarjeta>
  );
}

// ---------- Carga aguda vs crónica ----------
function Carga({ it }: { it: Item }) {
  const { w, h } = base(it);
  const sem: number[] = it.d.semanas.map((n: number) => Math.max(0, Number(n) || 0));
  const act = Math.max(0, Number(it.d.actual) || 0);
  const prom = sem.reduce((a, b) => a + b, 0) / Math.max(1, sem.length);
  const r = prom > 0 ? act / prom : 1;
  const max = Math.max(act, ...sem, 1);
  const col = r > 1.5 ? C.rojo : r > 1.3 ? C.naranjo : r < 0.8 ? C.azul : C.verde;
  const x0 = 40, x1 = w - 40, y0 = 320, hh = 190;
  const n = sem.length + 1;
  const bw = (x1 - x0) / n;
  const yProm = y0 - (prom / max) * hh;
  const pct = Math.round((r - 1) * 100);
  const frase = r > 1.3 ? `Subió ${pct}% sobre tu promedio` : r < 0.8 ? `Bajó ${-pct}% bajo tu promedio` : "Dentro de lo habitual";
  return (
    <Tarjeta w={w} h={h} titulo={it.d.titulo}>
      {[...sem, act].map((v, i) => {
        const bh = (v / max) * hh;
        const last = i === n - 1;
        return (
          <g key={i}>
            <rect x={x0 + i * bw + 12} y={y0 - bh} width={bw - 24} height={bh} rx={6} fill={last ? col : "#CBD0D6"} />
            <T x={x0 + i * bw + bw / 2} y={bh > 44 ? y0 - bh + 28 : y0 - bh - 8} s={18} a="middle" w={700} c={bh > 44 ? "#fff" : C.ink2}>
              {v}
            </T>
            <T x={x0 + i * bw + bw / 2} y={y0 + 26} s={18} a="middle" c={last ? C.ink : C.ink2} w={last ? 700 : 500}>
              {last ? "Esta sem." : `Sem ${i + 1}`}
            </T>
          </g>
        );
      })}
      <line x1={x0} x2={x1} y1={yProm} y2={yProm} stroke={C.ink} strokeDasharray="8 7" strokeWidth={2} />
      <line x1={28} x2={64} y1={84} y2={84} stroke={C.ink} strokeDasharray="8 7" strokeWidth={2} />
      <T x={74} y={90} s={18} c={C.ink}>Tu promedio de 4 semanas: {Math.round(prom)} {it.d.unidad}</T>
      <T x={28} y={y0 + 62} s={24} w={700} c={col}>{frase}</T>
      <Nota x={28} y={h - 14}>Referencial: la carga es una pieza importante, no la única causa.</Nota>
    </Tarjeta>
  );
}

// ---------- Capacidad vs carga ----------
function Capacidad({ it }: { it: Item }) {
  const { w, h } = base(it);
  const plan = it.d.modo === "plan";
  return (
    <Tarjeta w={w} h={h} titulo={plan ? "Subir de a poco" : "Carga vs lo que tu cuerpo tolera"}>
      <line x1={40} y1={300} x2={w - 30} y2={300} stroke={C.rule} strokeWidth={2} />
      <T x={w - 30} y={326} s={16} a="end" c={C.ink2}>tiempo</T>
      {plan ? (
        <>
          <path d="M40,230 C200,210 360,170 560,110" fill="none" stroke={C.verde} strokeWidth={6} strokeLinecap="round" />
          <path d="M40,260 C200,240 360,200 560,140" fill="none" stroke={C.ink} strokeWidth={4} strokeDasharray="10 8" strokeLinecap="round" />
          <T x={28} y={358} s={20} c={C.ink}>Cada semana un poco más: tu cuerpo se adapta y tolera más.</T>
        </>
      ) : (
        <>
          <path d="M40,200 C200,195 360,185 560,175" fill="none" stroke={C.verde} strokeWidth={6} strokeLinecap="round" />
          <path d="M40,250 C140,245 260,245 340,240 C380,238 390,150 420,120 C440,105 450,180 470,230 L560,240" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={420} cy={122} r={16} fill="none" stroke={C.rojo} strokeWidth={5} />
          <T x={444} y={108} s={18} w={700} c={C.rojo}>Aquí aparece</T>
          <T x={444} y={130} s={18} w={700} c={C.rojo}>el dolor o la lesión</T>
          <T x={28} y={358} s={20} c={C.ink}>Subió más rápido de lo que tu cuerpo alcanzó a adaptarse.</T>
        </>
      )}
      <rect x={28} y={h - 34} width={22} height={6} fill={C.verde} />
      <T x={58} y={h - 26} s={16} c={C.ink2}>Lo que tu cuerpo tolera</T>
      <rect x={290} y={h - 34} width={22} height={4} fill={C.ink} />
      <T x={320} y={h - 26} s={16} c={C.ink2}>Lo que le pides</T>
    </Tarjeta>
  );
}

// ---------- Semáforo del dolor ----------
function Semaforo({ it }: { it: Item }) {
  const { w, h } = base(it);
  const x0 = 30, x1 = w - 30, u = (x1 - x0) / 10;
  const v = Number(it.d.valor);
  const seg = [
    { a: 0, b: 2, c: C.verde, t: "Seguro" },
    { a: 2, b: 5, c: C.amarillo, t: "Aceptable si mañana vuelve a lo habitual" },
    { a: 5, b: 10, c: C.rojo, t: "Bajemos la carga" },
  ];
  return (
    <Tarjeta w={w} h={h} titulo="¿Cuánto dolor es aceptable al ejercitar?">
      {seg.map((s, i) => (
        <rect key={i} x={x0 + s.a * u + 2} y={110} width={(s.b - s.a) * u - 4} height={46} rx={8} fill={s.c} />
      ))}
      {Array.from({ length: 11 }, (_, i) => (
        <T key={i} x={x0 + i * u} y={184} s={18} a="middle" c={C.ink2}>{i}</T>
      ))}
      {v >= 0 && <path d={`M${x0 + v * u - 14},92 L${x0 + v * u + 14},92 L${x0 + v * u},112 Z`} fill={C.ink} />}
      <T x={x0} y={226} s={20} w={700} c={C.verde}>0–2  {seg[0].t}</T>
      <T x={x0} y={256} s={20} w={700} c="#B8860B">3–5  {seg[1].t}</T>
      <T x={x0} y={286} s={20} w={700} c={C.rojo}>Más de 5  {seg[2].t}</T>
      <Nota x={28} y={h - 12}>Basado en el modelo de monitoreo del dolor (Silbernagel)</Nota>
    </Tarjeta>
  );
}

// ---------- Línea de tiempo ----------
function Tiempo({ it }: { it: Item }) {
  const { w, h } = base(it);
  const fases: { n: string; t: string }[] = it.d.fases;
  return (
    <Tarjeta w={w} h={h} titulo={it.d.titulo}>
      {(() => {
        const altos = filasTiempo(fases);
        const tops = altos.map((_, i) => 100 + altos.slice(0, i).reduce((x, y) => x + y, 0));
        const cy = (i: number) => tops[i] + altos[i] / 2;
        return (
          <>
            <line x1={52} y1={cy(0)} x2={52} y2={cy(fases.length - 1)} stroke={C.rule} strokeWidth={4} />
            {fases.map((f, i) => {
              const hoy = i === Number(it.d.hoy);
              const ls = lineas(f.n, 34).slice(0, 3);
              const y0 = tops[i] + (altos[i] - ls.length * 26) / 2 + 20;
              return (
                <g key={i}>
                  {hoy && <rect x={80} y={tops[i] + 6} width={w - 104} height={altos[i] - 12} rx={10} fill={C.hl} />}
                  <circle cx={52} cy={cy(i)} r={16} fill={hoy ? C.ink : "#fff"} stroke={C.ink} strokeWidth={3} />
                  <T x={52} y={cy(i) + 6} s={16} a="middle" w={700} c={hoy ? "#fff" : C.ink}>{i + 1}</T>
                  {ls.map((l, k) => (
                    <T key={k} x={94} y={y0 + k * 26} s={21} w={hoy ? 700 : 500}>{l}</T>
                  ))}
                  <T x={w - 34} y={cy(i) + 7} s={18} a="end" c={C.ink2}>{f.t}</T>
                </g>
              );
            })}
          </>
        );
      })()}
      <Nota x={28} y={h - 16}>Los plazos son referenciales: avanzamos por cómo respondes, no solo por semanas.</Nota>
    </Tarjeta>
  );
}

// ---------- Fuerza primero, tamaño después ----------
function Fuerza({ it }: { it: Item }) {
  const { w, h } = base(it);
  const x0 = 50, x1 = w - 30, y0 = 300, hh = 180;
  const X = (s: number) => x0 + (s / 24) * (x1 - x0);
  const fuerza = Array.from({ length: 25 }, (_, s) => [X(s), y0 - hh * (1 - Math.exp(-s / 6)) * 0.95]);
  const tam = Array.from({ length: 25 }, (_, s) => [X(s), y0 - hh * 0.75 / (1 + Math.exp(-(s - 13) / 3.2))]);
  const p = (pts: number[][]) => "M" + pts.map((q) => q.map((v) => v.toFixed(1)).join(",")).join(" L");
  return (
    <Tarjeta w={w} h={h} titulo="Qué cambia primero al entrenar">
      <rect x={X(8)} y={y0 - hh - 10} width={X(12) - X(8)} height={hh + 10} fill={C.hl} opacity={0.55} />
      <line x1={x0} y1={y0} x2={x1} y2={y0} stroke={C.rule} strokeWidth={2} />
      {[0, 4, 8, 12, 16, 20, 24].map((s) => (
        <T key={s} x={X(s)} y={y0 + 24} s={16} a="middle" c={C.ink2}>{s}</T>
      ))}
      <T x={x1} y={y0 + 46} s={16} a="end" c={C.ink2}>semanas</T>
      <path d={p(fuerza)} fill="none" stroke={C.go} strokeWidth={6} strokeLinecap="round" />
      <path d={p(tam)} fill="none" stroke={C.azul} strokeWidth={6} strokeLinecap="round" />
      <T x={X(2.5)} y={y0 - hh * 0.62} s={20} w={700} c={C.go}>Fuerza</T>
      <T x={X(17)} y={y0 - hh * 0.38} s={20} w={700} c={C.azul}>Tamaño del músculo</T>
      <T x={28} y={y0 + 82} s={19} c={C.ink}>Al principio gana fuerza tu sistema nervioso;</T>
      <T x={28} y={y0 + 106} s={19} c={C.ink}>el cambio de tamaño se nota más desde la semana 8–12.</T>
    </Tarjeta>
  );
}

// ---------- Tu semana ----------
function Semana({ it }: { it: Item }) {
  const { w, h } = base(it);
  const dias = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const cw = (w - 56) / 7;
  return (
    <Tarjeta w={w} h={h} titulo={it.d.titulo}>
      {dias.map((d, i) => {
        const txt: string = it.d.dias[i] || "";
        return (
          <g key={i}>
            <rect x={28 + i * cw + 3} y={80} width={cw - 6} height={140} rx={12} fill={txt ? "#E3F0EA" : C.soft} />
            <T x={28 + i * cw + cw / 2} y={110} s={18} a="middle" w={700}>{d}</T>
            {lineas(txt, 9).slice(0, 5).map((l, k) => (
              <T key={k} x={28 + i * cw + cw / 2} y={140 + k * 19} s={15} a="middle" c={C.ink}>{l}</T>
            ))}
          </g>
        );
      })}
    </Tarjeta>
  );
}

// ---------- Escala 0–10 ----------
function Escala({ it }: { it: Item }) {
  const { w, h } = base(it);
  const x0 = 40, x1 = w - 40, u = (x1 - x0) / 10;
  const v = Math.max(0, Math.min(10, Number(it.d.valor) || 0));
  const gid = "g" + it.id;
  return (
    <Tarjeta w={w} h={h}>
      <defs>
        <linearGradient id={gid} x1="0" x2="1">
          <stop offset="0" stopColor={C.verde} />
          <stop offset="0.5" stopColor={C.amarillo} />
          <stop offset="1" stopColor={C.rojo} />
        </linearGradient>
      </defs>
      <T x={28} y={48} s={26} w={700}>{it.d.titulo}</T>
      <T x={w - 28} y={52} s={40} w={800} a="end">{v}</T>
      <rect x={x0} y={84} width={x1 - x0} height={22} rx={11} fill={`url(#${gid})`} />
      <circle cx={x0 + v * u} cy={95} r={18} fill="#fff" stroke={C.ink} strokeWidth={5} />
      {Array.from({ length: 11 }, (_, i) => (
        <T key={i} x={x0 + i * u} y={140} s={16} a="middle" c={C.ink2}>{i}</T>
      ))}
      <T x={x0} y={170} s={16} c={C.ink2}>{it.d.izq}</T>
      <T x={x1} y={170} s={16} c={C.ink2} a="end">{it.d.der}</T>
    </Tarjeta>
  );
}

// ---------- DIMs y SIMs ----------
function Protecto({ it }: { it: Item }) {
  const { w, h } = base(it);
  const dims: string[] = it.d.dims.slice(0, 5), sims: string[] = it.d.sims.slice(0, 5);
  const tot = dims.length + sims.length;
  const pos = tot === 0 ? 0.5 : sims.length / tot;
  const col = (w - 84) / 2;
  return (
    <Tarjeta w={w} h={h} titulo="Lo que suma peligro y lo que suma seguridad">
      <T x={28} y={110} s={22} w={700} c={C.rojo}>Peligro (DIMs)</T>
      <T x={56 + col} y={110} s={22} w={700} c={C.verde}>Seguridad (SIMs)</T>
      {[dims, sims].map((lista, c) => {
        let y = 148;
        return lista.map((d, i) => {
          const ls = lineas(d, 24).slice(0, 3);
          const g = (
            <g key={c + "-" + i}>
              {ls.map((l, k) => (
                <T key={k} x={c === 0 ? 28 : 56 + col} y={y + k * 26} s={19}>{(k === 0 ? (c === 0 ? "– " : "+ ") : "   ") + l}</T>
              ))}
            </g>
          );
          y += ls.length * 26 + 8;
          return g;
        });
      })}
      {(() => {
        const by = 132 + altoListas(dims, sims) + 30;
        return (
          <>
            <rect x={28} y={by} width={w - 56} height={18} rx={9} fill={C.rule} />
            <rect x={28} y={by} width={(w - 56) / 2} height={18} rx={9} fill={C.rojo} opacity={0.25} />
            <rect x={28 + (w - 56) / 2} y={by} width={(w - 56) / 2} height={18} rx={9} fill={C.verde} opacity={0.25} />
            <circle cx={28 + pos * (w - 56)} cy={by + 9} r={17} fill="#fff" stroke={C.ink} strokeWidth={5} />
            <T x={28} y={by + 48} s={16} c={C.ink2}>Más protección (más dolor)</T>
            <T x={w - 28} y={by + 48} s={16} c={C.ink2} a="end">Menos protección</T>
          </>
        );
      })()}
      <Nota x={28} y={h - 22}>Protectometer, de Moseley y Butler</Nota>
    </Tarjeta>
  );
}

// ---------- Barras ----------
function Barras({ it }: { it: Item }) {
  const { w, h } = base(it);
  const vals: number[] = it.d.valores.map((v: number) => Math.max(0, Number(v) || 0));
  const meta = it.d.meta === null || it.d.meta === "" ? null : Number(it.d.meta);
  const max = Math.max(...vals, meta ?? 0, 1);
  const x0 = 40, x1 = w - 40, y0 = 330, hh = 200;
  const bw = (x1 - x0) / Math.max(1, vals.length);
  return (
    <Tarjeta w={w} h={h} titulo={it.d.titulo}>
      {vals.map((v, i) => {
        const bh = (v / max) * hh;
        const dest = i === Number(it.d.destacar);
        const bajo = meta !== null && v < meta;
        return (
          <g key={i}>
            <rect x={x0 + i * bw + bw * 0.15} y={y0 - bh} width={bw * 0.7} height={bh} rx={6} fill={dest ? C.go : bajo ? "#E7B8B3" : "#CBD0D6"} />
            <T x={x0 + i * bw + bw / 2} y={y0 - bh - 8} s={17} a="middle" c={C.ink2}>{v}</T>
            <T x={x0 + i * bw + bw / 2} y={y0 + 26} s={18} a="middle">{it.d.etiquetas[i] ?? ""}</T>
          </g>
        );
      })}
      {meta !== null && (
        <>
          <line x1={x0} x2={x1} y1={y0 - (meta / max) * hh} y2={y0 - (meta / max) * hh} stroke={C.go} strokeWidth={3} strokeDasharray="10 7" />
          <T x={x1} y={y0 - (meta / max) * hh - 10} s={17} a="end" w={700} c={C.go}>{it.d.metaTexto}</T>
        </>
      )}
    </Tarjeta>
  );
}

// ---------- Torta ----------
function Torta({ it }: { it: Item }) {
  const { w, h } = base(it);
  const partes: { n: string; v: number }[] = it.d.partes;
  const tot = partes.reduce((a, p) => a + Math.max(0, Number(p.v) || 0), 0) || 1;
  const cx = 140, cy = 220, r = 112, ri = 58;
  let a0 = -Math.PI / 2;
  const arcos = partes.map((p, i) => {
    const frac = Math.max(0, Number(p.v) || 0) / tot;
    const a1 = a0 + frac * Math.PI * 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const P = (a: number, rr: number) => `${cx + rr * Math.cos(a)},${cy + rr * Math.sin(a)}`;
    const d =
      frac >= 0.999
        ? `M${cx - r},${cy} A${r},${r} 0 1 1 ${cx + r},${cy} A${r},${r} 0 1 1 ${cx - r},${cy} M${cx - ri},${cy} A${ri},${ri} 0 1 0 ${cx + ri},${cy} A${ri},${ri} 0 1 0 ${cx - ri},${cy}`
        : `M${P(a0, r)} A${r},${r} 0 ${large} 1 ${P(a1, r)} L${P(a1, ri)} A${ri},${ri} 0 ${large} 0 ${P(a0, ri)} Z`;
    a0 = a1;
    return <path key={i} d={d} fill={PALETA_TORTA[i % PALETA_TORTA.length]} stroke="#fff" strokeWidth={3} fillRule="evenodd" />;
  });
  return (
    <Tarjeta w={w} h={h} titulo={it.d.titulo}>
      {arcos}
      {partes.map((p, i) => (
        <g key={i}>
          <rect x={282} y={112 + i * 54} width={22} height={22} rx={5} fill={PALETA_TORTA[i % PALETA_TORTA.length]} />
          {lineas(p.n, 22).slice(0, 2).map((l, k) => (
            <T key={k} x={314} y={130 + i * 54 + k * 21} s={17}>{l}</T>
          ))}
          <T x={w - 28} y={130 + i * 54} s={19} w={700} a="end">{Math.round((Math.max(0, Number(p.v) || 0) / tot) * 100)}%</T>
        </g>
      ))}
    </Tarjeta>
  );
}

// ---------- Proteína ----------
function Proteina({ it }: { it: Item }) {
  const { w, h } = base(it);
  const peso = Number(it.d.peso) || 0, gkg = Number(it.d.gkg) || 0, com = Math.max(1, Number(it.d.comidas) || 1);
  const tot = Math.round(peso * gkg);
  return (
    <Tarjeta w={w} h={h} titulo="Proteína al día">
      <T x={28} y={150} s={72} w={800}>{tot} g</T>
      <T x={28} y={190} s={20} c={C.ink2}>{peso} kg × {String(gkg).replace(".", ",")} g por kilo</T>
      <rect x={28} y={214} width={w - 56} height={48} rx={10} fill={C.hl} />
      <T x={44} y={246} s={21} w={700}>≈ {com} comidas de {Math.round(tot / com)} g</T>
      <Nota x={28} y={h - 18}>Rango útil para ganar o mantener músculo: 1,2–2,2 g/kg al día</Nota>
    </Tarjeta>
  );
}

// ---------- Texto ----------
function NotaEl({ it }: { it: Item }) {
  const { w, h } = base(it);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={8} fill={it.d.color || C.hl} />
      {lineas(it.d.texto, 22).map((l, i) => (
        <T key={i} x={28} y={60 + i * 44} s={32} w={600}>{l}</T>
      ))}
    </g>
  );
}
function Titulo({ it }: { it: Item }) {
  return (
    <g>
      {lineas(it.d.texto, 28).map((l, i) => (
        <T key={i} x={0} y={62 + i * 72} s={64} w={800}>{l}</T>
      ))}
    </g>
  );
}
function Plan({ it }: { it: Item }) {
  const { w, h } = base(it);
  return (
    <Tarjeta w={w} h={h} titulo={it.d.titulo}>
      {(() => {
        const altos = filasPlan(it.d.items);
        return it.d.items.map((t: string, i: number) => {
          const top = 80 + altos.slice(0, i).reduce((x, y) => x + y, 0);
          return (
            <g key={i}>
              {it.d.vineta === "punto" ? (
                <circle cx={43} cy={top + 24} r={9} fill={C.go} />
              ) : (
                <rect x={28} y={top + 8} width={30} height={30} rx={7} fill="#fff" stroke={C.go} strokeWidth={3} />
              )}
              {lineas(t, 36).slice(0, 3).map((l, k) => (
                <T key={k} x={76} y={top + 32 + k * 28} s={23}>{l}</T>
              ))}
            </g>
          );
        });
      })()}
    </Tarjeta>
  );
}
function Flecha({ it }: { it: Item }) {
  const { w, h } = base(it);
  return (
    <g transform={`rotate(${it.d.r || 0} ${w / 2} ${h / 2})`}>
      <rect x={0} y={0} width={w} height={h} fill="transparent" />
      <path d={`M14,${h / 2} L${w - 50},${h / 2}`} stroke={it.d.color || C.ink} strokeWidth={10} strokeLinecap="round" />
      <path d={`M${w - 70},${h / 2 - 30} L${w - 14},${h / 2} L${w - 70},${h / 2 + 30}`} fill="none" stroke={it.d.color || C.ink} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

// ---------- Tú, en tu contexto ----------
function Contexto({ it }: { it: Item }) {
  const { w, h } = base(it);
  const fac: string[] = it.d.factores.slice(0, 8);
  const vis: number = it.d.visibles ?? fac.length;
  const cx = w / 2, cy = 440;
  const der = Math.ceil(fac.length / 2), izq = fac.length - der;
  const ang = (n: number, k: number) => (n === 1 ? 0 : -62 + (124 * k) / (n - 1));
  const pos = fac.map((_, i) => {
    const a = i < der ? ang(der, i) : 180 - ang(izq, i - der);
    const r = (a * Math.PI) / 180;
    return [cx + 270 * Math.cos(r), cy + 300 * Math.sin(r)];
  });
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={20} fill="#fff" stroke={C.rule} strokeWidth={2} />
      <T x={28} y={52} s={30} w={700}>{it.d.titulo}</T>
      {pos.map(([x, y], i) => i < vis && (
        <line key={"l" + i} x1={x} y1={y} x2={cx + (x - cx) * 0.42} y2={cy + (y - cy) * 0.42} stroke={C.ink2} strokeOpacity={0.4} strokeWidth={2} strokeDasharray="6 6" />
      ))}
      <svg x={cx - 115} y={cy - 238} width={230} height={477} viewBox="100 50 400 830">
        <path d={CUERPO} fill={C.soft} stroke={C.ink} strokeOpacity={0.55} strokeWidth={3} strokeLinejoin="round" />
        <path d={FRENTE} fill="none" stroke={C.ink} strokeOpacity={0.25} strokeWidth={2.5} strokeLinecap="round" />
      </svg>
      {fac.map((f, i) => {
        if (i >= vis) return null;
        const ls = lineas(f, 17).slice(0, 3);
        const bw = Math.min(230, 36 + Math.max(...ls.map((l) => l.length)) * 11);
        const bh = 28 + ls.length * 26;
        const x = Math.max(8, Math.min(w - 8 - bw, pos[i][0] - bw / 2));
        const y = pos[i][1] - bh / 2;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={bh} rx={bh / 2} fill="#E3F0EA" stroke={C.go} strokeOpacity={0.5} strokeWidth={2} />
            {ls.map((l, k) => (
              <T key={k} x={x + bw / 2} y={y + 34 + k * 26} s={20} w={600} a="middle">{l}</T>
            ))}
          </g>
        );
      })}
      {vis >= fac.length && <T x={w / 2} y={h - 28} s={24} w={700} a="middle">{it.d.frase}</T>}
    </g>
  );
}

// ---------- De arriba abajo y de abajo arriba ----------
function ArribaAbajo({ it }: { it: Item }) {
  const { w, h } = base(it);
  const cx = w / 2;
  return (
    <Tarjeta w={w} h={h} titulo="El dolor se arma en dos direcciones">
      <ellipse cx={cx} cy={140} rx={84} ry={52} fill="#F3DCE2" stroke={C.ink} strokeOpacity={0.4} strokeWidth={2} />
      <path d={`M${cx - 50},128 q20,-24 40,0 q20,24 40,0 M${cx - 56},152 q22,18 46,0 q24,-18 50,4 M${cx},92 L${cx},188`} fill="none" stroke={C.ink} strokeOpacity={0.3} strokeWidth={2} />
      <T x={cx} y={214} s={20} w={700} a="middle">Cerebro</T>
      <circle cx={cx} cy={448} r={50} fill={C.soft} stroke={C.ink} strokeOpacity={0.4} strokeWidth={2} />
      <T x={cx} y={455} s={20} w={700} a="middle">{it.d.zona}</T>
      <path d={`M${cx - 34},236 L${cx - 34},384`} stroke={C.azul} strokeWidth={8} strokeLinecap="round" />
      <path d={`M${cx - 50},366 L${cx - 34},390 L${cx - 18},366`} fill="none" stroke={C.azul} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M${cx + 34},388 L${cx + 34},240`} stroke={C.rojo} strokeWidth={8} strokeLinecap="round" />
      <path d={`M${cx + 18},258 L${cx + 34},234 L${cx + 50},258`} fill="none" stroke={C.rojo} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
      <T x={cx - 60} y={258} s={19} w={700} c={C.azul} a="end">De arriba hacia abajo</T>
      <T x={cx - 60} y={282} s={17} c={C.azul} a="end" i>Top-down (descendente)</T>
      <T x={cx + 60} y={258} s={19} w={700} c={C.rojo}>De abajo hacia arriba</T>
      <T x={cx + 60} y={282} s={17} c={C.rojo} i>Bottom-up (ascendente)</T>
      {[it.d.arriba, it.d.abajo].map((lista: string[], c: number) => {
        let y = 318;
        return lista.slice(0, 5).map((t, i) => {
          const ls = lineas(t, 22).slice(0, 3);
          const g = (
            <g key={c + "-" + i}>
              {ls.map((l, k) => (
                <T key={k} x={c === 0 ? cx - 60 : cx + 60} y={y + k * 24} s={18} a={c === 0 ? "end" : "start"}>{l}</T>
              ))}
            </g>
          );
          y += ls.length * 24 + 6;
          return g;
        });
      })}
      <T x={28} y={h - 24} s={20} w={700} c={C.go}>Podemos trabajar en ambas direcciones.</T>
    </Tarjeta>
  );
}

// ---------- La mejora no es lineal ----------
function Camino({ it }: { it: Item }) {
  const { w, h } = base(it);
  const pts = [[50, 290], [100, 250], [140, 272], [190, 220], [230, 240], [280, 205], [320, 250], [370, 180], [410, 200], [460, 150], [500, 168], [550, 120]];
  return (
    <Tarjeta w={w} h={h} titulo="La mejora no es una línea recta">
      <line x1={40} y1={310} x2={w - 30} y2={310} stroke={C.rule} strokeWidth={2} />
      <T x={w - 30} y={334} s={16} a="end" c={C.ink2}>tiempo</T>
      <path d="M50,290 L550,120" stroke={C.ink2} strokeWidth={3} strokeDasharray="10 8" />
      <path d={"M" + pts.map((p) => p.join(",")).join(" L")} fill="none" stroke={C.go} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      <T x={60} y={120} s={18} c={C.ink2}>Lo que esperamos</T>
      <path d="M200,126 L260,126" stroke={C.ink2} strokeWidth={3} strokeDasharray="10 8" />
      <T x={60} y={150} s={18} w={700} c={C.go}>Lo que pasa de verdad</T>
      <path d="M262,144 L322,144" stroke={C.go} strokeWidth={6} strokeLinecap="round" />
      <T x={28} y={h - 18} s={19}>Habrá días mejores y peores; la tendencia es a mejorar.</T>
    </Tarjeta>
  );
}

// ---------- Dato de la evidencia ----------
function Dato({ it }: { it: Item }) {
  const { w, h } = base(it);
  return (
    <Tarjeta w={w} h={h}>
      <T x={28} y={110} s={96} w={800} c={C.go}>{it.d.numero}</T>
      {lineas(it.d.texto, 44).slice(0, 4).map((l, i) => (
        <T key={i} x={28} y={160 + i * 30} s={21}>{l}</T>
      ))}
      <Nota x={28} y={h - 18}>{it.d.fuente}</Nota>
    </Tarjeta>
  );
}

// ---------- Lo que me contaste ----------
function Escucha({ it }: { it: Item }) {
  const { w, h } = base(it);
  const altos = filasEscucha(it.d.frases);
  const mot = String(it.d.motivo || "").trim();
  const om = altoMotivo(mot);
  const finFrases = 96 + om + altos.reduce((a, b) => a + b, 0);
  const meta = String(it.d.meta || "").trim();
  return (
    <Tarjeta w={w} h={h} titulo={it.d.titulo}>
      {mot &&
        lineas(mot, 46).slice(0, 4).map((l, k) => (
          <T key={"m" + k} x={28} y={96 + k * 28} s={21} c={C.ink2}>{l}</T>
        ))}
      {it.d.frases.map((t: string, i: number) => {
        const top = 92 + om + altos.slice(0, i).reduce((x, y) => x + y, 0);
        const ls = lineas(it.d.comillas === false ? t : `“${t}”`, 40).slice(0, 4);
        return (
          <g key={i}>
            <rect x={28} y={top + 6} width={6} height={ls.length * 32 + 4} rx={3} fill={C.go} />
            {ls.map((l, k) => (
              <T key={k} x={52} y={top + 32 + k * 32} s={25} i={it.d.comillas !== false}>{l}</T>
            ))}
          </g>
        );
      })}
      {meta && (
        <g>
          <rect x={20} y={finFrases + 6} width={w - 40} height={altoMeta(meta) - 16} rx={14} fill={C.hl} />
          <T x={44} y={finFrases + 46} s={19} w={700} c={C.ink2}>Lo que más te importa</T>
          {lineas(meta, 36).slice(0, 4).map((l, k) => (
            <T key={k} x={44} y={finFrases + 84 + k * 34} s={28} w={700}>{l}</T>
          ))}
        </g>
      )}
    </Tarjeta>
  );
}

export function Elemento({ it }: { it: Item }) {
  switch (it.kind) {
    case "cuerpo": return <Cuerpo it={it} />;
    case "tendon": return <Tendon it={it} />;
    case "rodilla": return <Rodilla it={it} />;
    case "carga": return <Carga it={it} />;
    case "capacidad": return <Capacidad it={it} />;
    case "semaforo": return <Semaforo it={it} />;
    case "tiempo": return <Tiempo it={it} />;
    case "fuerza": return <Fuerza it={it} />;
    case "semana": return <Semana it={it} />;
    case "escala": return <Escala it={it} />;
    case "protecto": return <Protecto it={it} />;
    case "barras": return <Barras it={it} />;
    case "torta": return <Torta it={it} />;
    case "proteina": return <Proteina it={it} />;
    case "nota": return <NotaEl it={it} />;
    case "titulo": return <Titulo it={it} />;
    case "plan": return <Plan it={it} />;
    case "flecha": return <Flecha it={it} />;
    case "contexto": return <Contexto it={it} />;
    case "arribaabajo": return <ArribaAbajo it={it} />;
    case "camino": return <Camino it={it} />;
    case "dato": return <Dato it={it} />;
    case "escucha": return <Escucha it={it} />;
  }
}
