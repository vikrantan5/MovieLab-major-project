import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import Header from './partials/Header';
import HorizontalCards from './partials/HorizontalCards';
import PageHeader from './partials/PageHeader';
import Dropdown from './partials/Dropdown';
import { HeroSkeleton, HorizontalSkeleton } from './partials/Skeleton';
import { motion } from 'framer-motion';
import { Flame, Award, Tv, Film } from 'lucide-react';
import { Link } from 'react-router-dom';

const Section = ({ title, icon: Icon, children, viewAll }) => (
  <section className="mt-2">
    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 pt-6 pb-1">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={18} className="text-[#ef3e54]" />}
        <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
      </div>
      {viewAll && (
        <Link to={viewAll} className="text-xs sm:text-sm text-zinc-400 hover:text-white">View all →</Link>
      )}
    </div>
    {children}
  </section>
);

const Home = () => {
  document.title = 'MovieLab — Discover Cinema';
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [popularMovies, setPopularMovies] = useState(null);
  const [popularTv, setPopularTv] = useState(null);
  const [topRated, setTopRated] = useState(null);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/trending/all/day');
        const idx = Math.floor(Math.random() * Math.min(data.results.length, 8));
        setWallpaper(data.results[idx]);
      } catch (e) { console.error(e); }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/trending/${category}/day`);
        setTrending(data.results);
      } catch (e) { console.error(e); }
    })();
  }, [category]);

  useEffect(() => {
    (async () => {
      try {
        const [pm, pt, tr] = await Promise.all([
          axios.get('/movie/popular'),
          axios.get('/tv/popular'),
          axios.get('/movie/top_rated'),
        ]);
        setPopularMovies(pm.data.results);
        setPopularTv(pt.data.results);
        setTopRated(tr.data.results);
      } catch (e) { console.error(e); }
    })();
  }, []);

  return (
    <div className="w-full">
      <PageHeader title="MovieLab" subtitle="Cinema Universe" showBack={false} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        {wallpaper ? <Header data={wallpaper} /> : <HeroSkeleton />}
      </motion.div>

      <Section title="Trending" icon={Flame} viewAll="/trending">
        <div className="px-4 sm:px-6 lg:px-8 -mt-1">
          <Dropdown title="Filter" options={['all', 'movie', 'tv']} func={(e) => setCategory(e.target.value)} />
        </div>
        {trending ? <HorizontalCards data={trending} /> : <HorizontalSkeleton />}
      </Section>

      <Section title="Popular Movies" icon={Film} viewAll="/popular">
        {popularMovies ? <HorizontalCards data={popularMovies} title="movie" /> : <HorizontalSkeleton />}
      </Section>

      <Section title="Popular TV Shows" icon={Tv} viewAll="/tvshows">
        {popularTv ? <HorizontalCards data={popularTv} title="tv" /> : <HorizontalSkeleton />}
      </Section>

      <Section title="Top Rated" icon={Award} viewAll="/movie">
        {topRated ? <HorizontalCards data={topRated} title="movie" /> : <HorizontalSkeleton />}
      </Section>

      <div className="h-10" />
    </div>
  );
};

export default Home;
