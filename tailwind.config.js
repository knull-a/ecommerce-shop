/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{vue,js,ts}"];
export const theme = {
  extend: {
    fontFamily: {
      'Inter': ['Inter', 'sans-serif']
    },
    backgroundImage: {
      'mens': "url('@/assets/img/mens.jpg')",
      'womens': "url('@/assets/img/womens.jpg')",
      'jewellery': "url('@/assets/img/jewellery.jpg')",
      'electronics': "url('@/assets/img/electronics.jpg')"
    }
  },
  colors: {
    'white': '#ffffff',
    'primary': '#887569',
    'transparent': 'transparent',
    'grey': 'rgb(0, 0, 0, 25)',
    'error': '#f44336'
  }
};
export const plugins = [];