/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e0e0e0',
          300: '#c0c0c0',
          400: '#a0a0a0',
          500: '#808080',
          600: '#5a5856',
          700: '#403d3c',
          800: '#2a2625',
          900: '#201C1C',
        },
        secondary: {
          50: '#fdfff4',
          100: '#fbffe8',
          200: '#f7ffc6',
          300: '#f1ff9f',
          400: '#e8ff6b',
          500: '#E6FF52',
          600: '#d4e83f',
          700: '#bfcc2d',
          800: '#9ea021',
          900: '#82851e',
        },
        dark: {
          100: '#1e1e1e',
          200: '#161616',
          300: '#0d0d0d',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #E6FF52, 0 0 10px #E6FF52, 0 0 15px #E6FF52' },
          '100%': { boxShadow: '0 0 10px #E6FF52, 0 0 20px #E6FF52, 0 0 30px #E6FF52' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 