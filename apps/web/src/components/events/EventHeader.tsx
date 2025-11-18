'use client';

import React from 'react';
import Image from 'next/image';
import { Button, Avatar } from '@eventfit/ui';
import { formatEventDateBadge } from '@eventfit/lib';
import { Event } from '@eventfit/types';
import { Calendar, MapPin, Shirt, Share2, Bell, BellOff } from 'lucide-react';

/**
 * EventHeader component
 * Reference: Reference 2 (Pinterest Post Detail Page) - Split-screen layout
 * Visual Requirements:
 * - Cover photo: Full-width hero image
 * - Event details: Title, date, location, dress code
 * - Action buttons: RSVP, Share, Follow Event
 * - Creator profile: Avatar + name
 */
export interface EventHeaderProps {
  event: Event;
  isRSVPed?: boolean;
  isFollowing?: boolean;
  creator?: {
    name: string;
    avatar?: string;
  };
  onRSVP?: () => void;
  onShare?: () => void;
  onFollow?: () => void;
}

export const EventHeader: React.FC<EventHeaderProps> = ({
  event,
  isRSVPed = false,
  isFollowing = false,
  creator,
  onRSVP,
  onShare,
  onFollow,
}) => {
  const coverImage = event.doorlistCoverPhoto || event.coverPhoto || '/placeholder-event.jpg';

  return (
    <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Cover Photo */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden">
        <Image
          src={coverImage}
          alt={event.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
        {/* Gradient overlay for text readability if needed */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Event Details Section */}
      <div className="p-6 space-y-4">
        {/* Title and Creator */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">{event.title}</h1>
            {creator && (
              <div className="flex items-center gap-2 mb-4">
                <Avatar src={creator.avatar} alt={creator.name} size="sm" />
                <span className="text-sm text-text-secondary">{creator.name}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {event.type === 'private' && onRSVP && (
              <Button
                variant={isRSVPed ? 'secondary' : 'primary'}
                size="md"
                onClick={onRSVP}
                aria-label={isRSVPed ? 'Cancel RSVP' : 'RSVP to event'}
              >
                {isRSVPed ? 'RSVPed' : 'RSVP'}
              </Button>
            )}
            {onShare && (
              <Button variant="outline" size="md" onClick={onShare} aria-label="Share event">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            )}
            {onFollow && (
              <Button
                variant={isFollowing ? 'secondary' : 'outline'}
                size="md"
                onClick={onFollow}
                aria-label={isFollowing ? 'Unfollow event' : 'Follow event'}
              >
                {isFollowing ? (
                  <>
                    <BellOff className="h-4 w-4 mr-2" />
                    Following
                  </>
                ) : (
                  <>
                    <Bell className="h-4 w-4 mr-2" />
                    Follow
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Event Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-text-secondary">
          {event.date && (
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-text-tertiary" />
              <span className="text-sm">
                {typeof event.date === 'string'
                  ? new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })
                  : event.date.toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
              </span>
            </div>
          )}
          {event.campus && (
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-text-tertiary" />
              <span className="text-sm">{event.campus}</span>
            </div>
          )}
          {event.theme && (
            <div className="flex items-center gap-2">
              <Shirt className="h-5 w-5 text-text-tertiary" />
              <span className="text-sm">{event.theme}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {event.description && (
          <p className="text-text-secondary text-sm leading-relaxed">{event.description}</p>
        )}

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-teal-50 text-teal-800 text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
