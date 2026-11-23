import { getDictionary } from "@/i18n";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Nosotros from "@/components/Nosotros";
import Beneficios from "@/components/Beneficios";
import Casos from "@/components/Casos";
import Planes from "@/components/Planes";
import Retainer from "@/components/Retainer";
import Footer from "@/components/Footer";

export default function Home() {
  const copy = getDictionary("en");

  return (
    <>
      <Nav copy={copy} locale="en" otherLocaleHref="/" />
      <main>
        <Hero copy={copy} />
        <Nosotros copy={copy} />
        <Planes copy={copy} />
        <Beneficios copy={copy} />
        <Casos copy={copy} locale="en" />
        <Retainer copy={copy} />
      </main>
      <Footer copy={copy} locale="en" />
    </>
  );
}
