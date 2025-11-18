'use client';

import { useState } from 'react';
import { ProtectedRoute } from '../../../components/auth';
import { Navbar } from '@eventfit/ui';
import { Card, Button, Badge } from '@eventfit/ui';
import { Product, ProductSearchFilters, Retailer } from '@eventfit/types';
import { Search, Download, Plus, ExternalLink, CheckCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';

/**
 * Admin Product Import Tool
 * Allows admins to search and import products from multiple retailers
 */
export default function AdminProductsPage() {
  const [searchFilters, setSearchFilters] = useState<ProductSearchFilters>({
    category: undefined,
    eventType: undefined,
    keywords: '',
    priceMin: undefined,
    priceMax: undefined,
    limit: 20,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [importing, setImporting] = useState(false);
  const [importedCount, setImportedCount] = useState(0);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchFilters),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Search error:', error);
      alert('Failed to search products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleProductSelection = (productId: string) => {
    const newSelection = new Set(selectedProducts);
    if (newSelection.has(productId)) {
      newSelection.delete(productId);
    } else {
      newSelection.add(productId);
    }
    setSelectedProducts(newSelection);
  };

  const selectAll = () => {
    setSelectedProducts(new Set(products.map((p) => p.productId)));
  };

  const deselectAll = () => {
    setSelectedProducts(new Set());
  };

  const handleImport = async () => {
    if (selectedProducts.size === 0) {
      alert('Please select at least one product to import.');
      return;
    }

    setImporting(true);
    try {
      const productsToImport = products.filter((p) => selectedProducts.has(p.productId));

      // TODO: Implement actual import to Firestore
      // For now, just simulate the import
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setImportedCount(importedCount + productsToImport.length);
      setSelectedProducts(new Set());
      alert(`Successfully imported ${productsToImport.length} products!`);
    } catch (error) {
      console.error('Import error:', error);
      alert('Failed to import products. Please try again.');
    } finally {
      setImporting(false);
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-surface">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">Product Import Tool</h1>
            <p className="text-text-secondary">
              Search and import products from Amazon, eBay, and other retailers
            </p>
          </div>

          {/* Search Filters */}
          <Card className="mb-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Category</label>
                <select
                  value={searchFilters.category || ''}
                  onChange={(e) =>
                    setSearchFilters({
                      ...searchFilters,
                      category: (e.target.value as any) || undefined,
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">All Categories</option>
                  <option value="dress">Dress</option>
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="shoes">Shoes</option>
                  <option value="accessory">Accessory</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Event Type
                </label>
                <select
                  value={searchFilters.eventType || ''}
                  onChange={(e) =>
                    setSearchFilters({ ...searchFilters, eventType: e.target.value || undefined })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">All Events</option>
                  <option value="formal">Formal</option>
                  <option value="gameday">Gameday</option>
                  <option value="concert">Concert</option>
                  <option value="party">Party</option>
                  <option value="date-night">Date Night</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Keywords</label>
                <input
                  type="text"
                  value={searchFilters.keywords || ''}
                  onChange={(e) =>
                    setSearchFilters({ ...searchFilters, keywords: e.target.value || undefined })
                  }
                  placeholder="Search products..."
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Price Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={searchFilters.priceMin || ''}
                    onChange={(e) =>
                      setSearchFilters({
                        ...searchFilters,
                        priceMin: e.target.value ? parseFloat(e.target.value) : undefined,
                      })
                    }
                    placeholder="Min"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  <input
                    type="number"
                    value={searchFilters.priceMax || ''}
                    onChange={(e) =>
                      setSearchFilters({
                        ...searchFilters,
                        priceMax: e.target.value ? parseFloat(e.target.value) : undefined,
                      })
                    }
                    placeholder="Max"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button onClick={handleSearch} disabled={loading} className="flex items-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Search Products
                  </>
                )}
              </Button>

              {products.length > 0 && (
                <div className="text-sm text-text-secondary">Found {products.length} products</div>
              )}
            </div>
          </Card>

          {/* Products Grid */}
          {products.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <Button variant="secondary" size="sm" onClick={selectAll}>
                    Select All
                  </Button>
                  <Button variant="secondary" size="sm" onClick={deselectAll}>
                    Deselect All
                  </Button>
                  <span className="text-sm text-text-secondary">
                    {selectedProducts.size} selected
                  </span>
                </div>
                <Button
                  onClick={handleImport}
                  disabled={importing || selectedProducts.size === 0}
                  className="flex items-center gap-2"
                >
                  {importing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Import Selected ({selectedProducts.size})
                    </>
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <Card
                    key={product.productId}
                    className={`p-0 overflow-hidden cursor-pointer transition-all ${
                      selectedProducts.has(product.productId)
                        ? 'ring-2 ring-primary'
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => toggleProductSelection(product.productId)}
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={product.images[0] || '/placeholder-product.jpg'}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      {selectedProducts.has(product.productId) && (
                        <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                      )}
                      <Badge variant="secondary" className="absolute top-2 left-2">
                        {product.retailer}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-text-primary line-clamp-2 mb-2">
                        {product.title}
                      </h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-text-primary">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.brand && (
                          <span className="text-sm text-text-secondary">{product.brand}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={product.affiliateUrl || product.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          View Product
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {products.length === 0 && !loading && (
            <Card className="p-12 text-center">
              <Search className="h-12 w-12 text-text-tertiary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">No products found</h3>
              <p className="text-text-secondary">Try adjusting your search filters or keywords</p>
            </Card>
          )}

          {/* Import Stats */}
          {importedCount > 0 && (
            <Card className="mt-6 p-4 bg-primary/10">
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Successfully imported {importedCount} products</span>
              </div>
            </Card>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
