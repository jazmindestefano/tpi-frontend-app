/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue': '#6D8FE8',
        'black': '#000000',
      },
      backgroundColor: {
        'blue': '#6D8FE8',
        'black': '#000000',
      },
    },
  },
  plugins: [],
}
