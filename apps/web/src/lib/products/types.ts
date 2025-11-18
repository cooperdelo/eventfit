/**
 * Product aggregation types and interfaces
 */
import { Product, ProductSearchFilters, ProductSearchResult, Retailer } from '@eventfit/types';

export interface ProductAggregator {
  name: Retailer;
  search(filters: ProductSearchFilters): Promise<ProductSearchResult>;
  getProduct(productId: string): Promise<Product | null>;
  isAvailable(): boolean;
}

export interface AggregatorConfig {
  enabled: boolean;
  apiKey?: string;
  apiSecret?: string;
  associateTag?: string; // For Amazon
  rateLimit?: number; // Requests per second
}
