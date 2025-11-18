'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../../components/auth';
import { Navbar, Card, Button } from '@eventfit/ui';
import {
  Users,
  Calendar,
  ShoppingBag,
  AlertTriangle,
  BarChart3,
  Settings,
  Package,
} from 'lucide-react';
import Link from 'next/link';

/**
 * Admin Dashboard Overview Page
 * Reference: Admin spec - Dashboard Home / Overview
 * Visual Requirements:
 * - Key metrics cards
 * - Quick action buttons
 * - Clean, organized layout
 */
export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    verifiedUsers: 0,
    activeEvents: 0,
    rentalsInProgress: 0,
    pendingEventApprovals: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch metrics from API
    // Mock data for now
    setTimeout(() => {
      setMetrics({
        totalUsers: 1247,
        verifiedUsers: 1189,
        activeEvents: 23,
        rentalsInProgress: 45,
        pendingEventApprovals: 3,
      });
      setLoading(false);
    }, 500);
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8 pb-24">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-varsity font-bold text-text-primary mb-2">
                Admin Dashboard
              </h1>
              <p className="text-text-secondary">Manage EventFit platform operations</p>
            </div>
            <Link href="/admin/settings">
              <Button variant="outline" size="md">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card padding="lg" hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Total Users</p>
                  <p className="text-3xl font-varsity font-bold text-text-primary">
                    {loading ? '...' : metrics.totalUsers.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card padding="lg" hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Verified Users</p>
                  <p className="text-3xl font-varsity font-bold text-text-primary">
                    {loading ? '...' : metrics.verifiedUsers.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card padding="lg" hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Active Events</p>
                  <p className="text-3xl font-varsity font-bold text-text-primary">
                    {loading ? '...' : metrics.activeEvents}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card padding="lg" hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Rentals in Progress</p>
                  <p className="text-3xl font-varsity font-bold text-text-primary">
                    {loading ? '...' : metrics.rentalsInProgress}
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-accent" />
                </div>
              </div>
            </Card>

            <Card padding="lg" hover className="border-l-4 border-l-accent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Pending Approvals</p>
                  <p className="text-3xl font-varsity font-bold text-accent">
                    {loading ? '...' : metrics.pendingEventApprovals}
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-accent" />
                </div>
              </div>
            </Card>

            <Card padding="lg" hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Analytics</p>
                  <p className="text-sm font-medium text-text-primary">View Reports</p>
                </div>
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/admin/users">
              <Card padding="lg" hover className="text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-text-primary">User Management</h3>
                <p className="text-sm text-text-secondary mt-1">Manage users and verification</p>
              </Card>
            </Link>

            <Link href="/admin/events">
              <Card padding="lg" hover className="text-center">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-text-primary">Event Management</h3>
                <p className="text-sm text-text-secondary mt-1">Approve and manage events</p>
              </Card>
            </Link>

            <Link href="/admin/rentals">
              <Card padding="lg" hover className="text-center">
                <ShoppingBag className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-text-primary">Rental Oversight</h3>
                <p className="text-sm text-text-secondary mt-1">Track rentals and disputes</p>
              </Card>
            </Link>

            <Link href="/admin/analytics">
              <Card padding="lg" hover className="text-center">
                <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-text-primary">Analytics</h3>
                <p className="text-sm text-text-secondary mt-1">View platform insights</p>
              </Card>
            </Link>

            <Link href="/admin/products">
              <Card padding="lg" hover className="text-center">
                <Package className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-text-primary">Product Import</h3>
                <p className="text-sm text-text-secondary mt-1">Import products from retailers</p>
              </Card>
            </Link>

            <Link href="/admin/content">
              <Card padding="lg" hover className="text-center">
                <AlertTriangle className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-text-primary">Content Moderation</h3>
                <p className="text-sm text-text-secondary mt-1">Review reported content</p>
              </Card>
            </Link>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
