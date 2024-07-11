/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounce: {
          "0%, 20%, 50%, 80%, 100%": {
            transform: "translateY(0)",
            offset: "0.4",
          },
          "40%": {
            transform: "translateY(-10px)",
            offset: "0.6",
          },
          "60%": {
            transform: "translateY(-5px)",
            offset: "0.8",
          },
        },
        bounce2: {
          "0%": {
            transform: "translateY(0)",
            // offset: "0.4",
          },
          "33%": {
            transform: "translateY(-.3rem)",
            // offset: "0.6",
          },
          "66%": {
            transform: "translateY(0)",
            // offset: "0.8",
          },
        }
      },
      animation: {
        'bounce': 'bounce2 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'animate-delay': (value) => ({
            animationDelay: value,
          }),
        },
        { values: theme('transitionDelay') }
      )
    }),
  ],
}

