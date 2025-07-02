import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncloadperson,
  removeperson,
} from "../../store/actions/personActions";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import HorizontalCards from "./HorizontalCards";
import Trailer from "./Trailer";
import Dropdown from "./Dropdown";
const PersonDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.person);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState("movie");
  // console.log(info);

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);
  return info ? (
    <div className="px-[10%] w-screen h-[220vh] bg-[#1f1e24]">
      {/* part1 navigation */}
      <nav className="h-[10vh] w-full items-center  text-zinc-100 flex gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556cd] pr-3 ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex">
        {/* part 2  left poster*/}
        <div className="w-[18%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[35vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className="text-white mt-10 mb-5 border-none h-[2px] bg-zinc-500" />

          {/* social media links */}
          <div className="text-2xl text-white gap-5 flex">
            <a
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
              target="_blank"
            >
              <i className="ri-earth-fill"></i>
            </a>
            <a
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
              target="_blank"
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
              target="_blank"
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              href={`https://www.x.com/${info.externalid.twitter_id}`}
              target="_blank"
            >
              <i className="ri-twitter-x-line"></i>
            </a>
          </div>

          {/* personal info */}
          <h1 className="text-2xl text-zinc-400 font-semibold my-4">
            Person Info
          </h1>

          <h1 className="text-xl text-zinc-400 font-semibold ">known for</h1>
          <h1 className=" text-zinc-400  ">
            {info.detail.known_for_department}
          </h1>

          <h1 className="text-xl text-zinc-400 font-semibold mt-3">Gender</h1>
          <h1 className=" text-zinc-400  ">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>

          <h1 className="text-xl text-zinc-400 font-semibold mt-3">Birthday</h1>
          <h1 className=" text-zinc-400  ">{info.detail.birthday}</h1>

          <h1 className="text-xl text-zinc-400 font-semibold mt-3">Deathday</h1>
          <h1 className=" text-zinc-400  ">
            {info.detail.deathday ? info.detail.deathday : "Still Alive"}
          </h1>

          <h1 className="text-xl text-zinc-400 font-semibold mt-3">
            Place of Birth
          </h1>
          <h1 className=" text-zinc-400  ">{info.detail.place_of_birth}</h1>

          <h1 className="text-xl text-zinc-400 font-semibold mt-3">
            Also Known as
          </h1>
          <h1 className=" text-zinc-400  ">
            {info.detail.also_known_as.join(",")}
          </h1>
        </div>

        {/* part 3 right details and info */}
        <div className="w-[80%] ml-[5%]">
          <h1 className="text-7xl font-black  text-white  my-4">
            {info.detail.name}
          </h1>

          <h1 className="text-xl text-zinc-400 font-semibold ">Biography</h1>
          <p className="text-zinc-400 mt-5">{info.detail.biography}</p>

          <h1 className="mt-5 text-lg text-zinc-400 font-semibold ">Summary</h1>

          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="w-full  flex justify-between">
            <h1 className="text-xl text-zinc-400 font-semibold ">Acting</h1>
            <Dropdown
              title="category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="list-disc text-zinc-400 w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,0.5)] border-2 border-zinc-700 p-5">
            {info[category + "Credits"].cast.map((c, i) => (
              <li key={i} className="hover:text-white duration-300 cursor-pointer mt-5">
                <Link to={`/${category}/details/${c.id}`} className="">
                  <span className="">
                    {c.name ||
                      c.title ||
                      c.original_name ||
                      c.original_title}
                  </span>
                  <span className="block ml-5"> {c.character && `Character name :${c.character}` } </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>

      {/*
       */}
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
