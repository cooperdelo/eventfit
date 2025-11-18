import Link from 'next/link';
import Image from 'next/image';
import { Navbar, Footer, Button, Card } from '@eventfit/ui';
import { Calendar, Shirt, UsersRound, Sparkles } from 'lucide-react';

/**
 * How It Works Page
 * Reference: Reference 7 (Pinterest Landing Page) - Clean layout
 */
export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar
        links={[
          { label: 'About', href: '/about' },
          { label: 'How It Works', href: '/how-it-works' },
          { label: 'Contact', href: '/contact' },
        ]}
        ctaButtons={
          <Link href="/contact">
            <Button variant="primary" size="md">
              Contact Us
            </Button>
          </Link>
        }
      />

      {/* Hero Header */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-varsity font-bold text-text-primary mb-4">
            How EventFit Works — Simple as 1, 2, 3
          </h1>
          <p className="text-lg text-text-secondary">
            Discover events, explore outfits, and rent from students like you.
          </p>
        </div>
      </section>

      {/* Step-by-Step Walkthrough */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-varsity font-bold text-text-primary mb-2">
                Step 1: Find Your School's Calendar
              </h2>
              <p className="text-text-secondary">
                Browse upcoming events on your campus. See formal galas, gameday tailgates,
                concerts, and more. Filter by date, location, or event type to find exactly what
                you're looking for.
              </p>
            </div>
            <div className="flex-1 relative">
              <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/how-it-works/calendar-preview.jpg"
                  alt="Calendar preview showing campus events"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQADAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="flex-1">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-4">
                <Shirt className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-varsity font-bold text-text-primary mb-2">
                Step 2: See What Everyone's Wearing
              </h2>
              <p className="text-text-secondary">
                Explore outfit boards for each event. See real photos from students who've attended
                similar events. Get inspired by styles that match your campus vibe.
              </p>
            </div>
            <div className="flex-1 relative">
              <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/how-it-works/outfit-board-preview.jpg"
                  alt="Outfit board showing student outfits for events"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQADAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-4">
                <UsersRound className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-varsity font-bold text-text-primary mb-2">
                Step 3: List or Borrow Outfits
              </h2>
              <p className="text-text-secondary">
                Post your own outfits for rent or browse available rentals. Secure escrow payments
                protect both renters and lenders. Return items easily and build your trust score.
              </p>
            </div>
            <div className="flex-1 relative">
              <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/how-it-works/rental-preview.jpg"
                  alt="Rental confirmation showing secure escrow payment"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQADAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Suggestions (Coming Soon) */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto text-center" padding="lg">
          <Sparkles className="h-12 w-12 text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-varsity font-bold text-text-primary mb-2">
            AI-Powered Outfit Suggestions
          </h2>
          <p className="text-text-secondary">
            Soon you'll get personalized recommendations based on your events and wardrobe. Our AI
            will help you find the perfect outfit for any occasion.
          </p>
          <p className="text-sm text-text-tertiary mt-4">Coming Soon</p>
        </Card>
      </section>

      {/* Join CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-varsity font-bold text-text-primary mb-4">
            Be Part of the Launch
          </h2>
          <p className="text-text-secondary mb-8">
            Join the waitlist to get early access and help shape EventFit for your campus.
          </p>
          <Link href="/waitlist">
            <Button variant="primary" size="lg">
              Join Waitlist
            </Button>
          </Link>
        </div>
      </section>

      <Footer
        links={[
          { label: 'Terms', href: '/terms' },
          { label: 'Privacy', href: '/privacy' },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ]}
        copyright={`© ${new Date().getFullYear()} EventFit. All rights reserved.`}
      />
    </div>
  );
}
