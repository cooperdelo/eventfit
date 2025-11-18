'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@eventfit/ui';
import { Notification } from '@eventfit/types';
import { Bell, Heart, MessageCircle, Calendar, ShoppingBag, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@eventfit/ui';

/**
 * NotificationCard component
 * Reference: Reference 5 (Instagram Settings) - Notification styling
 * Visual Requirements:
 * - Icon on left
 * - Title and message
 * - Timestamp
 * - CTA button if available
 * - Unread indicator
 */
export interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

const iconMap = {
  event_reminder: Calendar,
  rental: ShoppingBag,
  social: Heart,
  system: AlertCircle,
};

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onMarkAsRead,
  onDismiss,
}) => {
  const Icon = iconMap[notification.type] || Bell;
  const timeAgo = formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true });

  const handleClick = () => {
    if (!notification.read && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
  };

  const content = (
    <Card
      className={cn(
        'p-4 transition-all duration-200',
        !notification.read && 'bg-primary-light/30 border-l-4 border-l-primary'
      )}
      padding="none"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={cn(
            'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
            notification.type === 'event_reminder' && 'bg-primary-light text-primary',
            notification.type === 'rental' && 'bg-accent/20 text-accent',
            notification.type === 'social' && 'bg-pink-50 text-pink-600',
            notification.type === 'system' && 'bg-yellow-50 text-yellow-600'
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary mb-1">{notification.title}</h3>
              <p className="text-sm text-text-secondary mb-2">{notification.message}</p>
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-tertiary">{timeAgo}</span>
                {!notification.read && <span className="w-2 h-2 rounded-full bg-primary"></span>}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          {notification.ctaUrl && notification.ctaLabel && (
            <div className="mt-3">
              <Link
                href={notification.ctaUrl}
                className="inline-block text-sm font-medium text-primary hover:text-[#003d32] transition-colors"
                onClick={handleClick}
              >
                {notification.ctaLabel} →
              </Link>
            </div>
          )}
        </div>
      </div>
    </Card>
  );

  if (notification.ctaUrl) {
    return (
      <Link href={notification.ctaUrl} onClick={handleClick} className="block">
        {content}
      </Link>
    );
  }

  return <div onClick={handleClick}>{content}</div>;
};
