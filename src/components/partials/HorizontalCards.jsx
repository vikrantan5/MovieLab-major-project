import React from "react";
import { Link } from "react-router-dom";
import noimage from "/no_image.webp";
const HorizontalCards = ({ data }) => {
  return (
    <div className=" w-[100%]   flex   overflow-y-hidden mb-5 p-5">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="min-w-[20%] h-[35vh] bg-zinc-900 mr-5 mb-5"
          >
            <img
              className="w-full h-[45%] object-cover"
              src={
                d.backdrop_path || d.poster_path
                  ? `https://image.tmdb.org/t/p/original/${
                      d.backdrop_path || d.poster_path
                    }`
                  : noimage
              }
              alt=""
            />

            <div className="p-2 text-white mb-10 h-[55%] overflow-y-auto">
              <h1 className=" mt-3 text-xl font-semibold  ">
                {d.name || d.title || d.original_name || d.original_title}
              </h1>

              <p className=" mt-4 text-gray-400 font-semibold text-xs">
                {d.overview.slice(0, 50)}...
                <span className="text-zinc-200">more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl mt-5 font-black text-gray-300 text-center">
          Nothing To Show
        </h1>
      )}
    </div>
  );
};

export default HorizontalCards;
