/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard Variable', 'sans-serif'],
      },
      colors: {
        'var-black': '#171717',
        'nomad-black': '#112211',
        'var-gray8': '#4b4b4b',
        'var-gray7': '#79747e',
        'var-gray6': '#a4a1aa',
        'var-gray5': '#adaeb8',
        'var-gray4': '#cbc9cf',
        'var-gray3': '#dddddd',
        'var-gray2': '#eeeeee',
        'var-gray1': '#fafafa',
        'var-green2': '#0b3b2d',
        'var-green1': '#ced8d5',
        'var-red2': '#ff472e',
        'var-red1': '#ffe4e0',
        'var-green': '#00ac07',
        'var-orange2': '#ff7c1d',
        'var-orange1': '#fff4e8',
        'var-yellow': '#ffc23d',
        'var-blue3': '#0085ff',
        'var-blue2': '#2eb4ff',
        'var-blue1': '#e5f3ff',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        m: { max: '743px' },
        t: { min: '744px', max: '1280px' },
        p: { min: '1281px' },
      },
    },
  },
  plugins: [],
};
