'use client';

import React from 'react';
import { CheckCircle, Clock, Package, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@eventfit/ui';

/**
 * RentalStatusBadge component
 * Visual Requirements:
 * - Status badges with icons
 * - Color-coded by status
 */
export type RentalStatus =
  | 'pending'
  | 'approved'
  | 'paid'
  | 'delivered'
  | 'returned'
  | 'completed'
  | 'dispute'
  | 'canceled';

export interface RentalStatusBadgeProps {
  status: RentalStatus;
  className?: string;
}

const statusConfig: Record<
  RentalStatus,
  { label: string; icon: React.ReactNode; className: string }
> = {
  pending: {
    label: 'Pending',
    icon: <Clock className="h-4 w-4" />,
    className: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  },
  approved: {
    label: 'Approved',
    icon: <CheckCircle className="h-4 w-4" />,
    className: 'bg-primary-light text-primary border-primary/30',
  },
  paid: {
    label: 'Payment Received',
    icon: <CheckCircle className="h-4 w-4" />,
    className: 'bg-green-50 text-green-800 border-green-200',
  },
  delivered: {
    label: 'Delivered',
    icon: <Package className="h-4 w-4" />,
    className: 'bg-purple-50 text-purple-800 border-purple-200',
  },
  returned: {
    label: 'Returned',
    icon: <Package className="h-4 w-4" />,
    className: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
  completed: {
    label: 'Completed',
    icon: <CheckCircle className="h-4 w-4" />,
    className: 'bg-green-50 text-green-800 border-green-200',
  },
  dispute: {
    label: 'Dispute',
    icon: <AlertCircle className="h-4 w-4" />,
    className: 'bg-red-50 text-red-800 border-red-200',
  },
  canceled: {
    label: 'Canceled',
    icon: <XCircle className="h-4 w-4" />,
    className: 'bg-gray-50 text-gray-800 border-gray-200',
  },
};

export const RentalStatusBadge: React.FC<RentalStatusBadgeProps> = ({ status, className }) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.icon}
      {config.label}
    </span>
  );
};
