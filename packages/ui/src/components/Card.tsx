import React from 'react';
import { cn } from '../utils/cn';

/**
 * Card component matching reference images
 * Reference: Reference 1, 3, 6, 7 (all cards)
 * Visual Requirements:
 * - Base: bg-white rounded-xl shadow-sm p-4 or p-6
 * - Hover: hover:shadow-lg hover:scale-[1.02] transition-all duration-300
 * - Border: border border-gray-200 (optional, Reference 5)
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  border?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ hover = false, padding = 'md', border = false, className, children, ...props }, ref) => {
    const paddingStyles = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      none: 'p-0',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'bg-surface rounded-xl shadow-sm',
          padding !== 'none' && paddingStyles[padding],
          border && 'border border-border',
          hover && 'hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
