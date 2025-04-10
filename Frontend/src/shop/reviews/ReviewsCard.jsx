import React, { useState } from 'react';
import commentorIcon from '../../assets/images/avatar.png';
import { formatDate } from '../../utils/formatDate';
import RatingStars from '../../Components/RatingStars';
import PostAReview from './PostAReview';

const ReviewsCard = ({ productReviews, singleProduct, refetchProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reviews = productReviews || [];

  const handleOpenReviewModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full h-auto p-8">
        <h1 className="text-xl font-bold">All Comments</h1>

        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="mt-4">
              <div className="flex">
                <img
                  className="w-15 h-15 rounded-full"
                  src={review.userId?.avatar || commentorIcon} 
                  alt="Commentor"
                />
                <div className="ml-4">
                  <p className="text-sm font-medium underline capitalize underline-offset-4 text-blue-400">
                    {review.userId?.username || 'Anonymous'}
                  </p>
                  <p className="text-sm italic">{formatDate(review.createdAt)}</p>
                  <RatingStars rating={review.rating} />
                </div>
              </div>
              <div className="mt-4 flex text-gray-600 border p-6">
                <p>{review.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="mt-4 text-gray-500">No reviews yet. Be the first to add one!</p>
        )}

        <button
          onClick={handleOpenReviewModal}
          className="px-6 py-2 bg-red-800 hover:bg-red-600 cursor-pointer rounded-md mt-6 text-white"
        >
          Add a Review
        </button>

        <PostAReview
          isModalOpen={isModalOpen}
          handleClose={handleCloseReviewModal}
          product={singleProduct}
          refetchProduct={refetchProduct}
        />
      </div>
    </>
  );
};

export default ReviewsCard;   