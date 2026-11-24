"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { whatsappLink } from "@/lib/whatsapp";
import { LEAD_ENDPOINT } from "@/lib/lead";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Arrow({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10h11m0 0l-4.5-4.5M15 10l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Tamaño móvil = por debajo del breakpoint `md` de Tailwind.
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

/**
 * variant="section": botón de cotización de Planes/Retainer. En escritorio despliega un panel
 *   en línea; en móvil abre un modal.
 * variant="hero": botón del hero. En escritorio es un enlace directo a WhatsApp; en móvil abre
 *   el mismo modal de opciones.
 */
export default function QuoteCTA({
  copy,
  source = "planes-cotizacion-a-medida",
  variant = "section",
  whatsappMessage,
  label,
}) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("choice"); // choice | email | done
  const rootRef = useRef(null);
  const dialogRef = useRef(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | invalid | error

  const message = whatsappMessage || copy.whatsappMessage;
  const buttonText = label || copy.button;
  const asModal = isMobile;

  async function onSubmit(e) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: email.trim(), source, _subject: "Nueva solicitud de cotización - anvynt" }),
      });
      if (!res.ok) throw new Error("bad status");
      setStep("done");
      setStatus("idle");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  // Si se cruza el breakpoint con algo abierto, se cierra para no dejar estados cruzados.
  useEffect(() => {
    setOpen(false);
  }, [asModal]);

  // Al cerrar se reinicia al paso inicial tras la transición.
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setStep("choice");
      setStatus("idle");
    }, 350);
    return () => clearTimeout(t);
  }, [open]);

  // Panel en línea (escritorio): clic fuera o Escape lo cierran.
  useEffect(() => {
    if (!open || asModal) return;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, asModal]);

  // Modal (móvil): Escape, scroll bloqueado, foco atrapado y devuelto al botón.
  useEffect(() => {
    if (!open || !asModal) return;
    const previouslyFocused = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
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
  }, [open, asModal]);

  const optionClass =
    "flex w-full items-center justify-between gap-3 rounded-full border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  const steps = (
    <div>
      {step === "choice" && (
        <div className="space-y-3">
          <p className="text-center text-sm text-white/70">{copy.choiceTitle}</p>
          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className={`${optionClass} border-whatsapp bg-whatsapp text-white hover:bg-whatsapp/90 focus-visible:outline-whatsapp`}
          >
            {copy.whatsapp}
            <Arrow className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setStep("email")}
            className={`${optionClass} border-white/20 text-white hover:border-brand hover:text-brand focus-visible:outline-brand`}
          >
            {copy.email}
            <Arrow className="h-4 w-4" />
          </button>
        </div>
      )}

      {step === "email" && (
        <form onSubmit={onSubmit} noValidate className="space-y-3">
          <label htmlFor={`quote-email-${variant}`} className="block text-sm text-white/70">
            {copy.emailLabel}
          </label>
          <input
            id={`quote-email-${variant}`}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "sending") setStatus("idle");
            }}
            placeholder={copy.emailPlaceholder}
            aria-invalid={status === "invalid"}
            className="w-full rounded-full border border-white/20 bg-ink px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand focus:outline-none"
          />
          {(status === "invalid" || status === "error") && (
            <p role="alert" className="text-sm text-red-400">
              {status === "invalid" ? copy.invalid : copy.error}
            </p>
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setStep("choice");
                setStatus("idle");
              }}
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white/80 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {copy.back}
            </button>
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex-1 rounded-full bg-brand px-5 py-3 text-sm font-bold text-ink transition-opacity hover:opacity-90 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {status === "sending" ? copy.sending : copy.submit}
            </button>
          </div>
        </form>
      )}

      {step === "done" && (
        <p role="status" className="text-center text-sm text-brand">
          {copy.success}
        </p>
      )}
    </div>
  );

  const modal = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={buttonText}
        tabIndex={-1}
        className="plan-modal-in relative w-[min(22rem,100%)] rounded-2xl border border-white/10 bg-carbon p-5 shadow-2xl shadow-black/50 focus:outline-none"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={copy.closeLabel}
          className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>
        <div className="pt-4">{steps}</div>
      </div>
    </div>
  );

  // ---- Hero ----
  if (variant === "hero") {
    const heroClass =
      "inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-brand to-emerald-300 px-7 py-3.5 text-base font-bold text-navy shadow-[0_0_30px_-4px_rgba(0,216,222,0.6)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
    const heroArrow = (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
    if (!asModal) {
      // Escritorio: popover bajo el botón (no empuja el resto del hero).
      return (
        <div ref={rootRef} className="relative">
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded={open}
            aria-controls="quote-options-hero"
            onClick={() => setOpen((v) => !v)}
            className={heroClass}
          >
            {buttonText}
            {heroArrow}
          </button>
          <div
            id="quote-options-hero"
            aria-hidden={!open}
            inert={!open ? "" : undefined}
            className={`absolute left-0 top-full z-30 mt-3 w-[22rem] max-w-[calc(100vw-2rem)] origin-top-left rounded-2xl border border-white/10 bg-carbon p-5 shadow-2xl shadow-black/50 transition-[opacity,transform] duration-200 ease-out ${
              open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
            }`}
          >
            {steps}
          </div>
        </div>
      );
    }
    return (
      <>
        <button type="button" aria-haspopup="dialog" onClick={() => setOpen(true)} className={heroClass}>
          {buttonText}
          {heroArrow}
        </button>
        {open && createPortal(modal, document.body)}
      </>
    );
  }

  // ---- Sección (Planes / Retainer) ----
  const triggerClass =
    "group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-brand bg-brand px-[30px] text-base font-semibold leading-none text-ink transition-[background-color,border-color] duration-300 ease-in-out hover:border-[#8fe8ea] hover:bg-[#8fe8ea] focus-visible:border-[#8fe8ea] focus-visible:bg-[#8fe8ea] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand";
  const chevron = (
    <svg
      aria-hidden="true"
      viewBox="0 0 7 13"
      fill="none"
      className="h-[11px] w-[6px] shrink-0 transition-transform duration-300 ease-in-out group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
    >
      <path d="M.642.595 5.72 6.071.642 11.547" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );

  if (asModal) {
    return (
      <div className="mt-14 flex w-full flex-col items-center">
        <button type="button" aria-haspopup="dialog" onClick={() => setOpen(true)} className={triggerClass}>
          <span>{buttonText}</span>
          {chevron}
        </button>
        {open && createPortal(modal, document.body)}
      </div>
    );
  }

  return (
    <div className="mt-14 flex w-full flex-col items-center">
      {/* Botón y panel se intercambian dentro del flujo: nunca se superponen a las tarjetas */}
      <div
        aria-hidden={open}
        inert={open ? "" : undefined}
        className={`grid justify-items-center transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
        }`}
      >
        <div className="min-h-0 overflow-hidden p-2">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="quote-options"
            onClick={() => setOpen((v) => !v)}
            className={triggerClass}
          >
            <span>{buttonText}</span>
            {chevron}
          </button>
        </div>
      </div>

      <div
        id="quote-options"
        aria-hidden={!open}
        inert={!open ? "" : undefined}
        className={`grid w-full justify-items-center transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 w-full overflow-hidden p-1">
          <div ref={rootRef} className="mx-auto w-[min(22rem,100%)] rounded-2xl border border-white/10 bg-carbon p-5">
            {steps}
          </div>
        </div>
      </div>
    </div>
  );
}
