'use client';

import React from 'react';
import { cn } from '@eventfit/ui';

/**
 * ProfileTabs component
 * Reference: Reference 5 (Instagram Settings) - Tab navigation
 * Visual Requirements:
 * - Tabs: Closet | Rental History | Wishlist | Friends | Settings
 * - Active tab highlighted
 * - Border-bottom indicator
 */
export type ProfileTabId = 'closet' | 'history' | 'wishlist' | 'friends' | 'settings';

export interface ProfileTab {
  id: ProfileTabId;
  label: string;
  count?: number;
}

export interface ProfileTabsProps {
  tabs: ProfileTab[];
  activeTab: ProfileTabId;
  onTabChange: (tabId: ProfileTabId) => void;
  className?: string;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
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
