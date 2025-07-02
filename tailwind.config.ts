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
        main: '#3B82F6',
        sub: '#EFF6FF',
        background: '#FAFAFA',
        gray: '#A8A8A8',
        black: '#121212',
        red: '#EF4444',
        green: '#10B981',
        purple: '#6366F1',
      },
    },
  },
  plugins: [],
};

export default config;
