// RatingStars.jsx
import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RatingStars = ({ rating = 0 }) => {
  const roundedRating = parseFloat(rating) || 0;

  return (
    <div className='flex text-yellow-400'>
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {roundedRating >= star ? (
              <FaStar />
            ) : roundedRating >= star - 0.5 ? (
              <FaStarHalfAlt />
            ) : (
              <FaRegStar />
            )}
          </span>
        ))}
    </div>
  );
};

export default RatingStars;
