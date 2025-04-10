import React from 'react'
import card1 from "/src/assets/images/card1.png"
import card2 from "/src/assets/images/card2.png"
import card3 from "/src/assets/images/card3.png"
import { BsArrowRightShort } from "react-icons/bs";

const HeroSection = () => {
  return (
    <div className='w-full my-20 max-w-[1260px] mx-auto px-4'>
      <div className='flex flex-col md:flex-row justify-center gap-6 relative'>
        <div className='relative w-full md:w-1/3'>
          <img className='w-full h-[220px] rounded-lg object-cover' src={card1} alt="" />
          <div className='absolute bottom-10 right-14 p-2 rounded-lg bg-white/80 backdrop-blur-sm'>
            <h2 className='text-red-600 font-semibold'>2025 Trend</h2>
            <h2 className='font-bold text-lg text-slate-800'>Women Shirts</h2>
            <a className='flex items-center font-bold text-sm text-blue-600 underline cursor-pointer'>
              Discover more <span className='leading-none pt-1'><BsArrowRightShort /></span>
            </a>
          </div>
        </div>
        <div className='relative w-full md:w-1/3'>
          <img className='w-full h-[220px] rounded-lg object-cover' src={card2} alt="" />
          <div className='absolute bottom-10 right-14 p-2 rounded-lg bg-white/80 backdrop-blur-sm'>
            <h2 className='text-red-600 font-semibold'>2025 Trend</h2>
            <h2 className='font-bold text-lg text-slate-800'>Women Dresses</h2>
            <a className='flex items-center font-bold text-sm text-blue-600 underline cursor-pointer'>
              Discover more <span className='leading-none pt-1'><BsArrowRightShort /></span>
            </a>
          </div>
        </div>
        <div className='relative w-full md:w-1/3'>
          <img className='w-full h-[220px] rounded-lg object-cover' src={card3} alt="" />
          <div className='absolute bottom-10 right-14 p-2 rounded-lg bg-white/80 backdrop-blur-sm'>
            <h2 className='text-red-600 font-semibold'>2025 Trend</h2>
            <h2 className='font-bold text-lg text-slate-800'>Women Casuals</h2>
            <a className='flex items-center font-bold text-sm text-blue-600 underline cursor-pointer'>
              Discover more <span className='leading-none pt-1'><BsArrowRightShort /></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
