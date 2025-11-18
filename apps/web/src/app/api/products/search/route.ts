/**
 * Product Search API Route
 * Handles product searches across multiple aggregators
 */
import { NextRequest, NextResponse } from 'next/server';
import { ProductSearchFilters } from '@eventfit/types';
import { getProductService } from '@/lib/products';

export async function POST(request: NextRequest) {
  try {
    const filters: ProductSearchFilters = await request.json();

    const productService = getProductService();
    const result = await productService.search(filters);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Product search error:', error);
    return NextResponse.json(
      { error: 'Failed to search products', products: [], total: 0, hasMore: false },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filters: ProductSearchFilters = {
      category: searchParams.get('category') as any,
      eventType: searchParams.get('eventType') || undefined,
      size: searchParams.get('size') || undefined,
      priceMin: searchParams.get('priceMin')
        ? parseFloat(searchParams.get('priceMin')!)
        : undefined,
      priceMax: searchParams.get('priceMax')
        ? parseFloat(searchParams.get('priceMax')!)
        : undefined,
      brand: searchParams.get('brand') || undefined,
      color: searchParams.get('color') || undefined,
      keywords: searchParams.get('keywords') || undefined,
      retailers: searchParams.get('retailers')?.split(',') as any,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined,
    };

    const productService = getProductService();
    const result = await productService.search(filters);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Product search error:', error);
    return NextResponse.json(
      { error: 'Failed to search products', products: [], total: 0, hasMore: false },
      { status: 500 }
    );
  }
}
