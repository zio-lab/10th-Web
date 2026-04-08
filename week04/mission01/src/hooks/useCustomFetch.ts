import { useEffect, useState } from "react";
import axios from "axios";

export default function useCustomFetch<T>(
  url: string,
  params?: Record<string, string | number>
) {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!url) {
      setError(true);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      setIsPending(true);
      setError(false);

      try {
        const response = await axios.get<T>(url, {
          params,
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            "Content-Type": "application/json;charset=utf-8",
          },
          signal: controller.signal,
        });

        setData(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(true);
        }
      } finally {
        setIsPending(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, JSON.stringify(params)]);

  return { data, isPending, error };
}