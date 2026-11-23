import { siteUrl } from "@/lib/site";

export function getOrganizationSchema(copy) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: copy.nav.brand,
    url: siteUrl,
    logo: `${siteUrl}/brand/logo.webp`,
    description: copy.meta.description,
    areaServed: "PE",
  };
}
