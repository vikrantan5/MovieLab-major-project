import { Clapperboard, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Topnav from './Topnav';

const PageHeader = ({ title, subtitle, showBack = true, right = null }) => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-20 bg-[#0b0b10]/85 backdrop-blur-xl border-b border-white/5">
      <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center gap-3 lg:gap-6">
        <div className="flex items-center gap-3 shrink-0">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              aria-label="Back"
              className="h-9 w-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-300"
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <div className="lg:hidden h-9 w-9 rounded-lg bg-gradient-to-br from-[#ef3e54] to-[#c9304a] flex items-center justify-center">
            <Clapperboard size={16} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-base sm:text-lg font-bold text-white leading-none">{title}</h1>
            {subtitle && <p className="text-[11px] text-zinc-500 mt-1">{subtitle}</p>}
          </div>
        </div>

        <div className="flex-1 min-w-0 max-w-2xl mx-auto">
          <Topnav />
        </div>

        {right && <div className="shrink-0 flex items-center gap-2">{right}</div>}
      </div>
    </div>
  );
};

export default PageHeader;
