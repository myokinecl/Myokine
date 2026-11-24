import { useState } from "react";
import { C, DIMS_SUGERIDOS, SIMS_SUGERIDOS, TIEMPOS, type Item } from "./modelo";

// Paneles para editar los datos del elemento seleccionado.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Set = (d: any) => void;

const lbl = "block text-[15px] font-medium text-[#5A6170] mb-1.5";
const inp =
  "w-full rounded-[10px] border-[1.5px] border-[#E3E5E8] bg-white px-3 py-2.5 text-[17px] text-[#1D2433] focus:border-[#1D2433] outline-none";

function Texto({ label, value, onChange, area }: { key?: string | number; label: string; value: string; onChange: (v: string) => void; area?: boolean }) {
  return (
    <label className="block">
      <span className={lbl}>{label}</span>
      {area ? (
        <textarea className={inp + " min-h-[90px]"} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={inp} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

function Num({ label, value, onChange, step = 1, min, max }: { key?: string | number; label: string; value: number; onChange: (v: number) => void; step?: number; min?: number; max?: number }) {
  return (
    <label className="block">
      <span className={lbl}>{label}</span>
      <input
        className={inp}
        type="number"
        inputMode="decimal"
        step={step}
        min={min}
        max={max}
        value={Number.isFinite(value) ? value : ""}
        onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
      />
    </label>
  );
}

function Opciones<T extends string>({ label, value, opts, onChange }: { label: string; value: T; opts: [T, string][]; onChange: (v: T) => void }) {
  return (
    <div>
      <span className={lbl}>{label}</span>
      <div className="flex flex-wrap gap-2">
        {opts.map(([v, t]) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={`px-3.5 py-2 rounded-[10px] text-[15px] font-semibold border-[1.5px] cursor-pointer ${
              value === v ? "bg-[#1D2433] text-white border-[#1D2433]" : "bg-white border-[#E3E5E8] text-[#1D2433]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

function Lista({ label, items, onChange, max = 8, sugeridos }: { label: string; items: string[]; onChange: (v: string[]) => void; max?: number; sugeridos?: string[] }) {
  const [nuevo, setNuevo] = useState("");
  const add = (t: string) => {
    const v = t.trim();
    if (!v || items.length >= max || items.includes(v)) return;
    onChange([...items, v]);
    setNuevo("");
  };
  return (
    <div>
      <span className={lbl}>{label}</span>
      <div className="space-y-2">
        {items.map((t, i) => (
          <div key={i} className="flex gap-2">
            <input className={inp} value={t} onChange={(e) => onChange(items.map((x, k) => (k === i ? e.target.value : x)))} />
            <button type="button" onClick={() => onChange(items.filter((_, k) => k !== i))} className="px-3 rounded-[10px] border-[1.5px] border-[#E3E5E8] text-[15px] cursor-pointer" aria-label="Quitar">
              Quitar
            </button>
          </div>
        ))}
        {items.length < max && (
          <div className="flex gap-2">
            <input className={inp} placeholder="Agregar…" value={nuevo} onChange={(e) => setNuevo(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add(nuevo)} />
            <button type="button" onClick={() => add(nuevo)} className="px-3 rounded-[10px] bg-[#1D2433] text-white text-[15px] font-semibold cursor-pointer">
              Agregar
            </button>
          </div>
        )}
        {sugeridos && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {sugeridos.filter((s) => !items.includes(s)).map((s) => (
              <button key={s} type="button" onClick={() => add(s)} className="px-2.5 py-1.5 rounded-[8px] bg-[#F6F7F8] text-[14px] text-[#1D2433] cursor-pointer">
                + {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function Editor({ it, set }: { it: Item; set: Set }) {
  const d = it.d;
  const up = (patch: object) => set({ ...d, ...patch });
  switch (it.kind) {
    case "cuerpo":
      return <Opciones label="Vista" value={d.vista} opts={[["frente", "Frente"], ["espalda", "Espalda"]]} onChange={(v) => up({ vista: v })} />;
    case "tendon":
      return (
        <Opciones label="Marcar zona" value={d.marca} onChange={(v) => up({ marca: v })}
          opts={[["ninguna", "Nada"], ["tendon", "Tendón"], ["union", "Unión músculo-tendón"], ["musculo", "Músculo"]]} />
      );
    case "rodilla":
      return (
        <Opciones label="Marcar estructura" value={d.marca} onChange={(v) => up({ marca: v })}
          opts={[["ninguna", "Nada"], ["lca", "LCA"], ["menisco", "Menisco"], ["lcm", "Ligamento interno"]]} />
      );
    case "carga":
      return (
        <div className="space-y-4">
          <Texto label="Título" value={d.titulo} onChange={(v) => up({ titulo: v })} />
          <Opciones label="Medida" value={d.unidad} onChange={(v) => up({ unidad: v })}
            opts={[["min", "Minutos"], ["km", "Km"], ["series", "Series"], ["UA", "UA (RPE × min)"]]} />
          <div className="grid grid-cols-2 gap-3">
            {d.semanas.map((v: number, i: number) => (
              <Num key={i} label={`Semana ${i + 1}`} value={v} onChange={(n) => up({ semanas: d.semanas.map((x: number, k: number) => (k === i ? n : x)) })} />
            ))}
          </div>
          <Num label="Esta semana" value={d.actual} onChange={(n) => up({ actual: n })} />
          <p className="text-[14px] text-[#5A6170]">Rojo si sube más de 50% sobre el promedio, naranjo si sube más de 30%.</p>
        </div>
      );
    case "capacidad":
      return <Opciones label="Mostrar" value={d.modo} onChange={(v) => up({ modo: v })} opts={[["pico", "Por qué se lesionó"], ["plan", "Cómo vamos a progresar"]]} />;
    case "semaforo":
      return (
        <div className="space-y-3">
          <Num label="Marcar valor (deja -1 para no marcar)" value={d.valor} min={-1} max={10} onChange={(n) => up({ valor: Math.max(-1, Math.min(10, n)) })} />
        </div>
      );
    case "tiempo":
      return (
        <div className="space-y-4">
          <div>
            <span className={lbl}>Usar etapas de</span>
            <div className="flex flex-wrap gap-2">
              {[["lca", "LCA"], ["desgarro", "Desgarro"], ["tendinopatia", "Tendinopatía"], ["postop", "Post operatorio"], ["entreno", "Entrenamiento"], ["vacia", "En blanco"]].map(([k, t]) => (
                <button key={k} type="button" onClick={() => up({ titulo: TIEMPOS[k].titulo, fases: TIEMPOS[k].fases.map((f) => ({ ...f })), hoy: 0 })}
                  className="px-3 py-2 rounded-[10px] border-[1.5px] border-[#E3E5E8] text-[15px] font-semibold cursor-pointer">
                  {t}
                </button>
              ))}
            </div>
          </div>
          <Texto label="Título" value={d.titulo} onChange={(v) => up({ titulo: v })} />
          {d.fases.map((f: { n: string; t: string }, i: number) => (
            <div key={i} className="grid grid-cols-[1fr_120px_auto] gap-2 items-end">
              <Texto label={`Etapa ${i + 1}`} value={f.n} onChange={(v) => up({ fases: d.fases.map((x: object, k: number) => (k === i ? { ...f, n: v } : x)) })} />
              <Texto label="Plazo" value={f.t} onChange={(v) => up({ fases: d.fases.map((x: object, k: number) => (k === i ? { ...f, t: v } : x)) })} />
              <button type="button" onClick={() => up({ fases: d.fases.filter((_: object, k: number) => k !== i), hoy: 0 })} className="h-[46px] px-3 rounded-[10px] border-[1.5px] border-[#E3E5E8] text-[15px] cursor-pointer">Quitar</button>
            </div>
          ))}
          {d.fases.length < 7 && (
            <button type="button" onClick={() => up({ fases: [...d.fases, { n: "Nueva etapa", t: "" }] })} className="px-3.5 py-2 rounded-[10px] bg-[#1D2433] text-white text-[15px] font-semibold cursor-pointer">
              Agregar etapa
            </button>
          )}
          <Opciones label="Estás aquí" value={String(d.hoy)} onChange={(v) => up({ hoy: Number(v) })}
            opts={d.fases.map((_: object, i: number) => [String(i), `Etapa ${i + 1}`] as [string, string])} />
        </div>
      );
    case "semana":
      return (
        <div className="space-y-3">
          <Texto label="Título" value={d.titulo} onChange={(v) => up({ titulo: v })} />
          <div className="grid grid-cols-2 gap-3">
            {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((n, i) => (
              <Texto key={i} label={n} value={d.dias[i]} onChange={(v) => up({ dias: d.dias.map((x: string, k: number) => (k === i ? v : x)) })} />
            ))}
          </div>
        </div>
      );
    case "escala":
      return (
        <div className="space-y-4">
          <Texto label="Título" value={d.titulo} onChange={(v) => up({ titulo: v })} />
          <div>
            <span className={lbl}>Valor: {d.valor}</span>
            <input type="range" min={0} max={10} step={1} value={d.valor} onChange={(e) => up({ valor: Number(e.target.value) })} className="w-full accent-[#0F5C4D]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Texto label="Texto en 0" value={d.izq} onChange={(v) => up({ izq: v })} />
            <Texto label="Texto en 10" value={d.der} onChange={(v) => up({ der: v })} />
          </div>
        </div>
      );
    case "protecto":
      return (
        <div className="space-y-5">
          <Lista label="Lo que suma peligro (DIMs)" items={d.dims} max={5} sugeridos={DIMS_SUGERIDOS} onChange={(v) => up({ dims: v })} />
          <Lista label="Lo que suma seguridad (SIMs)" items={d.sims} max={5} sugeridos={SIMS_SUGERIDOS} onChange={(v) => up({ sims: v })} />
        </div>
      );
    case "barras":
      return (
        <div className="space-y-4">
          <Texto label="Título" value={d.titulo} onChange={(v) => up({ titulo: v })} />
          {d.valores.map((v: number, i: number) => (
            <div key={i} className="grid grid-cols-[1fr_110px_auto] gap-2 items-end">
              <Texto label={`Barra ${i + 1}`} value={d.etiquetas[i] ?? ""} onChange={(t) => up({ etiquetas: d.valores.map((_: number, k: number) => (k === i ? t : d.etiquetas[k] ?? "")) })} />
              <Num label="Valor" value={v} step={0.5} onChange={(n) => up({ valores: d.valores.map((x: number, k: number) => (k === i ? n : x)) })} />
              <button type="button" onClick={() => up({ valores: d.valores.filter((_: number, k: number) => k !== i), etiquetas: d.etiquetas.filter((_: string, k: number) => k !== i), destacar: -1 })} className="h-[46px] px-3 rounded-[10px] border-[1.5px] border-[#E3E5E8] text-[15px] cursor-pointer">Quitar</button>
            </div>
          ))}
          {d.valores.length < 10 && (
            <button type="button" onClick={() => up({ valores: [...d.valores, 1], etiquetas: [...d.etiquetas, ""] })} className="px-3.5 py-2 rounded-[10px] bg-[#1D2433] text-white text-[15px] font-semibold cursor-pointer">Agregar barra</button>
          )}
          <Opciones label="Destacar barra" value={String(d.destacar)} onChange={(v) => up({ destacar: Number(v) })}
            opts={[["-1", "Ninguna"], ...d.valores.map((_: number, i: number) => [String(i), String(i + 1)] as [string, string])]} />
          <div className="grid grid-cols-2 gap-3">
            <Num label="Línea de meta (0 = sin línea)" value={d.meta ?? 0} step={0.5} onChange={(n) => up({ meta: n > 0 ? n : null })} />
            <Texto label="Texto de la meta" value={d.metaTexto} onChange={(v) => up({ metaTexto: v })} />
          </div>
        </div>
      );
    case "torta":
      return (
        <div className="space-y-4">
          <Texto label="Título" value={d.titulo} onChange={(v) => up({ titulo: v })} />
          {d.partes.map((p: { n: string; v: number }, i: number) => (
            <div key={i} className="grid grid-cols-[1fr_100px_auto] gap-2 items-end">
              <Texto label={`Parte ${i + 1}`} value={p.n} onChange={(t) => up({ partes: d.partes.map((x: object, k: number) => (k === i ? { ...p, n: t } : x)) })} />
              <Num label="Valor" value={p.v} onChange={(n) => up({ partes: d.partes.map((x: object, k: number) => (k === i ? { ...p, v: n } : x)) })} />
              <button type="button" onClick={() => up({ partes: d.partes.filter((_: object, k: number) => k !== i) })} className="h-[46px] px-3 rounded-[10px] border-[1.5px] border-[#E3E5E8] text-[15px] cursor-pointer">Quitar</button>
            </div>
          ))}
          {d.partes.length < 6 && (
            <button type="button" onClick={() => up({ partes: [...d.partes, { n: "Nueva parte", v: 10 }] })} className="px-3.5 py-2 rounded-[10px] bg-[#1D2433] text-white text-[15px] font-semibold cursor-pointer">Agregar parte</button>
          )}
          <p className="text-[14px] text-[#5A6170]">Los porcentajes se calculan solos con los valores.</p>
        </div>
      );
    case "proteina":
      return (
        <div className="grid grid-cols-3 gap-3">
          <Num label="Peso (kg)" value={d.peso} onChange={(n) => up({ peso: n })} />
          <Num label="g por kilo" value={d.gkg} step={0.1} min={0.8} max={2.5} onChange={(n) => up({ gkg: n })} />
          <Num label="Comidas" value={d.comidas} min={1} max={8} onChange={(n) => up({ comidas: n })} />
        </div>
      );
    case "nota":
      return (
        <div className="space-y-4">
          <Texto label="Texto" area value={d.texto} onChange={(v) => up({ texto: v })} />
          <div>
            <span className={lbl}>Color</span>
            <div className="flex gap-2">
              {[C.hl, "#DCEFE6", "#E3ECFA", "#FBE3DF", "#F6F7F8"].map((c) => (
                <button key={c} type="button" onClick={() => up({ color: c })} aria-label="Color" className={`w-10 h-10 rounded-[10px] cursor-pointer border-2 ${d.color === c ? "border-[#1D2433]" : "border-[#E3E5E8]"}`} style={{ background: c }} />
              ))}
            </div>
          </div>
        </div>
      );
    case "titulo":
      return <Texto label="Texto" area value={d.texto} onChange={(v) => up({ texto: v })} />;
    case "plan":
      return (
        <div className="space-y-4">
          <Texto label="Título" value={d.titulo} onChange={(v) => up({ titulo: v })} />
          <Lista label="Pasos" items={d.items} max={7} onChange={(v) => up({ items: v })} />
        </div>
      );
    case "flecha":
      return (
        <div className="space-y-4">
          <div>
            <span className={lbl}>Girar</span>
            <div className="flex gap-2">
              {[-45, -15, 15, 45].map((g) => (
                <button key={g} type="button" onClick={() => up({ r: ((d.r || 0) + g + 360) % 360 })} className="px-3.5 py-2 rounded-[10px] border-[1.5px] border-[#E3E5E8] text-[15px] font-semibold cursor-pointer">
                  {g > 0 ? `+${g}°` : `${g}°`}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className={lbl}>Color</span>
            <div className="flex gap-2">
              {[C.ink, C.rojo, C.go, C.azul].map((c) => (
                <button key={c} type="button" onClick={() => up({ color: c })} aria-label="Color" className={`w-10 h-10 rounded-full cursor-pointer border-[3px] ${d.color === c ? "border-[#F5E663]" : "border-white"}`} style={{ background: c }} />
              ))}
            </div>
          </div>
        </div>
      );
    case "fuerza":
      return <p className="text-[15px] text-[#5A6170]">Este gráfico no tiene datos que editar. Dibuja encima para marcar en qué semana va la persona.</p>;
  }
}
