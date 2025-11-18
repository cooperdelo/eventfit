/**
 * Message types for event chat, org chat, and direct messaging
 */
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  message: string;
  attachments?: MessageAttachment[];
  outfitLinks?: string[]; // Outfit IDs referenced in message
  mentions?: string[]; // User IDs mentioned with @
  timestamp: Date | string;
  isPinned?: boolean;
  replyTo?: string; // Message ID this is replying to
}

export interface MessageAttachment {
  type: 'image' | 'file';
  url: string;
  name?: string;
  size?: number;
}

export interface EventChat {
  chatId: string;
  eventId: string;
  messages: ChatMessage[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface DirectMessage {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  senderAvatar?: string;
  message: string;
  attachments?: MessageAttachment[];
  outfitLinks?: string[];
  timestamp: Date | string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: Array<{
    userId: string;
    name: string;
    avatar?: string;
  }>;
  lastMessage?: {
    message: string;
    timestamp: Date | string;
    senderId: string;
  };
  unreadCount: number;
  updatedAt: Date | string;
}
