'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '../../components/auth';
import { Navbar, BottomNavigation } from '@eventfit/ui';
import { InspirationGrid } from '../../components/inspiration';
import type { InspirationCardProps } from '../../components/inspiration/InspirationCard';
import { mockInspiration } from '../../lib/mockData';

/**
 * Inspiration Page
 * Reference: Reference 3, 7 (Pinterest Search, Landing Page)
 * Visual Requirements:
 * - Masonry grid layout
 * - Curated looks
 * - Affiliate link integration
 */
export default function InspirationPage() {
  const router = useRouter();
  const [items, setItems] = useState<InspirationCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState<string>('all');

  // Mock data with filtering
  useEffect(() => {
    setTimeout(() => {
      const filtered =
        selectedEventType === 'all'
          ? mockInspiration
          : mockInspiration.filter(
              (item) => item.eventType?.toLowerCase() === selectedEventType.toLowerCase()
            );
      setItems(filtered);
      setLoading(false);
    }, 500);
  }, [selectedEventType]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar
          links={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Events', href: '/events' },
            { label: 'Inspiration', href: '/inspiration' },
            { label: 'Search', href: '/search' },
            { label: 'Leaderboard', href: '/leaderboard' },
          ]}
        />

        <main className="container mx-auto px-4 py-8 pb-24">
          <div className="mb-8">
            <h1 className="text-3xl font-varsity font-bold text-text-primary mb-2">Get Inspired</h1>
            <p className="text-text-secondary">Curated looks for your next event</p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['All', 'Formal', 'Gameday', 'Concert', 'Casual'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedEventType(type.toLowerCase())}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    selectedEventType === type.toLowerCase()
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {type}
              </button>
            ))}
          </div>

          <InspirationGrid
            items={items}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={() => {
              console.log('Load more inspiration');
            }}
            onLike={(id) => {
              console.log('Like inspiration:', id);
            }}
            onSwipeUp={(id) => {
              // Navigate to rentals page with filter
              router.push(`/dashboard?filter=rentable&inspiration=${id}`);
            }}
          />
        </main>

        <BottomNavigation />
      </div>
    </ProtectedRoute>
  );
}
