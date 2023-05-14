/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    transform: (content) => content.replace(/taos:/g, ''),
    files: ["./src/**/*.{html,js}", "./public/*.html"],
  },
  safelist: [
    '!duration-[0ms]',
    '!delay-[0ms]',
    'html.js :where([class*="taos:"]:not(.taos-init))'
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 2s ease-in forwards"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      },
    },
    variants: {
      animation: ["motion-safe"]
    },
    colors: {
      primary: "#034189",
      secondary: "#ffffff",
      ternary: "#215FA6",
      quaternary: "#565E71",
    },
  },
  plugins: [
    require('taos/plugin')
  ],
};