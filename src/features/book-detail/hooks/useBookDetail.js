import { useEffect, useMemo, useState } from 'react';

export default function useBookDetail(bookId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dataUrl = useMemo(() => {
    if (!bookId) return null;
    return `/data/book-detail/${bookId}.json`;
  }, [bookId]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!dataUrl) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(dataUrl, { headers: { 'Accept': 'application/json' } });
        if (!res.ok) {
          throw new Error(`Failed to load book detail: ${res.status}`);
        }
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [dataUrl]);

  return { data, loading, error };
}


