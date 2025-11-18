'use client';

import React from 'react';
import { NotificationCard } from './NotificationCard';
import { Notification } from '@eventfit/types';
import { Bell } from 'lucide-react';

/**
 * NotificationList component
 * Reference: Reference 5 (Instagram Settings) - List layout
 * Visual Requirements:
 * - Vertical list of notifications
 * - Empty state
 * - Loading state
 * - Mark all as read button
 */
export interface NotificationListProps {
  notifications: Notification[];
  loading?: boolean;
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDismiss?: (id: string) => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  loading = false,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-surface rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
          <Bell className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-varsity font-semibold text-text-primary mb-2">
          No notifications yet
        </h3>
        <p className="text-sm text-text-secondary">
          When you get notifications about events, rentals, or social activity, they'll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      {unreadCount > 0 && onMarkAllAsRead && (
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-text-secondary">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
          <button
            onClick={onMarkAllAsRead}
            className="text-sm font-medium text-primary hover:text-[#003d32] transition-colors"
          >
            Mark all as read
          </button>
        </div>
      )}

      {/* Notifications */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onMarkAsRead={onMarkAsRead}
            onDismiss={onDismiss}
          />
        ))}
      </div>
    </div>
  );
};
