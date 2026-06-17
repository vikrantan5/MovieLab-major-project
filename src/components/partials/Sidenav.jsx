import { NavLink } from 'react-router-dom';
import {
  Home,
  Flame,
  Sparkles,
  Film,
  Tv,
  Users,
  Info,
  Mail,
  Clapperboard,
} from 'lucide-react';
import { motion } from 'framer-motion';

const feedItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/trending', label: 'Trending', icon: Flame },
  { to: '/popular', label: 'Popular', icon: Sparkles },
  { to: '/movie', label: 'Movies', icon: Film },
  { to: '/tvshows', label: 'TV Shows', icon: Tv },
  { to: '/person', label: 'People', icon: Users },
];

const infoItems = [
  { to: '/about', label: 'About', icon: Info },
  { to: '/contact', label: 'Contact', icon: Mail },
];

const LinkItem = ({ to, label, icon: Icon }) => (
  <NavLink
    to={to}
    end={to === '/'}
    className={({ isActive }) =>
      `group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-gradient-to-r from-[#ef3e54]/15 to-transparent text-white border border-[#ef3e54]/30'
          : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
      }`
    }
  >
    {({ isActive }) => (
      <>
        <Icon size={18} className={isActive ? 'text-[#ef3e54]' : 'text-zinc-500 group-hover:text-zinc-200'} />
        <span>{label}</span>
        {isActive && (
          <motion.span
            layoutId="sidebar-dot"
            className="ml-auto h-1.5 w-1.5 rounded-full bg-[#ef3e54]"
          />
        )}
      </>
    )}
  </NavLink>
);

const Sidenav = () => {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[260px] flex-col p-5 border-r border-white/5 bg-[#0b0b10]/95 backdrop-blur z-30">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#ef3e54] to-[#c9304a] flex items-center justify-center shadow-lg shadow-[#ef3e54]/30">
          <Clapperboard size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">MovieLab</h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Cinema Universe</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <p className="px-3 text-[11px] uppercase tracking-wider text-zinc-500 mb-2">Discover</p>
        <nav className="flex flex-col gap-1">
          {feedItems.map((it) => <LinkItem key={it.to} {...it} />)}
        </nav>

        <div className="my-5 h-px bg-white/5" />

        <p className="px-3 text-[11px] uppercase tracking-wider text-zinc-500 mb-2">Info</p>
        <nav className="flex flex-col gap-1">
          {infoItems.map((it) => <LinkItem key={it.to} {...it} />)}
        </nav>
      </div>

      <div className="mt-5 p-3 rounded-xl border border-white/5 bg-white/[0.02]">
        <p className="text-[11px] text-zinc-500">Powered by</p>
        <p className="text-xs font-semibold text-zinc-300">TMDB · React · Vite</p>
      </div>
    </aside>
  );
};

export default Sidenav;
