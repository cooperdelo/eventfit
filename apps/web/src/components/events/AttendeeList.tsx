'use client';

import React from 'react';
import { Avatar, Button } from '@eventfit/ui';
import { User } from '@eventfit/types';
import { UserPlus, UserMinus } from 'lucide-react';

/**
 * AttendeeList component
 * Reference: Reference 4 (Messaging Interface) - User list pattern
 * Visual Requirements:
 * - List of attending users (avatar, name, org affiliation)
 * - Optional "Add Friend" / "Follow" button
 * - Clean, minimal design
 */
export interface AttendeeListProps {
  attendees: Array<{
    userId: string;
    name: string;
    avatar?: string;
    org?: string;
    isFriend?: boolean;
  }>;
  currentUserId?: string;
  onAddFriend?: (userId: string) => void;
  onRemoveFriend?: (userId: string) => void;
}

export const AttendeeList: React.FC<AttendeeListProps> = ({
  attendees,
  currentUserId,
  onAddFriend,
  onRemoveFriend,
}) => {
  if (attendees.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">No attendees yet</p>
        <p className="text-sm text-text-tertiary mt-2">Be the first to RSVP to this event!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {attendees.map((attendee) => {
        const isCurrentUser = attendee.userId === currentUserId;
        const canAddFriend = !isCurrentUser && !attendee.isFriend && onAddFriend;
        const canRemoveFriend = !isCurrentUser && attendee.isFriend && onRemoveFriend;

        return (
          <div
            key={attendee.userId}
            className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow w-full md:w-auto"
          >
            <Avatar src={attendee.avatar} alt={attendee.name} size="md" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-text-primary truncate">{attendee.name}</p>
              {attendee.org && (
                <p className="text-sm text-text-secondary truncate">{attendee.org}</p>
              )}
            </div>
            {canAddFriend && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAddFriend(attendee.userId)}
                aria-label={`Add ${attendee.name} as friend`}
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Add Friend
              </Button>
            )}
            {canRemoveFriend && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onRemoveFriend(attendee.userId)}
                aria-label={`Remove ${attendee.name} from friends`}
              >
                <UserMinus className="h-4 w-4 mr-1" />
                Friends
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};
