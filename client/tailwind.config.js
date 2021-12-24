module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        main: ['Nunito'],
      },
      colors: {
        primary: '#00ADF0',
        dark: '#4798EA',
        darker: '#0079B8',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
