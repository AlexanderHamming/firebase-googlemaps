import { useState, useEffect, useRef } from "react";
import { Query, getDocs, onSnapshot } from "firebase/firestore";

export const useFireQuery = <T>(
  query: Query<T>,
  realTime: boolean = false
) => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const queryRef = useRef(query);

  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      try {
        setLoading(true);

        if (realTime) {
          const unsubscribe = onSnapshot(queryRef.current, (snapshot) => {
            const results: T[] = snapshot.docs.map((doc) => doc.data() as T);
            setData(results);
            setLoading(false);
          }, (error) => {
            setError(error);
            setLoading(false);
          });
          return () => unsubscribe();
        } else {
          const querySnapshot = await getDocs(queryRef.current);
          const results: T[] = querySnapshot.docs.map((doc) => doc.data() as T);
          setData(results);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [realTime]);

  return { data, loading, error };
};