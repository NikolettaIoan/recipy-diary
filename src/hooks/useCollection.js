import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { db } from '../firebase/config';

export const useCollection = (c, _q) => {
  const [documents, setDocuments] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  //set query
  const q = useRef(_q).current;

  useEffect(() => {
    setIsPending(true);
    let ref = collection(db, c);

    if (q) {
      ref = query(ref, where(...q));
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      if (snapshot.empty) {
        setError('No recipes to load');
        setIsPending(false);
      } else {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(results);
        setIsPending(false);
      }
    });

    return () => unsub();
  }, [c, q]);

  return { documents, error, isPending };
};
