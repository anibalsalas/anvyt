import PlanCard from "@/components/PlanCard";

export default function Planes({ copy }) {
  return (
    <section id="planes" className="relative overflow-hidden bg-ink px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-40" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 max-w-xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-light">02</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-wordmark text-white sm:text-4xl">
            {copy.planes.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {copy.planes.items.map((plan) => (
            <PlanCard key={plan.name} plan={plan} labels={copy.planes} featured={plan.name === "MVP / Core App"} />
          ))}
        </div>
      </div>
    </section>
  );
}
