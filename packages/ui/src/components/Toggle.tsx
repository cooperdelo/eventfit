'use client';

import React from 'react';
import { cn } from '../utils/cn';

/**
 * Toggle Switch component
 * Reference: Reference 5 (Instagram Settings) - Toggle switches
 * Visual Requirements:
 * - Rounded toggle switch
 * - Active state: blue background
 * - Inactive state: gray background
 * - Smooth transition
 */
export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className,
}) => {
  return (
    <div className={cn('flex items-start justify-between gap-4', className)}>
      <div className="flex-1">
        {label && (
          <label className="text-sm font-medium text-text-primary cursor-pointer">{label}</label>
        )}
        {description && <p className="text-xs text-text-secondary mt-1">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          checked ? 'bg-primary' : 'bg-gray-300',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        aria-label={label || 'Toggle'}
      >
        <span
          className={cn(
            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
            checked ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </button>
    </div>
  );
};
