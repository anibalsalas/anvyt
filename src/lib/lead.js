// Destino de los correos dejados en el formulario de cotización.
// FormSubmit reenvía el envío a este buzón sin backend propio (la primera vez pide confirmar el buzón).
// NEXT_PUBLIC_LEAD_ENDPOINT permite reemplazarlo por otro servicio (p. ej. Formspree).
export const CONTACT_EMAIL = "contacto@anvyt.com";
export const LEAD_ENDPOINT =
  process.env.NEXT_PUBLIC_LEAD_ENDPOINT || `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;
