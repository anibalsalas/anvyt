export default function Beneficios({ copy }) {
  return (
    <section id="beneficios" className="relative overflow-hidden bg-ink px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-40" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 max-w-xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-light">03</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-wordmark text-white sm:text-4xl">
            {copy.beneficios.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {copy.beneficios.items.map((item, i) => (
            <div key={item.title} className="py-8 first:pt-0 sm:px-8 sm:py-0 sm:first:pl-0">
              <span className="font-mono text-sm text-accent-light">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-white/60">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
