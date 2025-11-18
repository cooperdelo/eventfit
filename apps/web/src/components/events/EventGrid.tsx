'use client';

import React from 'react';
import { EventCard } from './EventCard';
import { EventCardProps } from '@eventfit/types';
import { cn } from '@eventfit/ui';

/**
 * EventGrid component with masonry layout
 * Reference: Reference 3, 7 (Pinterest masonry grid)
 */
export interface EventGridProps {
  events: EventCardProps[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export const EventGrid: React.FC<EventGridProps> = ({ events, loading, onLoadMore, hasMore }) => {
  if (events.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary mb-4">No events found within your radius.</p>
        <p className="text-sm text-text-tertiary">
          Try expanding your radius or check campus-wide events.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {events.map((event) => (
          <div key={event.id} className="break-inside-avoid mb-4">
            <EventCard {...event} />
          </div>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 mt-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="break-inside-avoid mb-4">
              <div className="bg-white rounded-xl shadow-sm p-0 animate-pulse">
                <div className="w-full h-48 bg-gray-200" />
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
