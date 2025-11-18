'use client';

import React from 'react';
import { EventCard } from '../events/EventCard';
import { EventCardProps } from '@eventfit/types';
import { format } from 'date-fns';
import { cn } from '@eventfit/ui';

/**
 * EventList component for list view
 * Reference: Design Reference Analysis - Clean list layout
 */
export interface EventListProps {
  events: EventCardProps[];
  loading?: boolean;
  className?: string;
}

export const EventList: React.FC<EventListProps> = ({ events, loading = false, className }) => {
  if (loading) {
    return (
      <div className={cn('space-y-4', className)}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-surface rounded-xl shadow-sm p-0 animate-pulse h-48" />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
        <p className="text-text-secondary mb-2">No events scheduled</p>
        <p className="text-sm text-text-tertiary">
          Events you're attending or following will appear here
        </p>
      </div>
    );
  }

  // Group events by date
  const eventsByDate = events.reduce(
    (acc, event) => {
      const dateKey = format(new Date(event.startAt), 'yyyy-MM-dd');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    },
    {} as Record<string, EventCardProps[]>
  );

  const sortedDates = Object.keys(eventsByDate).sort();

  return (
    <div className={cn('space-y-6', className)}>
      {sortedDates.map((dateKey) => {
        const dateEvents = eventsByDate[dateKey];
        const date = new Date(dateKey);

        return (
          <div key={dateKey}>
            {/* Date Header */}
            <div className="mb-4">
              <h3 className="text-lg font-varsity font-bold text-text-primary">
                {format(date, 'EEEE, MMMM d')}
              </h3>
              <p className="text-sm text-text-secondary">
                {dateEvents.length} {dateEvents.length === 1 ? 'event' : 'events'}
              </p>
            </div>

            {/* Events for this date */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dateEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
