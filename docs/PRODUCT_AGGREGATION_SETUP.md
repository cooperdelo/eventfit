# Product Aggregation Setup Guide

This guide will help you set up product aggregation from Amazon, eBay, and other retailers.

## Prerequisites

- Node.js 18+ installed
- EventFit project set up and running
- Admin access to EventFit

## Step 1: Amazon Product Advertising API Setup

### 1.1 Sign up for Amazon Associates

1. Go to [Amazon Associates](https://affiliate-program.amazon.com/)
2. Sign up for an account
3. Complete the application process
4. Wait for approval (usually 1-2 days)

### 1.2 Apply for Product Advertising API Access

1. Once approved as an Associate, go to [Product Advertising API](https://webservices.amazon.com/paapi5/documentation/)
2. Click "Sign up for Product Advertising API"
3. Fill out the application form
4. Wait for approval (can take a few days)

### 1.3 Get Your API Credentials

1. Once approved, go to your [Associates Central](https://affiliate-program.amazon.com/home)
2. Navigate to "Tools" → "Product Advertising API"
3. Create a new access key pair
4. Save your:
   - Access Key ID
   - Secret Access Key
   - Associate Tag (found in your Associates account)

### 1.4 Set Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_AMAZON_ACCESS_KEY_ID=your_access_key_id
NEXT_PUBLIC_AMAZON_SECRET_ACCESS_KEY=your_secret_access_key
NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=your_associate_tag
NEXT_PUBLIC_AMAZON_REGION=us-east-1
```

**Note:** The `NEXT_PUBLIC_` prefix is used for client-side access. For production, you should use server-side only environment variables and implement the Amazon API calls in API routes (which we've set up).

## Step 2: eBay Finding API Setup

### 2.1 Sign up for eBay Developers Program

1. Go to [eBay Developers Program](https://developer.ebay.com/)
2. Sign in with your eBay account (or create one)
3. Click "Get Started" or "Join"

### 2.2 Create an Application

1. Go to [My Account](https://developer.ebay.com/my/keys)
2. Click "Create an App Key"
3. Fill out the form:
   - **App Name:** EventFit Product Aggregator
   - **App Type:** Production
   - **OAuth Redirect URI:** (leave blank for Finding API)
4. Submit the form

### 2.3 Get Your App ID

1. After creating the app, you'll see your **App ID (Client ID)**
2. Copy this value

### 2.4 Set Environment Variable

Add to your `.env.local` file:

```env
NEXT_PUBLIC_EBAY_APP_ID=your_ebay_app_id
```

## Step 3: Verify Setup

### 3.1 Check Environment Variables

Make sure all environment variables are set:

```bash
# Check if variables are loaded
echo $NEXT_PUBLIC_AMAZON_ACCESS_KEY_ID
echo $NEXT_PUBLIC_EBAY_APP_ID
```

### 3.2 Test the Product Search

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Navigate to the admin products page:

   ```
   http://localhost:3000/admin/products
   ```

3. Try searching for products:
   - Select a category (e.g., "Dress")
   - Enter keywords (e.g., "formal dress")
   - Click "Search Products"

4. You should see products from eBay (Amazon requires server-side implementation)

## Step 4: Server-Side Amazon API Implementation

Since Amazon PA-API requires server-side calls (due to CORS and security), you'll need to implement the actual API calls in the API route.

### 4.1 Install Required Packages

```bash
npm install @aws-sdk/client-paapi5
```

### 4.2 Update API Route

The API route at `apps/web/src/app/api/products/amazon/search/route.ts` needs to be implemented with actual Amazon PA-API calls. See the Amazon PA-API documentation for implementation details.

**Note:** For now, the eBay aggregator works client-side, so you can test with eBay products immediately.

## Step 5: Using the Product Import Tool

### 5.1 Access the Tool

1. Log in as an admin user
2. Navigate to `/admin/products`
3. You'll see the product import interface

### 5.2 Search for Products

1. **Select Category:** Choose from Dress, Top, Bottom, Shoes, or Accessory
2. **Select Event Type:** Filter by Formal, Gameday, Concert, Party, or Date Night
3. **Enter Keywords:** Add specific search terms
4. **Set Price Range:** Optional min/max price filters
5. **Click "Search Products"**

### 5.3 Import Products

1. Browse the search results
2. Click on products to select them (selected products will have a checkmark)
3. Use "Select All" or "Deselect All" for bulk operations
4. Click "Import Selected" to add products to your database

### 5.4 Product Details

Each product card shows:

- Product image
- Title and brand
- Price
- Retailer badge (Amazon, eBay, etc.)
- "View Product" link to the retailer's site

## Step 6: Integration with Existing Features

### 6.1 Inspiration Page

Products imported through the admin tool can be displayed on the inspiration page alongside user-generated content.

### 6.2 Related Items Carousel

The `RelatedItemsCarousel` component can show imported products as "Shop the Look" items.

### 6.3 Event Pages

Products can be tagged with event types and shown on event detail pages.

## Troubleshooting

### Amazon API Not Working

- **Issue:** Amazon products not showing up
- **Solution:**
  - Verify your API credentials are correct
  - Check that you've been approved for PA-API access
  - Ensure server-side API route is implemented
  - Check API rate limits (1 request/second)

### eBay API Not Working

- **Issue:** eBay products not showing up
- **Solution:**
  - Verify your App ID is correct
  - Check that your App ID is for Production (not Sandbox)
  - Check browser console for errors
  - Verify CORS is not blocking requests

### No Products Found

- **Issue:** Search returns no results
- **Solution:**
  - Try broader search terms
  - Remove some filters
  - Check that at least one aggregator is enabled
  - Verify environment variables are loaded

### Rate Limiting

- **Issue:** API requests are being rate-limited
- **Solution:**
  - The aggregators have built-in rate limiting
  - Amazon: 1 request/second
  - eBay: More lenient, but still rate-limited
  - Wait a few seconds between searches

## Next Steps

1. **Add More Aggregators:** Consider adding Etsy, Walmart, or other retailers
2. **Implement Caching:** Cache product results to reduce API calls
3. **Auto-tagging:** Automatically tag products with event types based on keywords
4. **Price Tracking:** Track price changes over time
5. **Product Sync:** Set up scheduled syncs to update product availability

## Support

For issues or questions:

- Check the [Product Aggregation Plan](./PRODUCT_AGGREGATION_PLAN.md)
- Review API documentation:
  - [Amazon PA-API](https://webservices.amazon.com/paapi5/documentation/)
  - [eBay Finding API](https://developer.ebay.com/DevZone/finding/Concepts/FindingAPIGuide.html)

## Security Notes

- **Never commit API keys to version control**
- Use environment variables for all API credentials
- For production, use server-side only environment variables (without `NEXT_PUBLIC_` prefix)
- Implement proper authentication for admin routes
- Rate limit API calls to prevent abuse
