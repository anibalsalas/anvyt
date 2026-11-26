import { whatsappLink } from "@/lib/whatsapp";

/**
 * Botón de cotización: enlace directo a WhatsApp (único canal de contacto).
 * variant="hero": estilo del hero. variant="section": estilo de Planes/Retainer.
 */
export default function QuoteCTA({ copy, variant = "section", whatsappMessage, label }) {
  const href = whatsappLink(whatsappMessage || copy.whatsappMessage);
  const buttonText = label || copy.button;

  if (variant === "hero") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-brand to-emerald-300 px-7 py-3.5 text-base font-bold text-navy shadow-[0_0_30px_-4px_rgba(0,216,222,0.6)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        {buttonText}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    );
  }

  return (
    <div className="mt-14 flex w-full flex-col items-center">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-brand bg-brand px-[30px] text-base font-semibold leading-none text-ink transition-[background-color,border-color] duration-300 ease-in-out hover:border-[#8fe8ea] hover:bg-[#8fe8ea] focus-visible:border-[#8fe8ea] focus-visible:bg-[#8fe8ea] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      >
        <span>{buttonText}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 7 13"
          fill="none"
          className="h-[11px] w-[6px] shrink-0 transition-transform duration-300 ease-in-out group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
        >
          <path d="M.642.595 5.72 6.071.642 11.547" stroke="currentColor" strokeWidth="1.75" />
        </svg>
      </a>
    </div>
  );
}
