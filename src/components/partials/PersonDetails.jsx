import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloadperson, removeperson } from '../../store/actions/personActions';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Facebook, Instagram, Twitter, Cake, MapPin, User } from 'lucide-react';
import Loading from '../Loading';
import Dropdown from './Dropdown';
import noimage from '/no_image.webp';

const InfoRow = ({ label, value }) => (
  <div className="py-2 border-b border-white/5 last:border-0">
    <p className="text-[11px] uppercase tracking-wider text-zinc-500">{label}</p>
    <p className="mt-0.5 text-sm text-zinc-200">{value || '—'}</p>
  </div>
);

const PersonDetails = () => {
  const navigate = useNavigate();
  const { info } = useSelector((s) => s.person);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState('movie');

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => { dispatch(removeperson()); };
  }, [id, dispatch]);

  if (!info) return <Loading label="Fetching profile…" />;

  const d = info.detail;
  const ext = info.externalid || {};
  const profile = d.profile_path ? `https://image.tmdb.org/t/p/h632${d.profile_path}` : noimage;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-6" data-testid="person-details-page">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} aria-label="Back" className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-200" data-testid="person-back-btn">
          <ArrowLeft size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[clamp(200px,28vw,300px)_1fr] gap-6 sm:gap-10">
        {/* Left */}
        <motion.aside initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="md:sticky md:top-24 self-start">
          <div className="rounded-2xl overflow-hidden border border-white/10 mx-auto md:mx-0 max-w-[260px] md:max-w-none shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
            <img src={profile} alt={d.name} className="w-full h-auto object-cover" />
          </div>

          <div className="mt-4 flex items-center justify-center md:justify-start gap-4 text-zinc-300">
            {ext.wikidata_id && <a aria-label="Wikidata" href={`https://www.wikidata.org/wiki/${ext.wikidata_id}`} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full bg-white/5 border border-white/10 hover:border-[#ef3e54]/40 flex items-center justify-center"><Globe size={15} /></a>}
            {ext.facebook_id && <a aria-label="Facebook" href={`https://www.facebook.com/${ext.facebook_id}`} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full bg-white/5 border border-white/10 hover:border-[#ef3e54]/40 flex items-center justify-center"><Facebook size={15} /></a>}
            {ext.instagram_id && <a aria-label="Instagram" href={`https://www.instagram.com/${ext.instagram_id}`} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full bg-white/5 border border-white/10 hover:border-[#ef3e54]/40 flex items-center justify-center"><Instagram size={15} /></a>}
            {ext.twitter_id && <a aria-label="Twitter" href={`https://www.x.com/${ext.twitter_id}`} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full bg-white/5 border border-white/10 hover:border-[#ef3e54]/40 flex items-center justify-center"><Twitter size={15} /></a>}
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-2"><User size={14} /> Personal info</h3>
            <InfoRow label="Known for" value={d.known_for_department} />
            <InfoRow label="Gender" value={d.gender === 1 ? 'Female' : d.gender === 2 ? 'Male' : d.gender === 3 ? 'Non-binary' : '—'} />
            <InfoRow label={<span className="flex items-center gap-1"><Cake size={11} /> Birthday</span>} value={d.birthday} />
            <InfoRow label="Deathday" value={d.deathday || 'Still alive'} />
            <InfoRow label={<span className="flex items-center gap-1"><MapPin size={11} /> Place of birth</span>} value={d.place_of_birth} />
            {d.also_known_as?.length > 0 && <InfoRow label="Also known as" value={d.also_known_as.slice(0, 5).join(', ')} />}
          </div>
        </motion.aside>

        {/* Right */}
        <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <h1 className="font-cinema text-glow text-white leading-[0.95]" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }} data-testid="person-name">
            {d.name}
          </h1>
          {d.biography && (
            <>
              <h3 className="mt-5 text-zinc-300 uppercase text-[11px] tracking-[0.2em] font-semibold">Biography</h3>
              <p className="mt-2 text-sm sm:text-base text-zinc-200 leading-relaxed whitespace-pre-line">{d.biography}</p>
            </>
          )}

          {/* Known for */}
          {info.combinedCredits?.cast?.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-6 w-1 rounded-full bg-gradient-to-b from-[#ef3e54] to-[#c9304a]" />
                <h2 className="text-xl font-bold text-white">Known for</h2>
              </div>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
                {[...info.combinedCredits.cast].sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, 12).map((c) => {
                  const media = c.media_type || (c.first_air_date ? 'tv' : 'movie');
                  return (
                    <Link key={`${c.id}-${c.credit_id}`} to={`/${media}/details/${c.id}`} className="shrink-0 w-[130px] sm:w-[150px] group">
                      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-white/[0.04] border border-white/10 group-hover:border-[#ef3e54]/40 transition-colors">
                        <img src={c.poster_path ? `https://image.tmdb.org/t/p/w300${c.poster_path}` : noimage} alt={c.title || c.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                      </div>
                      <p className="mt-2 text-sm font-semibold text-white line-clamp-1">{c.title || c.name}</p>
                      <p className="text-[11px] text-zinc-500 line-clamp-1">{c.character || '—'}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Filmography */}
          <div className="mt-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="h-6 w-1 rounded-full bg-gradient-to-b from-[#ef3e54] to-[#c9304a]" />
                <h2 className="text-xl font-bold text-white">Filmography</h2>
              </div>
              <Dropdown title="Category" value={category} options={['movie', 'tv']} func={(e) => setCategory(e.target.value)} />
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] divide-y divide-white/5 max-h-[60vh] overflow-y-auto">
              {info[category + 'Credits']?.cast?.length > 0 ? info[category + 'Credits'].cast.map((c, i) => (
                <Link key={`${c.id}-${c.credit_id || i}`} to={`/${category}/details/${c.id}`} className="block px-4 py-3 hover:bg-white/5 transition-colors">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{c.title || c.name || c.original_title || c.original_name}</p>
                      {c.character && <p className="text-[11px] text-zinc-500 truncate">as {c.character}</p>}
                    </div>
                    <p className="text-[11px] text-zinc-500 shrink-0">{(c.release_date || c.first_air_date || '').split('-')[0]}</p>
                  </div>
                </Link>
              )) : (
                <p className="px-4 py-6 text-sm text-zinc-500">No credits found.</p>
              )}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default PersonDetails;
