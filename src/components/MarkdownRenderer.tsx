import React from "react";
import { FiguraArticulo } from "./FiguraArticulo";

interface MarkdownRendererProps {
  content: string;
}

type Block =
  | { type: "h1" | "h2" | "h3" | "h4" | "p" | "blockquote"; lines: string[] }
  | { type: "ul" | "ol"; lines: string[] }
  | { type: "hr" }
  | { type: "figura"; id: string }
  | { type: "table"; head: string[]; rows: string[][] };

/** Estilos en línea: **negrita**, *cursiva*, _cursiva_, `código`, [enlace](url) y <br>. */
function inline(text: string, keyBase = "i"): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  // Primero separa saltos de línea escritos como <br>
  const segs = text.split(/<br\s*\/?>/gi);
  segs.forEach((seg, si) => {
    if (si > 0) out.push(<br key={`${keyBase}-br-${si}`} />);
    const re = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|_[^_\s][^_]*_|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
    let last = 0;
    let m: RegExpExecArray | null;
    let k = 0;
    while ((m = re.exec(seg))) {
      if (m.index > last) out.push(seg.slice(last, m.index));
      const t = m[0];
      const key = `${keyBase}-${si}-${k++}`;
      if (t.startsWith("**")) out.push(<strong key={key} className="font-bold text-[#1D2433]">{t.slice(2, -2)}</strong>);
      else if (t.startsWith("`")) out.push(<code key={key} className="font-sans text-[0.92em] bg-[#F6F7F8] px-1 rounded">{t.slice(1, -1)}</code>);
      else if (t.startsWith("[")) {
        const mm = t.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        out.push(
          <a key={key} href={mm?.[2]} target="_blank" rel="noopener noreferrer" className="text-[#0F5C4D] underline underline-offset-4">
            {mm?.[1]}
          </a>
        );
      } else out.push(<em key={key}>{t.slice(1, -1)}</em>);
      last = m.index + t.length;
    }
    if (last < seg.length) out.push(seg.slice(last));
  });
  // Quita etiquetas HTML sueltas que hayan quedado
  return out.map((n) => (typeof n === "string" ? n.replace(/<\/?[a-z][^>]*>/gi, "") : n));
}

const celdas = (row: string) =>
  row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  const lines = content.split("\n");
  const blocks: Block[] = [];
  let cur: Block | null = null;

  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (t === "") {
      cur = null;
      continue;
    }

    // Tabla: líneas que empiezan y terminan con |
    if (t.startsWith("|") && t.endsWith("|")) {
      const tabla: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tabla.push(lines[i].trim());
        i++;
      }
      i--;
      const filas = tabla.filter((r) => !/^\|\s*:?-{2,}/.test(r)).map(celdas);
      if (filas.length) blocks.push({ type: "table", head: filas[0], rows: filas.slice(1) });
      cur = null;
      continue;
    }

    const fig = t.match(/^\[\[figura:([\w-]+)\]\]$/);
    if (fig) {
      blocks.push({ type: "figura", id: fig[1] });
      cur = null;
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(t)) {
      blocks.push({ type: "hr" });
      cur = null;
      continue;
    }

    const h = t.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      blocks.push({ type: (`h${h[1].length}` as "h1" | "h2" | "h3" | "h4"), lines: [h[2]] });
      cur = null;
      continue;
    }

    if (t.startsWith("> ") || t === ">") {
      const text = t.replace(/^>\s?/, "");
      if (cur && cur.type === "blockquote") cur.lines.push(text);
      else {
        cur = { type: "blockquote", lines: [text] };
        blocks.push(cur);
      }
      continue;
    }

    const ul = t.match(/^[-*•]\s+(.*)$/);
    if (ul) {
      if (cur && cur.type === "ul") cur.lines.push(ul[1]);
      else {
        cur = { type: "ul", lines: [ul[1]] };
        blocks.push(cur);
      }
      continue;
    }

    const ol = t.match(/^(\d+)[.)]\s+(.*)$/);
    if (ol) {
      if (cur && cur.type === "ol") cur.lines.push(ol[2]);
      else {
        cur = { type: "ol", lines: [ol[2]] };
        blocks.push(cur);
      }
      continue;
    }

    if (cur && cur.type === "p") cur.lines.push(t);
    else {
      cur = { type: "p", lines: [t] };
      blocks.push(cur);
    }
  }

  return (
    <div className="space-y-6 text-[#1D2433]/90 leading-relaxed font-serif text-[18px] sm:text-[19px]">
      {blocks.map((b, idx) => {
        const key = `b-${idx}`;
        switch (b.type) {
          case "figura":
            return <FiguraArticulo key={key} id={b.id} />;
          case "h1":
            return <h1 key={key} className="font-display text-3xl font-bold text-[#1D2433] pt-4">{inline(b.lines[0], key)}</h1>;
          case "h2":
            return <h2 key={key} className="font-display text-2xl sm:text-[28px] font-bold text-[#1D2433] pt-4 tracking-[-0.015em]">{inline(b.lines[0], key)}</h2>;
          case "h3":
            return <h3 key={key} className="font-display text-xl sm:text-2xl font-bold text-[#1D2433] pt-4 pb-2 border-b border-[#E3E5E8] tracking-[-0.01em]">{inline(b.lines[0], key)}</h3>;
          case "h4":
            return <h4 key={key} className="font-display text-lg sm:text-xl font-semibold text-[#1D2433] pt-2">{inline(b.lines[0], key)}</h4>;
          case "blockquote":
            return (
              <blockquote key={key} className="border-l-[3px] border-[#1D2433] pl-5 py-1 my-5 italic font-serif text-[#1D2433]">
                {b.lines.map((l, i) => (
                  <p key={i}>{inline(l, `${key}-${i}`)}</p>
                ))}
              </blockquote>
            );
          case "ul":
            return (
              <ul key={key} className="list-disc pl-6 space-y-2 py-1">
                {b.lines.map((l, i) => (
                  <li key={i} className="pl-1">{inline(l, `${key}-${i}`)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={key} className="list-decimal pl-6 space-y-2 py-1">
                {b.lines.map((l, i) => (
                  <li key={i} className="pl-1">{inline(l, `${key}-${i}`)}</li>
                ))}
              </ol>
            );
          case "hr":
            return <hr key={key} className="border-0 border-t border-[#E3E5E8] my-8" />;
          case "table":
            return (
              <div key={key} className="overflow-x-auto -mx-1">
                <table className="w-full text-left font-sans text-[15px] sm:text-[16px] border-collapse min-w-[560px]">
                  <thead>
                    <tr>
                      {b.head.map((c, i) => (
                        <th key={i} className="font-semibold text-[#1D2433] bg-[#F6F7F8] px-3 py-2.5 border-b-[1.5px] border-[#1D2433] align-bottom">
                          {inline(c, `${key}-h${i}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, ri) => (
                      <tr key={ri} className="border-b border-[#E3E5E8]">
                        {r.map((c, ci) => (
                          <td key={ci} className="px-3 py-2.5 align-top text-[#1D2433]/90 leading-snug">
                            {inline(c, `${key}-${ri}-${ci}`)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "p":
          default:
            return (
              <p key={key} className="leading-[1.75]">
                {inline((b as { lines: string[] }).lines.join(" "), key)}
              </p>
            );
        }
      })}
    </div>
  );
}
