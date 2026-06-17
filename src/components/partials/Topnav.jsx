import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';
import { Search, X, Loader2 } from 'lucide-react';
import noimage from '/no_image.webp';

const Topnav = ({ compact = false }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const { data } = await axios.get(`/search/multi?query=${encodeURIComponent(query)}`);
        setResults(data.results.filter((r) => r.media_type !== 'unknown'));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 280);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className="flex items-center gap-2 px-3 sm:px-4 h-11 sm:h-12 rounded-full bg-white/5 border border-white/10 focus-within:border-[#ef3e54]/60 transition-colors">
        <Search size={18} className="text-zinc-400 shrink-0" />
        <input
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          type="text"
          placeholder="Search movies, shows, people…"
          aria-label="Search"
          className="flex-1 bg-transparent outline-none text-sm sm:text-base text-zinc-100 placeholder:text-zinc-500 min-w-0"
        />
        {loading && <Loader2 size={16} className="text-zinc-400 animate-spin shrink-0" />}
        {query && !loading && (
          <button onClick={() => { setQuery(''); setResults([]); }} aria-label="Clear" className="text-zinc-400 hover:text-white shrink-0">
            <X size={16} />
          </button>
        )}
      </div>

      {open && query && (
        <div className="absolute z-50 left-0 right-0 mt-2 max-h-[60vh] overflow-y-auto rounded-xl border border-white/10 bg-[#14141c]/98 backdrop-blur-xl shadow-2xl">
          {results.length === 0 && !loading && (
            <p className="p-4 text-sm text-zinc-500">No results</p>
          )}
          {results.map((s) => (
            <Link
              key={`${s.media_type}-${s.id}`}
              to={`/${s.media_type}/details/${s.id}`}
              onClick={() => { setOpen(false); setQuery(''); }}
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 border-b border-white/5 last:border-0"
            >
              <img
                src={s.poster_path || s.profile_path || s.backdrop_path
                  ? `https://image.tmdb.org/t/p/w92${s.poster_path || s.profile_path || s.backdrop_path}`
                  : noimage}
                alt=""
                className="w-10 h-14 sm:w-12 sm:h-16 object-cover rounded-md bg-white/5 shrink-0"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {s.name || s.title || s.original_name || s.original_title}
                </p>
                <p className="text-xs text-zinc-500 uppercase tracking-wider">{s.media_type}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Topnav;
