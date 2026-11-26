/** Figuras que resumen un paper dentro del artículo. Se dibujan en SVG con el diseño de la app. */

export type Barra = { label: string; valores: number[]; nota?: string };

export type Figura = {
  id: string;
  titulo: string;
  bajada?: string;
  fuente: string;
} & (
  | {
      tipo: "barras";
      unidad?: string;
      max?: number;
      series?: string[];
      items: Barra[];
    }
  | { tipo: "pasos"; items: { titulo: string; texto: string }[] }
  | { tipo: "cifras"; items: { valor: string; texto: string }[] }
  | {
      tipo: "espectro";
      izq: { titulo: string; puntos: string[] };
      der: { titulo: string; puntos: string[] };
      centro?: string;
    }
  | { tipo: "radar"; ejes: string[]; perfiles: { nombre: string; valores: number[] }[] }
  | {
      tipo: "curva";
      ejeX: string;
      ejeY: string;
      puntos: [number, number][];
      ticksX: number[];
      zonas?: { desde: number; hasta: number; texto: string }[];
    }
  | { tipo: "lista"; columnas: { titulo: string; puntos: string[]; tono?: "verde" | "gris" }[] }
);

export type FormatoFigura = "v" | "h";
export const TAMANOS: Record<FormatoFigura, { w: number; h: number }> = {
  v: { w: 1080, h: 1350 },
  h: { w: 1920, h: 1080 },
};
