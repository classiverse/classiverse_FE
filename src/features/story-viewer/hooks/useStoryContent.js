import { useEffect, useState } from 'react';

export default function useStoryContent(dataUrl) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!dataUrl) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(dataUrl, { headers: { 'Accept': 'application/json' } });
        if (!res.ok) {
          throw new Error(`Failed to load story content: ${res.status}`);
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

