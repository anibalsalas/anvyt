import { getDictionary } from "@/i18n";

export default function manifest() {
  const copy = getDictionary("es");
  return {
    name: copy.meta.title,
    short_name: copy.nav.brand,
    start_url: "/",
    display: "standalone",
    background_color: "#001833",
    theme_color: "#001833",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
