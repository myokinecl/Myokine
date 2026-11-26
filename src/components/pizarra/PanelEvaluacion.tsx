import { useState } from "react";
import { EJEMPLO_NOTAS, armarHojas, evaluacionVacia, ordenarNotas, type Evaluacion } from "./evaluacion";
import type { Hoja } from "./modelo";

const lbl = "block text-[15px] font-semibold text-[#1D2433] mb-1";
const ayuda = "block text-[14px] text-[#5A6170] mb-1.5";
const inp =
  "w-full rounded-[10px] border-[1.5px] border-[#E3E5E8] bg-white px-3 py-2.5 text-[17px] text-[#1D2433] focus:border-[#1D2433] outline-none";

type CampoLista = "frases" | "metas" | "hallazgos" | "factores" | "preocupaciones" | "ayudas" | "plan" | "acuerdos";

const LISTAS: { campo: CampoLista; titulo: string; pista: string }[] = [
  { campo: "frases", titulo: "Sus palabras", pista: "Frases tal como te las dijo. Una por línea." },
  { campo: "metas", titulo: "Lo que más le importa", pista: "Sus metas o lo que quiere volver a hacer." },
  { campo: "hallazgos", titulo: "Lo que encontraste", pista: "Hallazgos de la evaluación, en palabras simples." },
  { campo: "factores", titulo: "Lo que puede estar sumando", pista: "Sueño, trabajo, estrés, carga, alimentación…" },
  { campo: "preocupaciones", titulo: "Lo que le preocupa", pista: "Miedos, creencias o lo que suma amenaza." },
  { campo: "ayudas", titulo: "Lo que le ayuda", pista: "Lo que suma seguridad o alivia." },
  { campo: "plan", titulo: "El plan", pista: "Lo que van a hacer en las próximas semanas." },
  { campo: "acuerdos", titulo: "Lo que acordaron", pista: "Compromisos concretos de los dos." },
];

export function PanelEvaluacion({ onArmar }: { onArmar: (hojas: Hoja[]) => void }) {
  const [notas, setNotas] = useState("");
  const [ev, setEv] = useState<Evaluacion>(evaluacionVacia);
  const [ordenado, setOrdenado] = useState(false);

  const up = (p: Partial<Evaluacion>) => setEv((e) => ({ ...e, ...p }));
  const lista = (c: CampoLista) => ev[c].join("\n");
  const setLista = (c: CampoLista, v: string) => up({ [c]: v.split("\n").map((x) => x.trimStart()) } as Partial<Evaluacion>);

  const ordenar = () => {
    setEv(ordenarNotas(notas, evaluacionVacia()));
    setOrdenado(true);
  };

  const armar = () => {
    const limpio: Evaluacion = { ...ev };
    LISTAS.forEach(({ campo }) => (limpio[campo] = ev[campo].map((x) => x.trim()).filter(Boolean)));
    const hojas = armarHojas(limpio);
    if (hojas.length) onArmar(hojas);
  };

  const vacio = !ev.motivo && LISTAS.every(({ campo }) => ev[campo].every((x) => !x.trim()));

  return (
    <div className="space-y-6">
      <p className="text-[16px] text-[#5A6170] max-w-2xl">
        Pega tus notas de la evaluación o completa los campos. La pizarra arma las hojas con lo más importante que conversaron, para que la persona vea que la escuchaste y lo que acordaron. Lo que escribes se queda en este dispositivo; no se envía a ningún lado.
      </p>

      <div>
        <span className={lbl}>1. Pega tus notas (opcional)</span>
        <span className={ayuda}>
          Sirve cualquier formato. Si usas títulos como “Motivo:”, “Meta:”, “Hallazgos:”, “Plan:” o “Acuerdos:” y pones entre comillas lo que te dijo, queda mejor ordenado.
        </span>
        <textarea className={inp + " min-h-[180px] font-mono text-[15px]"} value={notas} onChange={(e) => setNotas(e.target.value)} placeholder={EJEMPLO_NOTAS} />
        <div className="flex flex-wrap gap-2 mt-2">
          <button type="button" onClick={ordenar} disabled={!notas.trim()} className="px-4 py-2.5 rounded-[10px] text-[16px] font-semibold bg-[#1D2433] text-white cursor-pointer disabled:opacity-40">
            Ordenar mis notas
          </button>
          <button type="button" onClick={() => setNotas(EJEMPLO_NOTAS)} className="px-4 py-2.5 rounded-[10px] text-[16px] font-semibold border-[1.5px] border-[#E3E5E8] text-[#1D2433] cursor-pointer">
            Ver un ejemplo
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <span className={lbl}>2. Revisa y ajusta {ordenado && <span className="font-normal text-[#0F5C4D]">· ordené tus notas, revisa que todo esté en su lugar</span>}</span>
        <div className="grid sm:grid-cols-3 gap-3">
          <label className="block">
            <span className={ayuda}>Nombre (solo el primero, opcional)</span>
            <input className={inp} value={ev.nombre} onChange={(e) => up({ nombre: e.target.value })} />
          </label>
          <label className="block">
            <span className={ayuda}>Dolor hoy (0 a 10)</span>
            <input className={inp} inputMode="decimal" value={ev.dolor} onChange={(e) => up({ dolor: e.target.value })} />
          </label>
          <label className="block">
            <span className={ayuda}>Próxima sesión</span>
            <input className={inp} value={ev.proxima} onChange={(e) => up({ proxima: e.target.value })} placeholder="martes 3 de diciembre" />
          </label>
        </div>
        <label className="block">
          <span className={ayuda}>Por qué consultó, en una o dos frases</span>
          <textarea className={inp + " min-h-[70px]"} value={ev.motivo} onChange={(e) => up({ motivo: e.target.value })} />
        </label>
        <div className="grid sm:grid-cols-2 gap-4">
          {LISTAS.map(({ campo, titulo, pista }) => (
            <label key={campo} className="block">
              <span className={lbl}>{titulo}</span>
              <span className={ayuda}>{pista}</span>
              <textarea className={inp + " min-h-[96px]"} value={lista(campo)} onChange={(e) => setLista(campo, e.target.value)} />
            </label>
          ))}
        </div>
        <label className="flex items-center gap-2.5 text-[16px] text-[#1D2433]">
          <input type="checkbox" className="w-5 h-5 accent-[#0F5C4D]" checked={ev.mejoraNoLineal} onChange={(e) => up({ mejoraNoLineal: e.target.checked })} />
          Agregar “La mejora no es una línea recta”
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={armar} disabled={vacio} className="px-5 py-3 rounded-[12px] text-[17px] font-semibold bg-[#0F5C4D] text-white cursor-pointer hover:bg-[#0B4A3E] disabled:opacity-40">
          Armar la pizarra
        </button>
        <span className="text-[14px] text-[#5A6170]">Se abre en hojas nuevas. Después puedes mover, editar o dibujar encima de todo.</span>
      </div>
    </div>
  );
}
