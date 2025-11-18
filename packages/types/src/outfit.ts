/**
 * Outfit types matching database schema
 */
export interface Outfit {
  outfitId: string;
  ownerId: string;
  photo: string;
  images?: string[];
  description?: string;
  size?: string;
  sizes?: string[];
  price?: number;
  available: boolean;
  tags?: string[];
  rentable: boolean;
  eventIds?: string[];
  brand?: string;
  category?: 'dress' | 'top' | 'bottom' | 'accessory' | 'shoes' | 'other';
  visibility?: 'public' | 'friends' | 'org-only';
  createdAt: Date | string;
}

export interface OutfitCardProps {
  id: string;
  images: string[];
  title: string;
  price?: number;
  size?: string;
  brand?: string;
  isRentable: boolean;
  isLiked?: boolean;
  likesCount?: number;
  owner: {
    name: string;
    avatar: string;
    isStarRenter?: boolean;
  };
  onRent?: () => void;
  // Product links for inspiration items (non-rentable)
  productLinks?: Array<{
    url: string;
    retailer: string;
    price?: number;
    affiliateUrl?: string;
  }>;
  source?: 'user' | 'product-aggregation';
}
