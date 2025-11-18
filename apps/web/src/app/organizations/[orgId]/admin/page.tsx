'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProtectedRoute } from '../../../../components/auth';
import { Navbar, BottomNavigation, Button, Card, Badge } from '@eventfit/ui';
import { Organization, EventCardProps } from '@eventfit/types';
import { ArrowLeft, Settings, Users, Calendar, BarChart3, Shield } from 'lucide-react';
import Link from 'next/link';
import { MemberList, MemberInviteModal } from '../../../../components/organizations';
import { EventGrid } from '../../../../components/events/EventGrid';

/**
 * Organization Admin Panel
 * Reference: Design Reference Analysis - Admin dashboard
 * Visual Requirements:
 * - Clean admin interface
 * - Membership management
 * - Event approval
 * - Analytics overview
 */
export default function OrganizationAdminPage() {
  const params = useParams();
  const router = useRouter();
  const orgId = params.orgId as string;

  const [organization, setOrganization] = useState<Organization | null>(null);
  const [members, setMembers] = useState<
    Array<{
      userId: string;
      name: string;
      avatar?: string;
      role: 'admin' | 'member';
      status: 'pending' | 'approved' | 'rejected';
      email?: string;
    }>
  >([]);
  const [pendingEvents, setPendingEvents] = useState<EventCardProps[]>([]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch organization admin data
    setTimeout(() => {
      setOrganization({
        id: orgId,
        name: 'Alpha Delta Pi',
        type: 'Sorority',
        privacy: 'private',
        campus: 'UNC Chapel Hill',
        createdAt: new Date().toISOString(),
        createdBy: 'user-1',
        memberCount: 45,
        eventCount: 8,
        status: 'approved',
      });
      setMembers([
        {
          userId: 'user-3',
          name: 'New Member',
          email: 'newmember@unc.edu',
          role: 'member',
          status: 'pending',
        },
        {
          userId: 'user-1',
          name: 'Sarah Johnson',
          avatar: 'https://via.placeholder.com/40',
          role: 'admin',
          status: 'approved',
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

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="container mx-auto px-4 py-8 pb-24 max-w-6xl">
          <Link
            href={`/organizations/${orgId}`}
            className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Organization
          </Link>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-varsity font-bold text-text-primary mb-2">
                Organization Settings
              </h1>
              <p className="text-text-secondary">
                Manage members, events, and organization settings
              </p>
            </div>
            <Badge variant="primary" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Admin
            </Badge>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card padding="lg">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary-light rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-text-primary">
                    {organization?.memberCount || 0}
                  </div>
                  <div className="text-sm text-text-secondary">Total Members</div>
                </div>
              </div>
            </Card>
            <Card padding="lg">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary-light rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-text-primary">
                    {organization?.eventCount || 0}
                  </div>
                  <div className="text-sm text-text-secondary">Total Events</div>
                </div>
              </div>
            </Card>
            <Card padding="lg">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary-light rounded-lg">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-text-primary">--</div>
                  <div className="text-sm text-text-secondary">Engagement</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Membership Management */}
          <Card padding="lg" className="mb-8">
            <h2 className="text-xl font-varsity font-bold text-text-primary mb-6">
              Membership Management
            </h2>
            <MemberList
              members={members}
              isAdmin={true}
              onApprove={(userId) => {
                console.log('Approve member:', userId);
                // TODO: API call
                setMembers((prev) =>
                  prev.map((m) => (m.userId === userId ? { ...m, status: 'approved' as const } : m))
                );
              }}
              onReject={(userId) => {
                console.log('Reject member:', userId);
                // TODO: API call
                setMembers((prev) => prev.filter((m) => m.userId !== userId));
              }}
              onInvite={() => setIsInviteModalOpen(true)}
            />
          </Card>

          {/* Pending Events */}
          {pendingEvents.length > 0 && (
            <Card padding="lg">
              <h2 className="text-xl font-varsity font-bold text-text-primary mb-6">
                Pending Events
              </h2>
              <EventGrid events={pendingEvents} loading={false} hasMore={false} />
            </Card>
          )}

          {/* Organization Settings */}
          <Card padding="lg" className="mt-8">
            <h2 className="text-xl font-varsity font-bold text-text-primary mb-6">
              Organization Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <div className="font-semibold text-text-primary">Privacy</div>
                  <div className="text-sm text-text-secondary">
                    {organization?.privacy === 'private'
                      ? 'Private (Invite-only)'
                      : 'Public (All campus)'}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <div className="font-semibold text-text-primary">Delete Organization</div>
                  <div className="text-sm text-text-secondary">
                    Permanently delete this organization and all its data
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="text-red-600 hover:text-red-700">
                  Delete
                </Button>
              </div>
            </div>
          </Card>
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
