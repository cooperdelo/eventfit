'use client';

import { ProtectedRoute } from '../../../components/auth';
import { Navbar, BottomNavigation } from '@eventfit/ui';
import { CreateEventModal } from '../../../components/events';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Create Event Page
 * Reference: Reference 5 (Instagram Settings) - Form page
 */
export default function CreateEventPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="container mx-auto px-4 py-8 pb-24">
          <CreateEventModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              router.back();
            }}
            onSubmit={(data) => {
              console.log('Event created:', data);
              // TODO: Navigate to event detail page
              router.push('/dashboard');
            }}
          />
        </main>

        <BottomNavigation />
      </div>
    </ProtectedRoute>
  );
}
