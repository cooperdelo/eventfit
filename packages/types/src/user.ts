/**
 * User types matching database schema
 */
export interface User {
  userId: string;
  name: string;
  email: string;
  school: string;
  bio?: string;
  profilePhoto?: string;
  affiliation?: 'sorority' | 'club' | 'other';
  closet?: string[]; // Array of outfit IDs
  trustScore?: number;
  createdAt: Date | string;
  preferences?: {
    campus?: string;
    radiusMiles?: number;
  };
}

export interface UserProfile extends User {
  stats?: {
    totalRentals: number;
    itemsListed: number;
    followers: number;
    following: number;
  };
}
