'use client';

import { useState } from 'react';
import { ProtectedRoute } from '../../../components/auth';
import { Navbar, Card, Button } from '@eventfit/ui';
import { BarChart3, Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import Link from 'next/link';

/**
 * Admin Analytics Page
 * Reference: Admin spec - Analytics / Insights
 * Visual Requirements:
 * - Charts and metrics
 * - Date range filters
 * - Clean data visualization
 */
export default function AdminAnalyticsPage() {
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'year'>('month');

  // Mock analytics data
  const analytics = {
    mau: 1247,
    rentals: 234,
    events: 45,
    revenue: 10530,
    growth: {
      users: 12.5,
      rentals: 8.3,
      events: 15.2,
    },
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
                Analytics & Insights
              </h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant={dateRange === 'week' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setDateRange('week')}
              >
                Week
              </Button>
              <Button
                variant={dateRange === 'month' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setDateRange('month')}
              >
                Month
              </Button>
              <Button
                variant={dateRange === 'year' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setDateRange('year')}
              >
                Year
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card padding="lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="flex items-center gap-1 text-sm text-success">
                  <TrendingUp className="h-4 w-4" />
                  {analytics.growth.users}%
                </div>
              </div>
              <p className="text-sm text-text-secondary mb-1">Monthly Active Users</p>
              <p className="text-3xl font-varsity font-bold text-text-primary">
                {analytics.mau.toLocaleString()}
              </p>
            </Card>

            <Card padding="lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <div className="flex items-center gap-1 text-sm text-success">
                  <TrendingUp className="h-4 w-4" />
                  {analytics.growth.rentals}%
                </div>
              </div>
              <p className="text-sm text-text-secondary mb-1">Total Rentals</p>
              <p className="text-3xl font-varsity font-bold text-text-primary">
                {analytics.rentals.toLocaleString()}
              </p>
            </Card>

            <Card padding="lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div className="flex items-center gap-1 text-sm text-success">
                  <TrendingUp className="h-4 w-4" />
                  {analytics.growth.events}%
                </div>
              </div>
              <p className="text-sm text-text-secondary mb-1">Active Events</p>
              <p className="text-3xl font-varsity font-bold text-text-primary">
                {analytics.events.toLocaleString()}
              </p>
            </Card>

            <Card padding="lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-accent" />
                </div>
              </div>
              <p className="text-sm text-text-secondary mb-1">Revenue</p>
              <p className="text-3xl font-varsity font-bold text-text-primary">
                ${analytics.revenue.toLocaleString()}
              </p>
            </Card>
          </div>

          {/* Charts Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card padding="lg">
              <h3 className="text-lg font-varsity font-semibold text-text-primary mb-4">
                User Growth
              </h3>
              <div className="h-64 bg-primary-light/30 rounded-lg flex items-center justify-center">
                <p className="text-text-secondary">
                  Chart placeholder - integrate charting library
                </p>
              </div>
            </Card>

            <Card padding="lg">
              <h3 className="text-lg font-varsity font-semibold text-text-primary mb-4">
                Rental Activity
              </h3>
              <div className="h-64 bg-primary-light/30 rounded-lg flex items-center justify-center">
                <p className="text-text-secondary">
                  Chart placeholder - integrate charting library
                </p>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
