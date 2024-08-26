/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bgPrimary: '#282c34',
        sidebarBg: '#21252b',
        navPrimary: '#7858A6',
        lightBg: '#FBFBFB',
        darkBorder: '#454F59',
        lightmainCompBg: '#F8F9FB',
        summaryStatusBg: '#38414A',
        lightStatBg: '#e5e9f0',
      },
    },
  },
  plugins: [],
};
