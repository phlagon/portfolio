'use client';

/**
 * Global Polyfills
 * Promise.withResolvers is required by newer versions of PDF.js.
 */
if (typeof Promise.withResolvers === 'undefined') {
  if (typeof window !== 'undefined') {
    // @ts-expect-error - Polyfilling modern JS feature
    Promise.withResolvers = function <T>() {
      let resolve!: (value: T | PromiseLike<T>) => void;
      let reject!: (reason?: any) => void;
      const promise = new Promise<T>((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
  }
}

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
