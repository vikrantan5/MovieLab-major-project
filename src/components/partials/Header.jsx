import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
//   console.log(data);

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2) , rgba(0,0,0,.5) , rgba(0,0,0,.8)) , url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat:"no-repeat"
      }}
      className="w-full h-[60vh] flex flex-col justify-end items-start pb-[3%] pl-[4%]"
    >
      <h1 className=" w-[70%] text-5xl font-black  text-white">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>

      <p className="w-[70%] mt-4 text-gray-400 font-semibold">
        {data.overview.slice(0, 200)}...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-300">more</Link>
      </p>
      <p className="w-[70%] mt-4 text-gray-400 text-xs m-2 gap-x-2 ">
        <i className="text-red-400   ri-megaphone-fill"></i>
        {data.release_date || "No information"}
        <i className="ml-5 text-green-400 ri-album-fill"></i>
        {data.media_type.toUpperCase()}
      </p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="bg-[#6556cd] p-4 rounded text-gray-300 font-semibold">Watch Trailer</Link>
    </div>
  );
};

export default Header;
