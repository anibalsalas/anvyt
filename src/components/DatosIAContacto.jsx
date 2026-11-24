"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { whatsappLink } from "@/lib/whatsapp";

const MAX_CHARS = 500;

function CasoModal({ d, onClose }) {
  const dialogRef = useRef(null);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector("textarea")?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = dialogRef.current?.querySelectorAll("button:not([disabled]), textarea");
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  function onSubmit(e) {
    e.preventDefault();
    const caso = text.trim();
    if (!caso) {
      setError(true);
      return;
    }
    // Código de referencia único por envío: tag fijo + fecha (AAMMDD) + 4 caracteres aleatorios.
    const now = new Date();
    const stamp = `${String(now.getFullYear()).slice(2)}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    const ref = `${d.refTag}-${stamp}-${rand}`;
    const url = whatsappLink(
      `[${ref}]\n${d.messagePrefix}\n\n${caso}`,
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_DATOS
    );
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="caso-modal-title"
        className="plan-modal-in relative w-full max-w-md rounded-2xl border border-white/10 bg-carbon p-6 shadow-2xl shadow-black/50"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={d.closeLabel}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>

        <h3 id="caso-modal-title" className="pr-8 text-xl font-bold text-white">
          {d.modalTitle}
        </h3>
        <p className="mt-2 text-sm text-white/65">{d.modalHint}</p>

        <form onSubmit={onSubmit} noValidate className="mt-5 space-y-3">
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError(false);
            }}
            maxLength={MAX_CHARS}
            rows={5}
            placeholder={d.placeholder}
            aria-label={d.modalTitle}
            aria-invalid={error}
            className="w-full resize-none rounded-2xl border border-white/20 bg-ink px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand focus:outline-none"
          />
          <div className="flex items-center justify-between text-xs">
            <span role="alert" className="text-red-400">
              {error ? d.empty : ""}
            </span>
            <span className="font-mono text-white/40">
              {text.length}/{MAX_CHARS}
            </span>
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-whatsapp/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
          >
            {d.send}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default function DatosIAContacto({ d }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-whatsapp/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
      >
        {d.cta}
      </button>
      {open && <CasoModal d={d} onClose={() => setOpen(false)} />}
    </>
  );
}
