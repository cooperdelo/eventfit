/**
 * Amazon Product Advertising API aggregator
 *
 * Setup Instructions:
 * 1. Sign up for Amazon Associates: https://affiliate-program.amazon.com/
 * 2. Apply for Product Advertising API access
 * 3. Get Access Key ID and Secret Access Key
 * 4. Set environment variables:
 *    - AMAZON_ACCESS_KEY_ID
 *    - AMAZON_SECRET_ACCESS_KEY
 *    - AMAZON_ASSOCIATE_TAG
 *    - AMAZON_REGION (e.g., 'us-east-1')
 */
import { Product, ProductSearchFilters, ProductSearchResult, Retailer } from '@eventfit/types';
import { BaseAggregator } from './base';

export class AmazonAggregator extends BaseAggregator {
  name: Retailer = 'amazon';
  private accessKeyId?: string;
  private secretAccessKey?: string;
  private associateTag?: string;
  private region: string = 'us-east-1';

  constructor(config: {
    enabled: boolean;
    accessKeyId?: string;
    secretAccessKey?: string;
    associateTag?: string;
    region?: string;
  }) {
    super({ enabled: config.enabled, rateLimit: 1 }); // Amazon allows 1 req/sec
    this.accessKeyId = config.accessKeyId || process.env.NEXT_PUBLIC_AMAZON_ACCESS_KEY_ID;
    this.secretAccessKey =
      config.secretAccessKey || process.env.NEXT_PUBLIC_AMAZON_SECRET_ACCESS_KEY;
    this.associateTag = config.associateTag || process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG;
    this.region = config.region || process.env.NEXT_PUBLIC_AMAZON_REGION || 'us-east-1';
  }

  async search(filters: ProductSearchFilters): Promise<ProductSearchResult> {
    if (!this.isAvailable() || !this.accessKeyId || !this.secretAccessKey) {
      return { products: [], total: 0, hasMore: false };
    }

    await this.rateLimit();

    try {
      // Note: Amazon PA-API requires server-side implementation due to CORS
      // This is a client-side stub - actual implementation should be in API route
      const response = await fetch('/api/products/amazon/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters),
      });

      if (!response.ok) {
        throw new Error(`Amazon API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        products: data.products.map((p: any) => this.mapToProduct(p)),
        total: data.total || 0,
        hasMore: data.hasMore || false,
      };
    } catch (error) {
      console.error('Amazon search error:', error);
      return { products: [], total: 0, hasMore: false };
    }
  }

  async getProduct(productId: string): Promise<Product | null> {
    if (!this.isAvailable() || !this.accessKeyId || !this.secretAccessKey) {
      return null;
    }

    await this.rateLimit();

    try {
      const response = await fetch(`/api/products/amazon/${productId}`);

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return this.mapToProduct(data);
    } catch (error) {
      console.error('Amazon getProduct error:', error);
      return null;
    }
  }

  protected mapToProduct(data: any): Product {
    // Map Amazon PA-API response to our Product format
    const images = data.Images?.Primary?.Large?.URL
      ? [data.Images.Primary.Large.URL]
      : data.Images?.Variants?.map((v: any) => v.Large?.URL).filter(Boolean) || [];

    const listPrice =
      data.Offers?.Listings?.[0]?.Price?.Amount || data.ItemInfo?.ByLineInfo?.Price?.Amount;
    const price = listPrice ? parseFloat(listPrice) / 100 : 0; // Amazon returns price in cents

    return {
      productId: data.ASIN || data.Id || `amazon_${Date.now()}`,
      title: data.ItemInfo?.Title?.DisplayValue || data.Title || 'Unknown Product',
      description: data.ItemInfo?.Features?.DisplayValues?.[0] || data.Description,
      images: images.length > 0 ? images : ['/placeholder-product.jpg'],
      price,
      currency: 'USD',
      retailer: 'amazon',
      productUrl: data.DetailPageURL || `https://www.amazon.com/dp/${data.ASIN}`,
      affiliateUrl: this.associateTag
        ? `${data.DetailPageURL || `https://www.amazon.com/dp/${data.ASIN}`}?tag=${this.associateTag}`
        : undefined,
      availability: this.mapAvailability(data.Offers?.Summaries?.[0]?.Availability),
      brand: data.ItemInfo?.ByLineInfo?.Brand?.DisplayValue || data.Brand,
      category: this.mapCategory(data.BrowseNodeInfo?.BrowseNodes?.[0]?.DisplayName),
      sizes: this.extractSizes(data.ItemInfo?.TechnicalInfo),
      colors: this.extractColors(data.ItemInfo?.ExternalIds),
      sourceId: data.ASIN,
      importedAt: new Date(),
    };
  }

  private mapAvailability(
    availability?: any
  ): 'in-stock' | 'out-of-stock' | 'pre-order' | 'unknown' {
    if (!availability) return 'unknown';
    const message = availability.Message?.toLowerCase() || '';
    if (message.includes('in stock')) return 'in-stock';
    if (message.includes('out of stock')) return 'out-of-stock';
    if (message.includes('pre-order')) return 'pre-order';
    return 'unknown';
  }

  private mapCategory(
    browseNodeName?: string
  ): 'dress' | 'top' | 'bottom' | 'accessory' | 'shoes' | 'other' {
    if (!browseNodeName) return 'other';
    const name = browseNodeName.toLowerCase();
    if (name.includes('dress')) return 'dress';
    if (name.includes('top') || name.includes('blouse') || name.includes('shirt')) return 'top';
    if (name.includes('bottom') || name.includes('pant') || name.includes('skirt')) return 'bottom';
    if (name.includes('shoe')) return 'shoes';
    if (name.includes('accessory') || name.includes('jewelry') || name.includes('bag'))
      return 'accessory';
    return 'other';
  }

  private extractSizes(technicalInfo?: any): string[] {
    // Extract sizes from technical info if available
    return [];
  }

  private extractColors(externalIds?: any): string[] {
    // Extract colors from external IDs if available
    return [];
  }
}
