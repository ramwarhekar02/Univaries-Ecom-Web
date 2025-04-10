import React from 'react'
import { Link } from "react-router-dom"
import header from "/src/assets/images/header.png"

const Banner = () => {
  return (
    <div className='w-full h-auto md:h-[70vh] my-10 max-w-[1260px] mx-auto px-4 md:px-10'>
      <div className='relative flex flex-col-reverse md:flex-row h-full leading-none items-center uppercase font-black justify-start'>
        <div className='text-center md:text-left mt-8 md:mt-0'>
          <h1 className='text-4xl sm:text-5xl md:text-[7vw]'>Best Outfit</h1>
          <h1 className='text-xl sm:text-2xl md:text-[4vw] font-semibold'>New Collections</h1>
          <button className='uppercase font-semibold py-3 px-6 mt-6 rounded-lg bg-blue-800 text-white'>
            <Link to="/shop">
              Shop new arrivals
            </Link>
          </button>
        </div>
        <div className='w-full md:w-auto flex justify-center md:absolute md:right-0'>
          <img className='w-[80%] md:w-96 lg:w-[500px] h-auto' src={header} alt="" />
        </div>
      </div>
    </div>
  )
}
  
export default Banner
  