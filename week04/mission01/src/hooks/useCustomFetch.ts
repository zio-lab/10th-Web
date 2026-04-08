import { useEffect, useState } from "react";
import axios from "axios";

export default function useCustomFetch<T>(
  url: string,
  params?: Record<string, string | number>
) {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!url) {
      setError(true);
      setIsPending(false);
      return;
    }

    const source = axios.CancelToken.source();

    const fetchData = async () => {
      setIsPending(true);
      setError(false);

      try {
        const response = await axios.get<T>(url, {
          params,
          cancelToken: source.token,
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            "Content-Type": "application/json;charset=utf-8",
          },
        });

        setData(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(true);
        }
      } finally {
        if (!source.token.reason) {
          setIsPending(false);
        }
      }
    };

    fetchData();

    return () => {
      source.cancel("요청이 취소되었습니다.");
    };
  }, [url, params]);

  return { data, isPending, error };
}