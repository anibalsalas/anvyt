import QuoteCTA from "@/components/QuoteCTA";

export default function Retainer({ copy }) {
  return (
    <section id="retainer" className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">05</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-wordmark text-carbon sm:text-4xl">
            {copy.retainer.title}
          </h2>
          <p className="mt-1 font-mono text-sm uppercase tracking-[0.15em] text-accent-deep">
            {copy.retainer.subtitle}
          </p>
          <p className="mt-4 text-carbon/70">{copy.retainer.intro}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {copy.retainer.items.map((plan, i) => {
            const featured = i === 1;
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-2xl border p-6 text-left transition-all duration-300 ${
                  featured
                    ? "border-accent bg-white shadow-xl shadow-accent/10 sm:-translate-y-3"
                    : "border-carbon/10 bg-white shadow-sm hover:-translate-y-1 hover:border-accent-deep/30 hover:shadow-lg"
                }`}
              >
                <div>
                  <div className="flex min-h-[3.5rem] flex-col items-center justify-center text-center">
                    <h3 className="text-xl font-bold uppercase tracking-wide text-carbon">{plan.name}</h3>
                  </div>
                  <p className="mt-3 font-mono text-2xl font-bold text-accent-deep">{plan.price}</p>
                  <p className="mt-3 text-carbon/70">{plan.description}</p>

                  <div className="mt-5 border-t border-carbon/10 pt-5">
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent-deep">
                      {copy.retainer.alcanceLabel}
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {plan.alcance.map((item) => (
                        <li key={item} className="flex gap-2.5 text-sm text-carbon/70">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent-deep" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        <QuoteCTA copy={copy.retainer.quote} source="retainer-cotizacion" />

        <div className="mt-16 border-t border-carbon/10 pt-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">
            {copy.retainer.garantiasTitle}
          </p>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {copy.retainer.garantias.map((item) => (
              <div key={item.label}>
                <h4 className="font-semibold text-carbon">{item.label}</h4>
                <p className="mt-2 text-sm text-carbon/70">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
