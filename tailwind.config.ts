import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      zIndex: {
        '25': '25',
      },
      colors: {
        navy: {
          950: "#040711",
          900: "#080e1e",
          850: "#0b142b",
          800: "#101d3b",
          700: "#182b52",
          600: "#223b6e",
        },
        cyan: {
           glow: "#00f0ff",
        },
        gold: {
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          glow: "#ffbe3b",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "cyber-grid": "linear-gradient(to right, rgba(14, 165, 233, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(14, 165, 233, 0.05) 1px, transparent 1px)",
      },
      boxShadow: {
        "cyan-glow": "0 0 25px -5px rgba(6, 182, 212, 0.4)",
        "gold-glow": "0 0 25px -5px rgba(245, 158, 11, 0.35)",
        "blue-glow": "0 0 35px -5px rgba(14, 165, 233, 0.45)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { filter: "drop-shadow(0 0 10px rgba(6, 182, 212, 0.4))" },
          "100%": { filter: "drop-shadow(0 0 25px rgba(6, 182, 212, 0.8))" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
