/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    fontFamily: {
      sans: ["Roboto Mono", "monospace"],
    },
    extend: {
      height: {
        screen: "100dvh",
      },
      colors: {
        primary: {
          40: '#fdede7',
          50: '#fcdccf',
          100: '#f6956f',
          200: '#f48457',
          300: '#f3723f',
          400: '#f16027',
          500: '#f04f0f',
          600: '#d8470e',
          700: '#c2410c',
          800: '#a8370b',
          900: '#902f09',
        },
      },
      screens: {
        'xs': '400px',
      } 
    },
  },
  plugins: [require("tailwindcss-box-shadow")],
};
