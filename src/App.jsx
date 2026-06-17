import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Suspense } from 'react';
import Home from './components/Home';
import Trending from './components/Trending';
import Popular from './components/Popular';
import Movie from './components/Movie';
import Tvshows from './components/Tvshows';
import People from './components/People';
import About from './components/About';
import Contact from './components/Contact';
import Moviedetails from './components/partials/Moviedetails';
import TvDetails from './components/partials/TvDetails';
import PersonDetails from './components/partials/PersonDetails';
import Trailer from './components/partials/Trailer';
import NothingFound from './components/NothingFound';
import Layout from './components/partials/Layout';
import Loading from './components/Loading';

const App = () => {
  const location = useLocation();
  return (
    <div className="bg-[#0b0b10] text-zinc-100 min-h-screen w-full">
      <Suspense fallback={<Loading />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/popular" element={<Popular />} />
              <Route path="/movie" element={<Movie />} />
              <Route path="/tvshows" element={<Tvshows />} />
              <Route path="/person" element={<People />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/movie/details/:id" element={<Moviedetails />}>
                <Route path="trailer" element={<Trailer />} />
              </Route>
              <Route path="/tv/details/:id" element={<TvDetails />}>
                <Route path="trailer" element={<Trailer />} />
              </Route>
              <Route path="/person/details/:id" element={<PersonDetails />} />
            </Route>
            <Route path="*" element={<NothingFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </div>
  );
};

export default App;
