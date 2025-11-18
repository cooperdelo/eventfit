'use client';

import React from 'react';
import { Badge } from '@eventfit/ui';
import { cn } from '@eventfit/ui';

/**
 * FilterToolbar component matching Reference 3, 6
 * Visual Requirements (Reference 3, 6):
 * - Sticky: sticky top-14 z-40 bg-white border-b
 * - Filter chips: rounded-full, active state clear (bg-teal-50 text-teal-800)
 * - Campus chip: Shows "Campus: UNC • 3 mi (change)"
 * - Search input: Centered, aria-label
 * - Clear all: Right side, blue text
 */
export interface FilterToolbarProps {
  selectedFilter: 'all' | 'friends' | 'rentable';
  onFilterChange: (filter: 'all' | 'friends' | 'rentable') => void;
  campus: string;
  radiusMiles: number;
  onChangeRadius: (radius: number) => void;
  onClearAll?: () => void;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  selectedFilter,
  onFilterChange,
  campus,
  radiusMiles,
  onChangeRadius,
  onClearAll,
}) => {
  const filters: Array<{ id: 'all' | 'friends' | 'rentable'; label: string }> = [
    { id: 'all', label: 'All' },
    { id: 'friends', label: 'Friends' },
    { id: 'rentable', label: 'Rentable' },
  ];

  return (
    <div className="sticky top-14 z-40 bg-surface border-b border-border px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Filter Chips */}
        <div className="flex items-center gap-2 flex-1 overflow-x-auto">
          {filters.map((filter) => (
            <Badge
              key={filter.id}
              variant="filter"
              active={selectedFilter === filter.id}
              onClick={() => onFilterChange(filter.id)}
            >
              {filter.label}
            </Badge>
          ))}

          {/* Campus Chip */}
          <Badge
            variant="filter"
            onClick={() => {
              // TODO: Open radius modal
              const newRadius =
                radiusMiles === 1 ? 3 : radiusMiles === 3 ? 5 : radiusMiles === 5 ? 10 : 1;
              onChangeRadius(newRadius);
            }}
          >
            Campus: {campus} • {radiusMiles} mi (change)
          </Badge>
        </div>

        {/* Clear All */}
        {onClearAll && (
          <button
            onClick={onClearAll}
            className="text-sm text-primary hover:text-[#003d32] whitespace-nowrap"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="mt-3">
        <input
          type="search"
          placeholder="Search events or outfits"
          aria-label="Search events or outfits"
          className="w-full rounded-lg border border-border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>
    </div>
  );
};
