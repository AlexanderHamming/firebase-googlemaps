import { CollectionReference, onSnapshot, query, QueryConstraint } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Restaurant } from "../types/User.types";

const useGetCollection = (
  colRef: CollectionReference<Restaurant>,
  ...queryConstraints: QueryConstraint[]
) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<(Restaurant & { id: string })[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const queryRef = query(colRef, ...queryConstraints);

    const unsubscribe = onSnapshot(
      queryRef,
      (snapshot) => {
        const docsData = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(docsData as (Restaurant & { id: string })[]);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [colRef, ...queryConstraints]);

  return { data, loading, error };
};

export default useGetCollection;
