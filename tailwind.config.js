/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
     "./app.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#2F88FF',
        error: '#D22B2B',
        
        primaryBlue: {
          DEFAULT: '#2F88FF',
          50: '#E6F1FF',
          100: '#CCE2FF',
          200: '#99C5FF',
          300: '#66A8FF',
          400: '#338BFF',
          500: '#2F88FF', 
          600: '#0066CC',
          700: '#004C99',
          800: '#003366',
          900: '#001933',
        },
        error: {
          DEFAULT: '#D22B2B',
          50: '#FBE9E9',
          100: '#F7D3D3',
          200: '#EFA7A7',
          300: '#E77B7B',
          400: '#DF4F4F',
          500: '#D22B2B', 
          600: '#A82222',
          700: '#7E1A1A',
          800: '#541111',
          900: '#2A0909',
        }
      },
      fontFamily: {
        sans: ['Poppins-Regular', 'sans-serif'],
        'poppins_thin': ['Poppins-Thin', 'sans-serif'],
        'poppins_light': ['Poppins-Light', 'sans-serif'],
        'poppins_regular': ['Poppins-Regular', 'sans-serif'],
        'poppins_medium': ['Poppins-Medium', 'sans-serif'],
        'poppins_semibold': ['Poppins-SemiBold', 'sans-serif'],
        'poppins_bold': ['Poppins-Bold', 'sans-serif'],
        'poppins_extrabold': ['Poppins-ExtraBold', 'sans-serif'],
        'poppins_black': ['Poppins-Black', 'sans-serif'],
      },
    },
  },
  plugins: [],
}