// Única fuente del dominio público. Se configura con NEXT_PUBLIC_SITE_URL.
// En builds de producción es obligatorio: sin él, canonical/sitemap/OG saldrían mal.
function resolveSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (raw) return raw.replace(/\/+$/, "");
  if (process.env.NODE_ENV === "production") {
    throw new Error("Falta NEXT_PUBLIC_SITE_URL (ver .env.example).");
  }
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
