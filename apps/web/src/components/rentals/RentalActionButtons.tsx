'use client';

import React from 'react';
import { Button } from '@eventfit/ui';
import { CheckCircle, Package, AlertCircle } from 'lucide-react';
import type { RentalStatus } from './RentalStatusBadge';

/**
 * RentalActionButtons component
 * Shows action buttons based on rental status and user role
 */
export interface RentalActionButtonsProps {
  status: RentalStatus;
  isLender: boolean;
  onConfirmDelivery?: () => void;
  onConfirmReceipt?: () => void;
  onConfirmReturn?: () => void;
  onReportIssue?: () => void;
}

export const RentalActionButtons: React.FC<RentalActionButtonsProps> = ({
  status,
  isLender,
  onConfirmDelivery,
  onConfirmReceipt,
  onConfirmReturn,
  onReportIssue,
}) => {
  if (isLender) {
    // Lender actions
    if (status === 'paid') {
      return (
        <Button variant="primary" size="sm" onClick={onConfirmDelivery}>
          <Package className="h-4 w-4 mr-2" />
          Mark as Delivered
        </Button>
      );
    }
    if (status === 'returned') {
      return (
        <Button variant="primary" size="sm" onClick={onConfirmReturn}>
          <CheckCircle className="h-4 w-4 mr-2" />
          Confirm Return
        </Button>
      );
    }
  } else {
    // Renter actions
    if (status === 'delivered') {
      return (
        <Button variant="primary" size="sm" onClick={onConfirmReceipt}>
          <CheckCircle className="h-4 w-4 mr-2" />
          Confirm Receipt
        </Button>
      );
    }
    if (status === 'delivered' || status === 'paid') {
      return (
        <Button variant="outline" size="sm" onClick={onReportIssue}>
          <AlertCircle className="h-4 w-4 mr-2" />
          Report Issue
        </Button>
      );
    }
  }

  return null;
};
