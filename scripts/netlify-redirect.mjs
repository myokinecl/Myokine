// Genera el sitio mínimo de Netlify que solo redirige a myokine.web.app conservando la ruta.
import { mkdirSync, writeFileSync } from "node:fs";
mkdirSync("netlify-dist", { recursive: true });
writeFileSync("netlify-dist/_redirects", "/*  https://myokine.web.app/:splat  301!\n");
writeFileSync(
  "netlify-dist/index.html",
  `<!doctype html><meta charset="utf-8"><title>MyoKine se mudó</title>
<script>location.replace("https://myokine.web.app" + location.pathname + location.search + location.hash);</script>
<p>MyoKine ahora está en <a href="https://myokine.web.app">myokine.web.app</a></p>`
);
console.log("Sitio de redirección listo");
