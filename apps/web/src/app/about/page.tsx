import Link from 'next/link';
import Image from 'next/image';
import { Navbar, Footer, Button, Card, Avatar } from '@eventfit/ui';
import { Clock, Flag, Linkedin, Mail } from 'lucide-react';

/**
 * About Page
 * Reference: Reference 7 (Pinterest Landing Page) - Clean layout
 */
export default function AboutPage() {
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
            Making Campus Style Effortless
          </h1>
          <p className="text-lg text-text-secondary">
            EventFit was built to make finding what to wear stress-free and fun. We believe in
            sustainable fashion, community, and helping students look their best for every campus
            moment.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-varsity font-bold text-text-primary mb-4">
                Our Mission
              </h2>
              <p className="text-text-secondary mb-4">
                EventFit was built to make finding what to wear stress-free and fun. We connect
                students through style, reduce fashion waste, and create a trusted community where
                everyone can look their best.
              </p>
              <p className="text-text-secondary">
                By enabling peer-to-peer rentals and outfit sharing, we're making sustainable
                fashion accessible while building a platform that celebrates campus culture and
                individual style.
              </p>
            </div>
            <div className="relative bg-gray-100 rounded-xl aspect-square overflow-hidden">
              <Image
                src="/images/about/diverse-students.jpg"
                alt="Diverse group of college students"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQADAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Flag className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-varsity font-bold text-text-primary">Our Story</h2>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Concept Origin</h3>
                <p className="text-text-secondary">
                  EventFit started when we noticed students struggling to find the right outfit for
                  campus events. We saw an opportunity to create a platform that combines event
                  discovery, style inspiration, and sustainable fashion.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                  <Flag className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Pilot Schools</h3>
                <p className="text-text-secondary">
                  We're launching at UNC Chapel Hill and expanding to campuses nationwide. Our goal
                  is to build a trusted community where students can share, rent, and discover
                  outfits for every occasion.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                  <Flag className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">What's Next</h3>
                <p className="text-text-secondary">
                  We're continuously improving EventFit based on student feedback. Upcoming features
                  include AI-powered outfit suggestions, expanded event coverage, and enhanced
                  rental experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-varsity font-bold text-text-primary text-center mb-12">
          Meet the Team
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              name: 'Founder Name',
              title: 'Co-Founder & CEO',
              bio: 'Passionate about sustainable fashion and campus communities.',
              school: 'UNC Chapel Hill',
            },
            {
              name: 'Founder Name',
              title: 'Co-Founder & CTO',
              bio: 'Building the future of campus social platforms.',
              school: 'UNC Chapel Hill',
            },
            {
              name: 'Founder Name',
              title: 'Co-Founder & COO',
              bio: 'Connecting students through style and events.',
              school: 'UNC Chapel Hill',
            },
          ].map((member, index) => (
            <Card key={index} className="text-center" padding="lg">
              <Avatar
                src={`https://via.placeholder.com/120`}
                alt={member.name}
                size="xl"
                className="mx-auto mb-4"
              />
              <h3 className="font-semibold text-text-primary mb-1">{member.name}</h3>
              <p className="text-sm text-text-secondary mb-2">{member.title}</p>
              <p className="text-sm text-text-tertiary mb-4">{member.school}</p>
              <p className="text-sm text-text-secondary mb-4">{member.bio}</p>
              <div className="flex justify-center gap-3">
                <a href="#" className="text-text-tertiary hover:text-blue-600 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-text-tertiary hover:text-blue-600 transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto text-center" padding="lg">
          <h2 className="text-2xl font-varsity font-bold text-text-primary mb-4">
            We're Just Getting Started
          </h2>
          <p className="text-text-secondary mb-6">
            Want to help bring EventFit to your campus? We're looking for campus ambassadors and
            early adopters to help shape the platform.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Get Involved
            </Button>
          </Link>
        </Card>
      </section>

      <Footer
        links={[
          { label: 'Terms', href: '/terms' },
          { label: 'Privacy', href: '/privacy' },
          { label: 'How It Works', href: '/how-it-works' },
          { label: 'Contact', href: '/contact' },
        ]}
        copyright={`© ${new Date().getFullYear()} EventFit. All rights reserved.`}
      />
    </div>
  );
}
