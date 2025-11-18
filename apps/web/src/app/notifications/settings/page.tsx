'use client';

import { useState } from 'react';
import { ProtectedRoute } from '../../../components/auth';
import { Navbar, BottomNavigation, Card, Button, Toggle } from '@eventfit/ui';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { NotificationPreferences } from '@eventfit/types';

/**
 * Notification Settings Page
 * Reference: Reference 5 (Instagram Settings) - Settings layout
 * Visual Requirements:
 * - Toggle switches for each notification type
 * - Clean, organized layout
 * - Save button
 */
export default function NotificationSettingsPage() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    pushEnabled: true,
    eventReminders: true,
    rentalAlerts: true,
    socialNotifications: true,
    weeklyDigest: false,
  });

  const handleSave = () => {
    // TODO: Save preferences to API
    console.log('Saving preferences:', preferences);
    // Navigate back
    window.history.back();
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8 pb-24 max-w-2xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/notifications">
              <Button variant="ghost" size="sm" aria-label="Back to notifications">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-varsity font-bold text-text-primary">
              Notification Settings
            </h1>
          </div>

          <Card padding="lg">
            <div className="space-y-6">
              {/* Push Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Push Notifications</h3>
                  <p className="text-sm text-text-secondary">
                    Receive push notifications on your device
                  </p>
                </div>
                <Toggle
                  checked={preferences.pushEnabled}
                  onChange={(checked) => setPreferences({ ...preferences, pushEnabled: checked })}
                />
              </div>

              {/* Event Reminders */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Event Reminders</h3>
                  <p className="text-sm text-text-secondary">Get reminders about upcoming events</p>
                </div>
                <Toggle
                  checked={preferences.eventReminders}
                  onChange={(checked) =>
                    setPreferences({ ...preferences, eventReminders: checked })
                  }
                />
              </div>

              {/* Rental Alerts */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Rental Alerts</h3>
                  <p className="text-sm text-text-secondary">
                    Notifications about rental requests and returns
                  </p>
                </div>
                <Toggle
                  checked={preferences.rentalAlerts}
                  onChange={(checked) => setPreferences({ ...preferences, rentalAlerts: checked })}
                />
              </div>

              {/* Social Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Social Notifications</h3>
                  <p className="text-sm text-text-secondary">
                    Likes, comments, and social activity
                  </p>
                </div>
                <Toggle
                  checked={preferences.socialNotifications}
                  onChange={(checked) =>
                    setPreferences({ ...preferences, socialNotifications: checked })
                  }
                />
              </div>

              {/* Weekly Digest */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Weekly Digest</h3>
                  <p className="text-sm text-text-secondary">
                    Receive a weekly summary instead of instant notifications
                  </p>
                </div>
                <Toggle
                  checked={preferences.weeklyDigest}
                  onChange={(checked) => setPreferences({ ...preferences, weeklyDigest: checked })}
                />
              </div>

              {/* Save Button */}
              <div className="pt-4 border-t border-border">
                <Button variant="primary" size="lg" className="w-full" onClick={handleSave}>
                  Save Preferences
                </Button>
              </div>
            </div>
          </Card>
        </main>
        <BottomNavigation />
      </div>
    </ProtectedRoute>
  );
}
