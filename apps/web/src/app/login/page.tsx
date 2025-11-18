'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Input, Card } from '@eventfit/ui';
import { signIn } from '../../lib/firebase/auth.mock';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md" padding="lg">
        <div className="flex justify-center mb-6">
          <Link href="/">
            <Image
              src="/logo-full.png"
              alt="EventFit"
              width={180}
              height={72}
              className="h-16 w-auto"
              priority
            />
          </Link>
        </div>
        <h1 className="text-2xl font-varsity font-bold text-text-primary mb-6 text-center">
          Log in to EventFit
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            required
            error={error}
            placeholder="your.email@university.edu"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            required
            error={error}
          />
          <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
            Log in
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Link
            href="/signup"
            className="text-sm text-primary hover:text-[#003d32] transition-colors"
          >
            Don't have an account? Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
}
