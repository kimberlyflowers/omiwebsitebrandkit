/**
 * Outpouring Missions International — Tailwind Preset
 * Import from your website's tailwind.config.js:
 *   presets: [require('../brand/tokens/tailwind-preset')]
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        indigo: {
          deep:  '#0B1F3D',
          royal: '#152C5B',
          900:   '#0B1F3D',
          800:   '#152C5B',
          700:   '#1E3C78',
          600:   '#2A54A1',
          500:   '#3D6CC4',
        },
        gold: {
          heritage: '#D4A24C',
          bright:   '#F2C54A',
          900: '#8A6322',
          700: '#B6832F',
          500: '#D4A24C',
          300: '#F2C54A',
          100: '#FCE8B2',
        },
        teal: {
          mission:  '#17A4C2',
          electric: '#00C2E0',
          900: '#0E6A7F',
          700: '#128AA6',
          500: '#17A4C2',
          300: '#00C2E0',
          100: '#B7EEF7',
        },
        offwhite: '#F4F6FA',
        mist:     '#D9DEE8',
        graphite: '#2A2D34',
        charcoal: '#141518',
      },
      fontFamily: {
        display:  ['Montserrat', 'system-ui', 'sans-serif'],
        sans:     ['Inter', 'system-ui', 'sans-serif'],
        athletic: ['"Archivo Black"', '"Saira Condensed"', 'Impact', 'sans-serif'],
        script:   ['"Kaushan Script"', '"Brush Script MT"', 'cursive'],
        mono:     ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['4.5rem',  { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        'display-lg': ['3.5rem',  { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        'h1':         ['2.75rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'h2':         ['2rem',    { lineHeight: '1.25' }],
        'h3':         ['1.5rem',  { lineHeight: '1.3'  }],
        'h4':         ['1.25rem', { lineHeight: '1.35' }],
        'body-lg':    ['1.125rem',{ lineHeight: '1.65' }],
        'body-sm':    ['0.875rem',{ lineHeight: '1.5'  }],
        'label':      ['0.75rem', { lineHeight: '1.35', letterSpacing: '0.08em' }],
      },
      backgroundImage: {
        'gradient-celestial': 'linear-gradient(180deg, #0B1F3D 0%, #152C5B 55%, #17A4C2 100%)',
        'gradient-sunrise':   'linear-gradient(90deg,  #D4A24C 0%, #F2C54A 100%)',
        'gradient-horizon':   'linear-gradient(135deg, #0B1F3D 0%, #17A4C2 55%, #F2C54A 100%)',
      },
      boxShadow: {
        'omi-sm':   '0 1px 2px rgba(11, 31, 61, 0.08)',
        'omi-md':   '0 6px 20px rgba(11, 31, 61, 0.12)',
        'omi-lg':   '0 20px 48px rgba(11, 31, 61, 0.20)',
        'omi-gold': '0 8px 24px rgba(212, 162, 76, 0.28)',
      },
      borderRadius: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
};
