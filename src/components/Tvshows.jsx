import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import Cards from "./partials/Cards";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";

const Tvshows = () => {

      document.title = "MovieLab |TvShows"
  const navigate = useNavigate();

  const [category, setcategory] = useState("airing_today");
  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

   const GetTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      //   settv(data.results);
      // console.log(data)

      if (data.results.length > 0) {
        settv((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      }
      else{
        sethasMore(false);

      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const refreshHandler =  () => {
    if (tv.length === 0) {
      GetTv();
    } else {
      setpage(1);
      settv([]);
      GetTv();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  //   console.log(tv);

  return  tv.length > 0 ? (
    <div className=" w-screen h-screen ">
      <div className="px-[5%] w-full   flex items-center justify-between  ">
        <h1 className=" text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556cd] pr-3 ri-arrow-left-line"
          ></i>
          Tv <small className="text-xs">({category})</small>
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["on_the_air", "popular" , "top_rated" , "airing_today"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
         
        </div>
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={GetTv}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Tvshows
