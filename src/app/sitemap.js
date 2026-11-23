import { getAllCasosSlugs } from "@/lib/casos";

import { siteUrl } from "@/lib/site";

export default function sitemap() {
  const casos = getAllCasosSlugs();

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...casos.map(({ slug }) => ({
      url: `${siteUrl}/casos/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    ...casos.map(({ slug }) => ({
      url: `${siteUrl}/en/casos/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ];
}
