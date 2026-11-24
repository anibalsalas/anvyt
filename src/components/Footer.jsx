import Image from "next/image";
import { whatsappLink } from "@/lib/whatsapp";

export default function Footer({ copy, locale }) {
  const year = new Date().getFullYear();
  const homeHref = locale === "es" ? "/" : "/en/";

  return (
    <footer className="relative overflow-hidden bg-ink px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-30" />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <Image
            src="/brand/logo.webp"
            alt={copy.nav.brand}
            width={640}
            height={126}
            className="h-9 w-auto"
          />
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-display text-sm tracking-wide">
            {copy.nav.links.map((link) => (
              <li key={link.href}>
                <a href={`${homeHref}${link.href}`} className="text-white/70 transition-colors hover:text-brand">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <span>{copy.footer.text.replace("{year}", String(year))}</span>
          <span className="flex items-center gap-3">
            <span>{copy.footer.location}</span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <a
              href={whatsappLink(copy.whatsapp.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-brand"
            >
              {copy.nav.cta}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
