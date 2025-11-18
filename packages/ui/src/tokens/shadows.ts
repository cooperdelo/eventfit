/**
 * Shadow tokens - subtle, not glowing
 * Reference: DESIGN_REFERENCE_ANALYSIS.md - Reference 3, 5, 6, 7
 */
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)', // Card default
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)', // Card hover
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)', // Modal
} as const;
