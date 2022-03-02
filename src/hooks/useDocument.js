import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useDocument = (id, collect) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const unsub = onSnapshot(doc(db, collect, id), (doc) => {
      if (doc.exists) {
        setIsPending(false);
        setData(doc.data());
      } else {
        setIsPending(false);
        setError('Could not find that recipe');
      }
    });

    return () => unsub();
  }, [id, collect]);

  return { data, isPending, error };
};
