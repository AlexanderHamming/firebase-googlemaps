import { CollectionReference, getDocs, query, QueryConstraint } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

const useGetCollection = <T>(
  colRef: CollectionReference<T>,
  ...queryConstraints: QueryConstraint[]
) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<(T & { id: string })[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const queryRef = query(colRef, ...queryConstraints);
      const snapshot = await getDocs(queryRef);

      const data = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as (T & { id: string })[];

      setData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, [colRef]);

  useEffect(() => {
    getData();
  }, [getData]);

  return {
    data,
    getData,
    loading,
    error,
  };
};

export default useGetCollection;
