'use client';

import React from 'react';
import { ClosetItemCard } from './ClosetItemCard';
import { Button } from '@eventfit/ui';
import { Plus } from 'lucide-react';
import type { ClosetItemCardProps } from './ClosetItemCard';

/**
 * ClosetGrid component
 * Reference: Reference 6 (E-commerce Product Grid) - Grid layout
 * Visual Requirements:
 * - 2 cols mobile / 3-4 cols tablet & desktop
 * - Grid layout
 * - Add Item button
 */
export interface ClosetGridProps {
  items: ClosetItemCardProps[];
  loading?: boolean;
  onAddItem?: () => void;
  onEditItem?: (id: string) => void;
  onDeleteItem?: (id: string) => void;
  onToggleRentable?: (id: string, isRentable: boolean) => void;
  editEnabled?: boolean;
}

export const ClosetGrid: React.FC<ClosetGridProps> = ({
  items,
  loading = false,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onToggleRentable,
  editEnabled = false,
}) => {
  if (items.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary mb-4">Your closet is empty</p>
        {onAddItem && (
          <Button variant="primary" onClick={onAddItem}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Item
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header with Add Button */}
      {onAddItem && (
        <div className="flex justify-end mb-6">
          <Button variant="primary" onClick={onAddItem}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ClosetItemCard
            key={item.id}
            {...item}
            editEnabled={editEnabled}
            onEdit={onEditItem}
            onDelete={onDeleteItem}
            onToggleRentable={onToggleRentable}
          />
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-0 animate-pulse">
              <div className="w-full aspect-square bg-gray-200" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
