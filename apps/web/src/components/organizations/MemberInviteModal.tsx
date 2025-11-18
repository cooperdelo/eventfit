'use client';

import React, { useState } from 'react';
import { Modal, Button, Input } from '@eventfit/ui';
import { Mail, UserPlus } from 'lucide-react';

/**
 * MemberInviteModal component
 * Reference: Design Reference Analysis - Clean modal design
 */
export interface MemberInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
  loading?: boolean;
}

export const MemberInviteModal: React.FC<MemberInviteModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    onSubmit(email);
    setEmail('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invite Member" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="member@university.edu"
            error={error}
            helperText="Enter the .edu email address of the person you want to invite"
            required
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            loading={loading}
            icon={<UserPlus className="h-4 w-4" />}
          >
            Send Invitation
          </Button>
        </div>
      </form>
    </Modal>
  );
};
