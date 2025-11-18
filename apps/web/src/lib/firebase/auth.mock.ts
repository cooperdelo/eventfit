/**
 * Mock Firebase Auth functions for design/mock data phase
 * TODO: Replace with real Firebase auth.ts when integrating Firebase
 */

/**
 * Mock sign up function - simulates account creation
 */
export async function signUp(email: string, password: string, displayName: string): Promise<void> {
  // Mock validation
  if (!email.endsWith('.edu')) {
    throw new Error('Please use your school email (.edu)');
  }
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock success - in production this would create a Firebase user
  console.log('Mock sign up:', { email, displayName });
}

/**
 * Mock sign in function - simulates login
 */
export async function signIn(email: string, password: string): Promise<void> {
  // Mock validation
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock success - in production this would authenticate with Firebase
  console.log('Mock sign in:', { email });
}

/**
 * Mock logout function
 */
export async function logout(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  console.log('Mock logout');
}

/**
 * Mock password reset function
 */
export async function resetPassword(email: string): Promise<void> {
  if (!email.endsWith('.edu')) {
    throw new Error('Please use your school email (.edu)');
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log('Mock password reset:', { email });
}
