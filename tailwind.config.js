/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#000000',
          dark: '#2d2a2a',
          light: '#faf7f7'
        }
      },
      fontFamily: {
        display: ['var(--font-playfair)'],
        sans: ['var(--font-inter)']
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.06)'
      }
    },
  },
  plugins: [],
};
