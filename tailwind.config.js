
const customColors = {
  orange: {
    50: '#fef8ec',
    100: '#fbecca',
    150: "#FFBB6D",
    200: '#f6d891',
    300: '#f2c160',
    400: '#eea631',
    500: '#e78519',
    600: '#cc6313',
    700: '#aa4513',
    800: '#8a3616',
    900: '#722e15',
    950: '#411507',
  },
  blue: {
    50: '#eff7fe',
    100: '#e2effd',
    200: '#cbe0fa',
    300: '#abcbf6',
    400: '#89acf0',
    500: '#6d8fe8',
    600: '#506bdb',
    700: '#4158c1',
    800: '#374b9c',
    900: '#33437c',
    950: '#1e2648',
  },
  gray: {
    50: '#F6F6F6',
    100: '#E7E7E7',
    200: '#D1D1D1',
    300: '#B0B0B0',
    400: '#7F7F7F',
    950: '#262626',
  },
  yellow: {
    50: '#fffde7',
    100: '#fffac1',
    200: '#fff186',
    300: '#ffe041',
    400: '#ffcb0e',
    500: '#f5b501',
    600: '#d08800',
    700: '#a66002',
    800: '#894b0a',
    900: '#743d0f',
    950: '#441f04',
  },
  pink: {
    50: '#fdf2f8',
    100: '#fce7f4',
    200: '#fbcfe9',
    300: '#f9a8d6',
    400: '#f472b9',
    500: '#ec489d',
    600: '#db277b',
    700: '#be1861',
    800: '#9d1750',
    900: '#831846',
    950: '#500726',
  },

  white: '#FFFFFF',
  black: '#171717',
}


/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: customColors.orange["600"],
        secondary: customColors.blue["500"],
        tertiary: customColors.pink,
        white: customColors.white,
        black: customColors.black,
        gray: {...customColors.gray},
        blue: {...customColors.blue},
        orange: {...customColors.orange},
        yellow: {...customColors.yellow},
        pink: {...customColors.pink}
      },
      fontFamily: {
        comfortaa: ['Comfortaa'],
        poppins: ['Poppins']
      }
    },
  },
  plugins: [],
}
