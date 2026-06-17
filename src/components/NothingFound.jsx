import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, SearchX, ArrowLeft } from 'lucide-react';

const NothingFound = ({ message = "We couldn't find what you were looking for." }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="relative mx-auto h-28 w-28 mb-6">
          <div className="absolute inset-0 rounded-full bg-[#ef3e54]/10 blur-2xl" />
          <div className="relative h-full w-full rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center">
            <SearchX size={42} className="text-[#ef3e54]" />
          </div>
        </div>
        <h1 className="font-cinema text-5xl sm:text-6xl gradient-text">404</h1>
        <p className="mt-2 text-zinc-400 text-sm sm:text-base">{message}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={() => navigate(-1)} className="btn-secondary text-sm" data-testid="nf-back-btn">
            <ArrowLeft size={16} /> Go back
          </button>
          <button onClick={() => navigate('/')} className="btn-primary text-sm" data-testid="nf-home-btn">
            <Home size={16} /> Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NothingFound;
