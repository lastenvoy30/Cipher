/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
        background: 'var(--color-background)', // gray-950
        foreground: 'var(--color-foreground)', // cyan-50
        primary: {
          DEFAULT: 'var(--color-primary)', // teal-700
          foreground: 'var(--color-primary-foreground)', // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // teal-500
          foreground: 'var(--color-secondary-foreground)', // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-500
          foreground: 'var(--color-destructive-foreground)', // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // gray-800
          foreground: 'var(--color-muted-foreground)', // cyan-300
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // coral-500
          foreground: 'var(--color-accent-foreground)', // white
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // gray-900
          foreground: 'var(--color-popover-foreground)', // cyan-50
        },
        card: {
          DEFAULT: 'var(--color-card)', // gray-900
          foreground: 'var(--color-card-foreground)', // cyan-50
        },
        success: {
          DEFAULT: 'var(--color-success)', // green-400
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // amber-400
          foreground: 'var(--color-warning-foreground)', // gray-900
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-500
          foreground: 'var(--color-error-foreground)', // white
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        heading: ['JetBrains Mono', 'monospace'],
        body: ['Outfit', 'sans-serif'],
        caption: ['Source Sans 3', 'sans-serif'],
        data: ['Fira Code', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'glow-sm': '0 2px 4px rgba(13, 115, 119, 0.1)',
        'glow': '0 4px 6px rgba(13, 115, 119, 0.15)',
        'glow-md': '0 6px 12px rgba(13, 115, 119, 0.2)',
        'glow-lg': '0 12px 24px rgba(13, 115, 119, 0.25)',
        'glow-xl': '0 25px 50px rgba(13, 115, 119, 0.3)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}