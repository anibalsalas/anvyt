"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { whatsappLink } from "@/lib/whatsapp";

function BulletList({ items }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm text-white/75">
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Section({ label, children }) {
  return (
    <div className="border-t border-white/10 pt-5 first:border-t-0 first:pt-0">
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent-light">{label}</p>
      {children}
    </div>
  );
}

function PlanModal({ plan, labels, titleId, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      // Focus trap
      const focusables = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="plan-modal-in relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-carbon shadow-2xl shadow-black/50 focus:outline-none sm:max-w-lg sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
          <div>
            <h3 id={titleId} className="text-xl font-bold uppercase tracking-wide text-white">
              {plan.name}
            </h3>
            <p className="mt-1 font-mono text-lg font-bold text-accent-light">{plan.price}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={labels.closeLabel}
            className="-mr-2 -mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="space-y-5 overflow-y-auto p-6">
          <Section label={labels.idealParaLabel}>
            <p className="mt-2 text-sm text-white/75">{plan.idealPara}</p>
          </Section>
          <Section label={labels.incluyeLabel}>
            <BulletList items={plan.incluye} />
          </Section>
          {plan.funcionesPremium && (
            <Section label={labels.funcionesPremiumLabel}>
              <BulletList items={plan.funcionesPremium} />
            </Section>
          )}
          <Section label={labels.ejemplosLabel}>
            <p className="mt-2 text-sm text-white/75">{plan.ejemplos}</p>
          </Section>
        </div>

        <div className="border-t border-white/10 p-6">
          <a
            href={whatsappLink(plan.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-whatsapp/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
          >
            {labels.cta}
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function PlanCard({ plan, labels, featured }) {
  const [open, setOpen] = useState(false);
  const titleId = `plan-modal-${plan.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;

  return (
    <div
      className={`relative flex flex-col justify-between rounded-2xl border bg-carbon p-6 text-left transition-all duration-300 ${
        featured
          ? "border-accent shadow-xl shadow-accent/20 sm:-translate-y-3"
          : "border-white/10 hover:-translate-y-1 hover:border-accent-light/30"
      }`}
    >
      <div>
        <div className="flex min-h-[5.25rem] flex-col items-center justify-center text-center">
          <h3 className="text-xl font-bold uppercase tracking-wide text-white">{plan.name}</h3>
        </div>

        <p className="mt-3 text-white/70">{plan.tagline}</p>

        <div className="mt-5">
          <p className="font-mono text-2xl font-bold text-accent-light">{plan.price}</p>
        </div>

        <button
          type="button"
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
          className="mt-5 flex min-h-[40px] w-full items-center justify-between gap-2 border-t border-white/10 pt-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent-light">
            {labels.verMasLabel}
          </span>
          <svg className="h-4 w-4 shrink-0 text-accent-light" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M7.5 5L12.5 10L7.5 15"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {open && <PlanModal plan={plan} labels={labels} titleId={titleId} onClose={() => setOpen(false)} />}
    </div>
  );
}
