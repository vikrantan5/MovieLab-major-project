import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import noimage from '/no_image.webp';

const HorizontalCards = ({ data, title }) => {
  if (!data || data.length === 0) {
    return <p className="px-4 sm:px-6 lg:px-8 py-6 text-zinc-500">Nothing to show</p>;
  }
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
        {data.map((d, i) => {
          const media = d.media_type || title || (d.first_air_date ? 'tv' : 'movie');
          const name = d.name || d.title || d.original_name || d.original_title;
          const img = d.backdrop_path || d.poster_path;
          const rating = d.vote_average ? Number(d.vote_average).toFixed(1) : null;
          return (
            <Link
              to={`/${media}/details/${d.id}`}
              key={`hc-${i}-${d.id}`}
              className="shrink-0 snap-start w-[200px] sm:w-[240px] lg:w-[280px] rounded-xl overflow-hidden bg-[#14141c] border border-white/5 hover:border-[#ef3e54]/40 transition-colors group"
            >
              <div className="relative aspect-video bg-black/40 overflow-hidden">
                <img
                  src={img ? `https://image.tmdb.org/t/p/w500${img}` : noimage}
                  alt={name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {rating && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur text-[11px] font-semibold">
                    <Star size={10} className="text-yellow-400 fill-yellow-400" /> {rating}
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-white line-clamp-1">{name}</h3>
                <p className="mt-1 text-[11px] text-zinc-500 line-clamp-2">{d.overview || 'No description available'}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalCards;
