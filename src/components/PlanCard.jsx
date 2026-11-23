"use client";

import { useState } from "react";

export default function PlanCard({ plan, labels, featured }) {
  const [open, setOpen] = useState(false);
  const panelId = `plan-detalle-${plan.name.replace(/\s+/g, "-").toLowerCase()}`;

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

        <div className="mt-3 flex min-h-[26px] flex-wrap justify-center gap-2">
          {featured && (
            <span className="inline-block rounded-full bg-accent px-3 py-1 font-mono text-[11px] font-semibold text-white">
              {labels.featuredLabel}
            </span>
          )}
          {plan.tag && (
            <span className="inline-block rounded-full bg-accent px-3 py-1 font-mono text-[11px] font-semibold text-white">
              {plan.tag}
            </span>
          )}
        </div>

        <p className="mt-3 text-white/70">{plan.tagline}</p>

        <div className="mt-5">
          <p className="font-mono text-2xl font-bold text-accent-light">{plan.price}</p>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((prev) => !prev)}
          className="mt-5 flex min-h-[40px] w-full items-center justify-between gap-2 border-t border-white/10 pt-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent-light">
            {open ? labels.verMenosLabel : labels.verMasLabel}
          </span>
          <svg
            className={`h-4 w-4 shrink-0 text-accent-light transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div
          id={panelId}
          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-white/10 pt-5">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent-light">
                {labels.idealParaLabel}
              </p>
              <p className="mt-2 text-sm text-white/60">{plan.idealPara}</p>
            </div>

            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent-light">
                {labels.incluyeLabel}
              </p>
              <ul className="mt-2 space-y-1.5">
                {plan.incluye.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-white/60">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent-light" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {plan.funcionesPremium && (
              <div className="mt-5 border-t border-white/10 pt-5">
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent-light">
                  {labels.funcionesPremiumLabel}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {plan.funcionesPremium.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-white/60">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent-light" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent-light">
                {labels.ejemplosLabel}
              </p>
              <p className="mt-2 text-sm text-white/60">{plan.ejemplos}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
