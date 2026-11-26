import f400 from "@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-400-normal.woff2?url";
import f500 from "@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-500-normal.woff2?url";
import f600 from "@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-600-normal.woff2?url";
import f700 from "@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-700-normal.woff2?url";
import f800 from "@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff2?url";

let fontCss: string | null = null;
export async function cssFuentes() {
  if (fontCss !== null) return fontCss;
  try {
    const pares: [string, number][] = [[f400, 400], [f500, 500], [f600, 600], [f700, 700], [f800, 800]];
    const partes = await Promise.all(
      pares.map(async ([url, w]) => {
        const buf = await (await fetch(url)).arrayBuffer();
        let bin = "";
        const bytes = new Uint8Array(buf);
        for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
        return `@font-face{font-family:'Bricolage Grotesque';src:url(data:font/woff2;base64,${btoa(bin)}) format('woff2');font-weight:${w}}`;
      })
    );
    fontCss = partes.join("");
  } catch {
    fontCss = "";
  }
  return fontCss;
}

export async function svgAPng(svg: SVGSVGElement, w: number, h: number): Promise<Blob> {
  const clon = svg.cloneNode(true) as SVGSVGElement;
  clon.querySelectorAll("[data-ui]").forEach((n) => n.remove());
  clon.setAttribute("width", String(w));
  clon.setAttribute("height", String(h));
  const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
  style.textContent = await cssFuentes();
  clon.insertBefore(style, clon.firstChild);
  const xml = new XMLSerializer().serializeToString(clon);
  const url = URL.createObjectURL(new Blob([xml], { type: "image/svg+xml;charset=utf-8" }));
  try {
    const img = new Image();
    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = () => rej(new Error("img"));
      img.src = url;
    });
    const cv = document.createElement("canvas");
    cv.width = w;
    cv.height = h;
    const ctx = cv.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    return await new Promise<Blob>((res, rej) => cv.toBlob((b) => (b ? res(b) : rej(new Error("blob"))), "image/png"));
  } finally {
    URL.revokeObjectURL(url);
  }
}

