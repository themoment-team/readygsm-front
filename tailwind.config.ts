import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pageContainer/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          sky: '#7ACDF4',
          lime: '#B2E449',
          navy: '#003365',
        },
        sub: {
          navy: '#051B30',
          blue: '#3C8AAF',
          lime: '#C8CE2B',
          green: '#73962B',
          orange: '#FF9877',
          yellow: '#F8FADB',
          gray: '#CDD5E2',
        },
        background: '#F5F9FB',
      },
    },
  },
  plugins: [],
};

export default config;
