import React from 'react';
import { Link } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/features/cart/cartSlice';
import RatingStars from '../Components/RatingStars';

const ProductCards = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    console.log("Adding to cart from ProductCards:", product);
    dispatch(addToCart(product));
  };

  if (!products) {
    return <p>Loading...</p>;
  }
  if (products.length === 0) {
    return <p>No products found in this category.</p>;
  }
  return (
    <>
      <div className='w-full max-w-[1260px] pb-20 mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {products.map((product) => (
          <div key={product._id} className='bg-white text-center rounded-2xl shadow-lg p-4 transition-transform hover:scale-105'>
            <div className='relative w-full h-[200px] mb-4'>
              <Link to={`/shop/${product._id}`}>
                <img className='w-full h-full object-cover rounded-lg' src={product.image} alt={product.name} />
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                className='absolute top-3 right-3 bg-red-600 py-1.5 pr-1.5 pl-1 hover:bg-red-900 text-white rounded-sm '
              >
                <FaCartArrowDown />
              </button>
            </div>
            <h1 className='text-xl font-bold mb-1'>{product.name}</h1>
            <p className='font-semibold text-lg mb-2'>
              ${product.price.toFixed(2)}
              {product.oldPrice && (
                <span className='text-zinc-400 line-through ml-2'>
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
            </p>
            <div className='flex items-center justify-center mb-2'>   
              <RatingStars rating={product.rating} reviews={product.reviews} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductCards;