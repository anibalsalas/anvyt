import "../globals.css";
import { monda, jakarta, jetbrainsMono } from "../fonts";
import { getDictionary } from "@/i18n";
import { getOrganizationSchema } from "@/lib/organizationSchema";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

import Script from "next/script";
import { siteUrl, GA_ID } from "@/lib/site";
const copy = getDictionary("es");
const organizationSchema = getOrganizationSchema(copy);

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: copy.meta.title,
  description: copy.meta.description,
  alternates: {
    canonical: "/",
    languages: {
      "es-PE": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: copy.meta.title,
    description: copy.meta.description,
    url: siteUrl,
    siteName: copy.nav.brand,
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: copy.meta.title,
    description: copy.meta.description,
  },
};

export default function EsRootLayout({ children }) {
  return (
    <html lang="es" className={`${monda.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","${GA_ID}");`}
            </Script>
          </>
        )}
        <WhatsAppFloatingButton copy={copy} />
      </body>
    </html>
  );
}
