import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'normal': '3px 3px 0px #1d1d28',
        'large': '6px 6px 0px #1d1d28',
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
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
        marquee: 'scroll 115s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
