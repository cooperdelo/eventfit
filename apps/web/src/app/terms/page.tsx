import Link from 'next/link';
import { Navbar, Footer, Button } from '@eventfit/ui';

/**
 * Terms of Service Page
 * Minimal layout with legal content
 */
export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar
        links={[
          { label: 'About', href: '/about' },
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

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-text-primary mb-8">Terms of Service</h1>
        <p className="text-sm text-text-tertiary mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-gray max-w-none space-y-6 text-text-secondary">
          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using EventFit, you accept and agree to be bound by the terms and
              provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily use EventFit for personal, non-commercial
              transitory viewing only. This is the grant of a license, not a transfer of title, and
              under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to reverse engineer any software contained on EventFit</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">3. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account and password.
              You agree to accept responsibility for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              4. Rental Transactions
            </h2>
            <p>
              EventFit facilitates peer-to-peer rental transactions. We are not a party to rental
              agreements between users. All rental transactions are subject to our Rental Terms and
              Conditions, which include escrow protection, return policies, and dispute resolution
              procedures.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">5. Payment Processing</h2>
            <p>
              Payments are processed through Stripe Connect. EventFit uses escrow to protect both
              renters and lenders. Funds are held until rental completion and return confirmation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              6. Content and Intellectual Property
            </h2>
            <p>
              You retain ownership of content you post on EventFit. By posting content, you grant
              EventFit a non-exclusive, worldwide, royalty-free license to use, display, and
              distribute your content on the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">7. Prohibited Uses</h2>
            <p>You may not use EventFit:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>In any way that violates any applicable law or regulation</li>
              <li>To transmit any malicious code or viruses</li>
              <li>To impersonate or attempt to impersonate another user</li>
              <li>To engage in any fraudulent activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              8. Limitation of Liability
            </h2>
            <p>
              EventFit shall not be liable for any indirect, incidental, special, consequential, or
              punitive damages resulting from your use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">9. Changes to Terms</h2>
            <p>
              EventFit reserves the right to modify these terms at any time. We will notify users of
              any material changes via email or platform notification.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              10. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:legal@eventfit.app" className="text-blue-600 hover:text-blue-700">
                legal@eventfit.app
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer
        links={[
          { label: 'Privacy', href: '/privacy' },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ]}
        copyright={`© ${new Date().getFullYear()} EventFit. All rights reserved.`}
      />
    </div>
  );
}
