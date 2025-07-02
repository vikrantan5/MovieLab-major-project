import React from 'react'
import Notfound from '/notfound.gif'


const NothingFound = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-slate-950'>
      <img className='w-[60%] h-auto object-cover' src={Notfound} alt="" />
    </div>
  )
}

export default NothingFound







