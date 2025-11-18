'use client';

import React, { useState } from 'react';
import { Modal, Button, Input, Toggle, Select } from '@eventfit/ui';
import { ImageUploader } from '../outfits/ImageUploader';
import { Calendar, MapPin, Shirt, Users, Lock, Globe } from 'lucide-react';
import type { SelectOption } from '@eventfit/ui';

/**
 * CreateEventModal component
 * Reference: Reference 5 (Instagram Settings) - Form design
 * Visual Requirements:
 * - Clean form layout
 * - Labels, inputs, helper text
 * - Character counters
 * - Toggle switches
 */
export interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: EventFormData) => void;
}

export interface EventFormData {
  title: string;
  description: string;
  date: Date;
  type: 'public' | 'private';
  theme?: string;
  coverPhoto?: File;
  doorlistCoverPhoto?: File;
  organizationId?: string;
  tags: string[];
}

const eventTypeOptions: SelectOption[] = [
  { value: 'public', label: 'Public - Campus-wide' },
  { value: 'private', label: 'Private - Invite Only' },
];

export const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState<'public' | 'private'>('public');
  const [theme, setTheme] = useState('');
  const [coverPhoto, setCoverPhoto] = useState<File[]>([]);
  const [doorlistCoverPhoto, setDoorlistCoverPhoto] = useState<File[]>([]);
  const [organization, setOrganization] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Event title is required';
    }

    if (!date) {
      newErrors.date = 'Event date is required';
    }

    if (!time) {
      newErrors.time = 'Event time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);

    // Combine date and time
    const eventDate = new Date(`${date}T${time}`);

    // Mock API call
    setTimeout(() => {
      const formData: EventFormData = {
        title,
        description,
        date: eventDate,
        type,
        theme: theme || undefined,
        coverPhoto: coverPhoto[0],
        doorlistCoverPhoto: doorlistCoverPhoto[0],
        organizationId: organization || undefined,
        tags,
      };

      onSubmit?.(formData);
      setIsSubmitting(false);
      handleClose();
    }, 1000);
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setType('public');
    setTheme('');
    setCoverPhoto([]);
    setDoorlistCoverPhoto([]);
    setOrganization('');
    setTags([]);
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Event"
      size="lg"
      closeOnBackdropClick={!isSubmitting}
    >
      <div className="space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto pr-2">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Basic Information</h3>

          <Input
            label="Event Title"
            value={title}
            onChange={setTitle}
            required
            error={errors.title}
            placeholder="e.g., Carolina Lights"
          />

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              maxLength={500}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your event..."
            />
            <p className="mt-1 text-xs text-text-tertiary text-right">{description.length} / 500</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                <Calendar className="h-4 w-4 inline mr-1" />
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
              {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
              {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
            </div>
          </div>
        </div>

        {/* Event Type & Visibility */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="text-lg font-semibold text-text-primary">Event Type</h3>

          <Select
            label="Visibility"
            options={eventTypeOptions}
            value={type}
            onChange={(value) => setType(value as 'public' | 'private')}
            helperText={
              type === 'public'
                ? 'Anyone on campus can see and join'
                : 'Only invited users can see and join'
            }
          />

          {type === 'private' && (
            <Input
              label="Organization"
              value={organization}
              onChange={setOrganization}
              placeholder="e.g., Alpha Delta Pi"
              helperText="Required for private events"
            />
          )}

          <Input
            label="Theme / Dress Code"
            value={theme}
            onChange={setTheme}
            placeholder="e.g., Formal, Casual, Concert"
            helperText="Optional dress code or theme"
          />
        </div>

        {/* Images */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="text-lg font-semibold text-text-primary">Event Images</h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Cover Photo</label>
            <ImageUploader images={coverPhoto} onImagesChange={setCoverPhoto} maxImages={1} />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              DoorList Cover Photo (Optional)
            </label>
            <ImageUploader
              images={doorlistCoverPhoto}
              onImagesChange={setDoorlistCoverPhoto}
              maxImages={1}
            />
            <p className="mt-1 text-xs text-text-secondary">
              This image will be prioritized in event feeds
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="text-lg font-semibold text-text-primary">Tags</h3>
          <Input
            label="Event Tags"
            value={tags.join(', ')}
            onChange={(value) =>
              setTags(
                value
                  .split(',')
                  .map((t) => t.trim())
                  .filter(Boolean)
              )
            }
            placeholder="concert, nightlife, formal"
            helperText="Separate tags with commas"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t">
        <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Create Event
        </Button>
      </div>
    </Modal>
  );
};
