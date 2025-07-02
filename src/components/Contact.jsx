import Topnav from "./partials/Topnav"
import { useNavigate } from "react-router-dom";

const Contact = () => {
          const navigate = useNavigate();

  return (
    <div className=" w-screen h-screen ">
      <div className="px-[5%] w-full   flex items-center justify-between  ">
        <h1 className=" text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556cd] pr-3 ri-arrow-left-line"
          ></i>
          Contact
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
      
          <div className="w-[2%]"></div>
         
        </div>
      </div>


    </div>
  )
}

export default Contact
