import { useState, useEffect } from "react";
import { fetchEntries } from "../api/entriesAPI";

export const useInfiniteEntries = () => {
  const [list, setList] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (!hasMore || loading) return;
    setLoading(true);

    const res = await fetchEntries(cursor, 20);
    const { entries, nextCursor, hasMore: newHasMore } = res.data;

    setList((prev) => [...prev, ...entries]);
    setCursor(nextCursor);
    setHasMore(newHasMore);
    setLoading(false);
  };

  useEffect(() => {
    loadMore();
  }, []);

  return { list, loadMore, hasMore, loading };
};
