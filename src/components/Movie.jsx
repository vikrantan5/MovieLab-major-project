import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from '../utils/axios';
import Cards from './partials/Cards';
import Dropdown from './partials/Dropdown';
import PageHeader from './partials/PageHeader';
import { GridSkeleton } from './partials/Skeleton';
import { Loader2 } from 'lucide-react';

const Movie = () => {
  document.title = 'MovieLab — Movies';
  const [category, setCategory] = useState('now_playing');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const load = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      if (data.results.length === 0) { setHasMore(false); return; }
      setItems((p) => [...p, ...data.results]);
      setPage(page + 1);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    let cancelled = false;
    setItems([]); setPage(1); setHasMore(true);
    (async () => {
      try {
        const { data } = await axios.get(`/movie/${category}?page=1`);
        if (cancelled) return;
        setItems(data.results); setPage(2);
        setHasMore(data.results.length > 0);
      } catch (e) { console.error(e); }
    })();
    return () => { cancelled = true; };
  }, [category]);

  return (
    <div>
      <PageHeader
        title="Movies"
        subtitle={category.replace('_', ' ')}
        right={
          <div className="hidden sm:block">
            <Dropdown title="Category" value={category} options={['popular', 'top_rated', 'upcoming', 'now_playing']} func={(e) => setCategory(e.target.value)} />
          </div>
        }
      />
      <div className="sm:hidden px-4 pt-3">
        <Dropdown title="Category" value={category} options={['popular', 'top_rated', 'upcoming', 'now_playing']} func={(e) => setCategory(e.target.value)} />
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
          <Cards data={items} title="movie" />
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Movie;
