import { Link } from 'react-router-dom';
import { Star, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import noimage from '/no_image.webp';

const Cards = ({ data, title }) => {
  return (
    <div
      className="grid gap-4 sm:gap-5 px-4 sm:px-6 lg:px-8 py-6"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(140px, 22vw, 220px), 1fr))' }}
    >
      {data.map((o, i) => {
        const media = o.media_type || title;
        const year = (o.release_date || o.first_air_date || '').split('-')[0];
        const name = o.name || o.title || o.original_name || o.original_title;
        const img = o.poster_path || o.backdrop_path || o.profile_path;
        const rating = o.vote_average ? Number(o.vote_average).toFixed(1) : null;
        return (
          <motion.div
            key={`${media}-${o.id}-${i}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.015, 0.4) }}
          >
            <Link
              to={`/${media}/details/${o.id}`}
              className="group block poster-card rounded-xl overflow-hidden bg-[#14141c] border border-white/5 hover:border-[#ef3e54]/40"
              aria-label={name}
            >
              <div className="relative aspect-[2/3] bg-black/40 overflow-hidden">
                <img
                  src={img ? `https://image.tmdb.org/t/p/w500${img}` : noimage}
                  alt={name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-90" />
                {rating && media !== 'person' && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-black/70 backdrop-blur text-[11px] font-semibold text-white">
                    <Star size={11} className="text-yellow-400 fill-yellow-400" />
                    {rating}
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-sm sm:text-base font-semibold text-white line-clamp-2 leading-tight">{name}</h3>
                  {year && (
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-zinc-400">
                      <Calendar size={11} /> {year}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Cards;
