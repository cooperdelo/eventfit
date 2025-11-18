'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Footer, Button, Input, Card } from '@eventfit/ui';
import { Mail, CheckCircle2 } from 'lucide-react';

/**
 * Waitlist Page
 * Public page for users to join the waitlist
 */
export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API call - in production, this would send to your backend/Azure Function
    setTimeout(() => {
      console.log('Waitlist form submitted:', { name, email, school });
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
      setName('');
      setSchool('');
    }, 1000);
  };

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

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-varsity font-bold text-text-primary mb-4">
              Join the Waitlist
            </h1>
            <p className="text-lg text-text-secondary">
              Be among the first to experience EventFit when we launch at your campus.
            </p>
          </div>

          {isSubmitted ? (
            <Card padding="lg" className="text-center">
              <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-varsity font-bold text-text-primary mb-2">
                You're on the list!
              </h2>
              <p className="text-text-secondary mb-6">
                We'll notify you as soon as EventFit launches at your school. In the meantime, check
                out how it works or get in touch with us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/how-it-works">
                  <Button variant="outline" size="md">
                    Learn More
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="primary" size="md">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <Card padding="lg">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-text-primary">Get Early Access</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Full Name"
                  value={name}
                  onChange={setName}
                  required
                  placeholder="Your name"
                />
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  required
                  placeholder="your.email@university.edu"
                />
                <Input
                  label="School"
                  value={school}
                  onChange={setSchool}
                  required
                  placeholder="Your university name"
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Join Waitlist
                </Button>
                <p className="text-sm text-text-tertiary text-center">
                  By joining, you agree to receive updates about EventFit. We respect your privacy.
                </p>
              </form>
            </Card>
          )}

          {/* Benefits Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card className="text-center" padding="md">
              <h3 className="font-semibold text-text-primary mb-2">Early Access</h3>
              <p className="text-sm text-text-secondary">
                Be among the first to use EventFit when we launch
              </p>
            </Card>
            <Card className="text-center" padding="md">
              <h3 className="font-semibold text-text-primary mb-2">Exclusive Updates</h3>
              <p className="text-sm text-text-secondary">
                Get notified about new features and campus launches
              </p>
            </Card>
            <Card className="text-center" padding="md">
              <h3 className="font-semibold text-text-primary mb-2">Shape the Platform</h3>
              <p className="text-sm text-text-secondary">
                Your feedback helps us build EventFit for students like you
              </p>
            </Card>
          </div>
        </div>
      </main>

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
