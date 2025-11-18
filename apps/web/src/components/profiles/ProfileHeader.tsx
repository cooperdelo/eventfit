'use client';

import React from 'react';
import Image from 'next/image';
import { Avatar, Button } from '@eventfit/ui';
import { UserProfile, Badge } from '@eventfit/types';
import { Edit2, MapPin, GraduationCap, Users } from 'lucide-react';
import { BadgeDisplay } from '../badges';

/**
 * ProfileHeader component
 * Reference: Reference 5 (Instagram Settings) - Profile section
 * Visual Requirements:
 * - Circular profile picture (120px)
 * - Name, Org/Sorority, School, Bio
 * - Edit Profile button
 * - Stats: Total Rentals, Items Listed, Followers
 */
export interface ProfileHeaderProps {
  profile: UserProfile;
  badges?: Badge[];
  isOwnProfile?: boolean;
  onEditProfile?: () => void;
  onFollow?: () => void;
  isFollowing?: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  badges = [],
  isOwnProfile = false,
  onEditProfile,
  onFollow,
  isFollowing = false,
}) => {
  const stats = profile.stats || {
    totalRentals: 0,
    itemsListed: 0,
    followers: 0,
    following: 0,
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          <Avatar src={profile.profilePhoto} alt={profile.name} size="xl" className="w-32 h-32" />
          {isOwnProfile && (
            <button
              onClick={onEditProfile}
              className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-[#003d32] transition-colors"
              aria-label="Edit profile picture"
            >
              <Edit2 className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
                {profile.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                {profile.school && (
                  <div className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    <span>{profile.school}</span>
                  </div>
                )}
                {profile.affiliation && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span className="capitalize">{profile.affiliation}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            {isOwnProfile ? (
              <Button variant="outline" size="md" onClick={onEditProfile}>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <Button variant={isFollowing ? 'secondary' : 'primary'} size="md" onClick={onFollow}>
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            )}
          </div>

          {/* Bio */}
          {profile.bio && <p className="text-text-secondary mb-4 max-w-2xl">{profile.bio}</p>}

          {/* Badges */}
          {badges.length > 0 && (
            <div className="mb-4">
              <BadgeDisplay badges={badges} size="md" showTooltip />
            </div>
          )}

          {/* Stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-xl font-bold text-text-primary">{stats.itemsListed}</div>
              <div className="text-xs text-text-secondary">Items Listed</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-text-primary">{stats.totalRentals}</div>
              <div className="text-xs text-text-secondary">Rentals</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-text-primary">{stats.followers}</div>
              <div className="text-xs text-text-secondary">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-text-primary">{stats.following}</div>
              <div className="text-xs text-text-secondary">Following</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
