/**
 * Varsity (Emerald + Gold) Color Palette
 * Brand: Preppy, Academic, and Stylish
 * Core Vibe: Modern digital version of a classic college letterman jacket
 */
export const colors = {
  // Primary Brand Colors
  primary: '#004D40', // Emerald - Main buttons, active tabs, CTAs
  'primary-light': '#E0F2F1', // Light Teal - Light backgrounds, hover states
  accent: '#FFC107', // Varsity Gold - Notification badges, trending tags, highlights

  // Backgrounds
  background: '#FBFBF9', // Vintage Cream - Main page background
  surface: '#FFFFFF', // Pure White - Card backgrounds

  // Text Colors
  text: {
    primary: '#263238', // Deep Charcoal - Headlines and body text
    secondary: '#546E7A', // Muted Slate - Metadata, captions, helper text
    tertiary: '#90A4AE', // Lighter slate for disabled/placeholder text
  },

  // UI Colors
  border: '#E0E0E0', // Subtle borders
  error: '#D32F2F', // Error states
  success: '#388E3C', // Success states
  warning: '#FFC107', // Warning (uses accent gold)

  // Filter chip colors
  filter: {
    default: '#F5F5F5', // Default filter background
    active: '#E0F2F1', // Active filter (primary-light)
    activeText: '#004D40', // Active filter text (primary)
  },
} as const;
