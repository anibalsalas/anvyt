import Link from "next/link";

export default function Casos({ copy, locale }) {
  const casosPath = locale === "es" ? "/casos/" : "/en/casos/";

  return (
    <section id="casos" className="bg-white px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">04</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-wordmark text-carbon sm:text-4xl">
            {copy.casos.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {copy.casos.items.map((caso, index) => (
            <Link
              key={caso.slug}
              href={`${casosPath}${caso.slug}`}
              className="group relative flex flex-col rounded-2xl border border-carbon/10 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-deep/30 hover:shadow-lg"
            >
              <span className="font-mono text-xs text-accent-deep">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-xl font-semibold tracking-wide text-carbon">{caso.client}</h3>
              <p className="mt-2 text-sm font-semibold text-accent-deep">{caso.result}</p>
              <p className="mt-3 flex-1 text-carbon/70">{caso.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-deep">
                {copy.casos.verCasoLabel}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
