"""Genera lo necesario para compartir cada infografía sin perder calidad.

Por cada infografía de src/data/infografias.ts crea, dentro de public/:
  infografias/<slug>.pdf          PDF de una página con la imagen original, sin recomprimir
  infografias/partes/<slug>-1.jpg y -2.jpg   la imagen en dos mitades que WhatsApp no achica
  infografias/og/<slug>.jpg       vista previa 1200×630 para cuando se comparte el link
  i/<slug>.html                   página con la vista previa que luego abre la infografía en la app

Uso:  python3 scripts/infografias_compartir.py
(Hay que correrlo cada vez que se agrega una infografía.)
"""
import html
import io
import re
import sys
from pathlib import Path

import img2pdf
from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
SITE = "https://myokine.web.app"
DATA = RAIZ / "src/data/infografias.ts"
PUB = RAIZ / "public"


def leer_infografias():
    src = DATA.read_text(encoding="utf-8")
    imports = dict(re.findall(r"import (\w+) from '\.\./assets/images/infografias/([^']+)';", src))
    out = []
    for bloque in re.findall(r"\{[^{}]*slug:[^{}]*\}", src):
        if "image: string" in bloque:
            continue
        g = lambda k: (re.search(rf'{k}:\s*(["\'])(.*?)\1,', bloque, re.S) or [None, None, ""])[2]
        var = re.search(r"image:\s*(\w+)", bloque).group(1)
        out.append(
            {
                "slug": g("slug"),
                "title": g("title"),
                "description": g("description"),
                "topic": g("topic"),
                "file": RAIZ / "src/assets/images/infografias" / imports[var],
            }
        )
    return out


