import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  UserCredential,
} from 'firebase/auth';
import { auth } from './config';
import { validateEduEmail } from '@eventfit/lib';

/**
 * Firebase Auth helpers
 */
export async function signUp(
  email: string,
  password: string,
  displayName: string
): Promise<UserCredential> {
  if (!validateEduEmail(email)) {
    throw new Error('Please use your school email (.edu)');
  }
  return createUserWithEmailAndPassword(auth, email, password).then((credential) => {
    if (displayName) {
      updateProfile(credential.user, { displayName });
    }
    return credential;
  });
}

export async function signIn(email: string, password: string): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logout(): Promise<void> {
  return signOut(auth);
}

export async function resetPassword(email: string): Promise<void> {
  return sendPasswordResetEmail(auth, email);
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}
