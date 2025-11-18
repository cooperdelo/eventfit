'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@eventfit/ui';
import { ExternalLink, Heart, Share2, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@eventfit/ui';

/**
 * InspirationCard component
 * Reference: Reference 2, 3, 7 (Pinterest-style cards)
 * Visual Requirements:
 * - Image fills card
 * - Variable height (masonry)
 * - Hover effects
 * - Affiliate link indicator
 */
export interface InspirationCardProps {
  id: string;
  image: string;
  title: string;
  description?: string;
  source?: string;
  affiliateLink?: string;
  eventType?: string;
  isLiked?: boolean;
  likesCount?: number;
  onLike?: (id: string) => void;
  onSwipeUp?: (id: string) => void; // Navigate to rental/outfit page
  matchingRentalsCount?: number;
}

export const InspirationCard: React.FC<InspirationCardProps> = ({
  id,
  image,
  title,
  description,
  source,
  affiliateLink,
  eventType,
  isLiked = false,
  likesCount = 0,
  onLike,
  onSwipeUp,
  matchingRentalsCount = 0,
}) => {
  const [isLikedState, setIsLikedState] = React.useState(isLiked);
  const [likesCountState, setLikesCountState] = React.useState(likesCount);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLikedState(!isLikedState);
    setLikesCountState(isLikedState ? likesCountState - 1 : likesCountState + 1);
    onLike?.(id);
  };

  // Swipe up detection
  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > minSwipeDistance;
    if (isUpSwipe && onSwipeUp) {
      onSwipeUp(id);
    }
  };

  const handleSwipeUpClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSwipeUp?.(id);
  };

  return (
    <Card hover className="overflow-hidden p-0 cursor-pointer group" padding="none">
      {/* Image */}
      <div
        className="relative w-full aspect-[3/4] overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Affiliate Badge */}
        {affiliateLink && (
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 bg-primary text-white text-xs font-medium rounded-full flex items-center gap-1">
              <ExternalLink className="h-3 w-3" />
              Shop
            </span>
          </div>
        )}

        {/* Event Type Badge */}
        {eventType && (
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-text-primary text-xs font-medium rounded-full">
              {eventType}
            </span>
          </div>
        )}

        {/* Action Buttons Overlay */}
        <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleLike}
            className={cn(
              'p-2 rounded-full bg-white/90 backdrop-blur-sm transition-colors',
              isLikedState ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
            )}
            aria-label={isLikedState ? 'Unlike' : 'Like'}
          >
            <Heart className={cn('h-5 w-5', isLikedState && 'fill-current')} />
          </button>
          <button
            className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-text-primary hover:text-primary transition-colors"
            aria-label="Share"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>

        {/* Swipe Up Button (Desktop) / Indicator (Mobile) */}
        {onSwipeUp && (
          <motion.button
            onClick={handleSwipeUpClick}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-primary text-white rounded-full shadow-lg flex items-center gap-2 text-sm font-medium md:opacity-0 md:group-hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="View rentals"
          >
            <ArrowUp className="h-4 w-4" />
            {matchingRentalsCount > 0 ? `Rent Similar (${matchingRentalsCount})` : 'Find Rentals'}
          </motion.button>
        )}
      </div>

      {/* Content */}
      {(title || description || source) && (
        <div className="p-4 space-y-2">
          {title && <h3 className="font-semibold text-text-primary line-clamp-2">{title}</h3>}
          {description && <p className="text-sm text-text-secondary line-clamp-2">{description}</p>}
          {source && <p className="text-xs text-text-tertiary">Source: {source}</p>}
          {likesCountState > 0 && (
            <div className="flex items-center gap-1 text-sm text-text-secondary">
              <Heart className={cn('h-4 w-4', isLikedState && 'fill-current text-red-600')} />
              <span>{likesCountState}</span>
            </div>
          )}
          {affiliateLink && (
            <a
              href={affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-sm text-primary hover:text-[#003d32] font-medium"
            >
              Shop this look
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      )}
    </Card>
  );
};
