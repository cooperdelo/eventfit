'use client';

import React, { useState } from 'react';
import { Modal, Button, Input } from '@eventfit/ui';
import { formatCurrency, formatDate } from '@eventfit/lib';
import { Calendar, DollarSign, Info } from 'lucide-react';
import { OutfitCardProps } from '@eventfit/types';

/**
 * RentalRequestModal component
 * Reference: Reference 2 (Pinterest Post Detail) - Modal design
 * Visual Requirements:
 * - Date picker for rental dates
 * - Price calculation display
 * - Notes/instructions input
 * - Confirm/Cancel buttons
 */
export interface RentalRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  outfit: OutfitCardProps;
  onSubmit?: (data: RentalRequestData) => void;
}

export interface RentalRequestData {
  outfitId: string;
  startDate: Date;
  endDate: Date;
  notes?: string;
  totalPrice: number;
  deposit?: number;
}

export const RentalRequestModal: React.FC<RentalRequestModalProps> = ({
  isOpen,
  onClose,
  outfit,
  onSubmit,
}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate min/max dates for advance scheduling (30-90 days)
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  const maxDate = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const minAdvanceDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const isAdvanceBooking = startDate && new Date(startDate) > new Date(minAdvanceDate);

  // Calculate rental days
  const rentalDays =
    startDate && endDate
      ? Math.ceil(
          (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
        ) + 1
      : 0;

  // Calculate prices
  const rentalPrice = outfit.price ? outfit.price * rentalDays : 0;
  const deposit = outfit.price ? Math.round(outfit.price * 0.5) : 0; // 50% deposit
  const totalPrice = rentalPrice + deposit;

  const handleSubmit = async () => {
    if (!startDate || !endDate || rentalDays <= 0) {
      return;
    }

    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      onSubmit?.({
        outfitId: outfit.id,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        notes,
        totalPrice,
        deposit,
      });
      setIsSubmitting(false);
      handleClose();
    }, 1000);
  };

  const handleClose = () => {
    setStartDate('');
    setEndDate('');
    setNotes('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Request Rental"
      size="md"
      closeOnBackdropClick={!isSubmitting}
    >
      <div className="space-y-6">
        {/* Outfit Info */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img src={outfit.images[0]} alt={outfit.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-text-primary">{outfit.title}</h3>
            {outfit.brand && <p className="text-sm text-text-secondary">{outfit.brand}</p>}
            {outfit.size && <p className="text-sm text-text-secondary">Size {outfit.size}</p>}
            {outfit.price && (
              <p className="text-lg font-bold text-text-primary mt-1">
                {formatCurrency(outfit.price)}/day
              </p>
            )}
          </div>
        </div>

        {/* Date Selection */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              <Calendar className="h-4 w-4 inline mr-1" />
              Rental Dates <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-text-secondary mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={minDate}
                  max={maxDate}
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || minDate}
                  max={maxDate}
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>
            </div>
            {rentalDays > 0 && (
              <p className="mt-2 text-sm text-text-secondary">
                {rentalDays} {rentalDays === 1 ? 'day' : 'days'}
              </p>
            )}
            {isAdvanceBooking && (
              <div className="flex items-start gap-2 p-3 bg-accent/10 rounded-lg mt-3">
                <Info className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-xs text-text-secondary">
                  This is an advance booking. The lender will confirm availability. You can book up
                  to 90 days in advance.
                </p>
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              maxLength={200}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any special requests or instructions..."
            />
            <p className="mt-1 text-xs text-text-tertiary text-right">{notes.length} / 200</p>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t pt-4 space-y-2">
          <h4 className="font-semibold text-text-primary mb-3">Price Breakdown</h4>
          <div className="space-y-2 text-sm">
            {outfit.price && rentalDays > 0 && (
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  {formatCurrency(outfit.price)} × {rentalDays} {rentalDays === 1 ? 'day' : 'days'}
                </span>
                <span className="text-text-primary">{formatCurrency(rentalPrice)}</span>
              </div>
            )}
            {deposit > 0 && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Security Deposit</span>
                <span className="text-text-primary">{formatCurrency(deposit)}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t font-semibold text-lg">
              <span className="text-text-primary">Total</span>
              <span className="text-text-primary">{formatCurrency(totalPrice)}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-primary-light rounded-lg mt-4">
            <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-xs text-primary">
              Funds will be held in escrow until you confirm receipt. Deposit will be returned after
              the item is returned in good condition.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={isSubmitting}
            disabled={!startDate || !endDate || rentalDays <= 0 || isSubmitting}
          >
            Send Request
          </Button>
        </div>
      </div>
    </Modal>
  );
};
