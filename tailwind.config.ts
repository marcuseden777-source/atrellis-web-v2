import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        'glass-bg': 'rgba(255, 255, 255, 0.03)',
        'glass-border': 'rgba(255, 255, 255, 0.12)',
        'text-offwhite': 'rgba(255, 255, 255, 0.95)',
        'text-grey': 'rgba(255, 255, 255, 0.5)',
        'accent-blue': '#007AFF',
      },
      spacing: {
        '100': '25rem',
        '128': '32rem',
      },
      backdropBlur: {
        '3xl': '30px',
      },
      backdropSaturate: {
        '180': '1.8',
      },
      zIndex: {
        '100': '100',
      },
      scale: {
        '108': '1.08',
      },
      opacity: {
        '2': '0.02',
      },
    },
  },
  plugins: [],
};

export default config;
