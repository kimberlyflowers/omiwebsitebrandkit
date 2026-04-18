const brandPreset = require('../brand/tokens/tailwind-preset');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [brandPreset],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display:  ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans:     ['var(--font-body)', 'system-ui', 'sans-serif'],
        athletic: ['var(--font-athletic)', 'Impact', 'sans-serif'],
        script:   ['var(--font-script)', 'cursive'],
      },
      animation: {
        'fade-up':  'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'glow':     'glow 3s ease-in-out infinite',
        'shimmer':  'shimmer 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%,100%': { opacity: '0.6' },
          '50%':     { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
      },
    },
  },
  plugins: [],
};
