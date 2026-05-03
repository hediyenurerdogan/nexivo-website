import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#09090b',
        'text-light': '#f4f4f5',
        'accent-green': '#10b981',
        'accent-purple': '#8b5cf6',
        'card-dark': '#18181b',
        'border-subtle': '#27272a',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'pulse-border': {
          '0%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.4)' },
          '70%': { boxShadow: '0 0 0 10px rgba(16, 185, 129, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)' },
        }
      },
      animation: {
        'pulse-border': 'pulse-border 2s infinite',
      }
    }
  },
  plugins: [],
};
