import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        uom: {
          navy: '#003865',
          blue: '#0080A4',
          gold: '#C8A951',
          'gold-light': '#E8C97A',
        },
        bg: {
          primary: '#030D1A',
          secondary: '#071828',
          elevated: '#0D2340',
        },
        border: {
          DEFAULT: '#1A3A5C',
          bright: '#2A5A8C',
        },
        occupancy: {
          empty: '#4CAF7D',
          quiet: '#A8C44E',
          moderate: '#F5A623',
          busy: '#E87040',
          packed: '#E05252',
        }
      },
      fontFamily: {
        display: ['"Neue Haas Grotesk Display"', '"Helvetica Neue"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '20px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,56,101,0.3)',
        elevated: '0 8px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,56,101,0.2)',
      }
    }
  },
  plugins: []
} satisfies Config
