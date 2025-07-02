import React from 'react'
import loader from '/loader.gif'

const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-slate-950'>
      <img className='w-[60%] h-auto object-cover' src={loader} alt="" />
    </div>
  )
}

export default Loading
