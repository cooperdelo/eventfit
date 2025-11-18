/**
 * Notification types for EventFit
 */

export type NotificationType = 'event_reminder' | 'rental' | 'social' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  timestamp: string; // ISO date string
  relatedEventId?: string;
  relatedPostId?: string;
  relatedRentalId?: string;
  ctaUrl?: string;
  ctaLabel?: string;
  icon?: string; // Lucide icon name
}

export interface NotificationPreferences {
  pushEnabled: boolean;
  eventReminders: boolean;
  rentalAlerts: boolean;
  socialNotifications: boolean;
  weeklyDigest: boolean;
}
