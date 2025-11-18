/**
 * Typography tokens - Varsity Brand
 * Varsity font for headers (bold, established, preppy)
 * Clean modern font for body text
 */
export const typography = {
  fontFamily: {
    varsity: '"Playfair Display", "Georgia", serif', // Varsity font - bold headers
    heading: '"Playfair Display", "Georgia", serif', // Varsity for headings
    body: '"Inter", system-ui, sans-serif', // Clean modern font for body
  },
  sizes: {
    xs: '12px', // Helper text, metadata
    sm: '14px', // Secondary text
    base: '16px', // Body text
    lg: '18px', // Card titles
    xl: '20px', // Section titles
    '2xl': '24px', // Page titles
    '3xl': '30px', // Hero headlines
    '4xl': '36px', // Large hero
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;
