import React from 'react';
import { cn } from '../utils/cn';

/**
 * Badge/Tag component matching reference images
 * Reference: Reference 1, 3, 6 (filter chips, tags)
 * Visual Requirements (Reference 3, 6):
 * - Default: px-3 py-1 rounded-full bg-gray-100 text-gray-700
 * - Active filter: bg-teal-50 text-teal-800 (Reference 3)
 * - Hover: hover:bg-gray-200 transition-colors
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'filter';
  size?: 'sm' | 'md';
  active?: boolean; // For filter chips
  onClick?: () => void;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { variant = 'default', size = 'md', active = false, onClick, className, children, ...props },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-full font-medium transition-colors';

    const variants = {
      default: 'bg-filter-default text-text-primary',
      primary: 'bg-primary-light text-primary',
      success: 'bg-green-50 text-green-800',
      warning: 'bg-yellow-50 text-yellow-800',
      error: 'bg-red-50 text-red-800',
      filter: active
        ? 'bg-filter-active text-filter-activeText hover:bg-primary-light/80'
        : 'bg-filter-default text-text-secondary hover:bg-filter-default/80',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
    };

    const Component = onClick ? 'button' : 'span';

    return (
      <Component
        ref={onClick ? (ref as React.Ref<HTMLButtonElement>) : (ref as React.Ref<HTMLSpanElement>)}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          onClick && 'cursor-pointer',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Badge.displayName = 'Badge';
