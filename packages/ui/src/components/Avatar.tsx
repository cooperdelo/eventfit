import React from 'react';
import { cn } from '../utils/cn';

/**
 * Avatar component matching reference images
 * Reference: Reference 1, 4, 5 (profile pictures)
 * Visual Requirements:
 * - Always: rounded-full object-cover
 * - Sizes: sm (32px), md (40px), lg (48px), xl (64px)
 * - Border: border-2 border-white (for overlap, Reference 1, 4)
 */
export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  badgeContent?: React.ReactNode;
  onClick?: () => void;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ size = 'md', showBadge = false, badgeContent, onClick, className, alt, ...props }, ref) => {
    return (
      <div className={cn('relative inline-block', onClick && 'cursor-pointer')} onClick={onClick}>
        <img
          ref={ref}
          alt={alt || 'Avatar'}
          className={cn(
            'rounded-full object-cover border-2 border-white',
            sizeClasses[size],
            className
          )}
          {...props}
        />
        {showBadge && badgeContent && (
          <div className="absolute -bottom-1 -right-1 flex items-center justify-center bg-white rounded-full border-2 border-white">
            {badgeContent}
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
