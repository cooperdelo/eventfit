'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ProtectedRoute } from '../../../components/auth';
import { Navbar, BottomNavigation, Button, Card, Avatar, Badge } from '@eventfit/ui';
import { Organization, EventCardProps, OutfitCardProps } from '@eventfit/types';
import { Calendar, Users, Lock, Globe, Settings, MessageSquare, Plus } from 'lucide-react';
import { EventGrid } from '../../../components/events/EventGrid';
import { OutfitGrid } from '../../../components/outfits/OutfitGrid';
import { EventCalendar } from '../../../components/calendar';
import { OrganizationChat } from '../../../components/messaging/OrganizationChat';
import { MemberList, MemberInviteModal } from '../../../components/organizations';
import { mockEvents, mockOutfits, mockOrganizations } from '../../../lib/mockData';
// Create a flexible tab component for org pages
const OrgTabs: React.FC<{
  tabs: Array<{ id: string; label: string }>;
  activeTab: string;
  onTabChange: (id: string) => void;
}> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex gap-1 border-b-2 border-border mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-0.5 ${
            activeTab === tab.id
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text-primary'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

/**
 * Organization Landing Page
 * Reference: Event Detail Page - Similar layout and quality
 * Visual Requirements:
 * - Banner/logo at top
 * - Description and membership info
 * - Upcoming events
 * - Outfit feed
 * - Privacy indicators
 * - Clean, college-friendly design
 */
type OrgTabId = 'events' | 'feed' | 'members' | 'chat';

export default function OrganizationPage() {
  const params = useParams();
  const router = useRouter();
  const orgId = params.orgId as string;

  const [organization, setOrganization] = useState<Organization | null>(null);
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [outfits, setOutfits] = useState<OutfitCardProps[]>([]);
  const [members, setMembers] = useState<
    Array<{
      userId: string;
      name: string;
      avatar?: string;
      role: 'admin' | 'member';
    }>
  >([]);
  const [isMember, setIsMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<OrgTabId>('events');
  const [loading, setLoading] = useState(true);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  useEffect(() => {
    // TODO: Fetch organization data
    setTimeout(() => {
      const org = mockOrganizations.find((o) => o.id === orgId) || mockOrganizations[0];
      setOrganization(org);
      setIsMember(true);
      setIsAdmin(false);
      // Use mock events
      setEvents(mockEvents.slice(0, 4));
      // Use mock outfits for feed
      setOutfits(mockOutfits.slice(0, 6));
      setMembers([
        {
          userId: 'user-1',
          name: 'Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop',
          role: 'admin',
        },
        {
          userId: 'user-2',
          name: 'Emma Chen',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop',
          role: 'member',
        },
        {
          userId: 'user-3',
          name: 'Jessica Martinez',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop',
          role: 'member',
        },
        {
          userId: 'user-4',
          name: 'Maya Patel',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop',
          role: 'member',
        },
      ]);
      setLoading(false);
    }, 500);
  }, [orgId]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Card className="animate-pulse h-96" />
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  if (!organization) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Card padding="lg" className="text-center">
              <p className="text-text-secondary">Organization not found</p>
            </Card>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  const tabs = [
    { id: 'events', label: 'Events' },
    { id: 'feed', label: 'Feed' },
    { id: 'members', label: 'Members' },
    { id: 'chat', label: 'Chat' },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Banner */}
        {organization.bannerUrl && (
          <div className="relative w-full h-48 md:h-64 overflow-hidden">
            <Image
              src={organization.bannerUrl}
              alt={organization.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        <main className="container mx-auto px-4 py-8 pb-24">
          {/* Organization Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            {organization.logoUrl && (
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-surface shadow-lg">
                <Image
                  src={organization.logoUrl}
                  alt={organization.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-varsity font-bold text-text-primary">
                  {organization.name}
                </h1>
                {organization.privacy === 'private' ? (
                  <Lock className="h-5 w-5 text-text-secondary" />
                ) : (
                  <Globe className="h-5 w-5 text-text-secondary" />
                )}
                <Badge variant="primary">{organization.type}</Badge>
              </div>
              {organization.description && (
                <p className="text-text-secondary mb-3">{organization.description}</p>
              )}
              <div className="flex items-center gap-6 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{organization.memberCount} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{organization.eventCount} events</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {isAdmin && (
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => router.push(`/organizations/${orgId}/admin`)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Manage
                </Button>
              )}
              {!isMember && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    // TODO: Request to join
                    console.log('Request to join');
                  }}
                >
                  Request to Join
                </Button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <OrgTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Tab Content */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-varsity font-bold text-text-primary">
                  Organization Calendar
                </h2>
                {isAdmin && (
                  <Button variant="outline" size="sm" onClick={() => router.push('/events/create')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                )}
              </div>
              <EventCalendar events={events} loading={false} />
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Upcoming Events</h3>
                <EventGrid events={events} loading={false} hasMore={false} />
              </div>
            </div>
          )}

          {activeTab === 'feed' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-varsity font-bold text-text-primary">
                  Organization Feed
                </h2>
                <Button variant="primary" size="sm" onClick={() => router.push('/dashboard')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Post Outfit
                </Button>
              </div>
              <OutfitGrid outfits={outfits} loading={false} hasMore={false} />
            </div>
          )}

          {activeTab === 'members' && (
            <div>
              <MemberList
                members={members.map((m) => ({
                  ...m,
                  status: 'approved' as const,
                }))}
                isAdmin={isAdmin}
                onApprove={(userId) => {
                  console.log('Approve member:', userId);
                  // TODO: API call
                }}
                onReject={(userId) => {
                  console.log('Reject member:', userId);
                  // TODO: API call
                }}
                onInvite={() => setIsInviteModalOpen(true)}
              />
            </div>
          )}

          {activeTab === 'chat' && (
            <div>
              {!isMember && organization.privacy === 'private' ? (
                <Card padding="lg" className="text-center">
                  <Lock className="h-12 w-12 text-text-tertiary mx-auto mb-4" />
                  <p className="text-text-secondary mb-2">This chat is private</p>
                  <p className="text-sm text-text-tertiary">
                    Join this organization to participate in the chat
                  </p>
                </Card>
              ) : (
                <OrganizationChat
                  orgId={orgId}
                  currentUserId="current-user-id" // TODO: Get from auth
                  onSendMessage={(text) => {
                    console.log('Send message:', text);
                    // TODO: API call
                  }}
                />
              )}
            </div>
          )}
        </main>

        {/* Invite Modal */}
        <MemberInviteModal
          isOpen={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
          onSubmit={(email) => {
            console.log('Invite member:', email);
            // TODO: API call
            setIsInviteModalOpen(false);
          }}
        />

        <BottomNavigation />
      </div>
    </ProtectedRoute>
  );
}
