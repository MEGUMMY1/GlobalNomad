import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'var-black': '#1b1b1b',
        'nomad-black': '#333236',
        'var-gray8': '#4b4b4b',
        'var-gray7': '#79747e',
        'var-gray6': '#a4a1aa',
        'var-gray5': '#adaeb8',
        'var-gray4': '#cbc9cf',
        'var-gray3': '#dddddd',
        'var-gray2': '#eeeeee',
        'var-gray1': '#fafafa',
        'var-green2': '#9b3b2d',
        'var-green1': '#f1effd',
        'var-red2': '#ff472e',
        'var-red1': '#ff472e',
        'var-green': '#00ac07',
        'var-orange2': '#ff7c1d',
        'var-orange1': '#fff4e8',
        'var-yellow': '#ffc23d',
        'var-blue3': '#0085ff',
        'var-blue2': '#2eb4ff',
        'var-blue1': '#23b4ff',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
