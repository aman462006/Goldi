import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#04060d",
          900: "#070a14",
          850: "#0a0e1c",
          800: "#0e1424",
          700: "#151d33",
          600: "#1e2942",
        },
        electric: {
          50: "#e8f3ff",
          100: "#cbe4ff",
          200: "#9cccff",
          300: "#63acff",
          400: "#3b8cff",
          500: "#1e6bff",
          600: "#0f4fe6",
          700: "#0b3cb4",
          800: "#0d3287",
          900: "#112c6b",
        },
        plasma: {
          300: "#a78bfa",
          400: "#8b5cf6",
          500: "#7c3aed",
        },
        photon: {
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
        },
        signal: {
          amber: "#ffb020",
          teal: "#2dd4bf",
          rose: "#fb7185",
          lime: "#a3e635",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        drift: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.16,1,0.3,1) infinite",
        shimmer: "shimmer 3s linear infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        drift: "drift 8s linear infinite",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at 50% 0%, rgba(30,107,255,0.14), transparent 55%)",
      },
    },
  },
  plugins: [],
};

export default config;
