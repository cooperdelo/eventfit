import Link from 'next/link';
import { Navbar, Footer, Button } from '@eventfit/ui';

/**
 * Privacy Policy Page
 * Minimal layout with legal content
 */
export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold text-text-primary mb-8">Privacy Policy</h1>
        <p className="text-sm text-text-tertiary mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-gray max-w-none space-y-6 text-text-secondary">
          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              1. Information We Collect
            </h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Account information (name, email, school)</li>
              <li>Profile information (bio, photos, preferences)</li>
              <li>Transaction information (rental history, payment details)</li>
              <li>Content you post (outfit photos, event posts, messages)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              2. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              3. Information Sharing
            </h2>
            <p>
              We do not sell your personal information. We may share your information in the
              following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                With other users as part of the service (e.g., profile information, outfit listings)
              </li>
              <li>With service providers who assist us in operating our platform</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your
              personal information. However, no method of transmission over the Internet is 100%
              secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify inaccurate or incomplete data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              6. Cookies and Tracking
            </h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our platform and
              hold certain information. You can instruct your browser to refuse all cookies or to
              indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">7. Children's Privacy</h2>
            <p>
              EventFit is intended for college students with verified .edu email addresses. We do
              not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              8. Changes to This Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@eventfit.app" className="text-blue-600 hover:text-blue-700">
                privacy@eventfit.app
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer
        links={[
          { label: 'Terms', href: '/terms' },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ]}
        copyright={`© ${new Date().getFullYear()} EventFit. All rights reserved.`}
      />
    </div>
  );
}
