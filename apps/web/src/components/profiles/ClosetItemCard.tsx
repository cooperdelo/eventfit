'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, Button, Toggle } from '@eventfit/ui';
import { formatCurrency } from '@eventfit/lib';
import { Edit2, Trash2, ShoppingBag, Eye } from 'lucide-react';
import { cn } from '@eventfit/ui';

/**
 * ClosetItemCard component
 * Reference: Reference 6 (E-commerce Product Grid) - Product cards
 * Visual Requirements:
 * - Image fills card
 * - Price and size prominently displayed
 * - Heart icon for favorites
 * - Hover shows quick actions
 */
export interface ClosetItemCardProps {
  id: string;
  image: string;
  name: string;
  size?: string;
  price?: number;
  isRentable: boolean;
  editEnabled?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleRentable?: (id: string, isRentable: boolean) => void;
}

export const ClosetItemCard: React.FC<ClosetItemCardProps> = ({
  id,
  image,
  name,
  size,
  price,
  isRentable,
  editEnabled = false,
  onEdit,
  onDelete,
  onToggleRentable,
}) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <Card
      hover
      className="overflow-hidden p-0 group"
      padding="none"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Image */}
      <Link href={`/outfit/${id}`}>
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/outfit/${id}`} className="flex-1">
            <h3 className="font-semibold text-text-primary line-clamp-1 hover:text-primary transition-colors">
              {name}
            </h3>
          </Link>
          {isRentable && (
            <span className="px-2 py-1 bg-primary text-white text-xs font-medium rounded-full flex-shrink-0">
              Rentable
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          {size && <span className="text-text-secondary">Size {size}</span>}
          {price && <span className="font-bold text-text-primary">{formatCurrency(price)}</span>}
        </div>

        {/* Actions */}
        {editEnabled && (
          <div
            className={cn(
              'flex items-center gap-2 pt-2 border-t border-gray-100 transition-opacity',
              showActions ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                onEdit?.(id);
              }}
              className="flex-1"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Button>
            {onToggleRentable && (
              <Toggle
                checked={isRentable}
                onChange={(checked) => onToggleRentable(id, checked)}
                className="flex-shrink-0"
              />
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                onDelete?.(id);
              }}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
