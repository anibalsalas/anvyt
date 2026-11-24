// `number` permite usar un número distinto al general (p. ej. formulario de datos/IA);
// si no se indica, se usa NEXT_PUBLIC_WHATSAPP_NUMBER.
export function whatsappLink(message, number) {
  const target = number || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!target && process.env.NODE_ENV === "production") {
    throw new Error("Falta NEXT_PUBLIC_WHATSAPP_NUMBER (ver .env.example).");
  }
  const params = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${target ?? ""}${params}`;
}
