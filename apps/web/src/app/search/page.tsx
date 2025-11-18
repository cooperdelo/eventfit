'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProtectedRoute } from '../../components/auth';
import { Navbar, BottomNavigation } from '@eventfit/ui';
import { SearchBar, SearchResults, type SearchResultType } from '../../components/search';
import { EventCardProps, OutfitCardProps } from '@eventfit/types';
import { searchProductsByFilters, productsToOutfitCards } from '../../lib/products/utils';

/**
 * Search Page
 * Reference: Reference 3 (Pinterest Search) - Search page
 * Visual Requirements:
 * - Search bar at top
 * - Filter chips
 * - Results grid
 * - Tab navigation
 */
export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<SearchResultType>('all');
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [outfits, setOutfits] = useState<OutfitCardProps[]>([]);
  const [productOutfits, setProductOutfits] = useState<OutfitCardProps[]>([]);
  const [users, setUsers] = useState<
    Array<{
      userId: string;
      name: string;
      avatar?: string;
      school?: string;
    }>
  >([]);
  const [loading, setLoading] = useState(false);

  // Search results including products
  useEffect(() => {
    if (!query) {
      setEvents([]);
      setOutfits([]);
      setProductOutfits([]);
      setUsers([]);
      return;
    }

    setLoading(true);

    // Search products if query is provided
    const searchProducts = async () => {
      try {
        const products = await searchProductsByFilters({
          keywords: query,
          limit: 10,
        });
        const productCards = productsToOutfitCards(products);
        setProductOutfits(productCards);
      } catch (error) {
        console.error('Product search error:', error);
        setProductOutfits([]);
      }
    };

    // Simulate API call for events, outfits, users
    Promise.all([
      searchProducts(),
      new Promise<void>((resolve) => {
        setTimeout(() => {
          setEvents([
            {
              id: 'evt-1',
              title: 'Carolina Lights',
              coverPhoto: 'https://via.placeholder.com/400x300',
              startAt: new Date().toISOString(),
              campus: 'UNC Chapel Hill',
              tags: ['concert'],
              hasRentals: true,
              organizer: { name: 'Golden Records' },
            },
          ]);
          setOutfits([
            {
              id: 'outfit-1',
              images: ['https://via.placeholder.com/400x600'],
              title: 'Formal Dress',
              price: 25,
              size: 'M',
              isRentable: true,
              owner: { name: 'Sarah Johnson', avatar: 'https://via.placeholder.com/40' },
            },
          ]);
          setUsers([
            {
              userId: 'user-1',
              name: 'Sarah Johnson',
              avatar: 'https://via.placeholder.com/40',
              school: 'UNC Chapel Hill',
            },
          ]);
          resolve();
        }, 500);
      }),
    ]).finally(() => {
      setLoading(false);
    });
  }, [query]);

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
          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search events, outfits, or users..."
            />
          </div>

          {/* Search Results */}
          <SearchResults
            query={query}
            events={events}
            outfits={[...outfits, ...productOutfits]}
            users={users}
            loading={loading}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </main>

        <BottomNavigation />
      </div>
    </ProtectedRoute>
  );
}
