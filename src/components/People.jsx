import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from '../utils/axios';
import Cards from './partials/Cards';
import Dropdown from './partials/Dropdown';
import PageHeader from './partials/PageHeader';
import { GridSkeleton } from './partials/Skeleton';
import { Loader2 } from 'lucide-react';

const People = () => {
  document.title = 'MovieLab — People';
  const [category, setCategory] = useState('popular');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const load = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
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
        const { data } = await axios.get(`/person/${category}?page=1`);
        if (cancelled) return;
        setItems(data.results);
        setPage(2);
        setHasMore(data.results.length > 0);
      } catch (e) { console.error(e); }
    })();
    return () => { cancelled = true; };
  }, [category]);

  return (
    <div data-testid="people-page">
      <PageHeader
        title="People"
        subtitle="Actors, directors & creators"
        right={
          <div className="hidden sm:block">
            <Dropdown title="Category" value={category} options={['popular']} func={(e) => setCategory(e.target.value)} />
          </div>
        }
      />
      {items.length === 0 ? (
        <GridSkeleton />
      ) : (
        <InfiniteScroll
          dataLength={items.length}
          next={load}
          hasMore={hasMore}
          loader={<div className="flex justify-center py-6 text-zinc-500"><Loader2 className="animate-spin" /></div>}
        >
          <Cards data={items} title="person" />
        </InfiniteScroll>
      )}
    </div>
  );
};

export default People;
