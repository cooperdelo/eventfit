'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@eventfit/ui';
import { formatEventDateBadge } from '@eventfit/lib';
import { EventCardProps } from '@eventfit/types';
import { Heart, MessageCircle, ShoppingBag } from 'lucide-react';
import { cn } from '@eventfit/ui';

/**
 * EventCard component matching Reference 1 exactly
 * Visual Requirements (Reference 1):
 * - Date badge: absolute top-3 left-3, light grey rounded rectangle
 *   Format: "NOV" (small) / "23" (large bold) - two-line
 * - Image: w-full h-48 or h-64, object-cover
 * - Gradient overlay: bottom 40% for text readability
 * - Event details on overlay:
 *   - Organizer: Small icon + name (light grey)
 *   - Title: Large, bold, white
 *   - Date & location: Smaller light grey with vertical bar separator
 * - Tags: Below image, rounded pills
 * - Hover: shadow-lg scale-[1.02] transition-all duration-300
 */
export const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  doorlistCoverPhoto,
  coverPhoto,
  startAt,
  campus,
  distanceMiles,
  tags = [],
  hasRentals = false,
  organizer,
}) => {
  const coverImage = doorlistCoverPhoto || coverPhoto;
  const dateBadge = formatEventDateBadge(startAt);

  return (
    <Link href={`/event/${id}`}>
      <Card hover className="overflow-hidden p-0 cursor-pointer" padding="none">
        {/* Image Container with Date Badge */}
        <div className="relative w-full h-48 md:h-64 overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Date Badge - Top Right */}
          <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-lg">
            <div className="text-xs font-medium text-text-primary uppercase">{dateBadge.month}</div>
            <div className="text-lg font-varsity font-bold text-text-primary">{dateBadge.day}</div>
          </div>

          {/* Gradient Overlay - Bottom 40% */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />

          {/* Event Details Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            {organizer && (
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-gray-400" />
                <span className="text-xs text-gray-300">{organizer.name}</span>
              </div>
            )}
            <h3 className="text-lg md:text-xl font-varsity font-bold mb-1 line-clamp-2">{title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span>
                {new Date(startAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              {distanceMiles !== undefined && (
                <>
                  <span>|</span>
                  <span>{distanceMiles.toFixed(1)} mi</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tags and Actions */}
        <div className="p-4">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-filter-active text-filter-activeText text-xs font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-1 text-text-secondary hover:text-primary transition-colors"
                aria-label="Like event"
              >
                <Heart className="h-5 w-5" />
                <span className="text-sm">0</span>
              </button>
              <button
                className="flex items-center gap-1 text-text-secondary hover:text-primary transition-colors"
                aria-label="Comment"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm">0</span>
              </button>
            </div>
            {hasRentals && <ShoppingBag className="h-5 w-5 text-accent" aria-label="Has rentals" />}
          </div>
        </div>
      </Card>
    </Link>
  );
};
