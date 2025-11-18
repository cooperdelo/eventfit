import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '../utils/cn';

/**
 * Footer component matching reference images
 * Reference: Reference 7 (Pinterest footer)
 * Visual Requirements:
 * - Minimal design
 * - Links: Terms, Privacy, etc.
 * - Social icons: Instagram, TikTok, etc.
 * - Copyright notice
 */
export interface FooterProps {
  links?: Array<{ label: string; href: string }>;
  socialLinks?: Array<{ icon: React.ReactNode; href: string; label: string }>;
  copyright?: string;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  links,
  socialLinks,
  copyright = `© ${new Date().getFullYear()} EventFit. All rights reserved.`,
  className,
}) => {
  return (
    <footer
      className={cn('bg-surface border-t border-border py-8 px-4 md:px-6 lg:px-8', className)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6">
          {/* Logo and Top Section */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-full.png"
                alt="EventFit"
                width={150}
                height={60}
                className="h-12 w-auto"
              />
            </Link>

            {/* Links */}
            {links && links.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {/* Social Links */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    aria-label={social.label}
                    className="text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-text-secondary">{copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
