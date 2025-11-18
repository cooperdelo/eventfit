'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Input, Card } from '@eventfit/ui';
import { signUp } from '../../lib/firebase/auth.mock';
import { validateEduEmail, extractSchoolFromEmail } from '@eventfit/lib';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEduEmail(email)) {
      setError('Please use your school email (.edu)');
      return;
    }
    setError('');
    setStep(2);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setStep(3);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signUp(email, password, name);
      // TODO: Save profile data (bio, school) to Firestore
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
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
          Create your EventFit account
        </h1>

        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <Input
              label="School Email"
              type="email"
              value={email}
              onChange={setEmail}
              required
              error={error}
              placeholder="your.email@university.edu"
              helperText="We'll verify your school email"
            />
            <Button type="submit" variant="primary" size="lg" className="w-full">
              Continue
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              required
              error={error}
              helperText="At least 8 characters"
            />
            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              required
              error={error}
            />
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                Back
              </Button>
              <Button type="submit" variant="primary" className="flex-1">
                Continue
              </Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <Input
              label="Full Name"
              value={name}
              onChange={setName}
              required
              placeholder="John Doe"
            />
            <Input
              label="Bio"
              value={bio}
              onChange={setBio}
              maxLength={150}
              showCharCount
              placeholder="Tell us about yourself..."
              helperText="Optional"
            />
            <div className="text-sm text-text-secondary">
              <p>School: {extractSchoolFromEmail(email) || 'Unknown'}</p>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setStep(2)}
                className="flex-1"
              >
                Back
              </Button>
              <Button type="submit" variant="primary" className="flex-1" loading={loading}>
                Create Account
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
