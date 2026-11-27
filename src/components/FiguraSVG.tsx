import React from "react";
import { TAMANOS, type Figura, type FormatoFigura } from "../figuras/tipos";

const C = {
  tinta: "#1D2433",
  tinta2: "#5A6170",
  linea: "#E3E5E8",
  suave: "#F6F7F8",
  verde: "#0F5C4D",
  verde2: "#BFD8D1",
  marca: "#F5E663",
};
const FONT = "'Bricolage Grotesque', system-ui, sans-serif";

/** Corta un texto en líneas según un ancho aproximado. */
function cortar(texto: string, ancho: number, fs: number, peso = 400): string[] {
  const max = Math.max(4, Math.floor(ancho / (fs * (peso >= 600 ? 0.56 : 0.52))));
  const out: string[] = [];
  for (const parrafo of texto.split("\n")) {
    let l = "";
    for (const w of parrafo.split(/\s+/)) {
      if (!w) continue;
      if ((l + " " + w).trim().length > max && l) {
        out.push(l);
        l = w;
      } else l = (l + " " + w).trim();
    }
    out.push(l);
  }
  return out;
}

type Caja = { x: number; y: number; w: number; h: number };

function Texto(p: {
  key?: React.Key;
  x: number;
  y: number;
  lineas: string[];
  fs: number;
  peso?: number;
  color?: string;
  lh?: number;
  anchor?: "start" | "middle" | "end";
}) {
  const lh = p.lh ?? 1.22;
  return (
    <text
      x={p.x}
      y={p.y}
      fontFamily={FONT}
      fontSize={p.fs}
      fontWeight={p.peso ?? 400}
      fill={p.color ?? C.tinta}
      textAnchor={p.anchor ?? "start"}
    >
      {p.lineas.map((l, i) => (
        <tspan key={i} x={p.x} dy={i === 0 ? 0 : p.fs * lh}>
          {l}
        </tspan>
      ))}
    </text>
  );
}

/** Busca el mayor tamaño de letra con el que un título y un texto caben en una caja. */
function ajustar(titulo: string, texto: string, w: number, h: number, fsMax: number, fsMin: number) {
  for (let fs = fsMax; fs >= fsMin; fs -= 1) {
    const lt = titulo ? cortar(titulo, w, fs * 1.12, 700) : [];
    const lx = texto ? cortar(texto, w, fs) : [];
    const alto = lt.length * fs * 1.12 * 1.18 + (lt.length && lx.length ? fs * 0.5 : 0) + lx.length * fs * 1.3;
    if (alto <= h) return { fs, lt, lx, alto };
  }
  const fs = fsMin;
  return { fs, lt: cortar(titulo, w, fs * 1.12, 700), lx: cortar(texto, w, fs), alto: h };
}

function Tarjeta(p: { key?: React.Key; caja: Caja; titulo: string; texto: string; numero?: number; fsMax: number; tono?: "verde" | "gris" }) {
  const { x, y, w, h } = p.caja;
  const pad = Math.min(40, w * 0.07, h * 0.16);
  const num = p.numero !== undefined;
  const r = num ? Math.max(20, Math.min(30, h * 0.14)) : 0;
  const arriba = num && w < 560;
  const offX = num && !arriba ? r * 2 + 22 : 0;
  const offY = arriba ? r * 2 + 20 : 0;
  const a = ajustar(p.titulo, p.texto, w - pad * 2 - offX, h - pad * 2 - offY - (p.tono === "verde" ? 8 : 0), p.fsMax, 16);
  const fsT = a.fs * 1.12;
  const tx = x + pad + offX;
  // Centra el bloque de texto en la tarjeta cuando sobra espacio
  const libre = Math.max(0, h - pad * 2 - offY - a.alto);
  const cy = y + pad + offY + (arriba ? 0 : libre * 0.35) + fsT * 0.9;
  const yTexto = a.lt.length ? cy + (a.lt.length - 1) * fsT * 1.18 + a.fs * 0.5 + a.fs * 1.1 : cy;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={26} fill={C.suave} />
      {p.tono === "verde" && <rect x={x} y={y} width={w} height={10} rx={5} fill={C.verde} />}
      {num && (
        <g>
          <circle cx={x + pad + r} cy={arriba ? y + pad + r : cy - fsT * 0.33} r={r} fill={C.verde} />
          <text x={x + pad + r} y={(arriba ? y + pad + r : cy - fsT * 0.33) + r * 0.37} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={r * 1.05} fill="#fff">
            {p.numero}
          </text>
        </g>
      )}
      {a.lt.length > 0 && <Texto x={tx} y={cy} lineas={a.lt} fs={fsT} peso={700} lh={1.18} />}
      {a.lx.length > 0 && <Texto x={tx} y={yTexto} lineas={a.lx} fs={a.fs} color={C.tinta2} lh={1.3} />}
    </g>
  );
}

