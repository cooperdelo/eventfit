'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../../components/auth';
import { Navbar, BottomNavigation, Card, Avatar, Badge, Button } from '@eventfit/ui';
import { LeaderboardEntry, WeeklyLeaderboard } from '@eventfit/types';
import { Trophy, TrendingUp, Star, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Gamification Leaderboard Page
 * Reference: Design Reference Analysis - Clean leaderboard design
 * Algorithm: Score = (Likes×1) + (Rentals×3) + (Comments×0.5) + (Shares×2)
 */
type LeaderboardCategory = 'top_liked' | 'most_rented' | 'new_entries';

export default function LeaderboardPage() {
  const [category, setCategory] = useState<LeaderboardCategory>('top_liked');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState('');

  useEffect(() => {
    // TODO: Fetch leaderboard data
    setTimeout(() => {
      // Generate leaderboard from mock outfits
      const entries: LeaderboardEntry[] = mockOutfits
        .slice(0, 10)
        .map((outfit, index) => {
          const score =
            (outfit.likesCount || 0) * 1 +
            (outfit.isRentable ? 3 : 0) * 3 +
            Math.floor((outfit.likesCount || 0) / 3) * 0.5 +
            Math.floor((outfit.likesCount || 0) / 8) * 2;
          return {
            outfitId: outfit.id,
            userId: outfit.owner.name.toLowerCase().replace(' ', '-'),
            userName: outfit.owner.name,
            userAvatar: outfit.owner.avatar,
            outfitTitle: outfit.title,
            outfitImage: outfit.images[0],
            score: Math.round(score),
            likes: outfit.likesCount || 0,
            rentals: outfit.isRentable ? Math.floor((outfit.likesCount || 0) / 5) : 0,
            comments: Math.floor((outfit.likesCount || 0) / 3),
            shares: Math.floor((outfit.likesCount || 0) / 8),
            rank: index + 1,
          };
        })
        .sort((a, b) => b.score - a.score)
        .map((entry, index) => ({
          ...entry,
          rank: index + 1,
        }));
      setLeaderboard(entries);
      setCurrentWeek(format(new Date(), 'MMM d'));
      setLoading(false);
    }, 500);
  }, [category]);

  const categories = [
    { id: 'top_liked' as LeaderboardCategory, label: 'Top Liked', icon: TrendingUp },
    { id: 'most_rented' as LeaderboardCategory, label: 'Most Rented', icon: Star },
    { id: 'new_entries' as LeaderboardCategory, label: 'New Entries', icon: Calendar },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-accent" />;
    if (rank === 2) return <Trophy className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Trophy className="h-4 w-4 text-amber-600" />;
    return <span className="text-lg font-bold text-text-secondary">#{rank}</span>;
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar
          links={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Events', href: '/events' },
            { label: 'Inspiration', href: '/inspiration' },
            { label: 'Search', href: '/search' },
            { label: 'Leaderboard', href: '/leaderboard' },
          ]}
        />

        <main className="container mx-auto px-4 py-8 pb-24">
          <div className="mb-8">
            <h1 className="text-3xl font-varsity font-bold text-text-primary mb-2">
              Weekly Leaderboard
            </h1>
            <p className="text-text-secondary">Top outfits this week • Resets every Monday</p>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    category === cat.id
                      ? 'bg-primary text-white'
                      : 'bg-filter-default text-text-secondary hover:bg-filter-active'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Leaderboard */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="animate-pulse h-24" />
              ))}
            </div>
          ) : leaderboard.length === 0 ? (
            <Card padding="lg" className="text-center">
              <Trophy className="h-12 w-12 text-text-tertiary mx-auto mb-4" />
              <p className="text-text-secondary">No entries yet this week</p>
              <p className="text-sm text-text-tertiary mt-2">
                Be the first to post an outfit and compete!
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {leaderboard.map((entry) => (
                <Link key={entry.outfitId} href={`/outfit/${entry.outfitId}`}>
                  <Card hover className="flex items-center gap-4 p-4">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-12 flex items-center justify-center">
                      {getRankIcon(entry.rank)}
                    </div>

                    {/* Outfit Image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={entry.outfitImage}
                        alt={entry.outfitTitle}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Entry Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar src={entry.userAvatar} alt={entry.userName} size="sm" />
                        <span className="font-semibold text-text-primary">{entry.userName}</span>
                      </div>
                      <h3 className="font-medium text-text-primary line-clamp-1 mb-1">
                        {entry.outfitTitle}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-text-secondary">
                        <span>{entry.likes} likes</span>
                        <span>{entry.rentals} rentals</span>
                        <span>{entry.comments} comments</span>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="flex-shrink-0 text-right">
                      <div className="text-2xl font-bold text-primary">{entry.score}</div>
                      <div className="text-xs text-text-tertiary">points</div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* Info Card */}
          <Card className="mt-8" padding="md">
            <div className="flex items-start gap-3">
              <Trophy className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-text-primary mb-1">How Scoring Works</h3>
                <p className="text-sm text-text-secondary">
                  Score = (Likes × 1) + (Rentals × 3) + (Comments × 0.5) + (Shares × 2)
                </p>
                <p className="text-xs text-text-tertiary mt-2">
                  Leaderboard resets every Monday at 12:00 AM
                </p>
              </div>
            </div>
          </Card>
        </main>

        <BottomNavigation />
      </div>
    </ProtectedRoute>
  );
}
