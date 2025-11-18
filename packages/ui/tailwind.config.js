/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Varsity (Emerald + Gold) Palette
        primary: {
          DEFAULT: '#004D40', // Emerald
          light: '#E0F2F1', // Light Teal
        },
        accent: '#FFC107', // Varsity Gold
        background: '#FBFBF9', // Vintage Cream
        surface: '#FFFFFF', // Pure White
        text: {
          primary: '#263238', // Deep Charcoal
          secondary: '#546E7A', // Muted Slate
          tertiary: '#90A4AE', // Light Slate
        },
        border: '#E0E0E0',
        error: '#D32F2F',
        success: '#388E3C',
        warning: '#FFC107',
        filter: {
          default: '#F5F5F5',
          active: '#E0F2F1',
          activeText: '#004D40',
        },
      },
      fontFamily: {
        varsity: ['var(--font-varsity)', 'Playfair Display', 'Georgia', 'serif'],
        heading: ['var(--font-varsity)', 'Playfair Display', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
};

