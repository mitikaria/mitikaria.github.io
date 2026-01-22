import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Primary font - close to common portfolio fonts
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['DM Sans', 'Helvetica Neue', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Portfolio color palette - will be refined after extraction
        'portfolio': {
          'cream': '#F5F2EB',
          'dark': '#1A1A1A',
          'accent': '#E07B54',
          'blue': '#2B4C7E',
          'sage': '#8B9A7D',
          'warm': '#D4A574',
          'gray': '#6B6B6B',
          'light': '#FAFAF8',
        }
      },
      aspectRatio: {
        'page': '16 / 9', // Landscape portfolio format
        'letter': '8.5 / 11', // Standard letter
        'a4': '210 / 297', // A4 ratio
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
