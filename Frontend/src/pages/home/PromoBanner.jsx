import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import { LuCircleDollarSign } from "react-icons/lu";
import { RiContactsLine } from "react-icons/ri";

const PromoBanner = () => {
  return (
    <div className='w-full max-w-[1260px] my-20 mx-auto px-4'>
      <div className='flex flex-col md:flex-row gap-10 justify-center items-center'>
        <div className='w-full md:w-1/3'>
          <div className='flex justify-center items-center'>
            <div className='text-center'>
              <div className='text-red-600 mb-2 flex justify-center items-center'>
                <TbTruckDelivery size={25} />
              </div>
              <h1 className='text-lg font-bold'>Free Delivery</h1>
              <p className='text-zinc-500 text-sm font-semibold'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor Lorem, ipsum. Neque, adipisci.
              </p>
            </div>
          </div>
        </div>
        <div className='w-full md:w-1/3'>
          <div className='flex justify-center items-center'>
            <div className='text-center'>
              <div className='text-red-600 mb-2 flex justify-center items-center'>
                <LuCircleDollarSign size={25} />
              </div>
              <h1 className='text-lg font-bold'>100% Money Back Guarantee</h1>
              <p className='text-zinc-500 text-sm font-semibold'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor Lorem, ipsum. Neque, adipisci.
              </p>
            </div>
          </div>
        </div>
        <div className='w-full md:w-1/3'>
          <div className='flex justify-center items-center'>
            <div className='text-center'>
              <div className='text-red-600 mb-2 flex justify-center items-center'>
                <RiContactsLine size={25} />
              </div>
              <h1 className='text-lg font-bold'>Strong Support</h1>
              <p className='text-zinc-500 text-sm font-semibold'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor Lorem, ipsum. Neque, adipisci.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromoBanner
