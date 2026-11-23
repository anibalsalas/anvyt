# anvynt — Contexto del proyecto

(Antes ALNIV; renombrado a **anvynt**, siempre en minúsculas como en el logo.)

## Stack
- Next.js 14 (App Router), export estático (`output: "export"` en [next.config.mjs](next.config.mjs)).
- Tailwind CSS 3, sin librerías de componentes.
- Sin backend/API routes: el sitio compila a HTML/CSS/JS estático en `out/`.

## Estructura real
```
src/
  app/
    (es)/           # grupo de rutas en español (raíz): layout.js, page.js, casos/[slug], 404
    en/             # versión en inglés: layout.js, page.js, casos/[slug]
    fonts.js, globals.css, manifest.js, robots.js, sitemap.js
    icon.png, apple-icon.png, opengraph-image.png   # generados (ver scripts/)
  components/       # Nav, Hero, Nosotros, Planes, Beneficios, Casos, CasoDetalle, Retainer,
                    # Footer, LangSwitch, WhatsAppFloatingButton (+ PlanCard; Servicios sin uso)
  i18n/             # es.json, en.json, index.js — única fuente de textos
  lib/              # whatsapp.js (link wa.me), site.js (dominio/GA por env),
                    # casos.js, organizationSchema.js
  brand/            # logotipo.png (cian, transparente) y logot.png (fondo navy): masters, no se sirven
public/brand, icons # derivados servibles: logo.webp, mark.webp, icon-192/512
scripts/
  gen-brand-assets.js  # genera logo.webp, mark.webp, iconos y opengraph-image desde src/brand.
                       # Ejecutar solo si cambian los logos maestros.
  gen-hero-bg.js       # genera public/images/fondoh.webp desde src/images/fondoh.png
out/                # build estático generado (no editar a mano)
```
Orden de secciones en la home: Hero → Nosotros → Planes → Beneficios → Casos → Retainer → Footer.

## Regla i18n
- Todo texto visible (incluidos `aria-label`, `alt` y manifest) vive en `src/i18n/` — nada hardcodeado en componentes.
- Español es la raíz (`es.json`, ruta `/`); inglés en `en.json` bajo `/en/`.
- `es.json` y `en.json` deben mantener exactamente las mismas claves.

## Paleta
Definida en [tailwind.config.js](tailwind.config.js):
- `brand` `#00D8DE` — cian del logo (acento sobre fondos oscuros)
- `ink` `#14171B`, `carbon` `#24272C` — fondos/texto principal
- `accent` `#2196F3` (+ `accent-deep`, `accent-light`) — acento estructural
- `whatsapp` `#25D366` — CTA de WhatsApp
- Tipografía: Figtree (texto y títulos, clase `font-display` para títulos), JetBrains Mono. Nav y footer son oscuros (el logo es cian).

## Variables de entorno (ver `.env.example`; local en `.env.local`, no se commitea)
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — número internacional sin "+". Obligatoria en build de producción.
- `NEXT_PUBLIC_SITE_URL` — dominio público sin "/" final (canonical, sitemap, OG, JSON-LD). Obligatoria en producción.
- `NEXT_PUBLIC_GA_ID` — opcional, GA4; vacío = sin analítica.

## Canal de contacto
- Un único canal: WhatsApp.
- Toda construcción de link pasa por `whatsappLink()` en [src/lib/whatsapp.js](src/lib/whatsapp.js).
- No agregar formularios, email u otros canales sin decisión explícita.

## Gates
- `npm run lint` y `npm run build` en verde antes de dar por cerrada una tarea.
- Aviso conocido e inocuo: Next emite un warning `metadataBase` desde su página interna `_not-found`.
- Previsualizar el build con `npx serve out` (`next start` no aplica con export estático).
