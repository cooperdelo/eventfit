/**
 * Gamification types
 */
export interface LeaderboardEntry {
  outfitId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  outfitTitle: string;
  outfitImage: string;
  score: number;
  likes: number;
  rentals: number;
  comments: number;
  shares: number;
  rank: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Icon name or URL
  category: 'engagement' | 'rental' | 'social' | 'achievement';
  unlockedAt?: Date | string;
}

export type BadgeType =
  | 'style_mvp' // Top 10%
  | 'trendsetter' // Top 25%
  | 'most_rented' // 10+ rentals
  | 'top_poster' // 50+ posts
  | 'early_adopter' // First 100 users
  | 'star_renter'; // Top renter

export interface WeeklyLeaderboard {
  week: string; // ISO week string
  startDate: Date | string;
  endDate: Date | string;
  entries: LeaderboardEntry[];
  category: 'top_liked' | 'most_rented' | 'new_entries';
}
