/**
 * Base aggregator interface and utilities
 */
import { Product, ProductSearchFilters, ProductSearchResult, Retailer } from '@eventfit/types';
import { ProductAggregator } from '../types';

export abstract class BaseAggregator implements ProductAggregator {
  abstract name: Retailer;
  protected config: { enabled: boolean; rateLimit?: number };
  private lastRequestTime: number = 0;

  constructor(config: { enabled: boolean; rateLimit?: number }) {
    this.config = config;
  }

  abstract search(filters: ProductSearchFilters): Promise<ProductSearchResult>;
  abstract getProduct(productId: string): Promise<Product | null>;

  isAvailable(): boolean {
    return this.config.enabled;
  }

  /**
   * Rate limiting helper
   */
  protected async rateLimit(): Promise<void> {
    if (!this.config.rateLimit) return;

    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    const minInterval = 1000 / this.config.rateLimit; // milliseconds between requests

    if (timeSinceLastRequest < minInterval) {
      await new Promise((resolve) => setTimeout(resolve, minInterval - timeSinceLastRequest));
    }

    this.lastRequestTime = Date.now();
  }

  /**
   * Map external product data to our Product format
   */
  protected abstract mapToProduct(data: any): Product;

  /**
   * Build search keywords from filters
   */
  protected buildSearchKeywords(filters: ProductSearchFilters): string {
    const keywords: string[] = [];

    if (filters.keywords) {
      keywords.push(filters.keywords);
    }

    if (filters.category) {
      keywords.push(filters.category);
    }

    if (filters.eventType) {
      // Map event types to fashion keywords
      const eventKeywords: Record<string, string> = {
        formal: 'formal dress elegant',
        gameday: 'gameday outfit school spirit',
        concert: 'concert outfit edgy',
        party: 'party dress fun',
        'date-night': 'date night outfit romantic',
      };
      keywords.push(eventKeywords[filters.eventType] || filters.eventType);
    }

    if (filters.brand) {
      keywords.push(filters.brand);
    }

    if (filters.color) {
      keywords.push(filters.color);
    }

    return keywords.join(' ');
  }
}
