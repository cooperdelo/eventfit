'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Footer, Button, Input, Card } from '@eventfit/ui';
import { Mail, Instagram, MessageSquare } from 'lucide-react';

/**
 * Contact Page
 * Reference: Reference 5 (Instagram Settings) - Form design
 */
export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      console.log('Contact form submitted:', { name, email, message });
      setIsSubmitting(false);
      alert("Thank you for your message! We'll get back to you soon.");
      setName('');
      setEmail('');
      setMessage('');
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
          <Link href="/waitlist">
            <Button variant="primary" size="md">
              Join Waitlist
            </Button>
          </Link>
        }
      />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-varsity font-bold text-text-primary mb-8 text-center">
            Get in Touch
          </h1>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card padding="lg">
              <h2 className="text-xl font-semibold text-text-primary mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Name"
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
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    required
                    className="w-full rounded-lg border border-border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card padding="lg">
                <h2 className="text-xl font-semibold text-text-primary mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-text-primary">Email</p>
                      <a
                        href="mailto:hello@eventfit.app"
                        className="text-primary hover:text-[#003d32]"
                      >
                        hello@eventfit.app
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-text-primary">Support</p>
                      <a
                        href="mailto:support@eventfit.app"
                        className="text-primary hover:text-[#003d32]"
                      >
                        support@eventfit.app
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              <Card padding="lg">
                <h2 className="text-xl font-semibold text-text-primary mb-6">Follow Us</h2>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-6 w-6 text-text-primary" />
                  </a>
                  <a
                    href="#"
                    className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    aria-label="TikTok"
                  >
                    <MessageSquare className="h-6 w-6 text-text-primary" />
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer
        links={[
          { label: 'Terms', href: '/terms' },
          { label: 'Privacy', href: '/privacy' },
          { label: 'About', href: '/about' },
          { label: 'How It Works', href: '/how-it-works' },
        ]}
        copyright={`© ${new Date().getFullYear()} EventFit. All rights reserved.`}
      />
    </div>
  );
}
