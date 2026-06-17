import { Link } from 'react-router-dom';
import { PlayCircle, Info, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ data }) => {
  if (!data) return null;
  const name = data.name || data.title || data.original_name || data.original_title;
  const detailPath = `/${data.media_type}/details/${data.id}`;
  const trailerPath = `${detailPath}/trailer`;
  const rating = data.vote_average ? Number(data.vote_average).toFixed(1) : null;

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path || data.profile_path})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b10] via-[#0b0b10]/70 to-[#0b0b10]/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b10]/95 via-[#0b0b10]/40 to-transparent" />

      <div className="relative px-4 sm:px-6 lg:px-10 py-10 sm:py-14 lg:py-20 min-h-[clamp(360px,55vw,640px)] flex flex-col justify-end">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ef3e54]/15 border border-[#ef3e54]/30 text-[#ef3e54] text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ef3e54] animate-pulse" />
            {data.media_type ? `Featured ${data.media_type}` : 'Featured'}
          </span>

          <h1 className="font-cinema text-white mt-3 sm:mt-4 leading-[0.95] text-glow"
              style={{ fontSize: 'clamp(2rem, 7vw, 5.5rem)' }}>
            {name}
          </h1>

          <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-zinc-300">
            {rating && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 border border-white/10">
                <Star size={13} className="text-yellow-400 fill-yellow-400" /> {rating}
              </span>
            )}
            {(data.release_date || data.first_air_date) && (
              <span className="px-2.5 py-1 rounded-full bg-black/40 border border-white/10">
                {(data.release_date || data.first_air_date).split('-')[0]}
              </span>
            )}
            {data.media_type && (
              <span className="px-2.5 py-1 rounded-full bg-black/40 border border-white/10 uppercase tracking-wider">
                {data.media_type}
              </span>
            )}
          </div>

          {data.overview && (
            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-zinc-300 line-clamp-3 max-w-2xl">
              {data.overview}
            </p>
          )}

          <div className="mt-5 sm:mt-7 flex flex-wrap gap-3">
            <Link to={trailerPath} className="btn-primary text-sm sm:text-base">
              <PlayCircle size={18} /> Watch Trailer
            </Link>
            <Link to={detailPath} className="btn-secondary text-sm sm:text-base">
              <Info size={18} /> More Info
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
