/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#040b17',
          900: '#081226',
          850: '#0d1a35',
          800: '#112246',
          700: '#1b356b',
          600: '#274b94',
          500: '#396ac3',
          400: '#608fe6',
          300: '#93b5f3',
          200: '#c5d8fb',
          100: '#e5eeff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        cursive: ['Dancing Script', 'Great Vibes', 'cursive'],
        retro: ['Courier New', 'monospace'],
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(96, 143, 230, 0.5)',
        'glow-moon': '0 0 50px 10px rgba(229, 238, 255, 0.45)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
}
