import React from "react";
import { Link } from "react-router-dom";
import noimage from "/no_image.webp";

const Cards = ({ data, title }) => {
  return (
    <div className="flex flex-wrap w-full h-full justify-center px-[5%] bg-[#1F1E24]">
      {data.map((o, i) => (
        <Link
          to={`/${o.media_type || title}/details/${o.id}`}
          className="relative w-[25vh] mr-[5%] mb-[5%]"
          key={i}
        >
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover"
            src={
              o.poster_path || o.backdrop_path || o.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    o.poster_path || o.backdrop_path || o.profile_path
                  }`
                : noimage
            }
            alt=""
          />

          <h1 className="text-2xl text-zinc-300 mt-3 font-semibold">
            {o.name || o.title || o.original_name || o.original_title}
          </h1>

          {o.vote_average && (
            <div className=" absolute right-[-10%] bottom-[25%]  rounded-full text-s font-semibold bg-yellow-600 w-[6vh] h-[6vh] flex justify-center items-center text-white">
              {(o.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
