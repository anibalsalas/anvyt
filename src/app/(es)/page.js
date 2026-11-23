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
  const copy = getDictionary("es");

  return (
    <>
      <Nav copy={copy} locale="es" otherLocaleHref="/en/" />
      <main>
        <Hero copy={copy} />
        <Nosotros copy={copy} />
        <Planes copy={copy} />
        <Beneficios copy={copy} />
        <Casos copy={copy} locale="es" />
        <Retainer copy={copy} />
      </main>
      <Footer copy={copy} locale="es" />
    </>
  );
}
