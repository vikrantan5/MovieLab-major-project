import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloadtv, removetv } from '../../store/actions/tvActions';
import { Outlet, useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  PlayCircle, ExternalLink, ArrowLeft, Star, Calendar, Globe,
  Heart, Bookmark, Share2, MapPin, Building2, Languages, Tag, Tv as TvIcon,
} from 'lucide-react';
import Loading from '../Loading';
import HorizontalCards from './HorizontalCards';
import noimage from '/no_image.webp';

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-xs text-zinc-200">{children}</span>
);

const Section = ({ title, children }) => (
  <section className="mt-10 sm:mt-14">
    <div className="flex items-center gap-3 mb-4 sm:mb-5">
      <div className="h-6 w-1 rounded-full bg-gradient-to-b from-[#ef3e54] to-[#c9304a]" />
      <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
    </div>
    {children}
  </section>
);

const TvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { info } = useSelector((s) => s.tv);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [saved, setSaved] = useState(false);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => { dispatch(removetv()); };
  }, [id, dispatch]);

  const creators = useMemo(() => info?.detail?.created_by || [], [info]);

  const handleShare = async () => {
    const url = window.location.origin + pathname;
    try {
      if (navigator.share) { await navigator.share({ title: info.detail.name, url }); }
      else { await navigator.clipboard.writeText(url); toast.success('Link copied'); }
    } catch {}
  };

  if (!info) return <Loading label="Fetching TV show…" />;

  const d = info.detail;
  const name = d.name || d.original_name;
  const year = (d.first_air_date || '').split('-')[0];
  const rating = d.vote_average ? Number(d.vote_average).toFixed(1) : null;
  const poster = d.poster_path ? `https://image.tmdb.org/t/p/w500${d.poster_path}` : noimage;
  const backdrop = d.backdrop_path ? `https://image.tmdb.org/t/p/original${d.backdrop_path}` : null;
  const imdbId = info?.externalid?.imdb_id;

  return (
    <div className="w-full" data-testid="tv-details-page">
      <div className="relative w-full overflow-hidden">
        {backdrop && (
          <div className="absolute inset-0">
            <img src={backdrop} alt="" className="w-full h-full object-cover scale-105" style={{ filter: 'blur(2px)' }} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b10] via-[#0b0b10]/85 to-[#0b0b10]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b10] via-[#0b0b10]/60 to-transparent" />

        <div className="relative px-4 sm:px-6 lg:px-10 pt-4 sm:pt-6">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate(-1)} aria-label="Back" className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-200" data-testid="tv-back-btn">
              <ArrowLeft size={16} />
            </button>
            {d.homepage && (
              <a href={d.homepage} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs sm:text-sm">
                <ExternalLink size={14} /> Homepage
              </a>
            )}
            {imdbId && (
              <a href={`https://www.imdb.com/title/${imdbId}`} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs sm:text-sm">
                <Globe size={14} /> IMDB
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[clamp(180px,28vw,320px)_1fr] gap-6 sm:gap-10 pb-10 sm:pb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto md:mx-0 max-w-[260px] md:max-w-none w-full">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
                <img src={poster} alt={name} className="w-full h-auto object-cover" />
                {rating && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur text-xs font-bold">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" /> {rating}
                  </div>
                )}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <button onClick={() => { setSaved(!saved); toast.success(saved ? 'Removed' : 'Added to watchlist'); }} className={`rounded-xl border px-3 py-2.5 text-xs flex flex-col items-center gap-1 transition-colors ${saved ? 'border-[#ef3e54]/50 bg-[#ef3e54]/10 text-white' : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/20'}`} data-testid="tv-watchlist-btn">
                  <Bookmark size={16} className={saved ? 'fill-[#ef3e54] text-[#ef3e54]' : ''} />
                  Watchlist
                </button>
                <button onClick={() => { setFav(!fav); toast.success(fav ? 'Removed' : 'Added to favorites'); }} className={`rounded-xl border px-3 py-2.5 text-xs flex flex-col items-center gap-1 transition-colors ${fav ? 'border-pink-500/50 bg-pink-500/10 text-white' : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/20'}`} data-testid="tv-favorite-btn">
                  <Heart size={16} className={fav ? 'fill-pink-500 text-pink-500' : ''} />
                  Favorite
                </button>
                <button onClick={handleShare} className="rounded-xl border border-white/10 bg-white/[0.03] hover:border-white/20 px-3 py-2.5 text-xs flex flex-col items-center gap-1 text-zinc-300" data-testid="tv-share-btn">
                  <Share2 size={16} /> Share
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}>
              <h1 className="font-cinema text-glow text-white leading-[0.95]" style={{ fontSize: 'clamp(2rem, 6.2vw, 4.6rem)' }} data-testid="tv-title">
                {name} {year && <small className="text-zinc-300 font-cinema" style={{ fontSize: 'clamp(1rem, 2.4vw, 1.6rem)' }}>({year})</small>}
              </h1>

              {d.tagline && <p className="mt-2 sm:mt-3 italic text-zinc-300 text-sm sm:text-base">“{d.tagline}”</p>}

              <div className="mt-4 flex flex-wrap gap-2">
                {d.first_air_date && <Pill><Calendar size={12} /> {d.first_air_date}</Pill>}
                {d.number_of_seasons ? <Pill><TvIcon size={12} /> {d.number_of_seasons} {d.number_of_seasons === 1 ? 'Season' : 'Seasons'}</Pill> : null}
                {d.number_of_episodes ? <Pill>{d.number_of_episodes} Episodes</Pill> : null}
                {d.original_language && <Pill><Languages size={12} /> {d.original_language?.toUpperCase()}</Pill>}
                {d.status && <Pill>{d.status}</Pill>}
              </div>

              {d.genres?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {d.genres.map((g) => (
                    <span key={g.id} className="text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#ef3e54]/30 bg-[#ef3e54]/10 text-[#ef3e54] font-semibold">{g.name}</span>
                  ))}
                </div>
              )}

              {d.overview && (
                <>
                  <h3 className="mt-6 text-zinc-300 uppercase text-[11px] tracking-[0.2em] font-semibold">Overview</h3>
                  <p className="mt-2 text-sm sm:text-base text-zinc-200 leading-relaxed max-w-3xl">{d.overview}</p>
                </>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={`${pathname}/trailer`} className="btn-primary text-sm sm:text-base" data-testid="tv-watch-trailer-btn">
                  <PlayCircle size={18} /> Watch Trailer
                </Link>
              </div>

              <div className="mt-6 space-y-3">
                {info.watchproviders?.flatrate && (
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs text-zinc-400 uppercase tracking-wider">Stream on</span>
                    {info.watchproviders.flatrate.map((w) => (
                      <img key={w.provider_id} title={w.provider_name} src={`https://image.tmdb.org/t/p/original${w.logo_path}`} alt={w.provider_name} className="w-9 h-9 rounded-md object-cover border border-white/10" />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-10 pb-16">
        <Section title="Show facts">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {creators.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[11px] uppercase tracking-wider text-zinc-500 flex items-center gap-1.5"><Tag size={11}/> Created by</p>
                <p className="mt-1 text-sm font-semibold text-white line-clamp-2">{creators.map((c) => c.name).join(', ')}</p>
              </div>
            )}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[11px] uppercase tracking-wider text-zinc-500">First air date</p>
              <p className="mt-1 text-sm font-semibold text-white">{d.first_air_date || '—'}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[11px] uppercase tracking-wider text-zinc-500">Last air date</p>
              <p className="mt-1 text-sm font-semibold text-white">{d.last_air_date || '—'}</p>
            </div>
            {d.networks?.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[11px] uppercase tracking-wider text-zinc-500">Network</p>
                <p className="mt-1 text-sm font-semibold text-white line-clamp-2">{d.networks.map((n) => n.name).join(', ')}</p>
              </div>
            )}
            {d.production_countries?.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[11px] uppercase tracking-wider text-zinc-500 flex items-center gap-1.5"><MapPin size={11}/> Countries</p>
                <p className="mt-1 text-sm font-semibold text-white line-clamp-2">{d.production_countries.map((c) => c.name).join(', ')}</p>
              </div>
            )}
            {d.production_companies?.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 col-span-2">
                <p className="text-[11px] uppercase tracking-wider text-zinc-500 flex items-center gap-1.5"><Building2 size={11}/> Production</p>
                <p className="mt-1 text-sm font-semibold text-white line-clamp-2">{d.production_companies.map((c) => c.name).join(', ')}</p>
              </div>
            )}
          </div>
        </Section>

        {/* Seasons */}
        {d.seasons?.length > 0 && (
          <Section title="Seasons">
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
              {d.seasons.map((s) => (
                <div key={s.id} className="shrink-0 w-[150px] sm:w-[170px]">
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-white/[0.04] border border-white/10">
                    <img src={s.poster_path ? `https://image.tmdb.org/t/p/w300${s.poster_path}` : noimage} alt={s.name} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white line-clamp-1">{s.name}</p>
                  <p className="text-[11px] text-zinc-500">{s.episode_count} eps {s.air_date && `· ${s.air_date.split('-')[0]}`}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {info.credits?.cast?.length > 0 && (
          <Section title="Top cast">
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
              {info.credits.cast.slice(0, 18).map((c) => (
                <Link key={c.id} to={`/person/details/${c.id}`} className="shrink-0 w-[120px] sm:w-[140px] group">
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-white/[0.04] border border-white/10 group-hover:border-[#ef3e54]/40 transition-colors">
                    <img src={c.profile_path ? `https://image.tmdb.org/t/p/w300${c.profile_path}` : noimage} alt={c.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white line-clamp-1">{c.name}</p>
                  <p className="text-[11px] text-zinc-500 line-clamp-1">{c.character}</p>
                </Link>
              ))}
            </div>
          </Section>
        )}

        {(info.recommendations?.length > 0 || info.similar?.length > 0) && (
          <Section title="Related shows">
            <HorizontalCards data={info.recommendations?.length > 0 ? info.recommendations : info.similar} title="tv" />
          </Section>
        )}
      </div>

      <Outlet />
    </div>
  );
};

export default TvDetails;
