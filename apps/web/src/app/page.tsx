import Link from 'next/link';
import Image from 'next/image';
import { Navbar, Footer, Button, Card } from '@eventfit/ui';
import { Search, Shirt, UsersRound, Leaf, School, Users } from 'lucide-react';

export default function Home() {
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-varsity font-bold text-text-primary mb-4">
            Dress Smart for Every Campus Event
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            Discover, share, and rent outfits for your college's biggest moments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/waitlist">
              <Button variant="primary" size="lg">
                Join Waitlist
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="outline" size="lg">
                See How It Works
              </Button>
            </Link>
          </div>
          {/* Hero Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {['Gameday', 'Formal', 'Concert', 'Date Night'].map((eventType, index) => (
              <div key={index} className="relative aspect-[3/4] rounded-xl overflow-hidden">
                <Image
                  src={`/images/hero/${eventType.toLowerCase().replace(' ', '-')}.jpg`}
                  alt={`${eventType} outfit example`}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQADAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-white font-medium text-sm">{eventType}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-varsity font-bold text-center text-text-primary mb-12">
          How It Works — Simple as 1, 2, 3
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card hover className="text-center">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Browse events near you</h3>
            <p className="text-text-secondary">
              Discover campus events and see what others are wearing
            </p>
          </Card>
          <Card hover className="text-center">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Shirt className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">See and share what others are wearing</h3>
            <p className="text-text-secondary">
              Get inspired by real outfits from students at your school
            </p>
          </Card>
          <Card hover className="text-center">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <UsersRound className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Rent or borrow fits from verified students
            </h3>
            <p className="text-text-secondary">
              Secure rentals with escrow protection and easy returns
            </p>
          </Card>
        </div>
      </section>

      {/* Why EventFit */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-varsity font-bold text-center text-text-primary mb-12">
          Why EventFit
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card hover className="text-center">
            <Leaf className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sustainable Fashion</h3>
            <p className="text-text-secondary">
              Reduce waste by renting instead of buying one-time outfits
            </p>
          </Card>
          <Card hover className="text-center">
            <School className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Campus Style Simplified</h3>
            <p className="text-text-secondary">
              See what's actually being worn at your school's events
            </p>
          </Card>
          <Card hover className="text-center">
            <Users className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Built for Students</h3>
            <p className="text-text-secondary">
              Designed by students, for students. Campus-exclusive and trusted.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="text-center max-w-2xl mx-auto" padding="lg">
          <h2 className="text-3xl font-varsity font-bold text-text-primary mb-4">
            Join your school's EventFit community
          </h2>
          <p className="text-text-secondary mb-6">
            Be part of the launch and get early access to the platform.
          </p>
          <Link href="/waitlist">
            <Button variant="primary" size="lg">
              Join Waitlist
            </Button>
          </Link>
        </Card>
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
