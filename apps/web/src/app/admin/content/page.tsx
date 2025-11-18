'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../../../components/auth';
import { Navbar, Card, Button, Avatar, Badge } from '@eventfit/ui';
import { Eye, XCircle, CheckCircle, AlertTriangle, Ban } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Admin Content Moderation Page
 * Reference: Admin spec - Content Moderation
 * Visual Requirements:
 * - Reported content feed
 * - Post preview
 * - Action buttons
 */
interface ReportedContent {
  id: string;
  type: 'outfit' | 'event' | 'comment';
  content: {
    image?: string;
    title: string;
    description?: string;
  };
  author: {
    name: string;
    avatar?: string;
    email: string;
  };
  reportReason: string;
  reportedBy: string;
  status: 'pending' | 'approved' | 'removed';
  timestamp: string;
}

export default function AdminContentPage() {
  const [reports, setReports] = useState<ReportedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'removed'>('pending');

  useEffect(() => {
    // TODO: Fetch reported content from API
    const mockReports: ReportedContent[] = [
      {
        id: 'report_1',
        type: 'outfit',
        content: {
          image: 'https://via.placeholder.com/400x500',
          title: 'Formal Night Look',
          description: 'Perfect for formal events',
        },
        author: {
          name: 'Sarah Johnson',
          avatar: 'https://via.placeholder.com/40',
          email: 'sarah.j@unc.edu',
        },
        reportReason: 'Inappropriate content',
        reportedBy: 'User123',
        status: 'pending',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
    ];
    setReports(mockReports);
    setLoading(false);
  }, []);

  const filteredReports =
    filter === 'all' ? reports : reports.filter((report) => report.status === filter);

  const handleApprove = (id: string) => {
    setReports((prev) =>
      prev.map((report) => (report.id === id ? { ...report, status: 'approved' as const } : report))
    );
    // TODO: Call API
  };

  const handleRemove = (id: string) => {
    setReports((prev) =>
      prev.map((report) => (report.id === id ? { ...report, status: 'removed' as const } : report))
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
                Content Moderation
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
              All Reports
            </Button>
            <Button
              variant={filter === 'pending' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilter('pending')}
            >
              Pending Review
            </Button>
            <Button
              variant={filter === 'removed' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilter('removed')}
            >
              Removed
            </Button>
          </div>

          {/* Reports List */}
          {loading ? (
            <Card padding="lg">
              <p className="text-text-secondary text-center">Loading reports...</p>
            </Card>
          ) : filteredReports.length === 0 ? (
            <Card padding="lg">
              <p className="text-text-secondary text-center">No reports found</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <Card key={report.id} padding="none" hover>
                  <div className="flex flex-col md:flex-row">
                    {/* Image Preview */}
                    {report.content.image && (
                      <div className="relative w-full md:w-48 h-48 md:h-auto">
                        <Image
                          src={report.content.image}
                          alt={report.content.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 192px"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant={report.type === 'outfit' ? 'primary' : 'default'}
                              size="sm"
                            >
                              {report.type}
                            </Badge>
                            <Badge
                              variant={
                                report.status === 'pending'
                                  ? 'warning'
                                  : report.status === 'removed'
                                    ? 'error'
                                    : 'success'
                              }
                              size="sm"
                            >
                              {report.status}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-varsity font-bold text-text-primary mb-1">
                            {report.content.title}
                          </h3>
                          {report.content.description && (
                            <p className="text-sm text-text-secondary mb-2">
                              {report.content.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar src={report.author.avatar} alt={report.author.name} size="sm" />
                        <div>
                          <div className="text-sm font-medium text-text-primary">
                            {report.author.name}
                          </div>
                          <div className="text-xs text-text-secondary">{report.author.email}</div>
                        </div>
                      </div>

                      {/* Report Details */}
                      <div className="bg-primary-light/30 rounded-lg p-3 mb-4">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-text-primary mb-1">
                              Reported by: {report.reportedBy}
                            </p>
                            <p className="text-sm text-text-secondary">
                              Reason: {report.reportReason}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      {report.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleApprove(report.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleRemove(report.id)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Full Post
                          </Button>
                          <Button variant="outline" size="sm">
                            <Ban className="h-4 w-4 mr-2 text-error" />
                            Warn User
                          </Button>
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
