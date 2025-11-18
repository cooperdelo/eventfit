'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, Avatar, Button } from '@eventfit/ui';
import { OutfitCardProps } from '@eventfit/types';
import { formatCurrency } from '@eventfit/lib';
import { Heart, MessageCircle, ShoppingBag, Share2, Star, ExternalLink } from 'lucide-react';
import { cn } from '@eventfit/ui';

/**
 * OutfitCard component
 * Reference: Reference 2, 6 (Pinterest Post Detail, E-commerce Product Grid)
 * Visual Requirements:
 * - Image carousel/gallery (first image as main)
 * - Owner info (avatar, name)
 * - Outfit details (description, size, brand)
 * - Price and rent button (prominent like Pinterest "Save")
 * - Like/comment counts
 * - Tags
 * - Hover: shadow-lg scale-[1.02] transition-all duration-300
 */
export const OutfitCard: React.FC<OutfitCardProps> = ({
  id,
  images,
  title,
  price,
  size,
  brand,
  isRentable,
  isLiked = false,
  likesCount = 0,
  owner,
  onRent,
  productLinks,
  source = 'user',
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [likesCountState, setLikesCountState] = useState(likesCount);

  const mainImage = images[0] || '/placeholder-outfit.jpg';

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLikedState(!isLikedState);
    setLikesCountState(isLikedState ? likesCountState - 1 : likesCountState + 1);
    // TODO: API call to like/unlike
  };

  const handleRent = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRent?.();
  };

  return (
    <Link href={`/outfit/${id}`}>
      <Card hover className="overflow-hidden p-0 cursor-pointer group" padding="none">
        {/* Image Section */}
        <div className="relative w-full h-64 md:h-80 overflow-hidden">
          <Image
            src={mainImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Image Navigation Dots (if multiple images) */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all',
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  )}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Action Buttons Overlay */}
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleLike}
              className={cn(
                'p-2 rounded-full bg-white/90 backdrop-blur-sm transition-colors',
                isLikedState ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
              )}
              aria-label={isLikedState ? 'Unlike outfit' : 'Like outfit'}
            >
              <Heart className={cn('h-5 w-5', isLikedState && 'fill-current')} />
            </button>
            <button
              className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-text-primary hover:text-primary transition-colors"
              aria-label="Share outfit"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Owner Info */}
          <div className="flex items-center gap-2">
            <Avatar src={owner.avatar} alt={owner.name} size="sm" />
            <span className="text-sm font-medium text-text-primary">{owner.name}</span>
            {owner.isStarRenter && (
              <Star className="h-4 w-4 text-accent fill-accent" title="Star Renter" />
            )}
          </div>

          {/* Title and Rent Badge */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold text-text-primary line-clamp-2 flex-1">{title}</h3>
            {isRentable && (
              <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full flex-shrink-0">
                Rentable
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            {brand && <span>{brand}</span>}
            {size && (
              <>
                {brand && <span>•</span>}
                <span>Size {size}</span>
              </>
            )}
          </div>

          {/* Product Links (for inspiration items) */}
          {productLinks && productLinks.length > 0 && !isRentable && (
            <div className="pt-2 border-t border-gray-100">
              <div className="flex flex-wrap gap-2 mb-2">
                {productLinks.slice(0, 2).map((link, index) => (
                  <a
                    key={index}
                    href={link.affiliateUrl || link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-primary-light text-primary rounded-md hover:bg-primary-light/80 transition-colors"
                  >
                    Shop {link.retailer}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
                {productLinks.length > 2 && (
                  <span className="text-xs text-text-secondary px-2 py-1">
                    +{productLinks.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Price and Actions */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {price && (
                <div className="text-lg font-bold text-text-primary whitespace-nowrap">
                  {formatCurrency(price)}
                </div>
              )}
              {productLinks && productLinks.length > 0 && !price && (
                <div className="text-sm text-text-secondary">
                  From{' '}
                  {productLinks[0].price
                    ? formatCurrency(productLinks[0].price)
                    : 'various retailers'}
                </div>
              )}
              <button
                onClick={handleLike}
                className="flex items-center gap-1 text-text-secondary hover:text-red-600 transition-colors flex-shrink-0"
                aria-label={`${likesCountState} likes`}
              >
                <Heart className={cn('h-5 w-5', isLikedState && 'fill-current text-red-600')} />
                <span className="text-sm">{likesCountState}</span>
              </button>
              <button
                className="flex items-center gap-1 text-text-secondary hover:text-primary transition-colors flex-shrink-0"
                aria-label="View comments"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm">0</span>
              </button>
            </div>
            {isRentable && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleRent}
                className="flex-shrink-0"
                aria-label="Rent this outfit"
              >
                <ShoppingBag className="h-4 w-4 mr-1" />
                Rent
              </Button>
            )}
            {!isRentable && productLinks && productLinks.length > 0 && (
              <a
                href={productLinks[0].affiliateUrl || productLinks[0].url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-shrink-0"
              >
                <Button
                  variant="primary"
                  size="sm"
                  className="flex items-center gap-1"
                  aria-label="Shop this look"
                >
                  <ExternalLink className="h-4 w-4" />
                  Shop
                </Button>
              </a>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};
