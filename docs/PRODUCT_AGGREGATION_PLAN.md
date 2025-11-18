# Product Aggregation Plan for EventFit

## Overview

This document outlines the strategy for aggregating real product links from multiple free sources to populate EventFit with inspiration content. This supports the early phase when the platform is primarily focused on inspiration and buying versus selling and user-generated content.

---

## Product Sources (Free Options)

### 1. Amazon Product Advertising API (PA-API 5.0)

**Status:** Free (affiliate commission model)
**Pros:**

- Massive product catalog
- High-quality images
- Reliable API
- Good documentation
- Free to use (earn commission on sales)

**Cons:**

- Requires approval process
- Limited to Amazon products
- API rate limits

**Setup:**

- Sign up for Amazon Associates
- Apply for Product Advertising API access
- Get Access Key ID and Secret Access Key

**Use Case:** Primary source for general fashion items

---

### 2. Walmart Open API

**Status:** Free (affiliate program)
**Pros:**

- Large catalog
- Competitive pricing
- Good for budget-friendly options

**Cons:**

- Requires affiliate approval
- API access may be limited

**Use Case:** Budget-friendly alternatives

---

### 3. eBay Finding API

**Status:** Free (no affiliate required for basic use)
**Pros:**

- Free to use
- Large catalog
- Good for vintage/unique items
- No approval needed for basic API

**Cons:**

- Less structured than Amazon
- Variable product quality

**Use Case:** Unique/vintage items, variety

---

### 4. Etsy API

**Status:** Free (with affiliate program)
**Pros:**

- Unique, handmade items
- Good for accessories
- Free API access

**Cons:**

- Smaller catalog
- Variable availability

**Use Case:** Accessories, unique pieces

---

### 5. Google Shopping API / Merchant Center

**Status:** Free (requires setup)
**Pros:**

- Aggregates multiple retailers
- Good product data

**Cons:**

- More complex setup
- May require merchant account

**Use Case:** Aggregated search results

---

### 6. Web Scraping (Ethical, Public Data)

**Status:** Free (with legal considerations)
**Pros:**

- Access to any public website
- No API limitations
- Flexible

**Cons:**

- Legal/compliance considerations
- Requires maintenance
- Rate limiting needed

**Use Case:** Specific retailers not covered by APIs

**Note:** Only scrape publicly available data, respect robots.txt, implement rate limiting

---

## Recommended Multi-Source Strategy

### Phase 1: Start with Amazon + eBay

- **Amazon PA-API:** Primary source for mainstream fashion
- **eBay Finding API:** Secondary source for variety and unique items
- **Why:** Both are free, have good APIs, complement each other

### Phase 2: Add Etsy + Manual Curated Links

- **Etsy API:** For accessories and unique pieces
- **Manual curation:** Add direct links to popular brands (ASOS, Zara, H&M, etc.)
- **Why:** Fill gaps in coverage

### Phase 3: Expand with Additional Sources

- **Walmart API:** If approved
- **Google Shopping:** For aggregated results
- **Web scraping:** For specific retailers as needed

---

## Data Structure

### Product Type Extension

```typescript
export interface Product {
  productId: string;
  title: string;
  description?: string;
  images: string[];
  price: number;
  currency: string;
  retailer: 'amazon' | 'ebay' | 'etsy' | 'walmart' | 'manual' | 'other';
  productUrl: string;
  affiliateUrl?: string; // For tracking
  availability: 'in-stock' | 'out-of-stock' | 'pre-order' | 'unknown';
  brand?: string;
  category: 'dress' | 'top' | 'bottom' | 'accessory' | 'shoes' | 'other';
  sizes?: string[];
  colors?: string[];
  tags?: string[];
  eventTypes?: string[]; // Auto-tagged event types
  sourceId?: string; // Original product ID from source
  importedAt: Date | string;
  lastUpdated?: Date | string;
}
```

### Outfit Extension (for inspiration items)

```typescript
export interface InspirationOutfit extends Outfit {
  source: 'product-aggregation';
  products: Product[]; // Multiple product options for this outfit
  primaryProduct?: Product; // Main product shown
  eventTypes: string[]; // Auto-tagged events
}
```

---

## Implementation Architecture

### Service Layer Structure

```
apps/web/src/lib/products/
├── aggregators/
│   ├── amazon.ts          # Amazon PA-API integration
│   ├── ebay.ts            # eBay Finding API integration
│   ├── etsy.ts            # Etsy API integration
│   └── base.ts            # Base aggregator interface
├── services/
│   ├── productService.ts  # Main service orchestrator
│   ├── productCache.ts    # Caching layer
│   └── productMapper.ts   # Map external products to our format
├── types.ts               # Product types
└── index.ts               # Public exports
```

### API Routes

```
apps/web/src/app/api/products/
├── search/route.ts        # Search products by filters
├── import/route.ts        # Admin: Import products
├── sync/route.ts          # Admin: Sync from sources
└── [id]/route.ts          # Get single product
```

---

## Filter Integration

### Existing Filters (from your codebase)

- Category: `'dress' | 'top' | 'bottom' | 'accessory' | 'shoes' | 'other'`
- Event Type: Formal, Gameday, Concert, Party, Other
- Size: XS, S, M, L, XL, etc.
- Price Range: Min/Max
- Brand: Optional

### Product Search Query Builder

