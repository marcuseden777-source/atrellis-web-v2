import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0F172A",
        slate: "#334155",
        "cta-blue": "#0369A1",
        light: "#F8FAFC",
        primary: "#0F172A",
        secondary: "#334155",
        cta: "#0369A1",
        background: "#F8FAFC",
        "text-main": "#0F172A",
        "accent-blue": "#0369A1",
      },
      fontFamily: {
        sans: ['var(--font-main)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      }
    },
  },
  plugins: [],
};
export default config;
