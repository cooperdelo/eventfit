'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../../../components/auth';
import { Navbar, Card, Button, Input, Avatar, Badge } from '@eventfit/ui';
import { Search, CheckCircle, XCircle, Ban, Edit } from 'lucide-react';
import Link from 'next/link';

/**
 * Admin User Management Page
 * Reference: Admin spec - User Management
 * Visual Requirements:
 * - User list table
 * - Search/filter functionality
 * - Action buttons
 */
interface User {
  id: string;
  name: string;
  email: string;
  school: string;
  verified: boolean;
  role: string;
  profilePhoto?: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // TODO: Fetch users from API
    const mockUsers: User[] = [
      {
        id: 'user_1',
        name: 'Sarah Johnson',
        email: 'sarah.j@unc.edu',
        school: 'UNC Chapel Hill',
        verified: true,
        role: 'user',
        profilePhoto: 'https://via.placeholder.com/40',
      },
      {
        id: 'user_2',
        name: 'Emma Davis',
        email: 'emma.d@unc.edu',
        school: 'UNC Chapel Hill',
        verified: false,
        role: 'user',
        profilePhoto: 'https://via.placeholder.com/40',
      },
    ];
    setUsers(mockUsers);
    setLoading(false);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.school.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <h1 className="text-2xl font-varsity font-bold text-text-primary">User Management</h1>
            </div>
          </div>

          {/* Search */}
          <Card padding="md" className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-tertiary" />
              <Input
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by name, email, or school..."
                className="pl-10"
              />
            </div>
          </Card>

          {/* User List */}
          <Card padding="none">
            {loading ? (
              <div className="p-8 text-center">
                <p className="text-text-secondary">Loading users...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-text-secondary">No users found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary-light border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                        School
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-text-primary uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-surface divide-y divide-border">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-primary-light/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <Avatar src={user.profilePhoto} alt={user.name} size="sm" />
                            <div>
                              <div className="font-medium text-text-primary">{user.name}</div>
                              <div className="text-sm text-text-secondary">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                          {user.school}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.verified ? (
                            <Badge variant="success" size="sm">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="warning" size="sm">
                              <XCircle className="h-3 w-3 mr-1" />
                              Unverified
                            </Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                          {user.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm" aria-label="Edit user">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" aria-label="Ban user">
                              <Ban className="h-4 w-4 text-error" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  );
}
