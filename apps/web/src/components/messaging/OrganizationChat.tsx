'use client';

import React, { useState, useEffect } from 'react';
import { Card, Avatar, Button, Input } from '@eventfit/ui';
import { ChatMessage } from '@eventfit/types';
import { Send, Pin } from 'lucide-react';
import { format } from 'date-fns';

/**
 * OrganizationChat component
 * Reference: Design Reference Analysis - Messaging interface
 * Visual Requirements:
 * - Two-panel layout (sidebar + messages)
 * - Message bubbles with avatars
 * - Pinned messages
 * - Rich input
 */
export interface OrganizationChatProps {
  orgId: string;
  currentUserId: string;
  onSendMessage?: (text: string) => void;
  className?: string;
}

export const OrganizationChat: React.FC<OrganizationChatProps> = ({
  orgId,
  currentUserId,
  onSendMessage,
  className,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [pinnedMessages, setPinnedMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch org chat messages
    setTimeout(() => {
      setMessages([
        {
          id: 'msg-1',
          chatId: `org-${orgId}`,
          userId: 'user-1',
          userName: 'Sarah Johnson',
          userAvatar: 'https://via.placeholder.com/40',
          message: "Hey everyone! Don't forget about the formal this weekend!",
          timestamp: new Date().toISOString(),
        },
      ]);
      setLoading(false);
    }, 500);
  }, [orgId]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      chatId: `org-${orgId}`,
      userId: currentUserId,
      userName: 'You',
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, message]);
    onSendMessage?.(newMessage);
    setNewMessage('');
  };

  if (loading) {
    return (
      <Card className="animate-pulse h-96" padding="lg">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <div className={className}>
      {/* Pinned Messages */}
      {pinnedMessages.length > 0 && (
        <Card padding="md" className="mb-4 bg-accent/10 border-accent/20">
          <div className="flex items-center gap-2 mb-2">
            <Pin className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold text-text-primary">Pinned Messages</h3>
          </div>
          <div className="space-y-2">
            {pinnedMessages.map((msg) => (
              <div key={msg.id} className="text-sm text-text-secondary">
                <span className="font-medium">{msg.userName}:</span> {msg.message}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Messages */}
      <Card padding="lg" className="mb-4">
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center py-12 text-text-secondary">
              <p>No messages yet</p>
              <p className="text-sm text-text-tertiary mt-2">Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => {
              const isOwn = message.userId === currentUserId;
              return (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}
                >
                  <Avatar src={message.userAvatar} alt={message.userName} size="sm" />
                  <div className={`flex-1 ${isOwn ? 'text-right' : ''}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-text-primary">
                        {message.userName}
                      </span>
                      <span className="text-xs text-text-tertiary">
                        {format(new Date(message.timestamp), 'h:mm a')}
                      </span>
                    </div>
                    <div
                      className={`inline-block px-4 py-2 rounded-lg ${
                        isOwn ? 'bg-primary text-white' : 'bg-gray-100 text-text-primary'
                      }`}
                    >
                      {message.message}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>

      {/* Message Input */}
      <div className="flex gap-2">
        <Input
          value={newMessage}
          onChange={setNewMessage}
          placeholder="Type a message..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
          className="flex-1"
        />
        <Button variant="primary" onClick={handleSend} icon={<Send className="h-4 w-4" />}>
          Send
        </Button>
      </div>
    </div>
  );
};
