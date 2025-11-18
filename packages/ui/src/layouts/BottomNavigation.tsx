'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../utils/cn';
import { Home, Calendar, User, Sparkles, Search } from 'lucide-react';

/**
 * BottomNavigation component for mobile
 * Reference: Picture Inspiration images
 * Visual Requirements:
 * - Fixed bottom: fixed bottom-0 left-0 right-0
 * - Icons: Home, Events, Post, Messages, Profile
 * - Active state: Highlighted icon + text
 */
export interface BottomNavigationItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}

export interface BottomNavigationProps {
  items?: BottomNavigationItem[];
  className?: string;
}

const defaultItems: BottomNavigationItem[] = [
  { label: 'Home', icon: <Home className="h-5 w-5" />, href: '/dashboard' },
  { label: 'Events', icon: <Calendar className="h-5 w-5" />, href: '/events' },
  { label: 'Inspiration', icon: <Sparkles className="h-5 w-5" />, href: '/inspiration' },
  { label: 'Search', icon: <Search className="h-5 w-5" />, href: '/search' },
  { label: 'Profile', icon: <User className="h-5 w-5" />, href: '/profile' },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  items = defaultItems,
  className,
}) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'bg-surface border-t border-border',
        'md:hidden', // Only show on mobile
        className
      )}
    >
      <div className="flex items-center justify-around h-16">
        {items.map((item) => {
          const isActive =
            pathname === item.href || (item.href === '/dashboard' && pathname === '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1',
                'text-text-secondary transition-colors duration-200',
                isActive && 'text-primary'
              )}
              aria-label={item.label}
            >
              <span className={cn(isActive && 'text-primary')}>{item.icon}</span>
              <span className={cn('text-xs mt-1', isActive && 'font-medium')}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
