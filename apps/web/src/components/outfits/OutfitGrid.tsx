'use client';

import React from 'react';
import { OutfitCard } from './OutfitCard';
import { OutfitCardProps } from '@eventfit/types';

/**
 * OutfitGrid component
 * Reference: Reference 3, 7 (Pinterest Search, Landing Page) - Masonry grid
 * Visual Requirements:
 * - Masonry or grid layout
 * - Infinite scroll
 * - Loading skeletons
 * - Empty states
 */
export interface OutfitGridProps {
  outfits: OutfitCardProps[];
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  layout?: 'grid' | 'masonry';
}

export const OutfitGrid: React.FC<OutfitGridProps> = ({
  outfits,
  loading = false,
  hasMore = false,
  onLoadMore,
  layout = 'grid',
}) => {
  if (outfits.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary mb-2">No outfits found</p>
        <p className="text-sm text-text-tertiary">Be the first to post an outfit for this event!</p>
      </div>
    );
  }

  if (layout === 'masonry') {
    return (
      <div className="w-full">
        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {outfits.map((outfit) => (
            <div key={outfit.id} className="break-inside-avoid mb-4">
              <OutfitCard {...outfit} />
            </div>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 mt-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="break-inside-avoid mb-4">
                <div className="bg-white rounded-xl shadow-sm p-0 animate-pulse">
                  <div className="w-full h-64 bg-gray-200" />
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
  }

  // Standard Grid Layout
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {outfits.map((outfit) => (
          <OutfitCard key={outfit.id} {...outfit} />
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-0 animate-pulse">
              <div className="w-full h-64 bg-gray-200" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
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
