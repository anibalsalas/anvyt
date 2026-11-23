import es from "./es.json";
import en from "./en.json";

const dictionaries = { es, en };

export function getDictionary(locale) {
  return dictionaries[locale] ?? dictionaries.es;
}
