'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../../../components/auth';
import { Navbar, Card, Button, Badge } from '@eventfit/ui';
import { CheckCircle, XCircle, Eye, Edit } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Admin Event Management Page
 * Reference: Admin spec - Event Management
 * Visual Requirements:
 * - Event list/table
 * - Approve/Reject buttons
 * - Event preview
 */
interface Event {
  id: string;
  title: string;
  creator: string;
  date: string;
  type: string;
  visibility: 'public' | 'private';
  status: 'pending' | 'approved' | 'rejected';
  coverPhoto: string;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending');

  useEffect(() => {
    // TODO: Fetch events from API
    const mockEvents: Event[] = [
      {
        id: 'evt_1',
        title: 'Carolina Lights',
        creator: 'Golden Records',
        date: '2024-12-15',
        type: 'Concert',
        visibility: 'public',
        status: 'pending',
        coverPhoto: 'https://via.placeholder.com/400x300',
      },
      {
        id: 'evt_2',
        title: 'Spring Formal',
        creator: 'Student Council',
        date: '2024-12-20',
        type: 'Formal',
        visibility: 'public',
        status: 'approved',
        coverPhoto: 'https://via.placeholder.com/400x300',
      },
    ];
    setEvents(mockEvents);
    setLoading(false);
  }, []);

  const filteredEvents =
    filter === 'all' ? events : events.filter((event) => event.status === filter);

  const handleApprove = (id: string) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, status: 'approved' as const } : event))
    );
    // TODO: Call API
  };

  const handleReject = (id: string) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, status: 'rejected' as const } : event))
    );
    // TODO: Call API
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8 pb-24">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="mb-2">
                  ← Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-varsity font-bold text-text-primary">
                Event Management
              </h1>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={filter === 'all' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All Events
            </Button>
            <Button
              variant={filter === 'pending' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilter('pending')}
            >
              Pending Approval
            </Button>
            <Button
              variant={filter === 'approved' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilter('approved')}
            >
              Approved
            </Button>
          </div>

          {/* Event List */}
          {loading ? (
            <Card padding="lg">
              <p className="text-text-secondary text-center">Loading events...</p>
            </Card>
          ) : filteredEvents.length === 0 ? (
            <Card padding="lg">
              <p className="text-text-secondary text-center">No events found</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredEvents.map((event) => (
                <Card key={event.id} padding="none" hover>
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative w-full md:w-48 h-48 md:h-auto">
                      <Image
                        src={event.coverPhoto}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 192px"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-varsity font-bold text-text-primary mb-1">
                            {event.title}
                          </h3>
                          <p className="text-sm text-text-secondary">
                            Created by {event.creator} • {new Date(event.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge
                            variant={event.visibility === 'public' ? 'primary' : 'default'}
                            size="sm"
                          >
                            {event.visibility}
                          </Badge>
                          <Badge
                            variant={
                              event.status === 'approved'
                                ? 'success'
                                : event.status === 'rejected'
                                  ? 'error'
                                  : 'warning'
                            }
                            size="sm"
                          >
                            {event.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Actions */}
                      {event.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleApprove(event.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleReject(event.id)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                          <Link href={`/event/${event.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
