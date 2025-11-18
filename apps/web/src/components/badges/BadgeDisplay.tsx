'use client';

import React from 'react';
import { Badge as BadgeComponent } from '@eventfit/ui';
import { Badge } from '@eventfit/types';
import { Trophy, Star, Award, Zap, Crown } from 'lucide-react';
import { cn } from '@eventfit/ui';

/**
 * BadgeDisplay component
 * Reference: Design Reference Analysis - Badge display
 */
export interface BadgeDisplayProps {
  badges: Badge[];
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  className?: string;
}

const badgeIcons: Record<string, React.ReactNode> = {
  style_mvp: <Crown className="h-full w-full" />,
  trendsetter: <Trophy className="h-full w-full" />,
  most_rented: <Star className="h-full w-full" />,
  top_poster: <Award className="h-full w-full" />,
  early_adopter: <Zap className="h-full w-full" />,
  star_renter: <Star className="h-full w-full" />,
};

const badgeColors: Record<string, string> = {
  style_mvp: 'text-accent',
  trendsetter: 'text-primary',
  most_rented: 'text-accent',
  top_poster: 'text-primary',
  early_adopter: 'text-accent',
  star_renter: 'text-accent',
};

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({
  badges,
  size = 'md',
  showTooltip = false,
  className,
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  if (badges.length === 0) {
    return null;
  }

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {badges.map((badge) => {
        const Icon = badgeIcons[badge.id] || <Award className="h-full w-full" />;
        const colorClass = badgeColors[badge.id] || 'text-primary';

        return (
          <div
            key={badge.id}
            className={cn(
              'relative flex items-center justify-center rounded-full bg-primary-light border-2 border-primary/20',
              sizeClasses[size],
              colorClass
            )}
            title={showTooltip ? badge.description : undefined}
          >
            {Icon}
          </div>
        );
      })}
    </div>
  );
};
