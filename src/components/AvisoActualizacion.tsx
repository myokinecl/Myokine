import { useEffect, useState } from "react";

declare const __BUILD_ID__: string;

/**
 * Avisa cuando hay una versión nueva publicada.
 * La app guardada en el celular puede quedar abierta días en segundo plano;
 * al volver a ella (o cada 10 minutos) revisa /version.json y, si cambió, ofrece actualizar.
 */
export function AvisoActualizacion() {
  const [hayNueva, setHayNueva] = useState(false);

  useEffect(() => {
    if (typeof __BUILD_ID__ === "undefined" || import.meta.env.DEV) return;
    let vivo = true;
    const revisar = async () => {
      try {
        const r = await fetch(`/version.json?t=${Date.now()}`, { cache: "no-store" });
        if (!r.ok) return;
        const { build } = await r.json();
        if (vivo && build && build !== __BUILD_ID__) setHayNueva(true);
      } catch {
        /* sin conexión: se vuelve a intentar después */
      }
    };
    const alVolver = () => {
      if (document.visibilityState === "visible") revisar();
    };
    document.addEventListener("visibilitychange", alVolver);
    window.addEventListener("focus", revisar);
    const t = window.setInterval(revisar, 10 * 60 * 1000);
    revisar();
    return () => {
      vivo = false;
      document.removeEventListener("visibilitychange", alVolver);
      window.removeEventListener("focus", revisar);
      window.clearInterval(t);
    };
  }, []);

  if (!hayNueva) return null;
  return (
    <div className="fixed inset-x-0 bottom-4 z-[70] flex justify-center px-4 print:hidden" role="status">
      <div className="flex items-center gap-3 rounded-2xl bg-[#1D2433] text-white pl-4 pr-2 py-2 shadow-lg max-w-md w-full">
        <span className="text-[15px] flex-1">Hay contenido nuevo en MyoKine.</span>
        <button
          onClick={() => window.location.reload()}
          className="rounded-xl bg-[#F5E663] text-[#1D2433] font-semibold text-[15px] px-4 py-2"
        >
          Actualizar
        </button>
        <button onClick={() => setHayNueva(false)} aria-label="Cerrar" className="px-2 text-white/70 text-lg">
          ×
        </button>
      </div>
    </div>
  );
}
