import React, { useEffect } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import { useState } from "react";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";

const Home = () => {
  document.title = "MovieApp";

  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomdata);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrending(data.results);
    } catch (error) {
      console.log("error:", error);
    }
  };

  // console.log(wallpaper)
  useEffect(() => {
    GetTrending();
    !wallpaper && GetHeaderWallpaper();
  }, [category]);

  // console.log(trending);
  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden ">
        <Topnav />
        <Header data={wallpaper} />

        <div className=" p-3 flex justify-between">
          <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>

          {/* <Dropdown
            title="Filter"
            options={["Tv", "movie", "all"]}
            value={category}
            onChange={(e) => setcategory(e.target.value.toLowerCase())}
          />
        </div> */}



         <Dropdown
            title="Filter"
            options={["Tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value.toLowerCase())}
          />
        </div>

        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading/>
  );
};

export default Home;
