'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, Avatar, Button } from '@eventfit/ui';
import { formatDate, formatCurrency } from '@eventfit/lib';
import { Star, Calendar, Repeat } from 'lucide-react';

/**
 * RentalHistoryItem component
 * Reference: Reference 4 (Messaging Interface) - List item pattern
 * Visual Requirements:
 * - Outfit image, renter info, dates, rating
 * - Clean list item design
 * - Repeat rental option
 */
export interface RentalHistoryItemProps {
  id: string;
  outfitImage: string;
  outfitName: string;
  renterName: string;
  renterAvatar?: string;
  startDate: Date | string;
  endDate: Date | string;
  price: number;
  rating?: number;
  isAvailable?: boolean;
  onRepeatRental?: (id: string) => void;
}

export const RentalHistoryItem: React.FC<RentalHistoryItemProps> = ({
  id,
  outfitImage,
  outfitName,
  renterName,
  renterAvatar,
  startDate,
  endDate,
  price,
  rating,
  isAvailable = false,
  onRepeatRental,
}) => {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        {/* Outfit Image */}
        <Link href={`/outfit/${id}`}>
          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <Image src={outfitImage} alt={outfitName} fill className="object-cover" sizes="80px" />
          </div>
        </Link>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <Link href={`/outfit/${id}`}>
            <h3 className="font-semibold text-text-primary hover:text-primary transition-colors line-clamp-1">
              {outfitName}
            </h3>
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <Avatar src={renterAvatar} alt={renterName} size="sm" />
            <span className="text-sm text-text-secondary">{renterName}</span>
          </div>
          <div className="flex items-center gap-4 mt-2 text-xs text-text-secondary">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>
                {formatDate(startDate, 'MMM d')} - {formatDate(endDate, 'MMM d')}
              </span>
            </div>
            {rating !== undefined && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Price & Actions */}
        <div className="flex flex-col items-end gap-2">
          <div className="text-lg font-bold text-text-primary">{formatCurrency(price)}</div>
          {isAvailable && onRepeatRental && (
            <Button variant="outline" size="sm" onClick={() => onRepeatRental(id)}>
              <Repeat className="h-3 w-3 mr-1" />
              Repeat
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
