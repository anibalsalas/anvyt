"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import LangSwitch from "@/components/LangSwitch";

export default function Nav({ copy, locale, otherLocaleHref }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const homeHref = locale === "es" ? "/" : "/en/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
        scrolled ? "bg-ink shadow-lg shadow-black/30" : "bg-ink/80 backdrop-blur-md"
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300 ease-out sm:px-6 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        <a href={homeHref} className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo.webp"
            alt={copy.nav.brand}
            width={640}
            height={126}
            priority
            className={`w-auto transition-all duration-300 ease-out ${scrolled ? "h-6" : "h-8"}`}
          />
        </a>

        <div className="flex items-center gap-2 sm:hidden">
          <LangSwitch locale={locale} href={otherLocaleHref} label={copy.nav.langLabel} listLabel={copy.nav.langListLabel} />
          <button
            type="button"
            aria-label={copy.nav.menuLabel}
            aria-expanded={open}
            className="flex flex-col gap-1.5 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-8">
          <ul className="flex items-center gap-6 font-display text-sm tracking-wide">
            {copy.nav.links.map((link, i) => (
              <li key={link.href} className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <a href={`${homeHref}${link.href}`} className="text-white/80 hover:text-brand transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <LangSwitch locale={locale} href={otherLocaleHref} label={copy.nav.langLabel} listLabel={copy.nav.langListLabel} />
        </div>
      </nav>

      {open && (
        <div className="sm:hidden border-t border-white/10 bg-ink px-4 pb-4">
          <ul className="flex flex-col gap-4 pt-4 font-display text-base">
            {copy.nav.links.map((link, i) => (
              <li key={link.href} className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <a
                  href={`${homeHref}${link.href}`}
                  className="text-white/80 hover:text-brand transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
