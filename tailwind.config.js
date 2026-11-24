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
        accent: "#00d7da",
        brand: "#00D8DE",
        navy: "#020B1A",
        "accent-deep": "#00d7da",
        "accent-light": "#8FCBFF",
        mist: "#F2F3F5",
        whatsapp: "#25D366",
      },
      fontFamily: {
        display: ["var(--font-figtree)", "sans-serif"],
        sans: ["var(--font-figtree)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        floatTilt: { "0%,100%": { transform: "translateY(0) rotate(-2deg)" }, "50%": { transform: "translateY(-14px) rotate(2deg)" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        glow: { "0%,100%": { opacity: "0.5" }, "50%": { opacity: "1" } },
        dash: { to: { strokeDashoffset: "-24" } },
        bars: { "0%,100%": { transform: "scaleY(0.55)" }, "50%": { transform: "scaleY(1)" } },
        spinSlow: { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-tilt": "floatTilt 7s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        glow: "glow 5s ease-in-out infinite",
        dash: "dash 1.2s linear infinite",
        bars: "bars 3.2s ease-in-out infinite",
        "spin-slow": "spinSlow 24s linear infinite",
      },
      letterSpacing: {
        wordmark: "0.08em",
      },
    },
  },
  plugins: [],
};
