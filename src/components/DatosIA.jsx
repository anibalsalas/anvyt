import Icon from "@/components/icons";
import DatosIAContacto from "@/components/DatosIAContacto";

export default function DatosIA({ copy }) {
  const d = copy.datosIA;

  return (
    <section id="datos-ia" className="relative overflow-hidden bg-carbon px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-30" />
      <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-brand/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-light">{d.eyebrow}</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-wordmark text-white sm:text-4xl">{d.title}</h2>
          <p className="mt-4 text-white/70">{d.intro}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {d.items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-ink/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand">
                <Icon name={item.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{item.description}</p>
            </div>
          ))}

          <div className="flex flex-col justify-between rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 to-transparent p-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent-light">{d.stackLabel}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {d.stack.map((tool) => (
                  <li key={tool} className="rounded-full border border-white/20 px-3 py-1 font-mono text-xs text-white/85">
                    {tool}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-white/65">{d.stackText}</p>
            </div>
            <DatosIAContacto d={d} />
          </div>
        </div>
      </div>
    </section>
  );
}
