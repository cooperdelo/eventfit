import { format, parseISO } from 'date-fns';

/**
 * Format date for EventCard date badge
 * Returns two-line format: "NOV" (small) / "23" (large bold)
 * Reference: Reference 1 - Event Card date badge
 */
export function formatEventDateBadge(date: string | Date): { month: string; day: string } {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return {
    month: format(dateObj, 'MMM').toUpperCase(),
    day: format(dateObj, 'd'),
  };
}

/**
 * Format date for display
 */
export function formatDate(date: string | Date, formatStr: string = 'PP'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
}

/**
 * Format relative time (e.g., "2h ago", "5d ago")
 */
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`;
  return format(dateObj, 'MMM d');
}
