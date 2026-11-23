import { Monda, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

export const monda = Monda({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-monda",
});

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-mono",
});
