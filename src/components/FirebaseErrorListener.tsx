'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';

export function FirebaseErrorListener() {
  useEffect(() => {
    const handlePermissionError = (error: Error) => {
      if (process.env.NODE_ENV === 'development') {
        // In development, we want to see the rich error overlay.
        throw error;
      } else {
        // In production, you might log this to a service.
        console.error(error);
      }
    };

    errorEmitter.on('permission-error', handlePermissionError);

  }, []);

  return null;
}
