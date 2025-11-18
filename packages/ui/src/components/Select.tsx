'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../utils/cn';

/**
 * Select/Dropdown component
 * Reference: Reference 5 (Instagram Settings) - Dropdown menus
 * Visual Requirements:
 * - Rounded border
 * - Dropdown arrow
 * - Selected value display
 * - Options list with hover states
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  multiple = false,
  label,
  error,
  helperText,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedValues = multiple ? (Array.isArray(value) ? value : []) : value ? [value] : [];

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter((v) => v !== optionValue)
        : [...currentValues, optionValue];
      onChange(newValues);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const displayValue = multiple
    ? selectedValues.length > 0
      ? `${selectedValues.length} selected`
      : placeholder
    : options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div className={cn('w-full', className)}>
      {label && <label className="block text-sm font-medium text-text-primary mb-1">{label}</label>}
      <div ref={selectRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full rounded-lg border px-4 py-2 text-left text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between',
            error ? 'border-red-500 text-red-600' : 'border-gray-300 text-text-primary'
          )}
          aria-label={label || 'Select option'}
        >
          <span className={cn(selectedValues.length === 0 && 'text-text-tertiary')}>
            {displayValue}
          </span>
          <ChevronDown
            className={cn(
              'h-4 w-4 text-text-tertiary transition-transform',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
            {options.map((option) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  disabled={option.disabled}
                  className={cn(
                    'w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between',
                    isSelected && 'bg-blue-50',
                    option.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className="h-4 w-4 text-blue-600" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && !error && <p className="mt-1 text-xs text-text-secondary">{helperText}</p>}
    </div>
  );
};
