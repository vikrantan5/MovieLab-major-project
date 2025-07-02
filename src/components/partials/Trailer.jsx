import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import NothingFound from '../NothingFound'

const Trailer = () => {
    const navigate = useNavigate();
    const {pathname} =useLocation();
    const category = pathname.includes("movie") ? "movie" : "tv";
    const ytvideo = useSelector((state)=>state[category].info.videos);


  return (
    <div className='bg-[rgba(0,0,0,0.9)] absolute z-[100] top-0 left-0  w-screen h-screen flex items-center justify-center'>
         <Link
          onClick={() => navigate(-1)}
          className="absolute z-[200] right-[5%] top-[5%]  text-3xl text-white hover:text-[#6556cd] pr-3 ri-close-large-line"
        ></Link>
        {ytvideo ? (
            <ReactPlayer
            controls

      height={600}
        width={1000}
      url={`https://www.youtube.com/watch?v=${ytvideo.key}`}/>


        ): (
            <NothingFound/>
        )}
      
    </div>
  )
}

export default Trailer
