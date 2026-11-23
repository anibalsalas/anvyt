"use client";

import { useEffect, useRef, useState } from "react";
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

export default function QuoteCTA({ copy }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("choice"); // choice | email | done
  const rootRef = useRef(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | invalid | error

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
        body: JSON.stringify({ email: email.trim(), source: "planes-cotizacion-a-medida", _subject: "Nueva solicitud de cotización - anvynt" }),
      });
      if (!res.ok) throw new Error("bad status");
      setStep("done");
      setStatus("idle");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  // Clic fuera o Escape cierran el panel; al terminar la transición se reinicia al paso inicial.
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStep("choice");
        setStatus("idle");
      }, 350);
      return () => clearTimeout(t);
    }
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
  }, [open]);

  const optionClass =
    "flex w-full items-center justify-between gap-3 rounded-full border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

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
            className="group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-brand bg-brand px-[30px] text-base font-semibold leading-none text-ink transition-[background-color,border-color] duration-300 ease-in-out hover:border-[#8fe8ea] hover:bg-[#8fe8ea] focus-visible:border-[#8fe8ea] focus-visible:bg-[#8fe8ea] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            <span>{copy.button}</span>
            {/* chevron que se desplaza 6px a la derecha en hover/focus, como Workato */}
            <svg
              aria-hidden="true"
              viewBox="0 0 7 13"
              fill="none"
              className="h-[11px] w-[6px] shrink-0 transition-transform duration-300 ease-in-out group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
            >
              <path d="M.642.595 5.72 6.071.642 11.547" stroke="currentColor" strokeWidth="1.75" />
            </svg>
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
          <div>
            {step === "choice" && (
              <div className="space-y-3">
                <p className="text-center text-sm text-white/70">{copy.choiceTitle}</p>
                <a
                  href={whatsappLink(copy.whatsappMessage)}
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
                <label htmlFor="quote-email" className="block text-sm text-white/70">
                  {copy.emailLabel}
                </label>
                <input
                  id="quote-email"
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
        </div>
        </div>
      </div>
    </div>
  );
}