```typescript
interface ProductSearchFilters {
  category?: string;
  eventType?: string;
  size?: string;
  priceMin?: number;
  priceMax?: number;
  brand?: string;
  color?: string;
  retailers?: string[]; // Filter by source
  limit?: number;
  offset?: number;
}
```

---

## Admin Tools

### Product Import Tool

**Location:** `apps/web/src/app/admin/products/page.tsx`

**Features:**

1. **Search Interface**
   - Filter by category, event type, price range
   - Select retailers (Amazon, eBay, Etsy)
   - Preview products before importing

2. **Bulk Import**
   - Search and select multiple products
   - Auto-tag with event types
   - Batch import to Firestore

3. **Manual Add**
   - Add products manually with URL
   - Fill in product details
   - Add to inspiration feed

4. **Sync Management**
   - Sync products from sources
   - Update prices/availability
   - Remove discontinued items

---

## Database Structure (Firestore)

### Collections

```
/products/{productId}
{
  productId: string;
  title: string;
  images: string[];
  price: number;
  retailer: string;
  productUrl: string;
  affiliateUrl?: string;
  category: string;
  eventTypes: string[];
  // ... other fields
}

/inspiration-outfits/{outfitId}
{
  outfitId: string;
  ownerId: 'system';
  source: 'product-aggregation';
  photo: string; // Primary product image
  products: string[]; // Product IDs
  eventIds: string[];
  category: string;
  tags: string[];
  rentable: false;
  visibility: 'public';
}
```

### Indexes Needed

```javascript
// Firestore indexes
-category +
  eventTypes +
  price(ascending) -
  retailer +
  category +
  price(ascending) -
  eventTypes +
  category(ascending);
```

---

## Cost Analysis

### API Costs

- **Amazon PA-API:** Free (affiliate commission)
- **eBay Finding API:** Free
- **Etsy API:** Free
- **Walmart API:** Free (if approved)
- **Total API Cost:** $0/month

### Storage Costs (Firestore)

- Product documents: ~2KB each
- 1,000 products = ~2MB
- Firestore free tier: 1GB storage
- **Cost:** Free for first 1GB

### Bandwidth Costs

- Product images: Use retailer's CDN (no cost)
- API calls: Minimal (cached results)
- **Cost:** ~$0/month

### Total Monthly Cost: $0 (within free tiers)

---

## Implementation Phases

### Phase 1: Core Infrastructure (Week 1)

- [x] Create product types
- [ ] Build base aggregator interface
- [ ] Implement Amazon PA-API aggregator
- [ ] Implement eBay Finding API aggregator
- [ ] Create product service orchestrator
- [ ] Set up Firestore collections

### Phase 2: Admin Tools (Week 2)

- [ ] Build product search interface
- [ ] Create bulk import functionality
- [ ] Add manual product entry
- [ ] Implement sync management

### Phase 3: Integration (Week 3)

- [ ] Update OutfitCard to show product links
- [ ] Integrate with inspiration page
- [ ] Add to RelatedItemsCarousel
- [ ] Update filter system

### Phase 4: Enhancement (Week 4)

- [ ] Add Etsy aggregator
- [ ] Implement product caching
- [ ] Add price tracking
- [ ] Create analytics dashboard

---

## API Rate Limits & Best Practices

### Amazon PA-API

- **Rate Limit:** 1 request per second
- **Best Practice:** Implement request queuing
- **Caching:** Cache results for 24 hours

### eBay Finding API

- **Rate Limit:** 5,000 calls/day (free tier)
- **Best Practice:** Batch requests efficiently
- **Caching:** Cache results for 12 hours

### Etsy API

- **Rate Limit:** 10 requests/second
- **Best Practice:** Use pagination
- **Caching:** Cache results for 6 hours

### General Best Practices

1. **Cache aggressively:** Store product data in Firestore
2. **Batch operations:** Import multiple products at once
3. **Rate limiting:** Implement delays between API calls
4. **Error handling:** Graceful degradation if API fails
5. **Monitoring:** Track API usage and errors

---

## Legal & Compliance

### Affiliate Disclosure

- Clearly mark affiliate links
- Add disclaimer: "We may earn commission from purchases"
- Comply with FTC guidelines

### Terms of Service

- Respect each API's terms of service
- Don't cache product data longer than allowed
- Attribute product sources appropriately

### Data Usage

- Only use product data for display purposes
- Don't resell product data
- Respect retailer branding guidelines

---

## Success Metrics

### Key Performance Indicators

1. **Product Coverage**
   - Target: 1,000+ products in first month
   - Track: Products per category, per event type

2. **User Engagement**
   - Click-through rate on product links
   - Products saved/favorited
   - Conversion rate (affiliate sales)

3. **Data Quality**
   - Product image quality
   - Price accuracy
   - Availability accuracy

4. **System Performance**
   - API response times
   - Cache hit rates
   - Error rates

---

## Next Steps

1. **Set up API accounts**
   - Amazon Associates + PA-API
   - eBay Developer account
   - Etsy API key

2. **Implement core services**
   - Start with Amazon + eBay
   - Build product mapper
   - Set up Firestore structure

3. **Build admin tools**
   - Product search interface
   - Bulk import functionality

4. **Integrate with existing components**
   - Update OutfitCard
   - Add to inspiration feed
   - Integrate filters

5. **Test and iterate**
   - Test with real searches
   - Gather user feedback
   - Optimize based on usage
