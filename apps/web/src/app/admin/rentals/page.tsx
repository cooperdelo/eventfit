'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../../../components/auth';
import { Navbar, Card, Button, Badge, Avatar } from '@eventfit/ui';
import { Search, CheckCircle, AlertTriangle, DollarSign, Clock } from 'lucide-react';
import Link from 'next/link';

/**
 * Admin Rental Oversight Page
 * Reference: Admin spec - Rental Oversight
 * Visual Requirements:
 * - Rentals table
 * - Filters for status
 * - Action buttons
 */
interface Rental {
  id: string;
  itemName: string;
  renter: { name: string; avatar?: string };
  lender: { name: string; avatar?: string };
  status: 'pending' | 'shipped' | 'delivered' | 'returned' | 'overdue' | 'disputed';
  amount: number;
  startDate: string;
  endDate: string;
}

export default function AdminRentalsPage() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'overdue' | 'disputed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // TODO: Fetch rentals from API
    const mockRentals: Rental[] = [
      {
        id: 'rental_1',
        itemName: 'Formal Night Look',
        renter: { name: 'Sarah Johnson', avatar: 'https://via.placeholder.com/40' },
        lender: { name: 'Emma Davis', avatar: 'https://via.placeholder.com/40' },
        status: 'delivered',
        amount: 45,
        startDate: '2024-12-10',
        endDate: '2024-12-15',
      },
      {
        id: 'rental_2',
        itemName: 'Gameday Outfit',
        renter: { name: 'John Smith', avatar: 'https://via.placeholder.com/40' },
        lender: { name: 'Sarah Johnson', avatar: 'https://via.placeholder.com/40' },
        status: 'overdue',
        amount: 30,
        startDate: '2024-12-01',
        endDate: '2024-12-05',
      },
    ];
    setRentals(mockRentals);
    setLoading(false);
  }, []);

  const filteredRentals = rentals.filter((rental) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'pending' && rental.status === 'pending') ||
      (filter === 'overdue' && rental.status === 'overdue') ||
      (filter === 'disputed' && rental.status === 'disputed');
    const matchesSearch =
      rental.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rental.renter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rental.lender.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: Rental['status']) => {
    const variants = {
      pending: { variant: 'warning' as const, label: 'Pending' },
      shipped: { variant: 'primary' as const, label: 'Shipped' },
      delivered: { variant: 'primary' as const, label: 'Delivered' },
      returned: { variant: 'success' as const, label: 'Returned' },
      overdue: { variant: 'error' as const, label: 'Overdue' },
      disputed: { variant: 'error' as const, label: 'Disputed' },
    };
    return variants[status];
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
                Rental Oversight
              </h1>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex gap-2 flex-1">
              <Button
                variant={filter === 'all' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'pending' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilter('pending')}
              >
                Pending Returns
              </Button>
              <Button
                variant={filter === 'overdue' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilter('overdue')}
              >
                Overdue
              </Button>
              <Button
                variant={filter === 'disputed' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilter('disputed')}
              >
                Disputed
              </Button>
            </div>
            <div className="relative flex-1 md:max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-tertiary" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rentals..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Rentals List */}
          {loading ? (
            <Card padding="lg">
              <p className="text-text-secondary text-center">Loading rentals...</p>
            </Card>
          ) : filteredRentals.length === 0 ? (
            <Card padding="lg">
              <p className="text-text-secondary text-center">No rentals found</p>
            </Card>
          ) : (
            <Card padding="none">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary-light border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase">
                        Item
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase">
                        Renter
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase">
                        Lender
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase">
                        Dates
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-text-primary uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredRentals.map((rental) => {
                      const statusBadge = getStatusBadge(rental.status);
                      return (
                        <tr key={rental.id} className="hover:bg-primary-light/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-medium text-text-primary">{rental.itemName}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Avatar
                                src={rental.renter.avatar}
                                alt={rental.renter.name}
                                size="sm"
                              />
                              <span className="text-sm text-text-secondary">
                                {rental.renter.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Avatar
                                src={rental.lender.avatar}
                                alt={rental.lender.name}
                                size="sm"
                              />
                              <span className="text-sm text-text-secondary">
                                {rental.lender.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant={statusBadge.variant} size="sm">
                              {statusBadge.label}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1 text-sm font-medium text-text-primary">
                              <DollarSign className="h-4 w-4" />
                              {rental.amount}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-text-secondary">
                              <div>{new Date(rental.startDate).toLocaleDateString()}</div>
                              <div className="text-xs text-text-tertiary">
                                to {new Date(rental.endDate).toLocaleDateString()}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {rental.status === 'overdue' && (
                                <Button variant="outline" size="sm">
                                  <Clock className="h-4 w-4 mr-1" />
                                  Issue Penalty
                                </Button>
                              )}
                              {rental.status === 'disputed' && (
                                <Button variant="primary" size="sm">
                                  <AlertTriangle className="h-4 w-4 mr-1" />
                                  Resolve
                                </Button>
                              )}
                              {rental.status === 'delivered' && (
                                <Button variant="primary" size="sm">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Mark Returned
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
