/**
 * Rental types matching database schema
 */
export interface Rental {
  rentalId: string;
  outfitId: string;
  renterId: string;
  ownerId: string;
  status: 'requested' | 'approved' | 'paid' | 'delivered' | 'returned' | 'dispute' | 'canceled';
  price: number;
  deposit?: number;
  transactionId?: string;
  dueDate: Date | string;
  startDate: Date | string;
  endDate: Date | string;
  createdAt: Date | string;
}
