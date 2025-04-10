import React, {useState} from 'react'
import { ImCancelCircle } from "react-icons/im";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import OrderSummary from './OrderSummary';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/features/cart/cartSlice';

 
const CardModal = ({products =[], isOpen, onClose}) => {

const dispatch = useDispatch();

const handleQuantity = (type, id)=>{
  const payload = {type, id}
  dispatch(updateQuantity(payload));
}

const remove = (e, id)=>{
  e.preventDefault()
  dispatch(removeFromCart({id}));
}


  return (
<div className={`fixed z-[1000] inset-0 w-full h-screen bg-opacity-30 backdrop-blur-sm transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    style={{ transition: 'opacity 300ms' }}>
      <div className={`md:w-1/3 w-full right-0 top-0 bg-white fixed h-full overflow-y-auto transition-transform  ${isOpen ? "translate-x-0" : "translate-x-full" }`}
      style={{transition: 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'}}>
        <div className='p-5'>
          <div className='mt-4 flex items-center justify-between'>
            <h1 className='text-xl font-semibold'>Your Cart</h1> 
            <button onClick={onClose} ><ImCancelCircle size={25} /></button>
          </div>
          <div className='mt-2 space-y-3'>
          {
              products.length === 0 ? (
                <div className='px-5 text-center'>Your Cart is Empty</div>
              ) : (
                products.map((item, index) => (
                  <div
                    key={index}
                    className='shadow-lg p-3 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 sm:justify-between rounded-md w-full mb-4'
                  >
                    <div className='flex items-center'>
                      <span className='bg-red-600 mr-4 text-sm text-white px-2 py-1 rounded-full'>
                        0{index + 1}
                      </span>
                      <img
                        src={item.image}
                        className='w-16 h-16 object-cover mr-4 rounded-md'
                        alt=''
                      />
                      <div>
                        <h1 className='font-bold text-base sm:text-lg'>{item.name}</h1>
                        <h5 className='text-zinc-500 font-bold text-sm sm:text-base'>
                          ${Number(item.price).toFixed(2)}
                        </h5>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => handleQuantity('decrement', item._id)}
                        className='bg-zinc-800 text-white text-lg rounded-full w-8 h-8 flex items-center justify-center'
                      >
                        <FiMinus />
                      </button>
                      <div className='px-2'>{item.quantity}</div>
                      <button
                        onClick={() => handleQuantity('increment', item._id)}
                        className='bg-zinc-800 text-white text-lg rounded-full w-8 h-8 flex items-center justify-center'
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <button
                      onClick={(e) => remove(e, item._id)}
                      className='font-semibold text-red-600 cursor-pointer text-sm sm:text-base'
                    >
                      Remove
                    </button>
                  </div>
                ))
              )
            }
                                                              
          </div>
        </div>
        <div className='p-5'>
          <OrderSummary/>
        </div>
      </div>
</div>
  )
}

export default CardModal