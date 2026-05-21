/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep, rich dark palette
        'night': {
          50: '#f5f3f0',
          100: '#ebe7e1',
          200: '#d7cfc7',
          300: '#c3b7ad',
          400: '#af9f93',
          500: '#9b8779',
          600: '#7d6b5f',
          700: '#5f4f45',
          800: '#41332b',
          900: '#2a221d',
          950: '#1a1410',
        },
        // Warm, candlelit accent palette
        'ember': {
          50: '#fef9f3',
          100: '#fef3e6',
          200: '#fce7cc',
          300: '#fad8ad',
          400: '#f7c584',
          500: '#f4b366',
          600: '#d4933e',
          700: '#a86a2a',
          800: '#7c4d1f',
          900: '#522e12',
          950: '#381d0b',
        },
        // Soft cream for text
        'cream': '#f5ede3',
        'cream-dark': '#e8ddd0',
      },
      fontFamily: {
        'serif': ['var(--font-playfair)', 'Georgia', 'serif'],
        'display': ['var(--font-cormorant)', 'Georgia', 'serif'],
        'body': ['var(--font-lora)', 'Georgia', 'serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '3.5rem' }],
      },
      animation: {
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'page-fade': 'pageFade 0.5s ease-out',
        'page-slide-up': 'pageSlideUp 0.5s ease-out',
        'card-lift': 'cardLift 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        pageFade: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        pageSlideUp: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        cardLift: {
          from: {
            transform: 'translateY(0)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          },
          to: {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 40px rgba(244, 179, 102, 0.2)',
          },
        },
      },
      boxShadow: {
        'candlelight': '0 0 30px rgba(244, 179, 102, 0.2)',
        'candlelight-lg': '0 0 50px rgba(244, 179, 102, 0.3)',
        'inset-glow': 'inset 0 0 20px rgba(244, 179, 102, 0.1)',
      },
      backdropBlur: {
        'sm': '4px',
        'md': '12px',
      },
    },
  },
  plugins: [],
}
