import React from 'react';
import { cn } from '../utils/cn';
import { Loader2 } from 'lucide-react';

/**
 * Button component matching reference images
 * Reference: All references (consistent button styling)
 * Visual Requirements (Reference 2, 5, 7):
 * - Primary: bg-blue-600 text-white rounded-lg px-6 py-2 font-medium
 * - Secondary: bg-white border border-gray-300 text-gray-700
 * - Hover: transition-colors duration-200
 * - Active: scale-[0.98] on press
 * - Disabled: opacity-50 cursor-not-allowed
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

    const variants = {
      primary: 'bg-primary text-white hover:bg-[#003d32] focus:ring-primary', // Emerald
      secondary:
        'bg-surface border border-border text-text-primary hover:bg-primary-light focus:ring-primary',
      outline: 'border-2 border-primary text-primary hover:bg-primary-light focus:ring-primary',
      ghost: 'text-text-primary hover:bg-primary-light focus:ring-primary',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-2 text-base',
      lg: 'px-8 py-3 text-lg',
    };

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <Loader2
            className={cn(
              'animate-spin',
              iconPosition === 'left' ? 'mr-2' : 'ml-2',
              size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'
            )}
          />
        )}
        {!loading && icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
        {children}
        {!loading && icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
