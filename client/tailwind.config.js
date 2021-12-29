module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        main: ['Nunito'],
      },
      colors: {
        // previous-primary: '#00ADF0'
        primary: '#00ACF0',
        light: '#57CFFF',
        dark: '#00638A',
        grayer: '#787878',
        saturate: '#00ACF0',
        desaturate: '#18A2D8',
        brighten: '#33DFFF',
        background: '#00638A',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
