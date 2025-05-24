/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        arabic: ['Cairo', 'sans-serif'],
      },
      colors: {
        gold: {
          50: '#fbf8f1',
          100: '#f7f0dd',
          200: '#efe1bb',
          300: '#e6cf95',
          400: '#debb6e',
          500: '#d5a84b',
          600: '#c99429',
          700: '#a77922',
          800: '#85601c',
          900: '#634718',
        },
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
      transitionProperty: {
        'height': 'height',
      },
    },
  },
  plugins: [],
};