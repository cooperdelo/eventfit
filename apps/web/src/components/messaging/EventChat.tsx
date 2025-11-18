'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, Avatar } from '@eventfit/ui';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { ChatMessage } from '@eventfit/types';
import { MessageSquare, Pin } from 'lucide-react';
import { cn } from '@eventfit/ui';

/**
 * EventChat component
 * Reference: Reference 2 (Pinterest Post Detail) - Clean chat UI
 * Visual Requirements:
 * - Clean, college-friendly design
 * - Chronological message feed
 * - Pinned messages at top
 * - Real-time updates (mock for now)
 */
export interface EventChatProps {
  eventId: string;
  currentUserId?: string;
  onSendMessage?: (message: string, attachments?: File[]) => Promise<void>;
  className?: string;
}

export const EventChat: React.FC<EventChatProps> = ({
  eventId,
  currentUserId,
  onSendMessage,
  className,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [pinnedMessages, setPinnedMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mock fetching messages
  useEffect(() => {
    setLoading(true);
    // TODO: Replace with real API call
    setTimeout(() => {
      const mockMessages: ChatMessage[] = [
        {
          id: 'msg-1',
          chatId: `event-${eventId}`,
          userId: 'user-1',
          userName: 'Sarah Johnson',
          userAvatar: 'https://via.placeholder.com/40',
          message: 'Hey everyone! What are you all wearing to this event?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        },
        {
          id: 'msg-2',
          chatId: `event-${eventId}`,
          userId: 'user-2',
          userName: 'Alex Chen',
          userAvatar: 'https://via.placeholder.com/40',
          message: "I'm thinking of renting something formal. Any recommendations?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        },
        {
          id: 'msg-3',
          chatId: `event-${eventId}`,
          userId: 'user-3',
          userName: 'Event Organizer',
          userAvatar: 'https://via.placeholder.com/40',
          message: 'Reminder: Dress code is formal. Doors open at 7 PM!',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          isPinned: true,
        },
      ];

      const pinned = mockMessages.filter((m) => m.isPinned);
      const regular = mockMessages.filter((m) => !m.isPinned);

      setPinnedMessages(pinned);
      setMessages(regular);
      setLoading(false);
    }, 500);
  }, [eventId]);

  const handleSend = async (messageText: string, attachments?: File[]) => {
    if (!messageText.trim() && !attachments?.length) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      chatId: `event-${eventId}`,
      userId: currentUserId || 'current-user',
      userName: 'You',
      message: messageText,
      timestamp: new Date().toISOString(),
      replyTo: replyingTo || undefined,
    };

    // Optimistically add message
    setMessages((prev) => [...prev, newMessage]);
    setReplyingTo(null);

    // TODO: Call API
    if (onSendMessage) {
      try {
        await onSendMessage(messageText, attachments);
      } catch (error) {
        // Rollback on error
        setMessages((prev) => prev.filter((m) => m.id !== newMessage.id));
        console.error('Failed to send message:', error);
      }
    }
  };

  const handleReply = (messageId: string) => {
    setReplyingTo(messageId);
    // Scroll to input
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn('flex flex-col h-[600px] p-0 overflow-hidden', className)} padding="none">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-text-primary">Event Chat</h3>
        </div>
        {pinnedMessages.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-text-secondary">
            <Pin className="h-3 w-3" />
            <span>{pinnedMessages.length} pinned</span>
          </div>
        )}
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto">
        {/* Pinned Messages */}
        {pinnedMessages.length > 0 && (
          <div className="border-b border-border bg-accent/5">
            <div className="px-4 py-2 text-xs font-medium text-text-secondary flex items-center gap-1">
              <Pin className="h-3 w-3" />
              Pinned Messages
            </div>
            {pinnedMessages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwnMessage={message.userId === currentUserId}
                onReply={handleReply}
              />
            ))}
          </div>
        )}

        {/* Regular Messages */}
        {messages.length === 0 && pinnedMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <MessageSquare className="h-12 w-12 text-text-tertiary mb-4" />
            <p className="text-text-secondary text-center">
              No messages yet. Be the first to start the conversation!
            </p>
          </div>
        ) : (
          <div>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwnMessage={message.userId === currentUserId}
                onReply={handleReply}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Reply Indicator */}
        {replyingTo && (
          <div className="px-4 py-2 bg-primary-light border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">
                Replying to {messages.find((m) => m.id === replyingTo)?.userName || 'message'}
              </span>
              <button
                onClick={() => setReplyingTo(null)}
                className="text-xs text-text-secondary hover:text-primary"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <MessageInput
        onSend={handleSend}
        placeholder={replyingTo ? 'Type your reply...' : 'Type a message...'}
      />
    </Card>
  );
};
