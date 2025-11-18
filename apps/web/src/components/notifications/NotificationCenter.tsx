'use client';

import React, { useState } from 'react';
import { Modal } from '@eventfit/ui';
import { NotificationList } from './NotificationList';
import { Notification, NotificationPreferences } from '@eventfit/types';
import { Settings } from 'lucide-react';
import { Button } from '@eventfit/ui';

/**
 * NotificationCenter component
 * Reference: Reference 5 (Instagram Settings) - Modal/drawer layout
 * Visual Requirements:
 * - Modal overlay
 * - Notification list
 * - Settings button
 * - Close button
 */
export interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  loading?: boolean;
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDismiss?: (id: string) => void;
  onSettingsClick?: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  loading = false,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
  onSettingsClick,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      title={
        <div className="flex items-center justify-between w-full">
          <span className="font-varsity font-bold text-text-primary">Notifications</span>
          {onSettingsClick && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSettingsClick}
              aria-label="Notification settings"
            >
              <Settings className="h-4 w-4" />
            </Button>
          )}
        </div>
      }
    >
      <div className="max-h-[60vh] overflow-y-auto">
        <NotificationList
          notifications={notifications}
          loading={loading}
          onMarkAsRead={onMarkAsRead}
          onMarkAllAsRead={onMarkAllAsRead}
          onDismiss={onDismiss}
        />
      </div>
    </Modal>
  );
};
