
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,json}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
    colors: {
      customBlue: '#336488',
    },
  },
},
variants: {
  extend: {},
},
plugins: [],
}
