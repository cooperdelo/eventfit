'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../../components/auth';
import { Navbar, BottomNavigation } from '@eventfit/ui';
import { NotificationList } from '../../components/notifications';
import { Notification } from '@eventfit/types';
import { Bell, Settings } from 'lucide-react';
import { Button } from '@eventfit/ui';
import Link from 'next/link';

/**
 * Notifications Page
 * Reference: Reference 5 (Instagram Settings) - Full page layout
 * Visual Requirements:
 * - Page header with title
 * - Settings link
 * - Notification list
 * - Empty state
 */
export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch notifications from API
    // Mock data for now
    const mockNotifications: Notification[] = [
      {
        id: 'notif_1',
        type: 'event_reminder',
        title: 'Event Reminder',
        message: 'Carolina Lights is in 3 days — check what others are wearing.',
        read: false,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        relatedEventId: 'evt_1',
        ctaUrl: '/event/evt_1',
        ctaLabel: 'View Event',
      },
      {
        id: 'notif_2',
        type: 'rental',
        title: 'Rental Request',
        message: 'Sarah wants to rent your "Formal Night Look" outfit.',
        read: false,
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        relatedRentalId: 'rental_1',
        ctaUrl: '/rentals/rental_1',
        ctaLabel: 'View Request',
      },
      {
        id: 'notif_3',
        type: 'social',
        title: 'New Like',
        message: 'Emma liked your outfit post for Carolina Lights.',
        read: true,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        relatedPostId: 'post_1',
        ctaUrl: '/outfit/post_1',
        ctaLabel: 'View Post',
      },
    ];
    setNotifications(mockNotifications);
    setLoading(false);
  }, []);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    // TODO: Call API to mark as read
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    // TODO: Call API to mark all as read
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8 pb-24">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-varsity font-bold text-text-primary">Notifications</h1>
            <Link href="/notifications/settings">
              <Button variant="ghost" size="sm" aria-label="Notification settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>

          {/* Notification List */}
          <NotificationList
            notifications={notifications}
            loading={loading}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
          />
        </main>
        <BottomNavigation />
      </div>
    </ProtectedRoute>
  );
}
