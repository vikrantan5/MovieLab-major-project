import { Outlet, useLocation } from 'react-router-dom';
import Sidenav from './Sidenav';
import BottomNav from './BottomNav';
import { motion } from 'framer-motion';

const Layout = () => {
  const { pathname } = useLocation();
  const isDetail = pathname.includes('/details/');
  return (
    <div className="min-h-screen w-full flex bg-[#0b0b10]">
      <Sidenav />
      <main className="flex-1 min-w-0 lg:ml-[260px] pb-mobile-nav">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className={isDetail ? '' : ''}
        >
          <Outlet />
        </motion.div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
