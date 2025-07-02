import React from 'react'
import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import Cards from "./partials/Cards";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";

const People = () => {

        document.title = "MovieLab |People"
  const navigate = useNavigate();

  const [category, setcategory] = useState("popular");
  const [people, setpeople] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

   const GetPeople = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      //   setpeople(data.results);
    //   console.log(data)

      if (data.results.length > 0) {
        setpeople((prevState) => [...prevState, ...data.results]);
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
    if (people.length === 0) {
      GetPeople();
    } else {
      setpage(1);
      setpeople([]);
      GetPeople();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  //   console.log(people);
  return people.length > 0 ? (
    <div className=" w-screen h-screen ">
      <div className="px-[5%] w-full   flex items-center justify-between  ">
        <h1 className=" text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556cd] pr-3 ri-arrow-left-line"
          ></i>
          people
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
      
          <div className="w-[2%]"></div>
         
        </div>
      </div>

      <InfiniteScroll
        dataLength={people.length}
        next={GetPeople}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={people} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default People
