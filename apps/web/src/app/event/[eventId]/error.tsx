'use client';

import { useEffect } from 'react';
import { Button } from '@eventfit/ui';
import { AlertCircle } from 'lucide-react';

/**
 * Error state for Event Detail Page
 */
export default function EventDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Event detail error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-text-primary mb-2">Something went wrong!</h2>
        <p className="text-text-secondary mb-6">
          We couldn't load the event details. Please try again.
        </p>
        <Button variant="primary" onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
