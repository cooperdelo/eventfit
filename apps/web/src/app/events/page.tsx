'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../../components/auth';
import { Navbar, BottomNavigation, Button } from '@eventfit/ui';
import { FilterToolbar } from '../../components/filters/FilterToolbar';
import { EventGrid } from '../../components/events/EventGrid';
import { EventCardProps } from '@eventfit/types';
import { Plus, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { mockEvents } from '../../lib/mockData';

/**
 * Events Listing Page
 * Shows all events with filtering options
 */
export default function EventsPage() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'friends' | 'rentable'>('all');
  const [campus, setCampus] = useState('UNC Chapel Hill');
  const [radiusMiles, setRadiusMiles] = useState(3);
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // TODO: Fetch events from API
    setEvents(mockEvents);
    setLoading(false);
  }, [selectedFilter, radiusMiles]);

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
        <FilterToolbar
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          campus={campus}
          radiusMiles={radiusMiles}
          onChangeRadius={setRadiusMiles}
        />
        <main className="container mx-auto px-4 py-8 pb-24">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-varsity font-bold text-text-primary">All Events</h1>
            <Button
              variant="primary"
              size="md"
              onClick={() => router.push('/events/create')}
              aria-label="Create new event"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>

          <EventGrid events={events} loading={loading} hasMore={hasMore} />
        </main>

        <BottomNavigation />
      </div>
    </ProtectedRoute>
  );
}
