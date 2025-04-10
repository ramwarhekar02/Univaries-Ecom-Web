import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { usePostReviewMutation } from '../../redux/features/reviews/reviewsApi';

const PostAReview = ({ isModalOpen, handleClose, product, refetchProduct }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;
  const [postReview] = usePostReviewMutation();
  const roundedRating = parseFloat(rating) || 0;

  const handleRating = (newRating) => setRating(newRating);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate fields
    if (!userId) {
      alert("User ID is missing. Please log in.");
      return;
    }
    if (!product?._id) {
      alert("Product ID is missing.");
      return;
    }
    if (!comment.trim()) {
      alert("Please enter a comment.");
      return;
    }
    if (!rating || rating < 1 || rating > 5) {
      alert("Please provide a valid rating between 1 and 5.");
      return;
    }
  
    const newComment = {
      comment: comment.trim(),
      rating,
      userId,
      productId: product._id,
    };
  
    console.log("Submitting review:", newComment);
    console.log("Product object:", product);
    try {
      await postReview(newComment).unwrap();
      alert("Comment Posted Successfully!");
      setComment('');
      setRating(0);
      refetchProduct?.();
      handleClose();
    } catch (error) {
      console.error("Error posting review:", error);
      alert(error?.data?.message || "Error posting review. Please try again.");
    }
  };

  return (
    <div className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2 ${isModalOpen ? 'block' : 'hidden'}`}>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-lg font-bold mb-4'>Post a Review</h2>

        <div className='flex items-center mb-4 text-yellow-500 text-xl cursor-pointer'>
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} onClick={() => handleRating(star)}>
              {roundedRating >= star ? <FaStar /> :
               roundedRating >= star - 0.5 ? <FaStarHalfAlt /> :
               <FaRegStar />}
            </span>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder='Write your review here...'
          className='w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        <div className='flex gap-2 justify-end'>
          <button onClick={handleClose} className='px-6 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition'>
            Cancel
          </button>
          <button onClick={handleSubmit} className='px-6 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 transition'>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAReview;