import { useState, useEffect } from "react";
import { fetchEntries } from "../api/entriesAPI";
import { useCallback } from "react";

export const useInfiniteEntries = () => {
  const [list, setList] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

const loadMore = useCallback(async () => {
  if (!hasMore || loading) return;
  setLoading(true);

  const res = await fetchEntries(cursor, 20);
  const { entries, nextCursor, hasMore: newHasMore } = res.data;

  // De-dupe
  setList(prev => {
    const ids = new Set(prev.map(i => i.id));
    const unique = entries.filter(i => !ids.has(i.id));
    return [...prev, ...unique];
  });

  setCursor(nextCursor);
  setHasMore(newHasMore);
  setLoading(false);
}, [cursor, hasMore, loading]);

useEffect(() => {
  loadMore();
}, [loadMore]);


  return { list, loadMore, hasMore, loading };
};
