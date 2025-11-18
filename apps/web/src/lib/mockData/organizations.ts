/**
 * Mock Organization Data
 */
import { Organization } from '@eventfit/types';

export const mockOrganizations: Organization[] = [
  {
    id: 'org_alpha_delta_pi',
    name: 'Alpha Delta Pi',
    type: 'Sorority',
    description: 'A sisterhood dedicated to academic excellence, leadership, and service.',
    bannerUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=300&fit=crop',
    logoUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop',
    privacy: 'private',
    campus: 'UNC Chapel Hill',
    createdAt: new Date().toISOString(),
    createdBy: 'user-1',
    memberCount: 45,
    eventCount: 8,
    status: 'approved',
  },
  {
    id: 'org_fashion_society',
    name: 'Fashion Society',
    type: 'Cultural Club',
    description: 'Exploring fashion, style, and sustainable clothing practices.',
    bannerUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=300&fit=crop',
    logoUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
    privacy: 'public',
    campus: 'UNC Chapel Hill',
    createdAt: new Date().toISOString(),
    createdBy: 'user-2',
    memberCount: 32,
    eventCount: 5,
    status: 'approved',
  },
  {
    id: 'org_student_gov',
    name: 'Student Government',
    type: 'Student Government',
    description: 'Representing student interests and organizing campus events.',
    bannerUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=300&fit=crop',
    logoUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop',
    privacy: 'public',
    campus: 'UNC Chapel Hill',
    createdAt: new Date().toISOString(),
    createdBy: 'user-3',
    memberCount: 28,
    eventCount: 12,
    status: 'approved',
  },
];
