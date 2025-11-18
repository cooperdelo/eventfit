'use client';

import React, { useState } from 'react';
import { Card } from '@eventfit/ui';
import { EventCardProps } from '@eventfit/types';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';
import { cn } from '@eventfit/ui';
import Link from 'next/link';
import Image from 'next/image';

/**
 * EventCalendar component
 * Reference: Design Reference Analysis - Calendar view with event cards
 * Visual Requirements:
 * - Month view by default
 * - Event cards displayed in calendar cells
 * - Clean, college-friendly design
 * - Matches event page quality
 */
export interface EventCalendarProps {
  events: EventCardProps[];
  loading?: boolean;
  onDateClick?: (date: Date) => void;
  className?: string;
}

export const EventCalendar: React.FC<EventCalendarProps> = ({
  events,
  loading = false,
  onDateClick,
  className,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.startAt);
      return isSameDay(eventDate, date);
    });
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (loading) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-7 gap-2">
            {[...Array(35)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn('p-6', className)} padding="lg">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-lg hover:bg-primary-light transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5 text-text-primary" />
          </button>
          <h2 className="text-2xl font-varsity font-bold text-text-primary">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-lg hover:bg-primary-light transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5 text-text-primary" />
          </button>
        </div>
        <button
          onClick={goToToday}
          className="px-4 py-2 text-sm font-medium text-primary hover:text-[#003d32] transition-colors"
        >
          Today
        </button>
      </div>

      {/* Week Day Headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm font-semibold text-text-secondary py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, dayIdx) => {
          const dayEvents = getEventsForDate(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={day.toISOString()}
              className={cn(
                'min-h-[120px] border border-border rounded-lg p-2 transition-colors',
                !isCurrentMonth && 'opacity-40 bg-gray-50',
                isToday && 'border-2 border-primary bg-primary-light/20',
                dayEvents.length > 0 && 'bg-surface'
              )}
            >
              {/* Date Number */}
              <div
                className={cn(
                  'text-sm font-medium mb-1',
                  isToday ? 'text-primary font-bold' : 'text-text-secondary',
                  !isCurrentMonth && 'text-text-tertiary'
                )}
              >
                {format(day, 'd')}
              </div>

              {/* Events - Mini Cards */}
              <div className="space-y-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <Link
                    key={event.id}
                    href={`/event/${event.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDateClick?.(day);
                    }}
                    className="block group"
                  >
                    <div className="flex items-start gap-1.5 p-1.5 rounded-lg bg-primary-light hover:bg-primary/10 border border-primary/20 transition-all group-hover:border-primary/40">
                      {event.coverPhoto && (
                        <div className="w-8 h-8 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={event.coverPhoto}
                            alt={event.title}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-semibold text-primary line-clamp-1 group-hover:underline">
                          {event.title}
                        </span>
                        {event.organizer && (
                          <p className="text-xs text-text-tertiary line-clamp-1">
                            {event.organizer.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
                {dayEvents.length > 2 && (
                  <button
                    onClick={() => onDateClick?.(day)}
                    className="text-xs text-primary hover:text-[#003d32] font-medium px-1 w-full text-left"
                  >
                    +{dayEvents.length - 2} more
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <span className="text-sm text-text-secondary">Event</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded border-2 border-primary bg-primary-light/20"></div>
          <span className="text-sm text-text-secondary">Today</span>
        </div>
      </div>
    </Card>
  );
};
