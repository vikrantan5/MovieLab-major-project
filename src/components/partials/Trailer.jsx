import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import NothingFound from '../NothingFound';

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes('movie') ? 'movie' : 'tv';
  const ytvideo = useSelector((state) => state[category].info?.videos);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      data-testid="trailer-modal"
    >
      <button
        onClick={() => navigate(-1)}
        aria-label="Close trailer"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[200] h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors"
        data-testid="trailer-close-btn"
      >
        <X size={18} />
      </button>

      {ytvideo ? (
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl"
        >
          <ReactPlayer
            controls
            playing
            width="100%"
            height="100%"
            url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
          />
        </motion.div>
      ) : (
        <NothingFound message="No trailer available for this title." />
      )}
    </motion.div>
  );
};

export default Trailer;
