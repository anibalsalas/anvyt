import "../globals.css";
import { figtree, jetbrainsMono } from "../fonts";
import { getDictionary } from "@/i18n";
import { getOrganizationSchema } from "@/lib/organizationSchema";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

import Script from "next/script";
import { siteUrl, GA_ID } from "@/lib/site";
const copy = getDictionary("en");
const organizationSchema = getOrganizationSchema(copy);

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: copy.meta.title,
  description: copy.meta.description,
  alternates: {
    canonical: "/en",
    languages: {
      "es-PE": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: copy.meta.title,
    description: copy.meta.description,
    url: `${siteUrl}/en`,
    siteName: copy.nav.brand,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: copy.meta.title,
    description: copy.meta.description,
  },
};

export default function EnRootLayout({ children }) {
  return (
    <html lang="en" className={`${figtree.variable} ${jetbrainsMono.variable}`}>
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
