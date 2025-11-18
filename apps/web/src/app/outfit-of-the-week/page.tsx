'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../../components/auth';
import { Navbar, BottomNavigation, Card, Badge, Button } from '@eventfit/ui';
import { LeaderboardEntry } from '@eventfit/types';
import { Trophy, Calendar, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mockOutfits } from '../../lib/mockData';

/**
 * Outfit of the Week Page
 * Reference: Design Reference Analysis - Competition feed
 * Visual Requirements:
 * - Weekly competition feed
 * - Entry system
 * - Winner announcements
 */
export default function OutfitOfTheWeekPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [weekInfo, setWeekInfo] = useState({
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  useEffect(() => {
    // TODO: Fetch outfit of the week entries
    setTimeout(() => {
      // Generate entries from mock outfits
      const entries: LeaderboardEntry[] = mockOutfits
        .slice(0, 8)
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
      setEntries(entries);
      setCurrentWeek(format(new Date(), 'MMM d'));
      setLoading(false);
    }, 500);
  }, []);

  const daysRemaining = Math.ceil(
    (weekInfo.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="container mx-auto px-4 py-8 pb-24">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-varsity font-bold text-text-primary">
                Outfit of the Week
              </h1>
            </div>
            <p className="text-text-secondary mb-4">
              Compete for the top spot! Post your best outfits and see who wins.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-text-tertiary" />
                <span className="text-text-secondary">
                  Week of {format(weekInfo.startDate, 'MMM d')} -{' '}
                  {format(weekInfo.endDate, 'MMM d')}
                </span>
              </div>
              <Badge variant="primary">{daysRemaining} days left</Badge>
            </div>
          </div>

          {/* CTA */}
          <Card padding="lg" className="mb-8 text-center bg-primary-light">
            <Sparkles className="h-8 w-8 text-primary mx-auto mb-3" />
            <h2 className="text-xl font-varsity font-bold text-text-primary mb-2">
              Post Your Outfit to Compete
            </h2>
            <p className="text-text-secondary mb-4">
              Share your best looks and compete for Outfit of the Week!
            </p>
            <Button variant="primary" size="lg" onClick={() => router.push('/dashboard')}>
              Post Outfit
            </Button>
          </Card>

          {/* Leaderboard */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="animate-pulse h-32" />
              ))}
            </div>
          ) : entries.length === 0 ? (
            <Card padding="lg" className="text-center">
              <Trophy className="h-12 w-12 text-text-tertiary mx-auto mb-4" />
              <p className="text-text-secondary">No entries yet this week</p>
              <p className="text-sm text-text-tertiary mt-2">
                Be the first to post an outfit and compete!
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <Link key={entry.outfitId} href={`/outfit/${entry.outfitId}`}>
                  <Card hover className="flex items-center gap-4 p-4">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-12 flex items-center justify-center">
                      {entry.rank === 1 ? (
                        <Trophy className="h-8 w-8 text-accent" />
                      ) : (
                        <span className="text-2xl font-bold text-text-secondary">
                          #{entry.rank}
                        </span>
                      )}
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
                        <span className="font-semibold text-text-primary">{entry.userName}</span>
                        {entry.rank === 1 && (
                          <Badge variant="primary" className="text-xs">
                            Winner
                          </Badge>
                        )}
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
            <h3 className="font-semibold text-text-primary mb-2">How It Works</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>• Post outfits throughout the week</li>
              <li>• Get likes, rentals, comments, and shares</li>
              <li>• Top scoring outfit wins Outfit of the Week</li>
              <li>• Winners get featured on the leaderboard and receive badges</li>
              <li>• Leaderboard resets every Monday</li>
            </ul>
          </Card>
        </main>

        <BottomNavigation />
      </div>
    </ProtectedRoute>
  );
}
