import { whatsappLink } from "@/lib/whatsapp";

export default function Servicios({ copy }) {
  return (
    <section id="servicios" className="bg-mist px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">02</span>
          <h2 className="mt-3 font-monda text-3xl font-bold tracking-wordmark text-carbon sm:text-4xl">
            {copy.servicios.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {copy.servicios.items.map((item, i) => (
            <div
              key={item.title}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-carbon/10 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-deep/30 hover:shadow-lg ${
                i === 0 ? "sm:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <span className="pointer-events-none absolute left-3 top-3 h-2 w-2 border-l border-t border-accent-deep/40" />
              <span className="pointer-events-none absolute bottom-3 right-3 h-2 w-2 border-b border-r border-accent-deep/40" />
              <div>
                <span className="font-mono text-xs text-accent-deep">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-semibold tracking-wide text-carbon">{item.title}</h3>
                <p className="mt-3 text-carbon/70">{item.description}</p>
              </div>
              <a
                href={whatsappLink(item.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full bg-accent-deep px-5 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-deep/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-deep"
              >
                {copy.servicios.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
