import React from 'react';
import { cn } from '../utils/cn';

/**
 * Input component matching Reference 5 (Instagram Settings)
 * Visual Requirements (Reference 5):
 * - Label: font-medium text-gray-700 mb-1
 * - Input: rounded-lg border border-gray-300 p-3 w-full
 * - Focus: focus:ring-2 focus:ring-blue-500 focus:border-blue-500
 * - Error: border-red-500 text-red-600
 * - Helper text: text-sm text-gray-500 mt-1
 * - Char count: text-xs text-gray-400 absolute bottom-2 right-2 (Reference 5)
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  showCharCount?: boolean;
  maxLength?: number;
  onChange: (value: string) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      showCharCount = false,
      maxLength,
      value,
      onChange,
      className,
      id,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const stringValue = typeof value === 'string' ? value : '';
    const charCount = stringValue.length;
    const hasError = !!error;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block font-medium text-text-primary mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={maxLength}
            className={cn(
              'w-full rounded-lg border p-3 transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
              hasError
                ? 'border-error text-error focus:ring-error focus:border-error'
                : 'border-border text-text-primary',
              showCharCount && 'pr-16',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          {showCharCount && maxLength && (
            <span className="absolute bottom-2 right-2 text-xs text-text-tertiary">
              {charCount} / {maxLength}
            </span>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1 text-sm text-text-secondary">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
