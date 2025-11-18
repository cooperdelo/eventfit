'use client';

import React from 'react';
import { EventCard } from '../events/EventCard';
import { OutfitCard } from '../outfits/OutfitCard';
import { EventCardProps, OutfitCardProps } from '@eventfit/types';

/**
 * SearchResults component
 * Reference: Reference 3 (Pinterest Search) - Search results
 * Visual Requirements:
 * - Tabs for results types
 * - Grid layout
 * - Result counts
 */
export type SearchResultType = 'all' | 'events' | 'outfits' | 'users';

export interface SearchResultsProps {
  query: string;
  events: EventCardProps[];
  outfits: OutfitCardProps[];
  users: Array<{
    userId: string;
    name: string;
    avatar?: string;
    school?: string;
  }>;
  loading?: boolean;
  activeTab?: SearchResultType;
  onTabChange?: (tab: SearchResultType) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  events,
  outfits,
  users,
  loading = false,
  activeTab = 'all',
  onTabChange,
}) => {
  const totalResults = events.length + outfits.length + users.length;

  const tabs = [
    { id: 'all' as SearchResultType, label: 'All', count: totalResults },
    { id: 'events' as SearchResultType, label: 'Events', count: events.length },
    { id: 'outfits' as SearchResultType, label: 'Outfits', count: outfits.length },
    { id: 'users' as SearchResultType, label: 'Users', count: users.length },
  ];

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">Start typing to search...</p>
      </div>
    );
  }

  if (totalResults === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary mb-2">No results found for "{query}"</p>
        <p className="text-sm text-text-tertiary">Try different keywords or check your filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Search Results</h2>
          <p className="text-sm text-text-secondary mt-1">
            Found {totalResults} {totalResults === 1 ? 'result' : 'results'} for "{query}"
          </p>
        </div>
      </div>

      {/* Tabs */}
      {onTabChange && (
        <div className="border-b-2 border-gray-200">
          <div className="flex space-x-4 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`
                    px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap
                    border-b-2 -mb-0.5
                    ${
                      isActive
                        ? 'border-primary text-primary'
                        : 'border-transparent text-text-secondary hover:text-text-primary'
                    }
                  `}
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
      )}

      {/* Results Content */}
      <div>
        {(activeTab === 'all' || activeTab === 'events') && events.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Events</h3>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {events.map((event) => (
                <div key={event.id} className="break-inside-avoid mb-4">
                  <EventCard {...event} />
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'outfits') && outfits.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Outfits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {outfits.map((outfit) => (
                <OutfitCard key={outfit.id} {...outfit} />
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'users') && users.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Users</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user) => (
                <div
                  key={user.userId}
                  className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* User card - can be enhanced */}
                  <p className="font-medium text-text-primary">{user.name}</p>
                  {user.school && <p className="text-sm text-text-secondary">{user.school}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
