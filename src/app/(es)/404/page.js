import { getDictionary } from "@/i18n";

const copy = getDictionary("es");
const t = copy.notFound;

export const metadata = {
  title: `${t.title} | ${copy.nav.brand}`,
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-4 text-center">
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-20" />
      <div className="relative max-w-md">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand">{t.eyebrow}</span>
        <h1 className="mt-4 font-monda text-3xl font-bold tracking-wordmark text-white">{t.title}</h1>
        <p className="mt-3 text-white/70">{t.text}</p>
        <a
          href="/"
          className="mt-8 inline-block rounded-full bg-whatsapp px-8 py-3 font-semibold text-white transition-colors hover:bg-whatsapp/90"
        >
          {t.cta}
        </a>
      </div>
    </main>
  );
}
