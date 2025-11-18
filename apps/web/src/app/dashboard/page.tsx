'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../../components/auth';
import { Navbar, BottomNavigation, Button } from '@eventfit/ui';
import { NotificationCenter } from '../../components/notifications';
import { FilterToolbar } from '../../components/filters/FilterToolbar';
import { EventGrid } from '../../components/events/EventGrid';
import {
  EventCalendar,
  CalendarViewToggle,
  EventList,
  type CalendarViewType,
} from '../../components/calendar';
import { AddOutfitModal } from '../../components/outfits';
import { CreateEventModal } from '../../components/events';
import { EventCardProps } from '@eventfit/types';
import { Plus, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { mockEvents } from '../../lib/mockData';

export default function DashboardPage() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'friends' | 'rentable'>('all');
  const [campus, setCampus] = useState('UNC Chapel Hill');
  const [radiusMiles, setRadiusMiles] = useState(3);
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [isAddOutfitModalOpen, setIsAddOutfitModalOpen] = useState(false);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const [activeTab, setActiveTab] = useState<'events' | 'calendar'>('events');
  const [calendarView, setCalendarView] = useState<CalendarViewType>('calendar');
  const router = useRouter();

  // Mock event options for outfit posting
  const eventOptions = events.map((event) => ({
    value: event.id,
    label: event.title,
  }));

  useEffect(() => {
    // TODO: Fetch events from API
    // Using mock data with realistic images
    setEvents(mockEvents);
    setLoading(false);
  }, [selectedFilter, radiusMiles]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar
          showNotifications={true}
          unreadNotificationCount={unreadNotificationCount}
          onNotificationsClick={() => setIsNotificationCenterOpen(true)}
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
            <h1 className="text-2xl font-varsity font-bold text-text-primary">Dashboard</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="md"
                onClick={() => router.push('/events/create')}
                aria-label="Create new event"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Create Event
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsAddOutfitModalOpen(true)}
                aria-label="Add new outfit"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Outfit
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-1 border-b-2 border-border">
              <button
                onClick={() => setActiveTab('events')}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-0.5 ${
                  activeTab === 'events'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
                aria-label="Events view"
              >
                Events
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-0.5 ${
                  activeTab === 'calendar'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
                aria-label="Calendar view"
              >
                Calendar
              </button>
            </div>
            {activeTab === 'calendar' && (
              <CalendarViewToggle view={calendarView} onViewChange={setCalendarView} />
            )}
          </div>

          {/* Tab Content */}
          {activeTab === 'events' && (
            <EventGrid events={events} loading={loading} hasMore={hasMore} />
          )}
          {activeTab === 'calendar' && (
            <>
              {calendarView === 'calendar' ? (
                <EventCalendar events={events} loading={loading} />
              ) : (
                <EventList events={events} loading={loading} />
              )}
            </>
          )}
        </main>

        {/* Add Outfit Modal */}
        <AddOutfitModal
          isOpen={isAddOutfitModalOpen}
          onClose={() => setIsAddOutfitModalOpen(false)}
          onSubmit={(data) => {
            console.log('Outfit posted:', data);
            // TODO: Refresh feed after posting
          }}
          eventOptions={eventOptions}
        />
        <BottomNavigation />

        {/* Notification Center */}
        <NotificationCenter
          isOpen={isNotificationCenterOpen}
          onClose={() => setIsNotificationCenterOpen(false)}
          notifications={[]}
          onMarkAsRead={(id) => {
            console.log('Mark as read:', id);
            // TODO: Call API
          }}
          onMarkAllAsRead={() => {
            console.log('Mark all as read');
            // TODO: Call API
          }}
        />
      </div>
    </ProtectedRoute>
  );
}
