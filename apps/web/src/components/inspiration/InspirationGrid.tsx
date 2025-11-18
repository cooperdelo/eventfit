'use client';

import React from 'react';
import { InspirationCard } from './InspirationCard';
import type { InspirationCardProps } from './InspirationCard';

/**
 * InspirationGrid component
 * Reference: Reference 3, 7 (Pinterest masonry grid)
 * Visual Requirements:
 * - Masonry layout
 * - Variable height cards
 * - Infinite scroll
 */
export interface InspirationGridProps {
  items: InspirationCardProps[];
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onLike?: (id: string) => void;
  onSwipeUp?: (id: string) => void;
}

export const InspirationGrid: React.FC<InspirationGridProps> = ({
  items,
  loading = false,
  hasMore = false,
  onLoadMore,
  onLike,
  onSwipeUp,
}) => {
  if (items.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary mb-2">No inspiration found</p>
        <p className="text-sm text-text-tertiary">Check back later for curated looks!</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="break-inside-avoid mb-4">
            <InspirationCard {...item} onLike={onLike} onSwipeUp={onSwipeUp} />
          </div>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 mt-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="break-inside-avoid mb-4">
              <div className="bg-white rounded-xl shadow-sm p-0 animate-pulse">
                <div className="w-full aspect-[3/4] bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && !loading && onLoadMore && (
        <div className="text-center mt-8">
          <button
            onClick={onLoadMore}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-[#003d32] transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
