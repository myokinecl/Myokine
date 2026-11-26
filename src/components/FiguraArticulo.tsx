import React, { useRef, useState } from "react";
import { Download, Share2 } from "lucide-react";
import { svgAPng } from "../lib/exportarSvg";
import { FIGURAS } from "../figuras/datos";
import { TAMANOS, type FormatoFigura } from "../figuras/tipos";
import { FiguraSVG } from "./FiguraSVG";

export function FiguraArticulo({ id }: { id: string; key?: React.Key }) {
  const f = FIGURAS[id];
  const refV = useRef<SVGSVGElement>(null);
  const refH = useRef<SVGSVGElement>(null);
  const [ocupado, setOcupado] = useState<string | null>(null);
  if (!f) return null;

  const archivo = async (fmt: FormatoFigura) => {
    const el = fmt === "v" ? refV.current : refH.current;
    if (!el) throw new Error("svg");
    const { w, h } = TAMANOS[fmt];
    const blob = await svgAPng(el, w, h);
    return new File([blob], `myokine-${f.id}-${fmt === "v" ? "vertical" : "horizontal"}.png`, { type: "image/png" });
  };

  const descargar = async (fmt: FormatoFigura) => {
    setOcupado(fmt);
    try {
      const file = await archivo(fmt);
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } finally {
      setOcupado(null);
    }
  };

  const compartir = async () => {
    setOcupado("s");
    try {
      const file = await archivo("v");
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: f.titulo });
      } else {
        const url = URL.createObjectURL(file);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        a.click();
      }
    } catch {
      /* la persona canceló */
    } finally {
      setOcupado(null);
    }
  };

  const boton =
    "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[15px] font-semibold border transition-colors cursor-pointer disabled:opacity-60";

  return (
    <figure className="not-prose my-12 font-sans">
      <div className="rounded-2xl border border-[#E3E5E8] overflow-hidden bg-white">
        <div className="sm:hidden">
          <FiguraSVG f={f} fmt="v" svgRef={refV} />
        </div>
        <div className="hidden sm:block">
          <FiguraSVG f={f} fmt="h" svgRef={refH} />
        </div>
      </div>
      <figcaption className="mt-4 flex flex-wrap items-center gap-2.5">
        <button className={`${boton} bg-[#0F5C4D] text-white border-[#0F5C4D] hover:bg-[#0c4a3e]`} onClick={compartir} disabled={!!ocupado}>
          <Share2 className="w-4 h-4" /> {ocupado === "s" ? "Preparando…" : "Enviar a un paciente"}
        </button>
        <button className={`${boton} bg-white text-[#1D2433] border-[#1D2433]/15 hover:bg-[#F6F7F8]`} onClick={() => descargar("v")} disabled={!!ocupado}>
          <Download className="w-4 h-4" /> {ocupado === "v" ? "Preparando…" : "Vertical (WhatsApp, Instagram)"}
        </button>
        <button className={`${boton} bg-white text-[#1D2433] border-[#1D2433]/15 hover:bg-[#F6F7F8]`} onClick={() => descargar("h")} disabled={!!ocupado}>
          <Download className="w-4 h-4" /> {ocupado === "h" ? "Preparando…" : "Horizontal (presentaciones)"}
        </button>
      </figcaption>
    </figure>
  );
}
