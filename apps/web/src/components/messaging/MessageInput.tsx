'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@eventfit/ui';
import { Send, Image as ImageIcon, Paperclip, X } from 'lucide-react';
import { cn } from '@eventfit/ui';

/**
 * MessageInput component
 * Reference: Reference 2 (Pinterest Post Detail) - Clean input bar
 * Visual Requirements:
 * - Text input with emoji support
 * - Image/file attachment button
 * - Send button
 * - Clean, minimal design
 */
export interface MessageInputProps {
  onSend: (message: string, attachments?: File[]) => void;
  onAttachOutfit?: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  onAttachOutfit,
  placeholder = 'Type a message...',
  disabled = false,
  className,
}) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentPreviews, setAttachmentPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newAttachments = [...attachments, ...files];
    setAttachments(newAttachments);

    // Create previews for images
    const newPreviews: string[] = [];
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setAttachmentPreviews((prev) => [...prev, result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
    setAttachmentPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if (message.trim() || attachments.length > 0) {
      onSend(message.trim(), attachments.length > 0 ? attachments : undefined);
      setMessage('');
      setAttachments([]);
      setAttachmentPreviews([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={cn('border-t border-border bg-surface', className)}>
      {/* Attachment Previews */}
      {attachmentPreviews.length > 0 && (
        <div className="flex gap-2 p-3 border-b border-border">
          {attachmentPreviews.map((preview, index) => (
            <div
              key={index}
              className="relative w-20 h-20 rounded-lg overflow-hidden border border-border"
            >
              <Image src={preview} alt={`Attachment ${index + 1}`} fill className="object-cover" />
              <button
                onClick={() => removeAttachment(index)}
                className="absolute top-1 right-1 p-1 bg-surface rounded-full shadow-sm hover:bg-error hover:text-white transition-colors"
                aria-label="Remove attachment"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Bar */}
      <div className="flex items-end gap-2 p-3">
        {/* File Input (hidden) */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          aria-label="Attach file"
        />

        {/* Attachment Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="p-2 text-text-secondary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Attach file"
        >
          <Paperclip className="h-5 w-5" />
        </button>

        {/* Image Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="p-2 text-text-secondary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Attach image"
        >
          <ImageIcon className="h-5 w-5" />
        </button>

        {/* Text Input */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="flex-1 min-h-[40px] max-h-[120px] px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none text-sm"
        />

        {/* Send Button */}
        <Button
          variant="primary"
          size="sm"
          onClick={handleSend}
          disabled={disabled || (!message.trim() && attachments.length === 0)}
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
