import { whatsappLink } from "@/lib/whatsapp";
import Icon from "@/components/icons";
import HeroVisual from "@/components/HeroVisual";

function IndustryPill({ item }) {
  return (
    <span className="group/pill flex shrink-0 items-center gap-2.5 rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white/90 backdrop-blur-sm transition-colors hover:border-brand hover:bg-brand hover:text-navy">
      <Icon name={item.icon} className="h-6 w-6 text-brand transition-colors group-hover/pill:text-navy" />
      {item.label}
    </span>
  );
}

export default function Hero({ copy }) {
  const h = copy.hero;
  const loop = [...h.industries, ...h.industries];

  return (
    <section id="inicio" className="relative overflow-hidden bg-navy pt-32 sm:pt-40">
      {/* fondo: degradados de marca */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_30%,rgba(0,216,222,0.14),transparent_55%),radial-gradient(ellipse_at_90%_60%,rgba(124,58,237,0.18),transparent_50%),radial-gradient(ellipse_at_0%_100%,rgba(0,216,222,0.12),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-[0.07]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
            {h.title}{" "}
            <span className="relative inline-block bg-gradient-to-r from-brand to-sky-400 bg-clip-text text-transparent">
              {h.titleHighlight}
              <svg viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-2 w-full" aria-hidden="true" fill="none">
                <path d="M2 8 C 50 2, 120 2, 198 6" stroke="url(#hero-hl)" strokeWidth="2.5" strokeLinecap="round" />
                <defs>
                  <linearGradient id="hero-hl" x1="0" x2="1">
                    <stop offset="0" stopColor="#00D8DE" />
                    <stop offset="1" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg sm:leading-8">{h.subtitle}</p>

          <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-5">
            <a
              href={whatsappLink(h.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-brand to-emerald-300 px-7 py-3.5 text-base font-bold text-navy shadow-[0_0_30px_-4px_rgba(0,216,222,0.6)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {h.cta}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#casos"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/30 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 3l11 6-11 6V3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
              {h.secondaryCta}
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-sm text-white/70">
            {h.checks.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="text-brand">
                  <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual visual={h.visual} />
      </div>

      {/* industrias en movimiento (se pausa al pasar el cursor) */}
      <div
        role="region"
        aria-label={h.industriesLabel}
        className="group relative mt-20 pb-16 sm:mt-24 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
      >
        <div className="flex w-max gap-4 animate-marquee group-hover:[animation-play-state:paused]">
          {loop.map((item, i) => (
            <span key={i} aria-hidden={i >= h.industries.length ? "true" : undefined}>
              <IndustryPill item={item} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
