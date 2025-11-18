/**
 * Main product service orchestrator
 * Coordinates multiple aggregators and provides unified interface
 */
import { Product, ProductSearchFilters, ProductSearchResult, Retailer } from '@eventfit/types';
import { ProductAggregator } from '../types';
import { AmazonAggregator } from '../aggregators/amazon';
import { eBayAggregator } from '../aggregators/ebay';

export class ProductService {
  private aggregators: Map<Retailer, ProductAggregator> = new Map();

  constructor() {
    // Initialize aggregators based on environment variables
    const amazonAggregator = new AmazonAggregator({
      enabled: !!process.env.NEXT_PUBLIC_AMAZON_ACCESS_KEY_ID,
      accessKeyId: process.env.NEXT_PUBLIC_AMAZON_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AMAZON_SECRET_ACCESS_KEY,
      associateTag: process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG,
    });

    const ebayAggregator = new eBayAggregator({
      enabled: !!process.env.NEXT_PUBLIC_EBAY_APP_ID,
      appId: process.env.NEXT_PUBLIC_EBAY_APP_ID,
    });

    if (amazonAggregator.isAvailable()) {
      this.aggregators.set('amazon', amazonAggregator);
    }

    if (ebayAggregator.isAvailable()) {
      this.aggregators.set('ebay', ebayAggregator);
    }
  }

  /**
   * Search products across all enabled aggregators
   */
  async search(filters: ProductSearchFilters): Promise<ProductSearchResult> {
    const enabledRetailers = filters.retailers || Array.from(this.aggregators.keys());

    // Search all enabled aggregators in parallel
    const searchPromises = enabledRetailers
      .map((retailer) => this.aggregators.get(retailer))
      .filter((aggregator): aggregator is ProductAggregator => aggregator !== undefined)
      .map((aggregator) => aggregator.search(filters));

    const results = await Promise.allSettled(searchPromises);

    // Combine results from all aggregators
    const allProducts: Product[] = [];
    let total = 0;
    let hasMore = false;

    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        allProducts.push(...result.value.products);
        total += result.value.total;
        hasMore = hasMore || result.value.hasMore;
      }
    });

    // Sort by relevance (you can add custom sorting logic)
    const sortedProducts = this.sortProducts(allProducts, filters);

    // Apply limit and offset
    const limit = filters.limit || 20;
    const offset = filters.offset || 0;
    const paginatedProducts = sortedProducts.slice(offset, offset + limit);

    return {
      products: paginatedProducts,
      total,
      hasMore: offset + paginatedProducts.length < sortedProducts.length,
    };
  }

  /**
   * Get a single product by ID
   */
  async getProduct(productId: string, retailer?: Retailer): Promise<Product | null> {
    if (retailer) {
      const aggregator = this.aggregators.get(retailer);
      if (aggregator) {
        return aggregator.getProduct(productId);
      }
      return null;
    }

    // Try all aggregators until we find the product
    for (const aggregator of this.aggregators.values()) {
      const product = await aggregator.getProduct(productId);
      if (product) {
        return product;
      }
    }

    return null;
  }

  /**
   * Get available retailers
   */
  getAvailableRetailers(): Retailer[] {
    return Array.from(this.aggregators.keys());
  }

  /**
   * Check if a retailer is available
   */
  isRetailerAvailable(retailer: Retailer): boolean {
    return this.aggregators.has(retailer) && this.aggregators.get(retailer)?.isAvailable() === true;
  }

  /**
   * Sort products by relevance
   */
  private sortProducts(products: Product[], filters: ProductSearchFilters): Product[] {
    return products.sort((a, b) => {
      // Prioritize in-stock items
      if (a.availability === 'in-stock' && b.availability !== 'in-stock') return -1;
      if (b.availability === 'in-stock' && a.availability !== 'in-stock') return 1;

      // Sort by price if price range is specified
      if (filters.priceMin || filters.priceMax) {
        return a.price - b.price;
      }

      // Default: sort by price ascending
      return a.price - b.price;
    });
  }
}

// Singleton instance
let productServiceInstance: ProductService | null = null;

export function getProductService(): ProductService {
  if (!productServiceInstance) {
    productServiceInstance = new ProductService();
  }
  return productServiceInstance;
}
