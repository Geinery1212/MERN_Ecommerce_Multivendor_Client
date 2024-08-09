/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {},
  screens: {
    'xl': { 'max': '1200px' },
    'lg': { 'max': '1080px' },
    'md-lg': { 'max': '991px' },
    'md': { 'max': '768px' },
    'sm': { 'max': '576px' },
    'xs': { 'max': '480px' },
    '2xs': { 'max': '340px' },
  }
};
export const plugins = [];