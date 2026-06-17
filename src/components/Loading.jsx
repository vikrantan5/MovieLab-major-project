import { motion } from 'framer-motion';
import { Clapperboard } from 'lucide-react';

const Loading = ({ label = 'Loading cinema universe…' }) => {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-[#0b0b10]">
      {/* Glow rings */}
      <div className="relative h-24 w-24">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#ef3e54]/30"
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-[#ef3e54]/50"
          animate={{ scale: [1, 1.18, 1], opacity: [0.8, 0.2, 0.8] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.2 }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#ef3e54] to-[#c9304a] flex items-center justify-center shadow-[0_0_40px_-2px_rgba(239,62,84,0.7)]">
            <Clapperboard size={22} className="text-white" />
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-[#ef3e54]"
              animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
        <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500 font-mono">{label}</p>
      </div>
    </div>
  );
};

export default Loading;
