'use client';

import React, { useState } from 'react';
import { Input, Button, Toggle, Select } from '@eventfit/ui';
import { UserProfile } from '@eventfit/types';
import { Save, Trash2 } from 'lucide-react';
import type { SelectOption } from '@eventfit/ui';

/**
 * SettingsForm component
 * Reference: Reference 5 (Instagram Settings) - Form design
 * Visual Requirements:
 * - Form fields with labels and helper text
 * - Toggle switches for preferences
 * - Character counters
 * - Prominent save button
 */
export interface SettingsFormProps {
  profile: UserProfile;
  onSave?: (data: Partial<UserProfile>) => void;
  onDeleteAccount?: () => void;
}

const notificationOptions: SelectOption[] = [
  { value: 'all', label: 'All Notifications' },
  { value: 'mentions', label: 'Mentions Only' },
  { value: 'none', label: 'No Notifications' },
];

export const SettingsForm: React.FC<SettingsFormProps> = ({ profile, onSave, onDeleteAccount }) => {
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio || '');
  const [emailNotifications, setEmailNotifications] = useState('all');
  const [pushNotifications, setPushNotifications] = useState(true);
  const [rentalNotifications, setRentalNotifications] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Mock API call
    setTimeout(() => {
      onSave?.({
        name,
        bio,
      });
      setIsSaving(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Profile Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Profile Settings</h3>

        <Input label="Full Name" value={name} onChange={setName} placeholder="Your full name" />

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            maxLength={150}
            className="w-full rounded-lg border border-border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Tell us about yourself..."
          />
          <p className="mt-1 text-xs text-text-tertiary text-right">{bio.length} / 150</p>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-semibold text-text-primary">Notification Preferences</h3>

        <Select
          label="Email Notifications"
          options={notificationOptions}
          value={emailNotifications}
          onChange={(value) => setEmailNotifications(Array.isArray(value) ? value[0] : value)}
          helperText="Choose how often you receive email notifications"
        />

        <Toggle
          checked={pushNotifications}
          onChange={setPushNotifications}
          label="Push Notifications"
          description="Receive push notifications on your device"
        />

        <Toggle
          checked={rentalNotifications}
          onChange={setRentalNotifications}
          label="Rental Updates"
          description="Get notified about rental requests and updates"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-t pt-6">
        <Button
          variant="secondary"
          onClick={onDeleteAccount}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Account
        </Button>
        <Button variant="primary" onClick={handleSave} loading={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};
