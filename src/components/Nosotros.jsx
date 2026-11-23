import { whatsappLink } from "@/lib/whatsapp";

export default function Nosotros({ copy }) {
  const n = copy.nosotros;
  const [titleBefore, titleAfter] = n.title.split(n.titleHighlight);
  const [bodyBefore, bodyAfter] = n.body.split(n.bodyHighlight);

  return (
    <section id="nosotros" className="bg-mist px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">
          <span className="font-mono text-xs text-accent-deep">01</span>
          <span className="h-px w-4 bg-accent-deep" />
          {n.eyebrow}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <h2 className="font-monda text-3xl font-bold leading-[1.15] tracking-wordmark text-carbon sm:text-4xl md:text-[2.75rem]">
              {titleBefore}
              <span className="text-accent-deep">{n.titleHighlight}</span>
              {titleAfter}
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-carbon/75">
              {bodyBefore}
              <span className="font-semibold text-carbon">{n.bodyHighlight}</span>
              {bodyAfter}
            </p>

            <a
              href={whatsappLink(n.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-whatsapp px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-whatsapp/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
            >
              {n.cta}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div className="rounded-2xl border border-carbon/10 bg-white p-8 shadow-sm">
            <h3 className="font-monda text-xl font-bold tracking-wide text-carbon">
              {n.comoTrabajamosTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-carbon/70">{n.comoTrabajamosIntro}</p>

            <ul className="mt-6 space-y-5">
              {n.comoTrabajamosItems.map((item, i) => (
                <li key={item.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-xs font-semibold text-accent-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-semibold text-carbon">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-carbon/70">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
