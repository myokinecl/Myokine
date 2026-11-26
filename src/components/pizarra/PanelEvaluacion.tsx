import { useState } from "react";
import { EJEMPLO_NOTAS, pizarraDesdeTexto } from "./evaluacion";
import type { Hoja } from "./modelo";

const inp =
  "w-full rounded-[10px] border-[1.5px] border-[#E3E5E8] bg-white px-3 py-2.5 text-[16px] text-[#1D2433] focus:border-[#1D2433] outline-none";

export function PanelEvaluacion({ onArmar }: { onArmar: (hojas: Hoja[]) => void }) {
  const [texto, setTexto] = useState("");

  return (
    <div className="space-y-4">
      <p className="text-[16px] text-[#5A6170] max-w-2xl">
        Pega tu evaluación tal como la escribiste. La pizarra arma al tiro las hojas para mandarle a la persona: lo que te contó, un gráfico de lo que le pasa y el plan. Después puedes cambiar lo que quieras. Lo que pegas no sale de este dispositivo.
      </p>
      <textarea
        className={inp + " min-h-[220px]"}
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Pega aquí tu evaluación…"
      />
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => onArmar(pizarraDesdeTexto(texto))}
          disabled={texto.trim().length < 20}
          className="px-5 py-3 rounded-[12px] text-[17px] font-semibold bg-[#0F5C4D] text-white cursor-pointer hover:bg-[#0B4A3E] disabled:opacity-40"
        >
          Crear pizarra
        </button>
        <button
          type="button"
          onClick={() => setTexto(EJEMPLO_NOTAS)}
          className="px-4 py-3 rounded-[12px] text-[16px] font-semibold border-[1.5px] border-[#E3E5E8] text-[#1D2433] cursor-pointer"
        >
          Probar con un ejemplo
        </button>
      </div>
      <p className="text-[14px] text-[#5A6170] max-w-2xl">
        Detecta la zona y el tipo de problema (hombro, lumbar, rodilla, tendón, desgarro, LCA, post operatorio) para elegir el gráfico. Lo que pongas entre comillas aparece como sus palabras, y si escribes “Meta:”, “Plan:” o “Próxima:”, eso también se usa.
      </p>
    </div>
  );
}
