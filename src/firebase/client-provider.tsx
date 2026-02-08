'use client';

import { FirebaseProvider } from './provider';
import { initializeFirebase } from './index';

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const firebase = initializeFirebase();

  if (!firebase) {
    throw new Error('Firebase not initialized');
  }

  return <FirebaseProvider value={firebase}>{children}</FirebaseProvider>;
}
