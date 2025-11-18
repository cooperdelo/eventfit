'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ProtectedRoute } from '../../../components/auth';
import { Navbar, BottomNavigation } from '@eventfit/ui';
import {
  EventHeader,
  SegmentedTabs,
  AttendeeList,
  RelatedItemsCarousel,
  type TabId,
} from '../../../components/events';
import { OutfitGrid, AddOutfitModal } from '../../../components/outfits';
import { RentalRequestModal, PaymentModal } from '../../../components/rentals';
import { EventChat } from '../../../components/messaging';
import { Button } from '@eventfit/ui';
import { Event, OutfitCardProps } from '@eventfit/types';
import { useAuth } from '../../../components/providers/AuthProvider';
import { mockOutfits, mockEvents } from '../../../lib/mockData';
import { Plus } from 'lucide-react';

/**
 * Event Detail Page
 * Reference: Reference 2 (Pinterest Post Detail Page)
 * Layout: Split-screen (desktop) - Image left, details right
 * Tabs: Feed | Rentables | Attendees | Chat
 */
export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.eventId as string;
  const { user } = useAuth();

  const [event, setEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('feed');
  const [outfits, setOutfits] = useState<OutfitCardProps[]>([]);
  const [rentables, setRentables] = useState<OutfitCardProps[]>([]);
  const [attendees, setAttendees] = useState<
    Array<{
      userId: string;
      name: string;
      avatar?: string;
      org?: string;
      isFriend?: boolean;
    }>
  >([]);
  const [isRSVPed, setIsRSVPed] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [isAddOutfitModalOpen, setIsAddOutfitModalOpen] = useState(false);
  const [selectedOutfitForRental, setSelectedOutfitForRental] = useState<OutfitCardProps | null>(
    null
  );
  const [isRentalRequestModalOpen, setIsRentalRequestModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [rentalRequestData, setRentalRequestData] = useState<{
    outfitId: string;
    outfitName: string;
    outfitImage: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    deposit: number;
    rentalPrice: number;
  } | null>(null);

  // Mock data for now - replace with API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Find matching event from mock data or use first one
      const eventData = mockEvents.find((e) => e.id === eventId) || mockEvents[0];
      setEvent({
        eventId: eventId,
        title: eventData.title,
        description: `Join us for ${eventData.title}! ${eventData.organizer?.name ? `Hosted by ${eventData.organizer.name}.` : ''}`,
        date: eventData.startAt,
        type: 'public',
        creatorId: 'creator-1',
        organization: eventData.organizer?.name || 'Event Organizer',
        coverPhoto: eventData.coverPhoto,
        campus: eventData.campus,
        tags: eventData.tags || [],
        hasRentals: eventData.hasRentals,
      });

      // Use mock outfit data
      const eventOutfits = mockOutfits.filter((_, i) => i < 6);
      setOutfits(eventOutfits);
      setRentables(eventOutfits.filter((o) => o.isRentable));

      setAttendees([
        {
          userId: 'user-1',
          name: 'Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop',
          org: 'Alpha Delta Pi',
        },
        {
          userId: 'user-2',
          name: 'Emma Chen',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop',
          org: 'Fashion Society',
        },
        {
          userId: 'user-3',
          name: 'Jessica Martinez',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop',
          org: 'Student Government',
        },
      ]);

      setLoading(false);
    }, 500);
  }, [eventId]);

  const tabs = [
    { id: 'feed' as TabId, label: 'Feed', count: outfits.length },
    { id: 'rentables' as TabId, label: 'Rentables', count: rentables.length },
    { id: 'attendees' as TabId, label: 'Attendees', count: attendees.length },
    { id: 'chat' as TabId, label: 'Chat' },
  ];

  const handleRSVP = async () => {
    // TODO: API call
    setIsRSVPed(!isRSVPed);
  };

  const handleShare = () => {
    // TODO: Share modal
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: event?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleFollow = async () => {
    // TODO: API call
    setIsFollowing(!isFollowing);
  };

  const handleLoadMore = () => {
    // TODO: Load more outfits
    console.log('Load more outfits');
  };

  if (loading || !event) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse space-y-4">
              <div className="h-64 bg-gray-200 rounded-xl" />
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="container mx-auto px-4 py-8 pb-24">
          {/* Event Header */}
          <div className="mb-8">
            <EventHeader
              event={event}
              isRSVPed={isRSVPed}
              isFollowing={isFollowing}
              creator={{
                name: event.organization || 'Event Organizer',
              }}
              onRSVP={handleRSVP}
              onShare={handleShare}
              onFollow={handleFollow}
            />
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <SegmentedTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Add Outfit Button */}
              {(activeTab === 'feed' || activeTab === 'rentables') && (
                <div className="mb-6 flex justify-end">
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
              )}

              {activeTab === 'feed' && (
                <OutfitGrid
                  outfits={outfits.map((outfit) => ({
                    ...outfit,
                    onRent: () => {
                      setSelectedOutfitForRental(outfit);
                      setIsRentalRequestModalOpen(true);
                    },
                  }))}
                  loading={loading}
                  hasMore={hasMore}
                  onLoadMore={handleLoadMore}
                  layout="masonry"
                />
              )}

              {activeTab === 'rentables' && (
                <OutfitGrid
                  outfits={rentables.map((outfit) => ({
                    ...outfit,
                    onRent: () => {
                      setSelectedOutfitForRental(outfit);
                      setIsRentalRequestModalOpen(true);
                    },
                  }))}
                  loading={loading}
                  hasMore={hasMore}
                  onLoadMore={handleLoadMore}
                  layout="grid"
                />
              )}

              {activeTab === 'attendees' && (
                <AttendeeList
                  attendees={attendees}
                  currentUserId={user?.uid}
                  onAddFriend={(userId) => {
                    // TODO: API call
                    console.log('Add friend', userId);
                  }}
                  onRemoveFriend={(userId) => {
                    // TODO: API call
                    console.log('Remove friend', userId);
                  }}
                />
              )}

              {activeTab === 'chat' && (
                <EventChat
                  eventId={eventId}
                  currentUserId={user?.uid}
                  onSendMessage={async (message, attachments) => {
                    // TODO: API call to send message
                    console.log('Sending message:', message, attachments);
                  }}
                />
              )}
            </div>

            {/* Sidebar (Desktop) */}
            <div className="hidden lg:block">
              <RelatedItemsCarousel
                items={rentables.slice(0, 3)}
                title="Trending Outfits"
                className="sticky top-4"
              />
            </div>
          </div>
        </main>

        {/* Add Outfit Modal */}
        <AddOutfitModal
          isOpen={isAddOutfitModalOpen}
          onClose={() => setIsAddOutfitModalOpen(false)}
          onSubmit={(data) => {
            console.log('Outfit posted:', data);
            // TODO: Refresh feed after posting
          }}
          eventOptions={[
            {
              value: eventId,
              label: event?.title || 'This Event',
            },
          ]}
        />

        {/* Rental Request Modal */}
        {selectedOutfitForRental && (
          <RentalRequestModal
            isOpen={isRentalRequestModalOpen}
            onClose={() => {
              setIsRentalRequestModalOpen(false);
              setSelectedOutfitForRental(null);
            }}
            outfit={selectedOutfitForRental}
            onSubmit={(data) => {
              console.log('Rental request:', data);
              // Open payment modal
              setRentalRequestData({
                outfitId: data.outfitId,
                outfitName: selectedOutfitForRental.title,
                outfitImage: selectedOutfitForRental.images[0],
                startDate: data.startDate,
                endDate: data.endDate,
                totalPrice: data.totalPrice,
                deposit: data.deposit || 0,
                rentalPrice: data.totalPrice - (data.deposit || 0),
              });
              setIsRentalRequestModalOpen(false);
              setIsPaymentModalOpen(true);
            }}
          />
        )}

        {/* Payment Modal */}
        {rentalRequestData && (
          <PaymentModal
            isOpen={isPaymentModalOpen}
            onClose={() => {
              setIsPaymentModalOpen(false);
              setRentalRequestData(null);
              setSelectedOutfitForRental(null);
            }}
            rentalRequest={rentalRequestData}
            onPaymentSuccess={(paymentId) => {
              console.log('Payment successful:', paymentId);
              // TODO: Refresh rental status
            }}
          />
        )}

        <BottomNavigation />
      </div>
    </ProtectedRoute>
  );
}
