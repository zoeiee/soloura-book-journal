/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        night: {
          50: '#f5f3f0',
          100: '#ebe7e1',
          200: '#d7cfc7',
          300: '#c3b7ad',
          400: '#af9f93',
          500: '#9b8779',
          600: '#7d6b5f',
          700: '#5f4f45',
          800: '#41332b',
          900: '#1a1410',
          950: '#0d0b09',
        },
        ember: {
          50: '#fef9f3',
          100: '#fef3e6',
          200: '#fce7cc',
          300: '#fad8ad',
          400: '#f7c584',
          500: '#f4b366',
          600: '#d4933e',
          700: '#c59b27',
          800: '#7c4d1f',
          900: '#522e12',
          950: '#381d0b',
        },
        cream: '#f4efe9',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['system-ui', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': {
            opacity: '0.6',
            filter: 'drop-shadow(0 0 8px rgba(244, 179, 102, 0.3))',
          },
          '50%': {
            opacity: '0.8',
            filter: 'drop-shadow(0 0 16px rgba(244, 179, 102, 0.5))',
          },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      boxShadow: {
        candlelight: '0 0 30px rgba(244, 179, 102, 0.2)',
        'candlelight-lg': '0 0 50px rgba(244, 179, 102, 0.3)',
      },
    },
  },
  plugins: [],
}
