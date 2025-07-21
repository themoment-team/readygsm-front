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
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        white: '#FFFFFF',
        black: '#000000',
        background: '#F5F9FB',
      },
    },
  },
  plugins: [],
};

export default config;
