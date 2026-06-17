import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from '../utils/axios';
import Cards from './partials/Cards';
import Dropdown from './partials/Dropdown';
import PageHeader from './partials/PageHeader';
import { GridSkeleton } from './partials/Skeleton';
import { Loader2 } from 'lucide-react';

const Trending = () => {
  document.title = 'MovieLab — Trending';
  const [category, setCategory] = useState('all');
  const [duration, setDuration] = useState('day');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPage = async (p, cat, dur) => {
    const { data } = await axios.get(`/trending/${cat}/${dur}?page=${p}`);
    return data.results;
  };

  const load = async () => {
    try {
      const results = await fetchPage(page, category, duration);
      if (results.length === 0) { setHasMore(false); return; }
      setItems((prev) => [...prev, ...results]);
      setPage(page + 1);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    let cancelled = false;
    setItems([]); setPage(1); setHasMore(true);
    (async () => {
      try {
        const results = await fetchPage(1, category, duration);
        if (cancelled) return;
        setItems(results);
        setPage(2);
        setHasMore(results.length > 0);
      } catch (e) { console.error(e); }
    })();
    return () => { cancelled = true; };
  }, [category, duration]);

  return (
    <div>
      <PageHeader
        title="Trending"
        subtitle="What everyone is watching"
        right={
          <div className="hidden sm:flex items-center gap-2">
            <Dropdown title="Category" value={category} options={['movie', 'tv', 'all']} func={(e) => setCategory(e.target.value)} />
            <Dropdown title="Duration" value={duration} options={['week', 'day']} func={(e) => setDuration(e.target.value)} />
          </div>
        }
      />
      <div className="sm:hidden flex gap-2 px-4 pt-3">
        <Dropdown title="Category" value={category} options={['movie', 'tv', 'all']} func={(e) => setCategory(e.target.value)} />
        <Dropdown title="Duration" value={duration} options={['week', 'day']} func={(e) => setDuration(e.target.value)} />
      </div>
      {items.length === 0 ? (
        <GridSkeleton />
      ) : (
        <InfiniteScroll
          dataLength={items.length}
          next={load}
          hasMore={hasMore}
          loader={<div className="flex justify-center py-6 text-zinc-500"><Loader2 className="animate-spin" /></div>}
        >
          <Cards data={items} title={category === 'all' ? 'movie' : category} />
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Trending;
