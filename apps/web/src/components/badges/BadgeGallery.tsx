'use client';

import React from 'react';
import { Card } from '@eventfit/ui';
import { Badge } from '@eventfit/types';
import { BadgeDisplay } from './BadgeDisplay';
import { Lock } from 'lucide-react';
import { cn } from '@eventfit/ui';

/**
 * BadgeGallery component
 * Shows all available badges and user's unlocked badges
 */
export interface BadgeGalleryProps {
  unlockedBadges: Badge[];
  allBadges: Badge[];
  className?: string;
}

export const BadgeGallery: React.FC<BadgeGalleryProps> = ({
  unlockedBadges,
  allBadges,
  className,
}) => {
  const unlockedIds = new Set(unlockedBadges.map((b) => b.id));

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {allBadges.map((badge) => {
        const isUnlocked = unlockedIds.has(badge.id);
        const unlockedBadge = unlockedBadges.find((b) => b.id === badge.id);

        return (
          <Card
            key={badge.id}
            className={cn('p-6 text-center', !isUnlocked && 'opacity-60')}
            hover={isUnlocked}
          >
            <div className="flex justify-center mb-4">
              <BadgeDisplay badges={isUnlocked ? [unlockedBadge!] : []} size="lg" />
            </div>
            <h3 className="font-semibold text-text-primary mb-2">{badge.name}</h3>
            <p className="text-sm text-text-secondary mb-4">{badge.description}</p>
            {isUnlocked && unlockedBadge?.unlockedAt && (
              <p className="text-xs text-text-tertiary">
                Unlocked {new Date(unlockedBadge.unlockedAt).toLocaleDateString()}
              </p>
            )}
            {!isUnlocked && (
              <div className="flex items-center justify-center gap-2 text-xs text-text-tertiary">
                <Lock className="h-3 w-3" />
                <span>Locked</span>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};
