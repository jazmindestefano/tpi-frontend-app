/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#cc6313',
        'secondary': '#D9D9D9',
        'tertiary': '#F55600',
        'white': '#FFFFFF',
        'black': '#171717',
        'gray': {
          '50': '#F6F6F6',
          '100': '#E7E7E7',
          '200': '#D1D1D1',
          '300': '#B0B0B0',
          '400': '#7F7F7F',
          '950': '#262626',
        },
        'orange': {
          '50': '#fef8ec',
          '100': '#fbecca',
          '150': "#FFBB6D",
          '200': '#f6d891',
          '300': '#f2c160',
          '400': '#eea631',
          '500': '#e78519',
          '600': '#cc6313',
          '700': '#aa4513',
          '800': '#8a3616',
          '900': '#722e15',
          '950': '#411507',
          '1000': '#EDB193',
        },
        'blue': {
          '50': '#eff7fe',
          '100': '#e2effd',
          '200': '#cbe0fa',
          '300': '#abcbf6',
          '400': '#89acf0',
          '500': '#6d8fe8',
          '600': '#506bdb',
          '700': '#4158c1',
          '800': '#374b9c',
          '900': '#33437c',
          '950': '#1e2648',
        }
      },
      fontFamily: {
        comfortaa: ['Comfortaa'],
        poppins: ['Poppins']
      }
    },
  },
  plugins: [],
}
