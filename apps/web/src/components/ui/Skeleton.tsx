'use client';

import React from 'react';
import { cn } from '@eventfit/ui';

/**
 * Skeleton component for loading states
 * Reference: Quality standards - Loading states with shimmer effect
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className,
  ...props
}) => {
  const baseStyles = 'animate-pulse bg-gray-200 rounded';

  const variantStyles = {
    text: 'h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], className)}
      style={style}
      aria-label="Loading..."
      role="status"
      {...props}
    />
  );
};

/**
 * SkeletonCard - Pre-configured skeleton for cards
 */
export interface SkeletonCardProps {
  className?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ className }) => {
  return (
    <div className={cn('bg-surface rounded-xl p-6 space-y-4', className)}>
      <Skeleton variant="rectangular" height={200} className="w-full" />
      <div className="space-y-2">
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </div>
      <div className="flex gap-2">
        <Skeleton variant="rectangular" width={60} height={24} className="rounded-full" />
        <Skeleton variant="rectangular" width={60} height={24} className="rounded-full" />
      </div>
    </div>
  );
};

/**
 * SkeletonEventCard - Pre-configured skeleton for event cards
 */
export const SkeletonEventCard: React.FC<SkeletonCardProps> = ({ className }) => {
  return (
    <div className={cn('bg-surface rounded-xl overflow-hidden', className)}>
      <Skeleton variant="rectangular" height={256} className="w-full" />
      <div className="p-4 space-y-3">
        <Skeleton variant="text" width="70%" height={20} />
        <Skeleton variant="text" width="50%" height={16} />
        <div className="flex gap-2">
          <Skeleton variant="rectangular" width={60} height={24} className="rounded-full" />
          <Skeleton variant="rectangular" width={80} height={24} className="rounded-full" />
        </div>
      </div>
    </div>
  );
};