def fila_de_corte(im: Image.Image) -> int:
    """Busca, cerca de la mitad, una fila 'vacía' (casi del mismo color) para cortar sin partir texto."""
    g = im.convert("L")
    w, h = g.size
    mejor, puntaje = h // 2, 1e9
    for y in range(int(h * 0.42), int(h * 0.58)):
        fila = g.crop((0, y, w, y + 1)).getdata()
        lo, hi = min(fila), max(fila)
        p = (hi - lo) + abs(y - h // 2) * 0.02
        if p < puntaje:
            mejor, puntaje = y, p
    return mejor


def pdf(inf, destino: Path):
    im = Image.open(inf["file"])
    w, h = im.size
    ancho_mm = 120
    layout = img2pdf.get_layout_fun((img2pdf.mm_to_pt(ancho_mm), img2pdf.mm_to_pt(ancho_mm * h / w)))
    datos = img2pdf.convert(
        str(inf["file"]),
        layout_fun=layout,
        title=f'{inf["title"]} · MyoKine',
        author="MyoKine",
        subject=inf["description"],
    )
    destino.write_bytes(datos)


def partes(inf, carpeta: Path):
    im = Image.open(inf["file"]).convert("RGB")
    corte = fila_de_corte(im)
    w, h = im.size
    for i, caja in enumerate([(0, 0, w, corte), (0, corte, w, h)], start=1):
        im.crop(caja).save(carpeta / f'{inf["slug"]}-{i}.jpg', quality=92, subsampling=0, optimize=True)


PAGINA = """<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{titulo} · Infografía MyoKine</title>
<meta name="description" content="{desc}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="MyoKine">
<meta property="og:title" content="{titulo}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{site}/i/{slug}">
<meta property="og:image" content="{site}/infografias/og/{slug}.jpg">
<meta property="og:image:secure_url" content="{site}/infografias/og/{slug}.jpg">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Infografía: {titulo}">
<meta property="og:locale" content="es_CL">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="{site}/infografias/og/{slug}.jpg">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta http-equiv="refresh" content="0; url=/#/infografias/{slug}">
<script>location.replace("/#/infografias/{slug}");</script>
<style>body{{font-family:system-ui,sans-serif;margin:0;padding:24px;color:#1D2433}}img{{max-width:100%;height:auto}}a{{color:#0F5C4D}}</style>
</head>
<body>
<p><a href="/#/infografias/{slug}">Abrir la infografía “{titulo}” en MyoKine</a></p>
<img src="/infografias/og/{slug}.jpg" alt="{titulo}" width="1200" height="630">
</body>
</html>
"""


def og_html(inf, imagen_uri: str, fuente: Path) -> str:
    t = html.escape(inf["title"])
    d = html.escape(inf["description"])
    tema = html.escape(inf["topic"])
    f = fuente.as_uri()
    return f"""<html><head><style>
@font-face{{font-family:B;src:url({f}/bricolage-grotesque-latin-700-normal.woff2);font-weight:700}}
@font-face{{font-family:B;src:url({f}/bricolage-grotesque-latin-500-normal.woff2);font-weight:500}}
@font-face{{font-family:B;src:url({f}/bricolage-grotesque-latin-800-normal.woff2);font-weight:800}}
*{{box-sizing:border-box;margin:0}}
body{{width:1200px;height:630px;background:#fff;font-family:B;position:relative;overflow:hidden}}
.txt{{position:absolute;left:72px;top:64px;width:640px;height:502px;display:flex;flex-direction:column}}
.marca{{font-weight:800;font-size:30px;color:#0F5C4D}}
.tema{{display:inline-block;margin-top:34px;font-weight:700;font-size:24px;color:#1D2433;background:#F5E663;padding:4px 14px;border-radius:8px;align-self:flex-start}}
h1{{font-weight:800;font-size:64px;line-height:1.04;color:#1D2433;margin-top:22px;letter-spacing:-1px}}
p{{font-weight:500;font-size:27px;line-height:1.32;color:#5A6170;margin-top:22px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}}
.pie{{margin-top:auto;font-weight:700;font-size:22px;color:#0F5C4D}}
.img{{position:absolute;right:64px;top:48px;width:380px;height:640px;border-radius:22px;overflow:hidden;box-shadow:0 10px 40px rgba(29,36,51,.18);border:1px solid #E3E5E8}}
.img img{{width:100%;display:block}}
</style></head><body>
<div class="txt"><div class="marca">MyoKine</div><span class="tema">Para pacientes · {tema}</span><h1>{t}</h1><p>{d}</p><div class="pie">Infografía basada en evidencia · Toca para verla completa</div></div>
<div class="img"><img src="{imagen_uri}"></div>
</body></html>"""


def main():
    infs = leer_infografias()
    if not infs:
        sys.exit("No encontré infografías")
    (PUB / "infografias/partes").mkdir(parents=True, exist_ok=True)
    (PUB / "infografias/og").mkdir(parents=True, exist_ok=True)
    (PUB / "i").mkdir(parents=True, exist_ok=True)
    fuente = RAIZ / "node_modules/@fontsource/bricolage-grotesque/files"

    from playwright.sync_api import sync_playwright

    with sync_playwright() as p:
        nav = p.chromium.launch()
        pag = nav.new_page(viewport={"width": 1200, "height": 630})
        for inf in infs:
            s = inf["slug"]
            pdf(inf, PUB / f"infografias/{s}.pdf")
            partes(inf, PUB / "infografias/partes")
            tmp = Path("/tmp") / f"og-{s}.html"
            tmp.write_text(og_html(inf, inf["file"].as_uri(), fuente), encoding="utf-8")
            pag.goto(tmp.as_uri())
            pag.wait_for_timeout(250)
            png = pag.screenshot(type="png")
            Image.open(io.BytesIO(png)).convert("RGB").save(PUB / f"infografias/og/{s}.jpg", quality=86, optimize=True)
            (PUB / f"i/{s}.html").write_text(
                PAGINA.format(titulo=html.escape(inf["title"]), desc=html.escape(inf["description"]), slug=s, site=SITE),
                encoding="utf-8",
            )
            print("listo", s)
        nav.close()


if __name__ == "__main__":
    main()
