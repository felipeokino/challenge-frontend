/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shake: {
          "0%, 100%": {
            transform: "translateX(0)",
            offset: 0.5,
          },
          "40%": {
            transform: "translateX(-5px)",
            offset: 0.5,
          },
          "75%": {
            transform: "translateX(5px)",
            offset: 0.5,
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
        'shake': 'shake .3s ease',
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

