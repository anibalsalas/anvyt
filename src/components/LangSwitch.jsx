"use client";

import { useEffect, useRef, useState } from "react";

function FlagUS() {
  return (
    <svg viewBox="0 0 60 60" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="60" height="60" fill="#B22234" />
      <rect y="8.6" width="60" height="4.6" fill="#fff" />
      <rect y="17.8" width="60" height="4.6" fill="#fff" />
      <rect y="27" width="60" height="4.6" fill="#fff" />
      <rect y="36.2" width="60" height="4.6" fill="#fff" />
      <rect y="45.4" width="60" height="4.6" fill="#fff" />
      <rect width="26" height="32.3" fill="#3C3B6E" />
    </svg>
  );
}

function FlagPE() {
  return (
    <svg viewBox="0 0 60 60" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="20" height="60" fill="#D91023" />
      <rect x="20" width="20" height="60" fill="#fff" />
      <rect x="40" width="20" height="60" fill="#D91023" />
    </svg>
  );
}

const LOCALES = {
  es: { code: "es", label: "ES", Flag: FlagPE },
  en: { code: "en", label: "EN", Flag: FlagUS },
};

export default function LangSwitch({ locale, href, label, listLabel }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const current = LOCALES[locale] ?? LOCALES.es;
  const otherCode = locale === "es" ? "en" : "es";
  const other = LOCALES[otherCode];

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-white/20 py-1 pl-1 pr-2.5 transition-transform hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full sm:h-6 sm:w-6">
          <current.Flag />
        </span>
        <span className="font-display text-xs font-medium uppercase tracking-wide text-white">
          {current.code}
        </span>
        <svg
          viewBox="0 0 10 6"
          width="8"
          height="5"
          aria-hidden="true"
          className={`shrink-0 text-white/60 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={listLabel}
          className="absolute right-0 top-full z-50 mt-2 min-w-[8rem] overflow-hidden rounded-xl border border-carbon/10 bg-white py-1 shadow-lg"
        >
          <li role="option" aria-selected="true">
            <span className="flex w-full items-center gap-2 bg-carbon/5 px-3 py-1.5 font-display text-sm text-carbon">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden rounded-full">
                <current.Flag />
              </span>
              {current.label}
            </span>
          </li>
          <li role="option" aria-selected="false">
            <a
              href={href}
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2 px-3 py-1.5 font-display text-sm text-carbon transition-colors hover:bg-carbon/5"
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden rounded-full">
                <other.Flag />
              </span>
              {other.label}
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}
