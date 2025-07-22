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
      screens: {
        // Mobile
        mobile: '450px',
        'mobile-lg': '600px',
        // Tablet
        'tablet-sm': '750px',
        tablet: '850px',
        'tablet-lg': '1024px',
        // Desktop
        'desktop-sm': '1200px',
        desktop: '1440px',
        'desktop-lg': '1728px',
        'desktop-xl': '1920px',
      },
    },
  },
  plugins: [],
};

export default config;
