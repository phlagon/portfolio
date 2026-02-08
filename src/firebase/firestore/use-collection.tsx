'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  onSnapshot,
  Query,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function useCollection<T>(query: Query<DocumentData> | null) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setData(null);
      setLoading(false);
      return;
    }
    setLoading(true);

    const unsubscribe = onSnapshot(
      query,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const data: T[] = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as unknown as T)
        );
        setData(data);
        setLoading(false);
      },
      (error) => {
        const permissionError = new FirestorePermissionError({
          path: (query as any)._query.path.segments.join('/'),
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setLoading(false);
        setData(null);
      }
    );

    return () => unsubscribe();
  }, [query]);

  return { data, loading };
}
