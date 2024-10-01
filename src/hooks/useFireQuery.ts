import { Query, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useFireQuery = <T>(
  query: Query<T>,
  realTime: boolean = false
) => {
  const [data, setData] = useState<{ id: string; data: T }[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      try {
        setLoading(true);

        if (realTime) {
          const unsubscribe = onSnapshot(query, (snapshot) => {
            const results = snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data() as T,
            }));
            setData(results);
            setLoading(false);
          }, (error) => {
            setError(error);
            setLoading(false);
          });
          return () => unsubscribe();
        } else {
          const querySnapshot = await getDocs(query);
          const results = querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data() as T,
          }));
          setData(results);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [realTime, query]);

  return { data, loading, error };
};
