import Image from "next/image";
import { whatsappLink } from "@/lib/whatsapp";

export default function Hero({ copy }) {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[88vh] items-center overflow-hidden bg-ink px-4 pb-16 pt-28 sm:px-6 sm:pt-32"
    >
      <Image
        src="/images/fondoh.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/75 to-ink" />
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-20" />
      <div className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-accent/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <div className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent-light">
            <span className="h-px w-4 bg-accent" />
            {copy.hero.eyebrow}
          </div>

          <h1 className="mt-6 font-monda text-4xl font-bold leading-[1.05] tracking-wordmark text-white sm:text-5xl md:text-6xl">
            {copy.hero.title}
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-white/70 sm:text-xl">
            {copy.hero.subtitle}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <a
              href={whatsappLink(copy.hero.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-whatsapp px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-whatsapp/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
            >
              {copy.hero.cta}
            </a>

            <a
              href="#casos"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
            >
              {copy.hero.secondaryCta}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t border-white/10 pt-6 text-xs uppercase tracking-wide text-white/50 sm:text-sm">
            {copy.planes.items.map((item, i) => (
              <span key={item.name} className="flex items-center gap-x-3">
                <a href="#planes" className="transition-colors hover:text-white">
                  {item.name}
                </a>
                {i < copy.planes.items.length - 1 && (
                  <span aria-hidden="true" className="text-white/20">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
