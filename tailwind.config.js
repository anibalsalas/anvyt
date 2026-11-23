/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: "#24272C",
        ink: "#14171B",
        accent: "#2196F3",
        brand: "#00D8DE",
        "accent-deep": "#125FB0",
        "accent-light": "#8FCBFF",
        mist: "#F2F3F5",
        whatsapp: "#25D366",
      },
      fontFamily: {
        monda: ["var(--font-monda)", "sans-serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        wordmark: "0.08em",
      },
    },
  },
  plugins: [],
};
