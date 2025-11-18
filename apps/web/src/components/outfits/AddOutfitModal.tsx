'use client';

import React, { useState } from 'react';
import { Modal, Button, Input, Toggle, Select } from '@eventfit/ui';
import { ImageUploader } from './ImageUploader';
import { TagInput } from './TagInput';
import { DollarSign, Tag, Eye } from 'lucide-react';
import type { SelectOption } from '@eventfit/ui';

/**
 * AddOutfitModal component
 * Reference: Reference 5 (Instagram Settings) - Form design
 * Visual Requirements:
 * - Clean form layout
 * - Labels, inputs, helper text
 * - Character counters
 * - Toggle switches
 * - Prominent submit button
 */
export interface AddOutfitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: OutfitFormData) => void;
  eventOptions?: SelectOption[];
}

export interface OutfitFormData {
  images: File[];
  name: string;
  description: string;
  eventIds: string[];
  category: string;
  sizes: string[];
  price?: number;
  depositRequired: boolean;
  isRentable: boolean;
  isInspiration: boolean;
  tags: string[];
  visibility: 'public' | 'friends' | 'org-only';
}

const categoryOptions: SelectOption[] = [
  { value: 'dress', label: 'Dress' },
  { value: 'top', label: 'Top' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'accessory', label: 'Accessory' },
  { value: 'shoes', label: 'Shoes' },
  { value: 'other', label: 'Other' },
];

const sizeOptions: SelectOption[] = [
  { value: 'XS', label: 'XS' },
  { value: 'S', label: 'S' },
  { value: 'M', label: 'M' },
  { value: 'L', label: 'L' },
  { value: 'XL', label: 'XL' },
  { value: 'XXL', label: 'XXL' },
  { value: 'Custom', label: 'Custom Size' },
];

const visibilityOptions: SelectOption[] = [
  { value: 'public', label: 'Public' },
  { value: 'friends', label: 'Friends Only' },
  { value: 'org-only', label: 'Organization Only' },
];

export const AddOutfitModal: React.FC<AddOutfitModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  eventOptions = [],
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [eventIds, setEventIds] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [sizes, setSizes] = useState<string[]>([]);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [depositRequired, setDepositRequired] = useState(false);
  const [isRentable, setIsRentable] = useState(false);
  const [isInspiration, setIsInspiration] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<'public' | 'friends' | 'org-only'>('public');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (images.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    if (!name.trim()) {
      newErrors.name = 'Outfit name is required';
    }

    if (!category) {
      newErrors.category = 'Category is required';
    }

    if (sizes.length === 0) {
      newErrors.sizes = 'At least one size is required';
    }

    if (isRentable && !price) {
      newErrors.price = 'Price is required for rentable items';
    }

    if (isRentable && price && price < 0) {
      newErrors.price = 'Price must be positive';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);

    // Mock API call - simulate delay
    setTimeout(() => {
      const formData: OutfitFormData = {
        images,
        name,
        description,
        eventIds,
        category,
        sizes,
        price,
        depositRequired,
        isRentable,
        isInspiration,
        tags,
        visibility,
      };

      onSubmit?.(formData);
      setIsSubmitting(false);
      handleClose();
    }, 1000);
  };

  const handleClose = () => {
    // Reset form
    setImages([]);
    setName('');
    setDescription('');
    setEventIds([]);
    setCategory('');
    setSizes([]);
    setPrice(undefined);
    setDepositRequired(false);
    setIsRentable(false);
    setIsInspiration(false);
    setTags([]);
    setVisibility('public');
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Outfit"
      size="lg"
      closeOnBackdropClick={!isSubmitting}
    >
      <div className="space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto pr-2">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Photos <span className="text-red-500">*</span>
          </label>
          <ImageUploader images={images} onImagesChange={setImages} maxImages={5} />
          {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
        </div>

        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Basic Information</h3>

          <Input
            label="Outfit Name"
            value={name}
            onChange={setName}
            required
            error={errors.name}
            placeholder="e.g., Black Formal Dress"
          />

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              maxLength={500}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your outfit..."
            />
            <p className="mt-1 text-xs text-text-tertiary text-right">{description.length} / 500</p>
          </div>

          {eventOptions.length > 0 && (
            <Select
              label="Tag Events"
              options={eventOptions}
              value={eventIds}
              onChange={(value) => setEventIds(Array.isArray(value) ? value : [value])}
              multiple
              placeholder="Select events..."
              helperText="Link this outfit to one or more events"
            />
          )}

          <Select
            label="Category"
            options={categoryOptions}
            value={category}
            onChange={(value) => setCategory(Array.isArray(value) ? value[0] : value)}
            required
            error={errors.category}
            placeholder="Select category..."
          />

          <Select
            label="Size"
            options={sizeOptions}
            value={sizes}
            onChange={(value) => setSizes(Array.isArray(value) ? value : [value])}
            multiple
            required
            error={errors.sizes}
            placeholder="Select sizes..."
            helperText="Select all available sizes"
          />
        </div>

        {/* Rental Info */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="text-lg font-semibold text-text-primary">Rental Information</h3>

          <Toggle
            checked={isRentable}
            onChange={setIsRentable}
            label="Available for Rent"
            description="Allow others to rent this outfit"
          />

          {isRentable && (
            <div className="space-y-4 pl-4 border-l-2 border-gray-200">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Price per Rental <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-tertiary" />
                  <input
                    type="number"
                    value={price || ''}
                    onChange={(e) =>
                      setPrice(e.target.value ? parseFloat(e.target.value) : undefined)
                    }
                    min="0"
                    step="0.01"
                    className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                <p className="mt-1 text-xs text-text-secondary">Price in USD per rental period</p>
              </div>

              <Toggle
                checked={depositRequired}
                onChange={setDepositRequired}
                label="Require Deposit"
                description="Hold a deposit until item is returned"
              />
            </div>
          )}

          <Toggle
            checked={isInspiration}
            onChange={setIsInspiration}
            label="Inspiration Only"
            description="Show as inspiration, not available for rent"
          />
        </div>

        {/* Advanced Options */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="text-lg font-semibold text-text-primary">Additional Options</h3>

          <TagInput
            tags={tags}
            onTagsChange={setTags}
            placeholder="Add tags (e.g., #Formal, #Gameday)"
            maxTags={10}
          />

          <Select
            label="Visibility"
            options={visibilityOptions}
            value={visibility}
            onChange={(value) => setVisibility(value as 'public' | 'friends' | 'org-only')}
            helperText="Who can see this outfit"
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
          Post Outfit
        </Button>
      </div>
    </Modal>
  );
};
