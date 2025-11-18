'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@eventfit/ui';

/**
 * SearchBar component
 * Reference: Reference 3 (Pinterest Search) - Search bar pattern
 * Visual Requirements:
 * - Search input with icon
 * - Clear button
 * - Focus states
 */
export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search events, outfits, or users...',
  onFocus,
  onBlur,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={cn('relative w-full', className)}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-tertiary" />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
        aria-label="Search"
      />
      {value && (
        <button
          onClick={() => {
            onChange('');
            inputRef.current?.focus();
          }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
