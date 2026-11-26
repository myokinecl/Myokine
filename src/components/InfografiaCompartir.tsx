import { useState } from "react";
import { Check, Download, FileText, Image as ImageIcon, Link2, Send } from "lucide-react";
import type { Infografia } from "../data/infografias";
import { SITE_URL, whatsappShareUrl } from "./Contacto";

/** Link con vista previa (página estática con og:image), que luego abre la infografía en la app. */
export const linkInfografia = (slug: string) => `${SITE_URL}/i/${slug}`;
const pdfUrl = (slug: string) => `/infografias/${slug}.pdf`;
const parteUrl = (slug: string, n: number) => `/infografias/partes/${slug}-${n}.jpg`;

async function archivo(url: string, nombre: string, tipo: string) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(String(r.status));
  return new File([await r.blob()], nombre, { type: tipo });
}

function bajar(url: string, nombre: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function descargarPdfInfografia(item: Infografia) {
  bajar(pdfUrl(item.slug), `MyoKine-${item.slug}.pdf`);
}

const puedeCompartirArchivos = () =>
  typeof navigator !== "undefined" &&
  !!navigator.canShare &&
  navigator.canShare({ files: [new File([""], "a.pdf", { type: "application/pdf" })] });

export function InfografiaCompartir({ item }: { item: Infografia }) {
  const [estado, setEstado] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);
  const link = linkInfografia(item.slug);
  const texto = `${item.title}: una infografía de MyoKine para ti.`;

  const enviarPdf = async () => {
    setEstado("pdf");
    try {
      if (puedeCompartirArchivos()) {
        const f = await archivo(pdfUrl(item.slug), `MyoKine - ${item.title}.pdf`, "application/pdf");
        await navigator.share({ files: [f], title: item.title, text: texto });
      } else {
        descargarPdfInfografia(item);
      }
    } catch {
      /* cancelado */
    } finally {
      setEstado(null);
    }
  };

  const enviarImagen = async () => {
    setEstado("img");
    try {
      if (puedeCompartirArchivos()) {
        const fs = await Promise.all(
          [1, 2].map((n) => archivo(parteUrl(item.slug, n), `MyoKine-${item.slug}-${n}.jpg`, "image/jpeg"))
        );
        await navigator.share({ files: fs, title: item.title, text: texto });
      } else {
        [1, 2].forEach((n) => bajar(parteUrl(item.slug, n), `MyoKine-${item.slug}-${n}.jpg`));
      }
    } catch {
      /* cancelado */
    } finally {
      setEstado(null);
    }
  };

  const copiar = () => {
    navigator.clipboard?.writeText(link).catch(() => {});
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2200);
  };

  const fuerte =
    "inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0F5C4D] hover:bg-[#0B4A3E] text-white text-[15px] font-semibold transition-colors cursor-pointer disabled:opacity-60";
  const suave =
    "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#1D2433]/15 bg-white hover:bg-[#1D2433]/5 text-[#1D2433] text-sm font-semibold transition-colors cursor-pointer";

  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-2.5">
        <button type="button" className={fuerte} onClick={enviarPdf} disabled={!!estado}>
          <FileText className="w-4 h-4" /> {estado === "pdf" ? "Preparando…" : "Enviar en PDF"}
        </button>
        <button type="button" className={fuerte} onClick={enviarImagen} disabled={!!estado}>
          <ImageIcon className="w-4 h-4" /> {estado === "img" ? "Preparando…" : "Enviar como imagen"}
        </button>
      </div>
      <p className="text-[13px] leading-relaxed text-[#1D2433]/60">
        El PDF llega con la calidad original. La imagen se envía en dos partes para que WhatsApp no la achique ni la vuelva borrosa.
      </p>
      <div className="flex flex-wrap gap-2.5">
        <a className={suave} href={whatsappShareUrl(`${texto}\n${link}`)} target="_blank" rel="noopener noreferrer">
          <Send className="w-4 h-4" /> Link por WhatsApp
        </a>
        <button type="button" className={suave} onClick={copiar}>
          {copiado ? <Check className="w-4 h-4 text-emerald-700" /> : <Link2 className="w-4 h-4" />}
          <span className={copiado ? "text-emerald-700" : ""}>{copiado ? "Link copiado" : "Copiar link"}</span>
        </button>
        <button type="button" className={suave} onClick={() => descargarPdfInfografia(item)}>
          <Download className="w-4 h-4" /> Descargar PDF
        </button>
        <button type="button" className={suave} onClick={() => bajar(item.image, item.downloadName || `${item.slug}.jpg`)}>
          <Download className="w-4 h-4" /> Descargar imagen
        </button>
      </div>
    </div>
  );
}
