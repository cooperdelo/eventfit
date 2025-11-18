'use client';

import React from 'react';
import { Card, Avatar, Button } from '@eventfit/ui';
import { UserPlus, UserMinus, Check } from 'lucide-react';

/**
 * FriendCard component
 * Reference: Reference 4 (Messaging Interface) - Contact list pattern
 * Visual Requirements:
 * - Avatar, name, org
 * - Add/Remove Friend button
 * - Clean list item design
 */
export interface FriendCardProps {
  userId: string;
  name: string;
  avatar?: string;
  org?: string;
  isFriend?: boolean;
  onAddFriend?: (userId: string) => void;
  onRemoveFriend?: (userId: string) => void;
}

export const FriendCard: React.FC<FriendCardProps> = ({
  userId,
  name,
  avatar,
  org,
  isFriend = false,
  onAddFriend,
  onRemoveFriend,
}) => {
  return (
    <Card className="p-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Avatar src={avatar} alt={name} size="md" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-text-primary truncate">{name}</p>
            {org && <p className="text-sm text-text-secondary truncate">{org}</p>}
          </div>
        </div>

        {isFriend ? (
          <Button variant="secondary" size="sm" onClick={() => onRemoveFriend?.(userId)}>
            <Check className="h-4 w-4 mr-1" />
            Friends
          </Button>
        ) : (
          <Button variant="primary" size="sm" onClick={() => onAddFriend?.(userId)}>
            <UserPlus className="h-4 w-4 mr-1" />
            Add Friend
          </Button>
        )}
      </div>
    </Card>
  );
};
