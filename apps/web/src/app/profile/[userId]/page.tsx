'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ProtectedRoute } from '../../../components/auth';
import { Navbar, BottomNavigation, Modal } from '@eventfit/ui';
import {
  ProfileHeader,
  ClosetGrid,
  RentalHistoryItem,
  FriendCard,
  ProfileTabs,
  SettingsForm,
  type ProfileTabId,
} from '../../../components/profiles';
import { AddOutfitModal } from '../../../components/outfits';
import { UserProfile, OutfitCardProps } from '@eventfit/types';
import { useAuth } from '../../../components/providers/AuthProvider';
import { mockOutfits } from '../../../lib/mockData';

/**
 * Profile/Closet Page
 * Reference: Reference 5 (Instagram Settings) - Profile page
 * Layout: Profile header + tabs + content
 * Tabs: Closet | Rental History | Wishlist | Friends | Settings
 */
export default function ProfilePage() {
  const params = useParams();
  const userId = params.userId as string;
  const { user } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTabId>('closet');
  const [closetItems, setClosetItems] = useState<
    Array<{
      id: string;
      image: string;
      name: string;
      size?: string;
      price?: number;
      isRentable: boolean;
    }>
  >([]);
  const [rentalHistory, setRentalHistory] = useState<
    Array<{
      id: string;
      outfitImage: string;
      outfitName: string;
      renterName: string;
      renterAvatar?: string;
      startDate: Date | string;
      endDate: Date | string;
      price: number;
      rating?: number;
      isAvailable?: boolean;
    }>
  >([]);
  const [wishlist, setWishlist] = useState<OutfitCardProps[]>([]);
  const [friends, setFriends] = useState<
    Array<{
      userId: string;
      name: string;
      avatar?: string;
      org?: string;
      isFriend?: boolean;
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [isAddOutfitModalOpen, setIsAddOutfitModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const isOwnProfile = user?.uid === userId;

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      setProfile({
        userId: userId,
        name: 'Sarah Johnson',
        email: 'sarah@unc.edu',
        school: 'UNC Chapel Hill',
        bio: 'Fashion enthusiast and event stylist. Love sharing my closet with the community!',
        profilePhoto:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop',
        affiliation: 'sorority',
        stats: {
          totalRentals: 12,
          itemsListed: 8,
          followers: 156,
          following: 89,
        },
      });

      // Use mock outfits for closet
      const userOutfits = mockOutfits.slice(0, 8);
      setClosetItems(
        userOutfits.map((outfit) => ({
          id: outfit.id,
          image: outfit.images[0],
          name: outfit.title,
          size: outfit.size,
          price: outfit.price,
          isRentable: outfit.isRentable,
        }))
      );

      // Use mock outfits for wishlist
      setWishlist(mockOutfits.slice(4, 8));

      setRentalHistory([
        {
          id: 'rental-1',
          outfitImage: mockOutfits[0].images[0],
          outfitName: mockOutfits[0].title,
          renterName: 'Emma Wilson',
          renterAvatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop',
          startDate: new Date('2024-01-15'),
          endDate: new Date('2024-01-20'),
          price: mockOutfits[0].price || 25,
          rating: 5,
          isAvailable: true,
        },
        {
          id: 'rental-2',
          outfitImage: mockOutfits[1].images[0],
          outfitName: mockOutfits[1].title,
          renterName: 'Jessica Martinez',
          renterAvatar:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop',
          startDate: new Date('2024-01-10'),
          endDate: new Date('2024-01-12'),
          price: mockOutfits[1].price || 28,
          rating: 4,
          isAvailable: true,
        },
      ]);

      setFriends([
        {
          userId: 'user-1',
          name: 'Emma Chen',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop',
          org: 'Alpha Delta Pi',
          isFriend: true,
        },
        {
          userId: 'user-2',
          name: 'Jessica Martinez',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop',
          org: 'Fashion Society',
          isFriend: true,
        },
        {
          userId: 'user-3',
          name: 'Maya Patel',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop',
          org: 'Student Government',
          isFriend: false,
        },
      ]);

      setLoading(false);
    }, 500);
  }, [userId]);

  const tabs = [
    { id: 'closet' as ProfileTabId, label: 'Closet', count: closetItems.length },
    { id: 'history' as ProfileTabId, label: 'Rental History', count: rentalHistory.length },
    { id: 'wishlist' as ProfileTabId, label: 'Wishlist', count: wishlist.length },
    { id: 'friends' as ProfileTabId, label: 'Friends', count: friends.length },
    { id: 'settings' as ProfileTabId, label: 'Settings' },
  ];

  if (loading || !profile) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse space-y-4">
              <div className="h-32 bg-gray-200 rounded-xl" />
              <div className="h-8 bg-gray-200 rounded w-1/2" />
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
          {/* Profile Header */}
          <ProfileHeader
            profile={profile}
            isOwnProfile={isOwnProfile}
            onEditProfile={() => setIsEditProfileModalOpen(true)}
          />

          {/* Tabs */}
          <div className="mb-6">
            <ProfileTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Tab Content */}
          {activeTab === 'closet' && (
            <ClosetGrid
              items={closetItems}
              loading={loading}
              editEnabled={isOwnProfile}
              onAddItem={() => setIsAddOutfitModalOpen(true)}
              onEditItem={(id) => {
                console.log('Edit item:', id);
                // TODO: Open edit modal
              }}
              onDeleteItem={(id) => {
                console.log('Delete item:', id);
                // TODO: Confirm and delete
              }}
              onToggleRentable={(id, isRentable) => {
                console.log('Toggle rentable:', id, isRentable);
                // TODO: Update item
              }}
            />
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              {rentalHistory.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-text-secondary">No rental history yet</p>
                </div>
              ) : (
                rentalHistory.map((rental) => (
                  <RentalHistoryItem
                    key={rental.id}
                    {...rental}
                    onRepeatRental={(id) => {
                      console.log('Repeat rental:', id);
                      // TODO: Open rent modal
                    }}
                  />
                ))
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="text-center py-12">
              <p className="text-text-secondary">Wishlist coming soon!</p>
            </div>
          )}

          {activeTab === 'friends' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {friends.length === 0 ? (
                <div className="col-span-2 text-center py-12">
                  <p className="text-text-secondary">No friends yet</p>
                </div>
              ) : (
                friends.map((friend) => (
                  <FriendCard
                    key={friend.userId}
                    {...friend}
                    onAddFriend={(userId) => {
                      console.log('Add friend:', userId);
                      // TODO: API call
                    }}
                    onRemoveFriend={(userId) => {
                      console.log('Remove friend:', userId);
                      // TODO: API call
                    }}
                  />
                ))
              )}
            </div>
          )}

          {activeTab === 'settings' && isOwnProfile && (
            <SettingsForm
              profile={profile}
              onSave={(data) => {
                console.log('Save settings:', data);
                // TODO: API call
              }}
              onDeleteAccount={() => {
                console.log('Delete account');
                // TODO: Confirm and delete
              }}
            />
          )}
        </main>

        {/* Add Outfit Modal */}
        <AddOutfitModal
          isOpen={isAddOutfitModalOpen}
          onClose={() => setIsAddOutfitModalOpen(false)}
          onSubmit={(data) => {
            console.log('Outfit posted:', data);
            // TODO: Refresh closet
          }}
          eventOptions={[]}
        />

        {/* Edit Profile Modal */}
        <Modal
          isOpen={isEditProfileModalOpen}
          onClose={() => setIsEditProfileModalOpen(false)}
          title="Edit Profile"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-text-secondary">Edit profile modal coming soon!</p>
            {/* TODO: Implement edit profile form */}
          </div>
        </Modal>

        <BottomNavigation />
      </div>
    </ProtectedRoute>
  );
}
