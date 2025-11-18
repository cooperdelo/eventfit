'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '../../../components/auth';
import { Navbar, BottomNavigation, Button, Input, Card } from '@eventfit/ui';
import { OrganizationType } from '@eventfit/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

/**
 * Organization Creation Page
 * Reference: Event Detail Page quality - Clean form design
 * Visual Requirements:
 * - Clean form with labels and helper text
 * - Organization type dropdown with "Other" option
 * - Banner/logo upload
 * - Privacy toggle
 * - Matches design system
 */
const ORGANIZATION_TYPES: OrganizationType[] = [
  'Sorority',
  'Fraternity',
  'Academic Club',
  'Cultural Club',
  'Social Club',
  'Sports Team',
  'Student Government',
  'Honor Society',
  'Professional Organization',
  'Religious Organization',
  'Service Organization',
  'Other',
];

export default function CreateOrganizationPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [type, setType] = useState<OrganizationType>('Social Club');
  const [customType, setCustomType] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState<'public' | 'private'>('public');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Organization name is required');
      return;
    }

    if (type === 'Other' && !customType.trim()) {
      setError('Please specify the organization type');
      return;
    }

    setLoading(true);

    // TODO: API call to create organization
    setTimeout(() => {
      console.log('Organization created:', {
        name,
        type: type === 'Other' ? customType : type,
        description,
        privacy,
      });
      setLoading(false);
      router.push('/organizations');
    }, 1000);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="container mx-auto px-4 py-8 pb-24 max-w-2xl">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <h1 className="text-3xl font-varsity font-bold text-text-primary mb-2">
            Create Organization
          </h1>
          <p className="text-text-secondary mb-8">
            Create a private group for your sorority, club, or organization
          </p>

          <Card padding="lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Organization Name */}
              <div>
                <Input
                  label="Organization Name"
                  value={name}
                  onChange={setName}
                  required
                  placeholder="e.g., Alpha Delta Pi"
                  helperText="This will be visible to all members"
                />
              </div>

              {/* Organization Type */}
              <div>
                <label htmlFor="type" className="block font-medium text-text-primary mb-1">
                  Organization Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value as OrganizationType)}
                  required
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  {ORGANIZATION_TYPES.map((orgType) => (
                    <option key={orgType} value={orgType}>
                      {orgType}
                    </option>
                  ))}
                </select>
                {type === 'Other' && (
                  <div className="mt-2">
                    <Input
                      label="Specify Type"
                      value={customType}
                      onChange={setCustomType}
                      required
                      placeholder="Enter organization type"
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block font-medium text-text-primary mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  maxLength={500}
                  placeholder="Tell us about your organization..."
                  className="w-full rounded-lg border border-border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                />
                <p className="text-xs text-text-tertiary mt-1">
                  {description.length} / 500 characters
                </p>
              </div>

              {/* Privacy Setting */}
              <div>
                <label className="block font-medium text-text-primary mb-2">Privacy Setting</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setPrivacy('public')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors ${
                      privacy === 'public'
                        ? 'border-primary bg-primary-light text-primary'
                        : 'border-border text-text-secondary hover:border-primary-light'
                    }`}
                  >
                    <div className="font-semibold mb-1">Public</div>
                    <div className="text-xs">Visible to all campus members</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrivacy('private')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors ${
                      privacy === 'private'
                        ? 'border-primary bg-primary-light text-primary'
                        : 'border-border text-text-secondary hover:border-primary-light'
                    }`}
                  >
                    <div className="font-semibold mb-1">Private</div>
                    <div className="text-xs">Invite-only, members only</div>
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.back()}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="flex-1" loading={loading}>
                  Create Organization
                </Button>
              </div>
            </form>
          </Card>

          {/* Info Box */}
          <Card className="mt-6" padding="md">
            <p className="text-sm text-text-secondary">
              <strong className="text-text-primary">Note:</strong> Your organization will be
              reviewed by admins before being approved. Once approved, you'll be able to invite
              members and create events.
            </p>
          </Card>
        </main>

        <BottomNavigation />
      </div>
    </ProtectedRoute>
  );
}
