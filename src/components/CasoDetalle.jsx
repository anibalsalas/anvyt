import Link from "next/link";
import { whatsappLink } from "@/lib/whatsapp";
import Image from "next/image";

function CheckItem({ children }) {
  return (
    <li className="flex items-start gap-3">
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className="mt-0.5 shrink-0 text-whatsapp"
      >
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-carbon/80">{children}</span>
    </li>
  );
}

export default function CasoDetalle({ copy, locale, caso }) {
  const t = copy.casos.detalle;
  const homeHref = locale === "es" ? "/" : "/en/";
  const casosPath = `${homeHref}casos/`;
  const otrosCasos = copy.casos.items.filter((item) => item.slug !== caso.slug);
  const ctaMessage = t.ctaWhatsappTemplate.replace("{client}", caso.client);

  return (
    <>
      <section className="relative overflow-hidden bg-ink px-4 pb-16 pt-32 sm:px-6 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-20" />
        <div className="relative mx-auto max-w-6xl">
          <nav aria-label={t.breadcrumbLabel} className="font-mono text-xs uppercase tracking-wide text-white/50">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href={homeHref} className="transition-colors hover:text-white">
                  {t.breadcrumbHome}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`${homeHref}#casos`} className="transition-colors hover:text-white">
                  {t.breadcrumbCasos}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/80">{caso.client}</li>
            </ol>
          </nav>

          <div className="mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent-light">
            <span className="h-px w-4 bg-accent" />
            {caso.client}
          </div>

          <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-[1.1] tracking-wordmark text-white sm:text-4xl md:text-5xl">
            {caso.result}
          </h1>
        </div>
      </section>

      <main className="bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="relative mb-14 flex aspect-[21/9] w-full items-center justify-between overflow-hidden rounded-2xl bg-ink px-6 sm:px-12">
            <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-20" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand/20 blur-3xl" />
            <div className="relative max-w-md">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand">{t.industriaLabel}</span>
              <p className="mt-2 font-display text-lg font-bold leading-tight text-white sm:text-2xl">{caso.industria}</p>
              <p className="mt-3 hidden text-sm text-white/60 sm:block">{caso.resumenSolucion}</p>
            </div>
            <Image
              src="/brand/mark.webp"
              alt=""
              width={242}
              height={160}
              className="relative h-16 w-auto opacity-90 sm:h-28"
            />
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
            <article className="min-w-0">
              <section>
                <h2 className="font-display text-2xl font-bold tracking-wordmark text-carbon">{t.clienteLabel}</h2>
                <p className="mt-4 leading-relaxed text-carbon/70">{caso.description}</p>
              </section>

              <section className="mt-14">
                <h2 className="font-display text-2xl font-bold tracking-wordmark text-carbon">{t.enfoqueLabel}</h2>
                <p className="mt-4 font-semibold text-carbon/90">{caso.enfoque.objetivo}</p>
                <span className="mt-6 block font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">
                  {t.accionesLabel}
                </span>
                <ul className="mt-4 space-y-3">
                  {caso.enfoque.acciones.map((accion, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 font-mono text-xs text-accent-deep">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-carbon/70">{accion}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-14">
                <h2 className="font-display text-2xl font-bold tracking-wordmark text-carbon">{t.solucionLabel}</h2>
                <p className="mt-4 leading-relaxed text-carbon/70">{caso.solucion.texto}</p>

                <span className="mt-8 block font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">
                  {t.capacidadesLabel}
                </span>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {caso.solucion.capacidades.map((cap, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-carbon/10 bg-white p-5 shadow-sm"
                    >
                      <h3 className="font-display text-base font-semibold text-carbon">{cap.titulo}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-carbon/70">{cap.descripcion}</p>
                    </div>
                  ))}
                </div>

              </section>

              <section className="mt-14">
                <h2 className="font-display text-2xl font-bold tracking-wordmark text-carbon">{t.impactoLabel}</h2>
                <p className="mt-4 leading-relaxed text-carbon/70">{caso.impacto.texto}</p>
                <ul className="mt-6 space-y-3">
                  {caso.impacto.beneficios.map((beneficio, i) => (
                    <CheckItem key={i}>{beneficio}</CheckItem>
                  ))}
                </ul>
              </section>
            </article>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-carbon/10 bg-carbon/[0.02] p-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">
                    {t.industriaLabel}
                  </span>
                  <p className="mt-2 font-display text-sm font-semibold text-carbon">{caso.industria}</p>
                </div>

                <div className="mt-6 border-t border-carbon/10 pt-6">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">
                    {t.tecnologiasLabel}
                  </span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {caso.tecnologias.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-carbon/10 bg-white px-3 py-1 text-xs text-carbon/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-carbon/10 pt-6">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">
                    {t.resumenLabel}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-carbon/70">{caso.resumenSolucion}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <section className="relative overflow-hidden bg-ink px-4 py-16 text-center sm:px-6">
        <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-20" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-2xl font-bold tracking-wordmark text-white sm:text-3xl">{t.ctaTitle}</h2>
          <p className="mt-3 text-white/70">{t.ctaSubtitle}</p>
          <a
            href={whatsappLink(ctaMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-whatsapp px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-whatsapp/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
          >
            {t.ctaButton}
          </a>
          <div className="mt-8">
            <Link href={`${homeHref}#casos`} className="text-sm text-white/50 underline-offset-4 transition-colors hover:text-white hover:underline">
              {t.volverLabel}
            </Link>
          </div>
        </div>
      </section>

      {otrosCasos.length > 0 && (
        <section className="bg-white px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-xl font-bold tracking-wordmark text-carbon">{t.otrosCasosLabel}</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {otrosCasos.map((item) => (
                <Link
                  key={item.slug}
                  href={`${casosPath}${item.slug}`}
                  className="group flex flex-col rounded-2xl border border-carbon/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-deep/30 hover:shadow-lg"
                >
                  <h3 className="text-lg font-semibold tracking-wide text-carbon">{item.client}</h3>
                  <p className="mt-2 flex-1 text-sm text-carbon/70">{item.result}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-deep">
                    {copy.casos.verCasoLabel}
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
