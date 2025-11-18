/**
 * Organization types for private groups (Sororities, Fraternities, Clubs, etc.)
 */
export type OrganizationType =
  | 'Sorority'
  | 'Fraternity'
  | 'Academic Club'
  | 'Cultural Club'
  | 'Social Club'
  | 'Sports Team'
  | 'Student Government'
  | 'Honor Society'
  | 'Professional Organization'
  | 'Religious Organization'
  | 'Service Organization'
  | 'Other';

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  customType?: string; // If type is "Other"
  description?: string;
  bannerUrl?: string;
  logoUrl?: string;
  privacy: 'public' | 'private';
  campus: string;
  createdAt: Date | string;
  createdBy: string; // User ID
  memberCount: number;
  eventCount: number;
  status: 'pending' | 'approved' | 'rejected'; // Admin approval status
}

export interface OrganizationMember {
  userId: string;
  orgId: string;
  role: 'admin' | 'member';
  status: 'pending' | 'approved' | 'rejected';
  joinedAt: Date | string;
  invitedBy?: string; // User ID who invited
}

export interface OrganizationInvitation {
  id: string;
  orgId: string;
  email: string;
  invitedBy: string; // User ID
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date | string;
  expiresAt: Date | string;
}
