/**
 * eBay Finding API aggregator
 *
 * Setup Instructions:
 * 1. Sign up for eBay Developers Program: https://developer.ebay.com/
 * 2. Create an app and get App ID
 * 3. Set environment variable:
 *    - EBAY_APP_ID
 */
import { Product, ProductSearchFilters, ProductSearchResult, Retailer } from '@eventfit/types';
import { BaseAggregator } from './base';

export class eBayAggregator extends BaseAggregator {
  name: Retailer = 'ebay';
  private appId?: string;
  private baseUrl = 'https://svcs.ebay.com/services/search/FindingService/v1';

  constructor(config: { enabled: boolean; appId?: string }) {
    super({ enabled: config.enabled, rateLimit: 2 }); // eBay allows more requests
    this.appId = config.appId || process.env.NEXT_PUBLIC_EBAY_APP_ID;
  }

  async search(filters: ProductSearchFilters): Promise<ProductSearchResult> {
    if (!this.isAvailable() || !this.appId) {
      return { products: [], total: 0, hasMore: false };
    }

    await this.rateLimit();

    try {
      const keywords = this.buildSearchKeywords(filters);
      const categoryId = this.mapCategoryToEbayCategory(filters.category);

      // Build eBay API request
      const params = new URLSearchParams({
        'OPERATION-NAME': 'findItemsAdvanced',
        'SERVICE-VERSION': '1.0.0',
        'SECURITY-APPNAME': this.appId,
        'RESPONSE-DATA-FORMAT': 'JSON',
        'REST-PAYLOAD': '',
        keywords: keywords,
        'paginationInput.entriesPerPage': String(filters.limit || 20),
        'paginationInput.pageNumber': String(
          Math.floor((filters.offset || 0) / (filters.limit || 20)) + 1
        ),
        sortOrder: 'BestMatch',
      });

      if (categoryId) {
        params.append('categoryId', categoryId);
      }

      if (filters.priceMin) {
        params.append('itemFilter(0).name', 'MinPrice');
        params.append('itemFilter(0).value', String(filters.priceMin));
      }

      if (filters.priceMax) {
        params.append('itemFilter(1).name', 'MaxPrice');
        params.append('itemFilter(1).value', String(filters.priceMax));
      }

      // Add condition filter (new items)
      params.append('itemFilter(2).name', 'Condition');
      params.append('itemFilter(2).value(0)', 'New');

      const response = await fetch(`${this.baseUrl}?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`eBay API error: ${response.statusText}`);
      }

      const data = await response.json();
      const items = data.findItemsAdvancedResponse?.[0]?.searchResult?.[0]?.item || [];

      return {
        products: items.map((item: any) => this.mapToProduct(item)),
        total: parseInt(
          data.findItemsAdvancedResponse?.[0]?.paginationOutput?.[0]?.totalEntries?.[0] || '0'
        ),
        hasMore: items.length >= (filters.limit || 20),
      };
    } catch (error) {
      console.error('eBay search error:', error);
      return { products: [], total: 0, hasMore: false };
    }
  }

  async getProduct(productId: string): Promise<Product | null> {
    if (!this.isAvailable() || !this.appId) {
      return null;
    }

    await this.rateLimit();

    try {
      // eBay uses itemId for single product lookup
      const params = new URLSearchParams({
        'OPERATION-NAME': 'getSingleItem',
        'SERVICE-VERSION': '1.0.0',
        'SECURITY-APPNAME': this.appId,
        'RESPONSE-DATA-FORMAT': 'JSON',
        'REST-PAYLOAD': '',
        ItemID: productId,
        IncludeSelector: 'Details,ItemSpecifics',
      });

      const response = await fetch(`https://open.api.ebay.com/shopping?${params.toString()}`);

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      const item = data.Item?.[0];

      if (!item) {
        return null;
      }

      return this.mapToProduct(item);
    } catch (error) {
      console.error('eBay getProduct error:', error);
      return null;
    }
  }

  protected mapToProduct(data: any): Product {
    const images = data.pictureURL || (data.PictureURL ? [data.PictureURL] : []);
    const price = parseFloat(
      data.sellingStatus?.[0]?.currentPrice?.[0]?.['__value__'] ||
        data.ConvertedCurrentPrice?.Value ||
        '0'
    );

    return {
      productId: data.itemId?.[0] || data.ItemID || `ebay_${Date.now()}`,
      title: data.title?.[0] || data.Title || 'Unknown Product',
      description: data.subtitle?.[0] || data.Description,
      images: images.length > 0 ? images : ['/placeholder-product.jpg'],
      price,
      currency:
        data.sellingStatus?.[0]?.currentPrice?.[0]?.['@currencyId'] ||
        data.ConvertedCurrentPrice?.CurrencyID ||
        'USD',
      retailer: 'ebay',
      productUrl:
        data.viewItemURL?.[0] ||
        data.ViewItemURLForNaturalSearch ||
        `https://www.ebay.com/itm/${data.itemId?.[0] || data.ItemID}`,
      availability: this.mapAvailability(
        data.sellingStatus?.[0]?.sellingState?.[0] || data.Quantity
      ),
      brand: this.extractBrand(data),
      category: this.mapCategory(
        data.primaryCategory?.[0]?.categoryName?.[0] || data.PrimaryCategoryName
      ),
      sizes: this.extractSizes(data),
      colors: this.extractColors(data),
      sourceId: data.itemId?.[0] || data.ItemID,
      importedAt: new Date(),
    };
  }

  private mapAvailability(
    sellingStateOrQuantity: any
  ): 'in-stock' | 'out-of-stock' | 'pre-order' | 'unknown' {
    if (typeof sellingStateOrQuantity === 'string') {
      if (sellingStateOrQuantity.toLowerCase() === 'ended') return 'out-of-stock';
      return 'in-stock';
    }
    if (typeof sellingStateOrQuantity === 'number') {
      return sellingStateOrQuantity > 0 ? 'in-stock' : 'out-of-stock';
    }
    return 'unknown';
  }

  private mapCategory(
    categoryName?: string
  ): 'dress' | 'top' | 'bottom' | 'accessory' | 'shoes' | 'other' {
    if (!categoryName) return 'other';
    const name = categoryName.toLowerCase();
    if (name.includes('dress')) return 'dress';
    if (name.includes('top') || name.includes('blouse') || name.includes('shirt')) return 'top';
    if (name.includes('bottom') || name.includes('pant') || name.includes('skirt')) return 'bottom';
    if (name.includes('shoe')) return 'shoes';
    if (name.includes('accessory') || name.includes('jewelry') || name.includes('bag'))
      return 'accessory';
    return 'other';
  }

  private mapCategoryToEbayCategory(category?: string): string {
    // eBay category IDs for fashion
    const categoryMap: Record<string, string> = {
      dress: '63861', // Women's Dresses
      top: '63863', // Women's Tops & Blouses
      bottom: '63864', // Women's Pants
      shoes: '55793', // Women's Shoes
      accessory: '10968', // Women's Accessories
    };
    return categoryMap[category || ''] || '';
  }

  private extractBrand(data: any): string | undefined {
    // Try to extract brand from item specifics or title
    const itemSpecifics = data.itemSpecifics?.NameValueList || data.ItemSpecifics?.NameValueList;
    if (itemSpecifics) {
      const brand = itemSpecifics.find(
        (spec: any) =>
          spec.Name?.[0]?.toLowerCase() === 'brand' || spec.Name?.toLowerCase() === 'brand'
      );
      return brand?.Value?.[0] || brand?.Value;
    }
    return undefined;
  }

  private extractSizes(data: any): string[] {
    const itemSpecifics = data.itemSpecifics?.NameValueList || data.ItemSpecifics?.NameValueList;
    if (itemSpecifics) {
      const size = itemSpecifics.find(
        (spec: any) =>
          spec.Name?.[0]?.toLowerCase() === 'size' || spec.Name?.toLowerCase() === 'size'
      );
      return size?.Value || [];
    }
    return [];
  }

  private extractColors(data: any): string[] {
    const itemSpecifics = data.itemSpecifics?.NameValueList || data.ItemSpecifics?.NameValueList;
    if (itemSpecifics) {
      const color = itemSpecifics.find(
        (spec: any) =>
          spec.Name?.[0]?.toLowerCase() === 'color' || spec.Name?.toLowerCase() === 'color'
      );
      return color?.Value || [];
    }
    return [];
  }
}
