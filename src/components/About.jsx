import Topnav from "./partials/Topnav"
import { useNavigate } from "react-router-dom";
const About = () => {

      const navigate = useNavigate();
    
  return (
    <div className=" w-screen h-screen overflow-hidden ">
      <div className="px-[5%] w-full h-[10%]    flex items-center justify-between  ">
        <h1 className=" text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556cd] pr-3 ri-arrow-left-line"
          ></i>
          About
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
      
         
        </div>
      </div>
      <div style={{
        background: "linear-gradient(rgba(0,0,0,.2) , rgba(0,0,0,.5) , rgba(0,0,0,.8)) , url(solo.jpeg)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat:"no-repeat"
      }} className=" w-full h-[90%] bg-zinc-200 flex items-center justify-between p-[5%]">

        <div className="w-[10%] h-auto bg-amber-200">
            <img className="object-cover" src="myi.jpg" alt="" />
        </div>
        <div className="w-[40%] h-[30%] ">
            <h1 className="text-9xl font-bold text-amber-50">VIKRANT SINGH</h1>
        </div>


        

      </div>



    </div>
  )
}

export default About
