import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import Tvshows from "./components/Tvshows";
import People from "./components/People";
import About from "./components/About";
import Contact from "./components/Contact";
import Moviedetails from "./components/partials/Moviedetails";
import TvDetails from "./components/partials/TvDetails";
import PersonDetails from "./components/partials/PersonDetails";
import Trailer from "./components/partials/Trailer";
import NothingFound from "./components/NothingFound";
const App = () => {
  return (
    <div className="bg-[#1F1E24] w-screen  h-screen flex">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/trending" element={<Trending />}></Route>
        <Route path="/popular" element={<Popular />}></Route>
        <Route path="/movie" element={<Movie />}/>
        <Route path="/movie/details/:id" element={<Moviedetails />} >
        <Route path="/movie/details/:id/trailer" element={<Trailer/>}/>
        </Route>

        <Route path="/tvshows" element={<Tvshows />}/>
        <Route path="/tv/details/:id" element={<TvDetails />} >
        <Route path="/tv/details/:id/trailer" element={<Trailer/>}/>
        </Route>

        <Route path="/person" element={<People />}/>
        <Route path="/person/details/:id" element={<PersonDetails />} />

       



      
        <Route path="/about" element={<About />}></Route>
        

        <Route path="/contact" element={<Contact />}></Route>
        <Route path="*" element={<NothingFound />}></Route>
      </Routes>
    </div>
  );
};

export default App;