const colorSerie = (i: number) => [C.verde, C.verde2, "#9AA0AA"][i] ?? C.tinta2;

function grilla(n: number, caja: Caja, cols: number, gap: number) {
  const filas = Math.ceil(n / cols);
  const w = (caja.w - gap * (cols - 1)) / cols;
  const h = (caja.h - gap * (filas - 1)) / filas;
  return Array.from({ length: n }, (_, i) => ({
    x: caja.x + (i % cols) * (w + gap),
    y: caja.y + Math.floor(i / cols) * (h + gap),
    w,
    h,
  }));
}

function Cuerpo({ f, caja, fmt }: { f: Figura; caja: Caja; fmt: FormatoFigura }) {
  const v = fmt === "v";
  switch (f.tipo) {
    case "pasos": {
      const n = f.items.length;
      const cols = v ? (n > 4 ? 2 : 1) : n <= 4 ? n : 3;
      const cajas = grilla(n, caja, cols, 24);
      return (
        <g>
          {cajas.map((c, i) => (
            <Tarjeta key={i} caja={c} numero={i + 1} titulo={f.items[i].titulo} texto={f.items[i].texto} fsMax={v ? 38 : 40} />
          ))}
        </g>
      );
    }
    case "lista": {
      const n = f.columnas.length;
      const cajas = grilla(n, caja, v ? 1 : n, 28);
      return (
        <g>
          {cajas.map((c, i) => (
            <Tarjeta
              key={i}
              caja={c}
              tono={f.columnas[i].tono ?? (i === 0 ? "verde" : "gris")}
              titulo={f.columnas[i].titulo}
              texto={f.columnas[i].puntos.map((p) => "• " + p).join("\n")}
              fsMax={v ? 38 : 40}
            />
          ))}
        </g>
      );
    }
    case "cifras": {
      const n = f.items.length;
      const cajas = grilla(n, caja, v ? 1 : n, 30);
      return (
        <g>
          {cajas.map((c, i) => {
            const it = f.items[i];
            const pad = 40;
            if (v) {
              const fsN = Math.min(n === 1 ? 200 : 130, c.h * 0.5);
              const anchoN = Math.min(c.w * 0.5, it.valor.length * fsN * 0.56);
              const tw = c.w - anchoN - pad * 3;
              const a = ajustar("", it.texto, tw, c.h - pad * 2, 38, 20);
              const yN = c.y + c.h / 2 + fsN * 0.34;
              return (
                <g key={i}>
                  <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={26} fill={C.suave} />
                  <rect x={c.x + pad - 8} y={yN - fsN * 0.38} width={anchoN + 16} height={fsN * 0.46} fill={C.marca} />
                  <text x={c.x + pad} y={yN} fontFamily={FONT} fontWeight={800} fontSize={fsN} fill={C.tinta} letterSpacing={-fsN * 0.02} textLength={anchoN} lengthAdjust="spacingAndGlyphs">
                    {it.valor}
                  </text>
                  <Texto x={c.x + pad * 2 + anchoN} y={c.y + c.h / 2 - a.alto / 2 + a.fs * 0.95} lineas={a.lx} fs={a.fs} color={C.tinta2} lh={1.3} />
                </g>
              );
            }
            const fsN = Math.min(150, c.h * 0.42, (c.w / Math.max(3, it.valor.length)) * 1.6);
            const anchoN = it.valor.length * fsN * 0.56;
            const a = ajustar("", it.texto, c.w - pad * 2, c.h - fsN * 1.25 - pad * 2, 38, 20);
            const yN = c.y + pad + fsN * 0.9;
            return (
              <g key={i}>
                <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={26} fill={C.suave} />
                <rect x={c.x + pad - 8} y={yN - fsN * 0.38} width={Math.min(anchoN + 16, c.w - pad)} height={fsN * 0.46} fill={C.marca} />
                <text x={c.x + pad} y={yN} fontFamily={FONT} fontWeight={800} fontSize={fsN} fill={C.tinta} letterSpacing={-fsN * 0.02}>
                  {it.valor}
                </text>
                <Texto x={c.x + pad} y={yN + fsN * 0.32 + a.fs * 1.1} lineas={a.lx} fs={a.fs} color={C.tinta2} lh={1.3} />
              </g>
            );
          })}
        </g>
      );
    }
    case "barras": {
      const series = f.series ?? [];
      const ns = Math.max(1, ...f.items.map((it) => it.valores.length));
      const max = f.max ?? Math.max(...f.items.flatMap((it) => it.valores));
      const leyenda = series.length > 1 ? 70 : 0;
      const n = f.items.length;
      const fila = (caja.h - leyenda) / n;
      const fsL = Math.min(40, fila * (v ? 0.24 : 0.3));
      const labelW = v ? 0 : Math.min(caja.w * 0.45, Math.max(...f.items.map((it) => it.label.length)) * fsL * 0.56 + 40);
      const barX = caja.x + labelW;
      const barW = caja.w - labelW - 150;
      const altoLabel = v ? fsL * 1.5 : 0;
      const grosor = Math.min(56, (fila - altoLabel - 16) / ns - 6);
      return (
        <g>
          {series.length > 1 &&
            series.map((s, i) => (
              <g key={s}>
                <rect x={caja.x + i * (caja.w / series.length)} y={caja.y + 8} width={30} height={30} rx={6} fill={colorSerie(i)} />
                <text x={caja.x + i * (caja.w / series.length) + 44} y={caja.y + 33} fontFamily={FONT} fontSize={series.length > 2 ? 24 : 28} fill={C.tinta}>
                  {s}
                </text>
              </g>
            ))}
          {f.items.map((it, i) => {
            const y0 = caja.y + leyenda + i * fila;
            const bloque = ns * (grosor + 6);
            const yb = v ? y0 + (fila - altoLabel - bloque) / 2 + altoLabel : y0 + (fila - bloque) / 2;
            return (
              <g key={i}>
                <text
                  x={caja.x}
                  y={v ? yb - altoLabel + fsL * 1.05 : yb + bloque / 2 + fsL * 0.35}
                  fontFamily={FONT}
                  fontSize={fsL}
                  fontWeight={600}
                  fill={C.tinta}
                >
                  {it.label}
                </text>
                {it.valores.map((val, j) => {
                  const w = Math.max(4, (val / max) * barW);
                  const yy = yb + j * (grosor + 6);
                  return (
                    <g key={j}>
                      <rect x={barX} y={yy} width={barW} height={grosor} rx={grosor / 2} fill={C.suave} />
                      <rect x={barX} y={yy} width={w} height={grosor} rx={grosor / 2} fill={colorSerie(j)} />
                      <text x={barX + w + 16} y={yy + grosor * 0.5 + fsL * 0.36} fontFamily={FONT} fontSize={fsL} fontWeight={700} fill={C.tinta}>
                        {val.toLocaleString("es-CL")}
                        {f.unidad ?? ""}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </g>
      );
    }
    case "espectro": {
      const barH = 22;
      const top = caja.y + 10;
      const cajaT = { x: caja.x, y: top + barH + 60, w: caja.w, h: caja.h - barH - 70 };
      const cajas = grilla(2, cajaT, v ? 1 : 2, 28);
      return (
        <g>
          <defs>
            <linearGradient id={`g-${f.id}-${fmt}`} x1="0" x2="1">
              <stop offset="0" stopColor={C.verde} />
              <stop offset="0.5" stopColor={C.linea} />
              <stop offset="1" stopColor={C.verde} />
            </linearGradient>
          </defs>
          <rect x={caja.x} y={top} width={caja.w} height={barH} rx={barH / 2} fill={`url(#g-${f.id}-${fmt})`} />
          {f.centro && (
            <text x={caja.x + caja.w / 2} y={top + barH + 42} textAnchor="middle" fontFamily={FONT} fontSize={26} fill={C.tinta2}>
              {f.centro}
            </text>
          )}
          <Tarjeta caja={cajas[0]} tono="verde" titulo={f.izq.titulo} texto={f.izq.puntos.map((p) => "• " + p).join("\n")} fsMax={v ? 36 : 38} />
          <Tarjeta caja={cajas[1]} tono="verde" titulo={f.der.titulo} texto={f.der.puntos.map((p) => "• " + p).join("\n")} fsMax={v ? 36 : 38} />
        </g>
      );
    }
    case "radar": {
      const n = f.ejes.length;
      const leyH = 60;
      const cx = caja.x + caja.w / 2;
      const cy = caja.y + (caja.h - leyH) / 2 + leyH;
      const R = Math.min(caja.w * (v ? 0.3 : 0.25), (caja.h - leyH) * (v ? 0.36 : 0.4));
      const ang = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
      const pt = (i: number, r: number) => [cx + Math.cos(ang(i)) * r, cy + Math.sin(ang(i)) * r];
      const colores = [C.verde, "#C9A227"];
      return (
        <g>
          {f.perfiles.map((p, k) => (
            <g key={p.nombre}>
              <rect x={caja.x + k * (caja.w / 2)} y={caja.y} width={30} height={30} rx={6} fill={colores[k]} opacity={0.85} />
              <text x={caja.x + k * (caja.w / 2) + 44} y={caja.y + 25} fontFamily={FONT} fontSize={26} fill={C.tinta}>
                {p.nombre}
              </text>
            </g>
          ))}
          {[0.25, 0.5, 0.75, 1].map((s) => (
            <polygon key={s} points={f.ejes.map((_, i) => pt(i, R * s).join(",")).join(" ")} fill="none" stroke={C.linea} strokeWidth={2} />
          ))}
          {f.ejes.map((_, i) => {
            const [x, y] = pt(i, R);
            return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={C.linea} strokeWidth={2} />;
          })}
          {f.perfiles.map((p, k) => (
            <polygon
              key={p.nombre}
              points={p.valores.map((val, i) => pt(i, R * Math.max(0.05, val)).join(",")).join(" ")}
              fill={colores[k]}
              fillOpacity={0.22}
              stroke={colores[k]}
              strokeWidth={4}
            />
          ))}
          {f.ejes.map((e, i) => {
            const [x, y] = pt(i, R + 34);
            const cos = Math.cos(ang(i));
            const anchor = Math.abs(cos) < 0.2 ? "middle" : cos > 0 ? "start" : "end";
            const ls = cortar(e, v ? 230 : 300, 26, 600);
            const sin = Math.sin(ang(i));
            const y0 = sin < -0.5 ? y - (ls.length - 1) * 30 : sin > 0.5 ? y + 22 : y - ((ls.length - 1) * 30) / 2 + 8;
            return <Texto key={i} x={x} y={y0} lineas={ls} fs={26} peso={600} anchor={anchor} lh={1.15} />;
          })}
        </g>
      );
    }
    case "curva": {
      const mL = 90;
      const mB = 80;
      const area = { x: caja.x + mL, y: caja.y + 10, w: caja.w - mL - 20, h: caja.h - mB - 10 };
      const xs = f.puntos.map((p) => p[0]);
      const x0 = Math.min(...xs, ...f.ticksX);
      const x1 = Math.max(...xs, ...f.ticksX);
      const yMax = Math.max(...f.puntos.map((p) => p[1])) * 1.15;
      const X = (x: number) => area.x + ((x - x0) / (x1 - x0)) * area.w;
      const Y = (y: number) => area.y + area.h - (y / yMax) * area.h;
      const P2 = f.puntos.map(([a, b]) => [X(a), Y(b)]);
      let d = `M ${P2[0][0]} ${P2[0][1]}`;
      for (let i = 0; i < P2.length - 1; i++) {
        const p0 = P2[Math.max(0, i - 1)];
        const p1 = P2[i];
        const p2 = P2[i + 1];
        const p3 = P2[Math.min(P2.length - 1, i + 2)];
        const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
        const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
        d += ` C ${c1[0]} ${Math.min(area.y + area.h, c1[1])}, ${c2[0]} ${Math.min(area.y + area.h, c2[1])}, ${p2[0]} ${p2[1]}`;
      }
      return (
        <g>
          {(f.zonas ?? []).map((z, i) => (
            <g key={i}>
              <rect x={X(z.desde)} y={area.y} width={X(z.hasta) - X(z.desde)} height={area.h} fill={i === 0 ? C.marca : C.suave} opacity={i === 0 ? 0.55 : 1} />
              <Texto
                x={(X(z.desde) + X(z.hasta)) / 2}
                y={area.y + 44}
                lineas={cortar(z.texto, X(z.hasta) - X(z.desde) - 20, 26, 600)}
                fs={26}
                peso={600}
                anchor="middle"
                lh={1.15}
              />
            </g>
          ))}
          <line x1={area.x} y1={area.y + area.h} x2={area.x + area.w} y2={area.y + area.h} stroke={C.tinta} strokeWidth={3} />
          <line x1={area.x} y1={area.y} x2={area.x} y2={area.y + area.h} stroke={C.tinta} strokeWidth={3} />
          <path d={d} fill="none" stroke={C.verde} strokeWidth={8} strokeLinecap="round" />
          {f.ticksX.map((t) => (
            <text key={t} x={X(t)} y={area.y + area.h + 40} textAnchor="middle" fontFamily={FONT} fontSize={26} fill={C.tinta2}>
              {t}°
            </text>
          ))}
          <text x={area.x + area.w / 2} y={caja.y + caja.h} textAnchor="middle" fontFamily={FONT} fontSize={28} fontWeight={600} fill={C.tinta}>
            {f.ejeX}
          </text>
          <text
            transform={`translate(${caja.x + 30} ${area.y + area.h / 2}) rotate(-90)`}
            textAnchor="middle"
            fontFamily={FONT}
            fontSize={28}
            fontWeight={600}
            fill={C.tinta}
          >
            {f.ejeY}
          </text>
        </g>
      );
    }
  }
}

export function FiguraSVG({ f, fmt, svgRef }: { f: Figura; fmt: FormatoFigura; svgRef?: React.Ref<SVGSVGElement> }) {
  const { w: W, h: H } = TAMANOS[fmt];
  const v = fmt === "v";
  const P = v ? 76 : 96;
  const fsT = v ? 60 : 62;
  const lt = cortar(f.titulo, W - 2 * P, fsT, 700);
  const fsB = v ? 31 : 32;
  const lb = f.bajada ? cortar(f.bajada, W - 2 * P, fsB) : [];
  const yT = P + 96;
  const yB = yT + (lt.length - 1) * fsT * 1.1 + fsB * 1.6;
  const top = (lb.length ? yB + (lb.length - 1) * fsB * 1.28 : yT + (lt.length - 1) * fsT * 1.1) + 64;
  const lf = cortar(f.fuente, W - 2 * P - 220, 24);
  const pie = H - P;
  const bottom = pie - 30 - lf.length * 30;
  return (
    <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" role="img" aria-label={f.titulo}>
      <rect width={W} height={H} fill="#fff" />
      <text x={P} y={P + 10} fontFamily={FONT} fontSize={30} fontWeight={800} fill={C.verde}>
        MyoKine
      </text>
      <Texto x={P} y={yT} lineas={lt} fs={fsT} peso={700} lh={1.1} />
      {lb.length > 0 && <Texto x={P} y={yB} lineas={lb} fs={fsB} color={C.tinta2} lh={1.28} />}
      <Cuerpo f={f} fmt={fmt} caja={{ x: P, y: top, w: W - 2 * P, h: bottom - top }} />
      <line x1={P} y1={pie - lf.length * 30 - 6} x2={W - P} y2={pie - lf.length * 30 - 6} stroke={C.linea} strokeWidth={2} />
      <Texto x={P} y={pie - (lf.length - 1) * 30 + 6} lineas={lf} fs={24} color={C.tinta2} lh={1.25} />
      <text x={W - P} y={pie + 6} textAnchor="end" fontFamily={FONT} fontSize={24} fontWeight={600} fill={C.tinta2}>
        Basado en evidencia
      </text>
    </svg>
  );
}

