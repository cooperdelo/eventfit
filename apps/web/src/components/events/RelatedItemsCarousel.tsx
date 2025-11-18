'use client';

import React from 'react';
import { OutfitCard } from '../outfits/OutfitCard';
import { OutfitCardProps } from '@eventfit/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@eventfit/ui';

/**
 * RelatedItemsCarousel component
 * Reference: Reference 2 (Pinterest Post Detail) - "Shop the look" horizontal scroll
 * Visual Requirements:
 * - Horizontal scrollable product cards
 * - Each card: Image, price, brand name
 * - Clean, minimal card design
 * - Navigation arrows (desktop)
 */
export interface RelatedItemsCarouselProps {
  items: OutfitCardProps[];
  title?: string;
  className?: string;
}

export const RelatedItemsCarousel: React.FC<RelatedItemsCarouselProps> = ({
  items,
  title = 'Related Outfits',
  className,
}) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [rightPadding, setRightPadding] = React.useState('2rem'); // Reduced since arrow is closer

  React.useEffect(() => {
    const updatePadding = () => {
      if (window.innerWidth >= 768) {
        setRightPadding('2.5rem'); // Reduced for desktop since arrow is closer
      } else {
        setRightPadding('2rem'); // Reduced for mobile
      }
    };

    updatePadding();
    window.addEventListener('resize', updatePadding);
    return () => window.removeEventListener('resize', updatePadding);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 300; // Reduced for smaller cards
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={cn('w-full', className)}>
      {title && <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>}
      <div className="relative">
        {/* Navigation Arrows (Desktop) */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4 text-text-primary" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-28 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4 text-text-primary" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingLeft: '2.5rem', // Reduced padding for smaller arrows
            paddingRight: rightPadding, // Responsive padding for right arrow spacing
          }}
        >
          {items.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-64 md:w-72">
              <OutfitCard {...item} />
            </div>
          ))}
          {/* Spacer to ensure proper spacing from right arrow */}
          <div className="flex-shrink-0 w-16 md:w-20" style={{ minWidth: '4rem' }} />
        </div>
      </div>
    </div>
  );
};
