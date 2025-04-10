import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFetchProductByIdQuery } from '../../redux/features/products/productsApi';
import { addToCart } from '../../redux/features/cart/cartSlice';
import ReviewsCard from '../reviews/ReviewsCard';
import RatingStars from '../../Components/RatingStars';

const SingleProduct = () => {
  const { id } = useParams();
  const { data, error, isLoading, refetch } = useFetchProductByIdQuery(id);
  const dispatch = useDispatch();

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error || !data?.product) return <p className="text-center py-10 text-red-500">Failed to load product.</p>;

  const singleProduct = data?.product || {};
  const productReviews = data?.reviews || [];

  const handleToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="w-full h-auto max-w-[1260px] mx-auto px-4">
      <div className="w-full h-full">
        <div className="w-full h-[30vh] sm:h-[35vh] md:h-[40vh] my-10 bg-red-100 rounded-xl flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl sm:text-3xl font-bold uppercase">Shop Single Product</h1>
          <div className="w-full pt-4 font-semibold text-zinc-500 text-sm sm:text-base">
            <Link to="/"><span>Home </span></Link>
            <Link to="/shop"><span> / Shop </span></Link>
            <Link><span> / {singleProduct.name}</span></Link>
          </div>
        </div>
      </div>

      <div className="p-2 md:p-5 flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/2">
          <img
            className="w-full h-full max-h-[400px] object-contain rounded-md"
            src={singleProduct.image}
            alt={singleProduct.name}
          />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-xl sm:text-2xl font-bold pt-6 md:pt-10">{singleProduct.name}</h1>
          <h3 className="text-lg text-red-600">
            {singleProduct?.price}{' '}
            {singleProduct?.oldPrice && (
              <s className="text-zinc-400 ml-2">{singleProduct?.oldPrice}</s>
            )}
          </h3>
          <h3 className="text-zinc-500 text-sm sm:text-base">{singleProduct.description}</h3>
          <div className="space-y-1">
            <h2 className="font-bold text-sm sm:text-base">
              Category: <span className="font-normal">{singleProduct.category}</span>
            </h2>
            <h2 className="font-bold text-sm sm:text-base">
              Color: <span className="font-normal">{singleProduct.color}</span>
            </h2>
            <h2 className="font-bold flex items-center text-sm sm:text-base">
              Rating: <span className="font-normal ml-2"><RatingStars rating={singleProduct.rating} /></span>
            </h2>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToCart(singleProduct);
            }}
            className="px-5 py-2 bg-red-600 text-white rounded-md font-black w-full sm:w-fit"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-10 px-2 md:px-0">
        <ReviewsCard productReviews={productReviews} singleProduct={singleProduct} refetchProduct={refetch} />
      </div>
    </div>
  );
};

export default SingleProduct;
