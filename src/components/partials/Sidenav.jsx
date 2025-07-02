import axios from "../../utils/axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";


const Sidenav = () => {



  return (
    <div className="w-[20%] h-full  border-r-2 border-zinc-400 p-10">
      <h1 className="text-2xl text-white font-bold ">
        <i className="text-[#6556cd] ri-tv-fill text-2xl mr-2"></i>
        <span>MovieLab</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl gap-2">
        <h1 className="text-white font-semibold text-xl mt-10 mb-4">
          New Feeds
        </h1>
        <Link to={"/trending"} className="hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-4">
         <i className="ri-fire-fill"></i> Trending
        </Link>
        <Link to={"/popular"} className="hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-4">
         <i className="ri-bard-fill"></i> Popular
        </Link>
        <Link to={"/movie"} className="hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-4">
         <i className="ri-movie-ai-fill"></i> Movies
        </Link>
        <Link to={"/tvshows"} className="hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-4">
         <i  className="ri-tv-2-fill"></i> Tv Shows
        </Link>
        <Link to={"/person"} className="hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-4">
         <i className="ri-user-search-line"></i> People
        </Link>
      </nav>



          <hr className="border-none h-[1px] bg-zinc-600" />




       <nav className="flex flex-col text-zinc-400 text-xl gap-2">
        <h1 className="text-white font-semibold text-xl mt-5 mb-4">
         Website Information
        </h1>
        <Link to={"/about"} className="hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-4">
        <i className="mr-2 ri-chat-2-line"></i> About
        </Link>
        <Link to={"/contact"} className="hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-4">
        <i className="mr-1 ri-phone-fill"></i> Contact
        </Link>
       
      </nav>
    </div>
  );
};

export default Sidenav;
