'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * Mock User type for design/mock data phase
 * TODO: Replace with Firebase User type when integrating Firebase
 */
interface MockUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

/**
 * Mock AuthProvider for UI design phase
 * Provides mock authentication state without Firebase dependency
 * TODO: Replace with Firebase AuthProvider when integrating Firebase
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock authentication - simulate loading then set a mock user
    // In production, this will be replaced with Firebase auth
    const timer = setTimeout(() => {
      // Mock user for design purposes
      setUser({
        uid: 'mock-user-123',
        email: 'student@unc.edu',
        displayName: 'Mock Student',
        photoURL: 'https://via.placeholder.com/40',
      });
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
