export function whatsappLink(message) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!number && process.env.NODE_ENV === "production") {
    throw new Error("Falta NEXT_PUBLIC_WHATSAPP_NUMBER (ver .env.example).");
  }
  const params = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number ?? ""}${params}`;
}
