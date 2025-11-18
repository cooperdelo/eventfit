'use client';

import React from 'react';
import { Button } from '@eventfit/ui';
import { Calendar, List } from 'lucide-react';
import { cn } from '@eventfit/ui';

/**
 * CalendarViewToggle component
 * Toggle between calendar and list views
 */
export type CalendarViewType = 'calendar' | 'list';

export interface CalendarViewToggleProps {
  view: CalendarViewType;
  onViewChange: (view: CalendarViewType) => void;
  className?: string;
}

export const CalendarViewToggle: React.FC<CalendarViewToggleProps> = ({
  view,
  onViewChange,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 p-1 bg-surface rounded-lg border border-border',
        className
      )}
    >
      <button
        onClick={() => onViewChange('calendar')}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-md transition-colors',
          view === 'calendar'
            ? 'bg-primary text-white'
            : 'text-text-secondary hover:text-primary hover:bg-primary-light'
        )}
        aria-label="Calendar view"
      >
        <Calendar className="h-4 w-4" />
        <span className="text-sm font-medium">Calendar</span>
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-md transition-colors',
          view === 'list'
            ? 'bg-primary text-white'
            : 'text-text-secondary hover:text-primary hover:bg-primary-light'
        )}
        aria-label="List view"
      >
        <List className="h-4 w-4" />
        <span className="text-sm font-medium">List</span>
      </button>
    </div>
  );
};
