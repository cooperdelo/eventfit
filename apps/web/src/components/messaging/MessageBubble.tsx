'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar } from '@eventfit/ui';
import { ChatMessage } from '@eventfit/types';
import { formatDistanceToNow } from 'date-fns';
import { Pin, Reply } from 'lucide-react';
import { cn } from '@eventfit/ui';

/**
 * MessageBubble component
 * Reference: Reference 2 (Pinterest Post Detail) - Clean chat UI
 * Visual Requirements:
 * - Clean, college-friendly design
 * - Subtle borders for replies/threads
 * - Outfit links previewed inline
 * - Avatar + name + timestamp
 */
export interface MessageBubbleProps {
  message: ChatMessage;
  isOwnMessage?: boolean;
  onReply?: (messageId: string) => void;
  className?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwnMessage = false,
  onReply,
  className,
}) => {
  const {
    id,
    userName,
    userAvatar,
    message: text,
    attachments,
    outfitLinks,
    timestamp,
    isPinned,
    replyTo,
  } = message;

  return (
    <div
      className={cn(
        'flex gap-3 p-4 hover:bg-primary-light/30 transition-colors',
        replyTo && 'ml-8 border-l-2 border-primary-light pl-4',
        className
      )}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Avatar src={userAvatar} alt={userName} size="md" />
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        {/* Header: Name, Timestamp, Actions */}
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-text-primary">{userName}</span>
          <span className="text-xs text-text-tertiary">
            {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
          </span>
          {isPinned && <Pin className="h-3 w-3 text-accent" aria-label="Pinned message" />}
        </div>

        {/* Message Text */}
        <p className="text-text-primary mb-2 whitespace-pre-wrap break-words">{text}</p>

        {/* Attachments */}
        {attachments && attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {attachments.map((attachment, index) => (
              <div key={index} className="relative">
                {attachment.type === 'image' ? (
                  <div className="relative w-48 h-48 rounded-lg overflow-hidden border border-border">
                    <Image
                      src={attachment.url}
                      alt={attachment.name || 'Attachment'}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded-lg hover:bg-primary-light transition-colors"
                  >
                    <span className="text-sm text-text-primary">{attachment.name || 'File'}</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Outfit Links */}
        {outfitLinks && outfitLinks.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {outfitLinks.map((outfitId) => (
              <Link
                key={outfitId}
                href={`/outfit/${outfitId}`}
                className="px-3 py-2 bg-primary-light text-primary rounded-lg hover:bg-primary-light/80 transition-colors text-sm font-medium"
              >
                View Outfit
              </Link>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 mt-2">
          {onReply && (
            <button
              onClick={() => onReply(id)}
              className="flex items-center gap-1 text-xs text-text-secondary hover:text-primary transition-colors"
              aria-label="Reply to message"
            >
              <Reply className="h-3 w-3" />
              Reply
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
