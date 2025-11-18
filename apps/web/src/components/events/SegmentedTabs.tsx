'use client';

import React from 'react';
import { cn } from '@eventfit/ui';

/**
 * SegmentedTabs component
 * Reference: Reference 2 (Pinterest Post Detail Page) - Tab navigation
 * Visual Requirements:
 * - Tabs: Feed | Rentables | Attendees | Chat
 * - Active tab highlighted (accent color)
 * - Smooth transitions
 * - Border-bottom indicator
 */
export type TabId = 'feed' | 'rentables' | 'attendees' | 'chat';

export interface Tab {
  id: TabId;
  label: string;
  count?: number;
}

export interface SegmentedTabsProps {
  tabs: Tab[];
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
  className?: string;
}

export const SegmentedTabs: React.FC<SegmentedTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className,
}) => {
  return (
    <div className={cn('w-full border-b-2 border-gray-200', className)}>
      <div className="flex space-x-4 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap',
                'border-b-2 -mb-0.5',
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              )}
              aria-label={`Switch to ${tab.label} tab`}
              aria-selected={isActive}
              role="tab"
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="ml-2 text-xs text-text-tertiary">({tab.count})</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
