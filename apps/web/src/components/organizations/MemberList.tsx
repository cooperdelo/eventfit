'use client';

import React from 'react';
import { Card, Avatar, Badge, Button } from '@eventfit/ui';
import { Check, X, UserPlus, MoreVertical } from 'lucide-react';
import { cn } from '@eventfit/ui';

/**
 * MemberList component
 * Reference: Design Reference Analysis - Clean list design
 */
export interface Member {
  userId: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'member';
  status: 'pending' | 'approved' | 'rejected';
  email?: string;
}

export interface MemberListProps {
  members: Member[];
  isAdmin?: boolean;
  onApprove?: (userId: string) => void;
  onReject?: (userId: string) => void;
  onInvite?: () => void;
  loading?: boolean;
}

export const MemberList: React.FC<MemberListProps> = ({
  members,
  isAdmin = false,
  onApprove,
  onReject,
  onInvite,
  loading = false,
}) => {
  const pendingMembers = members.filter((m) => m.status === 'pending');
  const approvedMembers = members.filter((m) => m.status === 'approved');

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="animate-pulse h-20" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pending Members (Admin Only) */}
      {isAdmin && pendingMembers.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Pending Requests ({pendingMembers.length})
          </h3>
          <div className="space-y-3">
            {pendingMembers.map((member) => (
              <Card key={member.userId} hover className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Avatar src={member.avatar} alt={member.name} size="md" />
                  <div>
                    <div className="font-semibold text-text-primary">{member.name}</div>
                    {member.email && (
                      <div className="text-sm text-text-secondary">{member.email}</div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onApprove?.(member.userId)}
                    icon={<Check className="h-4 w-4" />}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onReject?.(member.userId)}
                    icon={<X className="h-4 w-4" />}
                  >
                    Reject
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Approved Members */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">
            Members ({approvedMembers.length})
          </h3>
          {isAdmin && onInvite && (
            <Button
              variant="primary"
              size="sm"
              onClick={onInvite}
              icon={<UserPlus className="h-4 w-4" />}
            >
              Invite Member
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {approvedMembers.map((member) => (
            <Card key={member.userId} hover className="p-4">
              <div className="flex items-center gap-3">
                <Avatar src={member.avatar} alt={member.name} size="md" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-text-primary">{member.name}</span>
                    {member.role === 'admin' && (
                      <Badge variant="primary" className="text-xs">
                        Admin
                      </Badge>
                    )}
                  </div>
                  {member.email && (
                    <div className="text-sm text-text-secondary">{member.email}</div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
