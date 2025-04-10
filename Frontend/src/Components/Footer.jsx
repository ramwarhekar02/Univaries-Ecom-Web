import React from 'react'
import { ImLocation } from "react-icons/im";
import { MdMailOutline, MdCall } from "react-icons/md";
import instagram1 from "/src/assets/images/instagram1.jpg"
import instagram2 from "/src/assets/images/instagram2.jpg"
import instagram3 from "/src/assets/images/instagram3.jpg"
import instagram4 from "/src/assets/images/instagram4.jpg"
import instagram5 from "/src/assets/images/instagram5.jpg"
import instagram6 from "/src/assets/images/instagram6.jpg"

const Footer = () => {
  return (
    <>
      <div className='w-full max-w-[1200px] mx-auto pt-20 px-4'>
        <div className='w-full h-full flex flex-col md:flex-row flex-wrap gap-6 justify-between'>
          
          <div className='w-full md:w-1/2 lg:w-1/4'>
            <h1 className='text-lg font-bold mb-2'>Contact Info</h1>
            <div className='flex items-start font-semibold mb-2'>
              <ImLocation size={20} /> 
              <span className='pl-2'>24 Taj Hotel, India Gate, Mumbai</span>
            </div>
            <div className='flex items-center font-semibold mb-2'>
              <MdMailOutline size={20} /> 
              <span className='pl-2'>univaries@gmail.com</span>
            </div>
            <div className='flex items-center font-semibold mb-2'>
              <MdCall size={20} /> 
              <span className='pl-2'>+91 68232 93297</span>
            </div>
          </div>

          <div className='w-full md:w-1/2 lg:w-1/4'>
            <h1 className='text-lg font-bold mb-2'>Company</h1>
            <ul className='leading-8 font-semibold'>
              <li>Home</li>
              <li>About Us</li>
              <li>Work With Us</li>
              <li>Our Blog</li>
              <li>Terms and Conditions</li>
            </ul>
          </div>

          <div className='w-full md:w-1/2 lg:w-1/4'>
            <h1 className='text-lg font-bold mb-2'>Useful Links</h1>
            <ul className='leading-8 font-semibold'>
              <li>Help</li>
              <li>Track My Order</li>
              <li>Men</li>
              <li>Women</li>
              <li>Dresses</li>
            </ul>
          </div>

          <div className='w-full md:w-1/2 lg:w-1/4'>
            <h1 className='text-lg font-bold mb-2'>Instagram</h1>
            <div className='flex flex-wrap gap-2 pt-2'>
              <img className='w-16 h-16 object-cover' src={instagram1} alt="insta1" />
              <img className='w-16 h-16 object-cover' src={instagram2} alt="insta2" />
              <img className='w-16 h-16 object-cover' src={instagram3} alt="insta3" />
              <img className='w-16 h-16 object-cover' src={instagram4} alt="insta4" />
              <img className='w-16 h-16 object-cover' src={instagram5} alt="insta5" />
              <img className='w-16 h-16 object-cover' src={instagram6} alt="insta6" />
            </div>
          </div>

        </div>
      </div>

      <div className='flex mt-10 h-12 text-sm md:text-lg items-center bg-zinc-100 text-zinc-500 w-full justify-center px-4 text-center'> 
        <h2>Copyright © 2025. All Rights Reserved</h2>
      </div>
    </>
  )
}

export default Footer;
