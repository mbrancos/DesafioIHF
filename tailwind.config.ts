import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ihf: {
          brand: {
            primary: '#812926',
            forest: '#063b27',
            lime: '#b9ee8d',
            navy: '#1c395c',
            cyan: '#41bed0',
            peach: '#fde2ce',
          },
          bg: {
            primary: '#f7f6f2',
            white: '#ffffff',
            light: '#f3f4f5',
            dark: '#212020',
            'dark-line': '#333333',
            'navy-card': '#1c395c',
            'cyan-card': '#e2f5f8',
          },
          text: {
            primary: '#212020',
            heading: '#812926',
            body: '#333333',
            'body-alt': '#484848',
            muted: '#c1c1c1',
            'on-dark': '#ffffff',
            'on-brand': '#fde2ce',
          },
          border: {
            light: '#e5e5e5',
            dark: '#333333',
          },
          status: {
            error: '#DC2626',
            warning: '#D97706',
            success: '#16A34A',
            info: '#1C395C',
          },
        },
      },
      fontFamily: {
        poppins: ['var(--poppins)', 'Poppins', 'sans-serif'],
        walsheim: ['var(--GT-Walsheim)', 'GT Walsheim', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.08)',
        modal: '0 20px 40px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
