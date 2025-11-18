/**
 * Validate .edu email address
 * Reference: Technical Plan - UNC email Verification System
 */
export function validateEduEmail(email: string): boolean {
  const eduEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/;
  return eduEmailRegex.test(email);
}

/**
 * Extract school name from email domain
 */
export function extractSchoolFromEmail(email: string): string | null {
  const match = email.match(/@([^.]+)\.edu$/);
  return match ? match[1].toUpperCase() : null;
}
