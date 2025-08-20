/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#7CC5C5', // Primary brand color
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        blue: {
          500: '#4A90E2', // Accent color
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#8A8A8A', // Medium gray
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#333333', // Dark gray
          950: '#0a0a0a', // Charcoal dark
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // SIMPLIFIED FONT SYSTEM - Primary sizes (6 total)
        'xl': ['3rem', { lineHeight: '1.2' }],        // Hero titles
        'lg': ['2rem', { lineHeight: '1.3' }],        // Section headings  
        'md': ['1.25rem', { lineHeight: '1.4' }],     // Subheadings
        'base': ['1rem', { lineHeight: '1.6' }],      // Body text
        'sm': ['0.875rem', { lineHeight: '1.5' }],    // Small text
        'xs': ['0.75rem', { lineHeight: '1.4' }],     // Captions

        // LEGACY SIZES - Keep for backward compatibility and section-specific overrides
        'hero-xl': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'hero': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-xl': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-lg': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'heading': ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'heading-sm': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'subtitle-lg': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        'subtitle': ['1.125rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        'body-xl': ['1.25rem', { lineHeight: '1.6' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'ui-lg': ['1rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        'ui': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        'ui-sm': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.03em' }],
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
      },
      fontWeight: {
        'thin': '100',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 25px rgba(0, 0, 0, 0.15)',
        'nav': '0 2px 10px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
} 