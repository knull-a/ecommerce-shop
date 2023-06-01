/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{vue,js,ts}"];
export const theme = {
  extend: {
    fontFamily: {
      'Inter': ['Inter', 'sans-serif']
    }
  },
  colors: {
    'white': '#ffffff',
    'primary': '#887569'
  }
};
export const plugins = [];