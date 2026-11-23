import { getDictionary } from "@/i18n";

export function getCasoBySlug(locale, slug) {
  const copy = getDictionary(locale);
  return copy.casos.items.find((item) => item.slug === slug) ?? null;
}

export function getAllCasosSlugs() {
  const copy = getDictionary("es");
  return copy.casos.items.map((item) => ({ slug: item.slug }));
}
