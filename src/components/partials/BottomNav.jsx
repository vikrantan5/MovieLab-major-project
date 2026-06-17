import { NavLink } from 'react-router-dom';
import { Home, Flame, Sparkles, Tv, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/trending', label: 'Trending', icon: Flame },
  { to: '/popular', label: 'Popular', icon: Sparkles },
  { to: '/tvshows', label: 'TV', icon: Tv },
  { to: '/person', label: 'People', icon: Users },
];

const BottomNav = () => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-3 pt-2">
      <div className="glass rounded-2xl px-2 py-2 flex items-center justify-around shadow-2xl shadow-black/60">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `relative flex-1 flex flex-col items-center gap-1 py-2 rounded-xl text-[10px] font-medium transition-colors ${
                isActive ? 'text-white' : 'text-zinc-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="bottom-active"
                    className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#ef3e54]/25 to-[#ef3e54]/5 border border-[#ef3e54]/30"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <motion.div
                  animate={isActive ? { y: -3 } : { y: 0 }}
                  className="relative z-10"
                >
                  <Icon size={20} className={isActive ? 'text-[#ef3e54]' : ''} />
                </motion.div>
                <span className="relative z-10">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
