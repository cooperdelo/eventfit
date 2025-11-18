/**
 * Product types for aggregated product data
 */

export type Retailer = 'amazon' | 'ebay' | 'etsy' | 'walmart' | 'manual' | 'other';

export type ProductAvailability = 'in-stock' | 'out-of-stock' | 'pre-order' | 'unknown';

export interface Product {
  productId: string;
  title: string;
  description?: string;
  images: string[];
  price: number;
  currency: string;
  retailer: Retailer;
  productUrl: string;
  affiliateUrl?: string; // For tracking affiliate links
  availability: ProductAvailability;
  brand?: string;
  category: 'dress' | 'top' | 'bottom' | 'accessory' | 'shoes' | 'other';
  sizes?: string[];
  colors?: string[];
  tags?: string[];
  eventTypes?: string[]; // Auto-tagged event types (e.g., 'formal', 'gameday')
  sourceId?: string; // Original product ID from source API
  importedAt: Date | string;
  lastUpdated?: Date | string;
}

export interface ProductSearchFilters {
  category?: 'dress' | 'top' | 'bottom' | 'accessory' | 'shoes' | 'other';
  eventType?: string;
  size?: string;
  priceMin?: number;
  priceMax?: number;
  brand?: string;
  color?: string;
  retailers?: Retailer[];
  keywords?: string;
  limit?: number;
  offset?: number;
}

export interface ProductSearchResult {
  products: Product[];
  total: number;
  hasMore: boolean;
}

export interface InspirationOutfit {
  outfitId: string;
  ownerId: string; // 'system' for aggregated products
  source: 'product-aggregation';
  photo: string; // Primary product image
  images: string[];
  description?: string;
  products: Product[]; // Multiple product options for this outfit
  primaryProduct?: Product; // Main product shown
  category: 'dress' | 'top' | 'bottom' | 'accessory' | 'shoes' | 'other';
  eventIds?: string[];
  eventTypes: string[]; // Auto-tagged events
  tags?: string[];
  rentable: false; // Always false for inspiration items
  visibility: 'public';
  createdAt: Date | string;
}
