/**
 * Event types matching database schema and API responses
 */
export interface Event {
  eventId: string;
  title: string;
  description?: string;
  theme?: string;
  date: Date | string;
  type: 'public' | 'private';
  creatorId: string;
  organization?: string;
  coverPhoto?: string;
  doorlistCoverPhoto?: string;
  images?: string[]; // DoorList images first
  location?: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  campus?: string;
  distanceMiles?: number;
  tags?: string[];
  hasRentals?: boolean;
  attendees?: string[];
  outfits?: string[];
  chatId?: string;
  status?: 'pending' | 'approved' | 'rejected';
}

export interface EventCardProps {
  id: string;
  title: string;
  doorlistCoverPhoto?: string;
  coverPhoto: string;
  startAt: string; // ISO date
  campus: string;
  distanceMiles?: number;
  tags?: string[];
  hasRentals?: boolean;
  organizer?: {
    name: string;
    avatar?: string;
  };
}
