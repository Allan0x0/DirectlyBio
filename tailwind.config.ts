import type { Config } from 'tailwindcss';

import colors from 'tailwindcss/colors';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        normal: '3px 3px 0px #1d1d28',
        large: '6px 6px 0px #1d1d28',
        'text-black': '2px 2px 4px rgba(0, 0, 0, 0.6)', // black shadow
        'text-white': '2px 2px 4px rgba(255, 255, 255, 0.6)', // white shadow
        'text-combo':
          '2px 2px 4px rgba(0, 0, 0, 0.6), 2px 2px 4px rgba(255, 255, 255, 0.6)', // combo shadow
      },
      fontFamily: {
        times: ['"Times New Roman"', 'serif'], // Custom class 'font-times'
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
      colors: {
        copy: colors.white,
        primary: colors.purple,
        secondary: colors.black,
      },
      keyframes: {
        appearFromRight: {
          '0%': { transform: 'translateX(40%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scroll: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        appearFromRight: 'appearFromRight 0.2s ease-out forwards',
        marquee: 'scroll 75s linear infinite',
        marqueeMobile: 'scroll 75s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
