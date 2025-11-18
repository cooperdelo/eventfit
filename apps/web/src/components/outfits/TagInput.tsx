'use client';

import React, { useState, KeyboardEvent } from 'react';
import { X, Hash } from 'lucide-react';
import { cn } from '@eventfit/ui';
import { Input } from '@eventfit/ui';

/**
 * TagInput component
 * Reference: Reference 3, 6 (Pinterest Search, E-commerce) - Filter chips
 * Visual Requirements:
 * - Input field for adding tags
 * - Tag chips with remove button
 * - Rounded pills
 * - Active state styling
 */
export interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  className?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onTagsChange,
  placeholder = 'Add tags (e.g., #Formal, #Gameday)',
  maxTags = 10,
  className,
}) => {
  const [inputValue, setInputValue] = useState('');

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().replace(/^#/, '');
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < maxTags) {
      onTagsChange([...tags, trimmedTag]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <Input
        value={inputValue}
        onChange={setInputValue}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        helperText={`Press Enter or comma to add. Max ${maxTags} tags.`}
      />

      {/* Tags Display */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-800 text-sm font-medium rounded-full"
            >
              <Hash className="h-3 w-3" />
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 hover:text-red-600 transition-colors"
                aria-label={`Remove tag ${tag}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
