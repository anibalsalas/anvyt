import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CasoDetalle from "@/components/CasoDetalle";
import { getDictionary } from "@/i18n";
import { getCasoBySlug, getAllCasosSlugs } from "@/lib/casos";

export function generateStaticParams() {
  return getAllCasosSlugs();
}

export function generateMetadata({ params }) {
  const caso = getCasoBySlug("en", params.slug);
  if (!caso) return {};

  return {
    title: caso.metaTitle,
    description: caso.metaDescription,
    alternates: {
      canonical: `/en/casos/${caso.slug}`,
      languages: {
        "es-PE": `/casos/${caso.slug}`,
        "en-US": `/en/casos/${caso.slug}`,
      },
    },
    openGraph: {
      title: caso.metaTitle,
      description: caso.metaDescription,
      url: `/en/casos/${caso.slug}`,
      siteName: getDictionary("en").nav.brand,
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: caso.metaTitle,
      description: caso.metaDescription,
    },
  };
}

export default function CasoPage({ params }) {
  const copy = getDictionary("en");
  const caso = getCasoBySlug("en", params.slug);
  if (!caso) notFound();

  return (
    <>
      <Nav copy={copy} locale="en" otherLocaleHref={`/casos/${caso.slug}`} />
      <main>
        <CasoDetalle copy={copy} locale="en" caso={caso} />
      </main>
      <Footer copy={copy} locale="en" />
    </>
  );
}
