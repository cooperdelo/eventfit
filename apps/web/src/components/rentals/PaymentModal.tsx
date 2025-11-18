'use client';

import React, { useState } from 'react';
import { Modal, Button } from '@eventfit/ui';
import { formatCurrency } from '@eventfit/lib';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';

/**
 * PaymentModal component
 * Reference: Reference 2 (Pinterest Post Detail) - Modal design
 * Visual Requirements:
 * - Stripe payment integration placeholder
 * - Price breakdown
 * - Security indicators
 * - Payment button
 */
export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  rentalRequest: {
    outfitId: string;
    outfitName: string;
    outfitImage: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    deposit: number;
    rentalPrice: number;
  };
  onPaymentSuccess?: (paymentId: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  rentalRequest,
  onPaymentSuccess,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');

  const handlePayment = async () => {
    setIsProcessing(true);
    // Mock Stripe payment processing
    setTimeout(() => {
      const mockPaymentId = `pay_${Date.now()}`;
      onPaymentSuccess?.(mockPaymentId);
      setIsProcessing(false);
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setIsProcessing(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Complete Payment"
      size="md"
      closeOnBackdropClick={!isProcessing}
    >
      <div className="space-y-6">
        {/* Rental Summary */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={rentalRequest.outfitImage}
              alt={rentalRequest.outfitName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-text-primary">{rentalRequest.outfitName}</h3>
            <p className="text-sm text-text-secondary">
              {rentalRequest.startDate.toLocaleDateString()} -{' '}
              {rentalRequest.endDate.toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2">
          <h4 className="font-semibold text-text-primary">Payment Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Rental Fee</span>
              <span className="text-text-primary">{formatCurrency(rentalRequest.rentalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Security Deposit</span>
              <span className="text-text-primary">{formatCurrency(rentalRequest.deposit)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t font-semibold text-lg">
              <span className="text-text-primary">Total</span>
              <span className="text-text-primary">{formatCurrency(rentalRequest.totalPrice)}</span>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-3">
          <h4 className="font-semibold text-text-primary">Payment Method</h4>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`
                p-4 rounded-lg border-2 transition-colors text-left
                ${
                  paymentMethod === 'card'
                    ? 'border-primary bg-primary-light'
                    : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <CreditCard className="h-5 w-5 mb-2 text-text-primary" />
              <div className="font-medium text-text-primary">Credit Card</div>
              <div className="text-xs text-text-secondary mt-1">Visa, Mastercard, Amex</div>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('paypal')}
              className={`
                p-4 rounded-lg border-2 transition-colors text-left
                ${
                  paymentMethod === 'paypal'
                    ? 'border-primary bg-primary-light'
                    : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="h-5 w-5 mb-2 text-primary font-bold">PP</div>
              <div className="font-medium text-text-primary">PayPal</div>
              <div className="text-xs text-text-secondary mt-1">Pay with PayPal</div>
            </button>
          </div>
        </div>

        {/* Payment Form Placeholder */}
        {paymentMethod === 'card' && (
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isProcessing}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Expiry</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  disabled={isProcessing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  disabled={isProcessing}
                />
              </div>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
          <Lock className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-green-800">
            Your payment is secure and encrypted. Funds will be held in escrow until you confirm
            receipt of the item.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button variant="secondary" onClick={handleClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handlePayment}
            loading={isProcessing}
            disabled={isProcessing}
            className="min-w-[120px]"
          >
            {isProcessing ? 'Processing...' : `Pay ${formatCurrency(rentalRequest.totalPrice)}`}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
