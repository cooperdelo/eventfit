'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Bell } from 'lucide-react';
import { cn } from '../utils/cn';

/**
 * Navbar component matching reference images
 * Reference: Reference 3, 7 (Pinterest navigation)
 * Visual Requirements:
 * - Sticky: sticky top-0 z-50
 * - Background: bg-white border-b border-gray-200
 * - Logo: Left side
 * - Links: Center or right
 * - CTA buttons: Right side (Log in, Sign up)
 */
export interface NavbarProps {
  logo?: React.ReactNode;
  links?: Array<{ label: string; href: string }>;
  ctaButtons?: React.ReactNode;
  showSearch?: boolean;
  showNotifications?: boolean;
  unreadNotificationCount?: number;
  onSearchClick?: () => void;
  onNotificationsClick?: () => void;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  links,
  ctaButtons,
  showSearch = true,
  showNotifications = false,
  unreadNotificationCount = 0,
  onNotificationsClick,
  className,
}) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 bg-surface border-b border-border',
        'flex items-center justify-between px-4 md:px-6 lg:px-8 h-14',
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center">
        {logo || (
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-icon.png"
              alt="EventFit"
              width={32}
              height={32}
              className="h-8 w-8"
              priority
            />
            <span className="text-xl font-bold text-text-primary">EventFit</span>
          </Link>
        )}
      </div>

      {/* Links */}
      {links && links.length > 0 ? (
        <div className="hidden md:flex items-center space-x-6">
          {links.map((link) => {
            const isActive =
              pathname === link.href || (link.href === '/dashboard' && pathname === '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-text-primary hover:text-primary transition-colors duration-200',
                  isActive && 'text-primary font-semibold'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      ) : (
        // Default navigation links if none provided
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/dashboard"
            className={cn(
              'text-text-primary hover:text-primary transition-colors duration-200',
              (pathname === '/dashboard' || pathname === '/') && 'text-primary font-semibold'
            )}
          >
            Dashboard
          </Link>
          <Link
            href="/events"
            className={cn(
              'text-text-primary hover:text-primary transition-colors duration-200',
              pathname.startsWith('/events') && 'text-primary font-semibold'
            )}
          >
            Events
          </Link>
          <Link
            href="/inspiration"
            className={cn(
              'text-text-primary hover:text-primary transition-colors duration-200',
              pathname === '/inspiration' && 'text-primary font-semibold'
            )}
          >
            Inspiration
          </Link>
          <Link
            href="/search"
            className={cn(
              'text-text-primary hover:text-primary transition-colors duration-200',
              pathname === '/search' && 'text-primary font-semibold'
            )}
          >
            Search
          </Link>
          <Link
            href="/leaderboard"
            className={cn(
              'text-text-primary hover:text-primary transition-colors duration-200',
              pathname === '/leaderboard' && 'text-primary font-semibold'
            )}
          >
            Leaderboard
          </Link>
        </div>
      )}

      {/* Search, Notifications & CTA Buttons */}
      <div className="flex items-center space-x-3">
        {showSearch && (
          <Link
            href="/search"
            className="p-2 text-text-primary hover:text-primary transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Link>
        )}
        {showNotifications && (
          <button
            onClick={onNotificationsClick}
            className="relative p-2 text-text-primary hover:text-primary transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full border-2 border-surface"></span>
            )}
          </button>
        )}
        {ctaButtons}
      </div>
    </nav>
  );
};
