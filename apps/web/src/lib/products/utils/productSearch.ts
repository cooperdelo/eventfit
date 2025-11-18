/**
 * Product search utilities for integration with filter system
 */
import { ProductSearchFilters, Product } from '@eventfit/types';
import { getProductService } from '../services/productService';

/**
 * Search products based on filter criteria
 * Can be used with existing filter system
 */
export async function searchProductsByFilters(filters: {
  category?: string;
  eventType?: string;
  priceMin?: number;
  priceMax?: number;
  keywords?: string;
  limit?: number;
}): Promise<Product[]> {
  const productService = getProductService();

  const searchFilters: ProductSearchFilters = {
    category: filters.category as any,
    eventType: filters.eventType,
    priceMin: filters.priceMin,
    priceMax: filters.priceMax,
    keywords: filters.keywords,
    limit: filters.limit || 20,
  };

  const result = await productService.search(searchFilters);
  return result.products;
}

/**
 * Convert products to OutfitCardProps format for display
 */
export function productsToOutfitCards(products: Product[]): Array<{
  id: string;
  images: string[];
  title: string;
  price?: number;
  brand?: string;
  isRentable: boolean;
  productLinks?: Array<{
    url: string;
    retailer: string;
    price?: number;
    affiliateUrl?: string;
  }>;
  source: 'product-aggregation';
  owner: {
    name: string;
    avatar: string;
  };
}> {
  return products.map((product) => ({
    id: product.productId,
    images: product.images,
    title: product.title,
    price: product.price,
    brand: product.brand,
    isRentable: false,
    productLinks: [
      {
        url: product.productUrl,
        retailer: product.retailer,
        price: product.price,
        affiliateUrl: product.affiliateUrl,
      },
    ],
    source: 'product-aggregation' as const,
    owner: {
      name: product.retailer.charAt(0).toUpperCase() + product.retailer.slice(1),
      avatar: '/logo-icon.png', // Default avatar for system products
    },
  }));
}

/**
 * Map event type to product search keywords
 */
export function eventTypeToProductKeywords(eventType: string): string {
  const keywordMap: Record<string, string> = {
    formal: 'formal dress elegant evening',
    gameday: 'gameday outfit school spirit game day',
    concert: 'concert outfit edgy music festival',
    party: 'party dress fun celebration',
    'date-night': 'date night outfit romantic dinner',
  };
  return keywordMap[eventType.toLowerCase()] || eventType;
}
