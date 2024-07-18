/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
        'var-dark1': '#282828',
        'var-dark2': '#3B3B3B',
        'var-dark3': '#4B4B4B',
        'var-dark4': '#646464',
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
      keyframes: {
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-10%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.3s ease-in-out forwards',
        slideRight: 'slideRight 0.3s ease-in-out forwards',
      },
      screens: {
        m: { max: '743px' },
        t: { min: '744px', max: '1280px' },
        p: { min: '1281px' },
      },
      boxShadow: {
        card: '0px 4px 16px 0px rgba(17, 34, 17, 0.05)',
        kategorieDropdown: '0px 10px 30px 3px rgba(5, 16, 55, 0.15);',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
